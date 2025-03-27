"use server";

import { db } from "@/lib/database";
import { eq, and } from "drizzle-orm";
import {
	role,
	user,
	userRole,
	type Role,
	type User,
	type UserRole,
} from "@/schema";
import { revalidatePath } from "next/cache";

type RoleWithPermissions = Role;

/**
 * Get all available roles
 */
export async function getRoles(): Promise<{
	success: boolean;
	data?: Role[];
	error?: string;
}> {
	try {
		const roles = await db.query.role.findMany();
		return { success: true, data: roles };
	} catch (error) {
		console.error("Error fetching roles:", error);
		return { success: false, error: "Failed to fetch roles" };
	}
}

/**
 * Get a role by ID
 */
export async function getRoleById(
	id: string,
): Promise<{ success: boolean; data?: Role; error?: string }> {
	try {
		const roleData = await db.query.role.findFirst({
			where: eq(role.id, id),
		});

		if (!roleData) {
			return { success: false, error: "Role not found" };
		}

		return { success: true, data: roleData };
	} catch (error) {
		console.error("Error fetching role:", error);
		return { success: false, error: "Failed to fetch role" };
	}
}

/**
 * Assign a role to a user
 */
export async function assignRoleToUser(
	userId: string,
	roleId: string,
): Promise<{ success: boolean; error?: string }> {
	try {
		// Check if user exists
		const userExists = await db.query.user.findFirst({
			where: eq(user.id, userId),
		});

		if (!userExists) {
			return { success: false, error: "User not found" };
		}

		// Check if role exists
		const roleExists = await db.query.role.findFirst({
			where: eq(role.id, roleId),
		});

		if (!roleExists) {
			return { success: false, error: "Role not found" };
		}

		// Update user's primary role
		await db.update(user).set({ role: roleId }).where(eq(user.id, userId));

		// Also add to the many-to-many table for future use if needed
		await db
			.insert(userRole)
			.values({
				userId,
				roleId,
			})
			.onConflictDoNothing({
				target: [userRole.userId, userRole.roleId],
			});

		// Revalidate relevant pages
		revalidatePath("/dashboard");
		revalidatePath(`/users/${userId}`);

		return { success: true };
	} catch (error) {
		console.error("Error assigning role:", error);
		return { success: false, error: "Failed to assign role to user" };
	}
}

/**
 * Remove a role from a user
 */
export async function removeRoleFromUser(
	userId: string,
	roleId: string,
): Promise<{ success: boolean; error?: string }> {
	try {
		// Check if the user's primary role is this role
		const userData = await db.query.user.findFirst({
			where: eq(user.id, userId),
		});

		if (!userData) {
			return { success: false, error: "User not found" };
		}

		// If this is the user's primary role, clear it
		if (userData.role === roleId) {
			await db.update(user).set({ role: null }).where(eq(user.id, userId));
		}

		// Remove from the many-to-many relationship
		await db
			.delete(userRole)
			.where(and(eq(userRole.userId, userId), eq(userRole.roleId, roleId)));

		// Revalidate relevant pages
		revalidatePath("/dashboard");
		revalidatePath(`/users/${userId}`);

		return { success: true };
	} catch (error) {
		console.error("Error removing role:", error);
		return { success: false, error: "Failed to remove role from user" };
	}
}

/**
 * Get user roles including permissions
 */
export async function getUserRoles(
	userId: string,
): Promise<{ success: boolean; data?: RoleWithPermissions[]; error?: string }> {
	try {
		const userData = await db.query.user.findFirst({
			where: eq(user.id, userId),
			with: {
				userRoles: {
					with: {
						role: true,
					},
				},
				primaryRole: true,
			},
		});

		if (!userData) {
			return { success: false, error: "User not found" };
		}

		const roles: RoleWithPermissions[] = [];

		// Add primary role if it exists
		if (userData.primaryRole) {
			roles.push(userData.primaryRole);
		}

		// Add other roles from the many-to-many relationship
		for (const ur of userData.userRoles) {
			// Don't add duplicates if the primary role is already included
			if (!roles.some((r) => r.id === ur.role.id)) {
				roles.push(ur.role);
			}
		}

		return { success: true, data: roles };
	} catch (error) {
		console.error("Error fetching user roles:", error);
		return { success: false, error: "Failed to fetch user roles" };
	}
}

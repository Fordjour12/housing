"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import * as schema from "@/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { headers } from "next/headers";
import { nanoid } from "nanoid";
import type { UserRole } from "@/types/user";
import type { Permissions } from "@/schema/role";

const renterFormSchema = z.object({
	profile: z.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		phone: z.string().min(10, "Please enter a valid phone number"),
		occupation: z.string().min(2, "Occupation must be at least 2 characters"),
		moveInDate: z.string().min(1, "Please select a move-in date"),
	}),
	preferences: z.object({
		budget: z.object({
			min: z.number().min(500),
			max: z.number().max(5000),
		}),
		bedrooms: z
			.array(z.number())
			.min(1, "Please select at least one bedroom option"),
		propertyTypes: z
			.array(z.string())
			.min(1, "Please select at least one property type"),
		amenities: z.array(z.string()),
		petFriendly: z.boolean(),
	}),
	notifications: z.object({
		email: z.boolean(),
		push: z.boolean(),
		newListings: z.boolean(),
		applicationUpdates: z.boolean(),
	}),
});

export type RenterFormValues = z.infer<typeof renterFormSchema>;

export async function completeRenterOnboarding(data: RenterFormValues) {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session?.user?.id) {
			return { error: "Unauthorized" };
		}

		// Validate the input data
		const validatedData = renterFormSchema.parse(data);

		// Start a transaction to update all related tables
		await db.transaction(async (tx) => {
			// Update user name
			await tx
				.update(schema.user)
				.set({
					name: validatedData.profile.name,
					onboardingCompleted: true,
					updatedAt: new Date(),
				})
				.where(eq(schema.user.id, session.user.id));

			// Check if renter preferences exist
			const existingPreferences = await tx.query.renterPreferences.findFirst({
				where: eq(schema.renterPreferences.userId, session.user.id),
			});

			if (existingPreferences) {
				// Update existing preferences
				await tx
					.update(schema.renterPreferences)
					.set({
						phone: validatedData.profile.phone,
						occupation: validatedData.profile.occupation,
						moveInDate: new Date(validatedData.profile.moveInDate),
						budget: validatedData.preferences.budget,
						bedrooms: validatedData.preferences.bedrooms,
						propertyTypes: validatedData.preferences.propertyTypes,
						amenities: validatedData.preferences.amenities,
						petFriendly: validatedData.preferences.petFriendly,
						updatedAt: new Date(),
					})
					.where(eq(schema.renterPreferences.userId, session.user.id));
			} else {
				// Insert new preferences
				await tx.insert(schema.renterPreferences).values({
					id: nanoid(),
					userId: session.user.id,
					phone: validatedData.profile.phone,
					occupation: validatedData.profile.occupation,
					moveInDate: new Date(validatedData.profile.moveInDate),
					budget: validatedData.preferences.budget,
					bedrooms: validatedData.preferences.bedrooms,
					propertyTypes: validatedData.preferences.propertyTypes,
					amenities: validatedData.preferences.amenities,
					petFriendly: validatedData.preferences.petFriendly,
				});
			}

			// Check if notification preferences exist
			const existingNotifications =
				await tx.query.notificationPreferences.findFirst({
					where: eq(schema.notificationPreferences.userId, session.user.id),
				});

			if (existingNotifications) {
				// Update existing notification preferences
				await tx
					.update(schema.notificationPreferences)
					.set({
						emailNotifications: validatedData.notifications.email,
						pushNotifications: validatedData.notifications.push,
						newListings: validatedData.notifications.newListings,
						applicationUpdates: validatedData.notifications.applicationUpdates,
						updatedAt: new Date(),
					})
					.where(eq(schema.notificationPreferences.userId, session.user.id));
			} else {
				// Insert new notification preferences
				await tx.insert(schema.notificationPreferences).values({
					id: nanoid(),
					userId: session.user.id,
					emailNotifications: validatedData.notifications.email,
					pushNotifications: validatedData.notifications.push,
					newListings: validatedData.notifications.newListings,
					applicationUpdates: validatedData.notifications.applicationUpdates,
				});
			}
		});

		return { success: true };
	} catch (error) {
		console.error("Error in renter onboarding:", error);
		if (error instanceof z.ZodError) {
			return { error: "Invalid form data", details: error.errors };
		}
		return {
			error: "Failed to complete renter setup",
			message: error instanceof Error ? error.message : String(error),
		};
	}
}

export async function updateUserRole(role: UserRole) {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		if (!session?.user?.id) {
			return { error: "Unauthorized" };
		}

		// Define the role ID based on the role names in the seed file
		const roleMap = {
			renter: "renter",
			landlord: "landlord",
			property_manager: "property_manager",
		};

		// Default permissions based on role
		const getPermissionsByRole = (role: UserRole): Permissions => {
			switch (role) {
				case "renter":
					return {
						listings: ["read"],
						users: ["read"],
						maintenance: ["create", "read"],
						payments: ["create", "read"],
						tenants: ["read"],
						reports: [],
						analytics: [],
					};
				case "landlord":
					return {
						listings: ["create", "read", "update"],
						users: ["read"],
						reports: ["read"],
						analytics: ["read"],
						payments: ["read"],
						maintenance: ["create", "read", "update"],
						tenants: ["read", "update"],
					};
				case "property_manager":
					return {
						listings: ["create", "read", "update", "delete"],
						users: ["read"],
						reports: ["read"],
						analytics: ["read"],
						payments: ["read", "update"],
						maintenance: ["create", "read", "update"],
						tenants: ["read", "update"],
					};
				default:
					return {
						listings: [],
						users: [],
						reports: [],
						analytics: [],
						maintenance: [],
						payments: [],
						tenants: [],
					};
			}
		};

		// Start a transaction
		await db.transaction(async (tx) => {
			// First, update the user's role in the user table
			await tx
				.update(schema.user)
				.set({
					role: role,
					updatedAt: new Date(),
				})
				.where(eq(schema.user.id, session.user.id));

			// Find the roleId for the selected role
			const roleEntry = await tx.query.role.findFirst({
				where: eq(schema.role.id, roleMap[role]),
			});

			if (!roleEntry) {
				console.warn(
					`Role ${role} not found in database, roles should be seeded`,
				);
				return { error: "Role not found" };
			}

			// Check if the user already has this role
			const existingUserRole = await tx.query.userRole.findFirst({
				where: (userRole) =>
					and(
						eq(userRole.userId, session.user.id),
						eq(userRole.roleId, roleEntry.id),
					),
			});

			// If not, add the role to the user
			if (!existingUserRole) {
				await tx.insert(schema.userRole).values({
					userId: session.user.id,
					roleId: roleEntry.id,
					assignedAt: new Date(),
				});
			}
		});

		return { success: true };
	} catch (error) {
		console.error("Error updating user role:", error);
		return {
			error: "Failed to update user role",
			message: error instanceof Error ? error.message : String(error),
		};
	}
}

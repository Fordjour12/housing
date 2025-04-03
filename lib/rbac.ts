import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { type SelectRole, role, userRole } from "@/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export type Permission = "create" | "read" | "update" | "delete";
export type Resource =
	| "listings"
	| "users"
	| "reports"
	| "analytics"
	| "maintenance"
	| "payments"
	| "tenants";

/** Get user roles and permissions for RSC */
export async function getUserPermissionsRSC(): Promise<SelectRole[]> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) throw new Error("Unauthorized");

	const roles = await db
		.select({ role })
		.from(userRole)
		.innerJoin(role, eq(userRole.roleId, role.id))
		.where(eq(userRole.userId, session.user.id.toString()));

	return roles.map((r) => r.role);
}

/** Get user roles and permissions for API routes */
export async function getUserPermissionsAPI(
	request: NextRequest,
): Promise<SelectRole[]> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) throw new Error("Unauthorized");

	const roles = await db
		.select({ role })
		.from(userRole)
		.innerJoin(role, eq(userRole.roleId, role.id))
		.where(eq(userRole.userId, session.user.id.toString()));

	return roles.map((r) => r.role);
}

/** Check if user has permission for a resource and action */
export function hasPermission(
	roles: SelectRole[],
	resource: Resource,
	action: Permission,
): boolean {
	return roles.some((role) => role.permissions[resource]?.includes(action));
}

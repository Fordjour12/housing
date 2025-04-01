import { db } from "@/lib/database";
import { role } from "@/schema";
import { assignRoleToUser } from "@/actions/server/role";

export const roles = [
	{
		id: "admin",
		name: "Administrator",
		description: "Full system access",
		canCreateListings: true,
		canEditListings: true,
		canApplyForRentals: true,
		canManageUsers: true,
		canManageMultipleProperties: true,
		canViewReports: true,
		canViewAnalytics: true,
	},
	{
		id: "property_manager",
		name: "Property Manager",
		description: "Manage properties and listings",
		canCreateListings: true,
		canEditListings: true,
		canApplyForRentals: false,
		canManageUsers: false,
		canManageMultipleProperties: true,
		canViewReports: true,
		canViewAnalytics: true,
	},
	{
		id: "landlord",
		name: "Landlord",
		description: "Manage own properties",
		canCreateListings: true,
		canEditListings: true,
		canApplyForRentals: false,
		canManageUsers: false,
		canManageMultipleProperties: false,
		canViewReports: true,
		canViewAnalytics: false,
	},
	{
		id: "renter",
		name: "Renter",
		description: "Browse and apply for rentals",
		canCreateListings: false,
		canEditListings: false,
		canApplyForRentals: true,
		canManageUsers: false,
		canManageMultipleProperties: false,
		canViewReports: false,
		canViewAnalytics: false,
	},
];

export async function seedRoles() {
	console.log("Seeding roles...");

	try {
		// Clear existing roles
		await db.delete(role);

		// Insert roles
		await db.insert(role).values(roles);
		console.log("Roles seeded successfully!");
	} catch (error) {
		console.error("Error seeding roles:", error);
		throw error;
	}
}

// Helper function to assign roles to users
export async function assignRolesToUsers(
	users: { id: string; role: string }[],
) {
	console.log("Assigning roles to users...");

	try {
		for (const user of users) {
			const result = await assignRoleToUser(user.id, user.role);
			if (!result.success) {
				console.error(
					`Failed to assign role ${user.role} to user ${user.id}:`,
					result.error,
				);
			}
		}

		console.log("Roles assigned to users successfully!");
	} catch (error) {
		console.error("Error assigning roles to users:", error);
		throw error;
	}
}

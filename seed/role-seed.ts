import { db } from "@/lib/database";
import { role } from "@/schema";

async function seedRoles() {
	console.log("Seeding roles...");

	try {
		// Define roles with their permissions
		const roles = [
			{
				id: "renter",
				name: "Renter",
				description: "Users who are looking to rent properties",
				canCreateListings: false,
				canEditListings: false,
				canApplyForRentals: true,
				canManageUsers: false,
				canManageMultipleProperties: false,
				canViewReports: false,
				canViewAnalytics: false,
			},
			{
				id: "landlord",
				name: "Landlord",
				description: "Property owners who rent out their properties",
				canCreateListings: true,
				canEditListings: true,
				canApplyForRentals: false,
				canManageUsers: false,
				canManageMultipleProperties: true,
				canViewReports: true,
				canViewAnalytics: true,
			},
			{
				id: "property_manager",
				name: "Property Manager",
				description:
					"Professionals who manage properties on behalf of landlords",
				canCreateListings: true,
				canEditListings: true,
				canApplyForRentals: false,
				canManageUsers: true,
				canManageMultipleProperties: true,
				canViewReports: true,
				canViewAnalytics: true,
			},
			{
				id: "admin",
				name: "Administrator",
				description: "System administrators with full access",
				canCreateListings: true,
				canEditListings: true,
				canApplyForRentals: true,
				canManageUsers: true,
				canManageMultipleProperties: true,
				canViewReports: true,
				canViewAnalytics: true,
			},
		];

		// Insert roles into the database
		// Using insert with onConflictDoUpdate to handle existing roles
		for (const roleData of roles) {
			await db
				.insert(role)
				.values(roleData)
				.onConflictDoUpdate({
					target: role.id,
					set: {
						name: roleData.name,
						description: roleData.description,
						canCreateListings: roleData.canCreateListings,
						canEditListings: roleData.canEditListings,
						canApplyForRentals: roleData.canApplyForRentals,
						canManageUsers: roleData.canManageUsers,
						canManageMultipleProperties: roleData.canManageMultipleProperties,
						canViewReports: roleData.canViewReports,
						canViewAnalytics: roleData.canViewAnalytics,
						updatedAt: new Date(),
					},
				});
		}

		console.log("Roles seeded successfully!");
	} catch (error) {
		console.error("Error seeding roles:", error);
		throw error;
	}
}

export default seedRoles;

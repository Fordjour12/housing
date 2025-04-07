import { db } from "@/lib/database";
import { role } from "@/schema";
import type { Permissions } from "@/schema/role";


const createFullPermissions = (): Permissions => {
  return {
    listings: ["create", "read", "update", "delete"],
    users: ["create", "read", "update", "delete"],
    reports: ["create", "read", "update", "delete"],
    analytics: ["read"],
    maintenance: ["create", "read", "update", "delete"],
    payments: ["create", "read", "update", "delete"],
    tenants: ["create", "read", "update", "delete"],
  };
};

export const roles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access",
    permissions: createFullPermissions(),
    isSystem: true,
  },
  {
    id: "property_manager",
    name: "Property Manager",
    description: "Manage properties and listings",
    permissions: {
      listings: ["create", "read", "update", "delete"],
      users: ["read"],
      reports: ["read"],
      analytics: ["read"],
      payments: ["read", "update"],
      maintenance: ["create", "read", "update"],
      tenants: ["read", "update"],
    } as Permissions,
    isSystem: true,
  },
  {
    id: "landlord",
    name: "Landlord",
    description: "Manage own properties",
    permissions: {
      listings: ["create", "read", "update"],
      users: ["read"],
      reports: ["read"],
      analytics: ["read"],
      payments: ["read"],
      maintenance: ["create", "read", "update"],
      tenants: ["read", "update"],
    } as Permissions,
    isSystem: true,
  },
  {
    id: "renter",
    name: "Renter",
    description: "Browse and apply for rentals",
    permissions: {
      listings: ["read"],
      users: ["read"],
      maintenance: ["create", "read"],
      payments: ["create", "read"],
      tenants: ["read"],
    } as Permissions,
    isSystem: true,
  },
];

export async function seedRoles() {
  console.log("Seeding roles...");

  try {
    // Clear existing roles
    await db.delete(role);

    // Insert roles with timestamps
    for (const roleData of roles) {
      await db.insert(role).values({
        ...roleData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    console.log("Roles seeded successfully!");
  } catch (error) {
    console.error("Error seeding roles:", error);
    throw error;
  }
}

// Helper function to assign roles to users
// export async function assignRolesToUsers(
// 	users: { id: string; role: string }[],
// ) {
// 	console.log("Assigning roles to users...");

// 	try {
// 		for (const user of users) {
// 			await db.insert(role).values({
// 				id: user.id,
// 				name: user.role,
// 				permissions: createFullPermissions(), // Default to full permissions for now
// 				isSystem: false,
// 				createdAt: new Date(),
// 				updatedAt: new Date(),
// 			});
// 		}

// 		console.log("Roles assigned to users successfully!");
// 	} catch (error) {
// 		console.error("Error assigning roles to users:", error);
// 		throw error;
// 	}
// }

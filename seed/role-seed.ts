import { db } from "@/lib/database";
import * as schema from "@/schema";

export const defaultRoles = {
	renter: {
		name: "renter",
		description: "Standard renter account",
		permissions: {
			listings: ["read"],
			maintenance: ["create", "read"],
			payments: ["read", "create"],
		},
		isSystem: true
	},
	landlord: {
		name: "landlord",
		description: "Property owner account",
		permissions: {
			listings: ["create", "read", "update", "delete"],
			maintenance: ["read", "update"],
			payments: ["read", "create", "update"],
			reports: ["read"],
			analytics: ["read"],
		},
		isSystem: true
	},
	"property-manager": {
		name: "property-manager",
		description: "Property management account",
		permissions: {
			listings: ["create", "read", "update", "delete"],
			maintenance: ["create", "read", "update", "delete"],
			payments: ["create", "read", "update", "delete"],
			reports: ["create", "read", "update", "delete"],
			analytics: ["create", "read", "update", "delete"],
			tenants: ["create", "read", "update", "delete"],
			users: ["read", "update"]
		},
		isSystem: true
	}
} as const;

export async function seedRoles() {
	await db.insert(schema.role).values(
		Object.values(defaultRoles).map(role => ({
			id: crypto.randomUUID(),
			name: role.name,
			description: role.description,
			permissions: role.permissions as unknown as schema.Permissions,
			isSystem: role.isSystem
		}))
	);
}

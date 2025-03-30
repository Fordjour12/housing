import { db } from "@/lib/database";
import { user } from "@/schema";
import { register } from "@/actions/server/user";
import { assignRolesToUsers } from "./role-seed";
import { eq } from "drizzle-orm";

export const users = [
	{
		name: "Admin User",
		email: "admin@example.com",
		password: "Admin123!",
		role: "admin",
	},
	{
		name: "Property Manager 1",
		email: "pm1@example.com",
		password: "PropertyManager123!",
		role: "property_manager",
	},
	{
		name: "Property Manager 2",
		email: "pm2@example.com",
		password: "PropertyManager123!",
		role: "property_manager",
	},
	{
		name: "Landlord 1",
		email: "landlord1@example.com",
		password: "Landlord123!",
		role: "landlord",
	},
	{
		name: "Landlord 2",
		email: "landlord2@example.com",
		password: "Landlord123!",
		role: "landlord",
	},
	{
		name: "Renter 1",
		email: "renter1@example.com",
		password: "Renter123!",
		role: "renter",
	},
	{
		name: "Renter 2",
		email: "renter2@example.com",
		password: "Renter123!",
		role: "renter",
	},
	{
		name: "Renter 3",
		email: "renter3@example.com",
		password: "Renter123!",
		role: "renter",
	},
];

export async function seedUsers() {
	console.log("Seeding users...");

	try {
		// Clear existing users
		await db.delete(user);

		// Create users using the server action
		const createdUsers = [];
		for (const userData of users) {
			const [firstName, lastName] = userData.name.split(" ");
			const result = await register(
				userData.email,
				userData.password,
				firstName,
				lastName,
			);

			if (result.success && result.data?.user) {
				// Update the user's role directly
				await db
					.update(user)
					.set({ role: userData.role })
					.where(eq(user.id, result.data.user.id));

				createdUsers.push({
					id: result.data.user.id,
					role: userData.role,
				});
			} else {
				console.error(`Failed to create user ${userData.email}:`, result.error);
			}
		}

		// Assign roles to users
		await assignRolesToUsers(createdUsers);

		console.log("Users seeded successfully!");
	} catch (error) {
		console.error("Error seeding users:", error);
		throw error;
	}
}

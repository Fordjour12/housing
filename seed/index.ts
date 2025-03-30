import { seedRoles } from "./role-seed";
import { seedUsers } from "./user-seed";
import { seedListings } from "./listing-seed";
import { db } from "@/lib/database";
import { user } from "@/schema";
import { eq } from "drizzle-orm";

async function seed() {
	try {
		console.log("Starting database seeding...");

		// Seed roles first
		await seedRoles();

		// Seed users
		await seedUsers();

		// Get property manager IDs for seeding listings
		const propertyManagers = await db.query.user.findMany({
			where: eq(user.role, "property_manager"),
			columns: {
				id: true,
			},
		});

		const propertyManagerIds = propertyManagers.map((pm) => pm.id);

		// Seed listings
		await seedListings(propertyManagerIds);

		console.log("Database seeding completed successfully!");
	} catch (error) {
		console.error("Error during database seeding:", error);
		throw error;
	}
}

seed();

import { seedRoles } from "./role-seed";

 async function seed() {
	try {
		console.log("Seeding database...");
		await seedRoles();
		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error during database seeding:", error);
		throw error;
	}
}

seed();

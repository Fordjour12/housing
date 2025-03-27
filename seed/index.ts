import seedRoles from "./role-seed";

async function seed() {
	try {
		console.log("Starting database seeding...");

		// Run all seed functions in sequence
		await seedRoles();

		// Add other seed functions here as they are created
		// await seedOtherEntities();

		console.log("Database seeding completed successfully!");
		process.exit(0);
	} catch (error) {
		console.error("Error during database seeding:", error);
		process.exit(1);
	}
}

// Run the seed function if this file is executed directly
if (require.main === module) {
	seed();
}

export default seed;

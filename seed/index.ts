import { seedRoles } from "./role-seed";
import { db } from "@/lib/database";
import { user, role, userRole } from "@/schema";
import { eq } from "drizzle-orm";

async function clearDatabase() {
  console.log("Clearing existing data...");
  // Delete in reverse order of dependencies
  // await db.delete(userRole);
  // await db.delete(user);
  await db.delete(role);
}

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data
    await clearDatabase();

    // Seed roles first
    await seedRoles();
    console.log("✓ Roles seeded");

    // Seed users
    // await seedUsers();
    // console.log("✓ Users seeded");

    // // Get users with property manager and landlord roles
    // const propertyManagers = await db
    //   .select({ id: user.id })
    //   .from(user)
    //   .innerJoin(userRole, eq(user.id, userRole.userId))
    //   .innerJoin(role, eq(userRole.roleId, role.id))
    //   .where(eq(role.id, "property_manager"));

    // const landlords = await db
    //   .select({ id: user.id })
    //   .from(user)
    //   .innerJoin(userRole, eq(user.id, userRole.userId))
    //   .innerJoin(role, eq(userRole.roleId, role.id))
    //   .where(eq(role.id, "landlord"));

    // // Combine property managers and landlords as they can both create listings
    // const listingCreatorIds = [
    //   ...propertyManagers.map((pm) => pm.id),
    //   ...landlords.map((l) => l.id),
    // ];

    // // Seed listings
    // await seedListings(listingCreatorIds);
    // console.log("✓ Listings seeded");

    console.log("✓ Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
}

// Run the seed function
seed().catch((error) => {
  console.error("Fatal error during seeding:", error);
  process.exit(1);
});

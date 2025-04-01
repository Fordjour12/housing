import { db } from "@/lib/database";
import { listings, user } from "@/schema";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";

export const listingData = [
	{
		title: "Modern Downtown Apartment",
		description: "Beautiful 2-bedroom apartment in the heart of downtown",
		price: "2500",
		bedrooms: 2,
		bathrooms: 2,
		squareFeet: 1200,
		address: "123 Main St",
		city: "San Francisco",
		state: "CA",
		zipCode: "94105",
		images: ["https://example.com/image1.jpg"],
		amenities: ["Gym", "Pool", "Parking"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Cozy Studio in Mission District",
		description: "Perfect studio apartment with great amenities",
		price: "1800",
		bedrooms: 1,
		bathrooms: 1,
		squareFeet: 600,
		address: "456 Mission St",
		city: "San Francisco",
		state: "CA",
		zipCode: "94110",
		images: ["https://example.com/image2.jpg"],
		amenities: ["Laundry", "Bike Storage"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Luxury Penthouse",
		description: "Stunning penthouse with city views",
		price: "5000",
		bedrooms: 3,
		bathrooms: 3,
		squareFeet: 2500,
		address: "789 Market St",
		city: "San Francisco",
		state: "CA",
		zipCode: "94102",
		images: ["https://example.com/image3.jpg"],
		amenities: ["Rooftop Deck", "Private Elevator", "Wine Cellar"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Family Home in Suburbs",
		description: "Spacious 4-bedroom home perfect for families",
		price: "3500",
		bedrooms: 4,
		bathrooms: 2,
		squareFeet: 2000,
		address: "321 Oak Ave",
		city: "San Francisco",
		state: "CA",
		zipCode: "94127",
		images: ["https://example.com/image4.jpg"],
		amenities: ["Backyard", "Garage", "Garden"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Victorian House",
		description: "Classic Victorian with modern updates",
		price: "4200",
		bedrooms: 3,
		bathrooms: 2,
		squareFeet: 1800,
		address: "654 Haight St",
		city: "San Francisco",
		state: "CA",
		zipCode: "94117",
		images: ["https://example.com/image5.jpg"],
		amenities: ["Fireplace", "Original Details", "Garden"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Beachfront Condo",
		description: "Beautiful condo with ocean views",
		price: "3800",
		bedrooms: 2,
		bathrooms: 2,
		squareFeet: 1100,
		address: "987 Ocean Ave",
		city: "San Francisco",
		state: "CA",
		zipCode: "94121",
		images: ["https://example.com/image6.jpg"],
		amenities: ["Ocean View", "Beach Access", "Pool"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Tech District Loft",
		description: "Modern loft in the heart of tech district",
		price: "3000",
		bedrooms: 2,
		bathrooms: 1,
		squareFeet: 1000,
		address: "147 Tech Blvd",
		city: "San Francisco",
		state: "CA",
		zipCode: "94105",
		images: ["https://example.com/image7.jpg"],
		amenities: ["High Ceilings", "Exposed Brick", "Gym"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Garden Apartment",
		description: "Peaceful apartment with private garden",
		price: "2200",
		bedrooms: 1,
		bathrooms: 1,
		squareFeet: 800,
		address: "258 Garden St",
		city: "San Francisco",
		state: "CA",
		zipCode: "94110",
		images: ["https://example.com/image8.jpg"],
		amenities: ["Private Garden", "Storage", "Laundry"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Mountain View Home",
		description: "Beautiful home with mountain views",
		price: "4500",
		bedrooms: 3,
		bathrooms: 2,
		squareFeet: 1600,
		address: "369 Mountain View Dr",
		city: "San Francisco",
		state: "CA",
		zipCode: "94129",
		images: ["https://example.com/image9.jpg"],
		amenities: ["Mountain View", "Fireplace", "Garage"],
		status: "active" as const,
		isAvailable: true,
	},
	{
		title: "Artist's Loft",
		description: "Creative space perfect for artists",
		price: "2800",
		bedrooms: 2,
		bathrooms: 1,
		squareFeet: 1200,
		address: "741 Art St",
		city: "San Francisco",
		state: "CA",
		zipCode: "94103",
		images: ["https://example.com/image10.jpg"],
		amenities: ["High Ceilings", "Natural Light", "Studio Space"],
		status: "active" as const,
		isAvailable: true,
	},
];

export async function seedListings(propertyManagerIds: string[]) {
	console.log("Seeding listings...");

	try {
		// Clear existing listings
		await db.delete(listings);

		// Get property managers from the database
		const propertyManagers = await db
			.select({ id: user.id })
			.from(user)
			.where(eq(user.role, "property_manager"));

		if (propertyManagers.length === 0) {
			throw new Error(
				"No property managers found in the database. Please ensure users are seeded first.",
			);
		}

		// Create listings using direct database insertion
		for (const listing of listingData) {
			// Select a random property manager from existing ones
			const propertyManagerId =
				propertyManagers[Math.floor(Math.random() * propertyManagers.length)]
					.id;

			// Create a new listing with the property manager ID
			await db.insert(listings).values({
				id: randomUUID(),
				...listing,
				propertyManagerId,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}

		console.log("Listings seeded successfully!");
	} catch (error) {
		console.error("Error seeding listings:", error);
		throw error;
	}
}

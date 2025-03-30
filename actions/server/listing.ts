"use server";

import { db } from "@/lib/database";
import { listings } from "@/schema/listings";
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { NewListing } from "@/schema/listings";

/**
 * Fetches all listings for the current property manager
 * @returns Promise containing the listings data and any potential error
 */
export async function getListings() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) {
			throw new Error("Unauthorized");
		}

		const userListings = await db
			.select()
			.from(listings)
			.where(eq(listings.propertyManagerId, session.user.id));

		return { data: userListings, error: null };
	} catch (error) {
		console.error("[LISTINGS_GET]", error);
		return { data: null, error: "Failed to fetch listings" };
	}
}

/**
 * Fetches a specific listing by ID for the current property manager
 * @param id - The ID of the listing to fetch
 * @returns Promise containing the listing data and any potential error
 */
export async function getListing(id: string) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) {
			throw new Error("Unauthorized");
		}

		const listing = await db
			.select()
			.from(listings)
			.where(
				and(
					eq(listings.id, id),
					eq(listings.propertyManagerId, session.user.id),
				),
			)
			.limit(1);

		if (!listing[0]) {
			throw new Error("Listing not found");
		}

		return { data: listing[0], error: null };
	} catch (error) {
		console.error("[LISTING_GET]", error);
		return { data: null, error: "Failed to fetch listing" };
	}
}

/**
 * Creates a new listing for the current property manager
 * @param data - The listing data to create
 * @returns Promise containing the created listing data and any potential error
 */
export async function createListing(
	data: Omit<
		NewListing,
		"id" | "createdAt" | "updatedAt" | "propertyManagerId"
	>,
) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) {
			throw new Error("Unauthorized");
		}

		const newListing = await db
			.insert(listings)
			.values({
				...data,
				propertyManagerId: session.user.id,
			})
			.returning();

		revalidatePath("/prty-man/listings");
		return { data: newListing[0], error: null };
	} catch (error) {
		console.error("[LISTINGS_POST]", error);
		return { data: null, error: "Failed to create listing" };
	}
}

/**
 * Updates an existing listing for the current property manager
 * @param id - The ID of the listing to update
 * @param data - The updated listing data
 * @returns Promise containing the updated listing data and any potential error
 */
export async function updateListing(id: string, data: Partial<NewListing>) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) {
			throw new Error("Unauthorized");
		}

		const updatedListing = await db
			.update(listings)
			.set({
				...data,
				updatedAt: new Date(),
			})
			.where(
				and(
					eq(listings.id, id),
					eq(listings.propertyManagerId, session.user.id),
				),
			)
			.returning();

		if (!updatedListing[0]) {
			throw new Error("Listing not found");
		}

		revalidatePath("/prty-man/listings");
		return { data: updatedListing[0], error: null };
	} catch (error) {
		console.error("[LISTING_PATCH]", error);
		return { data: null, error: "Failed to update listing" };
	}
}

/**
 * Deletes a listing for the current property manager
 * @param id - The ID of the listing to delete
 * @returns Promise containing the deleted listing data and any potential error
 */
export async function deleteListing(id: string) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		if (!session?.user) {
			throw new Error("Unauthorized");
		}

		const deletedListing = await db
			.delete(listings)
			.where(
				and(
					eq(listings.id, id),
					eq(listings.propertyManagerId, session.user.id),
				),
			)
			.returning();

		if (!deletedListing[0]) {
			throw new Error("Listing not found");
		}

		revalidatePath("/prty-man/listings");
		return { data: deletedListing[0], error: null };
	} catch (error) {
		console.error("[LISTING_DELETE]", error);
		return { data: null, error: "Failed to delete listing" };
	}
}

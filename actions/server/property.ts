"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { property } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export interface CreatePropertyData {
	property: {
		streetAddress: string;
		unitNumber?: string;
		city: string;
		state: string;
		zip: string;
		propertyType: string;
		bedrooms: string;
		bathrooms: string;
		squareFootage?: string;
		yearBuilt?: string;
	};
	rental: {
		rentAmount: string;
		securityDeposit: string;
		leaseDurations: string[];
		availabilityDate: Date;
		description?: string;
		amenities?: string[];
		petPolicy?: string;
		petRestrictions?: string;
		utilitiesIncluded?: string[];
	};
	management: {
		contactDisplay: string;
		applicationProcess: string;
		screeningPreferences?: string[];
		communicationPreferences?: string[];
		leaseSigningPreference: string;
	};
	photos: string[];
}

export async function createProperty(data: CreatePropertyData) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return {
				success: false,
				error: "You must be logged in to create a property listing",
			};
		}

		const propertyId = nanoid();
		const title = `${data.property.bedrooms} Bedroom ${data.property.propertyType} in ${data.property.city}`;

		await db.insert(property).values({
			id: propertyId,
			title,
			description: data.rental.description,
			streetAddress: data.property.streetAddress,
			unitNumber: data.property.unitNumber,
			city: data.property.city,
			state: data.property.state,
			zip: data.property.zip,
			propertyType: data.property.propertyType,
			bedrooms: data.property.bedrooms,
			bathrooms: data.property.bathrooms,
			squareFootage: data.property.squareFootage,
			yearBuilt: data.property.yearBuilt,
			rentAmount: data.rental.rentAmount,
			securityDeposit: data.rental.securityDeposit,
			leaseDurations: data.rental.leaseDurations,
			availabilityDate: data.rental.availabilityDate,
			amenities: data.rental.amenities || [],
			petPolicy: data.rental.petPolicy,
			petRestrictions: data.rental.petRestrictions,
			utilitiesIncluded: data.rental.utilitiesIncluded || [],
			contactDisplay: data.management.contactDisplay,
			applicationProcess: data.management.applicationProcess,
			screeningPreferences: data.management.screeningPreferences || [],
			communicationPreferences: data.management.communicationPreferences || [],
			leaseSigningPreference: data.management.leaseSigningPreference,
			photos: data.photos,
			ownerId: session.user.id,
		});

		return {
			success: true,
			data: {
				id: propertyId,
			},
		};
	} catch (error) {
		console.error("Error creating property:", error);
		return {
			success: false,
			error: "Failed to create property listing",
		};
	}
}

export async function getProperty(id: string) {
	try {
		const result = await db.select().from(property).where(eq(property.id, id)).limit(1);

		return {
			success: true,
			data: result[0] || null,
		};
	} catch (error) {
		console.error("Error fetching property:", error);
		return {
			success: false,
			error: "Failed to fetch property",
		};
	}
}

export async function updateProperty(id: string, data: Partial<CreatePropertyData>) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return {
				success: false,
				error: "You must be logged in to update a property listing",
			};
		}

		// Verify ownership
		const existingProperty = await db.select().from(property)
			.where(eq(property.id, id))
			.limit(1);

		if (!existingProperty[0] || existingProperty[0].ownerId !== session.user.id) {
			return {
				success: false,
				error: "You do not have permission to update this property",
			};
		}

		// Update the property
		await db
			.update(property)
			.set({
				...(data.property && {
					streetAddress: data.property.streetAddress,
					unitNumber: data.property.unitNumber,
					city: data.property.city,
					state: data.property.state,
					zip: data.property.zip,
					propertyType: data.property.propertyType,
					bedrooms: data.property.bedrooms,
					bathrooms: data.property.bathrooms,
					squareFootage: data.property.squareFootage,
					yearBuilt: data.property.yearBuilt,
				}),
				...(data.rental && {
					rentAmount: data.rental.rentAmount,
					securityDeposit: data.rental.securityDeposit,
					leaseDurations: data.rental.leaseDurations,
					availabilityDate: data.rental.availabilityDate,
					amenities: data.rental.amenities || [],
					petPolicy: data.rental.petPolicy,
					petRestrictions: data.rental.petRestrictions,
					utilitiesIncluded: data.rental.utilitiesIncluded || [],
				}),
				...(data.management && {
					contactDisplay: data.management.contactDisplay,
					applicationProcess: data.management.applicationProcess,
					screeningPreferences: data.management.screeningPreferences || [],
					communicationPreferences: data.management.communicationPreferences || [],
					leaseSigningPreference: data.management.leaseSigningPreference,
				}),
				...(data.photos && {
					photos: data.photos,
				}),
				updatedAt: new Date(),
			})
			.where(eq(property.id, id));

		return {
			success: true,
			data: {
				id,
			},
		};
	} catch (error) {
		console.error("Error updating property:", error);
		return {
			success: false,
			error: "Failed to update property listing",
		};
	}
}

export async function deleteProperty(id: string) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user?.id) {
			return {
				success: false,
				error: "You must be logged in to delete a property listing",
			};
		}

		// Verify ownership
		const existingProperty = await db.select().from(property)
			.where(eq(property.id, id))
			.limit(1);

		if (!existingProperty[0] || existingProperty[0].ownerId !== session.user.id) {
			return {
				success: false,
				error: "You do not have permission to delete this property",
			};
		}

		await db.delete(property).where(eq(property.id, id));

		return {
			success: true,
		};
	} catch (error) {
		console.error("Error deleting property:", error);
		return {
			success: false,
			error: "Failed to delete property listing",
		};
	}
} 
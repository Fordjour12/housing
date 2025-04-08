"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import * as schema from "@/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { headers } from "next/headers";
import { nanoid } from "nanoid";

const renterFormSchema = z.object({
  profile: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    occupation: z.string().min(2, "Occupation must be at least 2 characters"),
    moveInDate: z.string().min(1, "Please select a move-in date"),
  }),
  preferences: z.object({
    budget: z.object({
      min: z.number().min(500),
      max: z.number().max(5000),
    }),
    bedrooms: z
      .array(z.number())
      .min(1, "Please select at least one bedroom option"),
    propertyTypes: z
      .array(z.string())
      .min(1, "Please select at least one property type"),
    amenities: z.array(z.string()),
    petFriendly: z.boolean(),
  }),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    newListings: z.boolean(),
    applicationUpdates: z.boolean(),
  }),
});

export type RenterFormValues = z.infer<typeof renterFormSchema>;

export async function completeRenterOnboarding(data: RenterFormValues) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    // Validate the input data
    const validatedData = renterFormSchema.parse(data);

    // Start a transaction to update all related tables
    await db.transaction(async (tx) => {
      // Update user name
      await tx
        .update(schema.user)
        .set({
          name: validatedData.profile.name,
          onboardingCompleted: true,
          updatedAt: new Date(),
        })
        .where(eq(schema.user.id, session.user.id));

      // Create or update renter preferences
      await tx
        .insert(schema.renterPreferences)
        .values({
          id: nanoid(),
          userId: session.user.id,
          phone: validatedData.profile.phone,
          occupation: validatedData.profile.occupation,
          moveInDate: new Date(validatedData.profile.moveInDate),
          budget: validatedData.preferences.budget,
          bedrooms: validatedData.preferences.bedrooms,
          propertyTypes: validatedData.preferences.propertyTypes,
          amenities: validatedData.preferences.amenities,
          petFriendly: validatedData.preferences.petFriendly,
        })
        .onConflictDoUpdate({
          target: schema.renterPreferences.userId,
          set: {
            phone: validatedData.profile.phone,
            occupation: validatedData.profile.occupation,
            moveInDate: new Date(validatedData.profile.moveInDate),
            budget: validatedData.preferences.budget,
            bedrooms: validatedData.preferences.bedrooms,
            propertyTypes: validatedData.preferences.propertyTypes,
            amenities: validatedData.preferences.amenities,
            petFriendly: validatedData.preferences.petFriendly,
            updatedAt: new Date(),
          },
        });

      // Create or update notification preferences
      await tx
        .insert(schema.notificationPreferences)
        .values({
          id: nanoid(),
          userId: session.user.id,
          emailNotifications: validatedData.notifications.email,
          pushNotifications: validatedData.notifications.push,
          newListings: validatedData.notifications.newListings,
          applicationUpdates: validatedData.notifications.applicationUpdates,
        })
        .onConflictDoUpdate({
          target: schema.notificationPreferences.userId,
          set: {
            emailNotifications: validatedData.notifications.email,
            pushNotifications: validatedData.notifications.push,
            newListings: validatedData.notifications.newListings,
            applicationUpdates: validatedData.notifications.applicationUpdates,
            updatedAt: new Date(),
          },
        });
    });

    return { success: true };
  } catch (error) {
    console.error("Error in renter onboarding:", error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid form data", details: error.errors };
    }
    return { error: "Failed to complete renter setup" };
  }
}

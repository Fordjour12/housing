import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();

		// Update user profile with onboarding data
		await db
			.update(user)
			.set({
				name: data.profile.name,
				phone: data.profile.phone,
				occupation: data.profile.occupation,
				moveInDate: new Date(data.profile.moveInDate),
				onboardingCompleted: true,
				preferences: {
					budget: data.preferences.budget,
					bedrooms: data.preferences.bedrooms,
					propertyTypes: data.preferences.propertyTypes,
					amenities: data.preferences.amenities,
					petFriendly: data.preferences.petFriendly,
				},
				notificationPreferences: {
					email: data.notifications.email,
					push: data.notifications.push,
					newListings: data.notifications.newListings,
					applicationUpdates: data.notifications.applicationUpdates,
				},
				updatedAt: new Date(),
			})
			.where(eq(user.id, session.user.id));

		return NextResponse.json(
			{ message: "Renter setup completed successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error in renter onboarding:", error);
		return NextResponse.json(
			{ message: "Failed to complete renter setup" },
			{ status: 500 },
		);
	}
}

"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { type User, user } from "@/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const login = async (email: string, password: string) => {
	try {
		const result = await auth.api.signInEmail({
			body: {
				email: email,
				password: password,
			},
		});
		return { success: true, data: result };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
};

export const register = async (
	email: string,
	password: string,
	firstName: string,
	lastName: string,
) => {
	try {
		const result = await auth.api.signUpEmail({
			body: {
				email: email,
				password: password,
				name: `${firstName} ${lastName}`,
			},
		});
		return { success: true, data: result };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
};

export const userSession = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		// If we have a session with a user, enhance it with database information
		if (session?.user) {
			// Get the user's complete profile from the database including onboarding status
			const userProfile = await db.query.user.findFirst({
				where: eq(user.id, session.user.id),
				columns: {
					id: true,
					name: true, 
					email: true,
					emailVerified: true,
					image: true,
					role: true,
					onboardingCompleted: true,
					createdAt: true,
					updatedAt: true
				}
			});

			// If we have user info from the database, enhance the session
			if (userProfile) {
				// Return the structure expected by EnhancedSessionData
				return { 
					success: true, 
					data: {
						session,
						user: {
							id: session.user.id,
							email: session.user.email,
							name: session.user.name,
							emailVerified: session.user.emailVerified,
							image: session.user.image,
							createdAt: session.user.createdAt,
							updatedAt: session.user.updatedAt,
							onboardingCompleted: userProfile.onboardingCompleted,
							role: userProfile.role,
						}
					} 
				};
			}
		}

		// Return the original session if we couldn't enhance it
		return { 
			success: true, 
			data: { 
				session, 
				user: session?.user || null 
			} 
		};
	} catch (error) {
		console.error("Session error:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
};

/**
 * Update the user's onboarding status in the database
 */
export async function updateOnboardingStatus(
	userId: string,
	completed: boolean,
): Promise<{ success: boolean; error?: string }> {
	try {
		// Check if user exists
		const userExists = await db.query.user.findFirst({
			where: eq(user.id, userId),
		});

		if (!userExists) {
			return { success: false, error: "User not found" };
		}

		// Update the onboarding status
		await db
			.update(user)
			.set({ onboardingCompleted: completed })
			.where(eq(user.id, userId));

		// Revalidate relevant paths
		revalidatePath("/");
		revalidatePath("/listings");
		revalidatePath("/account");

		return { success: true };
	} catch (error) {
		console.error("Error updating onboarding status:", error);
		return { success: false, error: "Failed to update onboarding status" };
	}
}

/**
 * Get the user's full profile including onboarding status
 */
export async function getUserProfile(
	userId: string,
): Promise<{ success: boolean; data?: User; error?: string }> {
	try {
		const userData = await db.query.user.findFirst({
			where: eq(user.id, userId),
			columns: {
				id: true,
				name: true, 
				email: true,
				emailVerified: true,
				image: true,
				role: true,
				onboardingCompleted: true,
				createdAt: true,
				updatedAt: true
			}
		});

		if (!userData) {
			return { success: false, error: "User not found" };
		}

		return { success: true, data: userData };
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return { success: false, error: "Failed to fetch user profile" };
	}
}

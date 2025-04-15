"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/database";
import * as schema from "@/schema";
import { eq } from "drizzle-orm";

export async function updateUser(
	userId: string,
	userData: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		language: string;
		timeZone: string;
	},
) {}

export async function updateUserSecurity(
	userId: string,
	userData: {
		password: string;
		email: string;
	},
): Promise<void> {}

export async function updateNotificationPreferences(
	userId: string,
	preferences: {
		emailNotifications: boolean;
		pushNotifications: boolean;
		newListings: boolean;
		applicationUpdates: boolean;
	},
) {}

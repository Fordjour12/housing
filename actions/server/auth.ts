"use server";

import { auth } from "@/lib/auth";

export async function requestPasswordReset(email: string) {
	try {
		// TODO: Implement with your auth provider
		// await auth.api.requestPasswordReset({
		//   email,
		//   redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
		// });

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}

export async function resetPassword(token: string, newPassword: string) {
	try {
		// TODO: Implement with your auth provider
		// await auth.api.resetPassword({
		//   token,
		//   newPassword,
		// });

		return { success: true };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}

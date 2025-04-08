"use server";

import { auth } from "@/lib/auth";

export async function signIn(email: string, password: string) {
	try {
		const result = await auth.api.signInEmail({
			body: { email, password },
		});
		return result;
	} catch (error) {
		console.error("[SIGN_IN_ERROR]", error);
		return { error: "Failed to sign in" };
	}
}

export async function signUp(
	email: string,
	password: string,
	firstName: string,
	lastName: string,
) {
	try {
		const result = await auth.api.signUpEmail({
			body: { email, password, name: `${firstName} ${lastName}` },
		});
		return result;
	} catch (error) {
		console.error("[SIGN_UP_ERROR]", error);
		return { error: "Failed to sign up" };
	}
}


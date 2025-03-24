"use server";

import { auth } from "@/lib/auth";
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
		console.log("session =>", session);
		return { success: true, data: session };
	} catch (error) {
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
};

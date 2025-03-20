"use server";

import { auth } from "@/lib/auth";

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
			error: error instanceof Error ? error.message : "An unknown error occurred" 
		};
	}
};

export const register = async (
	email: string,
	password: string,
	firstName: string,
	lastName: string,
) => {
	await auth.api.signUpEmail({
		body: {
			email: email,
			password: password,
			name: `${firstName} ${lastName}`,
		},
	});
};

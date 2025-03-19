"use server";

import { auth } from "@/lib/auth";

export const login = async (email: string, password: string) => {
	await auth.api.signInEmail({
		body: {
			email: email,
			password: password,
		},
	});
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

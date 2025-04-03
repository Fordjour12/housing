import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, password, firstName, lastName } = await req.json();
		console.log("email", email);
		console.log("password", password);
		console.log("firstName", firstName);
		console.log("lastName", lastName);

		const result = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name: `${firstName} ${lastName}`,
			},
		});

		return NextResponse.json(
			{ data: result },
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
				statusText: "OK",
			},
		);
	} catch (error) {
		console.error("Registration error:", error);
		return NextResponse.json(
			{ error: "Failed to create account" },
			{
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
				statusText: "Bad Request",
			},
		);
	}
}

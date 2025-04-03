import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();
		const result = await auth.api.signInEmail({
			body: {
				email,
				password,
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
		return NextResponse.json(
			{ error: "Invalid credentials" },
			{
				status: 401,
				headers: {
					"Content-Type": "application/json",
				},
				statusText: "Unauthorized",
			},
		);
	}
}

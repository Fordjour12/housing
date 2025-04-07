import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password } = await request.json();

	try {
		const result = await auth.api.signInEmail({
			body: { email, password },
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error("[LOGIN_ERROR]", error);
		return NextResponse.json(
			{ error: "Invalid email or password" },
			{ status: 401 },
		);
	}
}

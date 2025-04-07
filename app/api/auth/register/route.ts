import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password, name } = await request.json();

	try {
		const result = await auth.api.signUpEmail({
			body: { email, password, name },
		});

		return NextResponse.json(result);
	} catch (error) {
		console.error("[REGISTER_ERROR]", error);
		return NextResponse.json({ error: "Failed to register" }, { status: 500 });
	}
}

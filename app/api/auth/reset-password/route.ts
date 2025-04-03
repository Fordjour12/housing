import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { user } from "@/schema/user";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
	try {
		const { email } = await req.json();

		// Find user by email
		const [existingUser] = await db
			.select()
			.from(user)
			.where(eq(user.email, email));

		if (!existingUser) {
			return NextResponse.json(
				{ message: "No account found with this email address." },
				{ status: 404 },
			);
		}

		// Generate reset token
		const resetToken = randomBytes(32).toString("hex");
		const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

		// Update user with reset token
		await db
			.update(user)
			.set({
				resetToken,
				resetTokenExpiry,
			})
			.where(eq(user.id, existingUser.id));

		// Send reset email
		await sendPasswordResetEmail({
			to: email,
			resetToken,
		});

		return NextResponse.json(
			{ message: "Password reset email sent successfully." },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Password reset error:", error);
		return NextResponse.json(
			{ message: "Something went wrong. Please try again later." },
			{ status: 500 },
			
		);
	}
}

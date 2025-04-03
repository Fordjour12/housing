import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendPasswordResetEmailProps {
	to: string;
	resetToken: string;
}

export async function sendPasswordResetEmail({
	to,
	resetToken,
}: SendPasswordResetEmailProps) {
	const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

	await resend.emails.send({
		from: "Housing <noreply@housing.com>",
		to,
		subject: "Reset your password",
		html: `
      <div>
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
	});
}

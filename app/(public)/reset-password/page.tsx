import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
	title: "Reset Password",
	description: "Reset your password using your email address.",
};

export default function ResetPasswordPage() {
	return (
		<div className="container relative h-[calc(100vh-3.5rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<h1 className="text-2xl font-semibold tracking-tight">
						Reset your password
					</h1>
					<p className="text-sm text-muted-foreground">
						Enter your email address and we&apos;ll send you a link to reset
						your password.
					</p>
				</div>
				<ResetPasswordForm />
			</div>
		</div>
	);
}

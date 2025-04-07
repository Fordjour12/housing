"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { resetPasswordSchema } from "./schema";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
	token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
		try {
			setIsLoading(true);
			// TODO: Implement password reset
			// const result = await resetPassword(token, values.password);

			toast.success("Password has been reset successfully");
			router.push("/login");
		} catch (error) {
			console.error("Password reset error:", error);
			toast.error("Failed to reset password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section className="flex min-h-scree bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
			<Form {...form}>
				<form
					className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="p-8 pb-6">
						<div>
							<Link href="/" aria-label="go home">
								<Image src="/icon.png" alt="RentEasy" width={40} height={40} />
							</Link>
							<h1 className="mb-1 mt-4 text-xl font-semibold">
								Reset Your Password
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your new password below.
							</p>
						</div>
					</div>

					<div className="space-y-6 px-4 pb-6">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input type="password" disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-2">
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm New Password</FormLabel>
										<FormControl>
											<Input type="password" disabled={isLoading} {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Resetting Password...
								</>
							) : (
								"Reset Password"
							)}
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
}

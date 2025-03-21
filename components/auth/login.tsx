"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { type LoginSchema, loginSchema } from "./schema";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { login } from "@/server/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
	const form = useForm<z.infer<LoginSchema>>({
		resolver: zodResolver(loginSchema),
		resetOptions: {
			keepDirty: true,
		},
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const router = useRouter();
	async function onSubmit(values: z.infer<LoginSchema>) {
		try {
			await login(values.email, values.password);
			toast.success("Login successful");
			router.push("/listings");

			// Do something with the form values.
			// ✅ This will be type-safe and validated.
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Failed to login. Please try again.");
		}
	}
	return (
		<section className="flex min-h-scree bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
			<Form {...form}>
				<form
					className="bg-card m-auto h-fit w-full  max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="p-8 pb-6">
						<div>
							<Link href="/" aria-label="go home">
								<Image src="/icon.png" alt="RentEasy" width={40} height={40} />
							</Link>
							<h1 className="mb-1 mt-4 text-xl font-semibold">
								Log In To RentEasy
							</h1>
							<p className="text-sm">Welcome to RentEasy! Log In to continue</p>
						</div>
					</div>
					<div className="mt-6 grid grid-cols-2 gap-3 px-4">
						<Button type="button" variant="outline">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="0.98em"
								height="1em"
								viewBox="0 0 256 262"
								aria-label="Google"
							>
								<path
									fill="#4285f4"
									d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
								/>
								<path
									fill="#34a853"
									d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
								/>
								<path
									fill="#fbbc05"
									d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
								/>
								<path
									fill="#eb4335"
									d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
								/>
							</svg>
							<span>Google</span>
						</Button>
						<Button type="button" variant="outline">
							{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 256 256"
								aria-label="Microsoft"
							>
								<path fill="#f1511b" d="M121.666 121.666H0V0h121.666z" />
								<path fill="#80cc28" d="M256 121.666H134.335V0H256z" />
								<path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z" />
								<path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z" />
							</svg>
							<span>Microsoft</span>
						</Button>
					</div>

					<hr className="my-4 border-dashed" />
					<div className="space-y-6 px-4 pb-6">
						<div className="space-y-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="space-y-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button className="w-full">Login</Button>
					</div>
					<div className="bg-muted rounded-(--radius) border p-3">
						<p className="text-accent-foreground text-center text-sm">
							Don't have an account?
							<Button asChild variant="link" className="px-2">
								<Link href="/register">Sign Up</Link>
							</Button>
						</p>
					</div>
				</form>
			</Form>
		</section>
	);
}

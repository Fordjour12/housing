"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";

export default function WelcomeScreen() {
	const { user, updateOnboardingState } = useUser();

	const handleContinue = () => {
		updateOnboardingState({ step: 2 });
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
			<div className="mb-8">
				<Image
					src="/images/welcome-illustration.svg"
					alt="Welcome"
					width={200}
					height={200}
					className="mx-auto"
				/>
			</div>

			<h1 className="text-3xl font-bold mb-4">Welcome to RentEasy!</h1>

			<p className="text-xl mb-2">Hi {user?.name || "there"},</p>

			<p className="text-lg text-muted-foreground mb-8 max-w-md">
				We're excited to have you join our platform. Let's get you set up so you
				can start exploring rental properties that match your needs.
			</p>

			<Button size="lg" onClick={handleContinue}>
				Get Started
			</Button>
		</div>
	);
}

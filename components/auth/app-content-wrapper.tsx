"use client";

import OnboardingFlow from "@/components/onboarding/onboarding-flow";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface AppContentWrapperProps {
	children: ReactNode;
}

/**
 * Wrapper component that handles whether to show onboarding or main app content
 * Now properly respects the database as the source of truth for onboarding status
 */
export default function AppContentWrapper({
	children,
}: AppContentWrapperProps) {
	const { isLoading, isAuthenticated, isOnboarding, user } = useUser();
	const router = useRouter();

	// Redirect user to listings if they've completed onboarding but are on an onboarding path
	useEffect(() => {
		if (isAuthenticated && !isLoading && user) {
			// Check database-sourced onboarding status
			if (!user.onboardingCompleted && typeof window !== "undefined") {
				// If onboarding not completed, make sure they're in the onboarding flow
				const pathname = window.location.pathname;
				const isOnboardingPath =
					pathname === "/onboarding" ||
					pathname === "/setup" ||
					pathname === "/role-selection";

				if (!isOnboardingPath) {
					// They need onboarding but aren't on an onboarding path
					router.replace("/onboarding");
				}
			} else if (user.onboardingCompleted && typeof window !== "undefined") {
				// If onboarding is completed, redirect away from onboarding paths
				const pathname = window.location.pathname;
				const isOnboardingPath =
					pathname === "/onboarding" ||
					pathname === "/setup" ||
					pathname === "/role-selection";

				if (isOnboardingPath) {
					// They're done with onboarding but still on an onboarding path
					router.replace("/listings");
				}
			}
		}
	}, [isAuthenticated, isLoading, user, router]);

	// Show loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
			</div>
		);
	}

	// If user is authenticated and in onboarding, show the onboarding flow
	// isOnboarding is computed from user.onboardingCompleted which now comes from the database
	if (isAuthenticated && isOnboarding) {
		return <OnboardingFlow />;
	}

	// Otherwise show the main app content
	return <>{children}</>;
}

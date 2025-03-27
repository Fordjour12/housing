"use client";

import type { ReactNode } from "react";
import { useUser } from "@/context/user-context";
import OnboardingFlow from "@/components/onboarding/onboarding-flow";

interface AppContentWrapperProps {
	children: ReactNode;
}

/**
 * Wrapper component that handles whether to show onboarding or main app content
 */
export default function AppContentWrapper({
	children,
}: AppContentWrapperProps) {
	const { isLoading, isAuthenticated, isOnboarding } = useUser();

	// Show loading state
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
			</div>
		);
	}

	// If user is authenticated and in onboarding, show the onboarding flow
	if (isAuthenticated && isOnboarding) {
		return <OnboardingFlow />;
	}

	// Otherwise show the main app content
	return <>{children}</>;
}

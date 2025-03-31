"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import LandlordHeader from "@/components/landlord-header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Redirect component for unauthorized users
function RedirectToListings() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to listings page
		router.push("/listings");
	}, [router]);

	// Return null (no UI) while redirecting
	return null;
}

export default function LandlordLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<RoleGuard
			requiredPermission="canCreateListings"
			fallback={<RedirectToListings />}
		>
			<div className="min-h-screen flex flex-col">
				<LandlordHeader />
				<div className="container mx-auto py-6 flex-1">{children}</div>
			</div>
		</RoleGuard>
	);
}

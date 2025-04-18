import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { AccountProfile } from "@/components/accounts/account-profile";
import { BillingSettings } from "@/components/accounts/billing-settings";
import { NotificationPreferences } from "@/components/accounts/notification-preferences";
import { RenterPreferences } from "@/components/accounts/renter-preferences";
import { SecuritySettings } from "@/components/accounts/security-settings";
import { SavedSearches } from "@/components/accounts/saved-searches";
import { FavoriteListings } from "@/components/accounts/favorite-listings";
import { RentalApplications } from "@/components/accounts/rental-applications";
import * as schema from "@/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/database";

export const metadata: Metadata = {
	title: "Account Settings",
	description: "Manage your account settings and preferences",
};

// Loading component with skeleton UI
function LoadingState() {
	return (
		<div className="space-y-6 animate-pulse">
			<div className="h-8 w-1/3 bg-muted rounded" />
			<div className="h-4 w-1/2 bg-muted rounded" />
			<div className="space-y-4">
				<div className="h-32 bg-muted rounded" />
				<div className="h-32 bg-muted rounded" />
			</div>
		</div>
	);
}

// Separate components for each tab's content
async function SavedSearchesContent() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) return null;

	const userData = await db.query.user.findFirst({
		where: eq(schema.user.id, session.user.id),
		with: { savedSearches: true },
	});

	if (!userData?.savedSearches) return null;

	const savedSearches = userData.savedSearches.map((search) => {
		const criteria = search.searchCriteria as {
			name: string;
			location: string;
			minPrice: number;
			maxPrice: number;
			bedrooms: string;
			newListingsCount?: number;
		};

		return {
			id: search.id,
			name: criteria.name,
			location: criteria.location,
			priceRange: {
				min: criteria.minPrice,
				max: criteria.maxPrice,
			},
			bedrooms: criteria.bedrooms,
			lastUpdated: search.createdAt.toLocaleDateString(),
			newListings: criteria.newListingsCount || 0,
		};
	});

	return (
		<SavedSearches
			searches={savedSearches}
			onDelete={async (id) => {
				"use server";
				await db
					.delete(schema.savedSearches)
					.where(eq(schema.savedSearches.id, id));
			}}
		/>
	);
}

async function FavoriteListingsContent() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) return null;

	const userData = await db.query.user.findFirst({
		where: eq(schema.user.id, session.user.id),
		with: {
			favorites: {
				with: { property: true },
			},
		},
	});

	if (!userData?.favorites) return null;

	const favoriteListings = userData.favorites.map((favorite) => ({
		id: favorite.property.id,
		title: favorite.property.title,
		address: `${favorite.property.streetAddress}, ${favorite.property.city}`,
		bedrooms: favorite.property.bedrooms,
		bathrooms: favorite.property.bathrooms,
		squareFeet: favorite.property.squareFeet || 0,
		price: Number(favorite.property.rentAmount),
		imageUrl: favorite.property.photos?.[0],
	}));

	return (
		<FavoriteListings
			listings={favoriteListings}
			onDelete={async (id) => {
				"use server";
				await db.delete(schema.favorite).where(eq(schema.favorite.id, id));
			}}
		/>
	);
}

async function AccountProfileContent() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) return null;

	const userData = await db.query.user.findFirst({
		where: eq(schema.user.id, session.user.id),
		with: {
			renterPreferences: {
				columns: {
					phone: true,
					occupation: true,
				},
			},
		},
	});

	if (!userData) return null;

	return <AccountProfile user={userData} />;
}

async function RentalApplicationsContent() {
	const rentalApplications = [
		{
			id: "1",
			property: "Cozy 2 Bedroom Apartment",
			address: "123 Main St, Houston, TX",
			landlord: "John Smith",
			submitted: "2024-01-01",
			status: "under_review" as const,
			nextSteps: "Waiting for landlord review",
		},
		{
			id: "2",
			property: "Sunset Apartments",
			address: "456 Park Ave, Houston, TX",
			landlord: "Jane Doe",
			submitted: "2024-02-15",
			status: "approved" as const,
			nextSteps: "Schedule move-in appointment",
		},
		{
			id: "3",
			property: "Lakeside Condos",
			address: "789 Lake Dr, Houston, TX",
			landlord: "Property Management Inc.",
			submitted: "2024-03-10",
			status: "pending" as const,
			nextSteps: "Application under initial review",
		},
		{
			id: "4",
			property: "Downtown Lofts",
			address: "321 Urban St, Houston, TX",
			landlord: "City Properties LLC",
			submitted: "2024-03-15",
			status: "rejected" as const,
			nextSteps: "Contact landlord for details",
		},
	];

	return <RentalApplications applications={rentalApplications} />;
}

export default async function AccountPage() {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session?.user?.id) {
		redirect("/login");
	}

	const userData = await db.query.user.findFirst({
		where: eq(schema.user.id, session.user.id),
	});

	if (!userData) {
		redirect("/login");
	}

	const isRenter = userData.role === "renter";

	return (
		<div className="min-h-screen">
			<div className="container max-w-6xl py-6 space-y-8">
				<div>
					<h1 className="text-3xl font-bold">Account Settings</h1>
					<p className="text-muted-foreground">
						Manage your account settings and preferences
					</p>
				</div>

				<Tabs defaultValue="account" className="space-y-6">
					<TabsList>
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="saved-searches">Saved Searches</TabsTrigger>
						<TabsTrigger value="favorites">Favorites</TabsTrigger>
						{isRenter && (
							<TabsTrigger value="rental-applications">
								Applications
							</TabsTrigger>
						)}
						<TabsTrigger value="customization">Notifications</TabsTrigger>
						<TabsTrigger value="security">Security</TabsTrigger>
						<TabsTrigger value="billing">Billing</TabsTrigger>
						{isRenter && (
							<TabsTrigger value="renter-preferences">
								Housing Preferences
							</TabsTrigger>
						)}
						<TabsTrigger value="history">History & Sync</TabsTrigger>
						<TabsTrigger value="models">Models</TabsTrigger>
						<TabsTrigger value="attachments">Attachments</TabsTrigger>
						<TabsTrigger value="contact">Contact Us</TabsTrigger>
					</TabsList>

					<TabsContent value="account" className="space-y-6">
						<Suspense fallback={<LoadingState />}>
							<AccountProfileContent />
						</Suspense>
					</TabsContent>

					<TabsContent value="saved-searches" className="space-y-6">
						<Suspense fallback={<LoadingState />}>
							<SavedSearchesContent />
						</Suspense>
					</TabsContent>

					<TabsContent value="favorites" className="space-y-6">
						<Suspense fallback={<LoadingState />}>
							<FavoriteListingsContent />
						</Suspense>
					</TabsContent>

					{isRenter && (
						<TabsContent value="rental-applications" className="space-y-6">
							<Suspense fallback={<LoadingState />}>
								<RentalApplicationsContent />
							</Suspense>
						</TabsContent>
					)}

					<TabsContent value="security" className="space-y-6">
						<Suspense fallback={<LoadingState />}>
							<SecuritySettings />
						</Suspense>
					</TabsContent>

					<TabsContent value="customization" className="space-y-6">
						<Suspense fallback={<LoadingState />}>
							<NotificationPreferences />
						</Suspense>
					</TabsContent>

					<TabsContent value="billing" className="space-y-6">
						<Suspense fallback={<LoadingState />}>
							<BillingSettings />
						</Suspense>
					</TabsContent>

					{isRenter && (
						<TabsContent value="renter-preferences" className="space-y-6">
							<Suspense fallback={<LoadingState />}>
								<RenterPreferences />
							</Suspense>
						</TabsContent>
					)}

					<TabsContent value="history" className="space-y-6">
						<div className="text-muted-foreground">
							History and sync settings will be available soon.
						</div>
					</TabsContent>

					<TabsContent value="models" className="space-y-6">
						<div className="text-muted-foreground">
							Model settings will be available soon.
						</div>
					</TabsContent>

					<TabsContent value="attachments" className="space-y-6">
						<div className="text-muted-foreground">
							Attachment settings will be available soon.
						</div>
					</TabsContent>

					<TabsContent value="contact" className="space-y-6">
						<div className="text-muted-foreground">
							Contact information will be available soon.
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

import { AccountProfile } from "@/components/accounts/account-profile";
import { BillingSettings } from "@/components/accounts/billing-settings";
import { RenterPreferences } from "@/components/accounts/renter-preferences";
import { SecuritySettings } from "@/components/accounts/security-settings";
import { NotificationPreferences } from "@/components/notification-preferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import * as schema from "@/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Account Settings",
	description: "Manage your account settings and preferences",
};

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

	// Only show renter preferences if user is a renter
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
					<TabsList className="max-w-4xl mx-auto">
						<TabsTrigger value="account">Account</TabsTrigger>
						<TabsTrigger value="customization">Customization</TabsTrigger>
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
						<AccountProfile user={userData} />
						<SecuritySettings />
					</TabsContent>

					<TabsContent value="customization" className="space-y-6">
						<NotificationPreferences />
					</TabsContent>

					<TabsContent value="billing" className="space-y-6">
						<BillingSettings />
					</TabsContent>

					<Suspense fallback={<div>Loading...</div>}>
						{isRenter && (
							<TabsContent value="renter-preferences" className="space-y-6">
								<RenterPreferences />
							</TabsContent>
						)}
					</Suspense>

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

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { auth } from "@/lib/auth";
import { db } from "@/lib/database";
import { notificationPreferences } from "@/schema";
import type { SelectNotificationPreferences } from "@/schema/notificationPreferences";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

interface NotificationPreferencesData {
	emailNotifications: boolean;
	pushNotifications: boolean;
	newListings: boolean;
	applicationUpdates: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferencesData = {
	emailNotifications: true,
	pushNotifications: false,
	newListings: true,
	applicationUpdates: true,
};

export async function NotificationPreferences() {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) return null;

	// Fetch user's notification preferences with proper typing
	const preferences = (await db.query.notificationPreferences.findFirst({
		where: eq(notificationPreferences.userId, session.user.id),
	})) as SelectNotificationPreferences | undefined;

	// Merge default preferences with user preferences, ensuring type safety
	const defaultPreferences: NotificationPreferencesData = {
		emailNotifications:
			preferences?.emailNotifications ?? DEFAULT_PREFERENCES.emailNotifications,
		pushNotifications:
			preferences?.pushNotifications ?? DEFAULT_PREFERENCES.pushNotifications,
		newListings: preferences?.newListings ?? DEFAULT_PREFERENCES.newListings,
		applicationUpdates:
			preferences?.applicationUpdates ?? DEFAULT_PREFERENCES.applicationUpdates,
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Notification Preferences</CardTitle>
				<CardDescription>
					Manage how you receive updates about your rental journey
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Email Notifications</Label>
							<p className="text-sm text-muted-foreground">
								Receive updates via email
							</p>
						</div>
						<Switch
							defaultChecked={defaultPreferences.emailNotifications}
							id="email-notifications"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Push Notifications</Label>
							<p className="text-sm text-muted-foreground">
								Get instant updates on your device
							</p>
						</div>
						<Switch
							defaultChecked={defaultPreferences.pushNotifications}
							id="push-notifications"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>New Listings</Label>
							<p className="text-sm text-muted-foreground">
								Get notified about new properties matching your preferences
							</p>
						</div>
						<Switch
							defaultChecked={defaultPreferences.newListings}
							id="new-listings"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="space-y-0.5">
							<Label>Application Updates</Label>
							<p className="text-sm text-muted-foreground">
								Receive updates about your rental applications
							</p>
						</div>
						<Switch
							defaultChecked={defaultPreferences.applicationUpdates}
							id="application-updates"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

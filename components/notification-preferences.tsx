import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function NotificationPreferences() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Notification Preferences</CardTitle>
				<CardDescription>
					Manage how you receive notifications and updates
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<h3 className="text-lg font-medium mb-4">Email Notifications</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Property Updates</Label>
								<p className="text-sm text-muted-foreground">
									Receive updates about your properties
								</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Maintenance Requests</Label>
								<p className="text-sm text-muted-foreground">
									Get notified about new maintenance requests
								</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Payment Reminders</Label>
								<p className="text-sm text-muted-foreground">
									Receive payment due date reminders
								</p>
							</div>
							<Switch defaultChecked />
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Push Notifications</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Important Updates</Label>
								<p className="text-sm text-muted-foreground">
									Receive push notifications for important updates
								</p>
							</div>
							<Switch defaultChecked />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Messages</Label>
								<p className="text-sm text-muted-foreground">
									Get notified about new messages
								</p>
							</div>
							<Switch defaultChecked />
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Marketing Communications</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Newsletter</Label>
								<p className="text-sm text-muted-foreground">
									Receive our monthly newsletter
								</p>
							</div>
							<Switch />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Promotional Offers</Label>
								<p className="text-sm text-muted-foreground">
									Get notified about special offers and promotions
								</p>
							</div>
							<Switch />
						</div>
					</div>
				</div>

				<div className="flex justify-end">
					<Button>Save Preferences</Button>
				</div>
			</CardContent>
		</Card>
	);
}

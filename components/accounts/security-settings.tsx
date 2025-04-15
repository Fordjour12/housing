import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecuritySettings() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Security Settings</CardTitle>
				<CardDescription>
					Manage your account security and privacy settings
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<h3 className="text-lg font-medium mb-4">Account Protection</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Two-Factor Authentication</Label>
								<p className="text-sm text-muted-foreground">
									Add an extra layer of security to your account
								</p>
							</div>
							<Switch />
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Secure Login History</Label>
								<p className="text-sm text-muted-foreground">
									Keep track of your login sessions
								</p>
							</div>
							<Switch defaultChecked />
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Password</h3>
					<div className="space-y-4">
						<div className="grid gap-2">
							<Label>Current Password</Label>
							<Input type="password" />
						</div>
						<div className="grid gap-2">
							<Label>New Password</Label>
							<Input type="password" />
						</div>
						<div className="grid gap-2">
							<Label>Confirm New Password</Label>
							<Input type="password" />
						</div>
						<Button>Update Password</Button>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Account Actions</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Export Data</Label>
								<p className="text-sm text-muted-foreground">
									Download a copy of your account data
								</p>
							</div>
							<Button variant="outline">Export</Button>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Delete Account</Label>
								<p className="text-sm text-muted-foreground">
									Permanently delete your account and all data
								</p>
							</div>
							<Button variant="destructive">Delete</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

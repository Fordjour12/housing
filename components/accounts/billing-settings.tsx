import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function BillingSettings() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Billing Settings</CardTitle>
				<CardDescription>
					Manage your subscription and billing information
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div>
					<h3 className="text-lg font-medium mb-4">Current Plan</h3>
					<div className="flex items-center justify-between bg-muted p-4 rounded-lg">
						<div className="space-y-1">
							<div className="flex items-center gap-2">
								<h4 className="font-medium">Free Plan</h4>
								<Badge>Current</Badge>
							</div>
							<p className="text-sm text-muted-foreground">
								Basic features with limited usage
							</p>
						</div>
						<Button variant="outline">Upgrade Plan</Button>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Usage</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>Message Usage</Label>
								<p className="text-sm text-muted-foreground">
									0/20 messages remaining
								</p>
							</div>
							<div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
								<div className="w-0 h-full bg-primary" />
							</div>
						</div>
						<p className="text-sm text-muted-foreground">
							Resets tomorrow at 12:00 AM
						</p>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Payment Method</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label>No payment method added</Label>
								<p className="text-sm text-muted-foreground">
									Add a payment method to upgrade your plan
								</p>
							</div>
							<Button variant="outline">Add Payment Method</Button>
						</div>
					</div>
				</div>

				<div className="border-t pt-6">
					<h3 className="text-lg font-medium mb-4">Billing History</h3>
					<div className="space-y-4">
						<div className="text-sm text-muted-foreground">
							No billing history available
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

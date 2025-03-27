"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RoleGuard } from "@/components/auth/role-guard";
import { PlusCircle, ListFilter, UserPlus, Building2 } from "lucide-react";

/**
 * Example of a feature restricted to landlords and property managers
 */
export function CreateListingButton() {
	return (
		<RoleGuard requiredPermission="canCreateListings">
			<Button className="flex items-center gap-2">
				<PlusCircle className="h-4 w-4" />
				Create New Listing
			</Button>
		</RoleGuard>
	);
}

/**
 * Example of a feature restricted to renters
 */
export function ApplyForRentalButton() {
	return (
		<RoleGuard requiredPermission="canApplyForRentals">
			<Button className="flex items-center gap-2">
				<UserPlus className="h-4 w-4" />
				Apply for This Rental
			</Button>
		</RoleGuard>
	);
}

/**
 * Example of a feature restricted to property managers
 */
export function PropertyManagementDashboard() {
	return (
		<RoleGuard
			requiredPermission="canManageMultipleProperties"
			fallback={
				<Card>
					<CardHeader>
						<CardTitle>Property Management</CardTitle>
						<CardDescription>
							Upgrade to a property manager account to access enhanced
							management features.
						</CardDescription>
					</CardHeader>
				</Card>
			}
		>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Building2 className="h-5 w-5" />
						Property Management Dashboard
					</CardTitle>
					<CardDescription>
						Manage all your properties and team members from one place.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>
						This dashboard shows property managers statistics and management
						tools for all properties.
					</p>
					<div className="grid grid-cols-3 gap-4 mt-4">
						<Card className="p-4">
							<h3 className="font-medium">15 Properties</h3>
							<p className="text-sm text-muted-foreground">Under Management</p>
						</Card>
						<Card className="p-4">
							<h3 className="font-medium">8 Team Members</h3>
							<p className="text-sm text-muted-foreground">Active</p>
						</Card>
						<Card className="p-4">
							<h3 className="font-medium">93% Occupancy</h3>
							<p className="text-sm text-muted-foreground">Rate</p>
						</Card>
					</div>
				</CardContent>
			</Card>
		</RoleGuard>
	);
}

/**
 * Example of a feature restricted to landlords and property managers
 */
export function AnalyticsDashboard() {
	return (
		<RoleGuard requiredPermission="canViewAnalytics">
			<Card>
				<CardHeader>
					<CardTitle>Analytics Dashboard</CardTitle>
					<CardDescription>
						Track performance and metrics for your properties.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Your property analytics dashboard would appear here.</p>
				</CardContent>
			</Card>
		</RoleGuard>
	);
}

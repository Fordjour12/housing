"use client";

import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Search } from "lucide-react";
import Link from "next/link";

export default function ApplicationsPage() {
	const { user } = useUser();

	// If user is not logged in, show a message
	if (!user) {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">
							Please log in to view your applications
						</p>
						<Button asChild>
							<Link href="/login">Log In</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	// If user is not a renter, show a message
	if (user.role !== "renter") {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">
							This page is only available for renters
						</p>
						<Button asChild>
							<Link href="/listings">Browse Listings</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-col space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold">Rental Applications</h1>
						<p className="text-muted-foreground mt-1">
							Track the status of your rental applications
						</p>
					</div>
					<Button asChild>
						<Link href="/listings">Browse Listings</Link>
					</Button>
				</div>

				{/* Applications List */}
				<Card>
					<CardContent className="p-6">
						{user.rentalApplications && user.rentalApplications.length > 0 ? (
							<div className="space-y-4">
								{user.rentalApplications.map((application) => (
									<div
										key={application.id}
										className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
									>
										<div className="flex flex-col md:flex-row justify-between md:items-center">
											<div>
												<h3 className="font-medium">{application.property}</h3>
												<p className="text-sm text-muted-foreground">
													{application.address}
												</p>
											</div>
											<Badge
												className={`mt-2 md:mt-0 w-fit ${
													application.status === "approved"
														? "bg-green-500"
														: application.status === "rejected"
															? "bg-red-500"
															: "bg-amber-500"
												}`}
											>
												{application.status === "approved"
													? "Approved"
													: application.status === "rejected"
														? "Rejected"
														: "Under Review"}
											</Badge>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
											<div>
												<p className="text-xs text-muted-foreground">
													Landlord
												</p>
												<p className="text-sm font-medium">
													{application.landlord}
												</p>
											</div>
											<div>
												<p className="text-xs text-muted-foreground">
													Submitted
												</p>
												<p className="text-sm font-medium">
													{new Date(application.submitted).toLocaleDateString()}
												</p>
											</div>
											<div>
												<p className="text-xs text-muted-foreground">
													Next Steps
												</p>
												<p className="text-sm font-medium">
													{application.nextSteps}
												</p>
											</div>
										</div>
										<div className="mt-4 flex justify-end">
											<Button variant="outline" size="sm" asChild>
												<Link href={`/applications/${application.id}`}>
													View Details
												</Link>
											</Button>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-6">
								<FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-medium">No applications yet</h3>
								<p className="text-muted-foreground mt-1 mb-4">
									Apply for properties you're interested in renting
								</p>
								<Button asChild>
									<Link href="/listings">Browse Listings</Link>
								</Button>
							</div>
						)}
					</CardContent>
				</Card>

				{/* Application Tips */}
				<Card>
					<CardHeader>
						<CardTitle>Application Tips</CardTitle>
						<CardDescription>
							Best practices for submitting rental applications
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<h4 className="font-medium">Before Applying</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Gather all required documents</li>
									<li>• Check your credit score</li>
									<li>• Prepare references</li>
									<li>• Review your rental history</li>
								</ul>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">During Application</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Fill out all fields completely</li>
									<li>• Provide accurate information</li>
									<li>• Upload clear document photos</li>
									<li>• Double-check your details</li>
								</ul>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">After Submitting</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Follow up if needed</li>
									<li>• Keep track of application status</li>
									<li>• Respond promptly to requests</li>
									<li>• Stay in communication</li>
								</ul>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Common Requirements</h4>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Photo ID</li>
									<li>• Proof of income</li>
									<li>• Rental history</li>
									<li>• Credit report</li>
								</ul>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

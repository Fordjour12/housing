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
import {
	FileText,
	Home,
	User,
	Calendar,
	CheckCircle,
	AlertCircle,
	Clock,
	MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ApplicationDetailsPage() {
	const { user } = useUser();
	const params = useParams();
	const applicationId = params.id as string;

	// If user is not logged in, show a message
	if (!user) {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">
							Please log in to view application details
						</p>
						<Button asChild>
							<Link href="/login">Log In</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	// Find the application
	const application = user.rentalApplications?.find(
		(app) => app.id === applicationId,
	);

	// If application not found, show a message
	if (!application) {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">Application not found</p>
						<Button asChild>
							<Link href="/applications">Back to Applications</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container py-10">
			<div className="flex flex-col space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold">Application Details</h1>
						<p className="text-muted-foreground mt-1">
							View and track your application status
						</p>
					</div>
					<Button variant="outline" asChild>
						<Link href="/applications">Back to Applications</Link>
					</Button>
				</div>

				{/* Status Card */}
				<Card>
					<CardContent className="p-6">
						<div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
							<div className="flex items-center gap-3">
								<div
									className={`h-12 w-12 rounded-full flex items-center justify-center ${
										application.status === "approved"
											? "bg-green-100 text-green-600"
											: application.status === "rejected"
												? "bg-red-100 text-red-600"
												: "bg-amber-100 text-amber-600"
									}`}
								>
									{application.status === "approved" ? (
										<CheckCircle className="h-6 w-6" />
									) : application.status === "rejected" ? (
										<AlertCircle className="h-6 w-6" />
									) : (
										<Clock className="h-6 w-6" />
									)}
								</div>
								<div>
									<h3 className="text-lg font-medium">
										{application.status === "approved"
											? "Application Approved"
											: application.status === "rejected"
												? "Application Rejected"
												: "Under Review"}
									</h3>
									<p className="text-sm text-muted-foreground">
										Submitted on{" "}
										{new Date(application.submitted).toLocaleDateString()}
									</p>
								</div>
							</div>
							<Badge
								className={`w-fit ${
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
					</CardContent>
				</Card>

				{/* Property Details */}
				<Card>
					<CardHeader>
						<CardTitle>Property Details</CardTitle>
						<CardDescription>
							Information about the property you applied for
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex items-start gap-3">
								<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
									<Home className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium">Property Name</p>
									<p className="text-sm text-muted-foreground">
										{application.property}
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
									<FileText className="h-5 w-5 text-blue-600" />
								</div>
								<div>
									<p className="text-sm font-medium">Address</p>
									<p className="text-sm text-muted-foreground">
										{application.address}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Landlord Information */}
				<Card>
					<CardHeader>
						<CardTitle>Landlord Information</CardTitle>
						<CardDescription>
							Contact details for the property owner
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-start gap-3">
							<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
								<User className="h-5 w-5 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium">Landlord Name</p>
								<p className="text-sm text-muted-foreground">
									{application.landlord}
								</p>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" size="sm" asChild>
								<Link href={`/messages?user=${application.landlord}`}>
									<MessageSquare className="h-4 w-4 mr-2" />
									Message Landlord
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Next Steps */}
				<Card>
					<CardHeader>
						<CardTitle>Next Steps</CardTitle>
						<CardDescription>What you need to do next</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-start gap-3">
							<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
								<Calendar className="h-5 w-5 text-blue-600" />
							</div>
							<div>
								<p className="text-sm font-medium">Required Actions</p>
								<p className="text-sm text-muted-foreground">
									{application.nextSteps}
								</p>
							</div>
						</div>
						{application.status === "approved" && (
							<div className="mt-4">
								<Button asChild>
									<Link href={`/listings/${application.id}/lease`}>
										View Lease Agreement
									</Link>
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

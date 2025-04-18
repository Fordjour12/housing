import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface RentalApplication {
	id: string;
	property: string;
	address: string;
	landlord: string;
	submitted: string;
	status: "under_review" | "approved" | "rejected" | "pending";
	nextSteps: string;
}

interface RentalApplicationsProps {
	applications: RentalApplication[];
}

const statusConfig = {
	under_review: {
		label: "Under Review",
		color: "bg-orange-100 text-orange-700 border-orange-200",
		icon: Clock,
	},
	approved: {
		label: "Approved",
		color: "bg-green-100 text-green-700 border-green-200",
		icon: CheckCircle,
	},
	rejected: {
		label: "Rejected",
		color: "bg-red-100 text-red-700 border-red-200",
		icon: XCircle,
	},
	pending: {
		label: "Pending",
		color: "bg-gray-100 text-gray-700 border-gray-200",
		icon: AlertCircle,
	},
};

export function RentalApplications({ applications }: RentalApplicationsProps) {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Rental Applications</h2>
				<p className="text-muted-foreground">
					Track the status of your rental applications
				</p>
			</div>

			<div className="space-y-4">
				{applications.length === 0 ? (
					<Card className="p-6">
						<div className="text-center text-muted-foreground">
							<p>No applications found.</p>
							<p className="text-sm mt-1">
								Start your journey by applying to properties you love.
							</p>
						</div>
					</Card>
				) : (
					applications.map((app) => {
						const status = statusConfig[app.status];
						return (
							<Card key={app.id} className="p-6">
								<div className="flex flex-col md:flex-row md:items-start gap-6">
									<div className="flex-1 space-y-4">
										<div className="flex items-start justify-between">
											<div>
												<h3 className="text-lg font-semibold">
													{app.property}
												</h3>
												<p className="text-muted-foreground text-sm">
													{app.address}
												</p>
											</div>
											<Badge
												variant="outline"
												className={`${status.color} flex items-center gap-1.5`}
											>
												<status.icon className="w-3.5 h-3.5" />
												{status.label}
											</Badge>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
											<div>
												<p className="text-muted-foreground">Landlord</p>
												<p className="font-medium">{app.landlord}</p>
											</div>
											<div>
												<p className="text-muted-foreground">Submitted</p>
												<p className="font-medium">{app.submitted}</p>
											</div>
											<div>
												<p className="text-muted-foreground">Next Steps</p>
												<p className="font-medium">{app.nextSteps}</p>
											</div>
										</div>
									</div>

									<div className="flex md:flex-col gap-3 md:w-[140px] md:flex-none">
										<Button className="flex-1" variant="outline">
											View Details
										</Button>
										<Button className="flex-1" variant="outline">
											Contact
										</Button>
									</div>
								</div>
							</Card>
						);
					})
				)}
			</div>
		</div>
	);
}

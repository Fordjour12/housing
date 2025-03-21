import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
	Mail,
	Phone,
	Home,
	Calendar,
	CreditCard,
	FileText,
} from "lucide-react";

interface TenantDetailsDialogProps {
	tenant: {
		id: number;
		name: string;
		email: string;
		phone: string;
		property: string;
		status: string;
		leaseEnd: string;
	};
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function TenantDetailsDialog({
	tenant,
	open,
	onOpenChange,
}: TenantDetailsDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-2xl">{tenant.name}</DialogTitle>
					<DialogDescription>
						<Badge
							variant={tenant.status === "Active" ? "default" : "destructive"}
							className="mt-2"
						>
							{tenant.status}
						</Badge>
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-6">
					{/* Contact Information */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Contact Information</h3>
						<div className="grid gap-3">
							<div className="flex items-center text-sm">
								<Mail className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{tenant.email}</span>
							</div>
							<div className="flex items-center text-sm">
								<Phone className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{tenant.phone}</span>
							</div>
						</div>
					</div>

					{/* Property Information */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Property Information</h3>
						<div className="grid gap-3">
							<div className="flex items-center text-sm">
								<Home className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>{tenant.property}</span>
							</div>
							<div className="flex items-center text-sm">
								<Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>Lease ends: {tenant.leaseEnd}</span>
							</div>
						</div>
					</div>

					{/* Payment Information */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Payment Information</h3>
						<div className="grid gap-3">
							<div className="flex items-center text-sm">
								<CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>Last payment: March 1, 2024</span>
							</div>
							<div className="flex items-center text-sm">
								<FileText className="h-4 w-4 mr-2 text-muted-foreground" />
								<span>Payment history: All payments up to date</span>
							</div>
						</div>
					</div>

					{/* Documents */}
					<div>
						<h3 className="text-lg font-semibold mb-3">Documents</h3>
						<div className="grid gap-2">
							<div className="flex items-center justify-between p-2 rounded-md border text-sm">
								<div className="flex items-center">
									<FileText className="h-4 w-4 mr-2 text-muted-foreground" />
									<span>Lease Agreement</span>
								</div>
								<span className="text-muted-foreground">
									Signed on Jan 1, 2024
								</span>
							</div>
							<div className="flex items-center justify-between p-2 rounded-md border text-sm">
								<div className="flex items-center">
									<FileText className="h-4 w-4 mr-2 text-muted-foreground" />
									<span>Background Check</span>
								</div>
								<span className="text-muted-foreground">
									Completed on Dec 15, 2023
								</span>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Phone, MoreVertical } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - replace with real data fetching
const tenants = [
	{
		id: 1,
		name: "John Smith",
		email: "john.smith@example.com",
		phone: "(555) 123-4567",
		property: "123 Main St, Apt 4B",
		status: "Active",
		leaseEnd: "2024-12-31",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		email: "sarah.j@example.com",
		phone: "(555) 234-5678",
		property: "456 Oak Ave, Unit 2",
		status: "Active",
		leaseEnd: "2024-08-15",
	},
	{
		id: 3,
		name: "Michael Brown",
		email: "michael.b@example.com",
		phone: "(555) 345-6789",
		property: "789 Pine St, Apt 7C",
		status: "Pending",
		leaseEnd: "2024-06-30",
	},
];

export default function TenantsManagement() {
	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Tenants</h2>
					<p className="text-muted-foreground">
						Manage your property tenants and leases.
					</p>
				</div>
				<Button>
					<UserPlus className="mr-2 h-4 w-4" />
					Add Tenant
				</Button>
			</div>

			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Contact</TableHead>
							<TableHead>Property</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Lease Ends</TableHead>
							<TableHead className="w-[50px]" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{tenants.map((tenant) => (
							<TableRow key={tenant.id}>
								<TableCell className="font-medium">{tenant.name}</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<div className="flex items-center text-sm text-muted-foreground">
											<Mail className="mr-2 h-4 w-4" />
											{tenant.email}
										</div>
										<div className="flex items-center text-sm text-muted-foreground">
											<Phone className="mr-2 h-4 w-4" />
											{tenant.phone}
										</div>
									</div>
								</TableCell>
								<TableCell>{tenant.property}</TableCell>
								<TableCell>
									<Badge
										variant={
											tenant.status === "Active" ? "default" : "destructive"
										}
									>
										{tenant.status}
									</Badge>
								</TableCell>
								<TableCell>{tenant.leaseEnd}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreVertical className="h-4 w-4" />
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>View Details</DropdownMenuItem>
											<DropdownMenuItem>Edit Tenant</DropdownMenuItem>
											<DropdownMenuItem>Manage Lease</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem className="text-destructive">
												Remove Tenant
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

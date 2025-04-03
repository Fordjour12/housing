import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2, PanelLeftDashed } from "lucide-react";

export default function Page() {
	return (
		<div className="flex flex-col h-screen">
			<div className="flex-1 overflow-y-auto">
				<div className="container mx-auto p-4">
					<h1 className="text-2xl font-bold">Property Management</h1>
					<p className="text-muted-foreground mb-6">
						Manage your properties and tenants
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Link href="/prty-man/dashboard">
							<Button
								variant="outline"
								className="w-full h-32 flex flex-col items-center justify-center gap-2"
							>
								<PanelLeftDashed className="size-5" />
								<span className="text-lg font-semibold">Dashboard</span>
								<span className="text-sm text-muted-foreground text-center">
									Manage your property Dashboard
								</span>
							</Button>
						</Link>
						<Link href="/prty-man/listings">
							<Button
								variant="outline"
								className="w-full h-32 flex flex-col items-center justify-center gap-2"
							>
								<Building2 className="size-5" />
								<span className="text-lg font-semibold">Listings</span>
								<span className="text-sm text-muted-foreground text-center">
									Manage your property listings
								</span>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

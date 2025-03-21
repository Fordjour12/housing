import TenantsManagement from "@/components/tenants-management";

export default function TenantsPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="container mx-auto py-6 flex-1">
				<h1 className="text-3xl font-bold mb-6">Tenants</h1>
				<TenantsManagement />
			</div>
		</div>
	);
}

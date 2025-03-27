import {
	ApplyForRentalButton,
	CreateListingButton,
	PropertyManagementDashboard,
} from "@/components/app-examples";

export default function TestPage() {
	return (
		<div className="flex flex-col gap-4">
			<CreateListingButton />
			<ApplyForRentalButton />
			<PropertyManagementDashboard />
		</div>
	);
}

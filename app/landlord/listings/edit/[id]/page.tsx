import LandlordHeader from "@/components/landlord-header";
import EditListingForm from "@/components/edit-listing-form";

export default async function EditListingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<div className="min-h-screen flex flex-col">
			<LandlordHeader />
			<div className="container py-6 flex-1">
				<h1 className="text-3xl font-bold mb-6">Edit Listing</h1>
				<EditListingForm id={id} />
			</div>
		</div>
	);
}

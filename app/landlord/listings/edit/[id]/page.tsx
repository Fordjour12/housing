import LandlordHeader from "@/components/landlord-header"
import EditListingForm from "@/components/edit-listing-form"

export default function EditListingPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <LandlordHeader />
      <div className="container py-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>
        <EditListingForm id={params.id} />
      </div>
    </div>
  )
}


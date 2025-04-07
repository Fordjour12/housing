import LandlordHeader from "@/components/landlord-header"
import CreateListingForm from "@/components/create-listing-form"

export default function CreateListingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandlordHeader />
      <div className="container py-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">Create New Listing</h1>
        <CreateListingForm />
      </div>
    </div>
  )
}


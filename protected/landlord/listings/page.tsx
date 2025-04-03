import LandlordHeader from "@/components/landlord-header"
import ListingManagement from "@/components/listing-management"

export default function LandlordListingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandlordHeader />
      <div className="container py-6 flex-1">
        <h1 className="text-3xl font-bold mb-6">Listing Management</h1>
        <ListingManagement />
      </div>
    </div>
  )
}


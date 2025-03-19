import ListingsWithMap from "@/components/listings-with-map"

export default function ListingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-4">
        <h1 className="text-2xl font-bold mb-4">Rental Listings</h1>
        <ListingsWithMap />
      </div>
    </div>
  )
}


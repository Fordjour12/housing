import ListingsWithMap from "@/components/listings-with-map";
import Header from "@/components/header";

export default function ListingsPage() {
	return (
		<div className="min-h-screen flex flex-col">
			<div className="container mx-auto py-4">
				{/* <h1 className="text-2xl font-bold mb-4">Rental Listings</h1> */}
				<div>
					<Header />
				</div>
				<ListingsWithMap />
			</div>
		</div>
	);
}

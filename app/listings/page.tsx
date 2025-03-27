import ListingsWithMap from "@/components/listings-with-map";
import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ListingsPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<div className="min-h-screen flex flex-col">
			<div className="container mx-auto py-4">
				{/* <h1 className="text-2xl font-bold mb-4">Rental Listings</h1> */}
				<Header user={session?.user} />
				<ListingsWithMap />
			</div>
		</div>
	);
}

import { getListing } from "@/actions/server/listing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ListingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const { data: listing, error } = await getListing(id);

	if (error || !listing) {
		notFound();
	}

	return (
		<div className="container mx-auto py-10">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/prty-man/listings">
						<Button variant="ghost" size="icon" className="h-8 w-8">
							←
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-semibold">{listing.title}</h1>
						<p className="text-sm text-muted-foreground">
							Property Listing Details
						</p>
					</div>
				</div>
				<Link href={`/prty-man/listings/${listing.id}/edit`}>
					<Button>Edit Listing</Button>
				</Link>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<div>
						<h2 className="text-lg font-semibold">Description</h2>
						<p className="text-muted-foreground">{listing.description}</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold">Price</h2>
						<p className="text-muted-foreground">
							{formatCurrency(listing.price)}
						</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold">Details</h2>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-muted-foreground">Bedrooms</p>
								<p className="font-medium">{listing.bedrooms}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Bathrooms</p>
								<p className="font-medium">{listing.bathrooms}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Square Feet</p>
								<p className="font-medium">{listing.squareFeet}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Status</p>
								<p className="font-medium capitalize">{listing.status}</p>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<h2 className="text-lg font-semibold">Location</h2>
						<p className="text-muted-foreground">
							{listing.address}
							<br />
							{listing.city}, {listing.state} {listing.zipCode}
						</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold">Availability</h2>
						<p className="text-muted-foreground">
							{listing.isAvailable ? "Available" : "Not Available"}
						</p>
					</div>

					{listing.images && listing.images.length > 0 && (
						<div>
							<h2 className="text-lg font-semibold">Images</h2>
							<div className="grid grid-cols-2 gap-4">
								{listing.images.map((image) => (
									<img
										key={image}
										src={image}
										alt={`${listing.title} property view`}
										className="aspect-square rounded-lg object-cover"
									/>
								))}
							</div>
						</div>
					)}

					{listing.amenities && listing.amenities.length > 0 && (
						<div>
							<h2 className="text-lg font-semibold">Amenities</h2>
							<div className="flex flex-wrap gap-2">
								{listing.amenities.map((amenity) => (
									<span
										key={amenity}
										className="rounded-full bg-secondary px-3 py-1 text-sm"
									>
										{amenity}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

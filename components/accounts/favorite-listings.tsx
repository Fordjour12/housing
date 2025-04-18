import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bed, Bath, Square, Trash2 } from "lucide-react";
import Link from "next/link";

interface FavoriteListing {
	id: string;
	title: string;
	address: string;
	bedrooms: number;
	bathrooms: number;
	squareFeet: number;
	price: number;
	imageUrl?: string;
}

interface FavoriteListingsProps {
	listings: FavoriteListing[];
	onDelete: (id: string) => void;
}

export function FavoriteListings({
	listings,
	onDelete,
}: FavoriteListingsProps) {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Favorite Listings</h2>
				<p className="text-muted-foreground">
					Properties you've saved for future reference
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{listings.map((listing) => (
					<Card key={listing.id} className="overflow-hidden">
						{listing.imageUrl && (
							<div className="relative h-48 w-full">
								<img
									src={listing.imageUrl}
									alt={listing.title}
									className="object-cover w-full h-full"
								/>
							</div>
						)}
						<div className="p-6 space-y-4">
							<div className="flex items-start justify-between">
								<div>
									<h3 className="text-lg font-semibold">{listing.title}</h3>
									<p className="text-muted-foreground">{listing.address}</p>
								</div>
								<p className="text-xl font-bold">
									${listing.price.toLocaleString()}/mo
								</p>
							</div>

							<div className="flex items-center gap-4 text-muted-foreground">
								<div className="flex items-center gap-1">
									<Bed className="h-4 w-4" />
									<span>{listing.bedrooms} bd</span>
								</div>
								<div className="flex items-center gap-1">
									<Bath className="h-4 w-4" />
									<span>{listing.bathrooms} ba</span>
								</div>
								<div className="flex items-center gap-1">
									<Square className="h-4 w-4" />
									<span>{listing.squareFeet.toLocaleString()} sqft</span>
								</div>
							</div>

							<div className="flex justify-between items-center">
								<Button variant="outline" asChild>
									<Link href={`/properties/${listing.id}`}>View Listing</Link>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => onDelete(listing.id)}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}

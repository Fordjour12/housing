import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import Link from "next/link";

interface SavedSearch {
	id: string;
	name: string;
	location: string;
	priceRange: {
		min: number;
		max: number;
	};
	bedrooms: string;
	lastUpdated: string;
	newListings: number;
}

interface SavedSearchesProps {
	searches: SavedSearch[];
	onDelete: (id: string) => void;
}

export function SavedSearches({ searches, onDelete }: SavedSearchesProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold">Saved Searches</h2>
					<p className="text-muted-foreground">
						Get notified when new properties match your search criteria
					</p>
				</div>
			</div>

			<div className="space-y-4">
				{searches.map((search) => (
					<Card key={search.id} className="p-6">
						<div className="flex items-start justify-between">
							<div className="space-y-4 flex-1">
								<div className="flex items-center gap-2">
									<h3 className="text-lg font-semibold">{search.name}</h3>
									{search.newListings > 0 && (
										<Badge className="h-6">{search.newListings} new</Badge>
									)}
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div>
										<p className="text-sm text-muted-foreground">Location</p>
										<p className="font-medium">{search.location}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Price Range</p>
										<p className="font-medium">
											${search.priceRange.min.toLocaleString()} - $
											{search.priceRange.max.toLocaleString()}
										</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">Bedrooms</p>
										<p className="font-medium">{search.bedrooms}</p>
									</div>
									<div>
										<p className="text-sm text-muted-foreground">
											Last Updated
										</p>
										<p className="font-medium">{search.lastUpdated}</p>
									</div>
								</div>
							</div>

							<div className="flex gap-2">
								<Button variant="outline" asChild>
									<Link href={`/properties?search=${search.id}`}>
										View Results
									</Link>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="text-destructive"
									onClick={() => onDelete(search.id)}
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

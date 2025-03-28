"use client";

import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bell, Trash2, Home, Search, BookmarkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SavedPage() {
	const { user, updateUser } = useUser();

	// If user is not logged in, show a message
	if (!user) {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">
							Please log in to view your saved items
						</p>
						<Button asChild>
							<Link href="/login">Log In</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const handleRemoveSavedSearch = (id: string) => {
		if (!user.savedSearches) return;
		const updatedSearches = user.savedSearches.filter(
			(search) => search.id !== id,
		);
		updateUser({ ...user, savedSearches: updatedSearches });
	};

	const handleRemoveFavorite = (id: number) => {
		if (!user.favoriteListings) return;
		const updatedFavorites = user.favoriteListings.filter(
			(listing) => listing.id !== id,
		);
		updateUser({ ...user, favoriteListings: updatedFavorites });
	};

	return (
		<div className="container mx-auto py-10">
			<div className="flex flex-col space-y-6">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold">Saved Items</h1>
						<p className="text-muted-foreground mt-1">
							Manage your saved searches and favorite properties
						</p>
					</div>
					<Button asChild>
						<Link href="/listings">Browse Listings</Link>
					</Button>
				</div>

				{/* Tabs */}
				<Tabs defaultValue="searches">
					<TabsList>
						<TabsTrigger value="searches" className="flex items-center gap-2">
							<Search className="h-4 w-4" />
							Saved Searches
							{user.savedSearches && user.savedSearches.length > 0 && (
								<Badge variant="secondary" className="ml-auto">
									{user.savedSearches.length}
								</Badge>
							)}
						</TabsTrigger>
						<TabsTrigger value="favorites" className="flex items-center gap-2">
							<BookmarkIcon className="h-4 w-4" />
							Favorites
							{user.favoriteListings && user.favoriteListings.length > 0 && (
								<Badge variant="secondary" className="ml-auto">
									{user.favoriteListings.length}
								</Badge>
							)}
						</TabsTrigger>
					</TabsList>

					{/* Saved Searches Tab */}
					<TabsContent value="searches">
						<Card>
							<CardHeader>
								<CardTitle>Saved Searches</CardTitle>
								<CardDescription>
									Get notified when new properties match your criteria
								</CardDescription>
							</CardHeader>
							<CardContent>
								{user.savedSearches && user.savedSearches.length > 0 ? (
									<div className="space-y-4">
										{user.savedSearches.map((search) => (
											<div
												key={search.id}
												className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
											>
												<div className="flex items-start gap-3 mb-4 md:mb-0">
													<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
														<Search className="h-5 w-5 text-primary" />
													</div>
													<div>
														<h3 className="font-medium">{search.name}</h3>
														<div className="flex flex-wrap gap-2 mt-1">
															<Badge variant="secondary">
																<MapPin className="h-3 w-3 mr-1" />
																{search.location}
															</Badge>
															<Badge variant="secondary">
																{search.priceRange}
															</Badge>
															<Badge variant="secondary">
																{search.bedrooms}
															</Badge>
														</div>
														<p className="text-xs text-muted-foreground mt-2">
															{search.newListings} new listings since{" "}
															{new Date(
																search.lastNotified,
															).toLocaleDateString()}
														</p>
													</div>
												</div>
												<div className="flex gap-2 w-full md:w-auto">
													<Button
														variant="outline"
														size="sm"
														className="flex-1 md:flex-none"
														asChild
													>
														<Link href={`/listings?${search.criteria}`}>
															View Results
														</Link>
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="flex-1 md:flex-none"
														onClick={() => handleRemoveSavedSearch(search.id)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-6">
										<Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
										<h3 className="text-lg font-medium">No saved searches</h3>
										<p className="text-muted-foreground mt-1 mb-4">
											Save your search criteria to get notified about new
											listings
										</p>
										<Button asChild>
											<Link href="/listings">Start Searching</Link>
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>

					{/* Favorites Tab */}
					<TabsContent value="favorites">
						<Card>
							<CardHeader>
								<CardTitle>Favorite Properties</CardTitle>
								<CardDescription>
									Properties you've saved for later
								</CardDescription>
							</CardHeader>
							<CardContent>
								{user.favoriteListings && user.favoriteListings.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{user.favoriteListings.map((listing) => (
											<div
												key={listing.id}
												className="group border rounded-lg overflow-hidden hover:border-primary transition-colors"
											>
												<div className="relative aspect-video">
													<Image
														src={listing.image}
														alt={listing.title}
														fill
														className="object-cover"
													/>
												</div>
												<div className="p-4">
													<div className="flex justify-between items-start">
														<div>
															<h3 className="font-medium line-clamp-1">
																{listing.title}
															</h3>
															<p className="text-sm text-muted-foreground line-clamp-1">
																{listing.address}
															</p>
														</div>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8"
															onClick={() => handleRemoveFavorite(listing.id)}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
													<div className="mt-4 flex items-center gap-4">
														<div>
															<p className="text-sm font-medium">
																${listing.price.toLocaleString()}
															</p>
															<p className="text-xs text-muted-foreground">
																per month
															</p>
														</div>
														<div className="flex gap-2">
															<Badge variant="secondary">
																{listing.beds} beds
															</Badge>
															<Badge variant="secondary">
																{listing.baths} baths
															</Badge>
														</div>
													</div>
													<div className="mt-4">
														<Button
															variant="outline"
															size="sm"
															className="w-full"
															asChild
														>
															<Link href={`/listings/${listing.id}`}>
																View Details
															</Link>
														</Button>
													</div>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="text-center py-6">
										<Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
										<h3 className="text-lg font-medium">
											No favorite properties
										</h3>
										<p className="text-muted-foreground mt-1 mb-4">
											Save properties you're interested in for easy access
										</p>
										<Button asChild>
											<Link href="/listings">Browse Listings</Link>
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

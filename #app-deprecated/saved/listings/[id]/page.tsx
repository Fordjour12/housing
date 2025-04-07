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
import {
	Home,
	MapPin,
	Bed,
	Bath,
	Square,
	Calendar,
	DollarSign,
	Heart,
	Share2,
	MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

export default function SavedListingDetailsPage() {
	const { user, updateUser } = useUser();
	const params = useParams();
	const router = useRouter();
	const listingId = Number(params.id);

	// If user is not logged in, redirect to login
	if (!user) {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">
							Please log in to view saved listings
						</p>
						<Button asChild>
							<Link href="/login">Log In</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	// Find the listing in user's favorites
	const listing = user.favoriteListings?.find((l) => l.id === listingId);

	// If listing not found, show error
	if (!listing) {
		return (
			<div className="container py-10">
				<div className="flex items-center justify-center h-[50vh]">
					<div className="text-center">
						<p className="font-medium text-xl mb-2">Listing not found</p>
						<Button asChild>
							<Link href="/saved">Back to Saved Items</Link>
						</Button>
					</div>
				</div>
			</div>
		);
	}

	const handleRemoveFavorite = () => {
		if (!user.favoriteListings) return;
		const updatedFavorites = user.favoriteListings.filter(
			(l) => l.id !== listingId,
		);
		updateUser({ ...user, favoriteListings: updatedFavorites });
		router.push("/saved");
	};

	// Mock similar listings based on the current listing
	const similarListings = [
		{
			id: listing.id + 1,
			title: `Similar Property near ${listing.title}`,
			address: `Near ${listing.address}`,
			price: listing.price * 0.9,
			beds: listing.beds,
			baths: listing.baths,
			sqft: listing.sqft,
			image: listing.image,
		},
		{
			id: listing.id + 2,
			title: `Similar Property close to ${listing.title}`,
			address: `Close to ${listing.address}`,
			price: listing.price * 1.1,
			beds: listing.beds,
			baths: listing.baths,
			sqft: listing.sqft,
			image: listing.image,
		},
	];

	// Mock image gallery with unique identifiers
	const imageGallery = [
		{ id: `${listing.id}-main`, src: listing.image },
		{ id: `${listing.id}-alt1`, src: listing.image },
		{ id: `${listing.id}-alt2`, src: listing.image },
	];

	return (
		<div className="container py-10">
			<div className="flex flex-col space-y-6">
				{/* Header with Navigation */}
				<div className="flex justify-between items-center">
					<Button variant="outline" asChild>
						<Link href="/saved">
							<span className="mr-2">←</span> Back to Saved Items
						</Link>
					</Button>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								// Implement share functionality
								navigator.clipboard.writeText(window.location.href);
							}}
						>
							<Share2 className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={handleRemoveFavorite}
						>
							<Heart className="h-4 w-4 fill-current" />
						</Button>
					</div>
				</div>

				{/* Property Images Carousel */}
				<Card className="overflow-hidden">
					<CardContent className="p-0">
						<Carousel className="w-full">
							<CarouselContent>
								{imageGallery.map((image) => (
									<CarouselItem key={image.id}>
										<div className="relative aspect-video">
											<Image
												src={image.src}
												alt={`${listing.title} - ${image.id}`}
												fill
												className="object-cover"
											/>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</CardContent>
				</Card>

				{/* Property Details */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Main Info */}
					<Card className="md:col-span-2">
						<CardHeader>
							<div className="flex justify-between items-start">
								<div>
									<CardTitle className="text-2xl">{listing.title}</CardTitle>
									<CardDescription className="flex items-center mt-1">
										<MapPin className="h-4 w-4 mr-1" />
										{listing.address}
									</CardDescription>
								</div>
								<div className="text-right">
									<div className="text-2xl font-bold">
										${listing.price.toLocaleString()}
									</div>
									<p className="text-sm text-muted-foreground">per month</p>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-4 mb-6">
								<div className="flex items-center gap-2">
									<Bed className="h-4 w-4 text-muted-foreground" />
									<span>{listing.beds} beds</span>
								</div>
								<div className="flex items-center gap-2">
									<Bath className="h-4 w-4 text-muted-foreground" />
									<span>{listing.baths} baths</span>
								</div>
								<div className="flex items-center gap-2">
									<Square className="h-4 w-4 text-muted-foreground" />
									<span>{listing.sqft} sqft</span>
								</div>
							</div>
							<div className="space-y-4">
								<div>
									<h3 className="font-medium mb-2">Description</h3>
									<p className="text-muted-foreground">
										This beautiful property features {listing.beds} bedrooms and{" "}
										{listing.baths} bathrooms, with {listing.sqft} square feet
										of living space. Located in a prime area, it offers modern
										amenities and comfortable living.
									</p>
								</div>
								<div>
									<h3 className="font-medium mb-2">Amenities</h3>
									<div className="grid grid-cols-2 gap-2">
										<Badge variant="secondary">Parking</Badge>
										<Badge variant="secondary">Air Conditioning</Badge>
										<Badge variant="secondary">In-unit Laundry</Badge>
										<Badge variant="secondary">Dishwasher</Badge>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Contact Card */}
					<Card>
						<CardHeader>
							<CardTitle>Contact Property</CardTitle>
							<CardDescription>
								Get in touch about this property
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button className="w-full" asChild>
								<Link href={`/listings/${listing.id}/apply`}>Apply Now</Link>
							</Button>
							<Button variant="outline" className="w-full" asChild>
								<Link href={`/messages?property=${listing.id}`}>
									<MessageSquare className="h-4 w-4 mr-2" />
									Message Landlord
								</Link>
							</Button>
							<div className="text-sm text-muted-foreground">
								<p className="flex items-center gap-2 mb-1">
									<Calendar className="h-4 w-4" />
									Saved on {new Date(listing.saved).toLocaleDateString()}
								</p>
								<p className="flex items-center gap-2">
									<DollarSign className="h-4 w-4" />
									Security deposit: ${(listing.price * 1.5).toLocaleString()}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Similar Properties */}
				<Card>
					<CardHeader>
						<CardTitle>Similar Properties</CardTitle>
						<CardDescription>Other properties you might like</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{similarListings.map((similar) => (
								<div
									key={similar.id}
									className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
								>
									<div className="relative w-32 h-24 rounded-md overflow-hidden">
										<Image
											src={similar.image}
											alt={similar.title}
											fill
											className="object-cover"
										/>
									</div>
									<div className="flex-1">
										<h3 className="font-medium line-clamp-1">
											{similar.title}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-1">
											{similar.address}
										</p>
										<div className="mt-2 flex items-center justify-between">
											<p className="text-sm font-medium">
												${similar.price.toLocaleString()}
											</p>
											<div className="flex gap-2">
												<Badge variant="secondary">{similar.beds} beds</Badge>
												<Badge variant="secondary">{similar.baths} baths</Badge>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

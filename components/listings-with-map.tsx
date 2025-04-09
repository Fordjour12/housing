// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
// 	Search,
// 	Heart,
// 	BedDouble,
// 	Bath,
// 	Square,
// 	SlidersHorizontal,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import GoogleMapComponent, {
// 	type PropertyLocation,
// } from "@/components/google-map";
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetDescription,
// 	SheetHeader,
// 	SheetTitle,
// 	SheetTrigger,
// } from "@/components/ui/sheet";
// import AdvancedSearch from "@/components/advanced-search";
// import type { SearchCriteria, SavedSearch } from "@/types/search";
// import { saveSearch } from "@/app/services/saved-searches";

// // Sample data for listings
// const LISTINGS_DATA = [
// 	{
// 		id: 1,
// 		title: "Cozy 2 Bedroom Apartment",
// 		address: "123 Main St, Houston, TX",
// 		price: 1650,
// 		beds: 2,
// 		baths: 2,
// 		sqft: 1200,
// 		petFriendly: true,
// 		image: "/placeholder.svg?height=400&width=600&text=Property 1",
// 		lat: 29.7604,
// 		lng: -95.3698,
// 		minutes: 15,
// 	},
// 	{
// 		id: 2,
// 		title: "Modern 3 Bedroom House",
// 		address: "456 Oak Ave, Houston, TX",
// 		price: 2100,
// 		beds: 3,
// 		baths: 2,
// 		sqft: 1800,
// 		petFriendly: true,
// 		image: "/placeholder.svg?height=400&width=600&text=Property 2",
// 		lat: 29.765,
// 		lng: -95.375,
// 		minutes: 10,
// 	},
// 	{
// 		id: 3,
// 		title: "Downtown Studio Apartment",
// 		address: "789 Center Blvd, Houston, TX",
// 		price: 1150,
// 		beds: 1,
// 		baths: 1,
// 		sqft: 650,
// 		petFriendly: false,
// 		image: "/placeholder.svg?height=400&width=600&text=Property 3",
// 		lat: 29.753,
// 		lng: -95.361,
// 		minutes: 5,
// 	},
// 	{
// 		id: 4,
// 		title: "Luxury 4 Bedroom Villa",
// 		address: "101 Park Lane, Houston, TX",
// 		price: 2950,
// 		beds: 4,
// 		baths: 3,
// 		sqft: 2500,
// 		petFriendly: true,
// 		image: "/placeholder.svg?height=400&width=600&text=Property 4",
// 		lat: 29.768,
// 		lng: -95.38,
// 		minutes: 20,
// 	},
// 	{
// 		id: 5,
// 		title: "Charming 2 Bedroom Cottage",
// 		address: "202 Elm St, Houston, TX",
// 		price: 1750,
// 		beds: 2,
// 		baths: 1,
// 		sqft: 1100,
// 		petFriendly: true,
// 		image: "/placeholder.svg?height=400&width=600&text=Property 5",
// 		lat: 29.77,
// 		lng: -95.39,
// 		minutes: 8,
// 	},
// 	{
// 		id: 6,
// 		title: "Spacious 3 Bedroom Townhouse",
// 		address: "303 Maple Dr, Houston, TX",
// 		price: 2200,
// 		beds: 3,
// 		baths: 2.5,
// 		sqft: 1950,
// 		petFriendly: false,
// 		image: "/placeholder.svg?height=400&width=600&text=Property 6",
// 		lat: 29.755,
// 		lng: -95.385,
// 		minutes: 12,
// 	},
// ];

// export default function ListingsWithMap() {
// 	const [hoveredListing, setHoveredListing] = useState<number | null>(null);
// 	const [selectedListing, setSelectedListing] = useState<number | null>(null);
// 	const [mapZoom, setMapZoom] = useState(12);
// 	const [favorites, setFavorites] = useState<number[]>([]);
// 	const [isMobileView, setIsMobileView] = useState(false);
// 	const [showMap, setShowMap] = useState(true);
// 	const [searchQuery, setSearchQuery] = useState("");
// 	const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

// 	// Handle responsive layout
// 	useEffect(() => {
// 		const handleResize = () => {
// 			setIsMobileView(window.innerWidth < 768);
// 			if (window.innerWidth < 768) {
// 				setShowMap(false);
// 			} else {
// 				setShowMap(true);
// 			}
// 		};

// 		handleResize();
// 		window.addEventListener("resize", handleResize);
// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);

// 	const toggleFavorite = (id: number) => {
// 		if (favorites.includes(id)) {
// 			setFavorites(favorites.filter((favId) => favId !== id));
// 		} else {
// 			setFavorites([...favorites, id]);
// 		}
// 	};

// 	const handleListingHover = (id: number | null) => {
// 		setHoveredListing(id);
// 	};

// 	const handleListingClick = (id: number) => {
// 		setSelectedListing(id === selectedListing ? null : id);
// 	};

// 	const zoomIn = () => {
// 		setMapZoom((prev) => Math.min(prev + 1, 18));
// 	};

// 	const zoomOut = () => {
// 		setMapZoom((prev) => Math.max(prev - 1, 10));
// 	};

// 	const toggleMapView = () => {
// 		setShowMap(!showMap);
// 	};

// 	const handleBasicSearch = (query: string) => {
// 		setSearchQuery(query);
// 		// Basic search implementation will be enhanced with the advanced search results
// 	};

// 	const handleSearch = (criteria: SearchCriteria) => {
// 		// This will be implemented with the actual search functionality
// 		console.log("Search criteria:", criteria);
// 	};

// 	const handleSaveSearch = async (
// 		search: Omit<SavedSearch, "id" | "created">,
// 	) => {
// 		try {
// 			const savedSearch = await saveSearch(search);
// 			setSavedSearches([...savedSearches, savedSearch]);
// 		} catch (error) {
// 			console.error("Error saving search:", error);
// 		}
// 	};

// 	const getMapProperties = (): PropertyLocation[] => {
// 		return LISTINGS_DATA.map((listing) => ({
// 			id: listing.id,
// 			title: listing.title,
// 			address: listing.address,
// 			lat: listing.lat,
// 			lng: listing.lng,
// 			price: listing.price,
// 			beds: listing.beds,
// 			baths: listing.baths,
// 			sqft: listing.sqft,
// 			image: listing.image,
// 		}));
// 	};

// 	return (
// 		<div className="flex flex-col h-[calc(100vh-120px)]">
// 			{/* Filters */}
// 			<div className="bg-background sticky top-0 z-10 p-4 border-b">
// 				<div className="flex flex-col md:flex-row gap-4 items-center">
// 					<div className="relative flex-1">
// 						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
// 						<Input
// 							placeholder="Search by location, address, or ZIP"
// 							className="pl-10 h-10"
// 							value={searchQuery}
// 							onChange={(e) => handleBasicSearch(e.target.value)}
// 						/>
// 					</div>
// 					<div className="flex gap-2 w-full md:w-auto">
// 						<Sheet>
// 							<SheetTrigger asChild>
// 								<Button variant="outline" size="sm">
// 									<SlidersHorizontal className="h-4 w-4 mr-2" />
// 									Advanced Search
// 								</Button>
// 							</SheetTrigger>
// 							<SheetContent side="right" className="w-full sm:w-[540px]">
// 								<SheetHeader>
// 									<SheetTitle>Advanced Search</SheetTitle>
// 									<SheetDescription>
// 										Use advanced filters to find your perfect rental
// 									</SheetDescription>
// 								</SheetHeader>
// 								<div className="mt-6">
// 									<AdvancedSearch
// 										onSearch={handleSearch}
// 										onSaveSearch={handleSaveSearch}
// 										savedSearches={savedSearches}
// 									/>
// 								</div>
// 							</SheetContent>
// 						</Sheet>
// 						{isMobileView && (
// 							<Button variant="outline" size="sm" onClick={toggleMapView}>
// 								{showMap ? "Show List" : "Show Map"}
// 							</Button>
// 						)}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Main content */}
// 			<div className="flex flex-1 overflow-hidden">
// 				{/* Listings */}
// 				{(!isMobileView || !showMap) && (
// 					<div className="w-full md:w-1/2 overflow-y-auto p-4">
// 						<div className="mb-4">
// 							<h2 className="text-xl font-bold">
// 								{LISTINGS_DATA.length} Rentals in Houston, TX
// 							</h2>
// 						</div>
// 						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
// 							{LISTINGS_DATA.map((listing) => (
// 								<div
// 									key={listing.id}
// 									className={cn(
// 										"border rounded-lg overflow-hidden transition-all duration-200",
// 										(hoveredListing === listing.id ||
// 											selectedListing === listing.id) &&
// 											"ring-2 ring-primary shadow-lg",
// 									)}
// 									onMouseEnter={() => handleListingHover(listing.id)}
// 									onMouseLeave={() => handleListingHover(null)}
// 									onClick={() => handleListingClick(listing.id)}
// 								>
// 									<div className="relative">
// 										<Image
// 											src={listing.image || "/placeholder.svg"}
// 											alt={listing.title}
// 											width={600}
// 											height={400}
// 											className="w-full h-48 object-cover"
// 										/>
// 										<div className="absolute top-2 right-2">
// 											<Button
// 												variant="ghost"
// 												size="icon"
// 												className="bg-white/80 hover:bg-white rounded-full"
// 												onClick={(e) => {
// 													e.stopPropagation();
// 													toggleFavorite(listing.id);
// 												}}
// 											>
// 												<Heart
// 													className={cn(
// 														"h-5 w-5",
// 														favorites.includes(listing.id)
// 															? "fill-red-500 text-red-500"
// 															: "text-gray-600",
// 													)}
// 												/>
// 											</Button>
// 										</div>
// 										{listing.petFriendly && (
// 											<div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
// 												PET FRIENDLY
// 											</div>
// 										)}
// 										<div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
// 											{listing.minutes} minutes ago
// 										</div>
// 									</div>
// 									<div className="p-4">
// 										<div className="flex justify-between items-start">
// 											<h3 className="text-lg font-bold">
// 												${listing.price.toLocaleString()}/mo
// 											</h3>
// 										</div>
// 										<div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
// 											<span className="flex items-center">
// 												<BedDouble className="h-4 w-4 mr-1" />
// 												{listing.beds} bd
// 											</span>
// 											<span className="flex items-center">
// 												<Bath className="h-4 w-4 mr-1" />
// 												{listing.baths} ba
// 											</span>
// 											<span className="flex items-center">
// 												<Square className="h-4 w-4 mr-1" />
// 												{listing.sqft.toLocaleString()} sqft
// 											</span>
// 										</div>
// 										<p className="text-sm mt-2">{listing.address}</p>
// 										<Button className="w-full mt-3" variant="outline">
// 											Request Viewing
// 										</Button>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				)}

// 				{/* Map */}
// 				{(!isMobileView || showMap) && (
// 					<div className="w-full md:w-1/2 bg-muted relative">
// 						<GoogleMapComponent
// 							properties={getMapProperties()}
// 							height="100%"
// 							highlightedProperty={hoveredListing || selectedListing}
// 							onMarkerClick={(property) =>
// 								handleListingClick(Number(property.id))
// 							}
// 							zoom={mapZoom}
// 						/>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

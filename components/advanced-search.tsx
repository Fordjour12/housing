import type { SavedSearch, SearchCriteria } from "@/types/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Heart, MapPin, Save, Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { geocodeAddress } from "@/app/protected/services/geocoding";

interface AdvancedSearchProps {
	onSearch: (criteria: SearchCriteria) => void;
	onSaveSearch: (search: Omit<SavedSearch, "id" | "created">) => void;
	savedSearches?: SavedSearch[];
}

type PetType = "dogs" | "cats" | "other";
type ParkingType = "covered" | "garage" | "street" | "none";
type UtilityType = "water" | "electricity" | "gas" | "internet" | "trash";
type AccessibilityFeature =
	| "wheelchair"
	| "elevator"
	| "ground-floor"
	| "step-free";
type SmokingPolicyType = "allowed" | "outside-only" | "not-allowed";
type POIType =
	| "restaurant"
	| "grocery"
	| "park"
	| "school"
	| "transit"
	| "hospital";
type AmenityType =
	| "in-unit-laundry"
	| "dishwasher"
	| "balcony"
	| "pool"
	| "gym"
	| "elevator"
	| "wheelchair-access"
	| "air-conditioning"
	| "heating";

export default function AdvancedSearch({
	onSearch,
	onSaveSearch,
	savedSearches = [],
}: AdvancedSearchProps) {
	const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
		location: {
			address: "",
		},
		priceRange: {
			min: 0,
			max: 5000,
		},
		bedrooms: [],
		bathrooms: [],
		propertyTypes: [],
		amenities: [],
		petPolicy: {
			allowed: false,
		},
	});

	const [showCommuteSearch, setShowCommuteSearch] = useState(false);
	const [showPOISearch, setShowPOISearch] = useState(false);
	const [searchName, setSearchName] = useState("");
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [drawingMode, setDrawingMode] = useState<"none" | "circle" | "polygon">(
		"none",
	);

	const handleSearch = () => {
		onSearch(searchCriteria);
	};

	const handleSaveSearch = () => {
		if (!searchName) return;

		onSaveSearch({
			name: searchName,
			criteria: searchCriteria,
			emailNotifications,
		});

		setSearchName("");
	};

	const loadSavedSearch = (search: SavedSearch) => {
		setSearchCriteria(search.criteria);
		handleSearch();
	};

	return (
		<div className="flex flex-col h-[calc(100vh-4rem)]">
			<div className="flex-1 overflow-y-auto px-4">
				<div className="sticky top-0 bg-background pt-4 pb-2 z-10">
					<h2 className="text-lg font-semibold">Advanced Search</h2>
					<p className="text-sm text-muted-foreground">
						Use advanced filters to find your perfect rental
					</p>
				</div>

				<div className="space-y-4">
					{/* Location and Radius Search */}
					<div className="space-y-2">
						<Label>Location Search</Label>
						<div className="grid gap-4">
							<div className="relative">
								<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
								<Input
									placeholder="Enter address, neighborhood, or ZIP"
									className="pl-9"
									value={searchCriteria.location.address}
									onChange={(e) =>
										setSearchCriteria({
											...searchCriteria,
											location: {
												...searchCriteria.location,
												address: e.target.value,
											},
										})
									}
								/>
							</div>
							<div className="flex gap-4">
								<Select
									value={searchCriteria.location.radius?.toString()}
									onValueChange={(value) =>
										setSearchCriteria({
											...searchCriteria,
											location: {
												...searchCriteria.location,
												radius: Number.parseInt(value),
											},
										})
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select radius" />
									</SelectTrigger>
									<SelectContent>
										{[1, 2, 5, 10, 15, 20, 25, 50].map((radius) => (
											<SelectItem key={radius} value={radius.toString()}>
												{radius} miles
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<Button
									variant="outline"
									onClick={() =>
										setDrawingMode(drawingMode === "none" ? "polygon" : "none")
									}
								>
									Draw Area
								</Button>
							</div>
						</div>
					</div>

					{/* Property Details */}
					<div className="space-y-2">
						<Label>Property Details</Label>
						<div className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label>Property Type</Label>
									<Select
										value={searchCriteria.propertyTypes?.[0]}
										onValueChange={(value) =>
											setSearchCriteria({
												...searchCriteria,
												propertyTypes: [value],
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="apartment">Apartment</SelectItem>
											<SelectItem value="house">House</SelectItem>
											<SelectItem value="condo">Condo</SelectItem>
											<SelectItem value="townhouse">Townhouse</SelectItem>
											<SelectItem value="studio">Studio</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label>Furnished</Label>
									<Select
										value={searchCriteria.furnished?.toString()}
										onValueChange={(value) =>
											setSearchCriteria({
												...searchCriteria,
												furnished: value === "true",
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Any" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="true">Furnished</SelectItem>
											<SelectItem value="false">Unfurnished</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
					</div>

					{/* Pet Policy */}
					<div className="space-y-2">
						<Label>Pet Policy</Label>
						<div className="grid gap-4">
							<div className="flex items-center space-x-2">
								<Switch
									checked={searchCriteria.petPolicy?.allowed}
									onCheckedChange={(checked) =>
										setSearchCriteria({
											...searchCriteria,
											petPolicy: {
												...searchCriteria.petPolicy,
												allowed: checked,
											},
										})
									}
								/>
								<Label>Pet Friendly</Label>
							</div>
							{searchCriteria.petPolicy?.allowed && (
								<div className="grid gap-4">
									<div>
										<Label>Allowed Pets</Label>
										<div className="flex gap-2 mt-2">
											{["dogs", "cats", "other"].map((type) => (
												<div key={type} className="flex items-center space-x-2">
													<Checkbox
														checked={searchCriteria.petPolicy?.types?.includes(
															type as PetType,
														)}
														onCheckedChange={(checked) => {
															const types =
																searchCriteria.petPolicy?.types || [];
															setSearchCriteria({
																...searchCriteria,
																petPolicy: {
																	...searchCriteria.petPolicy,
																	allowed:
																		searchCriteria.petPolicy?.allowed || false,
																	types: checked
																		? [...types, type as PetType]
																		: types.filter((t) => t !== type),
																},
															});
														}}
													/>
													<Label>
														{type.charAt(0).toUpperCase() + type.slice(1)}
													</Label>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Amenities */}
					<div className="space-y-2">
						<Label>Amenities</Label>
						<div className="grid grid-cols-2 gap-2">
							{(
								[
									"in-unit-laundry",
									"dishwasher",
									"balcony",
									"pool",
									"gym",
									"elevator",
									"wheelchair-access",
									"air-conditioning",
									"heating",
								] as const
							).map((amenity) => (
								<div key={amenity} className="flex items-center space-x-2">
									<Checkbox
										checked={searchCriteria.amenities?.includes(amenity)}
										onCheckedChange={(checked) => {
											const amenities = searchCriteria.amenities || [];
											setSearchCriteria({
												...searchCriteria,
												amenities: checked
													? [...amenities, amenity]
													: amenities.filter((a) => a !== amenity),
											});
										}}
									/>
									<Label>
										{amenity
											.split("-")
											.map(
												(word) => word.charAt(0).toUpperCase() + word.slice(1),
											)
											.join(" ")}
									</Label>
								</div>
							))}
						</div>
					</div>

					{/* Parking */}
					<div className="space-y-2">
						<Label>Parking</Label>
						<div className="grid grid-cols-2 gap-2">
							{["covered", "garage", "street", "none"].map((type) => (
								<div key={type} className="flex items-center space-x-2">
									<Checkbox
										checked={searchCriteria.parking?.includes(
											type as ParkingType,
										)}
										onCheckedChange={(checked) => {
											const parking = searchCriteria.parking || [];
											setSearchCriteria({
												...searchCriteria,
												parking: checked
													? [...parking, type as ParkingType]
													: parking.filter((p) => p !== type),
											});
										}}
									/>
									<Label>{type.charAt(0).toUpperCase() + type.slice(1)}</Label>
								</div>
							))}
						</div>
					</div>

					{/* Utilities */}
					<div className="space-y-2">
						<Label>Utilities Included</Label>
						<div className="grid grid-cols-2 gap-2">
							{["water", "electricity", "gas", "internet", "trash"].map(
								(utility) => (
									<div key={utility} className="flex items-center space-x-2">
										<Checkbox
											checked={searchCriteria.utilities?.includes(
												utility as UtilityType,
											)}
											onCheckedChange={(checked) => {
												const utilities = searchCriteria.utilities || [];
												setSearchCriteria({
													...searchCriteria,
													utilities: checked
														? [...utilities, utility as UtilityType]
														: utilities.filter((u) => u !== utility),
												});
											}}
										/>
										<Label>
											{utility.charAt(0).toUpperCase() + utility.slice(1)}
										</Label>
									</div>
								),
							)}
						</div>
					</div>

					{/* Accessibility */}
					<div className="space-y-2">
						<Label>Accessibility Features</Label>
						<div className="grid grid-cols-2 gap-2">
							{["wheelchair", "elevator", "ground-floor", "step-free"].map(
								(feature) => (
									<div key={feature} className="flex items-center space-x-2">
										<Checkbox
											checked={searchCriteria.accessibility?.includes(
												feature as AccessibilityFeature,
											)}
											onCheckedChange={(checked) => {
												const features = searchCriteria.accessibility || [];
												setSearchCriteria({
													...searchCriteria,
													accessibility: checked
														? [...features, feature as AccessibilityFeature]
														: features.filter((f) => f !== feature),
												});
											}}
										/>
										<Label>
											{feature
												.split("-")
												.map(
													(word) =>
														word.charAt(0).toUpperCase() + word.slice(1),
												)
												.join(" ")}
										</Label>
									</div>
								),
							)}
						</div>
					</div>

					{/* Smoking Policy */}
					<div className="space-y-2">
						<Label>Smoking Policy</Label>
						<Select
							value={searchCriteria.smokingPolicy}
							onValueChange={(value: SmokingPolicyType) =>
								setSearchCriteria({
									...searchCriteria,
									smokingPolicy: value,
								})
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Any" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="allowed">Allowed</SelectItem>
								<SelectItem value="outside-only">Outside Only</SelectItem>
								<SelectItem value="not-allowed">Not Allowed</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Points of Interest */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>Points of Interest</Label>
							<Switch
								checked={showPOISearch}
								onCheckedChange={setShowPOISearch}
							/>
						</div>
						{showPOISearch && (
							<div className="grid gap-4">
								{[
									"restaurant",
									"grocery",
									"park",
									"school",
									"transit",
									"hospital",
								].map((type) => (
									<div key={type} className="grid grid-cols-2 gap-4">
										<Label className="flex items-center">
											{type.charAt(0).toUpperCase() + type.slice(1)}
										</Label>
										<Select
											value={searchCriteria.pointsOfInterest
												?.find((poi) => poi.type === (type as POIType))
												?.maxDistance.toString()}
											onValueChange={(value) => {
												const pois = searchCriteria.pointsOfInterest || [];
												const existingIndex = pois.findIndex(
													(poi) => poi.type === (type as POIType),
												);
												const newPois = [...pois];

												if (existingIndex >= 0) {
													newPois[existingIndex] = {
														type: type as POIType,
														maxDistance: Number(value),
													};
												} else {
													newPois.push({
														type: type as POIType,
														maxDistance: Number(value),
													});
												}

												setSearchCriteria({
													...searchCriteria,
													pointsOfInterest: newPois,
												});
											}}
										>
											<SelectTrigger>
												<SelectValue placeholder="Select distance" />
											</SelectTrigger>
											<SelectContent>
												{[0.5, 1, 2, 5].map((distance) => (
													<SelectItem
														key={distance}
														value={distance.toString()}
													>
														Within {distance} mile{distance !== 1 ? "s" : ""}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Commute Search */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>Commute Search</Label>
							<Switch
								checked={showCommuteSearch}
								onCheckedChange={setShowCommuteSearch}
							/>
						</div>
						{showCommuteSearch && (
							<div className="grid gap-4 sm:grid-cols-2 mt-2">
								<div className="space-y-2">
									<Label>Destination</Label>
									<Input
										placeholder="Enter work/school address"
										value={searchCriteria.commute?.to.address || ""}
										onChange={(e) => {
											const address = e.target.value;
											setSearchCriteria((prev) => ({
												...prev,
												commute: {
													...prev.commute,
													to: {
														address,
														coordinates: prev.commute?.to.coordinates || {
															lat: 0,
															lng: 0,
														},
													},
													maxTime: prev.commute?.maxTime || 30,
													transportMode:
														prev.commute?.transportMode || "driving",
												},
											}));

											if (address.trim()) {
												geocodeAddress(address)
													.then((coords) => {
														if (coords) {
															setSearchCriteria((prev) => ({
																...prev,
																commute: {
																	...prev.commute,
																	to: {
																		address,
																		coordinates: coords,
																	},
																	maxTime: prev.commute?.maxTime || 30,
																	transportMode:
																		prev.commute?.transportMode || "driving",
																},
															}));
														}
													})
													.catch((error) => {
														console.error("Failed to geocode address:", error);
													});
											}
										}}
									/>
								</div>
								<div className="space-y-2">
									<Label>Max Commute Time</Label>
									<Select
										value={searchCriteria.commute?.maxTime?.toString()}
										onValueChange={(value) =>
											setSearchCriteria({
												...searchCriteria,
												commute: {
													...(searchCriteria.commute || {}),
													maxTime: Number.parseInt(value),
													to: searchCriteria.commute?.to || {
														address: "",
														coordinates: { lat: 0, lng: 0 },
													},
													transportMode:
														searchCriteria.commute?.transportMode || "driving",
												},
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select time" />
										</SelectTrigger>
										<SelectContent>
											{[15, 30, 45, 60, 90].map((time) => (
												<SelectItem key={time} value={time.toString()}>
													{time} minutes
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2 sm:col-span-2">
									<Label>Transport Mode</Label>
									<Select
										value={searchCriteria.commute?.transportMode}
										onValueChange={(
											value: "driving" | "transit" | "walking" | "bicycling",
										) =>
											setSearchCriteria({
												...searchCriteria,
												commute: {
													...(searchCriteria.commute || {}),
													transportMode: value,
													to: searchCriteria.commute?.to || {
														address: "",
														coordinates: { lat: 0, lng: 0 },
													},
													maxTime: searchCriteria.commute?.maxTime || 30,
												},
											})
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select mode" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="driving">Driving</SelectItem>
											<SelectItem value="transit">Public Transit</SelectItem>
											<SelectItem value="walking">Walking</SelectItem>
											<SelectItem value="bicycling">Bicycling</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						)}

						{/* Save Search */}
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label>Save Search</Label>
								<div className="flex items-center space-x-2">
									<Label htmlFor="notifications" className="text-sm">
										Email Notifications
									</Label>
									<Switch
										id="notifications"
										checked={emailNotifications}
										onCheckedChange={setEmailNotifications}
									/>
								</div>
							</div>
							<div className="flex gap-2">
								<Input
									placeholder="Name your search"
									value={searchName}
									onChange={(e) => setSearchName(e.target.value)}
								/>
								<Button variant="outline" onClick={handleSaveSearch}>
									<Save className="h-4 w-4 mr-2" />
									Save
								</Button>
							</div>
						</div>

						{/* Saved Searches */}
						{savedSearches.length > 0 && (
							<div className="space-y-2">
								<Label>Saved Searches</Label>
								<div className="grid gap-2">
									{savedSearches.map((search) => (
										<Button
											key={search.id}
											variant="outline"
											className="w-full justify-start"
											onClick={() => loadSavedSearch(search)}
										>
											<Heart className="h-4 w-4 mr-2" />
											{search.name}
											{search.newListings ? (
												<span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
													{search.newListings} new
												</span>
											) : null}
										</Button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Search Button Container */}
			<div className="sticky bottom-0 w-full bg-background border-t px-4 py-4 mt-auto">
				<Button className="w-full" onClick={handleSearch}>
					<Search className="h-4 w-4 mr-2" />
					Search Properties
				</Button>
			</div>
		</div>
	);
}

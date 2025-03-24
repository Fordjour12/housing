"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { UploadIcon, Loader2 } from "lucide-react";

interface ListingConfirmationProps {
	onNext: (data: { photos: string[] }) => void;
	onBack: () => void;
	formData: {
		property: any;
		rental: any;
		management: any;
		photos: string[];
	};
}

export default function ListingConfirmation({
	onNext,
	onBack,
	formData,
}: ListingConfirmationProps) {
	const [photos, setPhotos] = useState<string[]>(formData.photos || []);
	const [isUploading, setIsUploading] = useState(false);
	const [isDraftSaving, setIsDraftSaving] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);

	// Handle photo upload
	const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsUploading(true);

		// Simulate photo upload with a delay
		setTimeout(() => {
			const files = e.target.files;
			if (files) {
				const newPhotos = [...photos];

				// For demo purposes, we're just creating fake URLs
				// In production, you would upload to a storage service
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					const fakeUrl = URL.createObjectURL(file);
					newPhotos.push(fakeUrl);
				}

				setPhotos(newPhotos);
			}
			setIsUploading(false);
		}, 1000);
	};

	// Handle photo removal
	const removePhoto = (index: number) => {
		const newPhotos = [...photos];
		newPhotos.splice(index, 1);
		setPhotos(newPhotos);
	};

	// Handle form submission
	const handlePublish = () => {
		setIsPublishing(true);

		// Simulate API call
		setTimeout(() => {
			onNext({ photos });
			setIsPublishing(false);
		}, 1500);
	};

	// Handle saving as draft
	const handleSaveAsDraft = () => {
		setIsDraftSaving(true);

		// Simulate API call
		setTimeout(() => {
			// Instead of proceeding to the next step, you might redirect elsewhere
			// or show a different UI, but for demo we'll just move forward
			onNext({ photos });
			setIsDraftSaving(false);
		}, 1000);
	};

	// Format utility names
	const formatUtilityName = (id: string) => {
		const utilityMap: Record<string, string> = {
			water: "Water",
			electricity: "Electricity",
			gas: "Gas",
			trash: "Trash",
			internet: "Internet",
		};
		return utilityMap[id] || id;
	};

	// Format amenity names
	const formatAmenityName = (id: string) => {
		const amenityMap: Record<string, string> = {
			laundry: "In-unit Laundry",
			parking: "Parking",
			"pet-friendly": "Pet-Friendly",
			ac: "Air Conditioning",
			dishwasher: "Dishwasher",
			balcony: "Balcony/Patio",
			pool: "Swimming Pool",
			gym: "Gym",
			elevator: "Elevator",
			wheelchair: "Wheelchair Access",
		};
		return amenityMap[id] || id;
	};

	return (
		<Card className="max-w-2xl mx-auto p-8">
			<div className="mb-6">
				<h2 className="text-2xl font-bold">Review & Publish Your Listing</h2>
				<p className="text-gray-500">
					Review your property details and add photos before publishing.
				</p>
			</div>

			<ScrollArea className="h-[400px] mb-6 rounded-md border p-4">
				{/* Property Information Section */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">Property Information</h3>
					<div className="space-y-2">
						<div>
							<span className="font-medium">Address: </span>
							<span>
								{formData.property.streetAddress}
								{formData.property.unitNumber &&
									`, ${formData.property.unitNumber}`}
								, {formData.property.city}, {formData.property.state}{" "}
								{formData.property.zip}
							</span>
						</div>
						<div>
							<span className="font-medium">Property Type: </span>
							<span>{formData.property.propertyType}</span>
						</div>
						<div>
							<span className="font-medium">Bedrooms: </span>
							<span>{formData.property.bedrooms}</span>
						</div>
						<div>
							<span className="font-medium">Bathrooms: </span>
							<span>{formData.property.bathrooms}</span>
						</div>
						{formData.property.squareFootage && (
							<div>
								<span className="font-medium">Square Footage: </span>
								<span>{formData.property.squareFootage} sq ft</span>
							</div>
						)}
						{formData.property.yearBuilt && (
							<div>
								<span className="font-medium">Year Built: </span>
								<span>{formData.property.yearBuilt}</span>
							</div>
						)}
					</div>
				</div>

				<Separator className="my-4" />

				{/* Rental Details Section */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">Rental Details</h3>
					<div className="space-y-2">
						<div>
							<span className="font-medium">Rent: </span>
							<span>${formData.rental.rentAmount}/month</span>
						</div>
						<div>
							<span className="font-medium">Security Deposit: </span>
							<span>${formData.rental.securityDeposit}</span>
						</div>
						<div>
							<span className="font-medium">Lease Duration: </span>
							<span>
								{formData.rental.leaseDurations
									.map((duration: string) => {
										switch (duration) {
											case "month-to-month":
												return "Month-to-Month";
											case "6-months":
												return "6 Months";
											case "1-year":
												return "1 Year";
											case "other":
												return "Other";
											default:
												return duration;
										}
									})
									.join(", ")}
							</span>
						</div>
						<div>
							<span className="font-medium">Available From: </span>
							<span>
								{formData.rental.availabilityDate
									? new Date(
											formData.rental.availabilityDate,
										).toLocaleDateString()
									: "Not specified"}
							</span>
						</div>

						{formData.rental.description && (
							<div>
								<span className="font-medium">Description: </span>
								<span>{formData.rental.description}</span>
							</div>
						)}

						{formData.rental.amenities &&
							formData.rental.amenities.length > 0 && (
								<div>
									<span className="font-medium">Amenities: </span>
									<span>
										{formData.rental.amenities
											.map((amenity: string) => formatAmenityName(amenity))
											.join(", ")}
									</span>
								</div>
							)}

						<div>
							<span className="font-medium">Pet Policy: </span>
							<span>
								{formData.rental.petPolicy === "allowed"
									? "Pets Allowed"
									: formData.rental.petPolicy === "not-allowed"
										? "No Pets Allowed"
										: "Case-by-Case Basis"}
								{formData.rental.petPolicy === "case-by-case" &&
									formData.rental.petRestrictions &&
									` (${formData.rental.petRestrictions})`}
							</span>
						</div>

						{formData.rental.utilitiesIncluded &&
							formData.rental.utilitiesIncluded.length > 0 && (
								<div>
									<span className="font-medium">Utilities Included: </span>
									<span>
										{formData.rental.utilitiesIncluded
											.map((utility: string) => formatUtilityName(utility))
											.join(", ")}
									</span>
								</div>
							)}
					</div>
				</div>

				<Separator className="my-4" />

				{/* Management Preferences */}
				<div className="mb-6">
					<h3 className="text-lg font-semibold mb-2">Management Preferences</h3>
					<div className="space-y-2">
						<div>
							<span className="font-medium">Contact Display: </span>
							<span>
								{formData.management.contactDisplay === "phone_and_email"
									? "Display phone and email"
									: "Display email only"}
							</span>
						</div>
						<div>
							<span className="font-medium">Application Process: </span>
							<span>
								{formData.management.applicationProcess === "self_managed"
									? "Self-managed"
									: "App-managed"}
							</span>
						</div>

						{formData.management.screeningPreferences &&
							formData.management.screeningPreferences.length > 0 && (
								<div>
									<span className="font-medium">Screening Preferences: </span>
									<span>
										{formData.management.screeningPreferences
											.map((pref: string) => {
												switch (pref) {
													case "credit_check":
														return "Credit Check";
													case "background_check":
														return "Background Check";
													case "income_verification":
														return "Income Verification";
													default:
														return pref;
												}
											})
											.join(", ")}
									</span>
								</div>
							)}

						<div>
							<span className="font-medium">Lease Signing: </span>
							<span>
								{formData.management.leaseSigningPreference === "digital"
									? "Digital"
									: "Offline"}
							</span>
						</div>
					</div>
				</div>
			</ScrollArea>

			{/* Photo Upload Section */}
			<div className="mb-6">
				<h3 className="text-lg font-semibold mb-2">Property Photos</h3>
				<p className="text-sm text-gray-500 mb-4">
					High-quality photos significantly increase interest in your listing.
					Upload at least 3 photos.
				</p>

				{/* Photo upload button */}
				<div className="mb-4">
					<Input
						id="photo-upload"
						type="file"
						multiple
						accept="image/*"
						className="hidden"
						onChange={handlePhotoUpload}
						disabled={isUploading}
					/>
					<label
						htmlFor="photo-upload"
						className="cursor-pointer inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
					>
						{isUploading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Uploading...
							</>
						) : (
							<>
								<UploadIcon className="mr-2 h-4 w-4" />
								Upload Photos
							</>
						)}
					</label>
				</div>

				{/* Photo preview */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{photos.map((photo, index) => (
						<div key={index} className="relative group">
							<img
								src={photo}
								alt={`Property photo ${index + 1}`}
								className="w-full h-24 object-cover rounded-md"
							/>
							<button
								onClick={() => removePhoto(index)}
								className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex justify-between">
				<Button type="button" variant="outline" onClick={onBack}>
					Back
				</Button>
				<div className="space-x-2">
					<Button
						type="button"
						variant="outline"
						onClick={handleSaveAsDraft}
						disabled={isDraftSaving || isPublishing}
					>
						{isDraftSaving ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Saving...
							</>
						) : (
							"Save as Draft"
						)}
					</Button>
					<Button
						type="button"
						onClick={handlePublish}
						disabled={photos.length === 0 || isDraftSaving || isPublishing}
					>
						{isPublishing ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Publishing...
							</>
						) : (
							"Publish Listing"
						)}
					</Button>
				</div>
			</div>
		</Card>
	);
}

"use client";

import { createProperty } from "@/actions/server/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Import or define the required types
interface PropertyData {
	streetAddress?: string;
	unitNumber?: string;
	city?: string;
	state?: string;
	zip?: string;
	propertyType?:
		| "single_family"
		| "multi_family"
		| "apartment"
		| "condo"
		| "townhouse";
	bedrooms?: string;
	bathrooms?: string;
	squareFootage?: string;
	yearBuilt?: string;
}

interface RentalData {
	rentAmount: string;
	securityDeposit: string;
	leaseDurations: string[];
	availabilityDate: Date;
	description?: string;
	amenities: string[];
	petPolicy: string;
	petRestrictions?: string;
	utilitiesIncluded: string[];
}

interface ManagementData {
	contactDisplay: "phone_and_email" | "email_only";
	applicationProcess: "self_managed" | "app_managed";
	screeningPreferences: string[];
	communicationPreferences: string[];
	leaseSigningPreference: "digital" | "offline";
}

interface ListingConfirmationProps {
	onNext: (data: { photos: string[] }) => void;
	onBack: () => void;
	formData: {
		property: PropertyData;
		rental: RentalData;
		management: ManagementData;
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
	const router = useRouter();

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
	const handlePublish = async () => {
		setIsPublishing(true);

		try {
			// Make sure required fields exist
			if (
				!formData.property.streetAddress ||
				!formData.property.city ||
				!formData.property.state ||
				!formData.property.zip ||
				!formData.property.propertyType ||
				!formData.property.bedrooms ||
				!formData.property.bathrooms
			) {
				toast.error("Missing required property information");
				setIsPublishing(false);
				return;
			}

			const propertyData = {
				streetAddress: formData.property.streetAddress,
				unitNumber: formData.property.unitNumber,
				city: formData.property.city,
				state: formData.property.state,
				zip: formData.property.zip,
				propertyType: formData.property.propertyType,
				bedrooms: formData.property.bedrooms,
				bathrooms: formData.property.bathrooms,
				squareFootage: formData.property.squareFootage,
				yearBuilt: formData.property.yearBuilt,
			};

			const result = await createProperty({
				property: propertyData,
				rental: formData.rental,
				management: formData.management,
				photos,
			});

			if (result.success) {
				toast.success("Property listing published successfully!");
				onNext({ photos }); // Ensure we pass the photos back

				// Safe navigation for result.data
				if (result.data?.id) {
					router.push(`/landlord/listings/${result.data.id}`);
				} else {
					router.push("/landlord/listings");
				}
			} else {
				toast.error(result.error || "Failed to publish listing");
			}
		} catch (error) {
			console.error("Error publishing listing:", error);
			toast.error("Failed to publish listing");
		} finally {
			setIsPublishing(false);
		}
	};

	// Handle saving as draft
	const handleSaveAsDraft = async () => {
		setIsDraftSaving(true);

		try {
			// Make sure required fields exist
			if (
				!formData.property.streetAddress ||
				!formData.property.city ||
				!formData.property.state ||
				!formData.property.zip ||
				!formData.property.propertyType ||
				!formData.property.bedrooms ||
				!formData.property.bathrooms
			) {
				toast.error("Missing required property information");
				setIsDraftSaving(false);
				return;
			}

			const propertyData = {
				streetAddress: formData.property.streetAddress,
				unitNumber: formData.property.unitNumber,
				city: formData.property.city,
				state: formData.property.state,
				zip: formData.property.zip,
				propertyType: formData.property.propertyType,
				bedrooms: formData.property.bedrooms,
				bathrooms: formData.property.bathrooms,
				squareFootage: formData.property.squareFootage,
				yearBuilt: formData.property.yearBuilt,
			};

			const result = await createProperty({
				property: propertyData,
				rental: formData.rental,
				management: formData.management,
				photos,
			});

			if (result.success) {
				toast.success("Property listing saved as draft!");
				onNext({ photos }); // Ensure we pass the photos back
				router.push("/landlord/listings");
			} else {
				toast.error(result.error || "Failed to save draft");
			}
		} catch (error) {
			console.error("Error saving draft:", error);
			toast.error("Failed to save draft");
		} finally {
			setIsDraftSaving(false);
		}
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

	// Format pet policy
	const formatPetPolicy = (policy: string) => {
		const policyMap: Record<string, string> = {
			"no-pets": "No Pets Allowed",
			"cats-only": "Cats Only",
			"dogs-only": "Dogs Only",
			"cats-and-dogs": "Cats and Dogs Allowed",
			"case-by-case": "Case-by-Case Basis",
		};
		return policyMap[policy] || policy;
	};

	// Map screening preferences to display text
	const getScreeningText = (pref: string) => {
		const prefMap: Record<string, string> = {
			credit_check: "Credit Check",
			background_check: "Background Check",
			income_verification: "Income Verification",
		};
		return prefMap[pref] || pref;
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
								{formatPetPolicy(formData.rental.petPolicy)}
								{formData.rental.petRestrictions &&
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
											.map((pref: string) => getScreeningText(pref))
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
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
					{photos.map((photo, index) => (
						<div
							key={`photo-${index}-${photo.substring(0, 10)}`}
							className="relative"
						>
							<img
								src={photo}
								alt={`View ${index + 1} of the property`}
								className="w-full h-32 object-cover rounded-md"
								loading="lazy"
							/>
							<button
								type="button"
								onClick={() => removePhoto(index)}
								className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
								aria-label={`Remove view ${index + 1}`}
							>
								<span className="sr-only">Remove view {index + 1}</span>×
							</button>
						</div>
					))}
				</div>
				<div className="flex items-center gap-4">
					<label
						htmlFor="photo-upload"
						className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
					>
						<UploadIcon className="w-5 h-5" />
						<span>Upload Photos</span>
						<input
							id="photo-upload"
							type="file"
							accept="image/*"
							multiple
							onChange={handlePhotoUpload}
							className="hidden"
							aria-label="Upload property photos"
						/>
					</label>
					{isUploading && (
						<div className="flex items-center gap-2 text-gray-500">
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>Uploading...</span>
						</div>
					)}
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
					<Button
						type="button"
						onClick={() => onNext({ photos })}
						disabled={isDraftSaving || isPublishing}
					>
						Continue
					</Button>
				</div>
			</div>
		</Card>
	);
}

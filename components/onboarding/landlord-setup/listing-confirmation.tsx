"use client";

// import { createProperty } from "@/actions/server/property";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, UploadIcon } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

import type {
	PropertyInformationFormValues,
	RentalDetailsFormValues,
	ManagementPreferencesFormValues,
	PhotosFormValues,
	LandlordFormValues,
} from "./landlord-schema";
import { completeLandlordOnboarding } from "@/actions/server/onboarding";

interface ListingConfirmationProps {
	onNextAction: (data: PhotosFormValues) => void;
	onBackAction: () => void;
	formData: LandlordFormValues;
}

const UTILITY_MAP: Record<string, string> = {
	water: "Water",
	electricity: "Electricity",
	gas: "Gas",
	trash: "Trash",
	internet: "Internet",
};

const AMENITY_MAP: Record<string, string> = {
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

const PET_POLICY_MAP: Record<string, string> = {
	allowed: "Pets Allowed",
	not_allowed: "No Pets",
	case_by_case: "Case by Case Basis",
};

const SCREENING_MAP: Record<string, string> = {
	credit_check: "Credit Check",
	background_check: "Background Check",
	income_verification: "Income Verification",
};

export default function ListingConfirmation({
	onNextAction,
	onBackAction,
	formData,
}: ListingConfirmationProps) {
	const [photos, setPhotos] = useState<string[]>(formData.photos.photos || []);
	const [isUploading, setIsUploading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isPublishing, setIsPublishing] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Handle photo upload button click
	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	// Handle actual file change
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
			// Reset the input value so the same file can be selected again
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
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
			const result = await completeLandlordOnboarding(formData);
			if (result.success) {
				toast.success("Property listing published successfully!");
				onNextAction({ photos });
			} else {
				toast.error("Failed to publish listing");
			}
		} catch (error) {
			console.error("Error publishing listing:", error);
			toast.error("Failed to publish listing");
		} finally {
			setIsPublishing(false);
		}
	};

	// Handle saving as draft
	const handleSaveDraft = () => {
		toast("coming soon", {
			description: "This feature is coming soon!",
		});
		// setIsSaving(true);
		// try {
		// 	// Make sure required fields exist
		// 	if (
		// 		!formData.property.streetAddress ||
		// 		!formData.property.city ||
		// 		!formData.property.state ||
		// 		!formData.property.zip ||
		// 		!formData.property.propertyType ||
		// 		!formData.property.bedrooms ||
		// 		!formData.property.bathrooms
		// 	) {
		// 		toast.error("Missing required property information");
		// 		setIsSaving(false);
		// 		return;
		// 	}
		// 	const result = await fetch("/api/properties/draft", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			...formData,
		// 			photos: { photos },
		// 		}),
		// 	});
		// 	if (result.ok) {
		// 		toast.success("Property listing saved as draft!");
		// 		onNextAction({ photos });
		// 		router.push("/landlord/listings");
		// 	} else {
		// 		toast.error("Failed to save draft");
		// 	}
		// } catch (error) {
		// 	console.error("Error saving draft:", error);
		// 	toast.error("Failed to save draft");
		// } finally {
		// 	setIsSaving(false);
		// }
	};

	return (
		<>
			<Card className="max-w-2xl mx-auto p-8">
				<div className="mb-6">
					<h2 className="text-2xl font-bold">Review & Add Photos</h2>
					<p className="text-gray-500">
						Review your listing details and add photos of your property.
					</p>
				</div>

				<div className="space-y-8">
					{/* Property Information Section */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Property Information</h3>
						<div className="space-y-2">
							<p>
								<span className="font-medium">Address:</span>{" "}
								{formData.property.streetAddress}
								{formData.property.unitNumber &&
									`, ${formData.property.unitNumber}`}
								{", "}
								{formData.property.city}, {formData.property.state}{" "}
								{formData.property.zip}
							</p>
							<p>
								<span className="font-medium">Property Type:</span>{" "}
								{formData.property.propertyType}
							</p>
							<p>
								<span className="font-medium">Bedrooms:</span>{" "}
								{formData.property.bedrooms}
							</p>
							<p>
								<span className="font-medium">Bathrooms:</span>{" "}
								{formData.property.bathrooms}
							</p>
							{formData.property.squareFootage && (
								<p>
									<span className="font-medium">Square Footage:</span>{" "}
									{formData.property.squareFootage}
								</p>
							)}
							{formData.property.yearBuilt && (
								<p>
									<span className="font-medium">Year Built:</span>{" "}
									{formData.property.yearBuilt}
								</p>
							)}
						</div>
					</div>

					<Separator />

					{/* Rental Details */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Rental Details</h3>
						<div className="space-y-2">
							<p>
								<span className="font-medium">Rent Amount:</span> $
								{formData.rental.rentAmount}
							</p>
							<p>
								<span className="font-medium">Security Deposit:</span> $
								{formData.rental.securityDeposit}
							</p>
							<p>
								<span className="font-medium">Lease Durations:</span>{" "}
								{formData.rental.leaseDurations.join(", ")}
							</p>
							<p>
								<span className="font-medium">Availability Date:</span>{" "}
								{formData.rental.availabilityDate.toLocaleDateString()}
							</p>
							{formData.rental.description && (
								<p>
									<span className="font-medium">Description:</span>{" "}
									{formData.rental.description}
								</p>
							)}
							<p>
								<span className="font-medium">Amenities:</span>{" "}
								{formData.rental.amenities
									.map((id) => AMENITY_MAP[id] || id)
									.join(", ")}
							</p>
							<p>
								<span className="font-medium">Pet Policy:</span>{" "}
								{PET_POLICY_MAP[formData.rental.petPolicy] ||
									formData.rental.petPolicy}
							</p>
							{formData.rental.petRestrictions && (
								<p>
									<span className="font-medium">Pet Restrictions:</span>{" "}
									{formData.rental.petRestrictions}
								</p>
							)}
							<p>
								<span className="font-medium">Utilities Included:</span>{" "}
								{formData.rental.utilitiesIncluded
									.map((id) => UTILITY_MAP[id] || id)
									.join(", ")}
							</p>
						</div>
					</div>

					<Separator />

					{/* Management Preferences */}
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Management Preferences
						</h3>
						<div className="space-y-2">
							<p>
								<span className="font-medium">Contact Display:</span>{" "}
								{formData.management.contactDisplay === "phone_and_email"
									? "Phone and Email"
									: "Email Only"}
							</p>
							<p>
								<span className="font-medium">Application Process:</span>{" "}
								{formData.management.applicationProcess === "self_managed"
									? "Self-Managed"
									: "App-Managed"}
							</p>
							<p>
								<span className="font-medium">Screening Preferences:</span>{" "}
								{formData.management.screeningPreferences
									.map((id) => SCREENING_MAP[id] || id)
									.join(", ")}
							</p>
							<p>
								<span className="font-medium">Communication Preferences:</span>{" "}
								{formData.management.communicationPreferences.join(", ")}
							</p>
							<p>
								<span className="font-medium">Lease Signing Preference:</span>{" "}
								{formData.management.leaseSigningPreference === "digital"
									? "Digital"
									: "Offline"}
							</p>
						</div>
					</div>

					{/* Photo Upload Section */}
					<div>
						<h3 className="text-lg font-semibold mb-4">Property Photos</h3>
						<div className="space-y-4">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{photos.map((photo, index) => (
									<div
										id={`photo-${index + 1}`}
										key={`photo-${index}-${btoa(photo).substring(0, 8)}`}
										className="relative group"
									>
										<img
											src={photo}
											alt={`Property view ${index + 1}`}
											className="w-full h-32 object-cover rounded-lg"
										/>
										<button
											type="button"
											onClick={() => removePhoto(index)}
											className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-label="Remove photo"
											>
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
								))}
							</div>

							<div className="flex items-center gap-4">
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									multiple
									className="hidden"
									onChange={handlePhotoUpload}
								/>
								<Button
									type="button"
									variant="outline"
									onClick={handleUploadClick}
									disabled={isUploading}
									className="flex-1"
								>
									{isUploading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Uploading...
										</>
									) : (
										"Upload Photos"
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Card>
			<div className="flex justify-between mt-8">
				<Button variant="outline" onClick={onBackAction}>
					Back
				</Button>
				<div className="flex gap-4">
					<Button variant="outline" onClick={handleSaveDraft}>
						Save as Draft
					</Button>
					<Button
						onClick={handlePublish}
						disabled={isSaving || isPublishing || photos.length === 0}
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
		</>
	);
}

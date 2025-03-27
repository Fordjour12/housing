"use client";

import { Card } from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import { useState } from "react";
import ListingConfirmation from "./listing-confirmation";
import ManagementPreferences from "./management-preferences";
import PropertyInformation from "./property-information";
import RentalDetails from "./rental-details";

// Define types for form data
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
	rentAmount?: string;
	securityDeposit?: string;
	leaseDurations?: Array<"month-to-month" | "6-months" | "1-year" | "other">;
	availabilityDate?: Date;
	description?: string;
	amenities?: Array<
		| "laundry"
		| "parking"
		| "pet-friendly"
		| "ac"
		| "dishwasher"
		| "balcony"
		| "pool"
		| "gym"
		| "elevator"
		| "wheelchair"
	>;
	petPolicy?:
		| "no-pets"
		| "cats-only"
		| "dogs-only"
		| "cats-and-dogs"
		| "case-by-case";
	petRestrictions?: string;
	utilitiesIncluded?: Array<
		"water" | "electricity" | "gas" | "trash" | "internet"
	>;
}

interface ManagementData {
	contactDisplay?: "email" | "phone" | "both";
	applicationProcess?: "online" | "in-person" | "both";
	screeningPreferences?: Array<
		| "credit-check"
		| "background-check"
		| "income-verification"
		| "rental-history"
		| "references"
	>;
	communicationPreferences?: Array<"email" | "phone" | "text" | "in-person">;
	leaseSigningPreference?: "online" | "in-person" | "both";
}

interface FormData {
	property: PropertyData;
	rental: RentalData;
	management: ManagementData;
	photos: string[];
}

export default function LandlordSetupFlow() {
	const { updateOnboardingState, onboardingState } = useUser();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		property: {},
		rental: {},
		management: {},
		photos: [],
	});

	// Handle moving to the next step
	const handleNext = (
		data: PropertyData | RentalData | ManagementData | { photos: string[] },
	) => {
		const newFormData = { ...formData };

		// Update the specific section of form data
		switch (step) {
			case 1:
				newFormData.property = data as PropertyData;
				break;
			case 2:
				newFormData.rental = data as RentalData;
				break;
			case 3:
				newFormData.management = data as ManagementData;
				break;
			case 4:
				newFormData.photos = (data as { photos: string[] }).photos;
				break;
		}

		setFormData(newFormData);
		setStep(step + 1);

		// Update onboarding state with new preferences
		updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				landlordSetup: newFormData,
			},
		});
	};

	// Handle going back to previous step
	const handleBack = () => {
		setStep(Math.max(1, step - 1));
	};

	// Render the appropriate step
	switch (step) {
		case 1:
			return (
				<PropertyInformation
					onNext={handleNext}
					initialData={formData.property}
				/>
			);
		case 2:
			return (
				<RentalDetails
					onNext={handleNext}
					onBack={handleBack}
					initialData={formData.rental}
				/>
			);
		case 3:
			return (
				<ManagementPreferences
					onNext={handleNext}
					onBack={handleBack}
					initialData={formData.management}
				/>
			);
		case 4:
			return (
				<ListingConfirmation
					onNext={handleNext}
					onBack={handleBack}
					formData={formData}
				/>
			);
		case 5:
			return (
				<Card className="max-w-2xl mx-auto p-8">
					<h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
					<p className="mb-4">
						Your property has been successfully set up and published.
					</p>
					<p>You can now manage your property from your dashboard.</p>
				</Card>
			);
		default:
			return (
				<PropertyInformation
					onNext={handleNext}
					initialData={formData.property}
				/>
			);
	}
}

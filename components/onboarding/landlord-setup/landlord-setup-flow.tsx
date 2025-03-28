"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import type { PreferenceValue } from "@/types/user";
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

// Update RentalData to match RentalFormValues from RentalDetails component
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

// Update ManagementData to match ManagementFormValues from ManagementPreferences component
interface ManagementData {
	contactDisplay: "phone_and_email" | "email_only";
	applicationProcess: "self_managed" | "app_managed";
	screeningPreferences: string[];
	communicationPreferences: string[];
	leaseSigningPreference: "digital" | "offline";
}

// This matches our local form data structure
interface FormData {
	property: PropertyData;
	rental: RentalData;
	management: ManagementData;
	photos: string[];
}

export default function LandlordSetupFlow() {
	const { updateOnboardingState, onboardingState, completeOnboarding } =
		useUser();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		property: {},
		rental: {
			rentAmount: "",
			securityDeposit: "",
			leaseDurations: [],
			availabilityDate: new Date(),
			amenities: [],
			petPolicy: "",
			utilitiesIncluded: [],
		},
		management: {
			contactDisplay: "phone_and_email",
			applicationProcess: "self_managed",
			screeningPreferences: [],
			communicationPreferences: [],
			leaseSigningPreference: "digital",
		},
		photos: [],
	});

	// Create type-specific handler functions to avoid type errors
	const handlePropertyNext = (data: PropertyData) => {
		const newFormData = { ...formData };
		newFormData.property = data;
		setFormData(newFormData);
		setStep(step + 1);

		// Update onboarding state with new preferences
		updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				// Convert to unknown first to satisfy TypeScript
				landlordSetup: newFormData as unknown as PreferenceValue,
			},
		});
	};

	const handleRentalNext = (data: RentalData) => {
		const newFormData = { ...formData };
		newFormData.rental = data;
		setFormData(newFormData);
		setStep(step + 1);

		// Update onboarding state with new preferences
		updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				// Convert to unknown first to satisfy TypeScript
				landlordSetup: newFormData as unknown as PreferenceValue,
			},
		});
	};

	const handleManagementNext = (data: ManagementData) => {
		const newFormData = { ...formData };
		newFormData.management = data;
		setFormData(newFormData);
		setStep(step + 1);

		// Update onboarding state with new preferences
		updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				// Convert to unknown first to satisfy TypeScript
				landlordSetup: newFormData as unknown as PreferenceValue,
			},
		});
	};

	const handlePhotosNext = (data: { photos: string[] }) => {
		const newFormData = { ...formData };
		newFormData.photos = data.photos;
		setFormData(newFormData);
		setStep(step + 1);

		// Update onboarding state with new preferences
		updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				// Convert to unknown first to satisfy TypeScript
				landlordSetup: newFormData as unknown as PreferenceValue,
			},
		});
	};

	// Handle going back to previous step
	const handleBack = () => {
		if (step === 1) {
			// If we're at step 1, go back to role selection
			updateOnboardingState({ step: 2 });
		} else {
			setStep(Math.max(1, step - 1));
		}
	};

	// Handle onboarding completion
	const handleFinishSetup = async () => {
		// Make sure to update onboarding state with final data and preserve the role
		await updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				// Convert to unknown first to satisfy TypeScript
				landlordSetup: formData as unknown as PreferenceValue,
			},
			role: onboardingState?.role, // Preserve the role from earlier steps
		});

		// Complete the onboarding process
		// This will update the database as the source of truth for onboarding status
		await completeOnboarding();

		// Redirect to listings page
		// The database is now the source of truth for onboarding status
		window.location.href = "/listings";
	};

	// Standard bottom navigation component
	const BottomNavigation = () => (
		<div className="flex justify-between mt-8">
			<Button variant="outline" onClick={handleBack}>
				{step === 1 ? "Back to Role Selection" : "Back"}
			</Button>
			{step < 5 ? (
				<Button onClick={() => setStep(step + 1)}>Continue</Button>
			) : (
				<Button onClick={handleFinishSetup}>Complete Setup</Button>
			)}
		</div>
	);

	// Render the appropriate step
	switch (step) {
		case 1:
			return (
				<div className="max-w-2xl mx-auto p-6">
					<h2 className="text-2xl font-bold mb-8">Property Information</h2>
					<PropertyInformation
						onNext={handlePropertyNext}
						initialData={formData.property}
					/>
					<BottomNavigation />
				</div>
			);
		case 2:
			return (
				<div className="max-w-2xl mx-auto p-6">
					<h2 className="text-2xl font-bold mb-8">Rental Details</h2>
					<RentalDetails
						onNext={handleRentalNext}
						onBack={handleBack}
						initialData={formData.rental}
					/>
					<BottomNavigation />
				</div>
			);
		case 3:
			return (
				<div className="max-w-2xl mx-auto p-6">
					<h2 className="text-2xl font-bold mb-8">Management Preferences</h2>
					<ManagementPreferences
						onNext={handleManagementNext}
						onBack={handleBack}
						initialData={formData.management}
					/>
					<BottomNavigation />
				</div>
			);
		case 4:
			return (
				<div className="max-w-2xl mx-auto p-6">
					<h2 className="text-2xl font-bold mb-8">Listing Confirmation</h2>
					<ListingConfirmation
						onNext={handlePhotosNext}
						onBack={handleBack}
						formData={formData}
					/>
					<BottomNavigation />
				</div>
			);
		case 5:
			return (
				<Card className="max-w-2xl mx-auto p-8">
					<h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
					<p className="mb-4">
						Your property has been successfully set up and published.
					</p>
					<p className="mb-6">
						You can now manage your property from your dashboard.
					</p>
					<div className="flex justify-between">
						<Button variant="outline" onClick={handleBack}>
							Back
						</Button>
						<Button onClick={handleFinishSetup}>Complete Setup</Button>
					</div>
				</Card>
			);
		default:
			return (
				<div className="max-w-2xl mx-auto p-6">
					<h2 className="text-2xl font-bold mb-8">Property Information</h2>
					<PropertyInformation
						onNext={handlePropertyNext}
						initialData={formData.property}
					/>
					<BottomNavigation />
				</div>
			);
	}
}

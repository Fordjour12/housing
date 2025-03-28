"use client";

import { Button as UIButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/user-context";
import type { PropertyManagerSetupPreference } from "@/types/user";
import { useState } from "react";
import { z } from "zod";
import ListingConfirmation from "../landlord-setup/listing-confirmation";
import PropertyInformation from "../landlord-setup/property-information";
import RentalDetails from "../landlord-setup/rental-details";
import FirmInformation from "./firm-information";
import ManagementPreferences from "./management-preferences";
import TeamAccess from "./team-access";

// Use the type from user.ts
type FormData = PropertyManagerSetupPreference;

// Define form schema for RentalDetails to match component expectations
const rentalSchema = z.object({
	rentAmount: z.string(),
	securityDeposit: z.string(),
	leaseDurations: z.array(z.string()),
	availabilityDate: z.date(),
	description: z.string().optional(),
	amenities: z.array(z.string()),
	petPolicy: z.string(),
	petRestrictions: z.string().optional(),
	utilitiesIncluded: z.array(z.string()),
});
type RentalFormValues = z.infer<typeof rentalSchema>;

// Define a schema for PropertyInformation to match component expectations
const propertySchema = z.object({
	streetAddress: z.string(),
	unitNumber: z.string().optional(),
	city: z.string(),
	state: z.string(),
	zip: z.string(),
	propertyType: z.enum([
		"single_family",
		"multi_family",
		"apartment",
		"condo",
		"townhouse",
	]),
	bedrooms: z.string(),
	bathrooms: z.string(),
	squareFootage: z.string().optional(),
	yearBuilt: z.string().optional(),
});
type PropertyFormValues = z.infer<typeof propertySchema>;

// Define type for listing confirmation data
type ListingConfirmationData = {
	property: {
		streetAddress: string;
		unitNumber?: string;
		city: string;
		state: string;
		zip: string;
		propertyType:
			| "single_family"
			| "multi_family"
			| "apartment"
			| "condo"
			| "townhouse";
		bedrooms: string;
		bathrooms: string;
		squareFootage?: string;
		yearBuilt?: string;
	};
	rental: {
		rentAmount: string;
		securityDeposit: string;
		leaseDurations: Array<"month-to-month" | "6-months" | "1-year" | "other">;
		availabilityDate: Date;
		description?: string;
		amenities: Array<
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
		petPolicy:
			| "no-pets"
			| "cats-only"
			| "dogs-only"
			| "cats-and-dogs"
			| "case-by-case";
		petRestrictions?: string;
		utilitiesIncluded: Array<
			"water" | "electricity" | "gas" | "trash" | "internet"
		>;
	};
	management: {
		contactDisplay: "phone_and_email" | "email_only";
		applicationProcess: "self_managed" | "app_managed";
		screeningPreferences: Array<
			"credit-check" | "background-check" | "income-verification"
		>;
		communicationPreferences: Array<"email" | "phone">;
		leaseSigningPreference: "digital" | "offline";
	};
	photos: string[];
};

export default function PropertyManagerSetupFlow() {
	const { updateOnboardingState, onboardingState, user, completeOnboarding } =
		useUser();
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		firm: {} as FormData["firm"],
		management: {} as FormData["management"],
		team: {},
	});

	// Handle moving to the next step
	const handleNext = (
		data:
			| FormData["firm"]
			| FormData["management"]
			| FormData["team"]
			| PropertyFormValues
			| RentalFormValues
			| { photos: string[] },
	) => {
		const newFormData = { ...formData };

		// Update the specific section of form data
		switch (step) {
			case 1: {
				newFormData.firm = data as FormData["firm"];
				break;
			}
			case 2: {
				newFormData.management = data as FormData["management"];
				break;
			}
			case 3: {
				newFormData.team = data as FormData["team"];
				break;
			}
			case 4: {
				// Convert property form values to the format expected by FormData
				const propertyData = data as PropertyFormValues;
				newFormData.property = {
					streetAddress: propertyData.streetAddress,
					unitNumber: propertyData.unitNumber,
					city: propertyData.city,
					state: propertyData.state,
					zip: propertyData.zip,
					propertyType: propertyData.propertyType,
					bedrooms: propertyData.bedrooms,
					bathrooms: propertyData.bathrooms,
					squareFootage: propertyData.squareFootage,
					yearBuilt: propertyData.yearBuilt,
				};
				break;
			}
			case 5: {
				// Convert the rental form values to the format expected by FormData
				const rentalData = data as RentalFormValues;
				newFormData.rental = {
					rentAmount: rentalData.rentAmount,
					securityDeposit: rentalData.securityDeposit,
					leaseDurations: rentalData.leaseDurations as Array<
						"month-to-month" | "6-months" | "1-year" | "other"
					>,
					availabilityDate: rentalData.availabilityDate,
					description: rentalData.description,
					amenities: rentalData.amenities as Array<
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
					>,
					petPolicy: rentalData.petPolicy as
						| "no-pets"
						| "cats-only"
						| "dogs-only"
						| "cats-and-dogs"
						| "case-by-case",
					petRestrictions: rentalData.petRestrictions,
					utilitiesIncluded: rentalData.utilitiesIncluded as Array<
						"water" | "electricity" | "gas" | "trash" | "internet"
					>,
				};
				break;
			}
			case 6: {
				newFormData.photos = (data as { photos: string[] }).photos;
				break;
			}
		}

		// Update form data state
		setFormData(newFormData);

		// Update onboarding state with new preferences
		updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				propertyManagerSetup: newFormData,
			},
		});

		// Move to next step
		setStep(step + 1);
	};

	// Handle going back to the previous step
	const handleBack = () => {
		if (step === 1) {
			// If we're at step 1, go back to role selection
			updateOnboardingState({ step: 2 });
		} else {
			setStep(step - 1);
		}
	};

	// Get current step data from form data with proper typing
	const getCurrentStepData = () => {
		switch (step) {
			case 1:
				return formData.firm;
			case 2:
				return formData.management;
			case 3:
				return formData.team;
			case 4: {
				// Convert property data to format expected by PropertyInformation
				const propertyData = formData.property || {};
				return {
					streetAddress: propertyData.streetAddress || "",
					unitNumber: propertyData.unitNumber || "",
					city: propertyData.city || "",
					state: propertyData.state || "",
					zip: propertyData.zip || "",
					propertyType: (propertyData.propertyType || "single_family") as
						| "single_family"
						| "multi_family"
						| "apartment"
						| "condo"
						| "townhouse",
					bedrooms: propertyData.bedrooms || "",
					bathrooms: propertyData.bathrooms || "",
					squareFootage: propertyData.squareFootage || "",
					yearBuilt: propertyData.yearBuilt || "",
				};
			}
			case 5: {
				// Convert rental data to format expected by RentalDetails
				const rentalData = formData.rental || {};
				return {
					rentAmount: rentalData.rentAmount || "",
					securityDeposit: rentalData.securityDeposit || "",
					leaseDurations: rentalData.leaseDurations || [],
					availabilityDate: rentalData.availabilityDate || new Date(),
					description: rentalData.description || "",
					amenities: rentalData.amenities || [],
					petPolicy: rentalData.petPolicy || "no-pets",
					petRestrictions: rentalData.petRestrictions || "",
					utilitiesIncluded: rentalData.utilitiesIncluded || [],
				};
			}
			case 6: {
				// Prepare data for listing confirmation
				const propertyData = formData.property || {};
				const rentalData = formData.rental || {};
				const managementData = formData.management;

				return {
					property: {
						streetAddress: propertyData.streetAddress || "",
						unitNumber: propertyData.unitNumber || "",
						city: propertyData.city || "",
						state: propertyData.state || "",
						zip: propertyData.zip || "",
						propertyType: (propertyData.propertyType || "single_family") as
							| "single_family"
							| "multi_family"
							| "apartment"
							| "condo"
							| "townhouse",
						bedrooms: propertyData.bedrooms || "",
						bathrooms: propertyData.bathrooms || "",
						squareFootage: propertyData.squareFootage || "",
						yearBuilt: propertyData.yearBuilt || "",
					},
					rental: {
						rentAmount: rentalData.rentAmount || "",
						securityDeposit: rentalData.securityDeposit || "",
						leaseDurations: rentalData.leaseDurations || [],
						availabilityDate: rentalData.availabilityDate || new Date(),
						description: rentalData.description || "",
						amenities: rentalData.amenities || [],
						petPolicy: rentalData.petPolicy || "no-pets",
						petRestrictions: rentalData.petRestrictions || "",
						utilitiesIncluded: rentalData.utilitiesIncluded || [],
					},
					management: {
						contactDisplay:
							managementData.applicationProcess === "internal"
								? "email_only"
								: "phone_and_email",
						applicationProcess:
							managementData.applicationProcess === "internal"
								? "self_managed"
								: "app_managed",
						screeningPreferences: [
							...(managementData.screeningCreditCheck ? ["credit-check"] : []),
							...(managementData.screeningBackgroundCheck
								? ["background-check"]
								: []),
							...(managementData.screeningIncomeVerification
								? ["income-verification"]
								: []),
						],
						communicationPreferences: ["email", "phone"],
						leaseSigningPreference:
							managementData.leaseSigningPreference === "digital"
								? "digital"
								: "offline",
					},
					photos: formData.photos || [],
				} as ListingConfirmationData;
			}
			default:
				return {};
		}
	};

	// Add a function to handle completing the setup
	const handleCompleteSetup = async () => {
		// Make sure to update onboarding state with final data and preserve the role
		await updateOnboardingState({
			preferences: {
				...onboardingState?.preferences,
				propertyManagerSetup: formData,
			},
			role: onboardingState?.role, // Preserve the role from earlier steps
		});

		// Complete the onboarding process
		// This will update the database as the source of truth
		await completeOnboarding();

		// Redirect to listings page instead of dashboard
		// The database is now the source of truth for onboarding status
		window.location.href = "/listings";
	};

	// Standard bottom navigation component
	const BottomNavigation = () => (
		<div className="flex justify-between mt-8">
			<UIButton variant="outline" onClick={handleBack}>
				{step === 1 ? "Back to Role Selection" : "Back"}
			</UIButton>
			{step < 7 ? (
				<UIButton onClick={() => setStep(step + 1)}>Continue</UIButton>
			) : (
				<UIButton onClick={handleCompleteSetup}>Complete Setup</UIButton>
			)}
		</div>
	);

	// Render the current step
	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<div className="max-w-2xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-8">Firm Information</h2>
						<FirmInformation
							onNext={handleNext}
							initialData={getCurrentStepData() as FormData["firm"]}
						/>
						<BottomNavigation />
					</div>
				);
			case 2:
				return (
					<div className="max-w-2xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-8">Management Preferences</h2>
						<ManagementPreferences
							onNext={handleNext}
							onBack={handleBack}
							initialData={getCurrentStepData() as FormData["management"]}
						/>
						<BottomNavigation />
					</div>
				);
			case 3:
				return (
					<div className="max-w-2xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-8">Team Access</h2>
						<TeamAccess
							onNext={handleNext}
							onBack={handleBack}
							initialData={getCurrentStepData() as FormData["team"]}
						/>
						<BottomNavigation />
					</div>
				);
			case 4:
				return (
					<div className="max-w-2xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-8">Property Information</h2>
						<PropertyInformation
							onNext={handleNext}
							initialData={getCurrentStepData() as PropertyFormValues}
						/>
						<BottomNavigation />
					</div>
				);
			case 5:
				return (
					<div className="max-w-2xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-8">Rental Details</h2>
						<RentalDetails
							onNext={handleNext}
							onBack={handleBack}
							initialData={getCurrentStepData() as RentalFormValues}
						/>
						<BottomNavigation />
					</div>
				);
			case 6:
				return (
					<div className="max-w-2xl mx-auto p-6">
						<h2 className="text-2xl font-bold mb-8">Listing Confirmation</h2>
						<ListingConfirmation
							onNext={handleNext}
							onBack={handleBack}
							formData={getCurrentStepData() as ListingConfirmationData}
						/>
						<BottomNavigation />
					</div>
				);
			case 7:
				return (
					<Card className="max-w-2xl mx-auto p-8">
						<div className="text-center mb-6">
							<h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
							<p className="mb-4">
								Your property management company has been successfully set up.
							</p>
							{formData.property ? (
								<p>
									Your first property has been added and is ready to manage.
								</p>
							) : (
								<p>You can now add properties from your dashboard.</p>
							)}
						</div>

						<div className="bg-gray-50 rounded-md p-6 mb-6">
							<h3 className="text-lg font-medium mb-4">What's Next?</h3>
							<ul className="space-y-2">
								<li className="flex items-start">
									<span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
										1
									</span>
									<div>
										<p className="font-medium">Set up your dashboard</p>
										<p className="text-sm text-gray-600">
											Customize your workspace for your team
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
										2
									</span>
									<div>
										<p className="font-medium">Add more properties</p>
										<p className="text-sm text-gray-600">
											Expand your portfolio with additional listings
										</p>
									</div>
								</li>
								<li className="flex items-start">
									<span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
										3
									</span>
									<div>
										<p className="font-medium">Set up payment processing</p>
										<p className="text-sm text-gray-600">
											Enable online rent payments for your tenants
										</p>
									</div>
								</li>
							</ul>
						</div>

						<div className="flex justify-between">
							<UIButton variant="outline" onClick={handleBack}>
								Back
							</UIButton>
							<UIButton onClick={handleCompleteSetup}>Complete Setup</UIButton>
						</div>
					</Card>
				);
			default:
				return null;
		}
	};

	return <div className="container mx-auto py-10">{renderStep()}</div>;
}

// Button component included here to avoid TypeScript errors without having to create a separate component
function Button({
	children,
	onClick,
	variant = "default",
	size = "default",
	href,
	as,
	className = "",
}: {
	children: React.ReactNode;
	onClick?: () => void;
	variant?: "default" | "outline";
	size?: "default" | "lg" | "sm";
	href?: string;
	as?: string;
	className?: string;
}) {
	const baseClasses =
		"rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary";
	const variantClasses = {
		default: "bg-primary text-white hover:bg-primary/90",
		outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
	};
	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		default: "px-4 py-2",
		lg: "px-6 py-3 text-lg",
	};

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

	if (href && as === "a") {
		return (
			<a href={href} className={classes}>
				{children}
			</a>
		);
	}

	return (
		<button type="button" onClick={onClick} className={classes}>
			{children}
		</button>
	);
}

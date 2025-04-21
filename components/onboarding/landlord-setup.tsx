"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import PropertyInformation from "./landlord-setup/property-information";
import RentalDetails from "./landlord-setup/rental-details";
import ManagementPreferences from "./landlord-setup/management-preferences";
import ListingConfirmation from "./landlord-setup/listing-confirmation";
import type {
	PropertyInformationFormValues,
	RentalDetailsFormValues,
	ManagementPreferencesFormValues,
	// PhotosFormValues,
	LandlordFormValues,
} from "./landlord-setup/landlord-schema";

interface LandlordSetupProps {
	onCompleteAction: () => void;
	onBackAction: () => void;
}

const INITIAL_FORM_DATA: LandlordFormValues = {
	property: {
		streetAddress: "",
		unitNumber: "",
		city: "",
		state: "",
		zip: "",
		propertyType: "single_family",
		bedrooms: "",
		bathrooms: "",
		squareFootage: "",
		yearBuilt: "",
	},
	rental: {
		rentAmount: "",
		securityDeposit: "",
		leaseDurations: [],
		availabilityDate: new Date(),
		description: "",
		amenities: [],
		petPolicy: "",
		petRestrictions: "",
		utilitiesIncluded: [],
	},
	management: {
		contactDisplay: "phone_and_email",
		applicationProcess: "self_managed",
		screeningPreferences: [],
		communicationPreferences: [],
		leaseSigningPreference: "digital",
	},
	photos: {
		photos: [],
	},
};

export default function LandlordSetup({
	onBackAction,
}: LandlordSetupProps) {
	const [step, setStep] = useState(1);
	const [formData, setFormData] =
		useState<LandlordFormValues>(INITIAL_FORM_DATA);
	const router = useRouter();

	const handlePropertyNext = (data: PropertyInformationFormValues) => {
		setFormData((prev) => ({ ...prev, property: data }));
		setStep(2);
	};

	const handleRentalNext = (data: RentalDetailsFormValues) => {
		setFormData((prev) => ({ ...prev, rental: data }));
		setStep(3);
	};

	const handleManagementNext = (data: ManagementPreferencesFormValues) => {
		setFormData((prev) => ({ ...prev, management: data }));
		setStep(4);
	};

	// const handlePhotosNext = (data: PhotosFormValues) => {
	// 	setFormData((prev) => ({ ...prev, photos: data }));
	// 	setStep(5);
	// };
	const handleCompletion = () => {
		setStep(5);
	}


	const handleBack = () => {
		if (step === 1) {
			onBackAction();
		} else {
			setStep(step - 1);
		}
	};


	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">
					{step === 1 && "Property Information"}
					{step === 2 && "Rental Details"}
					{step === 3 && "Management Preferences"}
					{step === 4 && "Listing Confirmation"}
					{step === 5 && "Setup Complete"}
				</h1>
				<div className="flex items-center space-x-2">
					{[1, 2, 3, 4, 5].map((s) => (
						<div
							key={s}
							className={`h-2 w-8 rounded-full transition-colors duration-300 ${
								s <= step ? "bg-primary" : "bg-muted"
							}`}
						/>
					))}
				</div>
			</div>

			<motion.div
				key={step}
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
			>
				{step === 1 && (
					<PropertyInformation
						onNextAction={handlePropertyNext}
						onBackAction={handleBack}
						initialData={formData.property}
					/>
				)}

				{step === 2 && (
					<RentalDetails
						onNextAction={handleRentalNext}
						onBackAction={handleBack}
						initialData={formData.rental}
					/>
				)}

				{step === 3 && (
					<ManagementPreferences
						onNextAction={handleManagementNext}
						onBackAction={handleBack}
						initialData={formData.management}
					/>
				)}

				{step === 4 && (
					<ListingConfirmation
						onNextAction={handleCompletion}
						onBackAction={handleBack}
						formData={formData}
					/>
				)}

				{step === 5 && (
					<Card className="p-8">
						<h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
						<p className="mb-4">
							Your property has been successfully listed. You can now manage
							your listing and view applications from potential tenants.
						</p>
						<Button onClick={() => router.push("/dashboard")}>
							Go to Dashboard
						</Button>
						<Button onClick={() => router.push("/")}>Go Home</Button>
					</Card>
				)}
			</motion.div>
		</div>
	);
}

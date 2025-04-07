"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import PropertyInformation from "./landlord-setup/property-information";
import RentalDetails from "./landlord-setup/rental-details";
import ManagementPreferences from "./landlord-setup/management-preferences";
import ListingConfirmation from "./landlord-setup/listing-confirmation";

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

interface FormData {
  property: PropertyData;
  rental: RentalData;
  management: ManagementData;
  photos: string[];
}

interface LandlordSetupProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function LandlordSetup({
  onComplete,
  onBack,
}: LandlordSetupProps) {
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

  const handlePropertyNext = (data: PropertyData) => {
    setFormData((prev) => ({ ...prev, property: data }));
    setStep(2);
  };

  const handleRentalNext = (data: RentalData) => {
    setFormData((prev) => ({ ...prev, rental: data }));
    setStep(3);
  };

  const handleManagementNext = (data: ManagementData) => {
    setFormData((prev) => ({ ...prev, management: data }));
    setStep(4);
  };

  const handlePhotosNext = (data: { photos: string[] }) => {
    setFormData((prev) => ({ ...prev, photos: data.photos }));
    setStep(5);
  };

  const handleFinishSetup = async () => {
    try {
      const response = await fetch("/api/onboarding/landlord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save landlord setup");
      }

      onComplete();
    } catch (error) {
      console.error("Error completing landlord setup:", error);
      // TODO: Add error handling UI
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

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
              className={`h-2 w-8 rounded-full transition-colors duration-300 ${s <= step ? "bg-primary" : "bg-muted"
                }`}
            ></div>
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
            onNext={handlePropertyNext}
            initialData={formData.property}
          />
        )}

        {step === 2 && (
          <RentalDetails
            onNext={handleRentalNext}
            onBack={handleBack}
            initialData={formData.rental}
          />
        )}

        {step === 3 && (
          <ManagementPreferences
            onNext={handleManagementNext}
            onBack={handleBack}
            initialData={formData.management}
          />
        )}

        {step === 4 && (
          <ListingConfirmation
            onNext={handlePhotosNext}
            onBack={handleBack}
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
          </Card>
        )}
      </motion.div>

      {step < 5 && <BottomNavigation />}
    </div>
  );
}

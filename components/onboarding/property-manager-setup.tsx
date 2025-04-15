// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { motion } from "motion/react";
// // import FirmInformation from "./property-manager-setup/firm-information";
// // import ManagementPreferences from "./property-manager-setup/management-preferences";
// // import TeamAccess from "./property-manager-setup/team-access";
// import PropertyInformation from "./landlord-setup/property-information";
// import RentalDetails from "./landlord-setup/rental-details";
// import ListingConfirmation from "./landlord-setup/listing-confirmation";

// // Define types for form data
// interface FirmData {
//   firmName: string;
//   firmAddress: string;
//   firmPhone: string;
//   firmEmail: string;
//   firmWebsite?: string;
//   firmDescription?: string;
//   firmLogo?: string;
// }

// interface ManagementData {
//   contactDisplay: "phone_and_email" | "email_only";
//   applicationProcess: "self_managed" | "app_managed";
//   screeningPreferences: string[];
//   communicationPreferences: string[];
//   leaseSigningPreference: "digital" | "offline";
// }

// interface TeamData {
//   teamMembers: Array<{
//     name: string;
//     email: string;
//     role: string;
//     permissions: string[];
//   }>;
// }

// interface PropertyData {
//   streetAddress: string;
//   unitNumber?: string;
//   city: string;
//   state: string;
//   zip: string;
//   propertyType:
//   | "single_family"
//   | "multi_family"
//   | "apartment"
//   | "condo"
//   | "townhouse";
//   bedrooms: string;
//   bathrooms: string;
//   squareFootage?: string;
//   yearBuilt?: string;
// }

// interface RentalData {
//   rentAmount: string;
//   securityDeposit: string;
//   leaseDurations: string[];
//   availabilityDate: Date;
//   description?: string;
//   amenities: string[];
//   petPolicy: string;
//   petRestrictions?: string;
//   utilitiesIncluded: string[];
// }

// interface FormData {
//   firm: FirmData;
//   management: ManagementData;
//   team: TeamData;
//   property: PropertyData;
//   rental: RentalData;
//   photos: string[];
// }

// interface PropertyManagerSetupProps {
//   onComplete: () => void;
//   onBack: () => void;
// }

// export default function PropertyManagerSetup({
//   onComplete,
//   onBack,
// }: PropertyManagerSetupProps) {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<FormData>({
//     firm: {
//       firmName: "",
//       firmAddress: "",
//       firmPhone: "",
//       firmEmail: "",
//     },
//     management: {
//       contactDisplay: "phone_and_email",
//       applicationProcess: "self_managed",
//       screeningPreferences: [],
//       communicationPreferences: [],
//       leaseSigningPreference: "digital",
//     },
//     team: {
//       teamMembers: [],
//     },
//     property: {
//       streetAddress: "",
//       city: "",
//       state: "",
//       zip: "",
//       propertyType: "single_family",
//       bedrooms: "",
//       bathrooms: "",
//     },
//     rental: {
//       rentAmount: "",
//       securityDeposit: "",
//       leaseDurations: [],
//       availabilityDate: new Date(),
//       amenities: [],
//       petPolicy: "",
//       utilitiesIncluded: [],
//     },
//     photos: [],
//   });

//   const handleFirmNext = (data: FirmData) => {
//     setFormData((prev) => ({ ...prev, firm: data }));
//     setStep(2);
//   };

//   const handleManagementNext = (data: ManagementData) => {
//     setFormData((prev) => ({ ...prev, management: data }));
//     setStep(3);
//   };

//   const handleTeamNext = (data: TeamData) => {
//     setFormData((prev) => ({ ...prev, team: data }));
//     setStep(4);
//   };

//   const handlePropertyNext = (data: PropertyData) => {
//     setFormData((prev) => ({ ...prev, property: data }));
//     setStep(5);
//   };

//   const handleRentalNext = (data: RentalData) => {
//     setFormData((prev) => ({ ...prev, rental: data }));
//     setStep(6);
//   };

//   const handlePhotosNext = (data: { photos: string[] }) => {
//     setFormData((prev) => ({ ...prev, photos: data.photos }));
//     setStep(7);
//   };

//   const handleFinishSetup = async () => {
//     try {
//       const response = await fetch("/api/onboarding/property-manager", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save property manager setup");
//       }

//       onComplete();
//     } catch (error) {
//       console.error("Error completing property manager setup:", error);
//       // TODO: Add error handling UI
//     }
//   };

//   const handleBack = () => {
//     if (step === 1) {
//       onBack();
//     } else {
//       setStep(step - 1);
//     }
//   };

//   const BottomNavigation = () => (
//     <div className="flex justify-between mt-8">
//       <Button variant="outline" onClick={handleBack}>
//         {step === 1 ? "Back to Role Selection" : "Back"}
//       </Button>
//       {step < 7 ? (
//         <Button onClick={() => setStep(step + 1)}>Continue</Button>
//       ) : (
//         <Button onClick={handleFinishSetup}>Complete Setup</Button>
//       )}
//     </div>
//   );

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">
//           {step === 1 && "Firm Information"}
//           {step === 2 && "Management Preferences"}
//           {step === 3 && "Team Access"}
//           {step === 4 && "Property Information"}
//           {step === 5 && "Rental Details"}
//           {step === 6 && "Listing Confirmation"}
//           {step === 7 && "Setup Complete"}
//         </h1>
//         <div className="flex space-x-1">
//           {[1, 2, 3, 4, 5, 6, 7].map((s) => (
//             <div
//               key={s}
//               className={`h-2 w-8 rounded-full ${step >= s ? "bg-primary" : "bg-gray-200"
//                 }`}
//             />
//           ))}
//         </div>
//       </div>

//       <motion.div
//         key={step}
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -20 }}
//       >
//         {step === 1 && (
//           <FirmInformation
//             onNext={handleFirmNext}
//             initialData={formData.firm}
//           />
//         )}

//         {step === 2 && (
//           <ManagementPreferences
//             onNext={handleManagementNext}
//             onBack={handleBack}
//             initialData={formData.management}
//           />
//         )}

//         {step === 3 && (
//           <TeamAccess
//             onNext={handleTeamNext}
//             onBack={handleBack}
//             initialData={formData.team}
//           />
//         )}

//         {step === 4 && (
//           <PropertyInformation
//             onNext={handlePropertyNext}
//             onBack={handleBack}
//             initialData={formData.property}
//           />
//         )}

//         {step === 5 && (
//           <RentalDetails
//             onNext={handleRentalNext}
//             onBack={handleBack}
//             initialData={formData.rental}
//           />
//         )}

//         {step === 6 && (
//           <ListingConfirmation
//             onNext={handlePhotosNext}
//             onBack={handleBack}
//             formData={formData}
//           />
//         )}

//         {step === 7 && (
//           <Card className="p-8">
//             <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
//             <p className="mb-4">
//               Your property management firm has been successfully set up. You
//               can now manage properties, tenants, and team members through your
//               dashboard.
//             </p>
//           </Card>
//         )}
//       </motion.div>

//       {step < 7 && <BottomNavigation />}
//     </div>
//   );
// }

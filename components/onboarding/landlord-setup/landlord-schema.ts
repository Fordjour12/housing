import { z } from "zod";

// Property information schema
export const propertyInformationSchema = z.object({
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  unitNumber: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State/Region is required" }),
  zip: z.string().min(1, { message: "ZIP/Postal code is required" }),
  propertyType: z.enum(
    ["single_family", "multi_family", "apartment", "condo", "townhouse"],
    {
      required_error: "Please select a property type",
    },
  ),
  bedrooms: z.string().min(1, { message: "Number of bedrooms is required" }),
  bathrooms: z.string().min(1, { message: "Number of bathrooms is required" }),
  squareFootage: z.string().optional(),
  yearBuilt: z.string().optional(),
});

// Rental details schema
export const rentalDetailsSchema = z.object({
  rentAmount: z.string().min(1, { message: "Rent amount is required" }),
  securityDeposit: z.string().min(1, { message: "Security deposit is required" }),
  leaseDurations: z.array(z.string()).min(1, { message: "At least one lease duration is required" }),
  availabilityDate: z.coerce.date({
    required_error: "Availability date is required",
    invalid_type_error: "Please provide a valid date"
  }),
  description: z.string().optional(),
  amenities: z.array(z.string()),
  petPolicy: z.string().min(1, { message: "Pet policy is required" }),
  petRestrictions: z.string().optional(),
  utilitiesIncluded: z.array(z.string()),
});

// Management preferences schema
export const managementPreferencesSchema = z.object({
  contactDisplay: z.enum(["phone_and_email", "email_only"], {
    required_error: "Please select a contact display preference",
  }),
  applicationProcess: z.enum(["self_managed", "app_managed"], {
    required_error: "Please select an application process preference",
  }),
  screeningPreferences: z.array(z.string()),
  communicationPreferences: z.array(z.string()),
  leaseSigningPreference: z.enum(["digital", "offline"], {
    required_error: "Please select a lease signing preference",
  }),
});

// Photos schema
export const photosSchema = z.object({
  photos: z.array(z.string()),
});

// Combined landlord form schema
export const landlordFormSchema = z.object({
  property: propertyInformationSchema,
  rental: rentalDetailsSchema,
  management: managementPreferencesSchema,
  photos: photosSchema,
});

// Type definitions for form values
export type PropertyInformationFormValues = z.infer<typeof propertyInformationSchema>;
export type RentalDetailsFormValues = z.infer<typeof rentalDetailsSchema>;
export type ManagementPreferencesFormValues = z.infer<typeof managementPreferencesSchema>;
export type PhotosFormValues = z.infer<typeof photosSchema>;
export type LandlordFormValues = z.infer<typeof landlordFormSchema>;

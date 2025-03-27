export type UserRole = "renter" | "landlord" | "property_manager";

export interface User {
	id: string;
	email: string;
	name?: string;
	role?: UserRole;
	onboardingCompleted: boolean;
	onboardingStep?: number;
	profilePicture?: string;
	createdAt: string;
	lastLogin: string;
}

// Define more specific preference value types
export type PreferenceValue =
	| string
	| number
	| boolean
	| string[]
	| number[]
	| { [key: string]: string | number | boolean | string[] | Date }
	| {
			property: {
				streetAddress?: string;
				unitNumber?: string;
				city?: string;
				state?: string;
				zip?: string;
				propertyType?: "single_family" | "multi_family" | "apartment" | "condo" | "townhouse";
				bedrooms?: string;
				bathrooms?: string;
				squareFootage?: string;
				yearBuilt?: string;
			};
			rental: {
				rentAmount?: string;
				securityDeposit?: string;
				leaseDurations?: Array<"month-to-month" | "6-months" | "1-year" | "other">;
				availabilityDate?: Date;
				description?: string;
				amenities?: Array<"laundry" | "parking" | "pet-friendly" | "ac" | "dishwasher" | "balcony" | "pool" | "gym" | "elevator" | "wheelchair">;
				petPolicy?: "no-pets" | "cats-only" | "dogs-only" | "cats-and-dogs" | "case-by-case";
				petRestrictions?: string;
				utilitiesIncluded?: Array<"water" | "electricity" | "gas" | "trash" | "internet">;
			};
			management: {
				contactDisplay?: "email" | "phone" | "both";
				applicationProcess?: "online" | "in-person" | "both";
				screeningPreferences?: Array<"credit-check" | "background-check" | "income-verification" | "rental-history" | "references">;
				communicationPreferences?: Array<"email" | "phone" | "text" | "in-person">;
				leaseSigningPreference?: "online" | "in-person" | "both";
			};
			photos: string[];
	  };

export interface OnboardingState {
	step: number;
	role?: UserRole;
	preferences: {
		[key: string]: PreferenceValue;
	};
	profile: {
		name?: string;
		phone?: string;
		address?: string;
		[key: string]: string | undefined;
	};
}

export interface RolePermission {
	canCreateListings: boolean;
	canEditListings: boolean;
	canApplyForRentals: boolean;
	canManageUsers: boolean;
	canManageMultipleProperties: boolean;
	canViewReports: boolean;
	canViewAnalytics: boolean;
}

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, RolePermission> = {
	renter: {
		canCreateListings: false,
		canEditListings: false,
		canApplyForRentals: true,
		canManageUsers: false,
		canManageMultipleProperties: false,
		canViewReports: false,
		canViewAnalytics: false,
	},
	landlord: {
		canCreateListings: true,
		canEditListings: true,
		canApplyForRentals: false,
		canManageUsers: false,
		canManageMultipleProperties: false,
		canViewReports: true,
		canViewAnalytics: true,
	},
	property_manager: {
		canCreateListings: true,
		canEditListings: true,
		canApplyForRentals: false,
		canManageUsers: true,
		canManageMultipleProperties: true,
		canViewReports: true,
		canViewAnalytics: true,
	},
};

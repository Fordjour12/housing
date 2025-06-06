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
	// Additional fields for account profile
	phone?: string;
	bio?: string;
	address?: string;
	avatar?: string;
	memberSince?: string;
	verifications?: {
		email: boolean;
		phone: boolean;
		identity: boolean;
	};
	preferences?: {
		emailNotifications?: {
			newListings?: boolean;
			applicationUpdates?: boolean;
			messageAlerts?: boolean;
			promotions?: boolean;
		};
		pushNotifications?: {
			newListings?: boolean;
			applicationUpdates?: boolean;
			messageAlerts?: boolean;
			promotions?: boolean;
		};
	};
	savedSearches?: Array<{
		id: string;
		name: string;
		criteria: string;
		location: string;
		priceRange: string;
		bedrooms: string;
		created: string;
		lastNotified: string;
		newListings: number;
	}>;
	favoriteListings?: Array<{
		id: number;
		title: string;
		address: string;
		price: number;
		beds: number;
		baths: number;
		sqft: number;
		image: string;
		saved: string;
	}>;
	// Additional fields for the account profile
	rentalApplications?: Array<{
		id: string;
		property: string;
		address: string;
		landlord: string;
		submitted: string;
		status: "under_review" | "approved" | "rejected" | "pending";
		nextSteps: string;
	}>;
	paymentMethods?: Array<{
		id: string;
		type: "credit" | "debit" | "bank";
		last4: string;
		expiry: string;
		brand: string;
		isDefault: boolean;
	}>;
	subscriptionPlan?: {
		name: string;
		price: number;
		billingCycle: string;
		nextBilling: string;
		features: string[];
	};
}

// Define property manager setup preference structure
export interface PropertyManagerSetupPreference {
	firm: {
		businessName: string;
		streetAddress: string;
		unitNumber?: string;
		city: string;
		state: string;
		zip: string;
		phoneNumber: string;
		website?: string;
		propertiesCount?: "1-10" | "11-50" | "51-100" | "100+";
	};
	management: {
		defaultContactEmail: string;
		defaultContactPhone: string;
		notifyNewInquiries: boolean;
		notifyMaintenanceRequests: boolean;
		notifyRentReminders: boolean;
		notifyLeaseExpirations: boolean;
		applicationProcess: "internal" | "platform";
		screeningCreditCheck: boolean;
		screeningBackgroundCheck: boolean;
		screeningIncomeVerification: boolean;
		leaseSigningPreference: "digital" | "offline";
	};
	team: {
		teamMembers?: Array<{
			email: string;
			role:
				| "administrator"
				| "property_manager"
				| "leasing_agent"
				| "maintenance_technician";
		}>;
	};
	property?: {
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
		propertyManagerId?: string;
		leaseTemplateId?: string;
	};
	rental?: {
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
	};
	photos?: string[];
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
			};
			rental: {
				rentAmount?: string;
				securityDeposit?: string;
				leaseDurations?: Array<
					"month-to-month" | "6-months" | "1-year" | "other"
				>;
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
			};
			management: {
				contactDisplay?: "email" | "phone" | "both";
				applicationProcess?: "online" | "in-person" | "both";
				screeningPreferences?: Array<
					| "credit-check"
					| "background-check"
					| "income-verification"
					| "rental-history"
					| "references"
				>;
				communicationPreferences?: Array<
					"email" | "phone" | "text" | "in-person"
				>;
				leaseSigningPreference?: "online" | "in-person" | "both";
			};
			photos: string[];
	  }
	| PropertyManagerSetupPreference;

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

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
	| { [key: string]: string | number | boolean };

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

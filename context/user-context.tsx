"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import {
	login as loginAction,
	register as registerAction,
	userSession,
} from "@/actions/server/user";
import { authClient } from "@/lib/auth-client";
import {
	type User,
	UserRole,
	type RolePermission,
	DEFAULT_ROLE_PERMISSIONS,
	type OnboardingState,
} from "@/types/user";

// Add types for the auth session data
interface AuthUser {
	id: string;
	email: string;
	name: string | null;
	image?: string | null;
	emailVerified: boolean | null;
	createdAt: Date;
	updatedAt: Date;
}

interface AuthSession {
	user: AuthUser;
	expires: string;
	// Sometimes custom data may be attached to the session
	[key: string]: unknown;
}

interface UserContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	isOnboarding: boolean;
	onboardingState: OnboardingState | null;
	permissions: RolePermission;
	login: (
		email: string,
		password: string,
	) => Promise<{ success: boolean; error?: string }>;
	register: (
		email: string,
		password: string,
		firstName: string,
		lastName: string,
	) => Promise<{ success: boolean; error?: string }>;
	logout: () => void;
	updateUser: (userData: Partial<User>) => Promise<void>;
	updateOnboardingState: (state: Partial<OnboardingState>) => void;
	completeOnboarding: () => Promise<void>;
	hasPermission: (permission: keyof RolePermission) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
	children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [onboardingState, setOnboardingState] =
		useState<OnboardingState | null>(null);

	// Default permissions when no role is selected
	const defaultPermissions: RolePermission = {
		canCreateListings: false,
		canEditListings: false,
		canApplyForRentals: false,
		canManageUsers: false,
		canManageMultipleProperties: false,
		canViewReports: false,
		canViewAnalytics: false,
	};

	// Get permissions based on user role
	const permissions = user?.role
		? DEFAULT_ROLE_PERMISSIONS[user.role]
		: defaultPermissions;

	// Check if user is authenticated
	const isAuthenticated = !!user;

	// Check if user is in onboarding flow
	const isOnboarding = isAuthenticated && !user.onboardingCompleted;

	// Initialize onboarding state when a user logs in and needs onboarding
	useEffect(() => {
		if (isOnboarding && !onboardingState) {
			setOnboardingState({
				step: 1,
				role: user.role,
				preferences: {},
				profile: {
					name: user.name,
				},
			});
		}
	}, [isOnboarding, onboardingState, user]);

	// Check for existing login session on mount
	useEffect(() => {
		const checkAuthStatus = async () => {
			setIsLoading(true);
			try {
				// Use authClient to get the current session instead of userSession()
				const session = await userSession();

				if (session.data?.session) {
					console.log(session);
					// Create our User object from the auth session
					const userData: User = {
						id: session.data.user.id,
						email: session.data.user.email,
						name: session.data.user.name || "",
						// Role would need to be stored somewhere - for now setting a default or undefined
						role: undefined,
						onboardingCompleted: false, // Default to false, would need to be stored elsewhere
						profilePicture: session.data.user.image || undefined,
						createdAt: session.data.user.createdAt.toISOString(),
						lastLogin: new Date().toISOString(),
					};

					setUser(userData);
				}
			} catch (error) {
				console.error("Auth check failed:", error);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	// Login function
	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const result = await loginAction(email, password);

			if (result.success && result.data?.user) {
				// For now, we'll consider all logins as "new" users who need onboarding
				// In a real app, you'd store this information in a database
				const isNewUser = true;

				// Create our User object from the auth session
				const userData: User = {
					id: result.data.user.id,
					email: result.data.user.email,
					name: result.data.user.name || "",
					role: undefined, // Role would need to be set during onboarding
					onboardingCompleted: !isNewUser,
					profilePicture: result.data.user.image || undefined,
					createdAt: result.data.user.createdAt.toISOString(),
					lastLogin: new Date().toISOString(),
				};

				// Save to state
				setUser(userData);

				// Initialize onboarding for new users
				if (isNewUser) {
					setOnboardingState({
						step: 1,
						preferences: {},
						profile: {
							name: userData.name,
						},
					});
				}

				return { success: true };
			}

			return {
				success: false,
				error: result.error || "Login failed",
			};
		} catch (error) {
			console.error("Login failed:", error);
			return {
				success: false,
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			};
		} finally {
			setIsLoading(false);
		}
	};

	// Register function
	const register = async (
		email: string,
		password: string,
		firstName: string,
		lastName: string,
	) => {
		setIsLoading(true);
		try {
			const result = await registerAction(email, password, firstName, lastName);

			if (result.success && result.data) {
				// Auto login after registration
				return await login(email, password);
			}

			return {
				success: false,
				error: result.error || "Registration failed",
			};
		} catch (error) {
			console.error("Registration failed:", error);
			return {
				success: false,
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			};
		} finally {
			setIsLoading(false);
		}
	};

	// Logout function
	const logout = async () => {
		try {
			await authClient.signOut();
			// Clear local state after successful signout
			setUser(null);
			setOnboardingState(null);
		} catch (error) {
			console.error("Logout failed:", error);
			throw error;
		}
	};

	// Update user data
	const updateUser = async (userData: Partial<User>) => {
		if (!user) return;

		try {
			// Here you would make an API call to update the user in the database
			// For this implementation, we'll just update the local state
			const updatedUser = {
				...user,
				...userData,
				lastLogin: new Date().toISOString(),
			};
			setUser(updatedUser);
		} catch (error) {
			console.error("Update failed:", error);
			throw error;
		}
	};

	// Update onboarding state
	const updateOnboardingState = (state: Partial<OnboardingState>) => {
		if (!onboardingState) return;

		const updatedState = { ...onboardingState, ...state };
		setOnboardingState(updatedState);

		// If role is being updated, also update user role
		if (state.role && state.role !== user?.role) {
			updateUser({ role: state.role });
		}
	};

	// Complete onboarding process
	const completeOnboarding = async () => {
		if (!user) return;

		try {
			await updateUser({
				onboardingCompleted: true,
				...(onboardingState?.profile.name && {
					name: onboardingState.profile.name,
				}),
			});
			setOnboardingState(null);
		} catch (error) {
			console.error("Failed to complete onboarding:", error);
			throw error;
		}
	};

	// Check if user has a specific permission
	const hasPermission = (permission: keyof RolePermission) => {
		return !!permissions[permission];
	};

	const value = {
		user,
		isLoading,
		isAuthenticated,
		isOnboarding,
		onboardingState,
		permissions,
		login,
		register,
		logout,
		updateUser,
		updateOnboardingState,
		completeOnboarding,
		hasPermission,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}

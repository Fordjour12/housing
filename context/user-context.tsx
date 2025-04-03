// "use client";

// // import { assignRoleToUser } from "@/actions/server/role";
// // import {
// // 	getUserProfile,
// // 	login as loginAction,
// // 	register as registerAction,
// // 	updateOnboardingStatus,
// // 	userSession,
// // } from "@/actions/server/user";
// import { authClient } from "@/lib/auth-client";
// import {
// 	DEFAULT_ROLE_PERMISSIONS,
// 	type OnboardingState,
// 	type RolePermission,
// 	type User,
// } from "@/types/user";
// import {
// 	type ReactNode,
// 	createContext,
// 	useContext,
// 	useEffect,
// 	useState,
// } from "react";

// // Add types for the auth session data
// interface AuthUser {
// 	id: string;
// 	email: string;
// 	name: string | null;
// 	image?: string | null;
// 	emailVerified: boolean | null;
// 	createdAt: Date;
// 	updatedAt: Date;
// }

// // Enhanced user adds database fields
// interface EnhancedUser extends AuthUser {
// 	role?: User["role"];
// 	onboardingCompleted?: boolean;
// }

// interface AuthSession {
// 	user: AuthUser;
// 	expires: string;
// 	// Sometimes custom data may be attached to the session
// 	[key: string]: unknown;
// }

// // Added type for the enhanced session structure returned by userSession()
// interface EnhancedSessionData {
// 	session: AuthSession;
// 	user: {
// 		id: string;
// 		email: string;
// 		name: string | null;
// 		emailVerified: boolean | null;
// 		image?: string | null;
// 		createdAt: Date;
// 		updatedAt: Date;
// 		role?: User["role"];
// 		onboardingCompleted?: boolean;
// 	};
// }

// interface UserContextType {
// 	user: User | null;
// 	isLoading: boolean;
// 	isAuthenticated: boolean;
// 	isOnboarding: boolean;
// 	onboardingState: OnboardingState | null;
// 	permissions: RolePermission;
// 	login: (
// 		email: string,
// 		password: string,
// 	) => Promise<{ success: boolean; error?: string }>;
// 	register: (
// 		email: string,
// 		password: string,
// 		firstName: string,
// 		lastName: string,
// 	) => Promise<{ success: boolean; error?: string }>;
// 	logout: () => void;
// 	updateUser: (userData: Partial<User>) => Promise<void>;
// 	updateOnboardingState: (state: Partial<OnboardingState>) => void;
// 	completeOnboarding: () => Promise<void>;
// 	hasPermission: (permission: keyof RolePermission) => boolean;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// interface UserProviderProps {
// 	children: ReactNode;
// }

// export function UserProvider({ children }: UserProviderProps) {
// 	const [user, setUser] = useState<User | null>(null);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [onboardingState, setOnboardingState] =
// 		useState<OnboardingState | null>(null);

// 	// Default permissions when no role is selected
// 	const defaultPermissions: RolePermission = {
// 		canCreateListings: false,
// 		canEditListings: false,
// 		canApplyForRentals: false,
// 		canManageUsers: false,
// 		canManageMultipleProperties: false,
// 		canViewReports: false,
// 		canViewAnalytics: false,
// 	};

// 	// Get permissions based on user role
// 	const permissions = user?.role
// 		? DEFAULT_ROLE_PERMISSIONS[user.role]
// 		: defaultPermissions;

// 	// Check if user is authenticated
// 	const isAuthenticated = !!user;

// 	// Check if user is in onboarding flow
// 	const isOnboarding = isAuthenticated && !user.onboardingCompleted;

// 	// Initialize onboarding state when a user logs in and needs onboarding
// 	useEffect(() => {
// 		if (isOnboarding && !onboardingState) {
// 			setOnboardingState({
// 				step: 1,
// 				role: user.role,
// 				preferences: {},
// 				profile: {
// 					name: user.name,
// 				},
// 			});
// 		}
// 	}, [isOnboarding, onboardingState, user]);

// 	// Check for existing login session on mount
// 	useEffect(() => {
// 		const checkAuthStatus = async () => {
// 			setIsLoading(true);
// 			try {
// 				// Use authClient to get the current session instead of userSession()
// 				const session = await userSession();

// 				if (session.data?.session) {
// 					console.log("Session data:", session.data);
// 					// Cast to our enhanced session type for type safety - first to unknown, then to EnhancedSessionData
// 					const enhancedData = session.data as unknown as EnhancedSessionData;

// 					// Create our User object from the auth session with proper onboarding status
// 					const userData: User = {
// 						id: enhancedData.user.id,
// 						email: enhancedData.user.email,
// 						name: enhancedData.user.name || "",
// 						// Use the role and onboarding status from the enhanced session
// 						// which comes from the database (source of truth)
// 						role: enhancedData.user.role as User["role"],
// 						onboardingCompleted: enhancedData.user.onboardingCompleted ?? false,
// 						profilePicture: enhancedData.user.image || undefined,
// 						createdAt: enhancedData.user.createdAt.toISOString(),
// 						lastLogin: new Date().toISOString(),
// 						// Add default values for profile fields
// 						phone: "",
// 						bio: "",
// 						address: "",
// 						avatar:
// 							enhancedData.user.image ||
// 							"/placeholder.svg?height=200&width=200",
// 						memberSince: new Date(enhancedData.user.createdAt)
// 							.toISOString()
// 							.split("T")[0],
// 						verifications: {
// 							email: true,
// 							phone: false,
// 							identity: false,
// 						},
// 						preferences: {
// 							emailNotifications: {
// 								newListings: true,
// 								applicationUpdates: true,
// 								messageAlerts: true,
// 								promotions: false,
// 							},
// 							pushNotifications: {
// 								newListings: false,
// 								applicationUpdates: true,
// 								messageAlerts: true,
// 								promotions: false,
// 							},
// 						},
// 						savedSearches: [],
// 						favoriteListings: [],
// 					};

// 					setUser(userData);
// 				}
// 			} catch (error) {
// 				console.error("Auth check failed:", error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		checkAuthStatus();
// 	}, []);

// 	// Login function
// 	const login = async (email: string, password: string) => {
// 		setIsLoading(true);
// 		try {
// 			const result = await loginAction(email, password);

// 			if (result.success && result.data?.user) {
// 				// Get the user's complete profile from the database to get accurate onboarding status
// 				const userProfileResult = await getUserProfile(result.data.user.id);

// 				// Use onboarding status from database - this is our source of truth
// 				const onboardingCompleted = userProfileResult.success
// 					? (userProfileResult.data?.onboardingCompleted ?? false)
// 					: false;

// 				// Use role from database - this is our source of truth
// 				const userRole = userProfileResult.success
// 					? userProfileResult.data?.role
// 					: undefined;

// 				// Create our User object from the auth session
// 				const userData: User = {
// 					id: result.data.user.id,
// 					email: result.data.user.email,
// 					name: result.data.user.name || "",
// 					role: userRole as User["role"], // Type assertion to fix type error
// 					onboardingCompleted: onboardingCompleted, // Onboarding status from database
// 					profilePicture: result.data.user.image || undefined,
// 					createdAt: result.data.user.createdAt.toISOString(),
// 					lastLogin: new Date().toISOString(),
// 					// Add default values for profile fields
// 					phone: "",
// 					bio: "",
// 					address: "",
// 					avatar:
// 						result.data.user.image || "/placeholder.svg?height=200&width=200",
// 					memberSince: new Date(result.data.user.createdAt)
// 						.toISOString()
// 						.split("T")[0],
// 					verifications: {
// 						email: true,
// 						phone: false,
// 						identity: false,
// 					},
// 					preferences: {
// 						emailNotifications: {
// 							newListings: true,
// 							applicationUpdates: true,
// 							messageAlerts: true,
// 							promotions: false,
// 						},
// 						pushNotifications: {
// 							newListings: false,
// 							applicationUpdates: true,
// 							messageAlerts: true,
// 							promotions: false,
// 						},
// 					},
// 					savedSearches: [],
// 					favoriteListings: [],
// 				};

// 				// Save to state
// 				setUser(userData);

// 				// Initialize onboarding for new users who haven't completed onboarding
// 				if (!onboardingCompleted) {
// 					setOnboardingState({
// 						step: 1,
// 						role: userRole as User["role"], // Type assertion to fix type error
// 						preferences: {},
// 						profile: {
// 							name: userData.name,
// 						},
// 					});
// 				}

// 				return { success: true };
// 			}

// 			return {
// 				success: false,
// 				error: result.error || "Login failed",
// 			};
// 		} catch (error) {
// 			console.error("Login failed:", error);
// 			return {
// 				success: false,
// 				error:
// 					error instanceof Error ? error.message : "An unknown error occurred",
// 			};
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	// Register function
// 	const register = async (
// 		email: string,
// 		password: string,
// 		firstName: string,
// 		lastName: string,
// 	) => {
// 		setIsLoading(true);
// 		try {
// 			const result = await registerAction(email, password, firstName, lastName);

// 			if (result.success && result.data) {
// 				// For new registrations, auto login and ensure onboarding is shown
// 				// In the case of registration, we know the user is new and needs onboarding
// 				const loginResult = await login(email, password);

// 				// Even if the database has onboardingCompleted set (it shouldn't for new users),
// 				// we'll make sure to set it to false for the UI and then update database
// 				if (loginResult.success && user) {
// 					// Set onboarding to not completed for new registrations
// 					if (user.onboardingCompleted) {
// 						await updateUser({ onboardingCompleted: false });
// 						// Ensure database is also updated
// 						await updateOnboardingStatus(user.id, false);
// 					}
// 				}

// 				return loginResult;
// 			}

// 			return {
// 				success: false,
// 				error: result.error || "Registration failed",
// 			};
// 		} catch (error) {
// 			console.error("Registration failed:", error);
// 			return {
// 				success: false,
// 				error:
// 					error instanceof Error ? error.message : "An unknown error occurred",
// 			};
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	// Logout function
// 	const logout = async () => {
// 		try {
// 			await authClient.signOut();
// 			// Clear local state after successful signout
// 			setUser(null);
// 			setOnboardingState(null);
// 		} catch (error) {
// 			console.error("Logout failed:", error);
// 			throw error;
// 		}
// 	};

// 	// Update user data
// 	const updateUser = async (userData: Partial<User>) => {
// 		if (!user) return;

// 		try {
// 			// Here you would make an API call to update the user in the database
// 			// For this implementation, we'll just update the local state
// 			const updatedUser = {
// 				...user,
// 				...userData,
// 				lastLogin: new Date().toISOString(),
// 			};
// 			setUser(updatedUser);
// 		} catch (error) {
// 			console.error("Update failed:", error);
// 			throw error;
// 		}
// 	};

// 	// Update onboarding state
// 	const updateOnboardingState = (state: Partial<OnboardingState>) => {
// 		if (!onboardingState) return;

// 		const updatedState = { ...onboardingState, ...state };
// 		setOnboardingState(updatedState);

// 		// If role is being updated, also update user role
// 		if (state.role && state.role !== user?.role) {
// 			updateUser({ role: state.role });
// 		}
// 	};

// 	// Complete onboarding process
// 	const completeOnboarding = async () => {
// 		if (!user) return;

// 		try {
// 			// Make sure to include the role from onboarding state
// 			await updateUser({
// 				onboardingCompleted: true,
// 				...(onboardingState?.profile.name && {
// 					name: onboardingState.profile.name,
// 				}),
// 				// Explicitly set the user's role from onboarding state
// 				...(onboardingState?.role && {
// 					role: onboardingState.role,
// 				}),
// 			});

// 			// If the user selected a role, make sure to call the server action to assign the role
// 			if (onboardingState?.role) {
// 				// Persist the role assignment to the database
// 				const result = await assignRoleToUser(user.id, onboardingState.role);
// 				if (!result.success) {
// 					console.error(`Failed to assign role: ${result.error}`);
// 				} else {
// 					console.log(`Role assigned in database: ${onboardingState.role}`);
// 				}
// 			}

// 			// Update onboarding status in the database (make it the source of truth)
// 			const onboardingResult = await updateOnboardingStatus(user.id, true);
// 			if (!onboardingResult.success) {
// 				console.error(
// 					`Failed to update onboarding status: ${onboardingResult.error}`,
// 				);
// 			} else {
// 				console.log("Onboarding completed status saved to database");
// 			}

// 			setOnboardingState(null);
// 		} catch (error) {
// 			console.error("Failed to complete onboarding:", error);
// 			throw error;
// 		}
// 	};

// 	// Check if user has a specific permission
// 	const hasPermission = (permission: keyof RolePermission) => {
// 		return !!permissions[permission];
// 	};

// 	const value = {
// 		user,
// 		isLoading,
// 		isAuthenticated,
// 		isOnboarding,
// 		onboardingState,
// 		permissions,
// 		login,
// 		register,
// 		logout,
// 		updateUser,
// 		updateOnboardingState,
// 		completeOnboarding,
// 		hasPermission,
// 	};

// 	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }

// export function useUser() {
// 	const context = useContext(UserContext);
// 	if (context === undefined) {
// 		throw new Error("useUser must be used within a UserProvider");
// 	}
// 	return context;
// }

// "use client";

// import type React from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Textarea } from "@/components/ui/textarea";
// import {
// 	AlertCircle,
// 	Bath,
// 	BedDouble,
// 	CheckCircle,
// 	Clock,
// 	CreditCard,
// 	Edit,
// 	ExternalLink,
// 	Eye,
// 	FileText,
// 	Heart,
// 	Home,
// 	LogOut,
// 	MessageSquare,
// 	Plus,
// 	Save,
// 	Search,
// 	Settings,
// 	Square,
// 	Trash2,
// 	Upload,
// 	User as UserIcon,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // Add the import for GoogleMapComponent at the top of the file
// import GoogleMapComponent, {
// 	type PropertyLocation,
// } from "@/components/google-map";

// // Add the NotificationDemo import at the top of the file
// import { NotificationDemo } from "@/components/notification-demo";

// // Add useUser import
// import { useUser } from "@/context/user-context";
// import type { User } from "@/types/user";

// export default function AccountProfile() {
// 	const {
// 		user: contextUser,
// 		updateUser,
// 		logout,
// 		isLoading: isContextLoading,
// 	} = useUser();
// 	const [user, setUser] = useState<User | null>(null);
// 	const [activeTab, setActiveTab] = useState("profile");
// 	const [editMode, setEditMode] = useState(false);
// 	const [isSaving, setIsSaving] = useState(false);

// 	// Initialize user from context when available
// 	useEffect(() => {
// 		if (contextUser) {
// 			setUser({
// 				...contextUser,
// 				// Default values for optional properties
// 				avatar:
// 					contextUser.avatar ||
// 					contextUser.profilePicture ||
// 					"/placeholder.svg?height=200&width=200",
// 				memberSince:
// 					contextUser.memberSince ||
// 					(contextUser.createdAt
// 						? new Date(contextUser.createdAt).toISOString().split("T")[0]
// 						: new Date().toISOString().split("T")[0]),
// 				verifications: contextUser.verifications || {
// 					email: true,
// 					phone: false,
// 					identity: false,
// 				},
// 				preferences: contextUser.preferences || {
// 					emailNotifications: {
// 						newListings: true,
// 						applicationUpdates: true,
// 						messageAlerts: true,
// 						promotions: false,
// 					},
// 					pushNotifications: {
// 						newListings: false,
// 						applicationUpdates: true,
// 						messageAlerts: true,
// 						promotions: false,
// 					},
// 				},
// 				savedSearches: contextUser.savedSearches || [],
// 				favoriteListings: contextUser.favoriteListings || [],
// 				rentalApplications: contextUser.rentalApplications || [],
// 				paymentMethods: contextUser.paymentMethods || [],
// 				// Provide a default subscription plan for demo purposes - in a real app, this would come from a database
// 				subscriptionPlan: contextUser.subscriptionPlan || {
// 					name: "Free",
// 					price: 0,
// 					billingCycle: "monthly",
// 					nextBilling: "-",
// 					features: ["Basic listings", "Standard search"],
// 				},
// 			});
// 		}
// 	}, [contextUser]);

// 	// Initialize form data from user
// 	const [formData, setFormData] = useState({
// 		name: "",
// 		email: "",
// 		phone: "",
// 		bio: "",
// 		address: "",
// 	});

// 	// Update form data when user changes
// 	useEffect(() => {
// 		if (user) {
// 			setFormData({
// 				name: user.name || "",
// 				email: user.email || "",
// 				phone: user.phone || "",
// 				bio: user.bio || "",
// 				address: user.address || "",
// 			});
// 		}
// 	}, [user]);

// 	// Add state for the highlighted property
// 	const [highlightedProperty, setHighlightedProperty] = useState<number | null>(
// 		null,
// 	);

// 	const handleInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
// 	) => {
// 		const { name, value } = e.target;
// 		setFormData({
// 			...formData,
// 			[name]: value,
// 		});
// 	};

// 	const handleSaveProfile = async () => {
// 		if (!user) return;

// 		setIsSaving(true);
// 		try {
// 			// Call the updateUser function from context to save the changes to the backend
// 			await updateUser({
// 				name: formData.name,
// 				email: formData.email,
// 				phone: formData.phone,
// 				bio: formData.bio,
// 				address: formData.address,
// 			});

// 			// Update local state after successful API call
// 			setUser({
// 				...user,
// 				name: formData.name,
// 				email: formData.email,
// 				phone: formData.phone,
// 				bio: formData.bio,
// 				address: formData.address,
// 			});
// 			setEditMode(false);
// 		} catch (error) {
// 			console.error("Failed to update profile:", error);
// 		} finally {
// 			setIsSaving(false);
// 		}
// 	};

// 	// Update handleToggleNotification with explicit typing for preferences
// 	const handleToggleNotification = (
// 		category: string,
// 		type: "email" | "push",
// 		value: boolean,
// 	) => {
// 		if (!user) return;

// 		// Create a deep copy of current preferences or empty object
// 		const currentEmailNotifications =
// 			user.preferences?.emailNotifications || {};
// 		const currentPushNotifications = user.preferences?.pushNotifications || {};

// 		// Build new preferences based on notification type
// 		const newPreferences = {
// 			...user.preferences,
// 			emailNotifications:
// 				type === "email"
// 					? { ...currentEmailNotifications, [category]: value }
// 					: currentEmailNotifications,
// 			pushNotifications:
// 				type === "push"
// 					? { ...currentPushNotifications, [category]: value }
// 					: currentPushNotifications,
// 		};

// 		setUser({
// 			...user,
// 			preferences: newPreferences,
// 		});
// 	};

// 	// Fix other handlers with null checks and proper typing
// 	const handleRemoveSavedSearch = (id: string) => {
// 		if (!user || !user.savedSearches) return;

// 		setUser({
// 			...user,
// 			savedSearches: user.savedSearches.filter((search) => search.id !== id),
// 		});
// 	};

// 	const handleRemoveFavorite = (id: number) => {
// 		if (!user || !user.favoriteListings) return;

// 		setUser({
// 			...user,
// 			favoriteListings: user.favoriteListings.filter(
// 				(listing) => listing.id !== id,
// 			),
// 		});
// 	};

// 	// Update role checks for proper UserRole types
// 	const isRenter = user?.role === "renter";
// 	const isLandlord =
// 		user?.role === "landlord" || user?.role === "property_manager";

// 	// Check if the component is in a loading state
// 	const isLoading = isContextLoading || (!user && contextUser !== null);

// 	// Show loading state when user data is not yet available
// 	if (isLoading) {
// 		return (
// 			<div className="container py-10">
// 				<div className="flex items-center justify-center h-[50vh]">
// 					<div className="text-center">
// 						<div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
// 						<p className="text-muted-foreground">Loading profile data...</p>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}

// 	// If not loading but user is null, show a message
// 	if (!user && !isLoading) {
// 		return (
// 			<div className="container py-10">
// 				<div className="flex items-center justify-center h-[50vh]">
// 					<div className="text-center">
// 						<p className="font-medium text-xl mb-2">
// 							Please log in to view your profile
// 						</p>
// 						<Button asChild>
// 							<Link href="/login">Log In</Link>
// 						</Button>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}

// 	// At this point, we know user is not null
// 	const userData = user as User;

// 	// Role checks for the interface
// 	const isRenterView = userData.role === "renter";
// 	const isLandlordView =
// 		userData.role === "landlord" || userData.role === "property_manager";

// 	// Function to get properties for map display
// 	const getSavedSearchProperties = (): PropertyLocation[] => {
// 		// Convert favorite listings to map properties
// 		if (!userData.favoriteListings || userData.favoriteListings.length === 0) {
// 			return [];
// 		}

// 		return userData.favoriteListings.map((listing) => ({
// 			id: listing.id,
// 			title: listing.title,
// 			address: listing.address,
// 			lat: 29.7604 + (Math.random() * 0.05 - 0.025), // Generate random coordinates near Houston
// 			lng: -95.3698 + (Math.random() * 0.05 - 0.025),
// 			price: listing.price,
// 			beds: listing.beds,
// 			baths: listing.baths,
// 			sqft: listing.sqft,
// 			image: listing.image,
// 		}));
// 	};

// 	// Handler for saving profile changes
// 	const handleSaveProfileWithUserData = async () => {
// 		setIsSaving(true);
// 		try {
// 			// Call the updateUser function from context to save the changes to the backend
// 			await updateUser({
// 				name: formData.name,
// 				email: formData.email,
// 				phone: formData.phone,
// 				bio: formData.bio,
// 				address: formData.address,
// 			});

// 			// Update local state after successful API call
// 			setUser({
// 				...userData,
// 				name: formData.name,
// 				email: formData.email,
// 				phone: formData.phone,
// 				bio: formData.bio,
// 				address: formData.address,
// 			});
// 			setEditMode(false);
// 		} catch (error) {
// 			console.error("Failed to update profile:", error);
// 		} finally {
// 			setIsSaving(false);
// 		}
// 	};

// 	// Handler for toggling notification preferences
// 	const handleToggleNotificationWithUserData = (
// 		category: string,
// 		type: "email" | "push",
// 		value: boolean,
// 	) => {
// 		// Create a deep copy of current preferences or empty object
// 		const currentEmailNotifications =
// 			userData.preferences?.emailNotifications || {};
// 		const currentPushNotifications =
// 			userData.preferences?.pushNotifications || {};

// 		// Build new preferences based on notification type
// 		const newPreferences = {
// 			...userData.preferences,
// 			emailNotifications:
// 				type === "email"
// 					? { ...currentEmailNotifications, [category]: value }
// 					: currentEmailNotifications,
// 			pushNotifications:
// 				type === "push"
// 					? { ...currentPushNotifications, [category]: value }
// 					: currentPushNotifications,
// 		};

// 		setUser({
// 			...userData,
// 			preferences: newPreferences,
// 		});
// 	};

// 	// Handler for removing saved searches
// 	const handleRemoveSavedSearchWithUserData = (id: string) => {
// 		if (!userData.savedSearches) return;

// 		setUser({
// 			...userData,
// 			savedSearches: userData.savedSearches.filter(
// 				(search) => search.id !== id,
// 			),
// 		});
// 	};

// 	// Handler for removing favorite listings
// 	const handleRemoveFavoriteWithUserData = (id: number) => {
// 		if (!userData.favoriteListings) return;

// 		setUser({
// 			...userData,
// 			favoriteListings: userData.favoriteListings.filter(
// 				(listing) => listing.id !== id,
// 			),
// 		});
// 	};

// 	return (
// 		<div className="flex flex-col space-y-8">
// 			{/* Role switcher (if user has multiple roles) */}
// 			{isRenter && isLandlord && (
// 				<Card>
// 					<CardContent className="p-6">
// 						<div className="flex items-center justify-between">
// 							<div>
// 								<h3 className="text-lg font-medium">Account Type</h3>
// 								<p className="text-sm text-muted-foreground">
// 									Switch between renter and landlord views
// 								</p>
// 							</div>
// 							<Select defaultValue="renter">
// 								<SelectTrigger className="w-[180px]">
// 									<SelectValue placeholder="Select view" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="renter">Renter View</SelectItem>
// 									<SelectItem value="landlord">Landlord View</SelectItem>
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</CardContent>
// 				</Card>
// 			)}

// 			{/* Main tabs */}
// 			<Tabs defaultValue="profile" onValueChange={setActiveTab} className="">
// 				<TabsList className="mx-2">
// 					<TabsTrigger value="profile" className="flex items-center gap-2">
// 						<UserIcon className="h-4 w-4" />
// 						<span>Profile</span>
// 					</TabsTrigger>

// 					{isRenter && (
// 						<>
// 							<TabsTrigger value="saved" className="flex items-center gap-2">
// 								<Heart className="h-4 w-4" />
// 								<span>Saved</span>
// 							</TabsTrigger>
// 							<TabsTrigger
// 								value="applications"
// 								className="flex items-center gap-2"
// 							>
// 								<FileText className="h-4 w-4" />
// 								<span>Applications</span>
// 							</TabsTrigger>
// 						</>
// 					)}

// 					{isLandlord && (
// 						<>
// 							<TabsTrigger value="listings" className="flex items-center gap-2">
// 								<Home className="h-4 w-4" />
// 								<span>Listings</span>
// 							</TabsTrigger>
// 							<TabsTrigger value="payments" className="flex items-center gap-2">
// 								<CreditCard className="h-4 w-4" />
// 								<span>Payments</span>
// 							</TabsTrigger>
// 						</>
// 					)}

// 					<TabsTrigger value="settings" className="flex items-center gap-2">
// 						<Settings className="h-4 w-4" />
// 						<span>Settings</span>
// 					</TabsTrigger>
// 				</TabsList>

// 				{/* Profile Tab */}
// 				<TabsContent value="profile" className="space-y-6">
// 					<Card>
// 						<CardHeader className="flex flex-row items-start justify-between">
// 							<div>
// 								<CardTitle>Profile Information</CardTitle>
// 								<CardDescription>
// 									Manage your personal information and preferences
// 								</CardDescription>
// 							</div>
// 							{!editMode ? (
// 								<Button
// 									variant="outline"
// 									onClick={() => setEditMode(true)}
// 									className="flex items-center gap-1"
// 								>
// 									<Edit className="h-4 w-4" />
// 									<span>Edit Profile</span>
// 								</Button>
// 							) : (
// 								<div className="flex gap-2">
// 									<Button variant="outline" onClick={() => setEditMode(false)}>
// 										Cancel
// 									</Button>
// 									<Button
// 										onClick={handleSaveProfileWithUserData}
// 										disabled={isSaving}
// 									>
// 										{isSaving ? (
// 											<>Saving...</>
// 										) : (
// 											<>
// 												<Save className="h-4 w-4 mr-2" />
// 												Save Changes
// 											</>
// 										)}
// 									</Button>
// 								</div>
// 							)}
// 						</CardHeader>
// 						<CardContent className="space-y-6">
// 							<div className="flex flex-col md:flex-row gap-6">
// 								{/* Avatar section */}
// 								<div className="flex flex-col items-center space-y-4">
// 									<Avatar className="h-24 w-24">
// 										<AvatarImage
// 											src={
// 												userData.avatar ||
// 												userData.profilePicture ||
// 												"/placeholder.svg"
// 											}
// 											alt={userData.name || "User"}
// 										/>
// 										<AvatarFallback>
// 											{userData.name
// 												? userData.name
// 														.split(" ")
// 														.map((n) => n[0])
// 														.join("")
// 												: "U"}
// 										</AvatarFallback>
// 									</Avatar>
// 									{editMode && (
// 										<Button
// 											variant="outline"
// 											size="sm"
// 											className="flex items-center gap-1"
// 										>
// 											<Upload className="h-4 w-4" />
// 											<span>Change Photo</span>
// 										</Button>
// 									)}
// 									<div className="text-center">
// 										<p className="text-sm text-muted-foreground">
// 											Member since
// 										</p>
// 										<p className="font-medium">
// 											{userData.memberSince
// 												? new Date(userData.memberSince).toLocaleDateString()
// 												: userData.createdAt
// 													? new Date(userData.createdAt).toLocaleDateString()
// 													: "-"}
// 										</p>
// 									</div>
// 								</div>

// 								{/* Profile details */}
// 								<div className="flex-1 space-y-4">
// 									{editMode ? (
// 										// Edit mode
// 										<div className="grid gap-4">
// 											<div className="grid gap-2">
// 												<Label htmlFor="name">Full Name</Label>
// 												<Input
// 													id="name"
// 													name="name"
// 													value={formData.name}
// 													onChange={handleInputChange}
// 												/>
// 											</div>
// 											<div className="grid gap-2">
// 												<Label htmlFor="email">Email</Label>
// 												<Input
// 													id="email"
// 													name="email"
// 													type="email"
// 													value={formData.email}
// 													onChange={handleInputChange}
// 												/>
// 											</div>
// 											<div className="grid gap-2">
// 												<Label htmlFor="phone">Phone Number</Label>
// 												<Input
// 													id="phone"
// 													name="phone"
// 													value={formData.phone}
// 													onChange={handleInputChange}
// 												/>
// 											</div>
// 											<div className="grid gap-2">
// 												<Label htmlFor="address">Address</Label>
// 												<Input
// 													id="address"
// 													name="address"
// 													value={formData.address}
// 													onChange={handleInputChange}
// 												/>
// 											</div>
// 											<div className="grid gap-2">
// 												<Label htmlFor="bio">Bio</Label>
// 												<Textarea
// 													id="bio"
// 													name="bio"
// 													value={formData.bio}
// 													onChange={handleInputChange}
// 													rows={4}
// 													placeholder="Tell us a bit about yourself..."
// 												/>
// 											</div>
// 										</div>
// 									) : (
// 										// View mode
// 										<div className="space-y-4">
// 											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 												<div>
// 													<p className="text-sm font-medium text-muted-foreground">
// 														Full Name
// 													</p>
// 													<p className="text-base">{userData.name}</p>
// 												</div>
// 												<div>
// 													<p className="text-sm font-medium text-muted-foreground">
// 														Email
// 													</p>
// 													<p className="text-base flex items-center">
// 														{userData.email}
// 														{userData.verifications?.email && (
// 															<Badge
// 																variant="outline"
// 																className="ml-2 text-xs bg-green-50 text-green-700 border-green-200"
// 															>
// 																<CheckCircle className="h-3 w-3 mr-1" />
// 																Verified
// 															</Badge>
// 														)}
// 													</p>
// 												</div>
// 												<div>
// 													<p className="text-sm font-medium text-muted-foreground">
// 														Phone Number
// 													</p>
// 													<p className="text-base flex items-center">
// 														{userData.phone}
// 														{userData.verifications?.phone && (
// 															<Badge
// 																variant="outline"
// 																className="ml-2 text-xs bg-green-50 text-green-700 border-green-200"
// 															>
// 																<CheckCircle className="h-3 w-3 mr-1" />
// 																Verified
// 															</Badge>
// 														)}
// 													</p>
// 												</div>
// 												<div>
// 													<p className="text-sm font-medium text-muted-foreground">
// 														Address
// 													</p>
// 													<p className="text-base">{userData.address}</p>
// 												</div>
// 											</div>
// 											<div>
// 												<p className="text-sm font-medium text-muted-foreground">
// 													Bio
// 												</p>
// 												<p className="text-base">{userData.bio}</p>
// 											</div>
// 											<div>
// 												<p className="text-sm font-medium text-muted-foreground">
// 													Account Type
// 												</p>
// 												<div className="flex gap-2 mt-1">
// 													{isRenter && (
// 														<Badge variant="secondary">Renter</Badge>
// 													)}
// 													{isLandlord && (
// 														<Badge variant="secondary">Landlord</Badge>
// 													)}
// 												</div>
// 											</div>
// 										</div>
// 									)}
// 								</div>
// 							</div>

// 							{/* Verification section */}
// 							{!editMode && (
// 								<div className="border-t pt-6">
// 									<h3 className="text-lg font-medium mb-4">Verifications</h3>
// 									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// 										<div className="flex items-center p-4 border rounded-lg">
// 											<div
// 												className={`h-10 w-10 rounded-full flex items-center justify-center ${
// 													userData.verifications?.email
// 														? "bg-green-100 text-green-600"
// 														: "bg-gray-100 text-gray-500"
// 												}`}
// 											>
// 												{userData.verifications?.email ? (
// 													<CheckCircle className="h-5 w-5" />
// 												) : (
// 													<AlertCircle className="h-5 w-5" />
// 												)}
// 											</div>
// 											<div className="ml-4">
// 												<p className="font-medium">Email</p>
// 												<p className="text-sm text-muted-foreground">
// 													{userData.verifications?.email
// 														? "Verified"
// 														: "Not verified"}
// 												</p>
// 											</div>
// 											{!userData.verifications?.email && (
// 												<Button variant="outline" size="sm" className="ml-auto">
// 													Verify
// 												</Button>
// 											)}
// 										</div>
// 										<div className="flex items-center p-4 border rounded-lg">
// 											<div
// 												className={`h-10 w-10 rounded-full flex items-center justify-center ${
// 													userData.verifications?.phone
// 														? "bg-green-100 text-green-600"
// 														: "bg-gray-100 text-gray-500"
// 												}`}
// 											>
// 												{userData.verifications?.phone ? (
// 													<CheckCircle className="h-5 w-5" />
// 												) : (
// 													<AlertCircle className="h-5 w-5" />
// 												)}
// 											</div>
// 											<div className="ml-4">
// 												<p className="font-medium">Phone</p>
// 												<p className="text-sm text-muted-foreground">
// 													{userData.verifications?.phone
// 														? "Verified"
// 														: "Not verified"}
// 												</p>
// 											</div>
// 											{!userData.verifications?.phone && (
// 												<Button variant="outline" size="sm" className="ml-auto">
// 													Verify
// 												</Button>
// 											)}
// 										</div>
// 										<div className="flex items-center p-4 border rounded-lg">
// 											<div
// 												className={`h-10 w-10 rounded-full flex items-center justify-center ${
// 													userData.verifications?.identity
// 														? "bg-green-100 text-green-600"
// 														: "bg-gray-100 text-gray-500"
// 												}`}
// 											>
// 												{userData.verifications?.identity ? (
// 													<CheckCircle className="h-5 w-5" />
// 												) : (
// 													<AlertCircle className="h-5 w-5" />
// 												)}
// 											</div>
// 											<div className="ml-4">
// 												<p className="font-medium">Identity</p>
// 												<p className="text-sm text-muted-foreground">
// 													{userData.verifications?.identity
// 														? "Verified"
// 														: "Not verified"}
// 												</p>
// 											</div>
// 											{!userData.verifications?.identity && (
// 												<Button variant="outline" size="sm" className="ml-auto">
// 													Verify
// 												</Button>
// 											)}
// 										</div>
// 									</div>
// 									<p className="text-sm text-muted-foreground mt-4">
// 										Verified accounts receive priority in rental applications
// 										and build trust with landlords.
// 									</p>
// 								</div>
// 							)}
// 						</CardContent>
// 					</Card>
// 				</TabsContent>

// 				{/* Saved Tab (for renters) */}
// 				{isRenter && (
// 					<TabsContent value="saved" className="space-y-6">
// 						{/* Saved Searches */}
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>Saved Searches</CardTitle>
// 								<CardDescription>
// 									Get notified when new properties match your search criteria
// 								</CardDescription>
// 							</CardHeader>
// 							<CardContent>
// 								{userData.savedSearches && userData.savedSearches.length > 0 ? (
// 									<div className="space-y-4">
// 										{userData.savedSearches.map((search) => (
// 											<div key={search.id} className="border rounded-lg p-4">
// 												<div className="flex justify-between items-start">
// 													<div>
// 														<h3 className="font-medium flex items-center">
// 															{search.name}
// 															{search.newListings > 0 && (
// 																<Badge className="ml-2 bg-green-500">
// 																	{search.newListings} new
// 																</Badge>
// 															)}
// 														</h3>
// 														<p className="text-sm text-muted-foreground mt-1">
// 															{search.criteria}
// 														</p>
// 													</div>
// 													<div className="flex gap-2">
// 														<Button variant="outline" size="sm" asChild>
// 															<Link href={`/listings?search=${search.id}`}>
// 																View Results
// 															</Link>
// 														</Button>
// 														<Button
// 															variant="ghost"
// 															size="sm"
// 															onClick={() =>
// 																handleRemoveSavedSearchWithUserData(search.id)
// 															}
// 															className="text-destructive hover:text-destructive"
// 														>
// 															<Trash2 className="h-4 w-4" />
// 														</Button>
// 													</div>
// 												</div>
// 												<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Location
// 														</p>
// 														<p className="text-sm font-medium">
// 															{search.location}
// 														</p>
// 													</div>
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Price Range
// 														</p>
// 														<p className="text-sm font-medium">
// 															{search.priceRange}
// 														</p>
// 													</div>
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Bedrooms
// 														</p>
// 														<p className="text-sm font-medium">
// 															{search.bedrooms}
// 														</p>
// 													</div>
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Last Updated
// 														</p>
// 														<p className="text-sm font-medium">
// 															{new Date(
// 																search.lastNotified,
// 															).toLocaleDateString()}
// 														</p>
// 													</div>
// 												</div>
// 											</div>
// 										))}
// 									</div>
// 								) : (
// 									<div className="text-center py-6">
// 										<Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
// 										<h3 className="text-lg font-medium">
// 											No saved searches yet
// 										</h3>
// 										<p className="text-muted-foreground mt-1 mb-4">
// 											Save your search criteria to get notified when new
// 											properties match
// 										</p>
// 										<Button asChild>
// 											<Link href="/listings">Start Searching</Link>
// 										</Button>
// 									</div>
// 								)}
// 							</CardContent>
// 						</Card>

// 						{/* Favorite Listings */}
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>Favorite Listings</CardTitle>
// 								<CardDescription>
// 									Properties you've saved for future reference
// 								</CardDescription>
// 							</CardHeader>
// 							<CardContent>
// 								{userData.favoriteListings &&
// 								userData.favoriteListings.length > 0 ? (
// 									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 										{userData.favoriteListings.map((listing) => (
// 											<div
// 												key={listing.id}
// 												className="border rounded-lg overflow-hidden"
// 												onMouseEnter={() => setHighlightedProperty(listing.id)}
// 												onMouseLeave={() => setHighlightedProperty(null)}
// 											>
// 												<div className="flex flex-col sm:flex-row">
// 													<div className="relative sm:w-1/3 h-48 sm:h-auto">
// 														<Image
// 															src={listing.image || "/placeholder.svg"}
// 															alt={listing.title}
// 															fill
// 															className="object-cover"
// 														/>
// 													</div>
// 													<div className="flex-1 p-4 flex flex-col">
// 														<div className="flex justify-between items-start">
// 															<h3 className="font-medium">{listing.title}</h3>
// 															<Button
// 																variant="ghost"
// 																size="icon"
// 																onClick={() =>
// 																	handleRemoveFavoriteWithUserData(listing.id)
// 																}
// 																className="text-destructive hover:text-destructive h-8 w-8"
// 															>
// 																<Trash2 className="h-4 w-4" />
// 															</Button>
// 														</div>
// 														<p className="text-sm text-muted-foreground">
// 															{listing.address}
// 														</p>
// 														<div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
// 															<span className="flex items-center">
// 																<BedDouble className="h-4 w-4 mr-1" />
// 																{listing.beds} bd
// 															</span>
// 															<span className="flex items-center">
// 																<Bath className="h-4 w-4 mr-1" />
// 																{listing.baths} ba
// 															</span>
// 															<span className="flex items-center">
// 																<Square className="h-4 w-4 mr-1" />
// 																{listing.sqft.toLocaleString()} sqft
// 															</span>
// 														</div>
// 														<div className="mt-auto pt-2 flex justify-between items-center">
// 															<span className="font-bold text-primary">
// 																${listing.price}/mo
// 															</span>
// 															<Button variant="outline" size="sm" asChild>
// 																<Link href={`/listings/${listing.id}`}>
// 																	View Listing
// 																</Link>
// 															</Button>
// 														</div>
// 													</div>
// 												</div>
// 											</div>
// 										))}
// 									</div>
// 								) : (
// 									<div className="text-center py-6">
// 										<Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
// 										<h3 className="text-lg font-medium">
// 											No favorite listings yet
// 										</h3>
// 										<p className="text-muted-foreground mt-1 mb-4">
// 											Save properties you like to compare them later
// 										</p>
// 										<Button asChild>
// 											<Link href="/listings">Browse Listings</Link>
// 										</Button>
// 									</div>
// 								)}
// 							</CardContent>
// 						</Card>
// 						{userData.favoriteListings &&
// 							userData.favoriteListings.length > 0 && (
// 								<Card className="mt-6">
// 									<CardHeader>
// 										<CardTitle>Map View</CardTitle>
// 										<CardDescription>
// 											View your favorite properties on the map
// 										</CardDescription>
// 									</CardHeader>
// 									<CardContent>
// 										<GoogleMapComponent
// 											properties={getSavedSearchProperties()}
// 											height="400px"
// 											highlightedProperty={highlightedProperty}
// 										/>
// 									</CardContent>
// 								</Card>
// 							)}
// 					</TabsContent>
// 				)}

// 				{/* Applications Tab (for renters) */}
// 				{isRenter && (
// 					<TabsContent value="applications" className="space-y-6">
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>Rental Applications</CardTitle>
// 								<CardDescription>
// 									Track the status of your rental applications
// 								</CardDescription>
// 							</CardHeader>
// 							<CardContent>
// 								{userData.rentalApplications &&
// 								userData.rentalApplications.length > 0 ? (
// 									<div className="space-y-4">
// 										{userData.rentalApplications.map((application) => (
// 											<div
// 												key={application.id}
// 												className="border rounded-lg p-4"
// 											>
// 												<div className="flex flex-col md:flex-row justify-between md:items-center">
// 													<div>
// 														<h3 className="font-medium">
// 															{application.property}
// 														</h3>
// 														<p className="text-sm text-muted-foreground">
// 															{application.address}
// 														</p>
// 													</div>
// 													<Badge
// 														className={`mt-2 md:mt-0 w-fit ${
// 															application.status === "approved"
// 																? "bg-green-500"
// 																: application.status === "rejected"
// 																	? "bg-red-500"
// 																	: "bg-amber-500"
// 														}`}
// 													>
// 														{application.status === "approved"
// 															? "Approved"
// 															: application.status === "rejected"
// 																? "Rejected"
// 																: "Under Review"}
// 													</Badge>
// 												</div>
// 												<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Landlord
// 														</p>
// 														<p className="text-sm font-medium">
// 															{application.landlord}
// 														</p>
// 													</div>
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Submitted
// 														</p>
// 														<p className="text-sm font-medium">
// 															{new Date(
// 																application.submitted,
// 															).toLocaleDateString()}
// 														</p>
// 													</div>
// 													<div>
// 														<p className="text-xs text-muted-foreground">
// 															Next Steps
// 														</p>
// 														<p className="text-sm font-medium">
// 															{application.nextSteps}
// 														</p>
// 													</div>
// 												</div>
// 												<div className="mt-4 flex justify-end">
// 													<Button variant="outline" size="sm" asChild>
// 														<Link href={`/applications/${application.id}`}>
// 															View Details
// 														</Link>
// 													</Button>
// 												</div>
// 											</div>
// 										))}
// 									</div>
// 								) : (
// 									<div className="text-center py-6">
// 										<FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
// 										<h3 className="text-lg font-medium">No applications yet</h3>
// 										<p className="text-muted-foreground mt-1 mb-4">
// 											Apply for properties you're interested in renting
// 										</p>
// 										<Button asChild>
// 											<Link href="/listings">Browse Listings</Link>
// 										</Button>
// 									</div>
// 								)}
// 							</CardContent>
// 						</Card>
// 					</TabsContent>
// 				)}

// 				{/* Listings Tab (for landlords) */}
// 				{isLandlord && (
// 					<TabsContent value="listings" className="space-y-6">
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>Property Listings</CardTitle>
// 								<CardDescription>
// 									Manage your rental property listings
// 								</CardDescription>
// 							</CardHeader>
// 							<CardContent>
// 								<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
// 									<div>
// 										<h3 className="text-lg font-medium">Your Listings</h3>
// 										<p className="text-sm text-muted-foreground">
// 											You have 5 total listings (3 active, 2 inactive)
// 										</p>
// 									</div>
// 									<Button asChild>
// 										<Link href="/landlord/listings">Manage Listings</Link>
// 									</Button>
// 								</div>

// 								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// 									<div className="border rounded-lg p-4 flex flex-col">
// 										<div className="flex items-center justify-between">
// 											<div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
// 												<CheckCircle className="h-5 w-5 text-green-600" />
// 											</div>
// 											<Badge className="bg-green-500">Active</Badge>
// 										</div>
// 										<h3 className="font-medium mt-4">Active Listings</h3>
// 										<p className="text-3xl font-bold mt-2">3</p>
// 										<p className="text-sm text-muted-foreground mt-1">
// 											Currently visible to renters
// 										</p>
// 										<Button
// 											variant="outline"
// 											size="sm"
// 											className="mt-auto"
// 											asChild
// 										>
// 											<Link href="/landlord/listings?tab=active">
// 												View Active
// 											</Link>
// 										</Button>
// 									</div>

// 									<div className="border rounded-lg p-4 flex flex-col">
// 										<div className="flex items-center justify-between">
// 											<div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
// 												<Clock className="h-5 w-5 text-gray-600" />
// 											</div>
// 											<Badge variant="outline">Inactive</Badge>
// 										</div>
// 										<h3 className="font-medium mt-4">Inactive Listings</h3>
// 										<p className="text-3xl font-bold mt-2">2</p>
// 										<p className="text-sm text-muted-foreground mt-1">
// 											Hidden from search results
// 										</p>
// 										<Button
// 											variant="outline"
// 											size="sm"
// 											className="mt-auto"
// 											asChild
// 										>
// 											<Link href="/landlord/listings?tab=inactive">
// 												View Inactive
// 											</Link>
// 										</Button>
// 									</div>

// 									<div className="border rounded-lg p-4 flex flex-col">
// 										<div className="flex items-center justify-between">
// 											<div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
// 												<Plus className="h-5 w-5 text-blue-600" />
// 											</div>
// 										</div>
// 										<h3 className="font-medium mt-4">Add New Listing</h3>
// 										<p className="text-sm text-muted-foreground mt-1">
// 											Create a new property listing
// 										</p>
// 										<Button className="mt-auto" asChild>
// 											<Link href="/landlord/listings/create">
// 												Create Listing
// 											</Link>
// 										</Button>
// 									</div>
// 								</div>

// 								<div className="mt-6 border-t pt-6">
// 									<h3 className="text-lg font-medium mb-4">Recent Activity</h3>
// 									<div className="space-y-4">
// 										<div className="flex items-start gap-3">
// 											<div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
// 												<UserIcon className="h-4 w-4 text-blue-600" />
// 											</div>
// 											<div>
// 												<p className="text-sm">
// 													<span className="font-medium">New application</span>{" "}
// 													for Cozy 2 Bedroom Apartment
// 												</p>
// 												<p className="text-xs text-muted-foreground">
// 													2 hours ago
// 												</p>
// 											</div>
// 										</div>
// 										<div className="flex items-start gap-3">
// 											<div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
// 												<Eye className="h-4 w-4 text-green-600" />
// 											</div>
// 											<div>
// 												<p className="text-sm">
// 													<span className="font-medium">15 new views</span> on
// 													Modern 3 Bedroom House
// 												</p>
// 												<p className="text-xs text-muted-foreground">
// 													Yesterday
// 												</p>
// 											</div>
// 										</div>
// 										<div className="flex items-start gap-3">
// 											<div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
// 												<MessageSquare className="h-4 w-4 text-amber-600" />
// 											</div>
// 											<div>
// 												<p className="text-sm">
// 													<span className="font-medium">New message</span> about
// 													Downtown Studio Apartment
// 												</p>
// 												<p className="text-xs text-muted-foreground">
// 													2 days ago
// 												</p>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					</TabsContent>
// 				)}

// 				{/* Payments Tab (for landlords) */}
// 				{isLandlord && (
// 					<TabsContent value="payments" className="space-y-6">
// 						<Card>
// 							<CardHeader>
// 								<CardTitle>Payment Information</CardTitle>
// 								<CardDescription>
// 									Manage your payment methods and subscription
// 								</CardDescription>
// 							</CardHeader>
// 							<CardContent className="space-y-6">
// 								{/* Subscription Plan */}
// 								{userData.subscriptionPlan && (
// 									<div className="border rounded-lg p-6">
// 										<div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
// 											<div>
// 												<h3 className="text-lg font-medium">
// 													{userData.subscriptionPlan.name}
// 												</h3>
// 												<p className="text-sm text-muted-foreground">
// 													${userData.subscriptionPlan.price}/
// 													{userData.subscriptionPlan.billingCycle}
// 												</p>
// 											</div>
// 											<div className="flex gap-2">
// 												<Button variant="outline" size="sm">
// 													Change Plan
// 												</Button>
// 												<Button
// 													variant="outline"
// 													size="sm"
// 													className="text-destructive hover:text-destructive"
// 												>
// 													Cancel
// 												</Button>
// 											</div>
// 										</div>
// 										<div className="mt-4">
// 											<p className="text-sm text-muted-foreground">
// 												Next billing date:{" "}
// 												{new Date(
// 													userData.subscriptionPlan.nextBilling,
// 												).toLocaleDateString()}
// 											</p>
// 										</div>
// 										<div className="mt-4">
// 											<h4 className="text-sm font-medium mb-2">
// 												Plan Features
// 											</h4>
// 											<ul className="space-y-1">
// 												{userData.subscriptionPlan.features.map(
// 													(feature, index) => (
// 														<li
// 															// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
// 															key={index}
// 															className="text-sm flex items-center"
// 														>
// 															<CheckCircle className="h-4 w-4 text-green-600 mr-2" />
// 															{feature}
// 														</li>
// 													),
// 												)}
// 											</ul>
// 										</div>
// 									</div>
// 								)}

// 								{/* Payment Methods */}
// 								<div>
// 									<div className="flex justify-between items-center mb-4">
// 										<h3 className="text-lg font-medium">Payment Methods</h3>
// 										<Button variant="outline" size="sm">
// 											Add Payment Method
// 										</Button>
// 									</div>
// 									<div className="space-y-3">
// 										{userData.paymentMethods?.map((method) => (
// 											<div
// 												key={method.id}
// 												className="border rounded-lg p-4 flex justify-between items-center"
// 											>
// 												<div className="flex items-center">
// 													<div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
// 														<CreditCard className="h-5 w-5" />
// 													</div>
// 													<div className="ml-4">
// 														<p className="font-medium">
// 															{method.brand} •••• {method.last4}
// 															{method.isDefault && (
// 																<Badge
// 																	variant="outline"
// 																	className="ml-2 text-xs"
// 																>
// 																	Default
// 																</Badge>
// 															)}
// 														</p>
// 														<p className="text-sm text-muted-foreground">
// 															Expires {method.expiry}
// 														</p>
// 													</div>
// 												</div>
// 												<div className="flex gap-2">
// 													<Button variant="ghost" size="sm">
// 														Edit
// 													</Button>
// 													{!method.isDefault && (
// 														<Button
// 															variant="ghost"
// 															size="sm"
// 															className="text-destructive hover:text-destructive"
// 														>
// 															Remove
// 														</Button>
// 													)}
// 												</div>
// 											</div>
// 										))}
// 									</div>
// 								</div>

// 								{/* Billing History */}
// 								<div>
// 									<h3 className="text-lg font-medium mb-4">Billing History</h3>
// 									<div className="border rounded-lg overflow-hidden">
// 										<table className="w-full">
// 											<thead className="bg-muted">
// 												<tr>
// 													<th className="text-left p-3 text-sm font-medium">
// 														Date
// 													</th>
// 													<th className="text-left p-3 text-sm font-medium">
// 														Description
// 													</th>
// 													<th className="text-left p-3 text-sm font-medium">
// 														Amount
// 													</th>
// 													<th className="text-left p-3 text-sm font-medium">
// 														Status
// 													</th>
// 													<th className="text-left p-3 text-sm font-medium">
// 														Receipt
// 													</th>
// 												</tr>
// 											</thead>
// 											<tbody className="divide-y">
// 												<tr>
// 													<td className="p-3 text-sm">Nov 1, 2023</td>
// 													<td className="p-3 text-sm">
// 														Landlord Pro Subscription
// 													</td>
// 													<td className="p-3 text-sm">$29.99</td>
// 													<td className="p-3 text-sm">
// 														<Badge
// 															variant="outline"
// 															className="bg-green-50 text-green-700 border-green-200"
// 														>
// 															Paid
// 														</Badge>
// 													</td>
// 													<td className="p-3 text-sm">
// 														<Button
// 															variant="ghost"
// 															size="sm"
// 															className="h-8 flex items-center gap-1"
// 														>
// 															<ExternalLink className="h-3 w-3" />
// 															<span>View</span>
// 														</Button>
// 													</td>
// 												</tr>
// 												<tr>
// 													<td className="p-3 text-sm">Oct 1, 2023</td>
// 													<td className="p-3 text-sm">
// 														Landlord Pro Subscription
// 													</td>
// 													<td className="p-3 text-sm">$29.99</td>
// 													<td className="p-3 text-sm">
// 														<Badge
// 															variant="outline"
// 															className="bg-green-50 text-green-700 border-green-200"
// 														>
// 															Paid
// 														</Badge>
// 													</td>
// 													<td className="p-3 text-sm">
// 														<Button
// 															variant="ghost"
// 															size="sm"
// 															className="h-8 flex items-center gap-1"
// 														>
// 															<ExternalLink className="h-3 w-3" />
// 															<span>View</span>
// 														</Button>
// 													</td>
// 												</tr>
// 												<tr>
// 													<td className="p-3 text-sm">Sep 1, 2023</td>
// 													<td className="p-3 text-sm">
// 														Landlord Pro Subscription
// 													</td>
// 													<td className="p-3 text-sm">$29.99</td>
// 													<td className="p-3 text-sm">
// 														<Badge
// 															variant="outline"
// 															className="bg-green-50 text-green-700 border-green-200"
// 														>
// 															Paid
// 														</Badge>
// 													</td>
// 													<td className="p-3 text-sm">
// 														<Button
// 															variant="ghost"
// 															size="sm"
// 															className="h-8 flex items-center gap-1"
// 														>
// 															<ExternalLink className="h-3 w-3" />
// 															<span>View</span>
// 														</Button>
// 													</td>
// 												</tr>
// 											</tbody>
// 										</table>
// 									</div>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					</TabsContent>
// 				)}

// 				{/* Settings Tab */}
// 				<TabsContent value="settings" className="space-y-6">
// 					{/* Notification Settings */}
// 					<Card>
// 						<CardHeader>
// 							<CardTitle>Notification Settings</CardTitle>
// 							<CardDescription>
// 								Manage how and when you receive notifications
// 							</CardDescription>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="space-y-6">
// 								<div>
// 									<h3 className="text-lg font-medium mb-4">
// 										Email Notifications
// 									</h3>
// 									<div className="space-y-3">
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="email-new-listings">New Listings</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive emails when new properties match your saved
// 													searches
// 												</p>
// 											</div>
// 											<Switch
// 												id="email-new-listings"
// 												checked={
// 													userData.preferences?.emailNotifications
// 														?.newListings || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"newListings",
// 														"email",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="email-application-updates">
// 													Application Updates
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive emails when there are updates to your rental
// 													applications
// 												</p>
// 											</div>
// 											<Switch
// 												id="email-application-updates"
// 												checked={
// 													userData.preferences?.emailNotifications
// 														?.applicationUpdates || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"applicationUpdates",
// 														"email",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="email-message-alerts">
// 													Message Alerts
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive emails when you get new messages
// 												</p>
// 											</div>
// 											<Switch
// 												id="email-message-alerts"
// 												checked={
// 													userData.preferences?.emailNotifications
// 														?.messageAlerts || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"messageAlerts",
// 														"email",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="email-promotions">
// 													Promotions & Updates
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive emails about promotions, new features, and
// 													platform updates
// 												</p>
// 											</div>
// 											<Switch
// 												id="email-promotions"
// 												checked={
// 													userData.preferences?.emailNotifications
// 														?.promotions || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"promotions",
// 														"email",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 									</div>
// 								</div>

// 								<div className="border-t pt-6">
// 									<h3 className="text-lg font-medium mb-4">
// 										Push Notifications
// 									</h3>
// 									<div className="space-y-3">
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="push-new-listings">New Listings</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive push notifications when new properties match
// 													your saved searches
// 												</p>
// 											</div>
// 											<Switch
// 												id="push-new-listings"
// 												checked={
// 													userData.preferences?.pushNotifications
// 														?.newListings || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"newListings",
// 														"push",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="push-application-updates">
// 													Application Updates
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive push notifications when there are updates to
// 													your rental applications
// 												</p>
// 											</div>
// 											<Switch
// 												id="push-application-updates"
// 												checked={
// 													userData.preferences?.pushNotifications
// 														?.applicationUpdates || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"applicationUpdates",
// 														"push",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="push-message-alerts">
// 													Message Alerts
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive push notifications when you get new messages
// 												</p>
// 											</div>
// 											<Switch
// 												id="push-message-alerts"
// 												checked={
// 													userData.preferences?.pushNotifications
// 														?.messageAlerts || false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"messageAlerts",
// 														"push",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 										<div className="flex items-center justify-between">
// 											<div className="space-y-0.5">
// 												<Label htmlFor="push-promotions">
// 													Promotions & Updates
// 												</Label>
// 												<p className="text-sm text-muted-foreground">
// 													Receive push notifications about promotions, new
// 													features, and platform updates
// 												</p>
// 											</div>
// 											<Switch
// 												id="push-promotions"
// 												checked={
// 													userData.preferences?.pushNotifications?.promotions ||
// 													false
// 												}
// 												onCheckedChange={(checked) =>
// 													handleToggleNotificationWithUserData(
// 														"promotions",
// 														"push",
// 														checked,
// 													)
// 												}
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</CardContent>
// 					</Card>

// 					{/* Security Settings */}
// 					<Card>
// 						<CardHeader>
// 							<CardTitle>Security Settings</CardTitle>
// 							<CardDescription>
// 								Manage your account security and privacy
// 							</CardDescription>
// 						</CardHeader>
// 						<CardContent className="space-y-6">
// 							<div>
// 								<h3 className="text-lg font-medium mb-4">Password</h3>
// 								<div className="space-y-4">
// 									<div className="grid gap-2">
// 										<Label htmlFor="current-password">Current Password</Label>
// 										<Input id="current-password" type="password" />
// 									</div>
// 									<div className="grid gap-2">
// 										<Label htmlFor="new-password">New Password</Label>
// 										<Input id="new-password" type="password" />
// 									</div>
// 									<div className="grid gap-2">
// 										<Label htmlFor="confirm-password">
// 											Confirm New Password
// 										</Label>
// 										<Input id="confirm-password" type="password" />
// 									</div>
// 									<Button>Update Password</Button>
// 								</div>
// 							</div>

// 							<div className="border-t pt-6">
// 								<h3 className="text-lg font-medium mb-4">
// 									Two-Factor Authentication
// 								</h3>
// 								<div className="flex items-center justify-between">
// 									<div className="space-y-0.5">
// 										<Label>Enable Two-Factor Authentication</Label>
// 										<p className="text-sm text-muted-foreground">
// 											Add an extra layer of security to your account
// 										</p>
// 									</div>
// 									<Button variant="outline">Set Up</Button>
// 								</div>
// 							</div>

// 							<div className="border-t pt-6">
// 								<h3 className="text-lg font-medium mb-4">Account Actions</h3>
// 								<div className="space-y-4">
// 									<div className="flex items-center justify-between">
// 										<div className="space-y-0.5">
// 											<Label>Download Your Data</Label>
// 											<p className="text-sm text-muted-foreground">
// 												Get a copy of your personal data
// 											</p>
// 										</div>
// 										<Button variant="outline">Request Data</Button>
// 									</div>
// 									<div className="flex items-center justify-between">
// 										<div className="space-y-0.5">
// 											<Label>Delete Account</Label>
// 											<p className="text-sm text-muted-foreground">
// 												Permanently delete your account and all data
// 											</p>
// 										</div>
// 										<Button variant="destructive">Delete Account</Button>
// 									</div>
// 								</div>
// 							</div>
// 						</CardContent>
// 					</Card>

// 					{/* Notification Demo */}
// 					<NotificationDemo />
// 				</TabsContent>
// 			</Tabs>

// 			{/* Logout button */}
// 			<div className="flex justify-end">
// 				<Button
// 					variant="outline"
// 					className="flex items-center gap-1"
// 					onClick={logout}
// 				>
// 					<LogOut className="h-4 w-4" />
// 					<span>Log Out</span>
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

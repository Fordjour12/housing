"use client";

import { useState } from "react";
import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	User,
	Briefcase,
	Home,
	DollarSign,
	Calendar,
	BellRing,
} from "lucide-react";

// Define more specific types for our form data
interface FormData {
	name: string;
	phone: string;
	occupation: string;
	moveInDate: string;
	budget: {
		min: number;
		max: number;
	};
	bedrooms: number[];
	propertyTypes: string[];
	amenities: string[];
	petFriendly: boolean;
	notifications: {
		email: boolean;
		push: boolean;
		newListings: boolean;
		applicationUpdates: boolean;
	};
}

type FormDataKey = keyof FormData;

export default function RenterSetup() {
	const { onboardingState, updateOnboardingState, completeOnboarding } =
		useUser();
	const profile = onboardingState?.profile || {};
	const preferences = onboardingState?.preferences || {};

	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		// Profile
		name: (profile.name as string) || "",
		phone: (profile.phone as string) || "",
		occupation: (profile.occupation as string) || "",
		moveInDate: (profile.moveInDate as string) || "",

		// Preferences
		budget: {
			min: Number(preferences.budgetMin) || 500,
			max: Number(preferences.budgetMax) || 2500,
		},
		bedrooms: Array.isArray(preferences.bedrooms)
			? (preferences.bedrooms as number[])
			: [],
		propertyTypes: Array.isArray(preferences.propertyTypes)
			? (preferences.propertyTypes as string[])
			: [],
		amenities: Array.isArray(preferences.amenities)
			? (preferences.amenities as string[])
			: [],
		petFriendly: Boolean(preferences.petFriendly) || false,
		notifications: {
			email: preferences.emailNotifications !== false,
			push: Boolean(preferences.pushNotifications) || false,
			newListings: preferences.newListingNotifications !== false,
			applicationUpdates: preferences.applicationUpdates !== false,
		},
	});

	const handleInputChange = <K extends FormDataKey>(
		field: K,
		value: FormData[K],
	) => {
		setFormData({
			...formData,
			[field]: value,
		});
	};

	const handleBack = () => {
		if (step === 1) {
			updateOnboardingState({ step: 2 }); // Go back to role selection
		} else {
			setStep(step - 1);
		}
	};

	const handleContinue = () => {
		if (step < 3) {
			setStep(step + 1);
		} else {
			finishSetup();
		}
	};

	const finishSetup = async () => {
		// Transform formData into onboarding state shape
		const updatedProfile = {
			name: formData.name,
			phone: formData.phone,
			occupation: formData.occupation,
			moveInDate: formData.moveInDate,
		};

		const updatedPreferences = {
			budgetMin: formData.budget.min,
			budgetMax: formData.budget.max,
			bedrooms: formData.bedrooms,
			propertyTypes: formData.propertyTypes,
			amenities: formData.amenities,
			petFriendly: formData.petFriendly,
			emailNotifications: formData.notifications.email,
			pushNotifications: formData.notifications.push,
			newListingNotifications: formData.notifications.newListings,
			applicationUpdates: formData.notifications.applicationUpdates,
		};

		// Make sure to keep the role that was selected in the previous step
		await updateOnboardingState({
			profile: updatedProfile,
			preferences: updatedPreferences,
			role: onboardingState?.role, // Preserve the role from previous onboarding step
		});

		await completeOnboarding();
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">
					{step === 1 && "Personal Details"}
					{step === 2 && "Housing Preferences"}
					{step === 3 && "Notifications & Settings"}
				</h1>
				<div className="flex space-x-1">
					<div
						className={`h-2 w-10 rounded-full ${step >= 1 ? "bg-primary" : "bg-gray-200"}`}
					/>
					<div
						className={`h-2 w-10 rounded-full ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}
					/>
					<div
						className={`h-2 w-10 rounded-full ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}
					/>
				</div>
			</div>

			{/* Step 1: Profile Information */}
			{step === 1 && (
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<User className="mr-2 h-5 w-5" />
								Basic Information
							</CardTitle>
							<CardDescription>
								Tell us a bit about yourself to help find suitable properties.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">Full Name</Label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										placeholder="Your full name"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input
										id="phone"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
										placeholder="Your phone number"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="occupation">Occupation</Label>
									<div className="flex items-center">
										<Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
										<Input
											id="occupation"
											value={formData.occupation}
											onChange={(e) =>
												handleInputChange("occupation", e.target.value)
											}
											placeholder="Your occupation"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="moveInDate">Desired Move-in Date</Label>
									<div className="flex items-center">
										<Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
										<Input
											id="moveInDate"
											type="date"
											value={formData.moveInDate}
											onChange={(e) =>
												handleInputChange("moveInDate", e.target.value)
											}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Step 2: Housing Preferences */}
			{step === 2 && (
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<Home className="mr-2 h-5 w-5" />
								Housing Preferences
							</CardTitle>
							<CardDescription>
								Customize your search criteria to find the perfect home.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<Label className="flex items-center">
									<DollarSign className="mr-2 h-4 w-4" />
									Budget Range (per month)
								</Label>
								<div className="flex items-center space-x-4">
									<div>
										<Label className="text-sm text-muted-foreground">
											Min: ${formData.budget.min.toString()}
										</Label>
									</div>
									<Slider
										className="flex-1"
										value={[formData.budget.min, formData.budget.max]}
										min={500}
										max={5000}
										step={100}
										onValueChange={(value) =>
											handleInputChange("budget", {
												min: value[0],
												max: value[1],
											})
										}
									/>
									<div>
										<Label className="text-sm text-muted-foreground">
											Max: ${formData.budget.max.toString()}
										</Label>
									</div>
								</div>
							</div>

							<div className="space-y-3">
								<Label>Number of Bedrooms</Label>
								<div className="flex flex-wrap gap-2">
									{[0, 1, 2, 3, 4, 5].map((num) => (
										<Button
											key={num}
											type="button"
											variant={
												formData.bedrooms.includes(num) ? "default" : "outline"
											}
											className="h-10 px-3"
											onClick={() => {
												const newBedrooms = formData.bedrooms.includes(num)
													? formData.bedrooms.filter((b) => b !== num)
													: [...formData.bedrooms, num];
												handleInputChange("bedrooms", newBedrooms);
											}}
										>
											{num === 0
												? "Studio"
												: `${num} ${num === 1 ? "Bedroom" : "Bedrooms"}`}
										</Button>
									))}
								</div>
							</div>

							<div className="space-y-3">
								<Label>Property Type</Label>
								<div className="flex flex-wrap gap-2">
									{["apartment", "house", "condo", "townhouse"].map((type) => (
										<Button
											key={type}
											type="button"
											variant={
												formData.propertyTypes.includes(type)
													? "default"
													: "outline"
											}
											className="h-10"
											onClick={() => {
												const newTypes = formData.propertyTypes.includes(type)
													? formData.propertyTypes.filter((t) => t !== type)
													: [...formData.propertyTypes, type];
												handleInputChange("propertyTypes", newTypes);
											}}
										>
											{type.charAt(0).toUpperCase() + type.slice(1)}
										</Button>
									))}
								</div>
							</div>

							<div className="flex items-center space-x-2">
								<Switch
									checked={formData.petFriendly}
									onCheckedChange={(checked) =>
										handleInputChange("petFriendly", checked)
									}
								/>
								<Label>Pet Friendly</Label>
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Step 3: Notifications & Settings */}
			{step === 3 && (
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<BellRing className="mr-2 h-5 w-5" />
								Notifications & Settings
							</CardTitle>
							<CardDescription>
								Choose how you want to receive updates about properties and
								applications.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label className="text-base">Notification Methods</Label>
								<div className="flex flex-col space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox
											checked={formData.notifications.email}
											onCheckedChange={(checked) =>
												handleInputChange("notifications", {
													...formData.notifications,
													email: !!checked,
												})
											}
										/>
										<Label>Email Notifications</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox
											checked={formData.notifications.push}
											onCheckedChange={(checked) =>
												handleInputChange("notifications", {
													...formData.notifications,
													push: !!checked,
												})
											}
										/>
										<Label>Push Notifications</Label>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<Label className="text-base">Notification Types</Label>
								<div className="flex flex-col space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox
											checked={formData.notifications.newListings}
											onCheckedChange={(checked) =>
												handleInputChange("notifications", {
													...formData.notifications,
													newListings: !!checked,
												})
											}
										/>
										<Label>New Listings that Match Your Criteria</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox
											checked={formData.notifications.applicationUpdates}
											onCheckedChange={(checked) =>
												handleInputChange("notifications", {
													...formData.notifications,
													applicationUpdates: !!checked,
												})
											}
										/>
										<Label>Application Status Updates</Label>
									</div>
								</div>
							</div>

							<div className="pt-4">
								<p className="text-sm text-muted-foreground">
									You can always update these settings later from your profile
									preferences.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			<div className="flex justify-between mt-8">
				<Button variant="outline" onClick={handleBack}>
					{step === 1 ? "Back to Role Selection" : "Back"}
				</Button>
				<Button
					onClick={handleContinue}
					disabled={step === 1 && !formData.name}
				>
					{step === 3 ? "Complete Setup" : "Continue"}
				</Button>
			</div>
		</div>
	);
}

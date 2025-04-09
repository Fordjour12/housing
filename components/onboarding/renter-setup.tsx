"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// Removed unused Label import
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
	BellRing,
	Briefcase,
	Calendar,
	DollarSign,
	Home,
	User,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; // Using framer-motion is more standard than motion/react
import { useState } from "react";
// Removed unused useRouter import
import { z } from "zod";
import { useForm, type FieldPath } from "react-hook-form"; // Import FieldPath
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	// Removed unused FormDescription import
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { completeRenterOnboarding } from "@/actions/server/onboarding";

// Define more specific types for our form data (kept for potential future use, but not strictly necessary with Zod inference)
// interface FormData { ... }

// Removed unused FormDataKey
// Removed unused ArrayRentalSteps

// Constants for options
const BEDROOM_OPTIONS = [
	{ label: "1", value: 1 },
	{ label: "2", value: 2 },
	{ label: "3", value: 3 },
	{ label: "4", value: 4 },
	{ label: "5", value: 5 },
	{ label: "5+", value: 6 }, // Assuming 6 represents 5+
];

const PROPERTY_TYPES = ["Apartment", "House", "Condo", "Townhouse"];

const AMENITIES = [
	"Parking",
	"Laundry",
	"Gym",
	"Pool",
	"Pet Friendly",
	"Furnished",
];

// Form schema
const renterFormSchema = z.object({
	profile: z.object({
		name: z.string().min(2, "Name must be at least 2 characters."),
		phone: z.string().min(10, "Please enter a valid 10-digit phone number."), // Added length constraint clarity
		occupation: z.string().min(2, "Occupation must be at least 2 characters."),
		moveInDate: z.string().min(1, "Please select a desired move-in date."), // Improved message clarity
	}),
	preferences: z.object({
		budget: z
			.object({
				min: z.number().min(500, "Minimum budget must be at least $500."),
				max: z.number().max(5000, "Maximum budget cannot exceed $5000."),
			})
			.refine((data) => data.min <= data.max, {
				// Ensure min <= max
				message: "Minimum budget cannot be greater than maximum budget.",
				path: ["min"], // Error applies to the min field or the range concept
			}),
		bedrooms: z
			.array(z.number())
			.min(1, "Please select at least one bedroom option."),
		propertyTypes: z
			.array(z.string())
			.min(1, "Please select at least one property type."),
		amenities: z.array(z.string()), // Assuming amenities are optional
		petFriendly: z.boolean(),
	}),
	notifications: z.object({
		email: z.boolean(),
		push: z.boolean(),
		newListings: z.boolean(),
		applicationUpdates: z.boolean(),
	}),
});

type RenterFormValues = z.infer<typeof renterFormSchema>;

interface RenterSetupProps {
	onCompleteAction: () => void;
	onBackAction: () => void;
}

export default function RenterSetup({
	onCompleteAction,
	onBackAction,
}: RenterSetupProps) {
	// Removed unused router
	const [step, setStep] = useState(1);

	const form = useForm<RenterFormValues>({
		resolver: zodResolver(renterFormSchema),
		defaultValues: {
			profile: {
				name: "",
				phone: "",
				occupation: "",
				moveInDate: "",
			},
			preferences: {
				budget: {
					min: 1000, // Adjusted default min
					max: 2500,
				},
				bedrooms: [],
				propertyTypes: [],
				amenities: [],
				petFriendly: false,
			},
			notifications: {
				email: true,
				push: false,
				newListings: true,
				applicationUpdates: true,
			},
		},
		mode: "onTouched", // Changed mode to 'onTouched' for better UX than 'onChange'
	});

	// Use react-hook-form's trigger for step validation
	const handleStepContinue = async () => {
		let sectionToValidate: "profile" | "preferences" | null = null;

		if (step === 1) {
			sectionToValidate = "profile";
		} else if (step === 2) {
			sectionToValidate = "preferences";
		}

		if (sectionToValidate) {
			const isValid = await form.trigger(sectionToValidate);
			if (isValid) {
				setStep((prevStep) => prevStep + 1);
			}
		}
	};

	const handleBack = () => {
		if (step === 1) {
			onBackAction(); // Call the provided back action if on the first step
		} else {
			setStep((prevStep) => prevStep - 1);
		}
	};

	const onSubmit = async (data: RenterFormValues) => {
		// Submission should only happen on step 3
		if (step < 3) {
			console.warn(
				"Form submission attempted before final step - preventing submission.",
			);
			// Stop the submission and just move to the next step if validation passes
			if (step === 1) {
				const isValid = await form.trigger("profile");
				if (isValid) setStep(step + 1);
			} else if (step === 2) {
				const isValid = await form.trigger("preferences");
				if (isValid) setStep(step + 1);
			}
			return;
		}

		try {
			const result = await completeRenterOnboarding(data);

			if (result.error) {
				if (result.details && Array.isArray(result.details)) {
					// Handle Zod validation errors from server
					for (const error of result.details) {
						// Ensure path is an array and elements are string or number before joining
						if (
							Array.isArray(error.path) &&
							error.path.length > 0 &&
							error.path.every(
								(p) => typeof p === "string" || typeof p === "number",
							)
						) {
							const pathString = error.path.join(".");
							// Use type assertion carefully, assuming server paths match form paths
							form.setError(pathString as FieldPath<RenterFormValues>, {
								type: "server",
								message: error.message,
							});
						} else {
							// Fallback for unexpected error format
							console.warn(
								"Received server error detail with invalid path:",
								error,
							);
							form.setError("root.serverError", {
								// Use a specific root error key
								type: "server",
								message:
									error.message || "An unknown validation error occurred.",
							});
						}
					}
				} else {
					// Handle other non-Zod string errors
					form.setError("root.serverError", {
						type: "server",
						message: result.error,
					});
				}
				return; // Stop execution if there was an error
			}

			// Only call onCompleteAction after successful server action
			onCompleteAction();
		} catch (error) {
			console.error("Error completing renter setup:", error);
			form.setError("root.serverError", {
				type: "manual", // Or "server" if it's definitively server-side
				message: "An unexpected error occurred. Please try again.",
			});
		}
	};

	// Helper function to render step titles
	const renderStepTitle = () => {
		switch (step) {
			case 1:
				return "Personal Details";
			case 2:
				return "Housing Preferences";
			case 3:
				return "Notifications & Settings";
			default:
				return "";
		}
	};

	return (
		<div className="flex flex-col justify-center items-center min-h-screen p-4 md:p-6">
			<div className="max-w-2xl w-full mx-auto">
				{" "}
				{/* Removed p-6, added to parent */}
				<div className="flex justify-between items-center mb-6">
					<AnimatePresence mode="wait" initial={false}>
						<motion.h1
							key={`title-${step}`}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							transition={{ duration: 0.2 }}
							className="text-2xl font-bold"
						>
							{renderStepTitle()}
						</motion.h1>
					</AnimatePresence>
					{/* Progress indicator */}
					<div className="flex items-center space-x-2">
						{[1, 2, 3].map((s) => (
							<div
								key={s}
								className={`h-2 w-8 rounded-full transition-colors duration-300 ${
									s <= step ? "bg-primary" : "bg-muted"
								}`}
								aria-label={`Step ${s} ${s <= step ? "complete" : "pending"}`}
							/>
						))}
					</div>
				</div>
				<Form {...form}>
					{/* Display root server errors */}
					{form.formState.errors.root?.serverError && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mb-4 p-3 bg-destructive/10 border border-destructive/50 text-destructive rounded-md text-sm"
						>
							{form.formState.errors.root.serverError.message}
						</motion.div>
					)}
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{" "}
						{/* Increased space */}
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={step}
								initial={{ opacity: 0, x: 30 }} // Simplified animation
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -30 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								{/* Step 1: Profile Information */}
								{step === 1 && (
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center">
												<User className="mr-2 h-5 w-5 flex-shrink-0" />
												Basic Information
											</CardTitle>
											<CardDescription>
												Tell us a bit about yourself.
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<FormField
													control={form.control}
													name="profile.name"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Full Name</FormLabel>
															<FormControl>
																<Input
																	{...field}
																	placeholder="e.g., Jane Doe"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="profile.phone"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Phone Number</FormLabel>
															<FormControl>
																<Input
																	type="tel"
																	{...field}
																	placeholder="e.g., 555-123-4567"
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>

											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<FormField
													control={form.control}
													name="profile.occupation"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Occupation</FormLabel>
															<FormControl>
																<div className="relative flex items-center">
																	<Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
																	<Input
																		{...field}
																		placeholder="e.g., Software Engineer"
																		className="pl-10"
																	/>
																</div>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="profile.moveInDate"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Desired Move-in Date</FormLabel>
															<FormControl>
																<div className="relative flex items-center">
																	<Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
																	<Input
																		{...field}
																		type="date"
																		className="pl-10"
																	/>
																</div>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										</CardContent>
									</Card>
								)}

								{/* Step 2: Housing Preferences */}
								{step === 2 && (
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center">
												<Home className="mr-2 h-5 w-5 flex-shrink-0" />
												Housing Preferences
											</CardTitle>
											<CardDescription>
												Specify what you're looking for.
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-6">
											<FormField
												control={form.control}
												name="preferences.budget"
												render={({
													field: { value, onChange, ...fieldProps },
												}) => (
													<FormItem className="space-y-4">
														<div className="flex items-center justify-between">
															<FormLabel>Monthly Budget Range</FormLabel>
															<div className="text-sm font-medium text-foreground">
																${value.min} - ${value.max}
															</div>
														</div>
														<FormControl>
															<div className="pt-6 px-2 flex gap-3">
																<DollarSign className="h-4 w-4 text-muted-foreground" />
																<Slider
																	{...fieldProps}
																	min={500}
																	max={5000}
																	step={100}
																	value={[value.min, value.max]}
																	onValueChange={(newValue) =>
																		onChange({
																			min: newValue[0],
																			max: newValue[1],
																		})
																	}
																/>
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="preferences.bedrooms"
												render={({ field }) => (
													<FormItem className="space-y-3">
														<FormLabel>Number of Bedrooms</FormLabel>
														<FormControl>
															<div className="flex flex-wrap gap-2">
																{BEDROOM_OPTIONS.map((option) => (
																	<Button
																		key={option.value}
																		type="button"
																		variant={
																			field.value.includes(option.value)
																				? "default"
																				: "outline"
																		}
																		className="flex-1 min-w-[60px]"
																		onClick={() => {
																			const currentSelection = field.value;
																			const newValue =
																				currentSelection.includes(option.value)
																					? currentSelection.filter(
																							(v) => v !== option.value,
																						)
																					: [...currentSelection, option.value];
																			field.onChange(
																				newValue.sort((a, b) => a - b),
																			);
																		}}
																	>
																		{option.label}
																	</Button>
																))}
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="preferences.propertyTypes"
												render={({ field }) => (
													<FormItem className="space-y-3">
														<FormLabel>Property Types</FormLabel>
														<FormControl>
															<div className="grid grid-cols-2 gap-2">
																{PROPERTY_TYPES.map((type) => (
																	<Button
																		key={type}
																		type="button"
																		variant={
																			field.value.includes(type)
																				? "default"
																				: "outline"
																		}
																		onClick={() => {
																			const currentSelection = field.value;
																			const newValue =
																				currentSelection.includes(type)
																					? currentSelection.filter(
																							(t) => t !== type,
																						)
																					: [...currentSelection, type];
																			field.onChange(newValue);
																		}}
																	>
																		{type}
																	</Button>
																))}
															</div>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="preferences.amenities"
												render={({ field }) => (
													<FormItem className="space-y-3">
														<FormLabel>Desired Amenities (Optional)</FormLabel>
														<FormControl>
															<div className="grid grid-cols-2 gap-2">
																{AMENITIES.map((amenity) => (
																	<Button
																		key={amenity}
																		type="button"
																		variant={
																			field.value.includes(amenity)
																				? "default"
																				: "outline"
																		}
																		onClick={() => {
																			const currentSelection = field.value;
																			const newValue =
																				currentSelection.includes(amenity)
																					? currentSelection.filter(
																							(a) => a !== amenity,
																						)
																					: [...currentSelection, amenity];
																			field.onChange(newValue);
																		}}
																	>
																		{amenity}
																	</Button>
																))}
															</div>
														</FormControl>
														{/* No FormMessage needed if field is optional and has no specific validation */}
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="preferences.petFriendly"
												render={({ field }) => (
													// Improved layout for switch
													<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
														<div className="space-y-0.5">
															<FormLabel>Require Pet Friendly?</FormLabel>
															<FormDescription>
																Filter for properties that allow pets.
															</FormDescription>
														</div>
														<FormControl>
															<Switch
																checked={field.value}
																onCheckedChange={field.onChange}
																aria-label="Require Pet Friendly Properties"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</CardContent>
									</Card>
								)}

								{/* Step 3: Notifications */}
								{step === 3 && (
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center">
												<BellRing className="mr-2 h-5 w-5 flex-shrink-0" />
												Notification Preferences
											</CardTitle>
											<CardDescription>
												Choose how you'd like to receive updates.
											</CardDescription>
										</CardHeader>
										<CardContent className="space-y-6">
											{/* Grouped Switches */}
											<div className="space-y-4">
												<FormLabel>Notification Methods</FormLabel>
												<FormField
													control={form.control}
													name="notifications.email"
													render={({ field }) => (
														<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
															<FormLabel className="flex-1 pr-4">
																Email Notifications
															</FormLabel>
															<FormControl>
																<Switch
																	checked={field.value}
																	onCheckedChange={field.onChange}
																	aria-label="Enable Email Notifications"
																/>
															</FormControl>
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name="notifications.push"
													render={({ field }) => (
														<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
															<FormLabel className="flex-1 pr-4">
																Push Notifications
															</FormLabel>
															<FormControl>
																<Switch
																	checked={field.value}
																	onCheckedChange={field.onChange}
																	aria-label="Enable Push Notifications"
																/>
															</FormControl>
														</FormItem>
													)}
												/>
											</div>

											{/* Grouped Checkboxes */}
											<div className="space-y-4">
												<FormLabel>What to be notified about?</FormLabel>
												<div className="space-y-2">
													<FormField
														control={form.control}
														name="notifications.newListings"
														render={({ field }) => (
															<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
																<FormControl>
																	<Checkbox
																		checked={field.value}
																		onCheckedChange={field.onChange}
																		id="newListings"
																	/>
																</FormControl>
																<div className="space-y-1 leading-none">
																	<FormLabel htmlFor="newListings">
																		New Property Listings
																	</FormLabel>
																	<FormDescription>
																		Receive alerts when new matching properties
																		are listed.
																	</FormDescription>
																</div>
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name="notifications.applicationUpdates"
														render={({ field }) => (
															<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
																<FormControl>
																	<Checkbox
																		checked={field.value}
																		onCheckedChange={field.onChange}
																		id="appUpdates"
																	/>
																</FormControl>
																<div className="space-y-1 leading-none">
																	<FormLabel htmlFor="appUpdates">
																		Application Status Updates
																	</FormLabel>
																	<FormDescription>
																		Get notified about changes to your rental
																		applications.
																	</FormDescription>
																</div>
															</FormItem>
														)}
													/>
												</div>
											</div>
										</CardContent>
									</Card>
								)}
							</motion.div>
						</AnimatePresence>
						<div className="flex justify-between mt-8">
							{" "}
							{/* Increased margin top */}
							<Button
								type="button"
								variant="outline"
								onClick={handleBack}
								disabled={form.formState.isSubmitting}
							>
								{step === 1 ? "Back to Role" : "Back"}{" "}
								{/* More specific label */}
							</Button>
							{step < 3 ? (
								<Button
									type="button"
									onClick={(e) => {
										e.preventDefault();
										handleStepContinue();
									}}
									disabled={form.formState.isSubmitting}
								>
									Continue
								</Button>
							) : (
								<Button
									type="submit"
									disabled={
										form.formState.isSubmitting || !form.formState.isValid
									}
								>
									{form.formState.isSubmitting ? "Saving..." : "Complete Setup"}
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
}

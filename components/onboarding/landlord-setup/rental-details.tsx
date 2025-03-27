"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Define form schema with Zod
const rentalFormSchema = z.object({
	rentAmount: z.string().min(1, { message: "Rent amount is required" }),
	securityDeposit: z
		.string()
		.min(1, { message: "Security deposit is required" }),
	leaseDurations: z
		.array(z.string())
		.min(1, { message: "Select at least one lease duration" }),
	availabilityDate: z.date({ required_error: "Availability date is required" }),
	description: z.string().optional(),
	amenities: z.array(z.string()),
	petPolicy: z.string({ required_error: "Pet policy is required" }),
	petRestrictions: z.string().optional(),
	utilitiesIncluded: z.array(z.string()),
});

type RentalFormValues = z.infer<typeof rentalFormSchema>;

interface RentalDetailsProps {
	onNext: (data: RentalFormValues) => void;
	onBack: () => void;
	initialData: Partial<RentalFormValues>;
}

export default function RentalDetails({
	onNext,
	onBack,
	initialData = {},
}: RentalDetailsProps) {
	// Define lease duration options
	const leaseDurationOptions = [
		{ id: "month-to-month", label: "Month-to-Month" },
		{ id: "6-months", label: "6 Months" },
		{ id: "1-year", label: "1 Year" },
		{ id: "other", label: "Other (specify)" },
	];

	// Define amenities options
	const amenitiesOptions = [
		{ id: "laundry", label: "In-unit Laundry" },
		{ id: "parking", label: "Parking" },
		{ id: "pet-friendly", label: "Pet-Friendly" },
		{ id: "ac", label: "Air Conditioning" },
		{ id: "dishwasher", label: "Dishwasher" },
		{ id: "balcony", label: "Balcony/Patio" },
		{ id: "pool", label: "Swimming Pool" },
		{ id: "gym", label: "Gym" },
		{ id: "elevator", label: "Elevator" },
		{ id: "wheelchair", label: "Wheelchair Access" },
	];

	// Define utilities options
	const utilitiesOptions = [
		{ id: "water", label: "Water" },
		{ id: "electricity", label: "Electricity" },
		{ id: "gas", label: "Gas" },
		{ id: "trash", label: "Trash" },
		{ id: "internet", label: "Internet" },
	];

	// Initialize the form with default values
	const form = useForm<RentalFormValues>({
		resolver: zodResolver(rentalFormSchema),
		defaultValues: {
			rentAmount: initialData.rentAmount || "",
			securityDeposit: initialData.securityDeposit || "",
			leaseDurations: initialData.leaseDurations || [],
			availabilityDate: initialData.availabilityDate || new Date(),
			description: initialData.description || "",
			amenities: initialData.amenities || [],
			petPolicy: initialData.petPolicy || "",
			petRestrictions: initialData.petRestrictions || "",
			utilitiesIncluded: initialData.utilitiesIncluded || [],
		},
	});

	// Watch pet policy to determine if restrictions field should be shown
	const petPolicy = form.watch("petPolicy");

	// Form submission handler
	function onSubmit(data: RentalFormValues) {
		onNext(data);
	}

	return (
		<Card className="max-w-2xl mx-auto p-8">
			<div className="mb-6">
				<h2 className="text-2xl font-bold">Set Your Rental Details</h2>
				<p className="text-gray-500">
					Provide information about rental terms and property features.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Rent and Security Deposit on same row */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="rentAmount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rent Amount</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
												$
											</span>
											<Input className="pl-6" placeholder="1500" {...field} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="securityDeposit"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Security Deposit</FormLabel>
									<FormControl>
										<div className="relative">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
												$
											</span>
											<Input className="pl-6" placeholder="1500" {...field} />
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Lease Duration */}
					<FormField
						control={form.control}
						name="leaseDurations"
						render={() => (
							<FormItem>
								<FormLabel>Lease Duration Options</FormLabel>
								<div className="grid grid-cols-2 gap-2">
									{leaseDurationOptions.map((option) => (
										<FormField
											key={option.id}
											control={form.control}
											name="leaseDurations"
											render={({ field }) => {
												return (
													<FormItem
														key={option.id}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(option.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				option.id,
																			])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== option.id,
																				),
																			);
																}}
															/>
														</FormControl>
														<FormLabel className="text-sm font-normal">
															{option.label}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Availability Date */}
					<FormField
						control={form.control}
						name="availabilityDate"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Availability Date</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-full pl-3 text-left font-normal",
													!field.value && "text-muted-foreground",
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description (Optional)</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Write a compelling description of your property..."
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Highlight the best features and details that make your
									property special.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Amenities */}
					<FormField
						control={form.control}
						name="amenities"
						render={() => (
							<FormItem>
								<FormLabel>Amenities</FormLabel>
								<div className="grid grid-cols-2 gap-2">
									{amenitiesOptions.map((option) => (
										<FormField
											key={option.id}
											control={form.control}
											name="amenities"
											render={({ field }) => {
												return (
													<FormItem
														key={option.id}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(option.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				option.id,
																			])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== option.id,
																				),
																			);
																}}
															/>
														</FormControl>
														<FormLabel className="text-sm font-normal">
															{option.label}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Pet Policy */}
					<FormField
						control={form.control}
						name="petPolicy"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Pet Policy</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select pet policy" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="allowed">Allowed</SelectItem>
										<SelectItem value="not-allowed">Not Allowed</SelectItem>
										<SelectItem value="case-by-case">Case-by-Case</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Pet Restrictions (conditional) */}
					{petPolicy === "case-by-case" && (
						<FormField
							control={form.control}
							name="petRestrictions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pet Restrictions</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Specify pet restrictions or requirements..."
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}

					{/* Utilities Included */}
					<FormField
						control={form.control}
						name="utilitiesIncluded"
						render={() => (
							<FormItem>
								<FormLabel>Utilities Included</FormLabel>
								<div className="grid grid-cols-2 gap-2">
									{utilitiesOptions.map((option) => (
										<FormField
											key={option.id}
											control={form.control}
											name="utilitiesIncluded"
											render={({ field }) => {
												return (
													<FormItem
														key={option.id}
														className="flex flex-row items-start space-x-3 space-y-0"
													>
														<FormControl>
															<Checkbox
																checked={field.value?.includes(option.id)}
																onCheckedChange={(checked) => {
																	return checked
																		? field.onChange([
																				...field.value,
																				option.id,
																			])
																		: field.onChange(
																				field.value?.filter(
																					(value) => value !== option.id,
																				),
																			);
																}}
															/>
														</FormControl>
														<FormLabel className="text-sm font-normal">
															{option.label}
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Navigation Buttons */}
					<div className="flex justify-between">
						<Button type="button" variant="outline" onClick={onBack}>
							Back
						</Button>
						<Button type="submit">Next: Management Preferences</Button>
					</div>
				</form>
			</Form>
		</Card>
	);
}

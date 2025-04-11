"use client";

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
import {
	rentalDetailsSchema,
	type RentalDetailsFormValues,
} from "./landlord-schema";

interface RentalDetailsProps {
	onNextAction: (data: RentalDetailsFormValues) => void;
	onBackAction: () => void;
	initialData: Partial<RentalDetailsFormValues>;
}

const LEASE_DURATION_OPTIONS = [
	{ id: "month-to-month", label: "Month-to-Month" },
	{ id: "6-months", label: "6 Months" },
	{ id: "1-year", label: "1 Year" },
	{ id: "other", label: "Other (specify)" },
];

const AMENITIES_OPTIONS = [
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

const UTILITIES_OPTIONS = [
	{ id: "water", label: "Water" },
	{ id: "electricity", label: "Electricity" },
	{ id: "gas", label: "Gas" },
	{ id: "trash", label: "Trash" },
	{ id: "internet", label: "Internet" },
];

export default function RentalDetails({
	onNextAction,
	onBackAction,
	initialData = {},
}: RentalDetailsProps) {
	const form = useForm<RentalDetailsFormValues>({
		resolver: zodResolver(rentalDetailsSchema),
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

	const petPolicy = form.watch("petPolicy");

	function onSubmit(data: RentalDetailsFormValues) {
		onNextAction(data);
	}

	return (
		<>
			<Card className="max-w-2xl mx-auto p-8">
				<div className="mb-6">
					<h2 className="text-2xl font-bold">Rental Details</h2>
					<p className="text-gray-500">
						Set your rental terms and describe your property.
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
										{LEASE_DURATION_OPTIONS.map((option) => (
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
												disabled={(date) =>
													date < new Date() || date < new Date("1900-01-01")
												}
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
									<FormLabel>Property Description (optional)</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Describe your property's features and location..."
											className="resize-none"
											{...field}
										/>
									</FormControl>
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
										{AMENITIES_OPTIONS.map((option) => (
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
											<SelectItem value="allowed">Pets Allowed</SelectItem>
											<SelectItem value="not_allowed">No Pets</SelectItem>
											<SelectItem value="case_by_case">
												Case by Case Basis
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Pet Restrictions (shown only if pets are allowed) */}
						{petPolicy === "allowed" && (
							<FormField
								control={form.control}
								name="petRestrictions"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pet Restrictions (optional)</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Specify any restrictions (e.g., size, breed, number of pets)..."
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
										{UTILITIES_OPTIONS.map((option) => (
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
					</form>
				</Form>
			</Card>
			<div className="flex justify-between mt-8">
				<Button variant="outline" onClick={onBackAction}>
					Back
				</Button>
				<Button onClick={form.handleSubmit(onSubmit)}>Continue</Button>
			</div>
		</>
	);
}

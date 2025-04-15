// "use client";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const firmSchema = z.object({
// 	businessName: z
// 		.string()
// 		.min(2, "Business name must be at least 2 characters"),
// 	streetAddress: z
// 		.string()
// 		.min(5, "Street address must be at least 5 characters"),
// 	unitNumber: z.string().optional(),
// 	city: z.string().min(2, "City must be at least 2 characters"),
// 	state: z.string().min(2, "State must be at least 2 characters"),
// 	zip: z.string().min(5, "ZIP code must be at least 5 characters"),
// 	phoneNumber: z
// 		.string()
// 		.min(10, "Phone number must be at least 10 characters"),
// 	website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
// 	propertiesCount: z.enum(["1-10", "11-50", "51-100", "100+"]).optional(),
// });

// type FirmData = z.infer<typeof firmSchema>;

// interface FirmInformationProps {
// 	onNext: (data: FirmData) => void;
// 	initialData?: Partial<FirmData>;
// }

// export default function FirmInformation({
// 	onNext,
// 	initialData = {},
// }: FirmInformationProps) {
// 	const form = useForm<FirmData>({
// 		resolver: zodResolver(firmSchema),
// 		defaultValues: {
// 			businessName: initialData.businessName || "",
// 			streetAddress: initialData.streetAddress || "",
// 			unitNumber: initialData.unitNumber || "",
// 			city: initialData.city || "",
// 			state: initialData.state || "",
// 			zip: initialData.zip || "",
// 			phoneNumber: initialData.phoneNumber || "",
// 			website: initialData.website || "",
// 			propertiesCount: initialData.propertiesCount || undefined,
// 		},
// 	});

// 	const onSubmit = (data: FirmData) => {
// 		onNext(data);
// 	};

// 	return (
// 		<Card className="max-w-2xl mx-auto p-8">
// 			<div className="mb-6">
// 				<h2 className="text-2xl font-bold">Firm Details</h2>
// 				<p className="text-gray-500">
// 					Please provide information about your property management firm.
// 				</p>
// 			</div>

// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 					<FormField
// 						control={form.control}
// 						name="businessName"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Business Name *</FormLabel>
// 								<FormControl>
// 									<Input placeholder="Enter your business name" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					<div className="space-y-4">
// 						<h3 className="text-lg font-medium">Address</h3>

// 						<FormField
// 							control={form.control}
// 							name="streetAddress"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Street Address *</FormLabel>
// 									<FormControl>
// 										<Input placeholder="123 Main St" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<FormField
// 							control={form.control}
// 							name="unitNumber"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Apartment/Unit Number</FormLabel>
// 									<FormControl>
// 										<Input placeholder="Apt 1B (Optional)" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<div className="grid grid-cols-2 gap-4">
// 							<FormField
// 								control={form.control}
// 								name="city"
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>City *</FormLabel>
// 										<FormControl>
// 											<Input placeholder="City" {...field} />
// 										</FormControl>
// 										<FormMessage />
// 									</FormItem>
// 								)}
// 							/>

// 							<FormField
// 								control={form.control}
// 								name="state"
// 								render={({ field }) => (
// 									<FormItem>
// 										<FormLabel>State/Region *</FormLabel>
// 										<FormControl>
// 											<Input placeholder="State" {...field} />
// 										</FormControl>
// 										<FormMessage />
// 									</FormItem>
// 								)}
// 							/>
// 						</div>

// 						<FormField
// 							control={form.control}
// 							name="zip"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>ZIP Code *</FormLabel>
// 									<FormControl>
// 										<Input placeholder="ZIP Code" {...field} />
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 					</div>

// 					<FormField
// 						control={form.control}
// 						name="phoneNumber"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Phone Number *</FormLabel>
// 								<FormControl>
// 									<Input placeholder="(555) 123-4567" type="tel" {...field} />
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					<FormField
// 						control={form.control}
// 						name="website"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Website</FormLabel>
// 								<FormControl>
// 									<Input
// 										placeholder="https://www.yourcompany.com (Optional)"
// 										type="url"
// 										{...field}
// 									/>
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					<FormField
// 						control={form.control}
// 						name="propertiesCount"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Number of Properties Managed</FormLabel>
// 								<Select
// 									onValueChange={field.onChange}
// 									defaultValue={field.value}
// 								>
// 									<FormControl>
// 										<SelectTrigger>
// 											<SelectValue placeholder="Select range (Optional)" />
// 										</SelectTrigger>
// 									</FormControl>
// 									<SelectContent>
// 										<SelectItem value="1-10">1-10</SelectItem>
// 										<SelectItem value="11-50">11-50</SelectItem>
// 										<SelectItem value="51-100">51-100</SelectItem>
// 										<SelectItem value="100+">100+</SelectItem>
// 									</SelectContent>
// 								</Select>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					<div className="flex justify-end">
// 						<Button type="submit">Next: Management Preferences</Button>
// 					</div>
// 				</form>
// 			</Form>
// 		</Card>
// 	);
// }

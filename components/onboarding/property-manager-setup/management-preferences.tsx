// "use client";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const managementSchema = z.object({
// 	defaultContactEmail: z.string().email("Must be a valid email address"),
// 	defaultContactPhone: z
// 		.string()
// 		.min(10, "Phone number must be at least 10 characters"),
// 	notifyNewInquiries: z.boolean().default(true),
// 	notifyMaintenanceRequests: z.boolean().default(true),
// 	notifyRentReminders: z.boolean().default(true),
// 	notifyLeaseExpirations: z.boolean().default(true),
// 	applicationProcess: z.enum(["internal", "platform"]),
// 	screeningCreditCheck: z.boolean().default(true),
// 	screeningBackgroundCheck: z.boolean().default(true),
// 	screeningIncomeVerification: z.boolean().default(true),
// 	leaseSigningPreference: z.enum(["digital", "offline"]),
// });

// type ManagementData = z.infer<typeof managementSchema>;

// interface ManagementPreferencesProps {
// 	onNext: (data: ManagementData) => void;
// 	onBack: () => void;
// 	initialData?: Partial<ManagementData>;
// 	userEmail?: string;
// 	userPhone?: string;
// }

// export default function ManagementPreferences({
// 	onNext,
// 	onBack,
// 	initialData = {},
// 	userEmail = "",
// 	userPhone = "",
// }: ManagementPreferencesProps) {
// 	const form = useForm<ManagementData>({
// 		resolver: zodResolver(managementSchema),
// 		defaultValues: {
// 			defaultContactEmail: initialData.defaultContactEmail || userEmail,
// 			defaultContactPhone: initialData.defaultContactPhone || userPhone,
// 			notifyNewInquiries: initialData.notifyNewInquiries ?? true,
// 			notifyMaintenanceRequests: initialData.notifyMaintenanceRequests ?? true,
// 			notifyRentReminders: initialData.notifyRentReminders ?? true,
// 			notifyLeaseExpirations: initialData.notifyLeaseExpirations ?? true,
// 			applicationProcess: initialData.applicationProcess || "platform",
// 			screeningCreditCheck: initialData.screeningCreditCheck ?? true,
// 			screeningBackgroundCheck: initialData.screeningBackgroundCheck ?? true,
// 			screeningIncomeVerification:
// 				initialData.screeningIncomeVerification ?? true,
// 			leaseSigningPreference: initialData.leaseSigningPreference || "digital",
// 		},
// 	});

// 	const onSubmit = (data: ManagementData) => {
// 		onNext(data);
// 	};

// 	return (
// 		<Card className="max-w-2xl mx-auto p-8">
// 			<div className="mb-6">
// 				<h2 className="text-2xl font-bold">Management Preferences</h2>
// 				<p className="text-gray-500">
// 					Set up your default preferences for property management.
// 				</p>
// 			</div>

// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 					<div className="space-y-4">
// 						<h3 className="text-lg font-medium">Communication Preferences</h3>

// 						<FormField
// 							control={form.control}
// 							name="defaultContactEmail"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Default Contact Email *</FormLabel>
// 									<FormControl>
// 										<Input type="email" {...field} />
// 									</FormControl>
// 									<FormDescription>
// 										Email used for inquiries and notifications
// 									</FormDescription>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<FormField
// 							control={form.control}
// 							name="defaultContactPhone"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Default Contact Phone *</FormLabel>
// 									<FormControl>
// 										<Input type="tel" {...field} />
// 									</FormControl>
// 									<FormDescription>
// 										Phone number shown to tenants and prospects
// 									</FormDescription>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<div className="space-y-2">
// 							<h4 className="text-sm font-medium">Notification Preferences</h4>
// 							<p className="text-sm text-gray-500">
// 								Select which notifications you want to receive
// 							</p>

// 							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
// 								<FormField
// 									control={form.control}
// 									name="notifyNewInquiries"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												New Inquiries
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="notifyMaintenanceRequests"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												Maintenance Requests
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="notifyRentReminders"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												Rent Payment Reminders
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="notifyLeaseExpirations"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												Lease Expiration Reminders
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>
// 							</div>
// 						</div>
// 					</div>

// 					<div className="space-y-4">
// 						<h3 className="text-lg font-medium">Application Process</h3>

// 						<FormField
// 							control={form.control}
// 							name="applicationProcess"
// 							render={({ field }) => (
// 								<FormItem className="space-y-2">
// 									<FormLabel>Application Handling *</FormLabel>
// 									<FormControl>
// 										<RadioGroup
// 											onValueChange={field.onChange}
// 											defaultValue={field.value}
// 											className="flex flex-col space-y-1"
// 										>
// 											<FormItem className="flex items-center space-x-3 space-y-0">
// 												<FormControl>
// 													<RadioGroupItem value="internal" />
// 												</FormControl>
// 												<FormLabel className="font-normal cursor-pointer">
// 													Handle Applications Internally
// 												</FormLabel>
// 											</FormItem>
// 											<FormItem className="flex items-center space-x-3 space-y-0">
// 												<FormControl>
// 													<RadioGroupItem value="platform" />
// 												</FormControl>
// 												<FormLabel className="font-normal cursor-pointer">
// 													Use Platform's Online Application Process
// 												</FormLabel>
// 											</FormItem>
// 										</RadioGroup>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>

// 						<div className="space-y-2">
// 							<h4 className="text-sm font-medium">Screening Defaults</h4>
// 							<p className="text-sm text-gray-500">
// 								Select which screening checks to perform by default
// 							</p>

// 							<div className="space-y-2">
// 								<FormField
// 									control={form.control}
// 									name="screeningCreditCheck"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												Credit Check
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="screeningBackgroundCheck"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												Background Check
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>

// 								<FormField
// 									control={form.control}
// 									name="screeningIncomeVerification"
// 									render={({ field }) => (
// 										<FormItem className="flex gap-2 items-center space-y-0">
// 											<FormControl>
// 												<Checkbox
// 													checked={field.value}
// 													onCheckedChange={field.onChange}
// 												/>
// 											</FormControl>
// 											<FormLabel className="text-sm cursor-pointer">
// 												Income Verification
// 											</FormLabel>
// 										</FormItem>
// 									)}
// 								/>
// 							</div>
// 						</div>
// 					</div>

// 					<FormField
// 						control={form.control}
// 						name="leaseSigningPreference"
// 						render={({ field }) => (
// 							<FormItem className="space-y-2">
// 								<FormLabel>Lease Signing Preference *</FormLabel>
// 								<FormControl>
// 									<RadioGroup
// 										onValueChange={field.onChange}
// 										defaultValue={field.value}
// 										className="flex flex-col space-y-1"
// 									>
// 										<FormItem className="flex items-center space-x-3 space-y-0">
// 											<FormControl>
// 												<RadioGroupItem value="digital" />
// 											</FormControl>
// 											<FormLabel className="font-normal cursor-pointer">
// 												Digital Lease Signing
// 											</FormLabel>
// 										</FormItem>
// 										<FormItem className="flex items-center space-x-3 space-y-0">
// 											<FormControl>
// 												<RadioGroupItem value="offline" />
// 											</FormControl>
// 											<FormLabel className="font-normal cursor-pointer">
// 												Offline Lease Signing
// 											</FormLabel>
// 										</FormItem>
// 									</RadioGroup>
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>

// 					<div className="flex justify-between">
// 						<Button type="button" variant="outline" onClick={onBack}>
// 							Back
// 						</Button>
// 						<Button type="submit">Next: Team Access</Button>
// 					</div>
// 				</form>
// 			</Form>
// 		</Card>
// 	);
// }

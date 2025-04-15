// "use client";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
// import { InfoIcon, Plus, Trash2 } from "lucide-react";
// import { useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";

// const teamMemberSchema = z.object({
// 	email: z.string().email("Must be a valid email address"),
// 	role: z.enum([
// 		"administrator",
// 		"property_manager",
// 		"leasing_agent",
// 		"maintenance_technician",
// 	]),
// });

// const teamSchema = z.object({
// 	teamMembers: z.array(teamMemberSchema).optional(),
// });

// type TeamMember = z.infer<typeof teamMemberSchema>;
// type TeamData = z.infer<typeof teamSchema>;

// interface TeamAccessProps {
// 	onNext: (data: TeamData) => void;
// 	onBack: () => void;
// 	initialData?: TeamData;
// }

// export default function TeamAccess({
// 	onNext,
// 	onBack,
// 	initialData = { teamMembers: [] },
// }: TeamAccessProps) {
// 	const form = useForm<TeamData>({
// 		resolver: zodResolver(teamSchema),
// 		defaultValues: {
// 			teamMembers: initialData.teamMembers?.length
// 				? initialData.teamMembers
// 				: [{ email: "", role: "property_manager" }],
// 		},
// 	});

// 	const { fields, append, remove } = useFieldArray({
// 		control: form.control,
// 		name: "teamMembers",
// 	});

// 	const onSubmit = (data: TeamData) => {
// 		// Filter out any empty email fields
// 		const filteredMembers =
// 			data.teamMembers?.filter((member) => member.email.trim() !== "") || [];
// 		onNext({ teamMembers: filteredMembers });
// 	};

// 	const addTeamMember = () => {
// 		append({ email: "", role: "property_manager" });
// 	};

// 	const getRoleTitle = (role: string) => {
// 		switch (role) {
// 			case "administrator":
// 				return "Administrator";
// 			case "property_manager":
// 				return "Property Manager";
// 			case "leasing_agent":
// 				return "Leasing Agent";
// 			case "maintenance_technician":
// 				return "Maintenance Technician";
// 			default:
// 				return role;
// 		}
// 	};

// 	return (
// 		<Card className="max-w-2xl mx-auto p-8">
// 			<div className="mb-6">
// 				<h2 className="text-2xl font-bold">Invite Team Members</h2>
// 				<p className="text-gray-500 mb-2">
// 					Add team members to help manage your properties. You can add more
// 					later.
// 				</p>
// 				<Alert>
// 					<InfoIcon className="h-4 w-4" />
// 					<AlertTitle>Team members will receive email invitations</AlertTitle>
// 					<AlertDescription>
// 						Each person will need to create an account to access your
// 						properties.
// 					</AlertDescription>
// 				</Alert>
// 			</div>

// 			<Form {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
// 					<div className="space-y-4">
// 						{fields.map((field, index) => (
// 							<div
// 								key={field.id}
// 								className="flex flex-col md:flex-row gap-2 items-start"
// 							>
// 								<div className="flex-1">
// 									<FormField
// 										control={form.control}
// 										name={`teamMembers.${index}.email`}
// 										render={({ field }) => (
// 											<FormItem>
// 												<FormLabel
// 													className={index !== 0 ? "sr-only" : undefined}
// 												>
// 													Email Address
// 												</FormLabel>
// 												<FormControl>
// 													<Input
// 														placeholder="team.member@example.com"
// 														{...field}
// 													/>
// 												</FormControl>
// 												<FormMessage />
// 											</FormItem>
// 										)}
// 									/>
// 								</div>
// 								<div className="w-full md:w-1/3">
// 									<FormField
// 										control={form.control}
// 										name={`teamMembers.${index}.role`}
// 										render={({ field }) => (
// 											<FormItem>
// 												<FormLabel
// 													className={index !== 0 ? "sr-only" : undefined}
// 												>
// 													Role
// 												</FormLabel>
// 												<Select
// 													value={field.value}
// 													onValueChange={field.onChange}
// 												>
// 													<FormControl>
// 														<SelectTrigger>
// 															<SelectValue placeholder="Select a role" />
// 														</SelectTrigger>
// 													</FormControl>
// 													<SelectContent>
// 														<SelectItem value="administrator">
// 															Administrator
// 														</SelectItem>
// 														<SelectItem value="property_manager">
// 															Property Manager
// 														</SelectItem>
// 														<SelectItem value="leasing_agent">
// 															Leasing Agent
// 														</SelectItem>
// 														<SelectItem value="maintenance_technician">
// 															Maintenance Technician
// 														</SelectItem>
// 													</SelectContent>
// 												</Select>
// 												<FormMessage />
// 											</FormItem>
// 										)}
// 									/>
// 								</div>
// 								{fields.length > 1 && (
// 									<Button
// 										type="button"
// 										variant="ghost"
// 										size="icon"
// 										onClick={() => remove(index)}
// 										className="mt-8"
// 									>
// 										<Trash2 className="h-4 w-4" />
// 										<span className="sr-only">Remove team member</span>
// 									</Button>
// 								)}
// 							</div>
// 						))}
// 						<Button
// 							type="button"
// 							variant="outline"
// 							size="sm"
// 							onClick={addTeamMember}
// 							className="mt-2"
// 						>
// 							<Plus className="mr-2 h-4 w-4" />
// 							Add Another Team Member
// 						</Button>
// 					</div>

// 					<div className="bg-gray-50 rounded-md p-4 space-y-2">
// 						<h3 className="text-sm font-semibold">Role Descriptions</h3>
// 						<div className="space-y-1 text-sm">
// 							<p>
// 								<span className="font-medium">Administrator:</span> Full access
// 								to all properties, team members, billing, and settings.
// 							</p>
// 							<p>
// 								<span className="font-medium">Property Manager:</span> Can
// 								manage assigned properties and handle tenant communications.
// 							</p>
// 							<p>
// 								<span className="font-medium">Leasing Agent:</span> Can create
// 								listings and screen applicants for assigned properties.
// 							</p>
// 							<p>
// 								<span className="font-medium">Maintenance Technician:</span> Can
// 								view and update maintenance requests.
// 							</p>
// 						</div>
// 					</div>

// 					<div className="flex justify-between">
// 						<Button type="button" variant="outline" onClick={onBack}>
// 							Back
// 						</Button>
// 						<Button type="submit">Next: Add First Property</Button>
// 					</div>
// 				</form>
// 			</Form>
// 		</Card>
// 	);
// }

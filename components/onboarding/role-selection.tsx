"use client";

import { useState } from "react";
import type { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Building, Home, UserCheck } from "lucide-react";
import { useUser } from "@/context/user-context";

interface RoleCardProps {
	role: UserRole;
	title: string;
	description: string;
	icon: React.ReactNode;
	isSelected: boolean;
	onClick: () => void;
}

function RoleCard({
	role,
	title,
	description,
	icon,
	isSelected,
	onClick,
}: RoleCardProps) {
	return (
		<Card
			className={`cursor-pointer transition-all ${
				isSelected
					? "border-2 border-primary shadow-lg scale-105"
					: "hover:shadow-md hover:scale-102"
			}`}
			onClick={onClick}
		>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<CardTitle className="text-xl">{title}</CardTitle>
					<div
						className={`p-2 rounded-full ${isSelected ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
					>
						{icon}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-sm">{description}</CardDescription>
			</CardContent>
		</Card>
	);
}

export default function RoleSelection() {
	const { onboardingState, updateOnboardingState } = useUser();
	const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(
		onboardingState?.role,
	);

	const roleOptions = [
		{
			role: "renter" as UserRole,
			title: "I'm a Renter",
			description:
				"I'm looking for a home to rent. Help me find and apply for properties.",
			icon: <Home size={24} />,
		},
		{
			role: "landlord" as UserRole,
			title: "I'm a Landlord",
			description:
				"I own properties and want to list them for rent and manage tenant applications.",
			icon: <Building size={24} />,
		},
		{
			role: "property_manager" as UserRole,
			title: "I'm a Property Manager",
			description:
				"I manage multiple properties on behalf of owners and need advanced management tools.",
			icon: <UserCheck size={24} />,
		},
	];

	const handleRoleSelect = (role: UserRole) => {
		setSelectedRole(role);
	};

	const handleContinue = () => {
		if (selectedRole) {
			updateOnboardingState({
				step: 3,
				role: selectedRole,
			});
		}
	};

	const handleBack = () => {
		updateOnboardingState({ step: 1 });
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">
				How will you use RentEasy?
			</h1>

			<p className="text-center text-muted-foreground mb-8">
				Select your role to help us personalize your experience.
			</p>

			<div className="grid gap-6 md:grid-cols-3 mb-8">
				{roleOptions.map((option) => (
					<RoleCard
						key={option.role}
						role={option.role}
						title={option.title}
						description={option.description}
						icon={option.icon}
						isSelected={selectedRole === option.role}
						onClick={() => handleRoleSelect(option.role)}
					/>
				))}
			</div>

			<div className="flex justify-between mt-8">
				<Button variant="outline" onClick={handleBack}>
					Back
				</Button>
				<Button onClick={handleContinue} disabled={!selectedRole}>
					Continue
				</Button>
			</div>
		</div>
	);
}

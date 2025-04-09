"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Home, UserCheck } from "lucide-react";
import { updateUserRole } from "@/actions/server/onboarding";
import { toast } from "sonner"

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

interface RoleSelectionProps {
  onRoleSelectedAction: (role: UserRole) => void;
  onBackAction: () => void;
}

// RoleCard component remains the same structurally
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
      className={`cursor-pointer transition-all h-full flex flex-col ${
        // Added h-full and flex for consistent height
        isSelected
          ? "border-2 border-primary shadow-lg scale-105"
          : "hover:shadow-md hover:scale-102 border" // Added border for consistent base style
        }`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div
            className={`p-2 rounded-full ${isSelected
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground"
              }`}
          >
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {" "}
        {/* Added flex-grow */}
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the direct children (text, grid, buttons)
    },
  },
};

const itemVariants = {
  // For text and buttons blocks
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const gridVariants = {
  // For the grid container itself to manage card staggering
  hidden: { opacity: 1 }, // Grid container is immediately visible to start staggering
  visible: {
    opacity: 1,
    transition: {
      // delayChildren: 0.1, // Optional delay before cards start
      staggerChildren: 0.15, // Stagger the cards inside
    },
  },
};

const cardVariants = {
  // For individual cards
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function RoleSelection({
  onRoleSelectedAction,
  onBackAction,
}: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleContinue = async () => {
    if (selectedRole) {
      setIsSubmitting(true);
      try {
        // Save the role to the database
        const result = await updateUserRole(selectedRole);

        if (result.error) {
          toast("Error in updating role", {
            description:
              result.message || "Failed to update role. Please try again.",
          });
          setIsSubmitting(false);
          return;
        }

        // If successful, continue to the next step
        onRoleSelectedAction(selectedRole);
      } catch (error) {
        console.error("Error saving role:", error);
        toast("Error", {
          description: "An unexpected error occurred. Please try again.",
        });
        setIsSubmitting(false);
      }
    }
  };

  return (
    // Animate the main container
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="max-w-3xl mx-auto p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animate the text block (title + description) */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold mb-6 text-center">
            How will you use RentEasy?
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Select your role to help us personalize your experience.
          </p>
        </motion.div>

        {/* Animate the grid container to stagger card animations */}
        <motion.div
          className="grid gap-6 md:grid-cols-3 mb-8"
          variants={gridVariants}
        >
          {roleOptions.map((option) => (
            // Animate each card individually
            <motion.div
              key={option.role}
              variants={cardVariants}
              className="h-full"
            >
              {" "}
              {/* Added h-full */}
              <RoleCard
                // key is now on the motion wrapper
                role={option.role}
                title={option.title}
                description={option.description}
                icon={option.icon}
                isSelected={selectedRole === option.role}
                onClick={() => handleRoleSelect(option.role)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Animate the button container */}
        <motion.div
          className="flex justify-between mt-8"
          variants={itemVariants}
        >
          <Button
            variant="outline"
            onClick={onBackAction}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedRole || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

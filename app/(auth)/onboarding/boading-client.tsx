"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import RoleSelection from "@/components/onboarding/role-selection";
import RenterSetup from "@/components/onboarding/renter-setup";
import LandlordSetup from "@/components/onboarding/landlord-setup";
// import PropertyManagerSetup from "@/components/onboarding/property-manager-setup";
import type { UserRole } from "@/types/user";

type OnboardingStep = "welcome" | "role" | "setup";

export default function OnboardingClient() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleGetStarted = () => {
    setStep("role");
  };

  const handleRoleSelected = (role: UserRole) => {
    setSelectedRole(role);
    setStep("setup");
  };

  const handleBack = () => {
    if (step === "role") {
      setStep("welcome");
    } else if (step === "setup") {
      setStep("role");
    }
  };

  const handleComplete = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {step === "welcome" && (
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen p-8 text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div
            className="mb-8"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
            }}
          >
            <Image
              src="/icon.png"
              alt="Welcome"
              width={200}
              height={200}
              className="mx-auto"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            Welcome to RentEasy!
          </motion.h1>

          <motion.p
            className="text-xl mb-2"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            Hi there,
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-md"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            We're excited to have you join our platform. Let's get you set up so
            you can start exploring rental properties that match your needs.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <Button size="lg" onClick={handleGetStarted}>
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      )}

      {step === "role" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <RoleSelection
            onRoleSelectedAction={handleRoleSelected}
            onBackAction={handleBack}
          />
        </motion.div>
      )}

      {step === "setup" && selectedRole === "renter" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <RenterSetup
            onCompleteAction={handleComplete}
            onBackAction={handleBack}
          />
        </motion.div>
      )}

      {step === "setup" && selectedRole === "landlord" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <LandlordSetup
            onCompleteAction={handleComplete}
            onBackAction={handleBack}
          />
        </motion.div>
      )}

      {/* {step === "setup" && selectedRole === "property_manager" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <PropertyManagerSetup
            onComplete={handleComplete}
            onBack={handleBack}
          />
        </motion.div>
      )} */}
    </div>
  );
}

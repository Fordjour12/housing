"use client";

import LandlordSetupFlow from "@/components/onboarding/landlord-setup/landlord-setup-flow";
import PropertyManagerSetupFlow from "@/components/onboarding/property-manager-setup/property-manager-setup-flow";
import { Card } from "@/components/ui/card";
import { useUser } from "@/#app-deprecated/context/user-context";
import RenterSetup from "./renter-setup";
import RoleSelection from "./role-selection";
import WelcomeScreen from "./welcome-screen";

// Mock component for property manager role
const PropertyManagerSetup = () => (
  <Card className="max-w-2xl mx-auto p-8">
    <h2 className="text-2xl font-bold mb-4">Property Manager Setup</h2>
    <p>
      This would be the property manager setup flow with management dashboard
      preferences, team access controls, etc.
    </p>
  </Card>
);

export default function OnboardingFlow() {
  const { onboardingState } = useUser();

  if (!onboardingState) {
    return null;
  }

  // Render the appropriate onboarding step based on the current state
  switch (onboardingState.step) {
    case 1:
      return <WelcomeScreen />;
    case 2:
      return <RoleSelection />;
    case 3:
      // Based on selected role, show the appropriate setup screen
      switch (onboardingState.role) {
        case "renter":
          return <RenterSetup />;
        case "landlord":
          return <LandlordSetupFlow />;
        case "property_manager":
          return <PropertyManagerSetupFlow />;
        default:
          // If no role is selected yet, go back to role selection
          return <RoleSelection />;
      }
    default:
      return <WelcomeScreen />;
  }
}

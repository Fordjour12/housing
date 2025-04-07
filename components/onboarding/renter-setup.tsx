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
import { Label } from "@/components/ui/label";
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
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define more specific types for our form data
interface FormData {
  name: string;
  phone: string;
  occupation: string;
  moveInDate: string;
  budget: {
    min: number;
    max: number;
  };
  bedrooms: number[];
  propertyTypes: string[];
  amenities: string[];
  petFriendly: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    newListings: boolean;
    applicationUpdates: boolean;
  };
}

type FormDataKey = keyof FormData;

interface RenterSetupProps {
  onCompleteAction: () => void;
  onBackAction: () => void;
}

const ArrayRentalSteps = [];

export default function RenterSetup({ onCompleteAction, onBackAction }: RenterSetupProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Profile
    name: "",
    phone: "",
    occupation: "",
    moveInDate: "",

    // Preferences
    budget: {
      min: 500,
      max: 2500,
    },
    bedrooms: [],
    propertyTypes: [],
    amenities: [],
    petFriendly: false,
    notifications: {
      email: true,
      push: false,
      newListings: true,
      applicationUpdates: true,
    },
  });

  const handleInputChange = <K extends FormDataKey>(
    field: K,
    value: FormData[K],
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleBack = () => {
    if (step === 1) {
      onBackAction();
    } else {
      setStep(step - 1);
    }
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      finishSetup();
    }
  };

  const finishSetup = async () => {
    try {
      const response = await fetch("/api/onboarding/renter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile: {
            name: formData.name,
            phone: formData.phone,
            occupation: formData.occupation,
            moveInDate: formData.moveInDate,
          },
          preferences: {
            budgetMin: formData.budget.min,
            budgetMax: formData.budget.max,
            bedrooms: formData.bedrooms,
            propertyTypes: formData.propertyTypes,
            amenities: formData.amenities,
            petFriendly: formData.petFriendly,
            emailNotifications: formData.notifications.email,
            pushNotifications: formData.notifications.push,
            newListingNotifications: formData.notifications.newListings,
            applicationUpdates: formData.notifications.applicationUpdates,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save renter setup");
      }

      onCompleteAction();
    } catch (error) {
      console.error("Error completing renter setup:", error);
      // TODO: Add error handling UI
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${step}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold"
            >
              {step === 1 && "Personal Details"}
              {step === 2 && "Housing Preferences"}
              {step === 3 && "Notifications & Settings"}
            </motion.h1>
          </AnimatePresence>
          {/* Progress indicator can be added back here if desired */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-8 rounded-full transition-colors duration-300 ${s <= step ? "bg-primary" : "bg-muted"
                  }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step > 1 ? 50 : -50 }} // Slide in from right if going forward, left if backward (initial guess)
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? 50 : -50 }} // Slide out opposite direction
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Profile Information */}
            {step === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      Basic Information
                    </CardTitle>
                    <CardDescription>
                      Tell us a bit about yourself to help find suitable
                      properties.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <div className="flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="occupation"
                            value={formData.occupation}
                            onChange={(e) =>
                              handleInputChange("occupation", e.target.value)
                            }
                            placeholder="Your occupation"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moveInDate">Desired Move-in Date</Label>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="moveInDate"
                            type="date"
                            value={formData.moveInDate}
                            onChange={(e) =>
                              handleInputChange("moveInDate", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Housing Preferences */}
            {step === 2 && (
              <div className="space-y-6 w-xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Home className="mr-2 h-5 w-5" />
                      Housing Preferences
                    </CardTitle>
                    <CardDescription>
                      Let us know what you're looking for in a property.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Budget Range</Label>
                        <div className="text-sm text-muted-foreground">
                          ${formData.budget.min} - ${formData.budget.max}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Slider
                          min={500}
                          max={5000}
                          step={100}
                          value={[formData.budget.min, formData.budget.max]}
                          onValueChange={(value) =>
                            handleInputChange("budget", {
                              min: value[0],
                              max: value[1],
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Number of Bedrooms</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, "5+"].map((num) => (
                          <Button
                            key={num}
                            variant={
                              formData.bedrooms.includes(Number(num))
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              const currentNum = Number(num === "5+" ? 6 : num); // Handle "5+" potentially
                              const newBedrooms = formData.bedrooms.includes(
                                currentNum,
                              )
                                ? formData.bedrooms.filter(
                                  (b) => b !== currentNum,
                                )
                                : [...formData.bedrooms, currentNum];
                              handleInputChange("bedrooms", newBedrooms);
                            }}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Property Types</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Apartment", "House", "Condo", "Townhouse"].map(
                          (type) => (
                            <Button
                              key={type}
                              variant={
                                formData.propertyTypes.includes(type)
                                  ? "default"
                                  : "outline"
                              }
                              onClick={() => {
                                const newTypes =
                                  formData.propertyTypes.includes(type)
                                    ? formData.propertyTypes.filter(
                                      (t) => t !== type,
                                    )
                                    : [...formData.propertyTypes, type];
                                handleInputChange("propertyTypes", newTypes);
                              }}
                            >
                              {type}
                            </Button>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Amenities</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Parking",
                          "Laundry",
                          "Gym",
                          "Pool",
                          "Pet Friendly",
                          "Furnished",
                        ].map((amenity) => (
                          <Button
                            key={amenity}
                            variant={
                              formData.amenities.includes(amenity)
                                ? "default"
                                : "outline"
                            }
                            onClick={() => {
                              const newAmenities = formData.amenities.includes(
                                amenity,
                              )
                                ? formData.amenities.filter(
                                  (a) => a !== amenity,
                                )
                                : [...formData.amenities, amenity];
                              handleInputChange("amenities", newAmenities);
                            }}
                          >
                            {amenity}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="petFriendly"
                        checked={formData.petFriendly}
                        onCheckedChange={(checked) =>
                          handleInputChange("petFriendly", checked)
                        }
                      />
                      <Label htmlFor="petFriendly">
                        Pet Friendly Properties Only
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Notifications */}
            {step === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BellRing className="mr-2 h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you'd like to receive updates about properties
                      and applications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="email"
                          checked={formData.notifications.email}
                          onCheckedChange={(checked) =>
                            handleInputChange("notifications", {
                              ...formData.notifications,
                              email: checked,
                            })
                          }
                        />
                        <Label htmlFor="email">Email Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="push"
                          checked={formData.notifications.push}
                          onCheckedChange={(checked) =>
                            handleInputChange("notifications", {
                              ...formData.notifications,
                              push: checked,
                            })
                          }
                        />
                        <Label htmlFor="push">Push Notifications</Label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>What would you like to be notified about?</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newListings"
                            checked={formData.notifications.newListings}
                            onCheckedChange={(checked) =>
                              handleInputChange("notifications", {
                                ...formData.notifications,
                                newListings: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="newListings">
                            New Property Listings
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="applicationUpdates"
                            checked={formData.notifications.applicationUpdates}
                            onCheckedChange={(checked) =>
                              handleInputChange("notifications", {
                                ...formData.notifications,
                                applicationUpdates: checked as boolean,
                              })
                            }
                          />
                          <Label htmlFor="applicationUpdates">
                            Application Status Updates
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleContinue}>
            {step === 3 ? "Complete Setup" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

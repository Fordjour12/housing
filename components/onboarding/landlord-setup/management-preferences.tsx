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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  managementPreferencesSchema,
  type ManagementPreferencesFormValues,
} from "./landlord-schema";

interface ManagementPreferencesProps {
  onNextAction: (data: ManagementPreferencesFormValues) => void;
  onBackAction: () => void;
  initialData: Partial<ManagementPreferencesFormValues>;
}

const SCREENING_OPTIONS = [
  { id: "credit_check", label: "Credit Check" },
  { id: "background_check", label: "Background Check" },
  { id: "income_verification", label: "Income Verification" },
];

const COMMUNICATION_OPTIONS = [
  { id: "email", label: "Notify me of new inquiries via email" },
  { id: "push", label: "Send me push notifications" },
];

export default function ManagementPreferences({
  onNextAction,
  onBackAction,
  initialData = {},
}: ManagementPreferencesProps) {
  const form = useForm<ManagementPreferencesFormValues>({
    resolver: zodResolver(managementPreferencesSchema),
    defaultValues: {
      contactDisplay: initialData.contactDisplay || "phone_and_email",
      applicationProcess: initialData.applicationProcess || "self_managed",
      screeningPreferences: initialData.screeningPreferences || [],
      communicationPreferences: initialData.communicationPreferences || [],
      leaseSigningPreference: initialData.leaseSigningPreference || "digital",
    },
  });

  function onSubmit(data: ManagementPreferencesFormValues) {
    onNextAction(data);
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Management Preferences</h2>
          <p className="text-gray-500">
            Set up how you want to manage your property and interact with tenants.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Information Display */}
            <FormField
              control={form.control}
              name="contactDisplay"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Contact Information Display</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="phone_and_email" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Display my phone number and email to renters
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="email_only" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Only display my email address
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Application Process */}
            <FormField
              control={form.control}
              name="applicationProcess"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Application Process</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="self_managed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I will handle applications myself
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="app_managed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Use the app's online application process
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Screening Preferences */}
            <FormField
              control={form.control}
              name="screeningPreferences"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Screening Preferences (Optional)</FormLabel>
                    <FormDescription>
                      Select the screening methods you'd like to use
                    </FormDescription>
                  </div>
                  <div className="space-y-2">
                    {SCREENING_OPTIONS.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="screeningPreferences"
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
                              <FormLabel className="font-normal">
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

            {/* Communication Preferences */}
            <FormField
              control={form.control}
              name="communicationPreferences"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Communication Preferences</FormLabel>
                    <FormDescription>
                      Choose how you want to be notified
                    </FormDescription>
                  </div>
                  <div className="space-y-2">
                    {COMMUNICATION_OPTIONS.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="communicationPreferences"
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
                              <FormLabel className="font-normal">
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

            {/* Lease Signing Preference */}
            <FormField
              control={form.control}
              name="leaseSigningPreference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Lease Signing Preference</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="digital" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Digital lease signing through the app
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="offline" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Traditional paper lease signing
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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

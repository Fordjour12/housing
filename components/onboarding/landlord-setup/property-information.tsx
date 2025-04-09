"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  propertyInformationSchema,
  type PropertyInformationFormValues,
} from "./landlord-schema";

interface PropertyInformationProps {
  onNextAction: (data: PropertyInformationFormValues) => void;
  onBackAction: () => void;
  initialData: Partial<PropertyInformationFormValues>;
}

const BEDROOM_OPTIONS = ["Studio", "1", "2", "3", "4", "5", "6+"];
const BATHROOM_OPTIONS = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5+"];

export default function PropertyInformation({
  onNextAction,
  onBackAction,
  initialData = {},
}: PropertyInformationProps) {
  const form = useForm<PropertyInformationFormValues>({
    resolver: zodResolver(propertyInformationSchema),
    defaultValues: {
      streetAddress: initialData.streetAddress || "",
      unitNumber: initialData.unitNumber || "",
      city: initialData.city || "",
      state: initialData.state || "",
      zip: initialData.zip || "",
      propertyType: initialData.propertyType || "single_family",
      bedrooms: initialData.bedrooms || "",
      bathrooms: initialData.bathrooms || "",
      squareFootage: initialData.squareFootage || "",
      yearBuilt: initialData.yearBuilt || "",
    },
  });

  function onSubmit(data: PropertyInformationFormValues) {
    onNextAction(data);
  }

  return (
    <>
      <Card className="max-w-2xl mx-auto p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Add Your First Property</h2>
          <p className="text-gray-500">
            Let's start with the basic information about your property.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Street Address */}
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Unit Number */}
            <FormField
              control={form.control}
              name="unitNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apartment/Unit Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Apt 4B" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City and State on same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Cityville" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Region</FormLabel>
                    <FormControl>
                      <Input placeholder="California" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ZIP/Postal Code */}
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP/Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="90210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Type */}
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single_family">
                        Single Family Home
                      </SelectItem>
                      <SelectItem value="multi_family">Multi-Family</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bedrooms and Bathrooms on same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BEDROOM_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BATHROOM_OPTIONS.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Square Footage and Year Built on same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="squareFootage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Footage (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="1500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Built (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="1990" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </Card>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBackAction}>
          Back to Role Selection
        </Button>
        <Button onClick={form.handleSubmit(onSubmit)}>Continue</Button>
      </div>
    </>
  );
}

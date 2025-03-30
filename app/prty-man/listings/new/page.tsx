"use client";

import { ListingForm } from "../components/listing-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { createListing } from "@/actions/server/listing";

const formSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	price: z.string().min(1, "Price is required"),
	bedrooms: z.string().min(1, "Bedrooms is required"),
	bathrooms: z.string().min(1, "Bathrooms is required"),
	squareFeet: z.string().min(1, "Square feet is required"),
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	state: z.string().min(1, "State is required"),
	zipCode: z.string().min(1, "Zip code is required"),
	status: z.enum(["active", "pending", "inactive"]),
	isAvailable: z.boolean(),
});

export default function NewListingPage() {
	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await createListing({
				...values,
				price: values.price,
				bedrooms: Number.parseInt(values.bedrooms),
				bathrooms: Number.parseInt(values.bathrooms),
				squareFeet: Number.parseInt(values.squareFeet),
			});

			toast.success("Listing created successfully");
			router.push("/prty-man/listings");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to create listing",
			);
		}
	};

	return (
		<div className="container mx-auto py-10">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/prty-man/listings">
						<Button variant="ghost" size="icon" className="h-8 w-8">
							←
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-semibold">New Listing</h1>
						<p className="text-sm text-muted-foreground">
							Create a new property listing
						</p>
					</div>
				</div>
			</div>
			<ListingForm onSubmit={onSubmit} />
		</div>
	);
}

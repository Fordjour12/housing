import { getListing } from "@/actions/server/listing";

export default async function EditListingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const listing = await getListing(id);

	return <div>EditListingPage {listing.data?.title}</div>;
}

// "use client";

// import { ListingForm } from "@/app/prty-man/listings/components/listing-form";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { z } from "zod";
// import { getListing, updateListing } from "@/actions/server/listing";
// import { useEffect, useState } from "react";
// import type { Listing } from "@/schema/listings";

// interface PageProps {
// 	params: Promise<{ id: string }>;
// }

// const formSchema = z.object({
// 	title: z.string().min(1, "Title is required"),
// 	description: z.string().min(1, "Description is required"),
// 	price: z.string().min(1, "Price is required"),
// 	bedrooms: z.string().min(1, "Bedrooms is required"),
// 	bathrooms: z.string().min(1, "Bathrooms is required"),
// 	squareFeet: z.string().min(1, "Square feet is required"),
// 	address: z.string().min(1, "Address is required"),
// 	city: z.string().min(1, "City is required"),
// 	state: z.string().min(1, "State is required"),
// 	zipCode: z.string().min(1, "Zip code is required"),
// 	status: z.enum(["active", "pending", "inactive"]),
// 	isAvailable: z.boolean(),
// });

// export async function generateStaticParams() {
// 	// Fetch all listing IDs for static generation
// 	const listings = await getListing(); // Make sure this fetches all listings

// 	return listings.map((listing) => ({
// 		id: listing.id.toString(),
// 	}));
// }

// export default function EditListingPage({ params }: PageProps) {
// 	const router = useRouter();
// 	const [listing, setListing] = useState<Listing | null>(null);
// 	const [error, setError] = useState<string | null>(null);

// 	useEffect(() => {
// 		const fetchListing = async () => {
// 			try {
// 				const { data } = await getListing(params.id);
// 				if (!data) {
// 					setError("Listing not found");
// 					return;
// 				}
// 				setListing(data);
// 			} catch (err) {
// 				setError(
// 					err instanceof Error ? err.message : "Failed to fetch listing",
// 				);
// 			}
// 		};

// 		fetchListing();
// 	}, [params.id]);

// 	const onSubmit = async (values: z.infer<typeof formSchema>) => {
// 		try {
// 			await updateListing(params.id, {
// 				...values,
// 				price: Number.parseFloat(values.price).toString(),
// 				bedrooms: Number.parseInt(values.bedrooms),
// 				bathrooms: Number.parseInt(values.bathrooms),
// 				squareFeet: Number.parseInt(values.squareFeet),
// 			});

// 			toast.success("Listing updated successfully");
// 			router.push("/prty-man/listings");
// 		} catch (error) {
// 			toast.error(
// 				error instanceof Error ? error.message : "Failed to update listing",
// 			);
// 		}
// 	};

// 	if (error) {
// 		return (
// 			<div className="flex h-[450px] w-full items-center justify-center">
// 				<div className="text-center">
// 					<h2 className="text-lg font-semibold">Error</h2>
// 					<p className="text-sm text-muted-foreground">{error}</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (!listing) {
// 		return (
// 			<div className="flex h-[450px] w-full items-center justify-center">
// 				<div className="text-center">
// 					<h2 className="text-lg font-semibold">Loading...</h2>
// 					<p className="text-sm text-muted-foreground">
// 						Please wait while we fetch the listing details
// 					</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="container mx-auto py-10">
// 			<div className="mb-6 flex items-center justify-between">
// 				<div className="flex items-center gap-4">
// 					<Link href="/prty-man/listings">
// 						<Button variant="ghost" size="icon" className="h-8 w-8">
// 							←
// 						</Button>
// 					</Link>
// 					<div>
// 						<h1 className="text-2xl font-semibold">Edit Listing</h1>
// 						<p className="text-sm text-muted-foreground">
// 							Update your property listing details
// 						</p>
// 					</div>
// 				</div>
// 			</div>
// 			<ListingForm onSubmit={onSubmit} initialData={listing} />
// 		</div>
// 	);
// }

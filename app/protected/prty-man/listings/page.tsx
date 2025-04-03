"use client";

import { DataTable } from "@/app/protected/prty-man/listings/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getListings } from "@/actions/server/listing";
import { useEffect, useState } from "react";
import type { Listing } from "@/schema/listings";
import { formatCurrency } from "@/lib/utils";

const columns = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }: { row: { original: Listing } }) => {
			return formatCurrency(row.original.price);
		},
	},
	{
		accessorKey: "bedrooms",
		header: "Bedrooms",
	},
	{
		accessorKey: "bathrooms",
		header: "Bathrooms",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }: { row: { original: Listing } }) => {
			return (
				row.original.status.charAt(0).toUpperCase() +
				row.original.status.slice(1)
			);
		},
	},
	{
		accessorKey: "isAvailable",
		header: "Available",
		cell: ({ row }: { row: { original: Listing } }) => {
			return row.original.isAvailable ? "Yes" : "No";
		},
	},
	{
		id: "actions",
		cell: ({ row }: { row: { original: Listing } }) => {
			return (
				<div className="flex items-center gap-2">
					<Link href={`/prty-man/listings/${row.original.id}/edit`}>
						<Button variant="outline" size="sm">
							Edit
						</Button>
					</Link>
					<Link href={`/prty-man/listings/${row.original.id}`}>
						<Button variant="outline" size="sm">
							View
						</Button>
					</Link>
				</div>
			);
		},
	},
];

export default function ListingsPage() {
	const [listings, setListings] = useState<Listing[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const { data } = await getListings();
				setListings(data ?? []);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch listings",
				);
			}
		};

		fetchListings();
	}, []);

	if (error) {
		return (
			<div className="flex h-[450px] w-full items-center justify-center">
				<div className="text-center">
					<h2 className="text-lg font-semibold">Error</h2>
					<p className="text-sm text-muted-foreground">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<div className="mb-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/prty-man">
						<Button variant="ghost" size="icon" className="h-8 w-8">
							←
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-semibold">Listings</h1>
						<p className="text-sm text-muted-foreground">
							Manage your property listings
						</p>
					</div>
				</div>
				<Link href="/prty-man/listings/new">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						New Listing
					</Button>
				</Link>
			</div>
			<DataTable columns={columns} data={listings} />
		</div>
	);
}

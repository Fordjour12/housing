import type { ColumnDef } from "@tanstack/react-table";
import type { Listing } from "@/schema/listings";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<Listing>[] = [
	{
		accessorKey: "title",
		header: "Title",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => formatCurrency(row.getValue("price")),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("status")}</div>
		),
	},
	{
		accessorKey: "isAvailable",
		header: "Available",
		cell: ({ row }) => (
			<div className="capitalize">
				{row.getValue("isAvailable") ? "Yes" : "No"}
			</div>
		),
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const listing = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem asChild>
							<Link href={`/prty-man/listings/${listing.id}/edit`}>
								<Pencil className="mr-2 h-4 w-4" />
								Edit
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="text-destructive">
							<Trash className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

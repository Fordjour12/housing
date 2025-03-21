"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Building, Users, Settings, LogOut } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function LandlordHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link
						href="/landlord"
						className="flex items-center gap-2 hover:opacity-80 transition-opacity"
					>
						<Building className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							Landlord Portal
						</span>
					</Link>
				</div>

				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="/landlord"
						className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
					>
						<Home className="h-4 w-4" />
						Dashboard
					</Link>
					<Link
						href="/landlord/listings"
						className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
					>
						<Building className="h-4 w-4" />
						Listings
					</Link>
					<Link
						href="/landlord/tenants"
						className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
					>
						<Users className="h-4 w-4" />
						Tenants
					</Link>
					<Link
						href="/landlord/settings"
						className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
					>
						<Settings className="h-4 w-4" />
						Settings
					</Link>
				</nav>

				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" className="hover:text-primary">
						<LogOut className="h-5 w-5" />
						<span className="sr-only">Log out</span>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}

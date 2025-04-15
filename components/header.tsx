"use client";

import Link from "next/link";
import { Home, LayoutDashboard, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "./signout";

interface HeaderProps {
	user?: {
		name?: string | null;
		image?: string | null;
		email?: string | null;
	} | null;
}

export default function Header({ user }: HeaderProps) {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<Home className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">RentEasy</span>
					</Link>
				</div>
				<nav className="hidden md:flex gap-6">
					{user ? (
						<>
							<Link
								href="/listings"
								className="text-sm font-medium hover:text-primary"
							>
								Listings
							</Link>
							<Link
								href="/saved"
								className="text-sm font-medium hover:text-primary"
							>
								Saved
							</Link>
							<Link
								href="/applications"
								className="text-sm font-medium hover:text-primary"
							>
								Applications
							</Link>
						</>
					) : (
						<>
							<Link
								href="#features"
								className="text-sm font-medium hover:text-primary"
							>
								Features
							</Link>
							<Link
								href="#how-it-works"
								className="text-sm font-medium hover:text-primary"
							>
								How It Works
							</Link>
							<Link
								href="/listings"
								className="text-sm font-medium hover:text-primary"
							>
								Listings
							</Link>
						</>
					)}
				</nav>
				<div className="flex items-center gap-4">
					{user ? (
						<>
							{/* <Link href="/messages" className="relative">
								<MessageSquare className="h-5 w-5" />
								{unreadMessageCount > 0 && (
									<Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
										{unreadMessageCount}
									</Badge>
								)}
								<span className="sr-only">Messages</span>
							</Link>

							<NotificationSheet /> */}

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="rounded-full cursor-pointer"
									>
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={user.image || undefined}
												alt={user.name || "User"}
											/>
											<AvatarFallback>
												{user.name?.charAt(0) || "U"}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel className="flex flex-col gap-1">
										My Account
										<span className="text-xs text-muted-foreground">
											{user.email}
										</span>
									</DropdownMenuLabel>

									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/dashboard">
											<LayoutDashboard className="mr-2 size-4" />
											<span>Dashboard</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/account">
											<User className="mr-2 size-4" />
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/settings">
											<Settings className="mr-2 size-4" />
											<span>Settings</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<SignOut />
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<>
							<Link
								href="/login"
								className="text-sm font-medium hover:text-primary hidden sm:inline-flex"
							>
								Log in
							</Link>
							<Button asChild size="sm">
								<Link href="/register">Sign up</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

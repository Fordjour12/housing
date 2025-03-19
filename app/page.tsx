"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Search,
	Home,
	Shield,
	DollarSign,
	ArrowRight,
	MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";

export default function LandingPage() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Header */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
						<Home className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							RentEasy
						</span>
					</div>
					<nav className="hidden md:flex gap-6">
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
							href="#listings"
							className="text-sm font-medium hover:text-primary"
						>
							Listings
						</Link>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							href="/messages"
							className="relative text-sm font-medium hover:text-primary hidden sm:inline-flex"
						>
							<MessageSquare className="h-5 w-5" />
							<Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
								3
							</Badge>
							<span className="sr-only">Messages</span>
						</Link>
						<Link
							href="/login"
							className="text-sm font-medium hover:text-primary hidden sm:inline-flex"
						>
							Log in
						</Link>
						<Button asChild size="sm">
							<Link href="/register">Sign up</Link>
						</Button>
						<ModeToggle />
					</div>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative">
					<div className="absolute inset-0 z-0">
						<Image
							src="/placeholder.svg?height=800&width=1600"
							alt="Rental properties"
							fill
							className="object-cover brightness-[0.7]"
							priority
						/>
					</div>
					<div className="container relative z-10 py-24 md:py-32 lg:py-40">
						<div className="max-w-3xl space-y-6 text-white backdrop-blur-sm bg-black/30 p-8 rounded-xl border border-white/10">
							<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
								Find Affordable, Long-Term Rentals in Your Area
							</h1>
							<p className="text-lg md:text-xl text-white/90">
								We connect renters with verified landlords offering
								month-to-month and longer leases at prices you can afford.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 pt-6">
								<Button
									size="lg"
									className="w-full sm:w-auto h-14 px-8 text-lg font-medium"
								>
									<Link href="/listings">Search Rentals Now</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="w-full sm:w-auto h-14 px-8 text-lg font-medium bg-white/10 hover:bg-white/20 text-white border-white/20"
								>
									List Your Property
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Search Section */}
				<section className="bg-muted py-12">
					<div className="container">
						<div className="mx-auto max-w-4xl rounded-xl bg-background p-8 shadow-lg -mt-24 relative z-20 border">
							<h2 className="text-2xl font-bold mb-6">
								Find Your Perfect Rental
							</h2>
							<div className="flex flex-col md:flex-row gap-6">
								<div className="flex-1">
									<Input
										placeholder="Enter location (city, neighborhood)"
										className="h-14 text-lg px-6"
									/>
								</div>
								<Button className="h-14 px-8 text-lg font-medium w-full md:w-auto">
									<Search className="mr-3 h-5 w-5" />
									Search
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-24 md:py-32">
					<div className="container">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
								Why Choose RentEasy?
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Our platform makes finding and renting properties simple,
								affordable, and stress-free.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="group flex flex-col items-center text-center p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
								<div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
									<DollarSign className="h-8 w-8" />
								</div>
								<h3 className="text-xl font-bold mb-2">Affordable Options</h3>
								<p className="text-muted-foreground">
									Find rentals that fit your budget with transparent pricing and
									no hidden fees.
								</p>
							</div>

							<div className="group flex flex-col items-center text-center p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
								<div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
									<Shield className="h-8 w-8" />
								</div>
								<h3 className="text-xl font-bold mb-2">Verified Landlords</h3>
								<p className="text-muted-foreground">
									Rent with confidence knowing all landlords on our platform
									have been verified.
								</p>
							</div>

							<div className="group flex flex-col items-center text-center p-8 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
								<div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
									<Search className="h-8 w-8" />
								</div>
								<h3 className="text-xl font-bold mb-2">Easy Search</h3>
								<p className="text-muted-foreground">
									Discover your next home in minutes with our powerful and
									intuitive search tools.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Featured Listings Section */}
				<section id="listings" className="py-24 md:py-32 bg-muted">
					<div className="container">
						<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center sm:text-left">
								Featured Listings
							</h2>
							<Button variant="outline" asChild className="w-full sm:w-auto">
								<Link
									href="/listings"
									className="flex items-center justify-center"
								>
									View all listings
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="group rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
								>
									<div className="relative h-48">
										<Image
											src={`/placeholder.svg?height=400&width=600&text=Property ${i}`}
											alt={`Property ${i}`}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<div className="p-6">
										<div className="flex justify-between items-start mb-3">
											<h3 className="text-lg font-bold">
												Cozy {i} Bedroom Apartment
											</h3>
											<span className="font-bold text-primary">
												${800 + i * 200}/mo
											</span>
										</div>
										<p className="text-muted-foreground text-sm mb-4">
											Downtown, City Center
										</p>
										<div className="flex items-center text-sm text-muted-foreground">
											<span className="mr-4">{i} bed</span>
											<span className="mr-4">{i} bath</span>
											<span>{650 + i * 150} sqft</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section id="how-it-works" className="py-24 md:py-32 bg-muted/50">
					<div className="container">
						<div className="text-center mb-16">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
								How It Works
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Finding your next rental home is simple with our easy three-step
								process.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-12">
							<div className="relative">
								<div
									className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-primary/20 hidden md:block"
									aria-hidden="true"
								/>
								<div className="relative flex items-start group">
									<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold relative z-10 shadow-lg">
										1
									</div>
									<div className="ml-6 mt-2">
										<h3 className="text-xl font-bold mb-3">Search</h3>
										<p className="text-muted-foreground">
											Enter your location and preferences to browse available
											rentals in your area.
										</p>
									</div>
								</div>
							</div>

							<div className="relative">
								<div
									className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-primary/20 hidden md:block"
									aria-hidden="true"
								/>
								<div className="relative flex items-start group">
									<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold relative z-10 shadow-lg">
										2
									</div>
									<div className="ml-6 mt-2">
										<h3 className="text-xl font-bold mb-3">Connect</h3>
										<p className="text-muted-foreground">
											Message verified landlords directly through our platform
											to ask questions or schedule viewings.
										</p>
									</div>
								</div>
							</div>

							<div className="relative">
								<div className="relative flex items-start group">
									<div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold relative z-10 shadow-lg">
										3
									</div>
									<div className="ml-6 mt-2">
										<h3 className="text-xl font-bold mb-3">Rent</h3>
										<p className="text-muted-foreground">
											Complete the application process and secure your new home
											with confidence.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-primary text-primary-foreground py-24 md:py-32">
					<div className="container text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
							Ready to Find Your Next Home?
						</h2>
						<p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-10">
							Join thousands of happy renters who found their perfect home on
							RentEasy.
						</p>
						<div className="flex flex-col sm:flex-row gap-6 justify-center">
							<Button
								size="lg"
								variant="secondary"
								className="w-full sm:w-auto h-14 px-8 text-lg font-medium"
							>
								<Link href="/listings">Search Rentals Now</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto h-14 px-8 text-lg font-medium bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
							>
								List Your Property
							</Button>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t py-12">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="md:col-span-2">
							<div className="flex items-center gap-2 mb-6">
								<Home className="h-6 w-6 text-primary" />
								<span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
									RentEasy
								</span>
							</div>
							<p className="text-muted-foreground max-w-xs text-base">
								Making long-term rentals accessible, affordable, and stress-free
								for everyone.
							</p>
						</div>
						<div>
							<h3 className="font-bold mb-4">Quick Links</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										Search Rentals
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										List a Property
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										How It Works
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										About Us
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold mb-4">Legal</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-muted-foreground hover:text-primary"
									>
										Cookie Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t text-center text-muted-foreground">
						<p>© {new Date().getFullYear()} RentEasy. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

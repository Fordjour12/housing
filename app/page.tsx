// "use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Home, Shield, DollarSign, ArrowRight } from "lucide-react";
import Header from "@/components/header";
// import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type User = {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image: string;
};

export default async function LandingPage() {
	const session = await auth.api.getSession({headers:await headers()})
	const user  = session?.user as User | null

	// const [user, setUser] = useState<User | null>(null);

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		try {
	// 			const session = await authClient.getSession();
	// 			setUser(session.data?.user as User);
	// 		} catch (error) {
	// 			console.error("Failed to fetch user session:", error);
	// 		}
	// 	};

	// 	fetchUser();
	// }, []);

	return (
		<div className="flex min-h-screen flex-col">
			<main className="flex-1">
				{/* Hero Section */}
				<Header user={user} />
				<section className="relative">
					<div className="absolute inset-0 z-0">
						<Image
							src="/housing-1.jpg?height=800&width=1600"
							alt="Rental properties"
							fill
							className="object-cover brightness-[0.7]"
							priority
						/>
					</div>
					<div className="container relative z-10 py-24 md:py-32 lg:py-40">
						<div className="max-w-3xl mx-auto space-y-5 text-white">
							<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
								Find Affordable, Long-Term Rentals in Your Area
							</h1>
							<p className="text-lg md:text-xl text-white/90">
								We connect renters with verified landlords offering
								month-to-month and longer leases at prices you can afford.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 pt-4">
								<Button size="lg" className="w-full sm:w-auto">
									<Link href="/listings">Search Rentals Now</Link>
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
								>
									List Your Property
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Search Section */}
				<section className="bg-muted py-12">
					<div className="container mx-auto">
						<div className="max-w-4xl mx-auto rounded-xl bg-background p-6 shadow-lg -mt-20 relative z-20">
							<h2 className="text-2xl font-bold mb-4">
								Find Your Perfect Rental
							</h2>
							<div className="flex flex-col md:flex-row gap-4">
								<div className="flex-1">
									<Input
										placeholder="Enter location (city, neighborhood)"
										className="h-12"
									/>
								</div>
								<div className="flex gap-4">
									<Button className="h-12 px-6">
										<Search className="mr-2 h-4 w-4" />
										Search
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section id="features" className="py-16 md:py-24">
					<div className="container mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
								Why Choose RentEasy?
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Our platform makes finding and renting properties simple,
								affordable, and stress-free.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
								<div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<DollarSign className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-bold mb-2">Affordable Options</h3>
								<p className="text-muted-foreground">
									Find rentals that fit your budget with transparent pricing and
									no hidden fees.
								</p>
							</div>

							<div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
								<div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<Shield className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-bold mb-2">Verified Landlords</h3>
								<p className="text-muted-foreground">
									Rent with confidence knowing all landlords on our platform
									have been verified.
								</p>
							</div>

							<div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
								<div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
									<Search className="h-6 w-6" />
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
				<section id="listings" className="py-16 md:py-24 bg-muted">
					<div className="container mx-auto">
						<div className="flex justify-between items-center mb-12">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								Featured Listings
							</h2>
							<Button variant="outline" asChild>
								<Link href="/listings">
									View all listings
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="rounded-lg overflow-hidden border bg-card"
								>
									<div className="relative h-48">
										<Image
											src={`/placeholder.svg?height=400&width=600&text=Property ${i}`}
											alt={`Property ${i}`}
											fill
											className="object-cover"
										/>
									</div>
									<div className="p-4">
										<div className="flex justify-between items-start mb-2">
											<h3 className="text-lg font-bold">
												Cozy {i} Bedroom Apartment
											</h3>
											<span className="font-bold text-primary">
												${800 + i * 200}/mo
											</span>
										</div>
										<p className="text-muted-foreground text-sm mb-3">
											Downtown, City Center
										</p>
										<div className="flex items-center text-sm text-muted-foreground">
											<span className="mr-3">{i} bed</span>
											<span className="mr-3">{i} bath</span>
											<span>{650 + i * 150} sqft</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section id="how-it-works" className="py-16 md:py-24">
					<div className="container mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
								How It Works
							</h2>
							<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
								Finding your next rental home is simple with our easy three-step
								process.
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<div className="relative">
								<div
									className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-muted hidden md:block"
									aria-hidden="true"
								/>
								<div className="relative flex items-start group">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold relative z-10">
										1
									</div>
									<div className="ml-4 mt-1">
										<h3 className="text-xl font-bold mb-2">Search</h3>
										<p className="text-muted-foreground">
											Enter your location and preferences to browse available
											rentals in your area.
										</p>
									</div>
								</div>
							</div>

							<div className="relative">
								<div
									className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-muted hidden md:block"
									aria-hidden="true"
								/>
								<div className="relative flex items-start group">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold relative z-10">
										2
									</div>
									<div className="ml-4 mt-1">
										<h3 className="text-xl font-bold mb-2">Connect</h3>
										<p className="text-muted-foreground">
											Message verified landlords directly through our platform
											to ask questions or schedule viewings.
										</p>
									</div>
								</div>
							</div>

							<div className="relative">
								<div className="relative flex items-start group">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold relative z-10">
										3
									</div>
									<div className="ml-4 mt-1">
										<h3 className="text-xl font-bold mb-2">Rent</h3>
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
				<section className="bg-primary/80 text-primary-foreground py-16 md:py-24">
					<div className="container text-center">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
							Ready to Find Your Next Home?
						</h2>
						<p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
							Join thousands of happy renters who found their perfect home on
							RentEasy.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary">
								<Link href="/listings">Search Rentals Now</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
							>
								List Your Property
							</Button>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t py-12">
				<div className="container mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div className="md:col-span-2">
							<div className="flex items-center gap-2 mb-4">
								<Home className="h-6 w-6 text-primary" />
								<span className="text-xl font-bold">RentEasy</span>
							</div>
							<p className="text-muted-foreground max-w-xs">
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

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "RentEasy - Find Your Perfect Rental",
		template: "%s | RentEasy",
	},
	description: "Find affordable, long-term rentals in your area with RentEasy.",
	icons: {
		icon: [
			{
				url: "/icon?size=32",
				sizes: "32x32",
				type: "image/png",
			},
			{
				url: "/icon?size=192",
				sizes: "192x192",
				type: "image/png",
			},
			{
				url: "/icon?size=512",
				sizes: "512x512",
				type: "image/png",
			},
		],
		shortcut: ["/icon?size=32"],
		apple: [
			{
				url: "/apple-icon?size=180",
				sizes: "180x180",
				type: "image/png",
			},
		],
	},
	manifest: "/manifest",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "RentEasy",
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: "RentEasy",
		title: {
			default: "RentEasy - Find Your Perfect Rental",
			template: "%s | RentEasy",
		},
		description:
			"Find affordable, long-term rentals in your area with RentEasy.",
	},
	twitter: {
		card: "summary_large_image",
		title: {
			default: "RentEasy - Find Your Perfect Rental",
			template: "%s | RentEasy",
		},
		description:
			"Find affordable, long-term rentals in your area with RentEasy.",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					async
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				/>
			</head>
			<body className={cn(geistSans.variable, geistMono.variable)}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}

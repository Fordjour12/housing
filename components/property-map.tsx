"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { initGoogleMaps, geocodeAddress } from "@/app/services/geocoding";

interface PropertyMapProps {
	address: string;
	className?: string;
}

export default function PropertyMap({
	address,
	className = "",
}: PropertyMapProps) {
	const mapRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const initMap = async () => {
			if (!mapRef.current) return;

			try {
				// Initialize Google Maps using the service
				const maps = await initGoogleMaps(
					process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
				);

				// Get coordinates using the geocoding service
				const location = await geocodeAddress(address);

				// Create the map instance
				const map = new maps.Map(mapRef.current, {
					center: location,
					zoom: 15,
					disableDefaultUI: true,
					zoomControl: true,
				});

				// Add marker
				new maps.Marker({
					map,
					position: location,
					title: address,
				});

				setLoading(false);
			} catch (err) {
				console.error("Error initializing map:", err);
				setError(err instanceof Error ? err.message : "Failed to load map");
				setLoading(false);
			}
		};

		initMap();
	}, [address]);

	if (error) {
		return (
			<div
				className={`flex items-center justify-center h-[300px] bg-muted ${className}`}
			>
				<p className="text-sm text-muted-foreground">{error}</p>
			</div>
		);
	}

	if (loading) {
		return <Skeleton className={`h-[300px] ${className}`} />;
	}

	return <div ref={mapRef} className={`h-[300px] ${className}`} />;
}

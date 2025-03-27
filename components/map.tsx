"use client";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useCallback, useMemo } from "react";

const containerStyle = {
	width: "100%",
	height: "500px",
};

const center = { lat: 5.6037, lng: -0.187 };

const locations = [
	{ id: "accra", lat: 5.6037, lng: -0.187, title: "Accra, Ghana" },
	{ id: "lagos", lat: 6.5244, lng: 3.3792, title: "Lagos, Nigeria" },
	{ id: "nairobi", lat: -1.2921, lng: 36.8219, title: "Nairobi, Kenya" },
];

export default function GoogleMapComponent() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
		libraries: ["places"],
	});

	const mapOptions = useMemo(
		() => ({
			disableDefaultUI: false,
			clickableIcons: true,
			scrollwheel: true,
		}),
		[],
	);

	const onLoad = useCallback((map) =
    > {
		const bounds = new window.google.maps.LatLngBounds();
		for (const { lat, lng } of locations) {
			bounds.extend({ lat, lng });
		}
		map.fitBounds(bounds);
	}, []);

	if (loadError) {
		return (
			<div className="flex items-center justify-center h-[500px] bg-muted">
				<div className="text-center">
					<h3 className="text-lg font-semibold">Error Loading Map</h3>
					<p className="text-muted-foreground">
						Please check your internet connection and try again
					</p>
				</div>
			</div>
		);
	}

	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center h-[500px] bg-muted">
				<div className="text-center">
					<h3 className="text-lg font-semibold">Loading Map...</h3>
					<p className="text-muted-foreground">Please wait</p>
				</div>
			</div>
		);
	}

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={5}
			options={mapOptions}
			onLoad={onLoad}
		>
			{locations.map((location) => (
				<MarkerF
					key={location.id}
					position={{ lat: location.lat, lng: location.lng }}
					title={location.title}
				/>
			))}
		</GoogleMap>
	);
}

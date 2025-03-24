"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	InfoWindow,
	DrawingManager,
	Circle,
	Polygon,
} from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";

// Define the container style for the map
const containerStyle = {
	width: "100%",
	height: "100%",
};

// Default center (Houston, TX)
const defaultCenter = {
	lat: 29.7604,
	lng: -95.3698,
};

// Types for our properties
export interface PropertyLocation {
	id: number | string;
	title: string;
	address: string;
	lat: number;
	lng: number;
	price?: number;
	beds?: number;
	baths?: number;
	sqft?: number;
	image?: string;
}

interface CircleCoordinate {
	lat: number;
	lng: number;
	radius: number; // in miles
}

interface PolygonCoordinate {
	lat: number;
	lng: number;
}

type AreaDrawnEvent =
	| {
			type: "circle";
			coordinates: CircleCoordinate[];
	  }
	| {
			type: "polygon";
			coordinates: PolygonCoordinate[];
	  };

type POIType =
	| "restaurant"
	| "grocery"
	| "park"
	| "school"
	| "transit"
	| "hospital";

interface POIMarker {
	id: string;
	position: google.maps.LatLng;
	type: POIType;
	name: string;
	icon: string;
}

interface GoogleMapComponentProps {
	properties: PropertyLocation[];
	height?: string;
	zoom?: number;
	center?: { lat: number; lng: number };
	onMarkerClick?: (property: PropertyLocation) => void;
	highlightedProperty?: number | string | null;
	className?: string;
	drawingMode?: "none" | "circle" | "polygon";
	onAreaDrawn?: (area: AreaDrawnEvent) => void;
	showPOI?: boolean;
	poiTypes?: Array<
		"restaurant" | "grocery" | "park" | "school" | "transit" | "hospital"
	>;
}

// Libraries to load
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = [
	"places",
	"drawing",
	"geometry",
];

// Declare google variable
declare global {
	interface Window {
		google: typeof google;
	}
}

export default function GoogleMapComponent({
	properties,
	height = "400px",
	zoom = 12,
	center,
	onMarkerClick,
	highlightedProperty = null,
	className = "",
	drawingMode = "none",
	onAreaDrawn,
	showPOI = false,
	poiTypes = [],
}: GoogleMapComponentProps) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
		libraries,
	});

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [selectedProperty, setSelectedProperty] =
		useState<PropertyLocation | null>(null);
	const [mapCenter, setMapCenter] = useState(center || defaultCenter);
	const [mapZoom, setMapZoom] = useState(zoom);
	const mapRef = useRef<google.maps.Map | null>(null);
	const [drawingManager, setDrawingManager] =
		useState<google.maps.drawing.DrawingManager | null>(null);
	const [drawnShape, setDrawnShape] = useState<
		google.maps.Circle | google.maps.Polygon | null
	>(null);
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);
	const [poiMarkers, setPoiMarkers] = useState<POIMarker[]>([]);

	// Update map center and zoom when props change
	useEffect(() => {
		if (center) {
			setMapCenter(center);
		}
		if (zoom) {
			setMapZoom(zoom);
		}
	}, [center, zoom]);

	// Update selected property when highlightedProperty changes
	useEffect(() => {
		if (highlightedProperty !== null) {
			const property =
				properties.find((p) => p.id === highlightedProperty) || null;
			setSelectedProperty(property);

			// Center map on highlighted property
			if (property && map) {
				map.panTo({ lat: property.lat, lng: property.lng });
			}
		} else {
			setSelectedProperty(null);
		}
	}, [highlightedProperty, properties, map]);

	// Fit bounds to show all markers when properties change
	useEffect(() => {
		if (map && properties.length > 0) {
			const bounds = new window.google.maps.LatLngBounds();
			for (const property of properties) {
				bounds.extend({ lat: property.lat, lng: property.lng });
			}
			map.fitBounds(bounds);
			// Don't zoom in too far
			const currentZoom = map.getZoom();
			if (currentZoom !== undefined && currentZoom > 15) {
				map.setZoom(15);
			}
		}
	}, [map, properties]);

	useEffect(() => {
		if (!map || !showPOI || poiTypes.length === 0) return;

		const service = new window.google.maps.places.PlacesService(map);
		setPlacesService(service);
		setPoiMarkers([]);

		const bounds = map.getBounds();
		if (!bounds) return;

		for (const type of poiTypes) {
			const request = {
				bounds,
				type: type.toLowerCase(),
			};

			service.nearbySearch(request, (results, status) => {
				if (
					status !== window.google.maps.places.PlacesServiceStatus.OK ||
					!results
				)
					return;

				const newMarkers: POIMarker[] = [];

				for (const place of results) {
					if (
						place &&
						place.geometry?.location instanceof google.maps.LatLng &&
						place.name &&
						place.place_id
					) {
						newMarkers.push({
							id: `${place.place_id}-${type}`,
							position: place.geometry.location,
							type: type as POIType,
							name: place.name,
							icon: getPoiIcon(type),
						});
					}
				}

				setPoiMarkers((prev) => [...prev, ...newMarkers]);
			});
		}
	}, [map, showPOI, poiTypes]);

	useEffect(() => {
		const clearShape = () => {
			if (drawnShape) {
				drawnShape.setMap(null);
				setDrawnShape(null);
			}
		};

		if (map && drawingManager) {
			clearShape();

			drawingManager.setOptions({
				drawingMode:
					drawingMode === "none"
						? null
						: drawingMode === "circle"
							? window.google.maps.drawing.OverlayType.CIRCLE
							: window.google.maps.drawing.OverlayType.POLYGON,
			});
		}
	}, [drawingMode, map, drawingManager, drawnShape]);

	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const clearShape = () => {
				if (drawnShape) {
					drawnShape.setMap(null);
					setDrawnShape(null);
				}
			};

			mapRef.current = map;
			setMap(map);

			const manager = new window.google.maps.drawing.DrawingManager({
				drawingMode: null,
				drawingControl: false,
				circleOptions: {
					fillColor: "#0070f3",
					fillOpacity: 0.2,
					strokeWeight: 2,
					strokeColor: "#0070f3",
					editable: true,
				},
				polygonOptions: {
					fillColor: "#0070f3",
					fillOpacity: 0.2,
					strokeWeight: 2,
					strokeColor: "#0070f3",
					editable: true,
				},
			});

			manager.setMap(map);
			setDrawingManager(manager);

			window.google.maps.event.addListener(
				manager,
				"circlecomplete",
				(circle: google.maps.Circle) => {
					clearShape();
					setDrawnShape(circle);

					const center = circle.getCenter();
					if (!center) return;

					const radius = circle.getRadius();
					if (onAreaDrawn) {
						onAreaDrawn({
							type: "circle",
							coordinates: [
								{
									lat: center.lat(),
									lng: center.lng(),
									radius: radius / 1609.34, // Convert meters to miles
								},
							],
						});
					}
				},
			);

			window.google.maps.event.addListener(
				manager,
				"polygoncomplete",
				(polygon: google.maps.Polygon) => {
					clearShape();
					setDrawnShape(polygon);

					const path = polygon.getPath();
					if (!path) return;

					const coordinates = path.getArray().map((coord) => ({
						lat: coord.lat(),
						lng: coord.lng(),
					}));
					if (onAreaDrawn) {
						onAreaDrawn({
							type: "polygon",
							coordinates,
						});
					}
				},
			);
		},
		[onAreaDrawn, drawnShape],
	);

	const getPoiIcon = (type: string): string => {
		const iconBase = "https://maps.google.com/mapfiles/kml/shapes";
		const icons: { [key: string]: string } = {
			restaurant: `${iconBase}/dining.png`,
			grocery: `${iconBase}/shopping.png`,
			park: `${iconBase}/parks.png`,
			school: `${iconBase}/schools.png`,
			transit: `${iconBase}/transit.png`,
			hospital: `${iconBase}/hospitals.png`,
		};
		return icons[type] || `${iconBase}/info-i_maps.png`;
	};

	const onUnmount = useCallback(() => {
		mapRef.current = null;
		setMap(null);
	}, []);

	const handleMarkerClick = (property: PropertyLocation) => {
		setSelectedProperty(property);
		if (onMarkerClick) {
			onMarkerClick(property);
		}
	};

	if (!isLoaded) {
		return (
			<div style={{ height }} className={`w-full ${className}`}>
				<Skeleton className="w-full h-full" />
			</div>
		);
	}

	return (
		<div style={{ height }} className={`w-full ${className}`}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCenter}
				zoom={mapZoom}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={{
					fullscreenControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					zoomControlOptions: {
						position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
					},
				}}
			>
				{/* Property markers */}
				{properties.map((property) => (
					<Marker
						key={property.id}
						position={{ lat: property.lat, lng: property.lng }}
						onClick={() => handleMarkerClick(property)}
						icon={{
							path: window.google.maps.SymbolPath.CIRCLE,
							scale: highlightedProperty === property.id ? 12 : 10,
							fillColor:
								highlightedProperty === property.id ? "#0070f3" : "#3B82F6",
							fillOpacity: 0.9,
							strokeColor: "white",
							strokeWeight: 2,
						}}
						animation={
							highlightedProperty === property.id
								? window.google.maps.Animation.BOUNCE
								: undefined
						}
					/>
				))}

				{/* POI markers */}
				{showPOI &&
					poiMarkers.map((marker) => (
						<Marker
							key={marker.id}
							position={marker.position}
							icon={{
								url: marker.icon,
								scaledSize: new window.google.maps.Size(24, 24),
							}}
							title={marker.name}
						/>
					))}

				{/* Property info window */}
				{selectedProperty && (
					<InfoWindow
						position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
						onCloseClick={() => setSelectedProperty(null)}
					>
						<div className="p-1 max-w-[250px]">
							<h3 className="font-medium text-sm">{selectedProperty.title}</h3>
							<p className="text-xs text-gray-600">
								{selectedProperty.address}
							</p>
							{selectedProperty.price && (
								<p className="text-sm font-bold mt-1">
									${selectedProperty.price}/mo
								</p>
							)}
							{(selectedProperty.beds ||
								selectedProperty.baths ||
								selectedProperty.sqft) && (
								<div className="flex text-xs gap-2 mt-1 text-gray-600">
									{selectedProperty.beds && (
										<span>{selectedProperty.beds} bd</span>
									)}
									{selectedProperty.baths && (
										<span>{selectedProperty.baths} ba</span>
									)}
									{selectedProperty.sqft && (
										<span>{selectedProperty.sqft} sqft</span>
									)}
								</div>
							)}
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}

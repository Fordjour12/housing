import { Loader } from "@googlemaps/js-api-loader"

let googleMapsLoader: Promise<typeof google.maps>

export async function initGoogleMaps(apiKey: string) {
  if (!googleMapsLoader) {
    const loader = new Loader({
      apiKey,
      version: "weekly",
      libraries: ["places", "geometry"],
    })
    googleMapsLoader = loader.load()
  }
  return googleMapsLoader
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
  const maps = await googleMapsLoader
  const geocoder = new maps.Geocoder()
  
  try {
    const result = await geocoder.geocode({ address })
    if (result.results[0]) {
      const location = result.results[0].geometry.location
      return {
        lat: location.lat(),
        lng: location.lng(),
      }
    }
    throw new Error("No results found")
  } catch (error) {
    console.error("Geocoding error:", error)
    throw error
  }
}

export async function calculateDistance(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  mode: google.maps.TravelMode
): Promise<{ distance: number; duration: number }> {
  const maps = await googleMapsLoader
  const service = new maps.DistanceMatrixService()

  try {
    const result = await service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: mode,
      unitSystem: maps.UnitSystem.IMPERIAL,
    })

    if (result.rows[0]?.elements[0]?.status === "OK") {
      return {
        distance: result.rows[0].elements[0].distance.value / 1609.34, // Convert meters to miles
        duration: result.rows[0].elements[0].duration.value / 60, // Convert seconds to minutes
      }
    }
    throw new Error("Route calculation failed")
  } catch (error) {
    console.error("Distance calculation error:", error)
    throw error
  }
}

// Fallback function for when Google Maps API is not available or for quick estimates
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Fallback function for estimating commute time
export function estimateCommuteTime(
  distance: number,
  mode: "driving" | "transit" | "walking" | "bicycling"
): number {
  const speeds = {
    driving: 30, // mph
    transit: 15,
    walking: 3,
    bicycling: 10,
  }
  return Math.round((distance / speeds[mode]) * 60) // Convert to minutes
} 
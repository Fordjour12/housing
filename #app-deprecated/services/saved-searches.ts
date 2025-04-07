import type { Listing, SavedSearch, SearchCriteria } from "@/types/search";
import { calculateHaversineDistance } from "@/app/services/geocoding";

export async function saveSearch(
	search: Omit<SavedSearch, "id" | "created">,
): Promise<SavedSearch> {
	// In a real application, this would make an API call to save the search
	// For now, we'll simulate it with localStorage
	const savedSearches = getSavedSearches();
	const newSearch: SavedSearch = {
		...search,
		id: Math.random().toString(36).substr(2, 9),
		created: new Date().toISOString(),
		lastNotified: new Date().toISOString(),
		newListings: 0,
	};

	savedSearches.push(newSearch);
	localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

	return newSearch;
}

export function getSavedSearches(): SavedSearch[] {
	// In a real application, this would make an API call to fetch saved searches
	// For now, we'll simulate it with localStorage
	const savedSearches = localStorage.getItem("savedSearches");
	return savedSearches ? JSON.parse(savedSearches) : [];
}

export function deleteSavedSearch(id: string): void {
	// In a real application, this would make an API call to delete the search
	const savedSearches = getSavedSearches().filter((search) => search.id !== id);
	localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
}

export function matchesSearchCriteria(
	listing: Listing,
	criteria: SearchCriteria,
): boolean {
	// Check location and radius
	if (criteria.location.coordinates && criteria.location.radius) {
		const distance = calculateHaversineDistance(
			criteria.location.coordinates.lat,
			criteria.location.coordinates.lng,
			listing.lat,
			listing.lng,
		);
		if (distance > criteria.location.radius) {
			return false;
		}
	}

	// Check price range
	if (criteria.priceRange) {
		if (
			(criteria.priceRange.min && listing.price < criteria.priceRange.min) ||
			(criteria.priceRange.max && listing.price > criteria.priceRange.max)
		) {
			return false;
		}
	}

	// Check bedrooms
	if (criteria.bedrooms?.length && !criteria.bedrooms.includes(listing.beds)) {
		return false;
	}

	// Check bathrooms
	if (
		criteria.bathrooms?.length &&
		!criteria.bathrooms.includes(listing.baths)
	) {
		return false;
	}

	// Check property type
	if (
		criteria.propertyTypes?.length &&
		!criteria.propertyTypes.includes(listing.propertyType)
	) {
		return false;
	}

	// Check amenities
	if (criteria.amenities?.length) {
		const hasAllAmenities = criteria.amenities.every((amenity) =>
			listing.amenities.includes(amenity),
		);
		if (!hasAllAmenities) {
			return false;
		}
	}

	// Check pet friendly
	if (
		criteria.petPolicy?.allowed !== undefined &&
		listing.petFriendly !== criteria.petPolicy.allowed
	) {
		return false;
	}

	return true;
}

export async function checkForNewListings(
	savedSearch: SavedSearch,
): Promise<number> {
	// In a real application, this would:
	// 1. Make an API call to fetch new listings since lastNotified
	// 2. Compare them against the search criteria
	// 3. Update the lastNotified timestamp
	// 4. Send notifications if enabled
	// For now, we'll just return a random number for demonstration
	return Math.floor(Math.random() * 5);
}

export function updateSavedSearch(search: SavedSearch): void {
	const savedSearches = getSavedSearches();
	const index = savedSearches.findIndex((s) => s.id === search.id);
	if (index !== -1) {
		savedSearches[index] = search;
		localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
	}
}

export async function setupEmailNotifications(
	searchId: string,
	enabled: boolean,
): Promise<void> {
	// In a real application, this would make an API call to update notification preferences
	const savedSearches = getSavedSearches();
	const search = savedSearches.find((s) => s.id === searchId);
	if (search) {
		search.emailNotifications = enabled;
		updateSavedSearch(search);
	}
}

export interface SavedSearch {
	id: string;
	name: string;
	criteria: SearchCriteria;
	lastNotified?: string;
	newListings?: number;
	created: string;
	emailNotifications: boolean;
}

export interface SearchCriteria {
	location: {
		address: string;
		coordinates?: {
			lat: number;
			lng: number;
		};
		radius?: number; // in miles
		customArea?: {
			type: "polygon" | "circle";
			coordinates: Array<{ lat: number; lng: number }>;
		};
	};
	priceRange?: {
		min?: number;
		max?: number;
	};
	bedrooms?: number[];
	bathrooms?: number[];
	propertyTypes?: string[];
	petPolicy?: {
		allowed: boolean;
		types?: Array<"dogs" | "cats" | "other">;
		restrictions?: string[];
	};
	parking?: Array<"covered" | "garage" | "street" | "none">;
	amenities?: Array<
		| "in-unit-laundry"
		| "dishwasher"
		| "balcony"
		| "pool"
		| "gym"
		| "elevator"
		| "wheelchair-access"
		| "furnished"
		| "air-conditioning"
		| "heating"
	>;
	utilities?: Array<"water" | "electricity" | "gas" | "internet" | "trash">;
	accessibility?: Array<
		"wheelchair" | "elevator" | "ground-floor" | "step-free"
	>;
	smokingPolicy?: "allowed" | "outside-only" | "not-allowed";
	furnished?: boolean;
	commute?: {
		to: {
			address: string;
			coordinates: {
				lat: number;
				lng: number;
			};
		};
		maxTime: number; // in minutes
		transportMode: "driving" | "transit" | "walking" | "bicycling";
	};
	pointsOfInterest?: Array<{
		type: "restaurant" | "grocery" | "park" | "school" | "transit" | "hospital";
		maxDistance: number; // in miles
	}>;
}

export interface SearchFilters extends SearchCriteria {
	sortBy?: "price-asc" | "price-desc" | "newest" | "closest";
	page?: number;
	limit?: number;
}

export interface SearchResult {
	total: number;
	page: number;
	limit: number;
	results: Listing[];
}

export interface Listing {
	id: number;
	title: string;
	address: string;
	price: number;
	beds: number;
	baths: number;
	sqft: number;
	petFriendly: boolean;
	image: string;
	lat: number;
	lng: number;
	minutes: number;
	propertyType: string;
	amenities: string[];
	distance?: number; // in miles
	commuteTime?: number; // in minutes
}

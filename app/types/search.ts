export interface SavedSearch {
  id: string
  name: string
  criteria: SearchCriteria
  lastNotified?: string
  newListings?: number
  created: string
  emailNotifications: boolean
}

export interface SearchCriteria {
  location: {
    address: string
    coordinates?: {
      lat: number
      lng: number
    }
    radius?: number // in miles
  }
  priceRange?: {
    min?: number
    max?: number
  }
  bedrooms?: number[]
  bathrooms?: number[]
  propertyTypes?: string[]
  amenities?: string[]
  petFriendly?: boolean
  commute?: {
    to: {
      address: string
      coordinates: {
        lat: number
        lng: number
      }
    }
    maxTime: number // in minutes
    transportMode: 'driving' | 'transit' | 'walking' | 'bicycling'
  }
}

export interface SearchFilters extends SearchCriteria {
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'closest'
  page?: number
  limit?: number
}

export interface SearchResult {
  total: number
  page: number
  limit: number
  results: Listing[]
}

export interface Listing {
  id: number
  title: string
  address: string
  price: number
  beds: number
  baths: number
  sqft: number
  petFriendly: boolean
  image: string
  lat: number
  lng: number
  minutes: number
  propertyType: string
  amenities: string[]
  distance?: number // in miles
  commuteTime?: number // in minutes
} 
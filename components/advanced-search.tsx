import type { SavedSearch, SearchCriteria } from "@/app/types/search"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Heart, MapPin, Save, Search } from "lucide-react"
import { useState } from "react"

interface AdvancedSearchProps {
  onSearch: (criteria: SearchCriteria) => void
  onSaveSearch: (search: Omit<SavedSearch, "id" | "created">) => void
  savedSearches?: SavedSearch[]
}

export default function AdvancedSearch({ onSearch, onSaveSearch, savedSearches = [] }: AdvancedSearchProps) {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    location: {
      address: "",
    },
    priceRange: {
      min: 0,
      max: 5000,
    },
    bedrooms: [],
    bathrooms: [],
    propertyTypes: [],
    amenities: [],
    petFriendly: false,
  })

  const [showCommuteSearch, setShowCommuteSearch] = useState(false)
  const [searchName, setSearchName] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)

  const handleSearch = () => {
    onSearch(searchCriteria)
  }

  const handleSaveSearch = () => {
    if (!searchName) return

    onSaveSearch({
      name: searchName,
      criteria: searchCriteria,
      emailNotifications,
    })

    setSearchName("")
  }

  const loadSavedSearch = (search: SavedSearch) => {
    setSearchCriteria(search.criteria)
    handleSearch()
  }

  return (
    <div className="space-y-4">
      {/* Location and Radius Search */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Enter address, neighborhood, or ZIP"
              className="pl-9"
              value={searchCriteria.location.address}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  location: { ...searchCriteria.location, address: e.target.value },
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Search Radius (miles)</Label>
          <Select
            value={searchCriteria.location.radius?.toString()}
            onValueChange={(value) =>
              setSearchCriteria({
                ...searchCriteria,
                location: { ...searchCriteria.location, radius: parseInt(value) },
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select radius" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 5, 10, 15, 20, 25, 50].map((radius) => (
                <SelectItem key={radius} value={radius.toString()}>
                  {radius} miles
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[0, 5000]}
            max={10000}
            step={100}
            value={[searchCriteria.priceRange?.min || 0, searchCriteria.priceRange?.max || 5000]}
            onValueChange={([min, max]) =>
              setSearchCriteria({
                ...searchCriteria,
                priceRange: { min, max },
              })
            }
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-muted-foreground">${searchCriteria.priceRange?.min}</span>
            <span className="text-sm text-muted-foreground">${searchCriteria.priceRange?.max}</span>
          </div>
        </div>
      </div>

      {/* Commute Search */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Commute Search</Label>
          <Switch checked={showCommuteSearch} onCheckedChange={setShowCommuteSearch} />
        </div>
        {showCommuteSearch && (
          <div className="grid gap-4 sm:grid-cols-2 mt-2">
            <div className="space-y-2">
              <Label>Destination</Label>
              <Input
                placeholder="Enter work/school address"
                value={searchCriteria.commute?.to.address || ""}
                onChange={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    commute: {
                      ...searchCriteria.commute,
                      to: {
                        address: e.target.value,
                        coordinates: await geocodeAddress(e.target.value) || { lat: 0, lng: 0 },
                      },
                      maxTime: searchCriteria.commute?.maxTime || 30,
                      transportMode: searchCriteria.commute?.transportMode || "driving",
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Max Commute Time</Label>
              <Select
                value={searchCriteria.commute?.maxTime?.toString()}
                onValueChange={(value) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    commute: {
                      ...searchCriteria.commute!,
                      maxTime: parseInt(value),
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {[15, 30, 45, 60, 90].map((time) => (
                    <SelectItem key={time} value={time.toString()}>
                      {time} minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Transport Mode</Label>
              <Select
                value={searchCriteria.commute?.transportMode}
                onValueChange={(value: "driving" | "transit" | "walking" | "bicycling") =>
                  setSearchCriteria({
                    ...searchCriteria,
                    commute: {
                      ...searchCriteria.commute!,
                      transportMode: value,
                    },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driving">Driving</SelectItem>
                  <SelectItem value="transit">Public Transit</SelectItem>
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="bicycling">Bicycling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Save Search */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Save Search</Label>
          <div className="flex items-center space-x-2">
            <Label htmlFor="notifications" className="text-sm">Email Notifications</Label>
            <Switch
              id="notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Name your search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant="outline" onClick={handleSaveSearch}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="space-y-2">
          <Label>Saved Searches</Label>
          <div className="grid gap-2">
            {savedSearches.map((search) => (
              <Button
                key={search.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => loadSavedSearch(search)}
              >
                <Heart className="h-4 w-4 mr-2" />
                {search.name}
                {search.newListings ? (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {search.newListings} new
                  </span>
                ) : null}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Search Button */}
      <Button className="w-full" onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search Properties
      </Button>
    </div>
  )
} 
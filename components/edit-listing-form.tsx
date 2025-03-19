"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, X, Upload, DollarSign, CheckCircle2, XCircle } from "lucide-react"

// Sample data for a listing
const LISTING_DATA = {
  id: 1,
  title: "Cozy 2 Bedroom Apartment",
  address: "123 Main St, Houston, TX",
  price: 1650,
  deposit: 1650,
  beds: 2,
  baths: 2,
  sqft: 1200,
  description:
    "Beautiful apartment in the heart of downtown with modern amenities and great views. This recently renovated unit features hardwood floors, stainless steel appliances, and a spacious living area. The building offers a fitness center, rooftop terrace, and 24-hour security. Located within walking distance to restaurants, shops, and public transportation.",
  status: "active",
  images: [
    "/placeholder.svg?height=400&width=600&text=Property 1",
    "/placeholder.svg?height=400&width=600&text=Kitchen",
    "/placeholder.svg?height=400&width=600&text=Bedroom",
    "/placeholder.svg?height=400&width=600&text=Bathroom",
  ],
  created: "2023-10-15",
  applications: 5,
  views: 120,
  amenities: [
    "Air Conditioning",
    "Dishwasher",
    "Washer/Dryer",
    "Hardwood Floors",
    "Balcony",
    "Fitness Center",
    "Parking",
    "Pet Friendly",
  ],
  propertyType: "apartment",
  leaseTerms: ["12 months", "6 months"],
  availableDate: "2023-12-01",
  petPolicy: {
    allowed: true,
    deposit: 300,
    rent: 25,
  },
  utilities: {
    water: "tenant",
    electricity: "tenant",
    gas: "tenant",
    internet: "tenant",
    trash: "landlord",
  },
}

export default function EditListingForm({ id }: { id: string }) {
  const [listing, setListing] = useState(LISTING_DATA)
  const [activeTab, setActiveTab] = useState("details")
  const [date, setDate] = useState<Date | undefined>(new Date(listing.availableDate))
  const [images, setImages] = useState(listing.images)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // Show success message or redirect
    }, 1500)
  }

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/landlord/listings" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Listings</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1">
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
          </Button>
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2 p-4 rounded-lg bg-muted">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              listing.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {listing.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs flex items-center gap-1"
          onClick={() => setListing({ ...listing, status: listing.status === "active" ? "inactive" : "active" })}
        >
          {listing.status === "active" ? (
            <>
              <XCircle className="h-3.5 w-3.5" />
              <span>Deactivate</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Activate</span>
            </>
          )}
        </Button>
        <div className="ml-auto text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Tabs and form */}
      <Tabs defaultValue="details" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="details">Property Details</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Availability</TabsTrigger>
          <TabsTrigger value="amenities">Amenities & Features</TabsTrigger>
          <TabsTrigger value="policies">Policies & Requirements</TabsTrigger>
        </TabsList>

        {/* Property Details Tab */}
        <TabsContent value="details" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={listing.title}
                    onChange={(e) => setListing({ ...listing, title: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={listing.address}
                    onChange={(e) => setListing({ ...listing, address: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={6}
                    value={listing.description}
                    onChange={(e) => setListing({ ...listing, description: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a detailed description of your property. Highlight key features, nearby amenities, and what
                    makes it special.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={listing.propertyType}
                      onValueChange={(value) => setListing({ ...listing, propertyType: value })}
                    >
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="beds">Bedrooms</Label>
                    <Select
                      value={listing.beds.toString()}
                      onValueChange={(value) => setListing({ ...listing, beds: Number.parseInt(value) })}
                    >
                      <SelectTrigger id="beds">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="baths">Bathrooms</Label>
                    <Select
                      value={listing.baths.toString()}
                      onValueChange={(value) => setListing({ ...listing, baths: Number.parseFloat(value) })}
                    >
                      <SelectTrigger id="baths">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="3.5">3.5+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="sqft">Square Footage</Label>
                  <Input
                    id="sqft"
                    type="number"
                    value={listing.sqft}
                    onChange={(e) => setListing({ ...listing, sqft: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Property Photos</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload high-quality photos of your property. The first image will be used as the main photo.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative rounded-md overflow-hidden border">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Property image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              Main Photo
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleImageRemove(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    <div className="aspect-square flex items-center justify-center border border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        <Upload className="h-6 w-6" />
                        <span className="text-xs">Upload</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Photo Tips</Label>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Use landscape orientation for better display</li>
                    <li>Ensure rooms are well-lit and tidy</li>
                    <li>Include photos of all rooms and special features</li>
                    <li>Add exterior shots and any outdoor spaces</li>
                    <li>Avoid using heavily filtered or edited images</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing & Availability Tab */}
        <TabsContent value="pricing" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Monthly Rent ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="price"
                        type="number"
                        className="pl-9"
                        value={listing.price}
                        onChange={(e) => setListing({ ...listing, price: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="deposit">Security Deposit ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="deposit"
                        type="number"
                        className="pl-9"
                        value={listing.deposit}
                        onChange={(e) => setListing({ ...listing, deposit: Number.parseInt(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="leaseTerms">Lease Terms</Label>
                  <div className="flex flex-wrap gap-2">
                    {["12 months", "6 months", "Month-to-month", "3 months", "24 months"].map((term) => (
                      <div key={term} className="flex items-center space-x-2">
                        <Checkbox
                          id={`term-${term}`}
                          checked={listing.leaseTerms.includes(term)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setListing({ ...listing, leaseTerms: [...listing.leaseTerms, term] })
                            } else {
                              setListing({ ...listing, leaseTerms: listing.leaseTerms.filter((t) => t !== term) })
                            }
                          }}
                        />
                        <label
                          htmlFor={`term-${term}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {term}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Available From</Label>
                  <div className="border rounded-md p-4">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Utilities</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(listing.utilities).map(([utility, responsible]) => (
                      <div key={utility} className="flex items-center justify-between">
                        <span className="capitalize">{utility}</span>
                        <Select
                          value={responsible}
                          onValueChange={(value) =>
                            setListing({
                              ...listing,
                              utilities: { ...listing.utilities, [utility]: value },
                            })
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="landlord">Landlord pays</SelectItem>
                            <SelectItem value="tenant">Tenant pays</SelectItem>
                            <SelectItem value="shared">Shared</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Amenities & Features Tab */}
        <TabsContent value="amenities" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Property Amenities</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Air Conditioning",
                      "Dishwasher",
                      "Washer/Dryer",
                      "Hardwood Floors",
                      "Balcony",
                      "Fitness Center",
                      "Parking",
                      "Pet Friendly",
                      "Pool",
                      "Elevator",
                      "Furnished",
                      "Wheelchair Access",
                      "Storage",
                      "Fireplace",
                      "Doorman",
                      "Yard",
                      "Garage",
                      "Security System",
                      "Patio",
                      "Roof Deck",
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={listing.amenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setListing({ ...listing, amenities: [...listing.amenities, amenity] })
                            } else {
                              setListing({ ...listing, amenities: listing.amenities.filter((a) => a !== amenity) })
                            }
                          }}
                        />
                        <label
                          htmlFor={`amenity-${amenity}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="customAmenities">Custom Amenities</Label>
                  <Textarea id="customAmenities" placeholder="Enter any additional amenities, separated by commas" />
                  <p className="text-xs text-muted-foreground">
                    Add any amenities not listed above. These will be displayed in the "Additional Features" section.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies & Requirements Tab */}
        <TabsContent value="policies" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label>Pet Policy</Label>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="petAllowed"
                      checked={listing.petPolicy.allowed}
                      onCheckedChange={(checked) => {
                        setListing({
                          ...listing,
                          petPolicy: { ...listing.petPolicy, allowed: !!checked },
                        })
                      }}
                    />
                    <label
                      htmlFor="petAllowed"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pets allowed
                    </label>
                  </div>

                  {listing.petPolicy.allowed && (
                    <div className="grid gap-4 sm:grid-cols-2 pl-6">
                      <div className="grid gap-2">
                        <Label htmlFor="petDeposit">Pet Deposit ($)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="petDeposit"
                            type="number"
                            className="pl-9"
                            value={listing.petPolicy.deposit}
                            onChange={(e) =>
                              setListing({
                                ...listing,
                                petPolicy: { ...listing.petPolicy, deposit: Number.parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="petRent">Monthly Pet Rent ($)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="petRent"
                            type="number"
                            className="pl-9"
                            value={listing.petPolicy.rent}
                            onChange={(e) =>
                              setListing({
                                ...listing,
                                petPolicy: { ...listing.petPolicy, rent: Number.parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="applicationRequirements">Application Requirements</Label>
                  <Textarea
                    id="applicationRequirements"
                    placeholder="Describe your application requirements (e.g., credit score, income requirements, background check)"
                    rows={4}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="additionalPolicies">Additional Policies</Label>
                  <Textarea
                    id="additionalPolicies"
                    placeholder="Enter any additional policies or rules for the property"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Include information about smoking policy, noise restrictions, guest policy, etc.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom actions */}
      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" asChild>
          <Link href="/landlord/listings">Cancel</Link>
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Saving..." : "Save Changes"}</span>
        </Button>
      </div>
    </div>
  )
}

function Eye({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Eye,
  Copy,
  Trash2,
  BedDouble,
  Bath,
  Square,
  Calendar,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data for listings
const LISTINGS_DATA = [
  {
    id: 1,
    title: "Cozy 2 Bedroom Apartment",
    address: "123 Main St, Houston, TX",
    price: 1650,
    deposit: 1650,
    beds: 2,
    baths: 2,
    sqft: 1200,
    description: "Beautiful apartment in the heart of downtown with modern amenities and great views.",
    status: "active",
    image: "/placeholder.svg?height=400&width=600&text=Property 1",
    created: "2023-10-15",
    applications: 5,
    views: 120,
  },
  {
    id: 2,
    title: "Modern 3 Bedroom House",
    address: "456 Oak Ave, Houston, TX",
    price: 2100,
    deposit: 2100,
    beds: 3,
    baths: 2,
    sqft: 1800,
    description: "Spacious family home with a large backyard, updated kitchen, and close to schools.",
    status: "active",
    image: "/placeholder.svg?height=400&width=600&text=Property 2",
    created: "2023-11-02",
    applications: 3,
    views: 85,
  },
  {
    id: 3,
    title: "Downtown Studio Apartment",
    address: "789 Center Blvd, Houston, TX",
    price: 1150,
    deposit: 1150,
    beds: 1,
    baths: 1,
    sqft: 650,
    description: "Compact and efficient studio apartment perfect for young professionals.",
    status: "inactive",
    image: "/placeholder.svg?height=400&width=600&text=Property 3",
    created: "2023-09-20",
    applications: 0,
    views: 45,
  },
  {
    id: 4,
    title: "Luxury 4 Bedroom Villa",
    address: "101 Park Lane, Houston, TX",
    price: 2950,
    deposit: 3000,
    beds: 4,
    baths: 3,
    sqft: 2500,
    description: "Elegant villa with premium finishes, pool, and entertainment area in a gated community.",
    status: "active",
    image: "/placeholder.svg?height=400&width=600&text=Property 4",
    created: "2023-11-10",
    applications: 2,
    views: 67,
  },
  {
    id: 5,
    title: "Charming 2 Bedroom Cottage",
    address: "202 Elm St, Houston, TX",
    price: 1750,
    deposit: 1750,
    beds: 2,
    baths: 1,
    sqft: 1100,
    description: "Quaint cottage with character, updated interior, and a lovely garden.",
    status: "inactive",
    image: "/placeholder.svg?height=400&width=600&text=Property 5",
    created: "2023-08-15",
    applications: 0,
    views: 30,
  },
]

export default function ListingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [activeTab, setActiveTab] = useState("all")

  const filteredListings = LISTINGS_DATA.filter((listing) => {
    // Filter by search term
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && listing.status === "active"
    if (activeTab === "inactive") return matchesSearch && listing.status === "inactive"

    return matchesSearch
  }).sort((a, b) => {
    // Sort listings
    if (sortBy === "newest") {
      return new Date(b.created).getTime() - new Date(a.created).getTime()
    }
    if (sortBy === "oldest") {
      return new Date(a.created).getTime() - new Date(b.created).getTime()
    }
    if (sortBy === "price-high") {
      return b.price - a.price
    }
    if (sortBy === "price-low") {
      return a.price - b.price
    }
    if (sortBy === "views") {
      return b.views - a.views
    }
    return 0
  })

  const activeCount = LISTINGS_DATA.filter((listing) => listing.status === "active").length
  const inactiveCount = LISTINGS_DATA.filter((listing) => listing.status === "inactive").length

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                <h3 className="text-3xl font-bold mt-1">{LISTINGS_DATA.length}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                <h3 className="text-3xl font-bold mt-1">{activeCount}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive Listings</p>
                <h3 className="text-3xl font-bold mt-1">{inactiveCount}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions and filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search listings..."
              className="pl-9 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>Oldest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("views")}>Most Viewed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>Add New Listing</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Listing</DialogTitle>
              <DialogDescription>
                Start creating a new property listing by entering the basic details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Property Title
                </label>
                <Input id="title" placeholder="e.g. Cozy 2 Bedroom Apartment" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Property Address
                </label>
                <Input id="address" placeholder="Full address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Monthly Rent ($)
                  </label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="deposit" className="text-sm font-medium">
                    Security Deposit ($)
                  </label>
                  <Input id="deposit" type="number" placeholder="0" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button asChild>
                <Link href="/landlord/listings/create">Continue</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs and listings */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Listings
            <Badge variant="secondary" className="ml-2">
              {LISTINGS_DATA.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <Badge variant="secondary" className="ml-2">
              {activeCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive
            <Badge variant="secondary" className="ml-2">
              {inactiveCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No listings found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <div className="grid gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No active listings found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="mt-0">
          <div className="grid gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No inactive listings found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ListingCard({ listing }: { listing: any }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/4 h-48 md:h-auto">
          <Image src={listing.image || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
          <Badge className={`absolute top-2 left-2 ${listing.status === "active" ? "bg-green-500" : "bg-gray-500"}`}>
            {listing.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{listing.title}</h3>
              <p className="text-muted-foreground">{listing.address}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/landlord/listings/edit/${listing.id}`} className="flex items-center">
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Listing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/listings/${listing.id}`} className="flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Listing</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Manage Availability</span>
                </DropdownMenuItem>
                {listing.status === "active" ? (
                  <DropdownMenuItem className="flex items-center">
                    <XCircle className="mr-2 h-4 w-4" />
                    <span>Deactivate</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    <span>Activate</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1" />
              {listing.beds} bd
            </span>
            <span className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {listing.baths} ba
            </span>
            <span className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              {listing.sqft.toLocaleString()} sqft
            </span>
          </div>

          <p className="mt-3 text-sm line-clamp-2">{listing.description}</p>

          <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex items-center">
              <span className="font-bold text-xl text-primary">${listing.price}</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{listing.views} views</span>
              <span>{listing.applications} applications</span>
              <span>Listed on {new Date(listing.created).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Camera, Download, Filter, Search, Upload } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for property media
const mediaItems = [
  {
    id: "img_1",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Living Room",
    item: "Walls",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_2",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Kitchen",
    item: "Countertops",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_3",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Bathroom",
    item: "Shower",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_4",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Bedroom",
    item: "Flooring",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_5",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Kitchen",
    item: "Sink",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_6",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Living Room",
    item: "Windows",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_7",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Bathroom",
    item: "Toilet",
    date: "March 1, 2025",
    status: "move-in",
  },
  {
    id: "img_8",
    type: "image",
    url: "/placeholder.svg?height=300&width=300",
    room: "Bedroom",
    item: "Closet",
    date: "March 1, 2025",
    status: "move-in",
  },
]

export default function MediaGalleryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [roomFilter, setRoomFilter] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null)

  // Filter media based on active tab, search query, and room filter
  const filteredMedia = mediaItems.filter((item) => {
    // Filter by tab
    if (activeTab !== "all" && item.status !== activeTab) {
      return false
    }

    // Filter by room
    if (roomFilter !== "all" && item.room !== roomFilter) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !item.room.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.item.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Get unique rooms for the filter dropdown
  const uniqueRooms = Array.from(new Set(mediaItems.map((item) => item.room)))

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=condition">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Property Condition
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Property Media Gallery</h2>
              <p className="text-muted-foreground">All photos and videos documenting your property's condition</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Media
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                  <DialogDescription>Add photos or videos to document your property's condition</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="media-upload">Select Files</Label>
                    <Input id="media-upload" type="file" accept="image/*,video/*" multiple />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="room">Room</Label>
                    <Select>
                      <SelectTrigger id="room">
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="living-room">Living Room</SelectItem>
                        <SelectItem value="kitchen">Kitchen</SelectItem>
                        <SelectItem value="bathroom">Bathroom</SelectItem>
                        <SelectItem value="bedroom">Bedroom</SelectItem>
                        <SelectItem value="other">Other Areas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="item">Item</Label>
                    <Select>
                      <SelectTrigger id="item">
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="walls">Walls</SelectItem>
                        <SelectItem value="flooring">Flooring</SelectItem>
                        <SelectItem value="ceiling">Ceiling</SelectItem>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="doors">Doors</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Media Gallery</CardTitle>
                  <CardDescription>Browse and filter your property documentation</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search media..."
                      className="pl-8 w-full md:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={roomFilter} onValueChange={setRoomFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rooms</SelectItem>
                      {uniqueRooms.map((room) => (
                        <SelectItem key={room} value={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Media</TabsTrigger>
                  <TabsTrigger value="move-in">Move-In</TabsTrigger>
                  <TabsTrigger value="move-out">Move-Out</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                  {filteredMedia.length === 0 ? (
                    <div className="text-center py-12">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No media found</h3>
                      <p className="text-muted-foreground">
                        {searchQuery || roomFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Upload photos or videos to document your property"}
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="mt-4">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Media
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Upload Media</DialogTitle>
                            <DialogDescription>
                              Add photos or videos to document your property's condition
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="media-upload-empty">Select Files</Label>
                              <Input id="media-upload-empty" type="file" accept="image/*,video/*" multiple />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="room-empty">Room</Label>
                              <Select>
                                <SelectTrigger id="room-empty">
                                  <SelectValue placeholder="Select room" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="living-room">Living Room</SelectItem>
                                  <SelectItem value="kitchen">Kitchen</SelectItem>
                                  <SelectItem value="bathroom">Bathroom</SelectItem>
                                  <SelectItem value="bedroom">Bedroom</SelectItem>
                                  <SelectItem value="other">Other Areas</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="item-empty">Item</Label>
                              <Select>
                                <SelectTrigger id="item-empty">
                                  <SelectValue placeholder="Select item" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="walls">Walls</SelectItem>
                                  <SelectItem value="flooring">Flooring</SelectItem>
                                  <SelectItem value="ceiling">Ceiling</SelectItem>
                                  <SelectItem value="windows">Windows</SelectItem>
                                  <SelectItem value="doors">Doors</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Upload</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredMedia.map((item) => (
                        <div
                          key={item.id}
                          className="group relative aspect-square rounded-md overflow-hidden border cursor-pointer"
                          onClick={() => setSelectedMedia(item.id)}
                        >
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={`${item.room} - ${item.item}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                            <div className="text-white">
                              <p className="font-medium">{item.room}</p>
                              <p className="text-sm">{item.item}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-white/80">{item.date}</span>
                              <Button variant="ghost" size="icon" className="text-white">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Media Viewer Dialog */}
      {selectedMedia && (
        <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {mediaItems.find((item) => item.id === selectedMedia)?.room} -{" "}
                {mediaItems.find((item) => item.id === selectedMedia)?.item}
              </DialogTitle>
              <DialogDescription>{mediaItems.find((item) => item.id === selectedMedia)?.date}</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center py-4">
              <img
                src={mediaItems.find((item) => item.id === selectedMedia)?.url || "/placeholder.svg"}
                alt={`${mediaItems.find((item) => item.id === selectedMedia)?.room} - ${mediaItems.find((item) => item.id === selectedMedia)?.item}`}
                className="max-h-[60vh] object-contain"
              />
            </div>
            <DialogFooter>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Home, Info, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RoomChecklist } from "@/components/room-checklist"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the room types and their items for the checklist
const rooms = [
  {
    id: "living-room",
    name: "Living Room",
    icon: Home,
    items: [
      { id: "walls", name: "Walls", description: "Check for holes, marks, or damage" },
      { id: "ceiling", name: "Ceiling", description: "Check for cracks, water damage, or stains" },
      { id: "flooring", name: "Flooring", description: "Check for scratches, stains, or damage" },
      { id: "windows", name: "Windows", description: "Check for cracks, functionality, and locks" },
      { id: "blinds", name: "Blinds/Curtains", description: "Check for damage and functionality" },
      { id: "electrical", name: "Electrical Outlets", description: "Check all outlets for functionality" },
      { id: "lighting", name: "Lighting Fixtures", description: "Check all lights and switches" },
      { id: "doors", name: "Doors", description: "Check for damage and functionality" },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: Home,
    items: [
      { id: "walls", name: "Walls", description: "Check for holes, marks, or damage" },
      { id: "ceiling", name: "Ceiling", description: "Check for cracks, water damage, or stains" },
      { id: "flooring", name: "Flooring", description: "Check for scratches, stains, or damage" },
      { id: "countertops", name: "Countertops", description: "Check for chips, cracks, or stains" },
      { id: "cabinets", name: "Cabinets", description: "Check for damage and functionality" },
      { id: "sink", name: "Sink", description: "Check for leaks, damage, and functionality" },
      { id: "faucet", name: "Faucet", description: "Check for leaks and functionality" },
      { id: "disposal", name: "Garbage Disposal", description: "Check for functionality" },
      { id: "dishwasher", name: "Dishwasher", description: "Check for leaks and functionality" },
      { id: "refrigerator", name: "Refrigerator", description: "Check for cleanliness and functionality" },
      { id: "stove", name: "Stove/Oven", description: "Check all burners and oven functionality" },
      { id: "microwave", name: "Microwave", description: "Check for cleanliness and functionality" },
      { id: "electrical", name: "Electrical Outlets", description: "Check all outlets for functionality" },
      { id: "lighting", name: "Lighting Fixtures", description: "Check all lights and switches" },
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    icon: Home,
    items: [
      { id: "walls", name: "Walls", description: "Check for holes, marks, or damage" },
      { id: "ceiling", name: "Ceiling", description: "Check for cracks, water damage, or stains" },
      { id: "flooring", name: "Flooring", description: "Check for scratches, stains, or damage" },
      { id: "toilet", name: "Toilet", description: "Check for leaks and functionality" },
      { id: "sink", name: "Sink", description: "Check for leaks, damage, and functionality" },
      { id: "faucet", name: "Faucet", description: "Check for leaks and functionality" },
      { id: "shower", name: "Shower/Tub", description: "Check for leaks, damage, and functionality" },
      { id: "showerhead", name: "Showerhead", description: "Check for leaks and functionality" },
      { id: "mirror", name: "Mirror", description: "Check for cracks or damage" },
      { id: "cabinets", name: "Cabinets", description: "Check for damage and functionality" },
      { id: "exhaust", name: "Exhaust Fan", description: "Check for functionality" },
      { id: "electrical", name: "Electrical Outlets", description: "Check all outlets for functionality" },
      { id: "lighting", name: "Lighting Fixtures", description: "Check all lights and switches" },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    icon: Home,
    items: [
      { id: "walls", name: "Walls", description: "Check for holes, marks, or damage" },
      { id: "ceiling", name: "Ceiling", description: "Check for cracks, water damage, or stains" },
      { id: "flooring", name: "Flooring", description: "Check for scratches, stains, or damage" },
      { id: "windows", name: "Windows", description: "Check for cracks, functionality, and locks" },
      { id: "blinds", name: "Blinds/Curtains", description: "Check for damage and functionality" },
      { id: "closet", name: "Closet", description: "Check doors, shelves, and rods" },
      { id: "electrical", name: "Electrical Outlets", description: "Check all outlets for functionality" },
      { id: "lighting", name: "Lighting Fixtures", description: "Check all lights and switches" },
      { id: "doors", name: "Doors", description: "Check for damage and functionality" },
    ],
  },
  {
    id: "other",
    name: "Other Areas",
    icon: Home,
    items: [
      { id: "hallway", name: "Hallway", description: "Check walls, ceiling, and flooring" },
      { id: "entryway", name: "Entryway", description: "Check door, locks, and flooring" },
      { id: "balcony", name: "Balcony/Patio", description: "Check for damage and cleanliness" },
      { id: "storage", name: "Storage Areas", description: "Check for cleanliness and functionality" },
      { id: "smoke", name: "Smoke Detectors", description: "Check for functionality" },
      { id: "carbon", name: "Carbon Monoxide Detectors", description: "Check for functionality" },
      { id: "thermostat", name: "Thermostat", description: "Check for functionality" },
      { id: "hvac", name: "HVAC System", description: "Check for functionality" },
    ],
  },
]

export default function MoveInChecklistPage() {
  const [activeTab, setActiveTab] = useState("living-room")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [progress, setProgress] = useState(75)
  const router = useRouter()

  // Calculate the total number of items across all rooms
  const totalItems = rooms.reduce((acc, room) => acc + room.items.length, 0)

  // Mock completed items (in a real app, this would come from a database)
  const completedItems = Math.floor(totalItems * 0.75)

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving to the server
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    setShowSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

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
              <h2 className="text-3xl font-bold tracking-tight">Move-In Checklist</h2>
              <p className="text-muted-foreground">
                Document the condition of your property at the start of your lease
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {completedItems} of {totalItems} items completed
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Complete all items before your move-in deadline</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Progress value={progress} className="w-[200px]" />
              </div>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Progress
                  </>
                )}
              </Button>
            </div>
          </div>

          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Progress Saved</AlertTitle>
              <AlertDescription className="text-green-700">
                Your checklist progress has been saved successfully.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Rooms</CardTitle>
                <CardDescription>Select a room to document</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 p-2">
                  {rooms.map((room) => {
                    // Calculate completion percentage for this room (mock data)
                    const roomCompletion = Math.floor(Math.random() * 100)
                    const isComplete = roomCompletion === 100

                    return (
                      <Button
                        key={room.id}
                        variant={activeTab === room.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab(room.id)}
                      >
                        <room.icon className="mr-2 h-4 w-4" />
                        <span className="flex-1 text-left">{room.name}</span>
                        {isComplete ? (
                          <CheckCircle2 className="ml-2 h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-xs text-muted-foreground">{roomCompletion}%</span>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {rooms.map((room) => (
                  <TabsContent key={room.id} value={room.id} className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>{room.name}</CardTitle>
                        <CardDescription>Document the condition of items in this room</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RoomChecklist items={room.items} />
                      </CardContent>
                    </Card>

                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = rooms.findIndex((r) => r.id === activeTab)
                          if (currentIndex > 0) {
                            setActiveTab(rooms[currentIndex - 1].id)
                          }
                        }}
                        disabled={rooms.findIndex((r) => r.id === activeTab) === 0}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Previous Room
                      </Button>
                      <Button
                        onClick={() => {
                          const currentIndex = rooms.findIndex((r) => r.id === activeTab)
                          if (currentIndex < rooms.length - 1) {
                            setActiveTab(rooms[currentIndex + 1].id)
                          }
                        }}
                        disabled={rooms.findIndex((r) => r.id === activeTab) === rooms.length - 1}
                      >
                        Next Room
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Finalize Checklist</CardTitle>
                <CardDescription>Review and submit your move-in checklist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you've completed documenting all rooms, you can submit your checklist to your landlord. This will
                  serve as an official record of the property's condition at move-in.
                </p>
                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Important Information</p>
                      <p className="text-sm text-muted-foreground">
                        Your move-in checklist must be completed by March 15, 2025 (14 days after move-in). Make sure to
                        document any existing damage or issues to avoid being charged at move-out.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </>
                  )}
                </Button>
                <Button>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Checklist
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


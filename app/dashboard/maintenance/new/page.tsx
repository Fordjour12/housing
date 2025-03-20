"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Camera, Loader2, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewMaintenanceRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to maintenance list
    router.push("/dashboard/maintenance/req_1003?success=true")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=maintenance">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Maintenance
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">New Maintenance Request</h2>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>Provide details about the maintenance issue you're experiencing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input id="title" placeholder="Brief description of the issue" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC (Heating/Cooling)</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="pest">Pest Control</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location in Property</Label>
                  <Select required>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="bathroom">Bathroom</SelectItem>
                      <SelectItem value="bedroom">Bedroom</SelectItem>
                      <SelectItem value="living_room">Living Room</SelectItem>
                      <SelectItem value="dining_room">Dining Room</SelectItem>
                      <SelectItem value="hallway">Hallway</SelectItem>
                      <SelectItem value="balcony">Balcony/Patio</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide as much detail as possible about the issue"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <RadioGroup defaultValue="medium" required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low">Low - Not urgent, can be fixed when convenient</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium - Needs attention within a week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High - Requires prompt attention</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="emergency" id="emergency" />
                      <Label htmlFor="emergency">Emergency - Immediate attention needed</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Photos/Videos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative rounded-md overflow-hidden border aspect-square">
                        <img
                          src={image.preview || "/placeholder.svg"}
                          alt={`Uploaded image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="border border-dashed rounded-md flex items-center justify-center aspect-square">
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                      >
                        <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Photo</span>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          multiple
                        />
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload photos or videos to help us understand the issue better
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Appointment Times</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="morning" />
                      <Label htmlFor="morning">Morning (8 AM - 12 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="afternoon" />
                      <Label htmlFor="afternoon">Afternoon (12 PM - 5 PM)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="evening" />
                      <Label htmlFor="evening">Evening (5 PM - 8 PM)</Label>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="unavailable" className="mb-2 block">
                      Unavailable Dates
                    </Label>
                    <Textarea
                      id="unavailable"
                      placeholder="Please list any dates you are unavailable for maintenance visits"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="permission" required />
                    <Label htmlFor="permission">
                      I give permission for maintenance personnel to enter my unit to address this issue
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Maintenance Request
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import EditListingForm from "./edit-listing-form"

export default function CreateListingForm() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      // Show success message or redirect
    }, 1500)
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
        <Button onClick={handleSave} disabled={isSaving} className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>{isSaving ? "Creating..." : "Create Listing"}</span>
        </Button>
      </div>

      {/* Reuse the edit form but with a new ID */}
      <EditListingForm id="new" />
    </div>
  )
}


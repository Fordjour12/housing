"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Camera, Check, Circle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ChecklistItem {
  id: string
  name: string
  description: string
}

interface RoomChecklistProps {
  items: ChecklistItem[]
}

type ItemStatus = "good" | "damaged" | "missing" | "not-applicable"

interface ItemState {
  status: ItemStatus
  notes: string
  images: { file: File; preview: string }[]
}

export function RoomChecklist({ items }: RoomChecklistProps) {
  // Initialize state for each item
  const [itemStates, setItemStates] = useState<Record<string, ItemState>>(() => {
    const initialStates: Record<string, ItemState> = {}
    items.forEach((item) => {
      initialStates[item.id] = {
        status: "good",
        notes: "",
        images: [],
      }
    })
    return initialStates
  })

  const handleStatusChange = (itemId: string, status: ItemStatus) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        status,
      },
    }))
  }

  const handleNotesChange = (itemId: string, notes: string) => {
    setItemStates((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        notes,
      },
    }))
  }

  const handleImageUpload = (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

      setItemStates((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          images: [...prev[itemId].images, ...newImages],
        },
      }))
    }
  }

  const removeImage = (itemId: string, index: number) => {
    setItemStates((prev) => {
      const newImages = [...prev[itemId].images]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)

      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          images: newImages,
        },
      }
    })
  }

  const getStatusButtonClass = (itemId: string, status: ItemStatus) => {
    const isActive = itemStates[itemId].status === status

    const baseClasses = "flex-1 flex items-center justify-center gap-1 py-1 text-xs font-medium"

    if (isActive) {
      switch (status) {
        case "good":
          return `${baseClasses} bg-green-100 text-green-700 border-green-300`
        case "damaged":
          return `${baseClasses} bg-yellow-100 text-yellow-700 border-yellow-300`
        case "missing":
          return `${baseClasses} bg-red-100 text-red-700 border-red-300`
        case "not-applicable":
          return `${baseClasses} bg-gray-100 text-gray-700 border-gray-300`
      }
    }

    return `${baseClasses} bg-background hover:bg-muted/50`
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={item.id} className="space-y-4">
          {index > 0 && <Separator />}
          <div className="pt-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <Label className="mb-2 block">Condition</Label>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className={getStatusButtonClass(item.id, "good")}
                    onClick={() => handleStatusChange(item.id, "good")}
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Good
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={getStatusButtonClass(item.id, "damaged")}
                    onClick={() => handleStatusChange(item.id, "damaged")}
                  >
                    <Circle className="h-3 w-3 mr-1" />
                    Damaged
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={getStatusButtonClass(item.id, "missing")}
                    onClick={() => handleStatusChange(item.id, "missing")}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Missing
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={getStatusButtonClass(item.id, "not-applicable")}
                    onClick={() => handleStatusChange(item.id, "not-applicable")}
                  >
                    <Circle className="h-3 w-3 mr-1" />
                    N/A
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor={`notes-${item.id}`} className="mb-2 block">
                  Notes
                </Label>
                <Textarea
                  id={`notes-${item.id}`}
                  placeholder="Add any notes about the condition..."
                  value={itemStates[item.id].notes}
                  onChange={(e) => handleNotesChange(item.id, e.target.value)}
                />
              </div>

              <div>
                <Label className="mb-2 block">Photos</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                  {itemStates[item.id].images.map((image, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden border aspect-square">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt={`${item.name} image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeImage(item.id, index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="border border-dashed rounded-md flex items-center justify-center aspect-square">
                    <label
                      htmlFor={`image-upload-${item.id}`}
                      className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                    >
                      <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Add Photo</span>
                      <Input
                        id={`image-upload-${item.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(item.id, e)}
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


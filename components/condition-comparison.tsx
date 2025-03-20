"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ComparisonItem {
  id: string
  name: string
  moveInStatus: "good" | "damaged" | "missing" | "not-applicable"
  moveInNotes: string
  moveInImages: string[]
  moveOutStatus: "good" | "damaged" | "missing" | "not-applicable"
  moveOutNotes: string
  moveOutImages: string[]
  hasChanged: boolean
}

interface ConditionComparisonProps {
  roomName: string
  items: ComparisonItem[]
}

export function ConditionComparison({ roomName, items }: ConditionComparisonProps) {
  const [activeItem, setActiveItem] = useState(items[0]?.id || "")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Good Condition
          </Badge>
        )
      case "damaged":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            Damaged
          </Badge>
        )
      case "missing":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            Missing
          </Badge>
        )
      case "not-applicable":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
            Not Applicable
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const currentItem = items.find((item) => item.id === activeItem)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{roomName} Comparison</h2>

      <div className="flex overflow-x-auto pb-2 gap-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "outline"}
            className={`whitespace-nowrap ${item.hasChanged ? "border-yellow-300" : ""}`}
            onClick={() => setActiveItem(item.id)}
          >
            {item.name}
            {item.hasChanged && <span className="ml-2 w-2 h-2 rounded-full bg-yellow-500"></span>}
          </Button>
        ))}
      </div>

      {currentItem && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Move-In Condition</h3>
                <div>{getStatusBadge(currentItem.moveInStatus)}</div>
              </div>

              <div className="space-y-4">
                {currentItem.moveInNotes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Notes:</p>
                    <p className="text-sm text-muted-foreground">{currentItem.moveInNotes}</p>
                  </div>
                )}

                {currentItem.moveInImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Photos:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {currentItem.moveInImages.map((image, index) => (
                        <div key={index} className="aspect-square rounded-md overflow-hidden border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Move-in ${currentItem.name} image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Move-Out Condition</h3>
                <div>{getStatusBadge(currentItem.moveOutStatus)}</div>
              </div>

              <div className="space-y-4">
                {currentItem.moveOutNotes && (
                  <div>
                    <p className="text-sm font-medium mb-1">Notes:</p>
                    <p className="text-sm text-muted-foreground">{currentItem.moveOutNotes}</p>
                  </div>
                )}

                {currentItem.moveOutImages.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Photos:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {currentItem.moveOutImages.map((image, index) => (
                        <div key={index} className="aspect-square rounded-md overflow-hidden border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Move-out ${currentItem.name} image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = items.findIndex((item) => item.id === activeItem)
            if (currentIndex > 0) {
              setActiveItem(items[currentIndex - 1].id)
            }
          }}
          disabled={items.findIndex((item) => item.id === activeItem) === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Item
        </Button>
        <Button
          onClick={() => {
            const currentIndex = items.findIndex((item) => item.id === activeItem)
            if (currentIndex < items.length - 1) {
              setActiveItem(items[currentIndex + 1].id)
            }
          }}
          disabled={items.findIndex((item) => item.id === activeItem) === items.length - 1}
        >
          Next Item
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}


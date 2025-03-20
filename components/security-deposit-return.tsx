"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, HelpCircle, AlertTriangle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SecurityDepositReturn() {
  // This would be dynamic in a real application
  const [returnStatus, setReturnStatus] = useState<
    | "not-started"
    | "pending"
    | "inspection-scheduled"
    | "inspection-completed"
    | "processing"
    | "completed"
    | "disputed"
  >("not-started")

  // This would typically come from an API or database
  const returnData = {
    moveOutDate: "February 28, 2026",
    inspectionDate: "March 1, 2026",
    returnDeadline: "March 21, 2026",
    originalAmount: 2175.0,
    interestEarned: 21.75,
    totalAmount: 2196.75,
    deductions: [
      {
        id: "ded_1",
        category: "cleaning",
        description: "Professional cleaning service",
        amount: 150.0,
        status: "estimated",
      },
      {
        id: "ded_2",
        category: "repairs",
        description: "Patch and paint wall damage in living room",
        amount: 75.0,
        status: "estimated",
      },
    ],
    estimatedRefundAmount: 1971.75,
    landlordNotes:
      "These are preliminary estimates. Final deductions will be determined after the move-out inspection.",
  }

  // Calculate total deductions
  const totalDeductions = returnData.deductions.reduce((sum, deduction) => sum + deduction.amount, 0)

  // Get status information based on current return status
  const getStatusInfo = () => {
    switch (returnStatus) {
      case "not-started":
        return {
          title: "Not Started",
          description: "Your lease is still active. The security deposit return process will begin after you move out.",
          icon: Clock,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          progress: 0,
        }
      case "pending":
        return {
          title: "Pending Inspection",
          description: "You have moved out. A move-out inspection has been scheduled.",
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          progress: 20,
        }
      case "inspection-scheduled":
        return {
          title: "Inspection Scheduled",
          description: "Your move-out inspection is scheduled for March 1, 2026.",
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          progress: 30,
        }
      case "inspection-completed":
        return {
          title: "Inspection Completed",
          description: "The move-out inspection has been completed. Your landlord is processing any deductions.",
          icon: CheckCircle2,
          color: "text-green-500",
          bgColor: "bg-green-100",
          progress: 50,
        }
      case "processing":
        return {
          title: "Processing",
          description: "Your security deposit return is being processed. You should receive it by March 21, 2026.",
          icon: Clock,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          progress: 75,
        }
      case "completed":
        return {
          title: "Completed",
          description: "Your security deposit has been returned with itemized deductions.",
          icon: CheckCircle2,
          color: "text-green-500",
          bgColor: "bg-green-100",
          progress: 100,
        }
      case "disputed":
        return {
          title: "Disputed",
          description: "You have disputed one or more deductions. This is currently being reviewed.",
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-100",
          progress: 60,
        }
      default:
        return {
          title: "Unknown",
          description: "Status information unavailable.",
          icon: HelpCircle,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          progress: 0,
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  // For demo purposes, let's add a function to change the status
  // In a real app, this would be controlled by the backend
  const handleStatusChange = (newStatus: typeof returnStatus) => {
    setReturnStatus(newStatus)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <div className="p-4 bg-muted/50">
          <h3 className="font-medium">Return Status</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className={`rounded-full p-3 ${statusInfo.bgColor} ${statusInfo.color} mb-4`}>
              <StatusIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">{statusInfo.title}</h3>
            <p className="text-muted-foreground mt-1 max-w-md">{statusInfo.description}</p>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span>Process Started</span>
              <span>Deposit Returned</span>
            </div>
            <Progress value={statusInfo.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Demo controls - would not exist in a real app */}
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-muted-foreground mb-2">Demo: Change status to see different states</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("not-started")}
                className={returnStatus === "not-started" ? "border-primary" : ""}
              >
                Not Started
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("pending")}
                className={returnStatus === "pending" ? "border-primary" : ""}
              >
                Pending
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("inspection-scheduled")}
                className={returnStatus === "inspection-scheduled" ? "border-primary" : ""}
              >
                Inspection Scheduled
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("inspection-completed")}
                className={returnStatus === "inspection-completed" ? "border-primary" : ""}
              >
                Inspection Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("processing")}
                className={returnStatus === "processing" ? "border-primary" : ""}
              >
                Processing
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("completed")}
                className={returnStatus === "completed" ? "border-primary" : ""}
              >
                Completed
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("disputed")}
                className={returnStatus === "disputed" ? "border-primary" : ""}
              >
                Disputed
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-4 bg-muted/50">
          <h3 className="font-medium">Estimated Return Calculation</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Original Security Deposit</span>
              <span className="font-medium">${returnData.originalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Interest Earned (1% per annum)</span>
              <span className="text-sm text-green-600">+${returnData.interestEarned.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Before Deductions</span>
              <span className="font-medium">${returnData.totalAmount.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Estimated Deductions</h4>
              {returnData.deductions.map((deduction) => (
                <div key={deduction.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{deduction.description}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Category: {deduction.category}</p>
                          <p>Status: {deduction.status}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Badge variant="outline" className="text-xs">
                      Estimated
                    </Badge>
                  </div>
                  <span className="text-sm text-red-600">-${deduction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Deductions</span>
              <span className="font-medium text-red-600">-${totalDeductions.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Estimated Refund Amount</span>
              <span className="text-lg font-bold">${returnData.estimatedRefundAmount.toFixed(2)}</span>
            </div>

            <div className="rounded-md border p-4 bg-yellow-50 mt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-700">Landlord Notes</h4>
                  <p className="text-sm text-yellow-600">{returnData.landlordNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="p-4 bg-muted/50">
          <h3 className="font-medium">Important Dates</h3>
        </div>
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-1">Move-Out Date</h4>
              <p className="text-lg">{returnData.moveOutDate}</p>
              <p className="text-xs text-muted-foreground mt-1">Your lease officially ends on this date</p>
            </div>
            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-1">Inspection Date</h4>
              <p className="text-lg">{returnData.inspectionDate}</p>
              <p className="text-xs text-muted-foreground mt-1">Scheduled property inspection</p>
            </div>
            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-1">Return Deadline</h4>
              <p className="text-lg">{returnData.returnDeadline}</p>
              <p className="text-xs text-muted-foreground mt-1">Legal deadline for deposit return</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


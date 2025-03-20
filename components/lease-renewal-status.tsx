"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, FileText, HelpCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type RenewalStatus =
  | "not-started"
  | "pending-landlord"
  | "pending-tenant"
  | "negotiating"
  | "approved"
  | "signed"
  | "declined"

export function LeaseRenewalStatus() {
  // This would be dynamic in a real application
  const [renewalStatus, setRenewalStatus] = useState<RenewalStatus>("not-started")

  // Get status information based on current renewal status
  const getStatusInfo = () => {
    switch (renewalStatus) {
      case "not-started":
        return {
          title: "Not Started",
          description:
            "Your lease renewal process has not started yet. You can initiate the process when you're ready.",
          icon: Clock,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          actionText: "Start Renewal Process",
          actionLink: "/dashboard/renewals/new",
        }
      case "pending-landlord":
        return {
          title: "Pending Landlord Review",
          description: "Your renewal request has been submitted and is awaiting review by your landlord.",
          icon: Clock,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          actionText: "View Request Details",
          actionLink: "/dashboard/renewals/details",
        }
      case "pending-tenant":
        return {
          title: "Pending Your Review",
          description: "Your landlord has sent you a renewal offer. Please review and respond.",
          icon: AlertCircle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          actionText: "Review Offer",
          actionLink: "/dashboard/renewals/review",
        }
      case "negotiating":
        return {
          title: "Negotiating Terms",
          description: "You and your landlord are currently negotiating the terms of your lease renewal.",
          icon: MessageSquare,
          color: "text-purple-500",
          bgColor: "bg-purple-100",
          actionText: "Continue Negotiation",
          actionLink: "/dashboard/renewals/negotiate",
        }
      case "approved":
        return {
          title: "Approved - Pending Signature",
          description: "Your lease renewal has been approved. Please sign the renewal agreement.",
          icon: FileText,
          color: "text-green-500",
          bgColor: "bg-green-100",
          actionText: "Sign Agreement",
          actionLink: "/dashboard/renewals/sign",
        }
      case "signed":
        return {
          title: "Renewal Completed",
          description:
            "Your lease renewal has been signed by all parties. Your new lease term will begin on March 1, 2026.",
          icon: CheckCircle2,
          color: "text-green-500",
          bgColor: "bg-green-100",
          actionText: "View Renewal Agreement",
          actionLink: "/dashboard/renewals/agreement",
        }
      case "declined":
        return {
          title: "Renewal Declined",
          description: "You have declined the lease renewal offer. Your current lease will end on February 28, 2026.",
          icon: AlertCircle,
          color: "text-red-500",
          bgColor: "bg-red-100",
          actionText: "View Move-Out Information",
          actionLink: "/dashboard/move-out",
        }
      default:
        return {
          title: "Unknown",
          description: "Status information unavailable.",
          icon: HelpCircle,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          actionText: "Contact Support",
          actionLink: "/dashboard/support",
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  // For demo purposes, let's add a function to change the status
  // In a real app, this would be controlled by the backend
  const handleStatusChange = (newStatus: RenewalStatus) => {
    setRenewalStatus(newStatus)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renewal Status</CardTitle>
        <CardDescription>Current status of your lease renewal process</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center p-6 border rounded-lg">
          <div className={`rounded-full p-3 ${statusInfo.bgColor} ${statusInfo.color} mb-4`}>
            <StatusIcon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">{statusInfo.title}</h3>
          <p className="text-muted-foreground mt-1 max-w-md">{statusInfo.description}</p>
          <Link href={statusInfo.actionLink} className="mt-4">
            <Button>{statusInfo.actionText}</Button>
          </Link>
        </div>

        {renewalStatus === "pending-tenant" && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Action Required</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Your landlord has sent you a renewal offer with a 3% rent increase. Please review and respond by December
              15, 2025.
            </AlertDescription>
          </Alert>
        )}

        {renewalStatus === "approved" && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Renewal Approved</AlertTitle>
            <AlertDescription className="text-green-700">
              Your lease renewal has been approved with the agreed terms. Please sign the renewal agreement by January
              15, 2026.
            </AlertDescription>
          </Alert>
        )}

        {/* Demo controls - would not exist in a real app */}
        <div className="border-t pt-4 mt-4">
          <p className="text-sm text-muted-foreground mb-2">Demo: Change status to see different states</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("not-started")}
              className={renewalStatus === "not-started" ? "border-primary" : ""}
            >
              Not Started
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("pending-landlord")}
              className={renewalStatus === "pending-landlord" ? "border-primary" : ""}
            >
              Pending Landlord
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("pending-tenant")}
              className={renewalStatus === "pending-tenant" ? "border-primary" : ""}
            >
              Pending Tenant
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("negotiating")}
              className={renewalStatus === "negotiating" ? "border-primary" : ""}
            >
              Negotiating
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("approved")}
              className={renewalStatus === "approved" ? "border-primary" : ""}
            >
              Approved
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("signed")}
              className={renewalStatus === "signed" ? "border-primary" : ""}
            >
              Signed
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("declined")}
              className={renewalStatus === "declined" ? "border-primary" : ""}
            >
              Declined
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6 flex flex-col items-start">
        <h3 className="font-medium mb-2">Next Steps</h3>
        {renewalStatus === "not-started" && (
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Start the renewal process</p>
                <p className="text-muted-foreground">
                  Initiate your lease renewal request to indicate your interest in renewing.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">Specify your preferred terms</p>
                <p className="text-muted-foreground">
                  Indicate your preferred lease length and any requested modifications.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium">Wait for landlord response</p>
                <p className="text-muted-foreground">
                  Your landlord will review your request and respond with their offer.
                </p>
              </div>
            </li>
          </ul>
        )}
        {renewalStatus === "pending-landlord" && (
          <p className="text-sm text-muted-foreground">
            Your renewal request has been submitted. Your landlord typically responds within 5-7 business days. You'll
            receive a notification when they respond.
          </p>
        )}
        {renewalStatus === "pending-tenant" && (
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Review the renewal offer</p>
                <p className="text-muted-foreground">
                  Carefully review the terms, including the new rent amount and lease duration.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">Accept, decline, or counter the offer</p>
                <p className="text-muted-foreground">
                  You can accept the offer as-is, decline it, or propose different terms.
                </p>
              </div>
            </li>
          </ul>
        )}
        {renewalStatus === "negotiating" && (
          <p className="text-sm text-muted-foreground">
            Continue the negotiation process with your landlord through the messaging system. Once you reach an
            agreement, the status will update to "Approved".
          </p>
        )}
        {renewalStatus === "approved" && (
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Review the final agreement</p>
                <p className="text-muted-foreground">Carefully review all terms and conditions before signing.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">Sign the renewal agreement</p>
                <p className="text-muted-foreground">Use our digital signature service to sign the agreement.</p>
              </div>
            </li>
          </ul>
        )}
        {renewalStatus === "signed" && (
          <p className="text-sm text-muted-foreground">
            Your lease renewal is complete! Your new lease term will begin on March 1, 2026. You can access your signed
            renewal agreement at any time.
          </p>
        )}
        {renewalStatus === "declined" && (
          <p className="text-sm text-muted-foreground">
            You have declined the renewal offer. Your current lease will end on February 28, 2026. Please review the
            move-out procedures and timeline.
          </p>
        )}
      </CardFooter>
    </Card>
  )
}


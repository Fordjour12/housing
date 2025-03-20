"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MoveOutChecklistPage() {
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

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Move-Out Checklist</h2>
              <p className="text-muted-foreground">Document the condition of your property at the end of your lease</p>
            </div>
          </div>

          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Not Available Yet</AlertTitle>
            <AlertDescription>
              The move-out checklist will be available 30 days before your lease end date (February 28, 2026). You'll be
              able to document the property's condition and compare it with your move-in checklist.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Move-Out Process</CardTitle>
              <CardDescription>What to expect when completing your move-out documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Complete the Move-Out Checklist</h3>
                <p className="text-sm text-muted-foreground">
                  Document the condition of each room and item in your rental property, similar to your move-in
                  checklist. Take photos and videos to provide visual evidence of the property's condition.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">2. Compare with Move-In Condition</h3>
                <p className="text-sm text-muted-foreground">
                  The system will automatically compare your move-out documentation with your move-in checklist,
                  highlighting any differences or potential issues.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">3. Final Walkthrough</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule a final walkthrough with your landlord to review the property's condition together. Your
                  digital documentation will serve as evidence during this process.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">4. Security Deposit Return</h3>
                <p className="text-sm text-muted-foreground">
                  Your thorough documentation will help ensure a fair assessment of any damages and the appropriate
                  return of your security deposit.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                The move-out checklist will be available starting January 29, 2026. You'll receive a notification when
                it's time to begin the move-out documentation process.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


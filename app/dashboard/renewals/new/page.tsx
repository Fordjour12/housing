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
import { ArrowLeft, CheckCircle2, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NewRenewalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedTerm, setSelectedTerm] = useState("12")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect after showing success message
    setTimeout(() => {
      router.push("/dashboard/renewals?status=submitted")
    }, 3000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard/renewals">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Renewals
            </Button>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Start Lease Renewal</h2>

          {isSuccess ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="rounded-full p-3 bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Renewal Request Submitted</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    Your lease renewal request has been submitted successfully. Your landlord will review your request
                    and respond with their offer.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">Redirecting you to the renewals page...</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Renewal Request</CardTitle>
                  <CardDescription>Initiate your lease renewal process by submitting this form</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Current Lease Information</h3>
                    <div className="rounded-md border p-4 bg-muted/30">
                      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="font-medium text-muted-foreground">Property Address:</dt>
                          <dd>123 Main Street, Apt 4B, San Francisco, CA 94103</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-muted-foreground">Current Lease Period:</dt>
                          <dd>March 1, 2025 - February 28, 2026</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-muted-foreground">Current Monthly Rent:</dt>
                          <dd>$1,450.00</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-muted-foreground">Landlord/Property Management:</dt>
                          <dd>Skyline Properties LLC</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Renewal Preferences</h3>

                    <div className="space-y-2">
                      <Label htmlFor="renewal-term">Preferred Lease Term</Label>
                      <Select value={selectedTerm} onValueChange={setSelectedTerm} required>
                        <SelectTrigger id="renewal-term">
                          <SelectValue placeholder="Select lease term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Months</SelectItem>
                          <SelectItem value="6">6 Months</SelectItem>
                          <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                          <SelectItem value="other">Other (specify below)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedTerm === "other" && (
                      <div className="space-y-2">
                        <Label htmlFor="custom-term">Specify Custom Term</Label>
                        <Input id="custom-term" placeholder="e.g., 9 months" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Rent Expectations</Label>
                      <RadioGroup defaultValue="standard">
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1">
                            <div className="font-medium">Standard Increase</div>
                            <div className="text-sm text-muted-foreground">
                              I understand there may be a standard rent increase (typically 3-5%)
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="negotiate" id="negotiate" />
                          <Label htmlFor="negotiate" className="flex-1">
                            <div className="font-medium">Negotiate Rent</div>
                            <div className="text-sm text-muted-foreground">
                              I would like to negotiate the rent amount (provide details below)
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-3">
                          <RadioGroupItem value="no-increase" id="no-increase" />
                          <Label htmlFor="no-increase" className="flex-1">
                            <div className="font-medium">Request No Increase</div>
                            <div className="text-sm text-muted-foreground">
                              I would like to request renewal with no rent increase
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modifications">Requested Modifications</Label>
                      <Textarea
                        id="modifications"
                        placeholder="Please specify any modifications you'd like to request for your lease renewal (e.g., painting, appliance upgrades, etc.)"
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">
                        Note: Requested modifications are subject to landlord approval and may affect rent negotiations.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional-comments">Additional Comments</Label>
                      <Textarea
                        id="additional-comments"
                        placeholder="Any additional information or comments you'd like to share regarding your renewal request"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Important Information</AlertTitle>
                    <AlertDescription>
                      Submitting this form does not guarantee renewal approval or lock in any specific terms. This is
                      the first step in the renewal negotiation process. Your landlord will review your request and
                      respond with their offer.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" type="button" asChild>
                    <Link href="/dashboard/renewals">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Submit Renewal Request
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, CheckCircle2, Loader2, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReviewRenewalOfferPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [response, setResponse] = useState<"accept" | "counter" | "decline" | "">("")
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
      router.push("/dashboard/renewals?status=responded")
    }, 3000)
  }

  // This would typically come from an API or database
  const offerDetails = {
    offerDate: "December 1, 2025",
    responseDeadline: "December 15, 2025",
    proposedTerm: "12 months",
    newLeaseStartDate: "March 1, 2026",
    newLeaseEndDate: "February 28, 2027",
    currentRent: 1450.0,
    proposedRent: 1493.5,
    increasePercentage: 3,
    increaseAmount: 43.5,
    additionalTerms: [
      "All other terms and conditions of the original lease agreement remain in effect",
      "Security deposit will remain the same",
      "Tenant must maintain renter's insurance throughout the lease term",
    ],
    landlordNotes:
      "We value you as a tenant and look forward to continuing our relationship. This offer represents a standard annual increase that helps us keep up with rising property maintenance costs while remaining competitive with market rates in the area.",
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Review Renewal Offer</h2>

          {isSuccess ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="rounded-full p-3 bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Response Submitted</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    Your response to the renewal offer has been submitted successfully.
                    {response === "accept" && " Your lease renewal will be processed and sent for signature."}
                    {response === "counter" && " Your landlord will review your counter offer and respond."}
                    {response === "decline" && " Your current lease will end on the scheduled end date."}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">Redirecting you to the renewals page...</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Renewal Offer Details</CardTitle>
                  <CardDescription>Review the details of your lease renewal offer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-4">Offer Summary</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <dt className="font-medium text-muted-foreground">Offer Date:</dt>
                        <dd>{offerDetails.offerDate}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Response Deadline:</dt>
                        <dd className="font-medium text-amber-600">{offerDetails.responseDeadline}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">Proposed Term:</dt>
                        <dd>{offerDetails.proposedTerm}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-muted-foreground">New Lease Period:</dt>
                        <dd>
                          {offerDetails.newLeaseStartDate} - {offerDetails.newLeaseEndDate}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-4">Rent Details</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Current Monthly Rent:</dt>
                        <dd>${offerDetails.currentRent.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between font-medium">
                        <dt>Proposed Monthly Rent:</dt>
                        <dd>${offerDetails.proposedRent.toFixed(2)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Increase Amount:</dt>
                        <dd className="text-rose-600">
                          +${offerDetails.increaseAmount.toFixed(2)} ({offerDetails.increasePercentage}%)
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Annual Increase:</dt>
                        <dd className="text-rose-600">+${(offerDetails.increaseAmount * 12).toFixed(2)} per year</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Additional Terms</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {offerDetails.additionalTerms.map((term, index) => (
                        <li key={index} className="text-muted-foreground">
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-md border p-4 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-700">Landlord Notes</h3>
                        <p className="text-sm text-blue-600 mt-1">{offerDetails.landlordNotes}</p>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertTitle className="text-amber-800">Response Required</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      Please respond to this offer by {offerDetails.responseDeadline}. If no response is received by the
                      deadline, your current lease will expire on the scheduled end date.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Your Response</CardTitle>
                    <CardDescription>Please provide your response to this renewal offer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Response Options</Label>
                      <RadioGroup
                        value={response}
                        onValueChange={(value) => setResponse(value as typeof response)}
                        required
                      >
                        <div className="flex items-start space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="accept" id="accept" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="accept" className="flex items-center">
                              <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
                              <span className="font-medium">Accept Offer</span>
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              I accept the renewal terms as offered. I understand that a renewal agreement will be
                              prepared for my signature.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="counter" id="counter" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="counter" className="flex items-center">
                              <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                              <span className="font-medium">Counter Offer</span>
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              I would like to propose different terms. My landlord will review my counter offer and
                              respond.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="decline" id="decline" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="decline" className="flex items-center">
                              <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
                              <span className="font-medium">Decline Offer</span>
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">
                              I decline this renewal offer. My current lease will end on the scheduled end date.
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {response === "counter" && (
                      <div className="space-y-2">
                        <Label htmlFor="counter-details">Counter Offer Details</Label>
                        <Textarea
                          id="counter-details"
                          placeholder="Please specify your counter offer terms (e.g., preferred rent amount, lease term, or other modifications)"
                          className="min-h-[120px]"
                          required
                        />
                      </div>
                    )}

                    {response === "decline" && (
                      <div className="space-y-2">
                        <Label htmlFor="decline-reason">Reason for Declining (Optional)</Label>
                        <Textarea
                          id="decline-reason"
                          placeholder="Please share your reason for declining the renewal offer (e.g., moving to a new location, purchasing a home, etc.)"
                          className="min-h-[120px]"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="additional-comments">Additional Comments</Label>
                      <Textarea
                        id="additional-comments"
                        placeholder="Any additional information or comments you'd like to share regarding your response"
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/dashboard/renewals">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !response}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Response"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


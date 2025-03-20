"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, CheckCircle2, Download, FileText, Loader2, Pen } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignRenewalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasAgreed, setHasAgreed] = useState(false)
  const [signature, setSignature] = useState("")
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
      router.push("/dashboard/renewals?status=signed")
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

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Sign Renewal Agreement</h2>

          {isSuccess ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="rounded-full p-3 bg-green-100 text-green-600 mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Agreement Signed Successfully</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    Your lease renewal agreement has been signed successfully. A copy of the signed agreement has been
                    sent to your email and is also available in your documents section.
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">Redirecting you to the renewals page...</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Renewal Agreement</CardTitle>
                  <CardDescription>Review and sign your lease renewal agreement</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="preview">Document Preview</TabsTrigger>
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="space-y-4">
                      <div className="border rounded-lg p-6 bg-white min-h-[500px] overflow-auto">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl font-bold">LEASE RENEWAL AGREEMENT</h2>
                        </div>

                        <p className="mb-4">
                          <strong>THIS LEASE RENEWAL AGREEMENT</strong> (hereinafter referred to as the "Renewal") is
                          made and entered into this 15th day of January, 2026, by and between Skyline Properties LLC
                          (hereinafter referred to as "Landlord") and John Doe (hereinafter referred to as "Tenant").
                        </p>

                        <p className="mb-4">
                          <strong>WHEREAS:</strong> Landlord and Tenant entered into a Residential Lease Agreement dated
                          February 15, 2025 (the "Original Lease") for the premises located at 123 Main Street,
                          Apartment 4B, San Francisco, California 94103 (the "Premises"); and
                        </p>

                        <p className="mb-4">
                          <strong>WHEREAS:</strong> The Original Lease is scheduled to expire on February 28, 2026; and
                        </p>

                        <p className="mb-4">
                          <strong>WHEREAS:</strong> Landlord and Tenant desire to renew the Original Lease for an
                          additional term;
                        </p>

                        <p className="mb-4">
                          <strong>NOW, THEREFORE:</strong> In consideration of the mutual covenants and agreements
                          herein contained, Landlord and Tenant hereby agree as follows:
                        </p>

                        <ol className="list-decimal pl-5 space-y-4 mb-4">
                          <li>
                            <strong>RENEWAL TERM:</strong> The term of the Original Lease is hereby extended for a
                            period of twelve (12) months, commencing on March 1, 2026 and ending on February 28, 2027
                            (the "Renewal Term").
                          </li>
                          <li>
                            <strong>RENT:</strong> During the Renewal Term, the monthly rent shall be $1,493.50, payable
                            in advance on the first day of each month.
                          </li>
                          <li>
                            <strong>SECURITY DEPOSIT:</strong> The security deposit currently held by Landlord in the
                            amount of $2,175.00 shall continue to be held by Landlord during the Renewal Term in
                            accordance with the terms of the Original Lease and applicable law.
                          </li>
                          <li>
                            <strong>OTHER TERMS AND CONDITIONS:</strong> Except as expressly modified by this Renewal,
                            all other terms, conditions, covenants, and provisions of the Original Lease shall remain in
                            full force and effect during the Renewal Term and are hereby ratified and confirmed by
                            Landlord and Tenant.
                          </li>
                        </ol>

                        <p className="mb-8">
                          IN WITNESS WHEREOF, the parties hereto have executed this Lease Renewal Agreement as of the
                          date first above written.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="font-medium mb-2">LANDLORD:</p>
                            <p>Skyline Properties LLC</p>
                            <p className="mt-6 font-medium">
                              By: <span className="italic">Sarah Johnson</span>
                            </p>
                            <p>Date: January 15, 2026</p>
                          </div>
                          <div>
                            <p className="font-medium mb-2">TENANT:</p>
                            <p>John Doe</p>
                            <p className="mt-6 font-medium">Signature: _________________</p>
                            <p>Date: _________________</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="summary" className="space-y-4">
                      <div className="rounded-md border p-4">
                        <h3 className="font-medium mb-4">Key Terms Summary</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <dt className="font-medium text-muted-foreground">New Lease Term:</dt>
                            <dd>12 months (March 1, 2026 - February 28, 2027)</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-muted-foreground">New Monthly Rent:</dt>
                            <dd>$1,493.50 (3% increase from current rent)</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-muted-foreground">Security Deposit:</dt>
                            <dd>$2,175.00 (unchanged)</dd>
                          </div>
                          <div>
                            <dt className="font-medium text-muted-foreground">Other Terms:</dt>
                            <dd>All other terms from original lease remain in effect</dd>
                          </div>
                        </dl>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Electronic Signature</CardTitle>
                    <CardDescription>Sign your lease renewal agreement electronically</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertTitle>Legal Agreement</AlertTitle>
                      <AlertDescription>
                        By signing this document, you are entering into a legally binding agreement. Please review the
                        entire document carefully before signing.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signature">Your Signature</Label>
                        <div className="border rounded-md p-4 bg-muted/30">
                          <div className="flex items-center gap-2 mb-2">
                            <Pen className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium">Type your full legal name to sign</p>
                          </div>
                          <input
                            id="signature"
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="Type your full legal name"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            required
                          />
                          {signature && (
                            <div className="mt-4 p-4 border-t">
                              <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                              <p className="font-signature text-xl">{signature}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 pt-4">
                        <Checkbox
                          id="agreement"
                          checked={hasAgreed}
                          onCheckedChange={(checked) => setHasAgreed(checked === true)}
                          required
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="agreement"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I have read and agree to the terms
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            I confirm that I have read and understood the entire lease renewal agreement and agree to be
                            bound by its terms and conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" type="button" asChild>
                      <Link href="/dashboard/renewals">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !hasAgreed || !signature}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Pen className="mr-2 h-4 w-4" />
                          Sign Agreement
                        </>
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


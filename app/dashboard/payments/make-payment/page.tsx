"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, CreditCard, Landmark, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MakePaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("1450.00")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page
    router.push("/dashboard/payments/confirmation")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Make a Payment</h2>

          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Complete your rent payment securely</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="text"
                      className="pl-7"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Your current rent amount is $1,450.00</p>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Tabs defaultValue="card" className="w-full" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Save Card for Future Payments</Label>
                        <RadioGroup defaultValue="no">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="save-yes" />
                            <Label htmlFor="save-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="save-no" />
                            <Label htmlFor="save-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>
                    <TabsContent value="bank" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Holder Name</Label>
                        <Input id="accountName" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input id="routingNumber" placeholder="123456789" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" placeholder="1234567890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <RadioGroup defaultValue="checking">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="checking" id="checking" />
                            <Label htmlFor="checking">Checking</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="savings" id="savings" />
                            <Label htmlFor="savings">Savings</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference">Payment Reference</Label>
                  <Input id="reference" defaultValue="April 2025 Rent" />
                  <p className="text-sm text-muted-foreground">Add a reference to help identify this payment</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {paymentMethod === "card" ? (
                        <CreditCard className="mr-2 h-4 w-4" />
                      ) : (
                        <Landmark className="mr-2 h-4 w-4" />
                      )}
                      Pay ${paymentAmount}
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Your payment information is secured with bank-level encryption.</p>
            <p className="mt-2">
              By making a payment, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


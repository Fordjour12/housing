"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, CalendarClock, CreditCard, Landmark, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SchedulePaymentsPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard
    router.push("/dashboard?tab=payments")
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
          <h2 className="text-3xl font-bold tracking-tight mb-6">Schedule Recurring Payments</h2>

          <Card>
            <CardHeader>
              <CardTitle>Automatic Payment Setup</CardTitle>
              <CardDescription>Set up recurring payments for your rent</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autopay">Enable Automatic Payments</Label>
                    <Switch id="autopay" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your rent will be automatically paid on the scheduled date each month
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="amount" type="text" className="pl-7" defaultValue="1450.00" readOnly />
                  </div>
                  <p className="text-sm text-muted-foreground">This is your current monthly rent amount</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Payment Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Payment Date</Label>
                  <Select defaultValue="1">
                    <SelectTrigger id="paymentDate">
                      <SelectValue placeholder="Select date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st of each month</SelectItem>
                      <SelectItem value="5">5th of each month</SelectItem>
                      <SelectItem value="10">10th of each month</SelectItem>
                      <SelectItem value="15">15th of each month</SelectItem>
                      <SelectItem value="20">20th of each month</SelectItem>
                      <SelectItem value="25">25th of each month</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Select when you want your payment to be processed</p>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <RadioGroup defaultValue="card" onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card (•••• 4242)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center">
                        <Landmark className="mr-2 h-4 w-4" />
                        Bank Account (•••• 7890)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new">Add New Payment Method</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminders">Payment Reminders</Label>
                    <Switch id="reminders" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications 3 days before each payment
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting Up...
                    </>
                  ) : (
                    <>
                      <CalendarClock className="mr-2 h-4 w-4" />
                      Schedule Recurring Payments
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}


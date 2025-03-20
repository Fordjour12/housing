import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function LeaseRenewalOptions() {
  // This would typically come from an API or database
  const renewalOptions = [
    {
      id: "option-1",
      title: "Standard Renewal",
      term: "12 months",
      newEndDate: "February 28, 2027",
      currentRent: 1450,
      newRent: 1493.5,
      increasePercentage: 3,
      increaseAmount: 43.5,
      isRecommended: true,
      benefits: [
        "Stable rent for another full year",
        "No need to move or find a new place",
        "Predictable housing costs for budgeting",
        "Continued access to all amenities and services",
      ],
    },
    {
      id: "option-2",
      title: "Short-Term Renewal",
      term: "6 months",
      newEndDate: "August 31, 2026",
      currentRent: 1450,
      newRent: 1522.5,
      increasePercentage: 5,
      increaseAmount: 72.5,
      isRecommended: false,
      benefits: [
        "More flexibility for future plans",
        "Less long-term commitment",
        "Option to reassess housing needs sooner",
        "Ability to time your next move during peak rental season",
      ],
    },
    {
      id: "option-3",
      title: "Month-to-Month",
      term: "Monthly",
      newEndDate: "Flexible",
      currentRent: 1450,
      newRent: 1595.0,
      increasePercentage: 10,
      increaseAmount: 145.0,
      isRecommended: false,
      benefits: [
        "Maximum flexibility",
        "No long-term commitment",
        "Ability to move with 30 days notice",
        "Good option if you're uncertain about future plans",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Renewal Options</CardTitle>
          <CardDescription>Review the available options for renewing your lease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {renewalOptions.map((option) => (
              <Card key={option.id} className={option.isRecommended ? "border-primary" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{option.title}</CardTitle>
                    {option.isRecommended && <Badge className="bg-primary text-primary-foreground">Recommended</Badge>}
                  </div>
                  <CardDescription>
                    {option.term} term • Ends {option.newEndDate}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Rent:</span>
                      <span className="text-sm">${option.currentRent.toFixed(2)}/month</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-sm">New Rent:</span>
                      <span className="text-sm">${option.newRent.toFixed(2)}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Increase:</span>
                      <span className="text-rose-500">
                        +${option.increaseAmount.toFixed(2)} ({option.increasePercentage}%)
                      </span>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div>
                    <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      {option.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={option.isRecommended ? "default" : "outline"}>
                    Select This Option
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="rounded-md border p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-medium">Renewal Timeline</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  To ensure a smooth renewal process, please select your preferred option by January 15, 2026. This will
                  give us enough time to prepare the renewal agreement and complete the signing process before your
                  current lease expires.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">Request Custom Terms</Button>
          <Link href="/dashboard/renewals/new">
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Renewal Process
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}


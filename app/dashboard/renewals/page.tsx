import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Calendar, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { LeaseRenewalStatus } from "@/components/lease-renewal-status"
import { LeaseRenewalOptions } from "@/components/lease-renewal-options"
import { LeaseRenewalHistory } from "@/components/lease-renewal-history"

export default function LeaseRenewalsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=renewals">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Lease Renewal</h2>
              <p className="text-muted-foreground">Manage your lease renewal process and options</p>
            </div>
            <Link href="/dashboard/renewals/new">
              <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Renewal Process
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Current Lease Timeline</CardTitle>
              <CardDescription>Important dates for your lease renewal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Lease Start Date</h3>
                    <p className="text-lg">March 1, 2025</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Renewal Decision Deadline</h3>
                    <p className="text-lg">January 29, 2026</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Lease End Date</h3>
                    <p className="text-lg">February 28, 2026</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lease Start</span>
                    <span>Renewal Period</span>
                    <span>Lease End</span>
                  </div>
                  <div className="relative pt-2">
                    <Progress value={25} className="h-2" />
                    <div className="absolute top-0 left-[60%] h-4 w-4 -translate-x-1/2 translate-y-[-25%]">
                      <div className="h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>March 1, 2025</span>
                    <span>December 30, 2025</span>
                    <span>February 28, 2026</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="status" className="space-y-6">
            <TabsList>
              <TabsTrigger value="status">Renewal Status</TabsTrigger>
              <TabsTrigger value="options">Renewal Options</TabsTrigger>
              <TabsTrigger value="history">Renewal History</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-6">
              <LeaseRenewalStatus />
            </TabsContent>

            <TabsContent value="options" className="space-y-6">
              <LeaseRenewalOptions />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <LeaseRenewalHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


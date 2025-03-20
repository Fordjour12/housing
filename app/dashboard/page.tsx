import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, FileText, Home, Upload, Wrench, MessageSquare, Scale, Shield, RefreshCw } from "lucide-react"
import Link from "next/link"
import { LeaseOverview } from "@/components/lease-overview"
import { UpcomingReminders } from "@/components/upcoming-reminders"
import { DashboardHeader } from "@/components/dashboard-header"
import { PaymentHistoryList } from "@/components/payment-history-list"
import { MaintenanceRequestsList } from "@/components/maintenance-requests-list"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/upload">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Lease
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="condition">Condition</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="security-deposit">Security Deposit</TabsTrigger>
            <TabsTrigger value="renewals">Renewals</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          {/* Existing tab content remains the same */}
          <TabsContent value="overview" className="space-y-4">
            {/* Existing overview content */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-xs text-muted-foreground">Expires in 245 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,450</div>
                  <p className="text-xs text-muted-foreground">Due on the 1st of each month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">1 open, 1 in progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Reminder</CardTitle>
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30 days</div>
                  <p className="text-xs text-muted-foreground">Until rent payment due</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Current Lease Overview</CardTitle>
                  <CardDescription>Key details from your active lease agreement</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <LeaseOverview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Reminders</CardTitle>
                  <CardDescription>Stay on top of important dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingReminders />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Add new Renewals tab content */}
          <TabsContent value="renewals" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Lease Renewals</CardTitle>
                  <CardDescription>Manage your lease renewal process</CardDescription>
                </div>
                <Link href="/dashboard/renewals">
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    View Renewal Options
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Current Lease Status</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Lease End Date</p>
                        <p className="text-xl font-bold">February 28, 2026</p>
                        <p className="text-xs text-muted-foreground">245 days remaining</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Renewal Notice Deadline</p>
                        <p className="text-xl font-bold">January 29, 2026</p>
                        <p className="text-xs text-muted-foreground">30 days before lease end</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Renewal Status</p>
                        <p className="text-xl font-bold">Not Started</p>
                        <p className="text-xs text-muted-foreground">Renewal period begins in 185 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center border-t">
                    <Link href="/dashboard/renewals">
                      <Button>Manage Renewal</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other existing tab content remains the same */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Lease Documents</CardTitle>
                <CardDescription>All your lease agreements in one secure place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Apartment Lease Agreement</p>
                        <p className="text-xs text-muted-foreground">Uploaded on Mar 15, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link href="/dashboard/upload">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Document
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Maintenance Requests</CardTitle>
                  <CardDescription>Submit and track maintenance issues</CardDescription>
                </div>
                <Link href="/dashboard/maintenance/new">
                  <Button>
                    <Wrench className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <MaintenanceRequestsList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="condition" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Property Condition</CardTitle>
                  <CardDescription>Document and track the condition of your rental property</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Move-in checklist"
                          className="object-cover w-full h-full opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col items-center justify-center text-white p-4">
                          <h3 className="text-xl font-bold mb-2">Move-In Checklist</h3>
                          <p className="text-sm text-center">
                            Document the condition of your property at the start of your lease
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Last updated: March 1, 2025</p>
                          <p className="text-sm font-medium">75% Complete</p>
                        </div>
                        <Link href="/dashboard/condition/move-in">
                          <Button>Continue</Button>
                        </Link>
                      </div>
                    </div>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="aspect-video bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt="Move-out checklist"
                          className="object-cover w-full h-full opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex flex-col items-center justify-center text-white p-4">
                          <h3 className="text-xl font-bold mb-2">Move-Out Checklist</h3>
                          <p className="text-sm text-center">
                            Document the condition of your property at the end of your lease
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Not started yet</p>
                          <p className="text-sm font-medium">Available Feb 1, 2026</p>
                        </div>
                        <Button variant="outline" disabled>
                          Not Available
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="rounded-md border">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Property Media Gallery</h3>
                    <p className="text-sm text-muted-foreground">
                      All photos and videos documenting your property's condition
                    </p>
                  </div>
                  <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square rounded-md bg-muted overflow-hidden relative group">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Property image"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="m15 3 6 6m0 0-6 6m6-6H3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-square rounded-md bg-muted overflow-hidden relative group">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Property image"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="m15 3 6 6m0 0-6 6m6-6H3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-square rounded-md bg-muted overflow-hidden relative group">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Property image"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="m15 3 6 6m0 0-6 6m6-6H3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-square rounded-md bg-muted overflow-hidden relative group">
                      <img
                        src="/placeholder.svg?height=150&width=150"
                        alt="Property image"
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="m15 3 6 6m0 0-6 6m6-6H3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center border-t">
                    <Link href="/dashboard/condition/gallery">
                      <Button variant="outline">View All Media</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Communications</CardTitle>
                  <CardDescription>Secure messaging with your landlord and property management</CardDescription>
                </div>
                <Link href="/dashboard/messages/new">
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Message
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Recent Messages</h3>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div className="grid gap-1">
                        <div className="font-medium">Rent Increase Notice</div>
                        <div className="text-sm text-muted-foreground">From: Sarah Johnson (Landlord)</div>
                        <div className="text-sm text-muted-foreground">March 15, 2025</div>
                      </div>
                      <Link href="/dashboard/messages/msg_1">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="grid gap-1">
                        <div className="font-medium">Question about pet policy</div>
                        <div className="text-sm text-muted-foreground">To: Sarah Johnson (Landlord)</div>
                        <div className="text-sm text-muted-foreground">March 10, 2025</div>
                      </div>
                      <Link href="/dashboard/messages/msg_2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="grid gap-1">
                        <div className="font-medium">Quarterly Inspection Notice</div>
                        <div className="text-sm text-muted-foreground">From: Sarah Johnson (Landlord)</div>
                        <div className="text-sm text-muted-foreground">February 28, 2025</div>
                      </div>
                      <Link href="/dashboard/messages/msg_3">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center border-t">
                    <Link href="/dashboard/messages">
                      <Button variant="ghost">View All Messages</Button>
                    </Link>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Dispute Resolution Resources</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Access resources to help resolve disputes and understand your rights as a tenant.
                    </p>
                    <Link href="/dashboard/disputes">
                      <Button variant="outline">
                        <Scale className="mr-2 h-4 w-4" />
                        View Dispute Resources
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security-deposit" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Security Deposit</CardTitle>
                  <CardDescription>Track and manage your security deposit</CardDescription>
                </div>
                <Link href="/dashboard/security-deposit">
                  <Button variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Security Deposit Summary</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Initial Deposit</p>
                        <p className="text-xl font-bold">$2,175.00</p>
                        <p className="text-xs text-muted-foreground">Paid on March 1, 2025</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Interest Earned</p>
                        <p className="text-xl font-bold">$21.75</p>
                        <p className="text-xs text-muted-foreground">1% annual interest rate</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                        <p className="text-xl font-bold">$2,196.75</p>
                        <p className="text-xs text-muted-foreground">As of March 20, 2025</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center border-t">
                    <Link href="/dashboard/security-deposit">
                      <Button>View Full Details</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Manage your rent payments and view payment history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Next Payment</h3>
                    <p className="text-sm text-muted-foreground">$1,450.00 due on April 1, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/dashboard/payments/make-payment">
                      <Button>Make a Payment</Button>
                    </Link>
                    <Link href="/dashboard/payments/schedule">
                      <Button variant="outline">Schedule Payments</Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-md border">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Recent Payments</h3>
                  </div>
                  <div className="p-0">
                    <PaymentHistoryList limit={3} />
                  </div>
                  <div className="p-4 flex justify-center">
                    <Link href="/dashboard/payments/history">
                      <Button variant="ghost">View Full Payment History</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reminders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reminder Settings</CardTitle>
                <CardDescription>Configure when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Rent Payment Reminder</div>
                      <div className="text-sm text-muted-foreground">Notify 3 days before due date</div>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Lease Expiration</div>
                      <div className="text-sm text-muted-foreground">Notify 60, 30, and 14 days before expiration</div>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <div className="font-medium">Maintenance Requests</div>
                      <div className="text-sm text-muted-foreground">Notify when status changes</div>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


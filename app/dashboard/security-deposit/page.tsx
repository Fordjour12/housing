import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Download, FileText, Info } from "lucide-react"
import Link from "next/link"
import { SecurityDepositSummary } from "@/components/security-deposit-summary"
import { SecurityDepositHistory } from "@/components/security-deposit-history"
import { SecurityDepositReturn } from "@/components/security-deposit-return"
import { Separator } from "@/components/ui/separator"

export default function SecurityDepositPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=security-deposit">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Security Deposit</h2>
              <p className="text-muted-foreground">Track and manage your security deposit throughout your lease</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/security-deposit/receipt">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Link>
            </Button>
          </div>

          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
              <TabsTrigger value="return">Return Status</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Deposit Details</CardTitle>
                  <CardDescription>Overview of your security deposit information</CardDescription>
                </CardHeader>
                <CardContent>
                  <SecurityDepositSummary />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Deposit Agreement</CardTitle>
                  <CardDescription>Terms and conditions related to your security deposit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Security Deposit Terms</h3>
                    </div>
                    <div className="space-y-4 text-sm">
                      <p>The following terms are extracted from your lease agreement regarding the security deposit:</p>
                      <div className="pl-4 border-l-2 border-muted italic">
                        <p className="mb-2">
                          <strong>Section 5.1:</strong> Tenant has paid a security deposit in the amount of $2,175.00 to
                          be held by Landlord as security for Tenant's faithful performance of the terms of this
                          Agreement.
                        </p>
                        <p className="mb-2">
                          <strong>Section 5.2:</strong> The security deposit shall accrue interest at the rate of 1% per
                          annum, compounded annually, as required by San Francisco Administrative Code Chapter 49.
                        </p>
                        <p className="mb-2">
                          <strong>Section 5.3:</strong> Within twenty-one (21) days after Tenant vacates the premises,
                          Landlord shall furnish Tenant with an itemized written statement of the basis for, and the
                          amount of, any security deposit retained by the Landlord, and shall return any remaining
                          portion of the security deposit to Tenant.
                        </p>
                        <p>
                          <strong>Section 5.4:</strong> The security deposit may be used by Landlord to remedy any
                          default by Tenant in the payment of rent, to repair damages to the premises caused by Tenant,
                          to clean the premises upon termination of the tenancy, and for any other purpose permitted by
                          California law.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4 bg-blue-50">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-700">Interest Calculation</h3>
                        <p className="text-sm text-blue-600">
                          Your security deposit earns 1% annual interest as required by local regulations. Interest is
                          calculated from the date of payment and compounded annually. The current accrued interest is
                          $21.75 based on 12 months of tenancy.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Complete history of your security deposit transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <SecurityDepositHistory />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="return" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Return Status</CardTitle>
                  <CardDescription>Track the status of your security deposit return</CardDescription>
                </CardHeader>
                <CardContent>
                  <SecurityDepositReturn />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regulations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Deposit Regulations</CardTitle>
                  <CardDescription>Information about local laws governing security deposits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">California Security Deposit Laws</h3>
                    <div className="space-y-4 text-sm">
                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-1">Maximum Amount</h4>
                        <p className="text-muted-foreground">
                          In California, landlords can charge a maximum of 2 months' rent for unfurnished units and 3
                          months' rent for furnished units as a security deposit.
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-1">Return Timeline</h4>
                        <p className="text-muted-foreground">
                          Landlords must return the security deposit within 21 days after the tenant moves out, along
                          with an itemized statement of any deductions.
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-1">Allowable Deductions</h4>
                        <p className="text-muted-foreground">Landlords can deduct from the security deposit for:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>Unpaid rent</li>
                          <li>Damage beyond normal wear and tear</li>
                          <li>
                            Cleaning to restore the unit to the same level of cleanliness as at the beginning of the
                            tenancy
                          </li>
                          <li>Restoration or replacement of personal property (if allowed in the lease)</li>
                        </ul>
                      </div>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-1">Interest Requirements</h4>
                        <p className="text-muted-foreground">
                          California state law does not require landlords to pay interest on security deposits, but some
                          cities (including San Francisco, Berkeley, and Los Angeles) have local ordinances requiring
                          interest payments.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">San Francisco Security Deposit Interest</h3>
                    <div className="space-y-4 text-sm">
                      <p className="text-muted-foreground">
                        San Francisco Administrative Code Chapter 49 requires landlords to pay interest on security
                        deposits held for at least one year. The interest rate is set annually by the San Francisco Rent
                        Board.
                      </p>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-1">Current Interest Rate</h4>
                        <p className="text-muted-foreground">
                          The current interest rate for security deposits in San Francisco is 1.0% per annum.
                        </p>
                      </div>

                      <div className="rounded-md border p-4">
                        <h4 className="font-medium mb-1">Payment Schedule</h4>
                        <p className="text-muted-foreground">
                          Landlords must pay interest on security deposits annually, either by direct payment to the
                          tenant or by applying the interest as a credit toward the tenant's rent.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4 bg-muted/30">
                    <h3 className="font-medium mb-2">Resources</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link
                          href="https://www.courts.ca.gov/selfhelp-eviction-security-deposits.htm"
                          className="text-primary hover:underline flex items-center"
                          target="_blank"
                        >
                          California Courts: Security Deposit Information
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1 h-3 w-3"
                          >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://sfrb.org/topic-no-051-security-deposits"
                          className="text-primary hover:underline flex items-center"
                          target="_blank"
                        >
                          San Francisco Rent Board: Security Deposit Guidelines
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1 h-3 w-3"
                          >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.dca.ca.gov/publications/landlordbook/sec-deposit.shtml"
                          className="text-primary hover:underline flex items-center"
                          target="_blank"
                        >
                          California Department of Consumer Affairs: Security Deposit Law
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1 h-3 w-3"
                          >
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


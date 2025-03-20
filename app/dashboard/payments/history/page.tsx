import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { PaymentHistoryList } from "@/components/payment-history-list"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default function PaymentHistoryPage() {
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

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Payment History</h2>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>View your complete payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentHistoryList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


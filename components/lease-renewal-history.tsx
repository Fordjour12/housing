import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"

interface RenewalHistoryItem {
  id: string
  leaseStartDate: string
  leaseEndDate: string
  renewalDate: string
  term: string
  previousRent: number
  newRent: number
  increasePercentage: number
  status: "active" | "expired" | "upcoming"
  hasDocument: boolean
}

export function LeaseRenewalHistory() {
  // This would typically come from an API or database
  const renewalHistory: RenewalHistoryItem[] = [
    {
      id: "renewal-001",
      leaseStartDate: "March 1, 2024",
      leaseEndDate: "February 28, 2025",
      renewalDate: "January 15, 2024",
      term: "12 months",
      previousRent: 1400.0,
      newRent: 1450.0,
      increasePercentage: 3.57,
      status: "expired",
      hasDocument: true,
    },
    {
      id: "renewal-002",
      leaseStartDate: "March 1, 2025",
      leaseEndDate: "February 28, 2026",
      renewalDate: "January 20, 2025",
      term: "12 months",
      previousRent: 1450.0,
      newRent: 1493.5,
      increasePercentage: 3.0,
      status: "active",
      hasDocument: true,
    },
  ]

  const getStatusBadge = (status: RenewalHistoryItem["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Active
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
            Expired
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Upcoming
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Renewal History</CardTitle>
        <CardDescription>History of your previous lease renewals</CardDescription>
      </CardHeader>
      <CardContent>
        {renewalHistory.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No renewal history</h3>
            <p className="text-muted-foreground">
              You haven't renewed your lease yet. Your renewal history will appear here once you complete your first
              renewal.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {renewalHistory.map((renewal) => (
              <div key={renewal.id} className="rounded-md border overflow-hidden">
                <div className="p-4 bg-muted/50 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      Lease Term: {renewal.leaseStartDate} - {renewal.leaseEndDate}
                    </h3>
                    <p className="text-sm text-muted-foreground">Renewed on {renewal.renewalDate}</p>
                  </div>
                  {getStatusBadge(renewal.status)}
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Renewal Details</h4>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="text-muted-foreground">Term Length:</dt>
                        <dd>{renewal.term}</dd>
                        <dt className="text-muted-foreground">Previous Rent:</dt>
                        <dd>${renewal.previousRent.toFixed(2)}/month</dd>
                        <dt className="text-muted-foreground">New Rent:</dt>
                        <dd>${renewal.newRent.toFixed(2)}/month</dd>
                        <dt className="text-muted-foreground">Increase:</dt>
                        <dd>{renewal.increasePercentage.toFixed(2)}%</dd>
                      </dl>
                    </div>
                    <div className="flex items-center justify-center md:justify-end">
                      {renewal.hasDocument && (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Agreement
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}


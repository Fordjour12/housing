import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LeaseOverview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Property Address</p>
              <p className="font-medium">123 Main Street, Apt 4B</p>
              <p className="text-sm">San Francisco, CA 94103</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Lease Period</p>
              <p className="font-medium">12 Months</p>
              <p className="text-sm">March 1, 2025 - February 28, 2026</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Landlord Information</p>
              <p className="font-medium">Skyline Properties LLC</p>
              <p className="text-sm">Contact: Sarah Johnson</p>
              <p className="text-sm">Phone: (415) 555-1234</p>
              <p className="text-sm">Email: sarah@skylineproperties.com</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Payment Details</p>
              <div className="flex justify-between">
                <p className="text-sm">Monthly Rent:</p>
                <p className="font-medium">$1,450</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Due Date:</p>
                <p className="font-medium">1st of each month</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Late Fee:</p>
                <p className="font-medium">$50 after the 5th</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Security Deposit:</p>
                <p className="font-medium">$2,175</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Policy Highlights</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Pets Allowed (with deposit)</Badge>
              <Badge variant="outline">No Smoking</Badge>
              <Badge variant="outline">Utilities Not Included</Badge>
              <Badge variant="outline">Maintenance Requests Online</Badge>
              <Badge variant="outline">30-Day Notice Required</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


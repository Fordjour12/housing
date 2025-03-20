import { Separator } from "@/components/ui/separator"

export function LeaseDetailsView() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Property Information</h3>
        <Separator className="my-2" />
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Property Address</dt>
            <dd className="text-sm">123 Main Street, Apt 4B</dd>
            <dd className="text-sm">San Francisco, CA 94103</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Property Type</dt>
            <dd className="text-sm">Apartment</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Square Footage</dt>
            <dd className="text-sm">850 sq ft</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Bedrooms/Bathrooms</dt>
            <dd className="text-sm">1 Bedroom, 1 Bathroom</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium">Lease Terms</h3>
        <Separator className="my-2" />
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Lease Start Date</dt>
            <dd className="text-sm">March 1, 2025</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Lease End Date</dt>
            <dd className="text-sm">February 28, 2026</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Lease Term</dt>
            <dd className="text-sm">12 Months</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Renewal Terms</dt>
            <dd className="text-sm">Month-to-month after expiration with 30 days notice</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium">Financial Details</h3>
        <Separator className="my-2" />
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Monthly Rent</dt>
            <dd className="text-sm">$1,450.00</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Security Deposit</dt>
            <dd className="text-sm">$2,175.00</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Payment Due Date</dt>
            <dd className="text-sm">1st of each month</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Late Fee</dt>
            <dd className="text-sm">$50.00 if paid after the 5th</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Accepted Payment Methods</dt>
            <dd className="text-sm">Bank transfer, check, online portal</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Utilities Included</dt>
            <dd className="text-sm">Water and trash only</dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-medium">Landlord Information</h3>
        <Separator className="my-2" />
        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Landlord/Property Management</dt>
            <dd className="text-sm">Skyline Properties LLC</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Contact Person</dt>
            <dd className="text-sm">Sarah Johnson</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Phone Number</dt>
            <dd className="text-sm">(415) 555-1234</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
            <dd className="text-sm">sarah@skylineproperties.com</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Office Address</dt>
            <dd className="text-sm">555 Market Street, Suite 300</dd>
            <dd className="text-sm">San Francisco, CA 94105</dd>
          </div>
          <div className="flex flex-col space-y-1 py-2">
            <dt className="text-sm font-medium text-muted-foreground">Emergency Contact</dt>
            <dd className="text-sm">(415) 555-9999</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}


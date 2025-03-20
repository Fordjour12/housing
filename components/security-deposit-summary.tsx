import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Shield } from "lucide-react"

export function SecurityDepositSummary() {
  // This would typically come from an API or database
  const depositData = {
    initialAmount: 2175.0,
    currentBalance: 2196.75,
    interestEarned: 21.75,
    interestRate: 1.0,
    paymentDate: "March 1, 2025",
    leaseStartDate: "March 1, 2025",
    leaseEndDate: "February 28, 2026",
    holdingPeriod: "12 months",
    landlord: "Skyline Properties LLC",
    propertyAddress: "123 Main Street, Apt 4B, San Francisco, CA 94103",
    depositType: "Refundable Security Deposit",
    depositPurpose: ["Unpaid rent", "Damage beyond normal wear and tear", "Cleaning costs", "Unpaid utilities"],
    depositStatus: "Active",
    returnDeadline: "21 days after move-out",
    nextInterestPayment: "March 1, 2026",
  }

  // Calculate the percentage of the lease term completed
  const startDate = new Date(depositData.leaseStartDate)
  const endDate = new Date(depositData.leaseEndDate)
  const today = new Date()
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  const daysElapsed = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  const percentComplete = Math.min(Math.max(Math.round((daysElapsed / totalDays) * 100), 0), 100)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Initial Deposit</h3>
          </div>
          <div className="text-3xl font-bold">${depositData.initialAmount.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">Paid on {depositData.paymentDate}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Interest Earned</h3>
          <div className="text-3xl font-bold">${depositData.interestEarned.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">{depositData.interestRate}% annual interest rate</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Current Balance</h3>
          <div className="text-3xl font-bold">${depositData.currentBalance.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">As of {today.toLocaleDateString()}</p>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-medium">Lease Term Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Lease Start: {depositData.leaseStartDate}</span>
            <span>Lease End: {depositData.leaseEndDate}</span>
          </div>
          <Progress value={percentComplete} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{percentComplete}% complete</span>
            <span>{Math.round(totalDays - daysElapsed)} days remaining</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-medium mb-2">Deposit Information</h3>
          <dl className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between py-1">
              <dt className="font-medium text-muted-foreground">Deposit Type:</dt>
              <dd>{depositData.depositType}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="font-medium text-muted-foreground">Status:</dt>
              <dd>{depositData.depositStatus}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="font-medium text-muted-foreground">Holding Period:</dt>
              <dd>{depositData.holdingPeriod}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="font-medium text-muted-foreground">Next Interest Payment:</dt>
              <dd>{depositData.nextInterestPayment}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="font-medium text-muted-foreground">Return Deadline:</dt>
              <dd>{depositData.returnDeadline}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="font-medium mb-2">Deposit Purpose</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Your security deposit may be used for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {depositData.depositPurpose.map((purpose, index) => (
              <li key={index}>{purpose}</li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="font-medium">Property & Landlord Information</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col space-y-1 py-1">
            <dt className="font-medium text-muted-foreground">Property Address:</dt>
            <dd>{depositData.propertyAddress}</dd>
          </div>
          <div className="flex flex-col space-y-1 py-1">
            <dt className="font-medium text-muted-foreground">Landlord/Property Management:</dt>
            <dd>{depositData.landlord}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}


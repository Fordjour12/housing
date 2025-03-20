import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface Transaction {
  id: string
  date: string
  type: "payment" | "interest" | "deduction" | "refund"
  description: string
  amount: number
  balance: number
  receipt?: boolean
}

export function SecurityDepositHistory() {
  // This would typically come from an API or database
  const transactions: Transaction[] = [
    {
      id: "txn_001",
      date: "March 1, 2025",
      type: "payment",
      description: "Initial security deposit payment",
      amount: 2175.0,
      balance: 2175.0,
      receipt: true,
    },
    {
      id: "txn_002",
      date: "March 1, 2026",
      type: "interest",
      description: "Annual interest payment (1% for 12 months)",
      amount: 21.75,
      balance: 2196.75,
    },
  ]

  // For demonstration purposes, let's add some projected future transactions
  const projectedTransactions: Transaction[] = [
    {
      id: "proj_001",
      date: "February 28, 2026",
      type: "deduction",
      description: "Projected: Cleaning fee (estimate)",
      amount: -150.0,
      balance: 2046.75,
    },
    {
      id: "proj_002",
      date: "March 15, 2026",
      type: "refund",
      description: "Projected: Security deposit refund",
      amount: -2046.75,
      balance: 0.0,
    },
  ]

  const getTransactionBadge = (type: Transaction["type"]) => {
    switch (type) {
      case "payment":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Payment
          </Badge>
        )
      case "interest":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Interest
          </Badge>
        )
      case "deduction":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            Deduction
          </Badge>
        )
      case "refund":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
            Refund
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <div className="p-4 bg-muted/50">
          <h3 className="font-medium">Transaction History</h3>
        </div>
        <div className="divide-y">
          {transactions.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No transactions found</div>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{transaction.description}</span>
                      {getTransactionBadge(transaction.type)}
                    </div>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount >= 0 ? "+" : ""}
                        {transaction.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">Balance: ${transaction.balance.toFixed(2)}</div>
                    </div>
                    {transaction.receipt && (
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download receipt</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-md border border-dashed">
        <div className="p-4 bg-muted/30">
          <h3 className="font-medium">Projected Future Transactions</h3>
          <p className="text-sm text-muted-foreground mt-1">
            These are estimated transactions based on your lease end date and typical security deposit processing.
          </p>
        </div>
        <div className="divide-y">
          {projectedTransactions.map((transaction) => (
            <div key={transaction.id} className="p-4 bg-muted/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{transaction.description}</span>
                    {getTransactionBadge(transaction.type)}
                  </div>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount >= 0 ? "+" : ""}
                    {transaction.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Balance: ${transaction.balance.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          This transaction history includes all activity related to your security deposit. Interest calculations are
          based on the terms in your lease agreement and local regulations.
        </p>
      </div>
    </div>
  )
}


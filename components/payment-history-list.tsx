import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Link from "next/link"

interface Payment {
  id: string
  date: string
  amount: number
  status: "completed" | "pending" | "failed"
  method: string
  reference: string
}

interface PaymentHistoryListProps {
  limit?: number
}

export function PaymentHistoryList({ limit }: PaymentHistoryListProps) {
  // This would typically come from an API or database
  const payments: Payment[] = [
    {
      id: "pay_123456",
      date: "March 1, 2025",
      amount: 1450,
      status: "completed",
      method: "Credit Card (•••• 4242)",
      reference: "March 2025 Rent",
    },
    {
      id: "pay_123455",
      date: "February 1, 2025",
      amount: 1450,
      status: "completed",
      method: "Bank Transfer",
      reference: "February 2025 Rent",
    },
    {
      id: "pay_123454",
      date: "January 1, 2025",
      amount: 1450,
      status: "completed",
      method: "Credit Card (•••• 4242)",
      reference: "January 2025 Rent",
    },
    {
      id: "pay_123453",
      date: "December 1, 2024",
      amount: 1450,
      status: "completed",
      method: "Bank Transfer",
      reference: "December 2024 Rent",
    },
    {
      id: "pay_123452",
      date: "November 1, 2024",
      amount: 1450,
      status: "completed",
      method: "Credit Card (•••• 4242)",
      reference: "November 2024 Rent",
    },
  ]

  const displayPayments = limit ? payments.slice(0, limit) : payments

  return (
    <div className="divide-y">
      {displayPayments.map((payment) => (
        <div key={payment.id} className="flex items-center justify-between p-4">
          <div className="grid gap-1">
            <div className="font-medium">{payment.reference}</div>
            <div className="text-sm text-muted-foreground">{payment.date}</div>
            <div className="text-sm text-muted-foreground">{payment.method}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="font-medium">${payment.amount.toFixed(2)}</div>
              <Badge
                variant={
                  payment.status === "completed"
                    ? "outline"
                    : payment.status === "pending"
                      ? "secondary"
                      : "destructive"
                }
                className={
                  payment.status === "completed"
                    ? "bg-green-50 text-green-700 hover:bg-green-50"
                    : payment.status === "pending"
                      ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                      : ""
                }
              >
                {payment.status === "completed" ? "Paid" : payment.status === "pending" ? "Pending" : "Failed"}
              </Badge>
            </div>
            <Link href={`/dashboard/payments/receipt/${payment.id}`}>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download receipt</span>
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {displayPayments.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">No payment history available</div>
      )}
    </div>
  )
}


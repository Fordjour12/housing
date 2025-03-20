import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

interface MaintenanceRequest {
  id: string
  title: string
  status: "open" | "in_progress" | "scheduled" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "emergency"
  dateSubmitted: string
  lastUpdated: string
  category: string
  unreadMessages: number
}

interface MaintenanceRequestsListProps {
  limit?: number
}

export function MaintenanceRequestsList({ limit }: MaintenanceRequestsListProps) {
  // This would typically come from an API or database
  const requests: MaintenanceRequest[] = [
    {
      id: "req_1001",
      title: "Leaking kitchen faucet",
      status: "in_progress",
      priority: "medium",
      dateSubmitted: "March 15, 2025",
      lastUpdated: "March 17, 2025",
      category: "Plumbing",
      unreadMessages: 2,
    },
    {
      id: "req_1002",
      title: "Broken light fixture in bathroom",
      status: "open",
      priority: "low",
      dateSubmitted: "March 18, 2025",
      lastUpdated: "March 18, 2025",
      category: "Electrical",
      unreadMessages: 0,
    },
    {
      id: "req_1000",
      title: "HVAC not cooling properly",
      status: "completed",
      priority: "high",
      dateSubmitted: "February 28, 2025",
      lastUpdated: "March 5, 2025",
      category: "HVAC",
      unreadMessages: 0,
    },
    {
      id: "req_999",
      title: "Dishwasher not draining",
      status: "completed",
      priority: "medium",
      dateSubmitted: "February 10, 2025",
      lastUpdated: "February 15, 2025",
      category: "Appliance",
      unreadMessages: 0,
    },
  ]

  const displayRequests = limit ? requests.slice(0, limit) : requests

  const getStatusBadge = (status: MaintenanceRequest["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Open
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
            In Progress
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: MaintenanceRequest["priority"]) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50">
            High
          </Badge>
        )
      case "emergency":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            Emergency
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {displayRequests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No maintenance requests found</p>
          <Link href="/dashboard/maintenance/new">
            <Button className="mt-4">Submit a Request</Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y">
          {displayRequests.map((request) => (
            <div key={request.id} className="py-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/maintenance/${request.id}`}>
                      <h3 className="font-medium hover:underline">{request.title}</h3>
                    </Link>
                    {request.unreadMessages > 0 && (
                      <div className="flex items-center">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {request.unreadMessages} new
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="text-muted-foreground">#{request.id}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{request.category}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Submitted: {request.dateSubmitted}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(request.status)}
                  {getPriorityBadge(request.priority)}
                  <Link href={`/dashboard/maintenance/${request.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


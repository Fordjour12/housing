import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, MessageSquare, Search } from "lucide-react"
import Link from "next/link"
import { MessageList } from "@/components/message-list"

export default function MessagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=messages">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
              <p className="text-muted-foreground">Secure communication with your landlord and property management</p>
            </div>
            <Link href="/dashboard/messages/new">
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Message History</CardTitle>
                  <CardDescription>View and search your communication history</CardDescription>
                </div>
                <div className="relative w-full md:w-auto">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search messages..." className="pl-8 w-full md:w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <MessageList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


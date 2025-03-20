"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Calendar, CheckCircle, Clock, Loader2, MessageSquare, Send, User, Wrench } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: string
  sender: "tenant" | "landlord" | "maintenance"
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
}

export default function MaintenanceRequestDetailPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_1",
      sender: "tenant",
      senderName: "John Doe",
      content:
        "The kitchen faucet has been leaking for a couple of days now. Water is pooling under the sink and it's getting worse.",
      timestamp: "March 15, 2025 10:23 AM",
      isRead: true,
    },
    {
      id: "msg_2",
      sender: "landlord",
      senderName: "Sarah Johnson",
      content:
        "Thank you for reporting this issue. I've scheduled a maintenance technician to come take a look. They should be able to visit tomorrow between 9 AM and 12 PM. Is that time frame acceptable for you?",
      timestamp: "March 15, 2025 11:45 AM",
      isRead: true,
    },
    {
      id: "msg_3",
      sender: "tenant",
      senderName: "John Doe",
      content: "Yes, that time works for me. Thank you for the quick response!",
      timestamp: "March 15, 2025 12:10 PM",
      isRead: true,
    },
    {
      id: "msg_4",
      sender: "maintenance",
      senderName: "Mike Rodriguez",
      content:
        "I've inspected the faucet and identified the issue. The washer is worn out and needs to be replaced. I'll need to get the part and come back to complete the repair. I should be able to return tomorrow with the part.",
      timestamp: "March 16, 2025 10:30 AM",
      isRead: true,
    },
    {
      id: "msg_5",
      sender: "landlord",
      senderName: "Sarah Johnson",
      content:
        "The maintenance team has updated me on the status. They've ordered the part and will return to complete the repair. Let us know if the leak gets worse in the meantime.",
      timestamp: "March 17, 2025 9:15 AM",
      isRead: false,
    },
  ])

  const searchParams = useSearchParams()
  const showSuccess = searchParams.get("success") === "true"

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setIsSending(true)

    // Simulate sending delay
    setTimeout(() => {
      const newMsg: Message = {
        id: `msg_${messages.length + 1}`,
        sender: "tenant",
        senderName: "John Doe",
        content: newMessage,
        timestamp: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        isRead: true,
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")
      setIsSending(false)
    }, 1000)
  }

  // This would typically come from an API based on the request ID
  const requestDetails = {
    id: params.id,
    title: "Leaking kitchen faucet",
    status: "in_progress",
    priority: "medium",
    dateSubmitted: "March 15, 2025",
    lastUpdated: "March 17, 2025",
    category: "Plumbing",
    location: "Kitchen",
    description:
      "The kitchen faucet has been leaking for a couple of days now. Water is pooling under the sink and it's getting worse.",
    preferredTimes: ["Morning (8 AM - 12 PM)", "Evening (5 PM - 8 PM)"],
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    appointmentDate: "March 18, 2025",
    appointmentTime: "9:00 AM - 12:00 PM",
  }

  const getStatusBadge = (status: string) => {
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">
            Low Priority
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Medium Priority
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50">
            High Priority
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
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=maintenance">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Maintenance
            </Button>
          </Link>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your maintenance request has been submitted successfully.
            </AlertDescription>
          </Alert>
        )}

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{requestDetails.title}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-sm text-muted-foreground">Request #{requestDetails.id}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Submitted: {requestDetails.dateSubmitted}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {getStatusBadge(requestDetails.status)}
              {getPriorityBadge(requestDetails.priority)}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Request Status</DialogTitle>
                    <DialogDescription>Change the status of your maintenance request</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <RadioGroup defaultValue={requestDetails.status}>
                      <div className="flex items-center space-x-2 py-2">
                        <RadioGroupItem value="open" id="status-open" />
                        <Label htmlFor="status-open">Open</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-2">
                        <RadioGroupItem value="in_progress" id="status-in-progress" />
                        <Label htmlFor="status-in-progress">In Progress</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-2">
                        <RadioGroupItem value="completed" id="status-completed" />
                        <Label htmlFor="status-completed">Completed</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-2">
                        <RadioGroupItem value="cancelled" id="status-cancelled" />
                        <Label htmlFor="status-cancelled">Cancel Request</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Update Status</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Tabs defaultValue="messages" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="details">Request Details</TabsTrigger>
                </TabsList>
                <TabsContent value="messages" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Communication</CardTitle>
                      <CardDescription>Messages between you, your landlord, and maintenance personnel</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 max-h-[500px] overflow-y-auto p-1">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "tenant" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.sender === "tenant"
                                  ? "bg-primary text-primary-foreground"
                                  : message.sender === "landlord"
                                    ? "bg-blue-100 text-blue-900"
                                    : "bg-green-100 text-green-900"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">
                                  {message.senderName}
                                  {message.sender === "landlord" && " (Landlord)"}
                                  {message.sender === "maintenance" && " (Maintenance)"}
                                </span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                              <div className="flex justify-end mt-1">
                                <span className="text-xs opacity-70">{message.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full items-center space-x-2">
                        <Textarea
                          placeholder="Type your message here..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          type="submit"
                          size="icon"
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || isSending}
                        >
                          {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Request Information</CardTitle>
                      <CardDescription>Details about your maintenance request</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Issue Details</h3>
                        <Separator className="my-2" />
                        <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <div className="flex flex-col space-y-1 py-2">
                            <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                            <dd className="text-sm">{requestDetails.category}</dd>
                          </div>
                          <div className="flex flex-col space-y-1 py-2">
                            <dt className="text-sm font-medium text-muted-foreground">Location</dt>
                            <dd className="text-sm">{requestDetails.location}</dd>
                          </div>
                          <div className="flex flex-col space-y-1 py-2">
                            <dt className="text-sm font-medium text-muted-foreground">Date Submitted</dt>
                            <dd className="text-sm">{requestDetails.dateSubmitted}</dd>
                          </div>
                          <div className="flex flex-col space-y-1 py-2">
                            <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                            <dd className="text-sm">{requestDetails.lastUpdated}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Description</h3>
                        <Separator className="my-2" />
                        <p className="text-sm">{requestDetails.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Preferred Times</h3>
                        <Separator className="my-2" />
                        <ul className="list-disc pl-5 text-sm">
                          {requestDetails.preferredTimes.map((time, index) => (
                            <li key={index}>{time}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Photos/Videos</h3>
                        <Separator className="my-2" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                          {requestDetails.images.map((image, index) => (
                            <div key={index} className="relative rounded-md overflow-hidden border aspect-square">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Issue image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment</CardTitle>
                  <CardDescription>Scheduled maintenance visit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requestDetails.appointmentDate ? (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div className="font-medium">{requestDetails.appointmentDate}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>{requestDetails.appointmentTime}</div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No appointment scheduled yet</p>
                      <Button className="mt-4">Schedule Appointment</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacts</CardTitle>
                  <CardDescription>People involved with this request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-muted-foreground">Property Manager</div>
                      <div className="text-sm">(415) 555-1234</div>
                      <div className="text-sm">sarah@skylineproperties.com</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Mike Rodriguez</div>
                      <div className="text-sm text-muted-foreground">Maintenance Technician</div>
                      <div className="text-sm">(415) 555-5678</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" className="w-full" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


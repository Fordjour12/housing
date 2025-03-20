"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Paperclip, MessageSquare } from "lucide-react"

interface Message {
  id: string
  subject: string
  sender: string
  senderRole: "tenant" | "landlord" | "property-manager"
  recipient: string
  recipientRole: "tenant" | "landlord" | "property-manager"
  date: string
  preview: string
  isRead: boolean
  hasAttachments: boolean
  category: "general" | "maintenance" | "payment" | "lease" | "dispute"
}

export function MessageList() {
  const [filter, setFilter] = useState<string>("all")

  // This would typically come from an API or database
  const messages: Message[] = [
    {
      id: "msg_1",
      subject: "Rent Increase Notice",
      sender: "Sarah Johnson",
      senderRole: "landlord",
      recipient: "John Doe",
      recipientRole: "tenant",
      date: "March 15, 2025",
      preview:
        "This is to inform you that according to the terms of your lease agreement, there will be a rent increase of 3% effective from your next renewal date...",
      isRead: true,
      hasAttachments: true,
      category: "lease",
    },
    {
      id: "msg_2",
      subject: "Question about pet policy",
      sender: "John Doe",
      senderRole: "tenant",
      recipient: "Sarah Johnson",
      recipientRole: "landlord",
      date: "March 10, 2025",
      preview:
        "I was reviewing our lease agreement and had a question about the pet policy. It states that small pets are allowed with an additional deposit...",
      isRead: true,
      hasAttachments: false,
      category: "general",
    },
    {
      id: "msg_3",
      subject: "Quarterly Inspection Notice",
      sender: "Sarah Johnson",
      senderRole: "landlord",
      recipient: "John Doe",
      recipientRole: "tenant",
      date: "February 28, 2025",
      preview:
        "This is a reminder that we will be conducting our quarterly inspection of all units in the building on March 15, 2025, between 10 AM and 2 PM...",
      isRead: true,
      hasAttachments: false,
      category: "general",
    },
    {
      id: "msg_4",
      subject: "Late Payment Notice",
      sender: "Sarah Johnson",
      senderRole: "landlord",
      recipient: "John Doe",
      recipientRole: "tenant",
      date: "February 6, 2025",
      preview:
        "Our records indicate that your rent payment for February 2025 has not been received. As per your lease agreement, a late fee of $50 will be applied...",
      isRead: true,
      hasAttachments: true,
      category: "payment",
    },
    {
      id: "msg_5",
      subject: "Response to maintenance request #1001",
      sender: "Mike Rodriguez",
      senderRole: "property-manager",
      recipient: "John Doe",
      recipientRole: "tenant",
      date: "January 25, 2025",
      preview:
        "Thank you for submitting your maintenance request regarding the leaking kitchen faucet. I've scheduled a plumber to visit your unit on January 27...",
      isRead: true,
      hasAttachments: false,
      category: "maintenance",
    },
    {
      id: "msg_6",
      subject: "Noise complaint resolution",
      sender: "Sarah Johnson",
      senderRole: "landlord",
      recipient: "John Doe",
      recipientRole: "tenant",
      date: "January 15, 2025",
      preview:
        "I wanted to follow up regarding the noise complaint you filed last week. I've spoken with the tenants in unit 3C, and they have agreed to be more mindful...",
      isRead: true,
      hasAttachments: false,
      category: "dispute",
    },
    {
      id: "msg_7",
      subject: "Welcome to your new home!",
      sender: "Sarah Johnson",
      senderRole: "landlord",
      recipient: "John Doe",
      recipientRole: "tenant",
      date: "January 1, 2025",
      preview:
        "Welcome to your new home! We're excited to have you as a tenant. This email contains important information to help you get settled in...",
      isRead: true,
      hasAttachments: true,
      category: "general",
    },
  ]

  // Filter messages based on selected filter
  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((message) => {
          if (filter === "sent") return message.senderRole === "tenant"
          if (filter === "received") return message.senderRole !== "tenant"
          return message.category === filter
        })

  // Sort messages by date (newest first)
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {sortedMessages.length} {sortedMessages.length === 1 ? "message" : "messages"}
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter messages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="lease">Lease</SelectItem>
            <SelectItem value="dispute">Disputes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedMessages.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No messages found</h3>
          <p className="text-muted-foreground">
            {filter !== "all" ? "Try adjusting your filters" : "Start a conversation with your landlord"}
          </p>
          <Link href="/dashboard/messages/new">
            <Button className="mt-4">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y border rounded-md">
          {sortedMessages.map((message) => (
            <Link key={message.id} href={`/dashboard/messages/${message.id}`}>
              <div className={`p-4 hover:bg-muted/50 ${!message.isRead ? "bg-blue-50" : ""}`}>
                <div className="flex justify-between items-start">
                  <div className="grid gap-1">
                    <div className="font-medium flex items-center">
                      {!message.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>}
                      {message.subject}
                      {message.hasAttachments && <Paperclip className="ml-2 h-3 w-3 text-muted-foreground" />}
                    </div>
                    <div className="text-sm">
                      {message.senderRole === "tenant" ? (
                        <span>
                          To: {message.recipient} (
                          {message.recipientRole === "landlord" ? "Landlord" : "Property Manager"})
                        </span>
                      ) : (
                        <span>
                          From: {message.sender} ({message.senderRole === "landlord" ? "Landlord" : "Property Manager"})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{message.date}</div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{message.preview}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 whitespace-nowrap">
                    {message.category === "general" && "General"}
                    {message.category === "maintenance" && "Maintenance"}
                    {message.category === "payment" && "Payment"}
                    {message.category === "lease" && "Lease"}
                    {message.category === "dispute" && "Dispute"}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}


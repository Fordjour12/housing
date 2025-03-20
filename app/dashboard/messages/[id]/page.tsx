"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, Download, Loader2, Paperclip, Reply, Send, Trash } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const router = useRouter()

  // This would typically come from an API based on the message ID
  const message = {
    id: params.id,
    subject: "Rent Increase Notice",
    sender: "Sarah Johnson",
    senderRole: "landlord",
    recipient: "John Doe",
    recipientRole: "tenant",
    date: "March 15, 2025 10:30 AM",
    content: `Dear John,

I hope this message finds you well. This is to inform you that according to the terms of your lease agreement, there will be a rent increase of 3% effective from your next renewal date on March 1, 2026.

Your current monthly rent is $1,450.00, and the new monthly rent will be $1,493.50. This increase is in line with the annual adjustment clause in your lease agreement (Section 4.2) and reflects the current market rates in the area.

Please note that this notice is being provided well in advance of the required 60-day notice period specified in your lease. If you have any questions or concerns regarding this increase, please don't hesitate to contact me.

We value you as a tenant and look forward to continuing our relationship.

Best regards,
Sarah Johnson
Skyline Properties LLC`,
    attachments: [
      { name: "Rent_Increase_Notice.pdf", size: "245 KB" },
      { name: "Lease_Agreement_Section_4.2.pdf", size: "156 KB" },
    ],
    category: "lease",
    thread: [
      {
        id: "reply_1",
        sender: "John Doe",
        senderRole: "tenant",
        date: "March 15, 2025 11:45 AM",
        content:
          "Thank you for the advance notice. I have a question about the calculation. Could you please provide a breakdown of how the 3% was applied?",
        attachments: [],
      },
      {
        id: "reply_2",
        sender: "Sarah Johnson",
        senderRole: "landlord",
        date: "March 15, 2025 2:15 PM",
        content: `Hi John,

Here's the breakdown of the rent increase calculation:

Current monthly rent: $1,450.00
Increase percentage: 3%
Increase amount: $1,450.00 × 0.03 = $43.50
New monthly rent: $1,450.00 + $43.50 = $1,493.50

Let me know if you have any other questions!

Best,
Sarah`,
        attachments: [],
      },
    ],
  }

  const handleReply = async () => {
    if (!replyText.trim()) return

    setIsSending(true)

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSending(false)
    setIsReplying(false)
    setReplyText("")

    // In a real app, you would add the reply to the thread
    // and refresh the data
  }

  const handleDelete = async () => {
    // Simulate deletion
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Redirect to messages list
    router.push("/dashboard/messages")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard/messages">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Messages
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{message.subject}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">
                  {message.category === "general" && "General"}
                  {message.category === "maintenance" && "Maintenance"}
                  {message.category === "payment" && "Payment"}
                  {message.category === "lease" && "Lease"}
                  {message.category === "dispute" && "Dispute"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {message.thread.length + 1} {message.thread.length === 0 ? "message" : "messages"} in this
                  conversation
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsReplying(true)}>
                <Reply className="mr-2 h-4 w-4" />
                Reply
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this message and all replies. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Original message */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={message.sender} />
                    <AvatarFallback>
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{message.sender}</p>
                        <p className="text-sm text-muted-foreground">
                          {message.senderRole === "landlord" ? "Landlord" : "Property Manager"}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.date}</p>
                    </div>
                    <div className="mt-2 whitespace-pre-line text-sm">{message.content}</div>

                    {message.attachments.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Attachments:</p>
                        <div className="space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center">
                                <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{attachment.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">({attachment.size})</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Thread replies */}
              {message.thread.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-6">
                    {message.thread.map((reply) => (
                      <div key={reply.id} className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={reply.sender} />
                            <AvatarFallback>
                              {reply.sender
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="font-medium">{reply.sender}</p>
                                <p className="text-sm text-muted-foreground">
                                  {reply.senderRole === "landlord" ? "Landlord" : "Tenant"}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">{reply.date}</p>
                            </div>
                            <div className="mt-2 whitespace-pre-line text-sm">{reply.content}</div>

                            {reply.attachments.length > 0 && (
                              <div className="mt-4">
                                <p className="text-sm font-medium mb-2">Attachments:</p>
                                <div className="space-y-2">
                                  {reply.attachments.map((attachment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-2 border rounded-md"
                                    >
                                      <div className="flex items-center">
                                        <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                                        <span className="text-sm">{attachment.name}</span>
                                        <span className="text-xs text-muted-foreground ml-2">({attachment.size})</span>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                        <span className="sr-only">Download</span>
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Reply form */}
              {isReplying && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Type your reply..."
                          className="min-h-[120px]"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="outline" onClick={() => setIsReplying(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleReply} disabled={!replyText.trim() || isSending}>
                            {isSending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Reply
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" onClick={() => setIsReplying(true)}>
                <Reply className="mr-2 h-4 w-4" />
                Reply
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/messages/new">New Message</Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete this message and all replies. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}


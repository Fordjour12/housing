"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Send,
  ChevronDown,
  MoreVertical,
  Phone,
  Video,
  Info,
  PaperclipIcon,
  ImageIcon,
  SmileIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data for conversations
const CONVERSATIONS_DATA = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100&text=SJ",
      isLandlord: true,
      isOnline: true,
    },
    property: {
      id: 201,
      title: "Cozy 2 Bedroom Apartment",
      address: "123 Main St, Houston, TX",
    },
    lastMessage: {
      text: "Yes, the apartment is still available for viewing this weekend.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false,
      sender: "them",
    },
    unreadCount: 2,
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100&text=MR",
      isLandlord: true,
      isOnline: false,
    },
    property: {
      id: 202,
      title: "Modern Studio Downtown",
      address: "456 Center Ave, Houston, TX",
    },
    lastMessage: {
      text: "I've just sent over the lease agreement for you to review.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      isRead: true,
      sender: "them",
    },
    unreadCount: 0,
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=100&width=100&text=EW",
      isLandlord: true,
      isOnline: true,
    },
    property: {
      id: 203,
      title: "Luxury 3 Bedroom House",
      address: "789 Oak Dr, Houston, TX",
    },
    lastMessage: {
      text: "Would it be possible to schedule a second viewing tomorrow?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      sender: "you",
    },
    unreadCount: 0,
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "David Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=DC",
      isLandlord: true,
      isOnline: false,
    },
    property: {
      id: 204,
      title: "Spacious 1 Bedroom Loft",
      address: "101 Loft Ave, Houston, TX",
    },
    lastMessage: {
      text: "The application has been approved! When would you like to move in?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      isRead: false,
      sender: "them",
    },
    unreadCount: 1,
  },
  {
    id: 5,
    user: {
      id: 105,
      name: "Jessica Martinez",
      avatar: "/placeholder.svg?height=100&width=100&text=JM",
      isLandlord: false,
      isOnline: true,
    },
    property: {
      id: 205,
      title: "Garden Apartment with Patio",
      address: "222 Garden St, Houston, TX",
    },
    lastMessage: {
      text: "I'm interested in your property. Is it pet-friendly?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
      isRead: true,
      sender: "them",
    },
    unreadCount: 0,
  },
]

// Sample messages for a conversation
const MESSAGES_DATA = [
  {
    id: 1,
    text: "Hi there! I'm interested in your Cozy 2 Bedroom Apartment. Is it still available?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30), // 1 day and 30 minutes ago
    sender: "you",
    isRead: true,
  },
  {
    id: 2,
    text: "Hello! Yes, the apartment is still available. Would you like to schedule a viewing?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    sender: "them",
    isRead: true,
  },
  {
    id: 3,
    text: "That would be great! I'm available this weekend. Do you have any openings on Saturday?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
    sender: "you",
    isRead: true,
  },
  {
    id: 4,
    text: "I have an opening at 2 PM on Saturday. Would that work for you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    sender: "them",
    isRead: true,
  },
  {
    id: 5,
    text: "2 PM works perfectly! Also, I wanted to ask if the apartment is pet-friendly? I have a small dog.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    sender: "you",
    isRead: true,
  },
  {
    id: 6,
    text: "Yes, the apartment is pet-friendly. There's a $25 monthly pet fee. Looking forward to meeting you on Saturday!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    sender: "them",
    isRead: true,
  },
  {
    id: 7,
    text: "That sounds reasonable. I'll see you on Saturday at 2 PM. Should I bring anything specific?",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    sender: "you",
    isRead: true,
  },
  {
    id: 8,
    text: "Just bring your ID and proof of income if you're interested in applying after the viewing.",
    timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 minutes ago
    sender: "them",
    isRead: true,
  },
  {
    id: 9,
    text: "Perfect! One last question - is parking included?",
    timestamp: new Date(Date.now() - 1000 * 60 * 35), // 35 minutes ago
    sender: "you",
    isRead: true,
  },
  {
    id: 10,
    text: "Yes, the apartment comes with one assigned parking spot. Additional spots are available for $50/month.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    sender: "them",
    isRead: false,
  },
]

export default function MessagesInbox() {
  const [activeConversation, setActiveConversation] = useState<number | null>(1)
  const [conversations, setConversations] = useState(CONVERSATIONS_DATA)
  const [messages, setMessages] = useState(MESSAGES_DATA)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const [showConversations, setShowConversations] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobileView(mobile)
      if (mobile && activeConversation) {
        setShowConversations(false)
      } else {
        setShowConversations(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeConversation])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeConversation])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return

    // Add new message
    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      timestamp: new Date(),
      sender: "you" as const,
      isRead: false,
    }

    setMessages([...messages, newMsg])

    // Update conversation with last message
    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: {
                text: newMessage,
                timestamp: new Date(),
                isRead: false,
                sender: "you",
              },
            }
          : conv,
      ),
    )

    setNewMessage("")
  }

  const handleConversationClick = (id: number) => {
    setActiveConversation(id)

    // Mark messages as read
    setConversations(
      conversations.map((conv) =>
        conv.id === id ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } } : conv,
      ),
    )

    if (isMobileView) {
      setShowConversations(false)
    }
  }

  const handleBackToConversations = () => {
    if (isMobileView) {
      setShowConversations(true)
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.property.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const activeConversationData = conversations.find((conv) => conv.id === activeConversation)

  return (
    <div className="flex flex-1 border rounded-lg overflow-hidden">
      {/* Conversations List */}
      {(showConversations || !isMobileView) && (
        <div className={`${isMobileView ? "w-full" : "w-1/3 border-r"} bg-background flex flex-col`}>
          <div className="p-4 border-b">
            <Tabs defaultValue="all">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Unread
                  <Badge variant="secondary" className="ml-1">
                    {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search conversations"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No conversations found</div>
            ) : (
              filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                    activeConversation === conversation.id && "bg-muted",
                  )}
                  onClick={() => handleConversationClick(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback>
                          {conversation.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.lastMessage.sender === "you" ? "You: " : ""}
                        {conversation.lastMessage.text}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground truncate">{conversation.property.title}</span>
                        {conversation.unreadCount > 0 && (
                          <Badge
                            variant="default"
                            className="rounded-full h-5 min-w-5 flex items-center justify-center"
                          >
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Message Thread */}
      {(!showConversations || !isMobileView) && activeConversationData && (
        <div className={`${isMobileView ? "w-full" : "w-2/3"} flex flex-col bg-background`}>
          {/* Conversation Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobileView && (
                <Button variant="ghost" size="icon" onClick={handleBackToConversations} className="mr-1">
                  <ChevronDown className="rotate-90" />
                </Button>
              )}
              <Avatar className="h-10 w-10">
                <AvatarImage src={activeConversationData.user.avatar} alt={activeConversationData.user.name} />
                <AvatarFallback>
                  {activeConversationData.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{activeConversationData.user.name}</h3>
                  {activeConversationData.user.isOnline && <span className="text-xs text-green-500">Online</span>}
                </div>
                <p className="text-xs text-muted-foreground">{activeConversationData.property.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View property details</DropdownMenuItem>
                  <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                  <DropdownMenuItem>Block user</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Property Info */}
          <div className="p-3 bg-muted/30 border-b flex items-center gap-3">
            <div className="h-12 w-12 relative rounded-md overflow-hidden">
              <Image
                src="/placeholder.svg?height=100&width=100&text=Property"
                alt={activeConversationData.property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{activeConversationData.property.title}</h4>
              <p className="text-xs text-muted-foreground">{activeConversationData.property.address}</p>
            </div>
            <Button variant="outline" size="sm">
              View Listing
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.sender === "you" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === "you"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none",
                  )}
                >
                  <p>{message.text}</p>
                  <div
                    className={cn(
                      "text-xs mt-1 flex items-center gap-1",
                      message.sender === "you" ? "text-primary-foreground/70 justify-end" : "text-muted-foreground",
                    )}
                  >
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    {message.sender === "you" && <span>{message.isRead ? "Read" : "Delivered"}</span>}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Textarea
                  placeholder="Type a message..."
                  className="min-h-[80px] resize-none"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SmileIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()} className="h-10">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


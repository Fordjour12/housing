"use client"

import Link from "next/link"
import { Home, MessageSquare, User, LayoutDashboard, FileText, Settings, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationSheet } from "@/components/notification-sheet"
import { useNotifications } from "@/context/notifications-context"

export default function LandlordHeader() {
  // Get unread message count from the notifications context
  const { notifications } = useNotifications()
  const unreadMessageCount = notifications.filter((n) => n.type === "message" && !n.isRead).length

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RentEasy</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/landlord/dashboard" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/landlord/listings" className="text-sm font-medium text-primary flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Listings</span>
          </Link>
          <Link
            href="/landlord/applications"
            className="text-sm font-medium hover:text-primary flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            <span>Applications</span>
          </Link>
          <Link href="/landlord/tenants" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Tenants</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/messages" className="relative">
            <MessageSquare className="h-5 w-5" />
            {unreadMessageCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {unreadMessageCount}
              </Badge>
            )}
            <span className="sr-only">Messages</span>
          </Link>

          {/* Replace the Bell icon with our NotificationSheet component */}
          <NotificationSheet />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=100&width=100&text=JD" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Landlord Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}


"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define notification types
export type NotificationType = "message" | "application" | "listing" | "payment" | "system"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  link?: string
  image?: string
}

interface NotificationsContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

// Sample notifications data
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah Johnson",
    message: "I'm interested in scheduling a viewing for the apartment this weekend. Would Saturday work?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    link: "/messages/1",
    image: "/placeholder.svg?height=100&width=100&text=SJ",
  },
  {
    id: "2",
    type: "application",
    title: "Application status updated",
    message: "Your application for Cozy 2 Bedroom Apartment has been approved!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    link: "/applications/app1",
  },
  {
    id: "3",
    type: "listing",
    title: "New listing matches your search",
    message: "3 new properties match your 'Downtown 2BR' saved search",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isRead: true,
    link: "/listings?search=search1",
  },
  {
    id: "4",
    type: "payment",
    title: "Payment confirmation",
    message: "Your payment of $29.99 for Landlord Pro subscription has been processed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    link: "/account?tab=payments",
  },
  {
    id: "5",
    type: "system",
    title: "Account security alert",
    message: "Your account was accessed from a new device. If this wasn't you, please secure your account.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    isRead: true,
    link: "/account?tab=settings",
  },
]

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [unreadCount, setUnreadCount] = useState(0)

  // Update unread count whenever notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter((notification) => !notification.isRead).length)
  }, [notifications])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "isRead">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider")
  }
  return context
}


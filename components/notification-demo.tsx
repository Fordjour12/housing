"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNotifications, type NotificationType } from "@/context/notifications-context"
import { Bell, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function NotificationDemo() {
  const { addNotification } = useNotifications()
  const [notificationType, setNotificationType] = useState<NotificationType>("message")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddNotification = () => {
    if (!title || !message) return

    addNotification({
      type: notificationType,
      title,
      message,
      link: "#",
    })

    // Reset form and show success message
    setTitle("")
    setMessage("")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Demo</CardTitle>
        <CardDescription>Create a test notification to see how the notification system works</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSuccess && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-800" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Notification created successfully! Click the bell icon in the header to view it.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <label htmlFor="notification-type" className="text-sm font-medium">
            Notification Type
          </label>
          <Select value={notificationType} onValueChange={(value) => setNotificationType(value as NotificationType)}>
            <SelectTrigger id="notification-type">
              <SelectValue placeholder="Select notification type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="message">Message</SelectItem>
              <SelectItem value="application">Application</SelectItem>
              <SelectItem value="listing">Listing</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="notification-title" className="text-sm font-medium">
            Notification Title
          </label>
          <Input
            id="notification-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notification-message" className="text-sm font-medium">
            Notification Message
          </label>
          <Textarea
            id="notification-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
            rows={3}
          />
        </div>

        <Button onClick={handleAddNotification} disabled={!title || !message} className="w-full">
          <Bell className="mr-2 h-4 w-4" />
          Create Test Notification
        </Button>
      </CardContent>
    </Card>
  )
}


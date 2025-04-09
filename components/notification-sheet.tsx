// "use client"

// import { useState } from "react"
// import { formatDistanceToNow } from "date-fns"
// import Link from "next/link"
// import Image from "next/image"
// import { Bell, MailOpen, FileText, Home, CreditCard, Info, X, Check, Trash2 } from "lucide-react"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { useNotifications, type NotificationType } from "@/context/notifications-context"
// import { cn } from "@/lib/utils"

// export function NotificationSheet() {
//   const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
//     useNotifications()

//   const [open, setOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState("all")

//   // Mark notification as read when clicked
//   const handleNotificationClick = (id: string) => {
//     markAsRead(id)
//   }

//   // Filter notifications based on active tab
//   const filteredNotifications = notifications.filter((notification) => {
//     if (activeTab === "all") return true
//     if (activeTab === "unread") return !notification.isRead
//     return notification.type === activeTab
//   })

//   // Get icon based on notification type
//   const getNotificationIcon = (type: NotificationType) => {
//     switch (type) {
//       case "message":
//         return <MailOpen className="h-5 w-5 text-blue-500" />
//       case "application":
//         return <FileText className="h-5 w-5 text-green-500" />
//       case "listing":
//         return <Home className="h-5 w-5 text-purple-500" />
//       case "payment":
//         return <CreditCard className="h-5 w-5 text-amber-500" />
//       case "system":
//         return <Info className="h-5 w-5 text-red-500" />
//       default:
//         return <Bell className="h-5 w-5 text-gray-500" />
//     }
//   }

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           {unreadCount > 0 && (
//             <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
//               {unreadCount}
//             </Badge>
//           )}
//           <span className="sr-only">Notifications</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
//         <SheetHeader className="p-4 border-b">
//           <div className="flex items-center justify-between">
//             <SheetTitle>Notifications</SheetTitle>
//             <div className="flex items-center gap-2">
//               {unreadCount > 0 && (
//                 <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
//                   <Check className="h-3.5 w-3.5 mr-1" />
//                   Mark all as read
//                 </Button>
//               )}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={clearAllNotifications}
//                 className="text-xs h-8 text-destructive"
//               >
//                 <Trash2 className="h-3.5 w-3.5 mr-1" />
//                 Clear all
//               </Button>
//             </div>
//           </div>
//         </SheetHeader>

//         <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
//           <div className="px-4 pt-2">
//             <TabsList className="w-full">
//               <TabsTrigger value="all" className="flex-1">
//                 All
//                 <Badge variant="secondary" className="ml-1">
//                   {notifications.length}
//                 </Badge>
//               </TabsTrigger>
//               <TabsTrigger value="unread" className="flex-1">
//                 Unread
//                 <Badge variant="secondary" className="ml-1">
//                   {unreadCount}
//                 </Badge>
//               </TabsTrigger>
//               <TabsTrigger value="message" className="flex-1">
//                 Messages
//               </TabsTrigger>
//               <TabsTrigger value="application" className="flex-1">
//                 Apps
//               </TabsTrigger>
//             </TabsList>
//           </div>

//           <ScrollArea className="flex-1 p-4">
//             <TabsContent value={activeTab} className="m-0">
//               {filteredNotifications.length === 0 ? (
//                 <div className="text-center py-8">
//                   <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                   <h3 className="text-lg font-medium">No notifications</h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {activeTab === "unread"
//                       ? "You've read all your notifications"
//                       : "You don't have any notifications yet"}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   {filteredNotifications.map((notification) => (
//                     <div
//                       key={notification.id}
//                       className={cn(
//                         "p-3 rounded-lg border transition-colors",
//                         !notification.isRead ? "bg-muted/50" : "bg-background",
//                         "hover:bg-muted/30",
//                       )}
//                     >
//                       <Link
//                         href={notification.link || "#"}
//                         className="flex gap-3"
//                         onClick={() => handleNotificationClick(notification.id)}
//                       >
//                         <div className="flex-shrink-0">
//                           {notification.image ? (
//                             <div className="relative h-10 w-10 rounded-full overflow-hidden">
//                               <Image
//                                 src={notification.image || "/placeholder.svg"}
//                                 alt=""
//                                 fill
//                                 className="object-cover"
//                               />
//                             </div>
//                           ) : (
//                             <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
//                               {getNotificationIcon(notification.type)}
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-start">
//                             <p className={cn("font-medium text-sm", !notification.isRead && "font-semibold")}>
//                               {notification.title}
//                             </p>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-6 w-6 -mr-1 text-muted-foreground"
//                               onClick={(e) => {
//                                 e.preventDefault()
//                                 e.stopPropagation()
//                                 removeNotification(notification.id)
//                               }}
//                             >
//                               <X className="h-3 w-3" />
//                               <span className="sr-only">Dismiss</span>
//                             </Button>
//                           </div>
//                           <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">{notification.message}</p>
//                           <p className="text-xs text-muted-foreground mt-1">
//                             {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
//                           </p>
//                         </div>
//                       </Link>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           </ScrollArea>
//         </Tabs>
//       </SheetContent>
//     </Sheet>
//   )
// }

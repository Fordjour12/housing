import Header from "@/components/header"
import MessagesInbox from "@/components/messages-inbox"

export default function MessagesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-4 flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <MessagesInbox />
      </div>
    </div>
  )
}


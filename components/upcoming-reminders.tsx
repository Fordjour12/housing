import { CalendarClock, DollarSign, Home, AlertTriangle, Wrench, RefreshCw } from "lucide-react"

export function UpcomingReminders() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4 rounded-md border p-4">
        <DollarSign className="mt-px h-5 w-5 text-primary" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Rent Payment Due</p>
          <p className="text-sm text-muted-foreground">April 1, 2025 (30 days from now)</p>
          <p className="text-xs text-muted-foreground">$1,450 due to Skyline Properties LLC</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 rounded-md border p-4 bg-red-50">
        <AlertTriangle className="mt-px h-5 w-5 text-red-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none text-red-600">Late Fee Warning</p>
          <p className="text-sm text-red-600">$50 late fee will apply after April 5, 2025</p>
          <p className="text-xs text-red-600">Set up automatic payments to avoid late fees</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 rounded-md border p-4 bg-yellow-50">
        <Wrench className="mt-px h-5 w-5 text-yellow-600" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none text-yellow-700">Maintenance Appointment</p>
          <p className="text-sm text-yellow-700">March 18, 2025 (9:00 AM - 12:00 PM)</p>
          <p className="text-xs text-yellow-700">Plumber scheduled for kitchen faucet repair</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 rounded-md border p-4 bg-blue-50">
        <RefreshCw className="mt-px h-5 w-5 text-blue-600" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none text-blue-700">Lease Renewal Period Begins</p>
          <p className="text-sm text-blue-700">December 30, 2025 (185 days from now)</p>
          <p className="text-xs text-blue-700">Start thinking about your renewal preferences</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 rounded-md border p-4">
        <Home className="mt-px h-5 w-5 text-primary" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Lease Expiration</p>
          <p className="text-sm text-muted-foreground">February 28, 2026 (245 days from now)</p>
          <p className="text-xs text-muted-foreground">Renewal notice required by January 29, 2026</p>
        </div>
      </div>
      <div className="flex items-start space-x-4 rounded-md border p-4">
        <CalendarClock className="mt-px h-5 w-5 text-primary" />
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Quarterly Inspection</p>
          <p className="text-sm text-muted-foreground">June 15, 2025 (75 days from now)</p>
          <p className="text-xs text-muted-foreground">Scheduled between 9:00 AM and 12:00 PM</p>
        </div>
      </div>
    </div>
  )
}


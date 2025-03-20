import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { LeaseDetailsView } from "@/components/lease-details-view"
import { LeaseDocumentView } from "@/components/lease-document-view"
import { LeaseClausesView } from "@/components/lease-clauses-view"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LeaseDetailsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Lease Details</h2>
          <Button variant="outline">Download PDF</Button>
        </div>
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Key Details</TabsTrigger>
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="clauses">Important Clauses</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lease Information</CardTitle>
                <CardDescription>Key details extracted from your lease agreement</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaseDetailsView />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="document" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Original Document</CardTitle>
                <CardDescription>View your complete lease agreement</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaseDocumentView />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="clauses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Important Clauses</CardTitle>
                <CardDescription>Key policies and responsibilities from your lease</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaseClausesView />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


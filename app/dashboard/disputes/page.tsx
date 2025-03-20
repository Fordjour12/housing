import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, Scale } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function DisputeResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Link href="/dashboard?tab=messages">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dispute Resolution Resources</h2>
              <p className="text-muted-foreground">
                Information and resources to help resolve landlord-tenant disputes
              </p>
            </div>
          </div>

          <Tabs defaultValue="resources" className="space-y-6">
            <TabsList>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="legal">Legal Information</TabsTrigger>
              <TabsTrigger value="mediation">Mediation Services</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tenant Rights and Resources</CardTitle>
                  <CardDescription>Essential information about your rights as a tenant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Tenant Rights Handbook</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          A comprehensive guide to your rights and responsibilities as a tenant in California.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#" target="_blank">
                            <FileText className="mr-2 h-4 w-4" />
                            Download PDF
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">California Tenant Law</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Official information about California's tenant protection laws and regulations.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="https://www.courts.ca.gov/selfhelp-housing.htm" target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Tenant Advocacy Organizations</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Connect with local organizations that provide support and advocacy for tenants.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#" target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Directory
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Dispute Resolution Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Step-by-step guidance on how to resolve common landlord-tenant disputes.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="#" target="_blank">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Read Guide
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Common Dispute Topics</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Link href="#" className="group">
                        <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                          <h4 className="font-medium">Security Deposit Disputes</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Information about security deposit laws and how to resolve disputes.
                          </p>
                          <div className="flex items-center text-sm text-primary mt-2 group-hover:underline">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </Link>

                      <Link href="#" className="group">
                        <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                          <h4 className="font-medium">Maintenance and Repairs</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Understanding landlord responsibilities for property maintenance.
                          </p>
                          <div className="flex items-center text-sm text-primary mt-2 group-hover:underline">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </Link>

                      <Link href="#" className="group">
                        <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                          <h4 className="font-medium">Rent Increases</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Laws regarding rent increases and rent control regulations.
                          </p>
                          <div className="flex items-center text-sm text-primary mt-2 group-hover:underline">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </Link>

                      <Link href="#" className="group">
                        <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
                          <h4 className="font-medium">Eviction Protections</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Understanding eviction laws and tenant protections.
                          </p>
                          <div className="flex items-center text-sm text-primary mt-2 group-hover:underline">
                            Learn more
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Legal Information and Assistance</CardTitle>
                  <CardDescription>Resources for legal guidance and representation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Legal Aid Organizations</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Legal Aid Society of San Francisco</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Provides free legal assistance to low-income tenants in San Francisco.
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>Phone: (415) 555-7890</p>
                          <p>
                            Website:{" "}
                            <Link href="#" className="text-primary hover:underline">
                              www.legalaidsf.org
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Bay Area Legal Aid</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Offers legal services for housing issues throughout the Bay Area.
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>Phone: (510) 555-4321</p>
                          <p>
                            Website:{" "}
                            <Link href="#" className="text-primary hover:underline">
                              www.baylegal.org
                            </Link>
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="font-medium">Housing Rights Committee</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Provides counseling, education, and advocacy for tenants.
                        </p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>Phone: (415) 555-3456</p>
                          <p>
                            Website:{" "}
                            <Link href="#" className="text-primary hover:underline">
                              www.housingrights.org
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Legal Resources</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Small Claims Court Guide</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Information about filing a case in small claims court for disputes under $10,000.
                          </p>
                          <Button variant="link" className="px-0 mt-2" asChild>
                            <Link href="#" target="_blank">
                              Download Guide
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Legal Document Templates</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            Templates for common legal documents related to tenant-landlord disputes.
                          </p>
                          <Button variant="link" className="px-0 mt-2" asChild>
                            <Link href="#" target="_blank">
                              Access Templates
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mediation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mediation Services</CardTitle>
                  <CardDescription>Alternative dispute resolution options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">What is Mediation?</h3>
                    <p className="text-sm text-muted-foreground">
                      Mediation is a voluntary process where a neutral third party helps landlords and tenants resolve
                      disputes without going to court. It's often faster, less expensive, and less adversarial than
                      litigation.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Community Mediation Services</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Free or low-cost mediation services provided by community organizations.
                        </p>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li>
                            <Link href="#" className="text-primary hover:underline">
                              San Francisco Community Boards
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-primary hover:underline">
                              Bay Area Mediation Services
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-primary hover:underline">
                              California Dispute Resolution Council
                            </Link>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Court-Connected Mediation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Mediation services offered through the court system, often at reduced rates.
                        </p>
                        <ul className="mt-2 space-y-2 text-sm">
                          <li>
                            <Link href="#" className="text-primary hover:underline">
                              San Francisco Superior Court ADR Program
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-primary hover:underline">
                              Alameda County Court Mediation
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="text-primary hover:underline">
                              California Courts Self-Help Center
                            </Link>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Benefits of Mediation</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Preserves Relationships</p>
                          <p className="text-sm text-muted-foreground">
                            Helps maintain a positive landlord-tenant relationship through collaborative
                            problem-solving.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Cost-Effective</p>
                          <p className="text-sm text-muted-foreground">
                            Significantly less expensive than going to court, with many free or low-cost options
                            available.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Faster Resolution</p>
                          <p className="text-sm text-muted-foreground">
                            Disputes can often be resolved in days or weeks, rather than months or years in court.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Confidential Process</p>
                          <p className="text-sm text-muted-foreground">
                            Unlike court proceedings, mediation is private and confidential.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border p-4 bg-muted/30">
                    <h3 className="font-medium mb-2">How to Request Mediation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can request mediation through our platform by sending a message to your landlord proposing
                      mediation. We'll help facilitate the process and connect you with appropriate mediation services.
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/messages/new">
                        <Scale className="mr-2 h-4 w-4" />
                        Request Mediation
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Common questions about tenant rights and dispute resolution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What should I do if my landlord isn't making necessary repairs?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        First, document the issue with photos and send a written request for repairs to your landlord.
                        If they don't respond within a reasonable time (usually 30 days for non-emergency repairs), you
                        may have several options including contacting local housing authorities, withholding rent (in
                        some jurisdictions), or making the repair yourself and deducting the cost from your rent. Each
                        option has specific legal requirements, so consult with a tenant rights organization before
                        proceeding.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Can my landlord raise my rent at any time?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        If you have a lease, your rent cannot be increased until the lease term ends, unless your lease
                        specifically allows for increases. For month-to-month tenancies, landlords must provide proper
                        notice (usually 30 days for increases less than 10%, and 60 days for larger increases). Some
                        cities have rent control ordinances that limit how much and how often rent can be increased.
                        Check your local regulations or consult with a tenant rights organization.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">How can I dispute charges against my security deposit?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        If you believe your landlord has wrongfully withheld your security deposit, first review your
                        move-in and move-out documentation to compare the property's condition. Write a formal letter to
                        your landlord disputing the charges, citing relevant laws and including your evidence. If they
                        don't respond, you can pursue the matter in small claims court. In California, landlords must
                        provide an itemized statement of deductions within 21 days of move-out.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What is the difference between mediation and arbitration?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        In mediation, a neutral third party helps both sides communicate and reach a voluntary
                        agreement. The mediator doesn't make decisions for the parties. In arbitration, an arbitrator
                        hears evidence from both sides and makes a binding decision that both parties must follow.
                        Arbitration is more formal than mediation but less formal than court. While mediation is always
                        voluntary, arbitration may be required by some lease agreements.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">What should I do if I receive an eviction notice?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Don't ignore it! First, carefully read the notice to understand the reason for eviction and any
                        timeframes. If it's for non-payment of rent, you may have a period to "cure" by paying the
                        amount due. For other reasons, check if the notice complies with local laws. Document everything
                        and seek legal assistance immediately from a tenant rights organization or legal aid society.
                        Responding promptly and properly is crucial to protecting your rights.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">How do I document communication with my landlord?</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Always communicate important matters in writing, even if you've discussed them verbally. Use
                        email, certified mail, or the messaging system in this platform to create a record. Keep copies
                        of all correspondence, including dates and times. Take photos or videos of any issues with
                        timestamps. If you have phone conversations, follow up with an email summarizing what was
                        discussed. Good documentation is essential if a dispute escalates to mediation or court.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Have a question not answered here?{" "}
                    <Link href="/dashboard/messages/new" className="text-primary hover:underline">
                      Contact us
                    </Link>{" "}
                    or consult with a tenant rights organization.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


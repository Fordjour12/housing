"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react"
import { useState } from "react"

export function LeaseDocumentView() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center border rounded-lg p-4 bg-muted/30 min-h-[600px]">
        <div className="bg-white shadow-lg p-8 w-full max-w-2xl min-h-[600px] flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">RESIDENTIAL LEASE AGREEMENT</h2>
          </div>

          <p className="mb-4">
            <strong>THIS LEASE AGREEMENT</strong> (hereinafter referred to as the "Agreement") made and entered into
            this 15th day of February, 2025, by and between Skyline Properties LLC (hereinafter referred to as
            "Landlord") and John Doe (hereinafter referred to as "Tenant").
          </p>

          <p className="mb-4">
            <strong>WITNESSETH:</strong> That for and in consideration of the covenants and obligations contained herein
            and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the
            parties hereto agree as follows:
          </p>

          <p className="mb-4">
            <strong>1. PROPERTY:</strong> Landlord hereby leases to Tenant and Tenant hereby leases from Landlord the
            premises known as 123 Main Street, Apartment 4B, San Francisco, California 94103, (hereinafter referred to
            as the "Premises").
          </p>

          <p className="mb-4">
            <strong>2. TERM:</strong> This Agreement shall commence on March 1, 2025, and shall continue as a lease for
            term of twelve (12) months. The termination date shall be on February 28, 2026 at 11:59 PM. Upon termination
            date, Tenant shall be required to vacate the Premises unless one of the following circumstances occur: (i)
            Landlord and Tenant formally extend this Agreement in writing or create and execute a new, written, and
            signed Agreement; or (ii) Landlord willingly accepts new Rent from Tenant, which does not constitute past
            due Rent.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-auto">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  )
}


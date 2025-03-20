import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function LeaseClausesView() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Pet Policy</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm mb-2">
            Pets are allowed with prior written approval from the Landlord and payment of a non-refundable pet fee of
            $300.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Maximum of two (2) pets allowed per unit</li>
            <li>Dogs must be under 50 pounds when fully grown</li>
            <li>Breed restrictions apply (no aggressive breeds)</li>
            <li>All pets must be licensed and vaccinated according to local laws</li>
            <li>Tenant is responsible for any damage caused by pets</li>
            <li>Tenant must clean up after pets on the property</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Maintenance Responsibilities</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Landlord Responsibilities:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Structural repairs to the building</li>
                <li>Maintenance of common areas</li>
                <li>Plumbing issues not caused by tenant misuse</li>
                <li>Electrical systems</li>
                <li>Heating and air conditioning systems</li>
                <li>Appliances provided by the landlord</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Tenant Responsibilities:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Keeping the premises clean and sanitary</li>
                <li>Proper use of all appliances and fixtures</li>
                <li>Reporting maintenance issues promptly</li>
                <li>Minor repairs (light bulbs, unclogging drains)</li>
                <li>Damage caused by tenant negligence</li>
                <li>Pest control for infestations caused by tenant</li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Alterations and Modifications</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm mb-2">
            Tenant shall not make any alterations, additions, or improvements to the premises without prior written
            consent from the Landlord.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>No holes in walls except for small picture hanging nails</li>
            <li>No painting or wallpapering without written permission</li>
            <li>No structural changes or removal of fixtures</li>
            <li>No installation of satellite dishes or antennas without approval</li>
            <li>Approved modifications become property of the Landlord unless otherwise agreed</li>
            <li>Tenant must return premises to original condition upon move-out</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Noise and Nuisance Policy</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm mb-2">
            Tenant agrees not to cause or allow any noise or activity that disturbs the peace and quiet of other tenants
            or neighbors.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Quiet hours are from 10:00 PM to 8:00 AM daily</li>
            <li>No loud music, television, or other sounds that can be heard outside the unit</li>
            <li>No gatherings that disturb other residents</li>
            <li>Tenant is responsible for the behavior of guests</li>
            <li>Repeated violations may result in termination of lease</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Renewal and Termination</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm mb-2">Terms and conditions for lease renewal and termination:</p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Tenant must provide 30 days written notice before vacating</li>
            <li>Landlord will notify tenant of renewal terms 60 days before lease expiration</li>
            <li>Lease converts to month-to-month after expiration if not renewed</li>
            <li>Month-to-month tenancy requires 30 days notice from either party to terminate</li>
            <li>Early termination requires payment of 2 months' rent as liquidated damages</li>
            <li>Military clause exception: active duty service members may terminate with orders</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>Smoking Policy</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm mb-2">
            This is a non-smoking property. Smoking is prohibited inside the unit and in all common areas.
          </p>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>No smoking of any kind (tobacco, marijuana, e-cigarettes) inside the unit</li>
            <li>Smoking is only permitted in designated outdoor areas, at least 25 feet from any entrance</li>
            <li>Tenant is responsible for proper disposal of smoking materials</li>
            <li>
              Violation of smoking policy may result in:
              <ul className="list-disc pl-5">
                <li>Cleaning fees</li>
                <li>Loss of security deposit</li>
                <li>Termination of tenancy for repeated violations</li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}


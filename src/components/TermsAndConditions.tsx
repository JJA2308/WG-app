import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface TermsAndConditionsProps {
  haulerId: number;
  haulerName: string;
  onBack: () => void;
}

export function TermsAndConditions({ haulerId, haulerName, onBack }: TermsAndConditionsProps) {
  const getTermsContent = (haulerId: number) => {
    const baseTerms = [
      {
        title: "Service Agreement",
        content: "This service agreement governs the waste management services provided by the Company to the Customer. By accepting this agreement, both parties agree to be bound by these terms and conditions."
      },
      {
        title: "Service Schedule",
        content: "Waste collection will be performed according to the agreed schedule. The Company will make reasonable efforts to maintain the schedule but reserves the right to modify collection times due to weather, traffic, or other operational considerations."
      },
      {
        title: "Payment Terms",
        content: "Payment is due within 30 days of invoice date. Late payments may incur a 1.5% monthly service charge. Services may be suspended for accounts more than 60 days past due."
      },
      {
        title: "Customer Responsibilities",
        content: "Customer must ensure containers are accessible and properly placed for collection. Prohibited materials include hazardous waste, electronics, batteries, and medical waste unless specifically contracted for."
      },
      {
        title: "Liability and Insurance",
        content: "The Company maintains general liability insurance and assumes responsibility for damages caused by negligent performance of services. Customer is responsible for damages to containers due to misuse."
      },
      {
        title: "Contract Terms",
        content: "This agreement may be terminated by either party with 30 days written notice. Early termination fees may apply for contracts with minimum terms."
      },
      {
        title: "Environmental Compliance",
        content: "All waste disposal and recycling services are performed in accordance with local, state, and federal environmental regulations. The Company is committed to sustainable waste management practices."
      },
      {
        title: "Force Majeure",
        content: "Neither party shall be liable for delays or failures in performance due to circumstances beyond their reasonable control, including but not limited to natural disasters, government actions, or labor disputes."
      }
    ];

    // Add hauler-specific terms
    const haulerSpecificTerms = {
      1: { // GreenWaste Solutions
        additionalTerms: [
          {
            title: "Sustainability Commitment",
            content: "GreenWaste Solutions is committed to diverting 85% of collected waste from landfills through recycling and composting programs. Monthly sustainability reports are available upon request."
          },
          {
            title: "Organic Waste Program",
            content: "Optional organic waste collection and composting services are available. Separate containers and specialized collection schedules apply for organic waste streams."
          }
        ]
      },
      2: { // EcoHaul Services
        additionalTerms: [
          {
            title: "Technology Integration",
            content: "EcoHaul Services provides real-time tracking and mobile app access for service scheduling, billing, and customer support. Digital receipts and service confirmations are standard."
          },
          {
            title: "Flexible Scheduling",
            content: "On-demand pickup requests can be made through our mobile app with 24-hour advance notice. Additional fees may apply for same-day service requests."
          }
        ]
      },
      3: { // Metro Waste Co.
        additionalTerms: [
          {
            title: "Multi-Location Services",
            content: "Metro Waste Co. specializes in multi-location accounts with centralized billing and reporting. Volume discounts available for customers with multiple service locations."
          },
          {
            title: "Emergency Services",
            content: "24/7 emergency cleanup services are available for spills, overflows, or urgent waste removal needs. Emergency service rates apply outside normal business hours."
          }
        ]
      }
    };

    const specificTerms = haulerSpecificTerms[haulerId] || { additionalTerms: [] };
    return [...baseTerms, ...specificTerms.additionalTerms];
  };

  const terms = getTermsContent(haulerId);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Terms &amp; Conditions</h2>
      </div>

      {/* Hauler Name */}
      <div className="px-6 pb-4">
        <h3 className="font-medium text-green-600">{haulerName}</h3>
        <p className="text-sm text-muted-foreground">
          Please review the following terms and conditions before selecting this hauler.
        </p>
      </div>

      {/* Terms Content */}
      <div className="flex-1 px-6 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 pb-6">
            {terms.map((term, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-medium mb-2">{term.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {term.content}
                </p>
              </Card>
            ))}
            
            {/* Agreement Notice */}
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <h4 className="font-medium mb-2 text-yellow-800">Agreement Notice</h4>
              <p className="text-sm text-yellow-700 leading-relaxed">
                By selecting this hauler and proceeding with the service agreement, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions.
              </p>
            </Card>
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-6 border-t">
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back to Results
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            I Agree
          </Button>
        </div>
      </div>
    </div>
  );
}
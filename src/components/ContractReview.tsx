import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, FileText, Download, Calendar, Signature, Building, MapPin } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ContractReviewProps {
  contractId: number;
  onBack: () => void;
}

export function ContractReview({ contractId, onBack }: ContractReviewProps) {
  // Mock contract data - in a real app, this would be fetched based on contractId
  const contractData = {
    id: 1,
    title: "Waste Management Service Agreement",
    supplier: "GreenWaste Solutions",
    customer: "ABC Business Park LLC",
    contractNumber: "GWS-2024-001",
    signedDate: "2024-01-15",
    effectiveDate: "2024-01-15",
    expirationDate: "2025-01-14",
    location: "123 Business Park Dr, Austin, TX 78701",
    customerSignature: "John Smith, Property Manager",
    supplierSignature: "Sarah Johnson, Account Manager"
  };

  const contractSections = [
    {
      title: "1. PARTIES AND PREMISES",
      content: `This Waste Management Service Agreement ("Agreement") is entered into on ${new Date(contractData.signedDate).toLocaleDateString()} between GreenWaste Solutions, a corporation organized under the laws of Texas ("Company"), and ${contractData.customer} ("Customer").

The service location is ${contractData.location} ("Premises").`
    },
    {
      title: "2. TERM AND TERMINATION",
      content: `This Agreement shall commence on ${new Date(contractData.effectiveDate).toLocaleDateString()} and shall continue for a period of twelve (12) months, expiring on ${new Date(contractData.expirationDate).toLocaleDateString()}.

Either party may terminate this Agreement with thirty (30) days written notice. Early termination by Customer may result in an early termination fee equal to 25% of remaining contract value.`
    },
    {
      title: "3. SERVICES PROVIDED",
      content: `Company agrees to provide the following waste management services:
• Front Load Container Service (4-yard container)
• Municipal Solid Waste (MSW) collection
• Twice weekly pickup service (Tuesdays and Fridays)
• Container maintenance and cleaning
• Emergency pickup services (additional charges apply)`
    },
    {
      title: "4. RATES AND PAYMENT TERMS",
      content: `Customer agrees to pay Company $485.00 per month for the services described herein.

Payment is due within thirty (30) days of invoice date. Late payments incur a 1.5% monthly service charge. 

Additional services including extra pickups, overweight fees, and contamination charges will be billed separately at Company's standard rates.`
    },
    {
      title: "5. CUSTOMER RESPONSIBILITIES",
      content: `Customer shall:
• Ensure waste is properly contained and not overflowing
• Separate recyclables as required by local ordinance
• Provide clear access to containers on pickup days
• Not place hazardous materials in containers
• Notify Company of any changes to pickup schedule needs`
    },
    {
      title: "6. LIABILITY AND INSURANCE",
      content: `Company maintains comprehensive general liability insurance of not less than $1,000,000. Company's liability for damages is limited to the monthly service fee.

Customer agrees to indemnify Company against claims arising from Customer's improper waste disposal or hazardous materials.`
    },
    {
      title: "7. FORCE MAJEURE",
      content: `Neither party shall be liable for delays or failures in performance resulting from acts of God, war, terrorism, labor disputes, government regulations, or other circumstances beyond reasonable control.`
    },
    {
      title: "8. GOVERNING LAW",
      content: `This Agreement shall be governed by the laws of the State of Texas. Any disputes shall be resolved through binding arbitration in Travis County, Texas.`
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <img 
          src={wasteGeekLogo} 
          alt="Waste Geek" 
          className="h-6 w-auto"
        />
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          PDF
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Contract Header */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">{contractData.title}</CardTitle>
              <div className="text-sm text-muted-foreground">
                Contract No: {contractData.contractNumber}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Service Provider:</span>
                  <p className="text-muted-foreground">{contractData.supplier}</p>
                </div>
                <div>
                  <span className="font-medium">Customer:</span>
                  <p className="text-muted-foreground">{contractData.customer}</p>
                </div>
                <div>
                  <span className="font-medium">Effective Date:</span>
                  <p className="text-muted-foreground">{new Date(contractData.effectiveDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="font-medium">Expiration Date:</span>
                  <p className="text-muted-foreground">{new Date(contractData.expirationDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Service Location:</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{contractData.location}</p>
              </div>
            </CardContent>
          </Card>

          {/* Contract Sections */}
          {contractSections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Signatures */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Signature className="w-5 h-5 text-green-600" />
                SIGNATURES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Customer Representative</span>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(contractData.signedDate).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{contractData.customerSignature}</p>
                  <div className="mt-2 h-12 border-b-2 border-gray-300 relative">
                    <div className="absolute bottom-0 left-0 text-xs text-muted-foreground italic">
                      Digitally Signed
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Service Provider Representative</span>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(contractData.signedDate).toLocaleDateString()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{contractData.supplierSignature}</p>
                  <div className="mt-2 h-12 border-b-2 border-gray-300 relative">
                    <div className="absolute bottom-0 left-0 text-xs text-muted-foreground italic">
                      Digitally Signed
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg mt-4">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Contract Status: Fully Executed</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  This contract has been digitally signed by all parties and is legally binding.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
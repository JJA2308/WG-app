import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Calendar, MapPin, Truck, Clock, FileText, DollarSign, CheckCircle, Eye, MessageCircle } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ActiveContractsProps {
  onBack: () => void;
  onViewContract: (contractId: number) => void;
  onAskQuestion: (contractId: number) => void;
}

export function ActiveContracts({ onBack, onViewContract, onAskQuestion }: ActiveContractsProps) {
  // Mock data for active contracts
  const activeContracts = [
    {
      id: 1,
      supplier: "GreenWaste Solutions",
      serviceType: "Front Load",
      location: "123 Business Park Dr, Austin, TX 78701",
      contractStart: "2024-01-15",
      contractEnd: "2025-01-14",
      termLength: "12 months",
      containerSize: "4-yard",
      wasteType: "MSW (Municipal Solid Waste)",
      pickupFrequency: "2x per week",
      pickupDays: ["Tuesday", "Friday"],
      nextPickup: "2024-12-27",
      monthlyRate: "$485.00",
      status: "Active",
      customerExperienceScore: 4.2,
      serviceDetails: {
        equipmentIncluded: ["1x 4-yard front load container", "Lid and wheels", "Cart maintenance"],
        additionalServices: ["Overweight fees", "Extra pickup on demand"],
        contractTerms: ["12-month minimum term", "30-day cancellation notice", "Price protection for first year"]
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
          className="h-8 w-auto"
        />
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h2>Active Contracts</h2>
            <p className="text-muted-foreground mt-2">
              Review your current contract terms and service details
            </p>
          </div>

          {activeContracts.map((contract) => (
            <div key={contract.id} className="space-y-4">
              {/* Contract Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{contract.supplier}</CardTitle>
                    <Badge className={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{contract.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Service Type</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{contract.serviceType}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Monthly Rate</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{contract.monthlyRate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contract Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Contract Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Contract Start</span>
                      <p className="text-sm text-muted-foreground">{new Date(contract.contractStart).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Contract End</span>
                      <p className="text-sm text-muted-foreground">{new Date(contract.contractEnd).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Term Length</span>
                      <p className="text-sm text-muted-foreground">{contract.termLength}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Days Remaining</span>
                      <p className="text-sm text-muted-foreground">{calculateDaysRemaining(contract.contractEnd)} days</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium mb-2 block">Contract Terms</span>
                    <div className="space-y-1">
                      {contract.serviceDetails.contractTerms.map((term, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Rendered */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-600" />
                    Services Rendered
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Container Size</span>
                      <p className="text-sm text-muted-foreground">{contract.containerSize}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Waste Type</span>
                      <p className="text-sm text-muted-foreground">{contract.wasteType}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium mb-2 block">Equipment Included</span>
                    <div className="space-y-1">
                      {contract.serviceDetails.equipmentIncluded.map((equipment, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{equipment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium mb-2 block">Additional Services</span>
                    <div className="space-y-1">
                      {contract.serviceDetails.additionalServices.map((service, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Service Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Pickup Frequency</span>
                      <p className="text-sm text-muted-foreground">{contract.pickupFrequency}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Next Pickup</span>
                      <p className="text-sm text-muted-foreground">{new Date(contract.nextPickup).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium mb-2 block">Pickup Days</span>
                    <div className="flex gap-2">
                      {contract.pickupDays.map((day, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {day}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Service Performance</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Customer Experience Score: <span className="font-medium text-green-600">{contract.customerExperienceScore}/5.0</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on on-time pickups, service quality, and communication
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contract Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contract Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => onViewContract(contract.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Contract
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => onAskQuestion(contract.id)}
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Ask AI About Terms
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {activeContracts.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
                  <h3 className="font-medium">No Active Contracts</h3>
                  <p className="text-sm text-muted-foreground">
                    You don't have any active contracts at the moment.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
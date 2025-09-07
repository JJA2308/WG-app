import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Users, MapPin, Clock, DollarSign, Truck, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface QuoteRequestsProps {
  onBack: () => void;
}

export function QuoteRequests({ onBack }: QuoteRequestsProps) {
  const requests = [
    {
      id: 1,
      customer: "Riverside Manufacturing",
      service: "Front Load Service",
      wasteType: "MSW",
      status: "new",
      date: "2 hours ago",
      location: "Industrial Park East",
      containerSize: "6 Yard",
      frequency: "3x per week",
      distance: "8.5 miles",
      urgency: "standard",
      estimatedValue: "$350-450/month",
      requirements: "Must have Saturday service"
    },
    {
      id: 2,
      customer: "Downtown Construction Co.",
      service: "Roll-off Service",
      wasteType: "Construction Debris",
      status: "urgent",
      date: "30 minutes ago",
      location: "City Center Project",
      containerSize: "30 Yard",
      frequency: "2-week rental",
      distance: "12.3 miles",
      urgency: "urgent",
      estimatedValue: "$550-650",
      requirements: "Need ASAP delivery"
    },
    {
      id: 3,
      customer: "GreenTech Solutions",
      service: "Recycling Service",
      wasteType: "Mixed Recycling",
      status: "responded",
      date: "1 day ago",
      location: "Tech District",
      containerSize: "4 Yard",
      frequency: "Weekly",
      distance: "6.2 miles",
      urgency: "standard",
      estimatedValue: "$180-220/month",
      requirements: "Certified recycling required"
    },
    {
      id: 4,
      customer: "Metro Shopping Center",
      service: "Compactor Service",
      wasteType: "General Waste",
      status: "new",
      date: "4 hours ago",
      location: "Retail District",
      containerSize: "Self-Contained",
      frequency: "Daily emptying",
      distance: "15.1 miles",
      urgency: "standard",
      estimatedValue: "$1,200-1,500/month",
      requirements: "Equipment lease required"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'responded':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    return urgency === 'urgent' 
      ? <AlertCircle className="w-3 h-3 text-red-600" />
      : <Clock className="w-3 h-3 text-gray-500" />;
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
          className="h-6 w-auto"
        />
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Quote Requests</h2>
          <p className="text-muted-foreground mt-2">
            New opportunities from potential customers
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-blue-600">3</div>
            <div className="text-xs text-muted-foreground">New Requests</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-red-600">1</div>
            <div className="text-xs text-muted-foreground">Urgent</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-green-600">$2.8K</div>
            <div className="text-xs text-muted-foreground">Est. Monthly</div>
          </Card>
        </div>

        {/* Request List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{request.customer}</h3>
                    <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    {request.urgency === 'urgent' && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs px-2 py-0.5">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {request.service} - {request.wasteType}
                  </p>
                  <p className="text-sm font-medium text-green-600">{request.estimatedValue}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    {getUrgencyIcon(request.urgency)}
                    {request.date}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{request.distance} away</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
                <div>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Location
                  </p>
                  <p className="font-medium">{request.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Service Details
                  </p>
                  <p className="font-medium">{request.containerSize}</p>
                  <p className="text-muted-foreground">{request.frequency}</p>
                </div>
              </div>

              {request.requirements && (
                <div className="mb-3 p-2 bg-gray-50 rounded text-xs">
                  <p className="text-muted-foreground">Special Requirements:</p>
                  <p className="font-medium">{request.requirements}</p>
                </div>
              )}

              <div className="flex gap-2">
                {request.status === 'new' || request.status === 'urgent' ? (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                      Submit Quote
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      View Details
                    </Button>
                  </>
                ) : request.status === 'responded' ? (
                  <>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Quote Submitted
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Edit Quote
                    </Button>
                  </>
                ) : null}
              </div>
            </Card>
          ))}
        </div>

        {/* Filter Options */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-3 text-sm">Filter Requests</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button size="sm" variant="outline" className="text-xs">
              Service Type
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Distance
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Value Range
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Urgency
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
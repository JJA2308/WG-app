import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, FileText, Clock, CheckCircle, XCircle, DollarSign, MapPin, Calendar, Edit } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ProposalsProps {
  onBack: () => void;
}

export function Proposals({ onBack }: ProposalsProps) {
  const proposals = [
    {
      id: 1,
      customer: "ABC Manufacturing Corp",
      service: "Front Load Service - MSW",
      status: "pending",
      date: "Dec 15, 2024",
      amount: "$284.50/month",
      location: "Industrial District, City",
      containerSize: "4 Yard",
      frequency: "2x per week",
      expires: "2 days",
      distance: "12 miles"
    },
    {
      id: 2,
      customer: "Metro Construction LLC",
      service: "Roll-off Service - Construction",
      status: "accepted",
      date: "Dec 12, 2024",
      amount: "$425.00",
      location: "Downtown Site A",
      containerSize: "20 Yard",
      frequency: "One-time pickup",
      expires: null,
      distance: "8 miles"
    },
    {
      id: 3,
      customer: "GreenTech Solutions",
      service: "Recycling Service",
      status: "declined",
      date: "Dec 10, 2024",
      amount: "$195.00/month",
      location: "Tech Park West",
      containerSize: "6 Yard",
      frequency: "Weekly",
      expires: "Expired",
      distance: "15 miles"
    },
    {
      id: 4,
      customer: "Riverside Retail Center",
      service: "Compactor Service",
      status: "counter",
      date: "Dec 14, 2024",
      amount: "$850.00/month",
      location: "Shopping District",
      containerSize: "Self-Contained",
      frequency: "3x per week",
      expires: "5 days",
      distance: "6 miles"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'counter':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'accepted':
        return <CheckCircle className="w-3 h-3" />;
      case 'declined':
        return <XCircle className="w-3 h-3" />;
      case 'counter':
        return <Edit className="w-3 h-3" />;
      default:
        return <FileText className="w-3 h-3" />;
    }
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
          <h2>Your Proposals</h2>
          <p className="text-muted-foreground mt-2">
            Track and manage your submitted proposals
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-yellow-600">1</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-green-600">1</div>
            <div className="text-xs text-muted-foreground">Accepted</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-blue-600">1</div>
            <div className="text-xs text-muted-foreground">Counter</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-red-600">1</div>
            <div className="text-xs text-muted-foreground">Declined</div>
          </Card>
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{proposal.customer}</h3>
                    <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(proposal.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(proposal.status)}
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </div>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{proposal.service}</p>
                  <p className="text-sm font-medium text-green-600">{proposal.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{proposal.date}</p>
                  {proposal.expires && (
                    <p className="text-xs text-red-600">
                      {proposal.status === 'declined' ? proposal.expires : `Expires in ${proposal.expires}`}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <p className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Location
                  </p>
                  <p className="font-medium">{proposal.location}</p>
                  <p className="text-muted-foreground">{proposal.distance} away</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service Details</p>
                  <p className="font-medium">{proposal.containerSize}</p>
                  <p className="text-muted-foreground">{proposal.frequency}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                  <FileText className="w-3 h-3" />
                  View Details
                </Button>
                {proposal.status === 'pending' && (
                  <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                    <Edit className="w-3 h-3" />
                    Edit Proposal
                  </Button>
                )}
                {proposal.status === 'counter' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    View Counter Offer
                  </Button>
                )}
                {proposal.status === 'accepted' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                    Start Service
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Create New Proposal Button */}
        <div className="mt-6">
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <FileText className="w-4 h-4 mr-2" />
            Create New Proposal
          </Button>
        </div>
      </div>
    </div>
  );
}
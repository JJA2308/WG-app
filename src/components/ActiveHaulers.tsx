import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, MessageCircle, User, Star, Truck, MapPin, Clock } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ActiveHaulersProps {
  onBack: () => void;
}

export function ActiveHaulers({ onBack }: ActiveHaulersProps) {
  const haulers = [
    {
      id: 1,
      name: "Midwest Waste Solutions",
      location: "Chicago, IL",
      accountsCount: 8,
      pendingProposals: 3,
      rating: 4.8,
      services: ["Front Load", "Roll-Off", "Compactor"],
      lastActivity: "2 hours ago",
      responseTime: "< 4 hours",
      yearsActive: 12,
      profileImage: null
    },
    {
      id: 2,
      name: "Great Lakes Hauling",
      location: "Milwaukee, WI",
      accountsCount: 5,
      pendingProposals: 1,
      rating: 4.6,
      services: ["Front Load", "Junk Removal"],
      lastActivity: "1 day ago",
      responseTime: "< 6 hours",
      yearsActive: 8,
      profileImage: null
    },
    {
      id: 3,
      name: "Premier Waste Management",
      location: "Detroit, MI",
      accountsCount: 12,
      pendingProposals: 5,
      rating: 4.9,
      services: ["Roll-Off", "Compactor", "Front Load"],
      lastActivity: "3 hours ago",
      responseTime: "< 2 hours",
      yearsActive: 15,
      profileImage: null
    },
    {
      id: 4,
      name: "Central Illinois Disposal",
      location: "Rockford, IL",
      accountsCount: 3,
      pendingProposals: 0,
      rating: 4.4,
      services: ["Front Load", "Roll-Off"],
      lastActivity: "5 hours ago",
      responseTime: "< 8 hours",
      yearsActive: 6,
      profileImage: null
    },
    {
      id: 5,
      name: "Green Bay Waste Services",
      location: "Green Bay, WI",
      accountsCount: 2,
      pendingProposals: 2,
      rating: 4.7,
      services: ["Roll-Off", "Junk Removal"],
      lastActivity: "30 minutes ago",
      responseTime: "< 3 hours",
      yearsActive: 10,
      profileImage: null
    },
    {
      id: 6,
      name: "Metro Hauling Co.",
      location: "Madison, WI",
      accountsCount: 7,
      pendingProposals: 1,
      rating: 4.5,
      services: ["Front Load", "Compactor"],
      lastActivity: "6 hours ago",
      responseTime: "< 5 hours",
      yearsActive: 9,
      profileImage: null
    }
  ];

  const handleMessageHauler = (haulerName: string) => {
    // In a real app, this would open messaging interface
    console.log(`Opening message to ${haulerName}`);
  };

  const handleViewProfile = (haulerName: string) => {
    // In a real app, this would navigate to hauler profile
    console.log(`Viewing profile for ${haulerName}`);
  };

  const getTotalAccounts = () => haulers.reduce((total, hauler) => total + hauler.accountsCount, 0);
  const getTotalPendingProposals = () => haulers.reduce((total, hauler) => total + hauler.pendingProposals, 0);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 pt-6">
        {/* Left side - Back button */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Center - Waste Geek Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-8 w-auto max-w-full object-contain"
          />
        </div>
        
        {/* Right side spacer */}
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* Page Title */}
        <div className="text-center mb-6">
          <h2>Active Haulers</h2>
          <p className="text-muted-foreground mt-2">
            Manage your hauler network and communications
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center bg-blue-50 border-blue-200">
            <div className="text-lg font-medium text-blue-900">{haulers.length}</div>
            <div className="text-xs text-blue-600">Active Haulers</div>
          </Card>
          <Card className="p-3 text-center bg-green-50 border-green-200">
            <div className="text-lg font-medium text-green-900">{getTotalAccounts()}</div>
            <div className="text-xs text-green-600">Total Accounts</div>
          </Card>
          <Card className="p-3 text-center bg-orange-50 border-orange-200">
            <div className="text-lg font-medium text-orange-900">{getTotalPendingProposals()}</div>
            <div className="text-xs text-orange-600">Pending Proposals</div>
          </Card>
        </div>

        {/* Haulers List */}
        <div className="space-y-4">
          {haulers.map((hauler) => (
            <Card key={hauler.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-4">
                {/* Hauler Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{hauler.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{hauler.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium">{hauler.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{hauler.accountsCount} accounts</div>
                    <div className="text-xs text-muted-foreground">{hauler.lastActivity}</div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-md p-2">
                    <div className="text-xs text-muted-foreground">Pending Proposals</div>
                    <div className="font-medium text-orange-600">{hauler.pendingProposals}</div>
                  </div>
                  <div className="bg-gray-50 rounded-md p-2">
                    <div className="text-xs text-muted-foreground">Avg Response Time</div>
                    <div className="font-medium text-blue-600">{hauler.responseTime}</div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Services Offered</div>
                  <div className="flex flex-wrap gap-1">
                    {hauler.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="bg-blue-50 rounded-md p-2 border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-600 font-medium">Hauler Profile</span>
                  </div>
                  <div className="text-xs text-blue-800">
                    {hauler.yearsActive} years in business • Verified contractor • Insured & bonded
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleMessageHauler(hauler.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewProfile(hauler.name)}
                  >
                    <User className="w-4 h-4 mr-1" />
                    View Profile
                  </Button>
                </div>

                {/* Status Indicator */}
                {hauler.pendingProposals > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-md border border-orange-200">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-xs text-orange-600">
                      {hauler.pendingProposals} proposal{hauler.pendingProposals > 1 ? 's' : ''} awaiting your review
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Mail, FileText, Building2, MapPin } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ClientAccountsProps {
  onBack: () => void;
}

export function ClientAccounts({ onBack }: ClientAccountsProps) {
  const clientAccounts = [
    {
      id: 1,
      name: "Metro Construction LLC",
      sites: 4,
      location: "Chicago, IL",
      lastActivity: "2 days ago",
      status: "Active",
      contractType: "Front Load + Roll-Off"
    },
    {
      id: 2,
      name: "ABC Manufacturing",
      sites: 2,
      location: "Detroit, MI",
      lastActivity: "1 week ago",
      status: "Active",
      contractType: "Front Load"
    },
    {
      id: 3,
      name: "GreenTech Industries",
      sites: 7,
      location: "Milwaukee, WI",
      lastActivity: "3 days ago",
      status: "Pending",
      contractType: "Compactor + Hauling"
    },
    {
      id: 4,
      name: "Riverside Retail Center",
      sites: 3,
      location: "Madison, WI",
      lastActivity: "5 days ago",
      status: "Active",
      contractType: "Front Load"
    },
    {
      id: 5,
      name: "Northern Logistics Hub",
      sites: 1,
      location: "Green Bay, WI",
      lastActivity: "1 day ago",
      status: "Active",
      contractType: "Roll-Off"
    },
    {
      id: 6,
      name: "Midwest Office Complex",
      sites: 5,
      location: "Rockford, IL",
      lastActivity: "4 days ago",
      status: "Active",
      contractType: "Front Load + Junk Removal"
    }
  ];

  const handleEmailClient = (clientName: string) => {
    // In a real app, this would open email client or modal
    console.log(`Emailing ${clientName}`);
  };

  const handleViewContracts = (clientName: string) => {
    // In a real app, this would navigate to contract details
    console.log(`Viewing contracts for ${clientName}`);
  };

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
          <h2>Client Accounts</h2>
          <p className="text-muted-foreground mt-2">
            Manage your active client accounts and contracts
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center bg-blue-50 border-blue-200">
            <div className="text-lg font-medium text-blue-900">23</div>
            <div className="text-xs text-blue-600">Total Accounts</div>
          </Card>
          <Card className="p-3 text-center bg-green-50 border-green-200">
            <div className="text-lg font-medium text-green-900">27</div>
            <div className="text-xs text-green-600">Total Sites</div>
          </Card>
          <Card className="p-3 text-center bg-purple-50 border-purple-200">
            <div className="text-lg font-medium text-purple-900">21</div>
            <div className="text-xs text-purple-600">Active Contracts</div>
          </Card>
        </div>

        {/* Client Accounts List */}
        <div className="space-y-4">
          {clientAccounts.map((client) => (
            <Card key={client.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-3">
                {/* Client Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{client.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{client.location}</span>
                        </div>
                        <Badge 
                          variant={client.status === 'Active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {client.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{client.sites} sites</div>
                    <div className="text-xs text-muted-foreground">{client.lastActivity}</div>
                  </div>
                </div>

                {/* Contract Info */}
                <div className="bg-gray-50 rounded-md p-2">
                  <div className="text-xs text-muted-foreground">Services</div>
                  <div className="text-sm font-medium">{client.contractType}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEmailClient(client.name)}
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewContracts(client.name)}
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    View Contracts
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
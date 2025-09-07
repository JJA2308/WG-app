import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, FileText, Clock, CheckCircle, XCircle, Eye, MessageSquare } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface QuotesProps {
  onBack: () => void;
}

export function Quotes({ onBack }: QuotesProps) {
  const quotes = [
    {
      id: 1,
      service: "Front Load Service - MSW",
      hauler: "GreenWaste Solutions",
      status: "pending",
      date: "Dec 15, 2024",
      amount: "$284.50/month",
      location: "Main Office - Downtown",
      containerSize: "4 Yard",
      frequency: "2x per week",
      expires: "3 days"
    },
    {
      id: 2,
      service: "Roll-off Service - Construction",
      hauler: "Metro Disposal",
      status: "accepted",
      date: "Dec 12, 2024",
      amount: "$425.00",
      location: "Construction Site A",
      containerSize: "20 Yard",
      frequency: "One-time",
      expires: null
    },
    {
      id: 3,
      service: "Compactor Service - Equipment",
      hauler: "WasteMax Industries",
      status: "declined",
      date: "Dec 10, 2024",
      amount: "$1,250.00/month",
      location: "Warehouse District",
      containerSize: "Self-Contained",
      frequency: "Weekly",
      expires: "Expired"
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
          <h2>Your Quotes</h2>
          <p className="text-muted-foreground mt-2">
            Track and manage your service quotes
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-yellow-600">1</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-green-600">1</div>
            <div className="text-xs text-muted-foreground">Accepted</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-lg font-medium text-red-600">1</div>
            <div className="text-xs text-muted-foreground">Declined</div>
          </Card>
        </div>

        {/* Quotes List */}
        <div className="space-y-4">
          {quotes.map((quote) => (
            <Card key={quote.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{quote.service}</h3>
                    <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(quote.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(quote.status)}
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </div>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{quote.hauler}</p>
                  <p className="text-sm font-medium text-green-600">{quote.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{quote.date}</p>
                  {quote.expires && (
                    <p className="text-xs text-red-600">Expires in {quote.expires}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{quote.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Container</p>
                  <p className="font-medium">{quote.containerSize}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Frequency</p>
                  <p className="font-medium">{quote.frequency}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                  <Eye className="w-3 h-3" />
                  View Details
                </Button>
                {quote.status === 'pending' && (
                  <>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      Counter
                    </Button>
                  </>
                )}
                {quote.status === 'accepted' && (
                  <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                    <MessageSquare className="w-3 h-3" />
                    Message Hauler
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State for no quotes */}
        {quotes.length === 0 && (
          <Card className="p-6 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No quotes yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Request a quote to see pricing from local haulers
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              Get a Quote
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
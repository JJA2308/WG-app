import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, MapPin, Building, Home, BarChart3, TrendingUp, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface PropertySelectionForReviewProps {
  onSelectProperty: (property: any) => void;
  onBack: () => void;
}

export function PropertySelectionForReview({ onSelectProperty, onBack }: PropertySelectionForReviewProps) {
  const properties = [
    {
      id: 1,
      name: "Main Office Location",
      address: "1234 Business Blvd, Chicago, IL 60601",
      type: "Office Building",
      services: ["Front Load", "Recycling"],
      hauler: "GreenWaste Solutions",
      customerExperienceScore: 87,
      contractStartDate: "Jan 2023",
      contractEndDate: "Dec 2024",
      lastReview: "2 weeks ago",
      icon: Building
    },
    {
      id: 2,
      name: "Warehouse Facility",
      address: "5678 Industrial Way, Chicago, IL 60605",
      type: "Warehouse",
      services: ["Roll-Off", "Compactor"],
      hauler: "Metro Waste Management",
      customerExperienceScore: 74,
      contractStartDate: "Mar 2023",
      contractEndDate: "Feb 2025",
      lastReview: "1 month ago",
      icon: Building
    },
    {
      id: 3,
      name: "Retail Store - Downtown",
      address: "9012 Main Street, Chicago, IL 60602",
      type: "Retail",
      services: ["Front Load"],
      hauler: "City Waste Services",
      customerExperienceScore: 92,
      contractStartDate: "Sep 2022",
      contractEndDate: "Aug 2025",
      lastReview: "3 days ago",
      icon: Home
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return TrendingUp;
    if (score >= 70) return BarChart3;
    return Clock;
  };

  const handlePropertySelect = (property: any) => {
    onSelectProperty(property);
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
        <div className="text-center mb-6">
          <h2>Review Account Performance</h2>
          <p className="text-muted-foreground mt-2">
            Select a property to view detailed performance metrics
          </p>
        </div>

        <div className="space-y-4">
          {properties.map((property) => {
            const ScoreIcon = getScoreIcon(property.customerExperienceScore);
            
            return (
              <Card 
                key={property.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-200"
                onClick={() => handlePropertySelect(property)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <property.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{property.name}</h3>
                        <div className="flex items-start gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">{property.address}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getScoreColor(property.customerExperienceScore)}`}>
                        <ScoreIcon className="w-3 h-3" />
                        <span className="font-medium">{property.customerExperienceScore}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Hauler:</span>
                        <span className="font-medium">{property.hauler}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Contract Start:</span>
                        <span>{property.contractStartDate}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Contract End:</span>
                        <span>{property.contractEndDate}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Last Review:</span>
                        <span>{property.lastReview}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {property.services.map((service, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Customer Experience Score Info */}
        <Card className="p-4 mt-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900">Customer Experience Score</h3>
              <p className="text-sm text-blue-700 mt-1">
                Our proprietary score based on service reliability, response times, pricing transparency, and customer satisfaction across all properties your hauler services.
              </p>
              <div className="mt-2 space-y-1 text-xs text-blue-600">
                <div>• 85-100: Excellent service quality</div>
                <div>• 70-84: Good service with room for improvement</div>
                <div>• Below 70: Service quality concerns</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
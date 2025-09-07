import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, MapPin, Building, Home } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface PropertySelectionProps {
  onSelectProperty: (property: any) => void;
  onBack: () => void;
}

export function PropertySelection({ onSelectProperty, onBack }: PropertySelectionProps) {
  const properties = [
    {
      id: 1,
      name: "Main Office Location",
      address: "1234 Business Blvd, Chicago, IL 60601",
      type: "Office Building",
      services: ["Front Load", "Recycling"],
      icon: Building
    },
    {
      id: 2,
      name: "Warehouse Facility",
      address: "5678 Industrial Way, Chicago, IL 60605",
      type: "Warehouse",
      services: ["Roll-Off", "Compactor"],
      icon: Building
    },
    {
      id: 3,
      name: "Retail Store - Downtown",
      address: "9012 Main Street, Chicago, IL 60602",
      type: "Retail",
      services: ["Front Load"],
      icon: Home
    }
  ];

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
          <h2>Select Property</h2>
          <p className="text-muted-foreground mt-2">
            Choose the property you need customer service for
          </p>
        </div>

        <div className="space-y-4">
          {properties.map((property) => (
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
                  <h3 className="font-medium">{property.name}</h3>
                  <div className="flex items-start gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{property.address}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Property Type: {property.type}</p>
                    <div className="flex flex-wrap gap-1">
                      {property.services.map((service, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add New Property Option */}
        <Card className="p-4 mt-4 border-dashed border-2 border-gray-300 cursor-pointer hover:border-green-300 transition-colors">
          <div className="flex flex-col items-center justify-center text-center py-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground">Add New Property</p>
            <p className="text-xs text-muted-foreground mt-1">
              Need help with a different location?
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
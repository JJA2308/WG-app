import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface RollOffServiceTypeProps {
  onContinue: (serviceType: 'temporary' | 'permanent') => void;
  onBack: () => void;
}

export function RollOffServiceType({ onContinue, onBack }: RollOffServiceTypeProps) {
  const [selectedType, setSelectedType] = useState<'temporary' | 'permanent' | null>(null);

  const serviceTypes = [
    {
      id: 'temporary' as const,
      title: 'Temporary Service',
      subtitle: '(Projects)',
      description: 'Short-term rentals for construction, renovations, cleanouts, and one-time projects',
      features: ['Flexible rental periods', 'Project-based pricing', 'On-demand delivery']
    },
    {
      id: 'permanent' as const,
      title: 'Permanent Service',
      subtitle: '',
      description: 'Ongoing waste management for businesses with regular disposal needs',
      features: ['Regular pickup schedule', 'Long-term contracts', 'Consistent service']
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
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Service Type Selection */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Roll-Off Service Type</h2>
          <p className="text-muted-foreground mt-2">
            Select the type of roll-off service you need:
          </p>
        </div>
        
        <div className="space-y-4">
          {serviceTypes.map((type) => (
            <Card 
              key={type.id} 
              className={`p-4 cursor-pointer transition-colors ${
                selectedType === type.id 
                  ? 'border-green-600 bg-green-50' 
                  : 'border-border hover:border-green-300'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium">
                    {type.title} {type.subtitle}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type.description}
                  </p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedType === type.id 
                    ? 'border-green-600 bg-green-600' 
                    : 'border-gray-300'
                }`}>
                  {selectedType === type.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <ul className="space-y-1">
                {type.features.map((feature, index) => (
                  <li key={index} className="text-xs text-muted-foreground flex items-center">
                    <div className="w-1 h-1 bg-green-600 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Button positioned close to selection */}
        <div className="pt-6 pb-6">
          <Button 
            onClick={() => onContinue(selectedType || 'permanent')} 
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, Trash2, Recycle, Package } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';
import { HeaderMenu } from "./HeaderMenu";

interface FrontLoadWasteTypeProps {
  onContinue: (wasteType: 'msw' | 'recycling' | 'both' | '') => void;
  onBack: () => void;
}

export function FrontLoadWasteType({ onContinue, onBack }: FrontLoadWasteTypeProps) {
  const [selectedWasteType, setSelectedWasteType] = useState<'msw' | 'recycling' | 'both' | ''>('');

  const wasteTypes = [
    {
      id: 'msw' as const,
      title: 'MSW (Municipal Solid Waste)',
      description: 'General waste including office trash, food waste, packaging materials, and other non-recyclable materials',
      icon: Trash2,
      examples: [
        'Office trash and paper waste',
        'Food waste and organics',
        'Packaging materials',
        'General business waste'
      ]
    },
    {
      id: 'recycling' as const,
      title: 'Recycling',
      description: 'Recyclable materials including paper, cardboard, plastic, glass, and metal items',
      icon: Recycle,
      examples: [
        'Paper and cardboard',
        'Plastic containers and bottles',
        'Glass bottles and jars',
        'Metal cans and containers'
      ]
    },
    {
      id: 'both' as const,
      title: 'Both MSW and Recycling',
      description: 'Comprehensive waste management for both general waste and recyclable materials with separate containers',
      icon: Package,
      examples: [
        'Separate MSW and recycling containers',
        'Independent pickup schedules',
        'Customizable container sizes',
        'Complete waste management solution'
      ]
    }
  ];

  const handleContinue = () => {
    onContinue(selectedWasteType);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-8 w-auto max-w-full object-contain"
          />
        </div>
        
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Select Waste Type</h2>
          <p className="text-muted-foreground mt-2">
            What type of waste will you be disposing of? (Optional)
          </p>
        </div>

        {/* Waste Type Options */}
        <div className="space-y-4 mb-8">
          {wasteTypes.map((wasteType) => {
            const IconComponent = wasteType.icon;
            const isSelected = selectedWasteType === wasteType.id;
            
            return (
              <Card 
                key={wasteType.id}
                className={`p-6 cursor-pointer transition-all border-2 ${
                  isSelected 
                    ? 'bg-green-50 border-green-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedWasteType(wasteType.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isSelected ? 'text-green-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium mb-2 ${
                      isSelected ? 'text-green-700' : ''
                    }`}>
                      {wasteType.title}
                    </h3>
                    <p className={`text-sm mb-3 ${
                      isSelected ? 'text-green-600' : 'text-muted-foreground'
                    }`}>
                      {wasteType.description}
                    </p>
                    
                    <div className="space-y-1">
                      <p className={`text-xs font-medium ${
                        isSelected ? 'text-green-700' : 'text-gray-600'
                      }`}>
                        Common examples:
                      </p>
                      <div className="space-y-1">
                        {wasteType.examples.map((example, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? 'bg-green-500' : 'bg-gray-400'
                            }`}></div>
                            <span className={`text-xs ${
                              isSelected ? 'text-green-600' : 'text-muted-foreground'
                            }`}>
                              {example}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Information Box */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="text-sm">
            <h4 className="font-medium text-blue-900 mb-2">Important Note</h4>
            <p className="text-blue-700">
              Selecting a waste type helps us match you with the right haulers and ensure 
              proper service pricing. Choosing "Both MSW and Recycling" allows you to configure separate containers and schedules for each waste stream.
            </p>
          </div>
        </Card>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
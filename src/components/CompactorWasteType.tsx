import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft, Trash2, Package, HardHat, Recycle, HelpCircle } from "lucide-react";

interface CompactorWasteTypeProps {
  onContinue: (wasteType: 'msw' | 'warehouse' | 'construction' | 'recycle' | 'other') => void;
  onBack: () => void;
}

export function CompactorWasteType({ onContinue, onBack }: CompactorWasteTypeProps) {
  const [selectedType, setSelectedType] = useState<'msw' | 'warehouse' | 'construction' | 'recycle' | 'other' | ''>('');

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType as 'msw' | 'warehouse' | 'construction' | 'recycle' | 'other');
    }
  };

  const wasteTypes = [
    {
      id: 'msw',
      name: 'MSW (Municipal Solid Waste)',
      description: 'General waste from offices, retail, restaurants, and commercial facilities including food waste, paper, packaging, and everyday refuse.',
      icon: Trash2,
      examples: ['Food waste', 'Office paper', 'Packaging materials', 'General refuse']
    },
    {
      id: 'warehouse',
      name: 'Warehouse Waste',
      description: 'Industrial waste from warehouses and distribution centers including packaging materials, pallets, shrink wrap, and operational debris.',
      icon: Package,
      examples: ['Cardboard packaging', 'Shrink wrap', 'Wooden pallets', 'Operational debris']
    },
    {
      id: 'construction',
      name: 'Construction Material',
      description: 'Construction and demolition debris including wood, drywall, concrete, metals, and other building materials from construction sites.',
      icon: HardHat,
      examples: ['Wood debris', 'Drywall', 'Concrete', 'Metal scraps']
    },
    {
      id: 'recycle',
      name: 'Recyclable Material',
      description: 'Clean, separated recyclable materials including cardboard, paper, plastics, metals, and glass that can be processed for reuse.',
      icon: Recycle,
      examples: ['Clean cardboard', 'Paper products', 'Plastic containers', 'Metal cans']
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Specialized waste streams not covered above, including hazardous materials, electronic waste, or industry-specific waste requiring special handling.',
      icon: HelpCircle,
      examples: ['Electronic waste', 'Hazardous materials', 'Specialized industrial waste', 'Mixed waste streams']
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Waste Type Selection</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h3 className="text-lg">What type of waste will you be compacting?</h3>
            <p className="text-muted-foreground">
              Select your primary waste type to ensure we match you with suppliers experienced in handling your specific materials.
            </p>
          </div>

          {/* Waste Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Waste Categories</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose the waste type that best describes your primary material stream
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedType} 
                onValueChange={(value) => setSelectedType(value as typeof selectedType)}
                className="space-y-4"
              >
                {wasteTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <div key={type.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <RadioGroupItem value={type.id} id={type.id} className="mt-1 flex-shrink-0" />
                      
                      {/* Content */}
                      <div className="flex-1">
                        <Label htmlFor={type.id} className="cursor-pointer block">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-5 h-5 text-green-600" />
                              <h4 className="font-medium">{type.name}</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {type.description}
                            </p>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">Common examples:</p>
                              <div className="grid grid-cols-2 gap-1">
                                {type.examples.map((example, index) => (
                                  <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <div className="w-1 h-1 bg-green-600 rounded-full flex-shrink-0"></div>
                                    <span>{example}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card>
            <CardContent className="pt-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-amber-800">Important Note</h4>
                    <p className="text-sm text-amber-700">
                      Some waste types may require special permits, handling procedures, or disposal methods. Our specialists will work with you to ensure compliance with all local regulations and environmental requirements.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  After selecting your waste type, you'll provide additional details to complete your compactor service request:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Service location and site requirements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Estimated waste volume and frequency
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Current waste management setup
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Timeline and budget preferences
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue}
              disabled={!selectedType}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";

interface CompactorExistingEquipmentTypeProps {
  onContinue: (equipmentType: 'vertical-baler' | 'stationary-compactor') => void;
  onBack: () => void;
}

export function CompactorExistingEquipmentType({ onContinue, onBack }: CompactorExistingEquipmentTypeProps) {
  const [selectedType, setSelectedType] = useState<'vertical-baler' | 'stationary-compactor' | ''>('');

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType as 'vertical-baler' | 'stationary-compactor');
    }
  };

  const equipmentTypes = [
    {
      id: 'vertical-baler',
      name: 'Vertical Baler',
      description: 'Compresses recyclable materials like cardboard, plastic, and paper into dense bales for efficient storage and transport.',
      features: ['Cardboard & paper processing', 'Compact footprint', 'Manual tie-off', 'Easy loading from top']
    },
    {
      id: 'stationary-compactor',
      name: 'Stationary Compactor',
      description: 'Large, permanent waste compaction unit that remains in one location. Ideal for high-volume waste generation.',
      features: ['High compaction ratios', 'Large capacity', 'Permanent installation', 'Commercial/industrial use']
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Your Existing Equipment</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h3 className="text-lg">What type of compacting unit do you have?</h3>
            <p className="text-muted-foreground">
              Tell us about your existing equipment so we can match you with the right hauling service.
            </p>
          </div>

          {/* Equipment Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Equipment Type</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select the type of compacting unit you currently have at your location
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedType} 
                onValueChange={(value) => setSelectedType(value as typeof selectedType)}
                className="space-y-6"
              >
                {equipmentTypes.map((type) => (
                  <div key={type.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={type.id} id={type.id} className="mt-1 flex-shrink-0" />
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Label htmlFor={type.id} className="cursor-pointer block">
                        <div className="space-y-2">
                          <h4 className="font-medium">{type.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {type.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="w-1 h-1 bg-green-600 rounded-full flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  After identifying your equipment type, we'll collect additional details to match you with hauling services:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Current contract and hauling arrangements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Waste types and volume requirements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Service location and accessibility
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Pickup frequency and scheduling preferences
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-blue-800">
                    Our hauling specialists will provide customized service options based on your specific equipment and waste management needs.
                  </p>
                </div>
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
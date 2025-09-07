import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";

interface CompactorEquipmentTypeProps {
  onContinue: (equipmentType: 'stationary' | 'self-contained' | 'vertical' | 'pre-crusher') => void;
  onBack: () => void;
}

export function CompactorEquipmentType({ onContinue, onBack }: CompactorEquipmentTypeProps) {
  const [selectedType, setSelectedType] = useState<'stationary' | 'self-contained' | 'vertical' | 'pre-crusher' | ''>('');

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType as 'stationary' | 'self-contained' | 'vertical' | 'pre-crusher');
    }
  };

  const compactorTypes = [
    {
      id: 'stationary',
      name: 'Stationary Compactor',
      description: 'Large, permanent units that remain in one location. Ideal for high-volume waste generation.',
      features: ['High compaction ratios', 'Large capacity', 'Permanent installation', 'Commercial/industrial use']
    },
    {
      id: 'self-contained',
      name: 'Self-Contained Compactor',
      description: 'All-in-one units with built-in containers. Perfect for restaurants and retail locations.',
      features: ['Built-in container', 'Easy loading', 'Odor control', 'Space efficient']
    },
    {
      id: 'vertical',
      name: 'Vertical Compactor',
      description: 'Space-saving design that compacts waste vertically. Great for limited space applications.',
      features: ['Compact footprint', 'Vertical compression', 'Easy access', 'Small to medium volume']
    },
    {
      id: 'pre-crusher',
      name: 'Pre-Crusher Compactor',
      description: 'Crushes and compacts materials before disposal. Ideal for cardboard and packaging waste.',
      features: ['Pre-crushing capability', 'High efficiency', 'Cardboard specialist', 'Reduced volume']
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Compactor Equipment Type</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h3 className="text-lg">What type of compactor are you interested in?</h3>
            <p className="text-muted-foreground">
              Select the compactor type that best fits your business needs and space requirements.
            </p>
          </div>

          {/* Equipment Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Options</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose the compactor type that matches your waste volume and operational needs
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedType} 
                onValueChange={(value) => setSelectedType(value as typeof selectedType)}
                className="space-y-6"
              >
                {compactorTypes.map((type) => (
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
                  After selecting your compactor type, you'll provide additional details to help us match you with the right equipment suppliers:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Installation location and space requirements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Expected waste volume and material types
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Budget range and financing preferences
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Timeline for installation and deployment
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-blue-800">
                    Our equipment specialists will provide detailed specifications, pricing, and installation support for your selected compactor type.
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
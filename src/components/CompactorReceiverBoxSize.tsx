import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";

interface CompactorReceiverBoxSizeProps {
  hasBox: boolean;
  onContinue: (size: string) => void;
  onBack: () => void;
}

export function CompactorReceiverBoxSize({ hasBox, onContinue, onBack }: CompactorReceiverBoxSizeProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleContinue = () => {
    if (selectedSize) {
      onContinue(selectedSize);
    }
  };

  const receiverBoxSizes = [
    {
      id: '10-yard',
      name: '10 Cubic Yard',
      description: 'Compact size perfect for small to medium businesses with moderate waste generation.',
      dimensions: '12\' L × 6\' W × 4\' H',
      capacity: '10 cubic yards',
      suitableFor: ['Small retail stores', 'Restaurants', 'Small offices', 'Light manufacturing']
    },
    {
      id: '15-yard',
      name: '15 Cubic Yard',
      description: 'Mid-size option ideal for businesses with regular waste volumes and space constraints.',
      dimensions: '14\' L × 7\' W × 4.5\' H',
      capacity: '15 cubic yards',
      suitableFor: ['Medium retail locations', 'Grocery stores', 'Warehouses', 'Manufacturing facilities']
    },
    {
      id: '20-yard',
      name: '20 Cubic Yard',
      description: 'Popular choice for businesses with consistent high-volume waste generation needs.',
      dimensions: '16\' L × 7\' W × 5\' H',
      capacity: '20 cubic yards',
      suitableFor: ['Large retail chains', 'Distribution centers', 'Food processing', 'Heavy manufacturing']
    },
    {
      id: '30-yard',
      name: '30 Cubic Yard',
      description: 'Large capacity container for high-volume operations with significant waste streams.',
      dimensions: '20\' L × 8\' W × 6\' H',
      capacity: '30 cubic yards',
      suitableFor: ['Large industrial facilities', 'Major retail centers', 'Logistics operations', 'Heavy industry']
    },
    {
      id: '40-yard',
      name: '40 Cubic Yard',
      description: 'Maximum capacity option for the largest waste generation operations and facilities.',
      dimensions: '22\' L × 8\' W × 7\' H',
      capacity: '40 cubic yards',
      suitableFor: ['Large industrial complexes', 'Major distribution centers', 'Manufacturing plants', 'Bulk operations']
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Receiver Box Size</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h3 className="text-lg">
              {hasBox ? 'What size receiver box do you have?' : 'What size receiver box do you need?'}
            </h3>
            <p className="text-muted-foreground">
              {hasBox 
                ? 'Tell us the size of your existing receiver box to ensure compatible hauling service.'
                : 'Select the receiver box size that best fits your waste volume and operational needs.'
              }
            </p>
          </div>

          {/* Size Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Standard Receiver Box Sizes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose the size that matches your {hasBox ? 'current' : 'required'} receiver box capacity
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedSize} 
                onValueChange={setSelectedSize}
                className="space-y-4"
              >
                {receiverBoxSizes.map((size) => (
                  <div key={size.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={size.id} id={size.id} className="mt-1 flex-shrink-0" />
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Label htmlFor={size.id} className="cursor-pointer block">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{size.name}</h4>
                            <span className="text-sm text-muted-foreground">{size.capacity}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {size.description}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            <span className="font-medium">Dimensions:</span> {size.dimensions}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mt-2">
                            {size.suitableFor.slice(0, 4).map((use, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="w-1 h-1 bg-green-600 rounded-full flex-shrink-0"></div>
                                <span>{use}</span>
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
              <CardTitle className="text-lg">Size Selection Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Consider these factors when {hasBox ? 'confirming' : 'selecting'} your receiver box size:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Daily waste volume and generation patterns
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Available space and site accessibility
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Pickup frequency and scheduling requirements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Compactor output and compression ratios
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-blue-800">
                    {hasBox 
                      ? 'Our hauling specialists will verify compatibility with your existing receiver box.'
                      : 'Our team will help ensure the selected size meets your operational requirements and site constraints.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue}
              disabled={!selectedSize}
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
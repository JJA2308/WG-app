import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";

interface CompactorReceiverBoxStatusProps {
  onContinue: (status: 'have' | 'need') => void;
  onBack: () => void;
}

export function CompactorReceiverBoxStatus({ onContinue, onBack }: CompactorReceiverBoxStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState<'have' | 'need' | ''>('');

  const handleContinue = () => {
    if (selectedStatus) {
      onContinue(selectedStatus as 'have' | 'need');
    }
  };

  const statusOptions = [
    {
      id: 'have',
      name: 'I already have a receiver box',
      description: 'You currently have a receiver box container that works with your stationary compactor unit.',
      details: ['Existing container on-site', 'Compatible with your compactor', 'Ready for hauling service', 'No additional equipment needed']
    },
    {
      id: 'need',
      name: 'I need a receiver box',
      description: 'You need a receiver box container to work with your stationary compactor for waste collection.',
      details: ['New container required', 'Must match compactor specifications', 'Included in service quote', 'Delivery and setup included']
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Receiver Box Status</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h3 className="text-lg">Do you have a receiver box?</h3>
            <p className="text-muted-foreground">
              Stationary compactors require a receiver box container to collect and transport compacted waste.
            </p>
          </div>

          {/* Status Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Receiver Box Status</CardTitle>
              <p className="text-sm text-muted-foreground">
                Let us know if you already have a receiver box or need one provided
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedStatus} 
                onValueChange={(value) => setSelectedStatus(value as typeof selectedStatus)}
                className="space-y-6"
              >
                {statusOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value={option.id} id={option.id} className="mt-1 flex-shrink-0" />
                    
                    {/* Content */}
                    <div className="flex-1">
                      <Label htmlFor={option.id} className="cursor-pointer block">
                        <div className="space-y-2">
                          <h4 className="font-medium">{option.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {option.description}
                          </p>
                          <div className="grid grid-cols-2 gap-1">
                            {option.details.map((detail, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="w-1 h-1 bg-green-600 rounded-full flex-shrink-0"></div>
                                <span>{detail}</span>
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
              <CardTitle className="text-lg">About Receiver Boxes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Receiver boxes are essential containers that work with stationary compactors:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Collect compacted waste from the stationary unit
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Available in various sizes to match your volume needs
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Designed for efficient hauling and emptying
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Must be compatible with your compactor specifications
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue}
              disabled={!selectedStatus}
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
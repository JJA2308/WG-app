import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft, Package, Truck } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface CompactorServiceTypeProps {
  onContinue: (serviceType: 'equipment' | 'hauling' | 'both') => void;
  onBack: () => void;
}

export function CompactorServiceType({ onContinue, onBack }: CompactorServiceTypeProps) {
  const [selectedType, setSelectedType] = useState<'equipment' | 'hauling' | 'both' | ''>('');

  const handleContinue = () => {
    onContinue(selectedType as 'equipment' | 'hauling' | 'both' || 'equipment');
  };

  const handleServiceSelection = (value: 'equipment' | 'hauling' | 'both') => {
    setSelectedType(value);
  };

  const serviceOptions = [
    {
      value: 'equipment',
      icon: Package,
      iconColor: 'text-blue-600',
      title: 'Equipment Only',
      description: 'I need a compactor unit but will handle my own hauling and disposal',
      features: [
        'Compactor rental or purchase',
        'Installation and maintenance',
        'Equipment specifications and sizing'
      ]
    },
    {
      value: 'hauling',
      icon: Truck,
      iconColor: 'text-green-600',
      title: 'Hauling Only',
      description: 'I have a compactor but need pickup and disposal services',
      features: [
        'Scheduled pickup services',
        'Waste disposal and recycling',
        'Route optimization'
      ]
    },
    {
      value: 'both',
      icon: null,
      iconColor: '',
      title: 'Equipment & Hauling',
      description: 'I need a complete compactor solution including equipment and service',
      features: [
        'Complete turnkey solution',
        'Equipment rental/purchase and installation',
        'Full pickup and disposal services',
        'Ongoing maintenance and support'
      ]
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

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h2>Compactor Service</h2>
            <h3 className="text-lg">What do you need for your compactor service?</h3>
            <p className="text-muted-foreground">
              Select the type of compactor service you're looking for to get matched with the right suppliers.
            </p>
          </div>

          {/* Service Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Service Requirements</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose what you need for your compactor waste management
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedType} 
                onValueChange={(value) => setSelectedType(value as typeof selectedType)}
                className="space-y-4"
              >
                {serviceOptions.map((option) => {
                  const isSelected = selectedType === option.value;
                  const IconComponent = option.icon;
                  
                  return (
                    <div 
                      key={option.value}
                      className={`
                        relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-green-600 bg-green-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleServiceSelection(option.value as 'equipment' | 'hauling' | 'both')}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem 
                          value={option.value} 
                          id={option.value} 
                          className="mt-1 pointer-events-none" 
                        />
                        <div className="flex-1">
                          <Label 
                            htmlFor={option.value} 
                            className="flex items-center gap-2 cursor-pointer pointer-events-none"
                          >
                            {option.value === 'both' ? (
                              <div className="flex items-center gap-1">
                                <Package className="w-4 h-4 text-blue-600" />
                                <Truck className="w-4 h-4 text-green-600" />
                              </div>
                            ) : IconComponent ? (
                              <IconComponent className={`w-5 h-5 ${option.iconColor}`} />
                            ) : null}
                            <span className={`font-medium ${isSelected ? 'text-green-800' : ''}`}>
                              {option.title}
                            </span>
                          </Label>
                          <p className={`text-sm mt-1 ${isSelected ? 'text-green-700' : 'text-muted-foreground'}`}>
                            {option.description}
                          </p>
                          <div className={`mt-2 text-xs ${isSelected ? 'text-green-600' : 'text-muted-foreground'}`}>
                            {option.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-1 mt-1">
                                <span>•</span>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute top-3 right-3">
                          <div className="w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
                  After selecting your service type, you'll be asked to provide additional details about your specific needs:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Business location and site requirements
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Waste volume and material types
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Service frequency and schedule preferences
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Equipment specifications (if applicable)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
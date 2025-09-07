import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { ArrowLeft, CreditCard, Calendar, ShoppingCart, DollarSign, Clock, Building } from "lucide-react";

interface CompactorFinancingOptionsProps {
  onContinue: (financingType: 'lease' | 'finance' | 'purchase') => void;
  onBack: () => void;
}

export function CompactorFinancingOptions({ onContinue, onBack }: CompactorFinancingOptionsProps) {
  const [selectedType, setSelectedType] = useState<'lease' | 'finance' | 'purchase' | ''>('');

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType as 'lease' | 'finance' | 'purchase');
    }
  };

  const handleFinancingSelection = (value: 'lease' | 'finance' | 'purchase') => {
    setSelectedType(value);
  };

  const financingOptions = [
    {
      value: 'lease',
      icon: Calendar,
      iconColor: 'text-blue-600',
      title: 'Lease Equipment',
      description: 'Rent the compactor equipment with flexible terms and lower monthly payments.',
      benefits: [
        'Lower monthly payments',
        'Maintenance often included',
        'Easy equipment upgrades',
        'Tax deductible payments'
      ],
      bestFor: 'Businesses wanting flexibility with predictable monthly costs'
    },
    {
      value: 'finance',
      icon: CreditCard,
      iconColor: 'text-green-600',
      title: 'Finance Equipment',
      description: 'Finance the purchase with monthly payments and own the equipment at the end.',
      benefits: [
        'Build equity in equipment',
        'Competitive interest rates',
        'Own asset at end of term',
        'Depreciation tax benefits'
      ],
      bestFor: 'Businesses planning long-term use and wanting to build equity'
    },
    {
      value: 'purchase',
      icon: ShoppingCart,
      iconColor: 'text-purple-600',
      title: 'Purchase Outright',
      description: 'Buy the compactor equipment with full upfront payment and immediate ownership.',
      benefits: [
        'Immediate full ownership',
        'No interest payments',
        'Maximum tax deductions',
        'Complete control over equipment'
      ],
      bestFor: 'Businesses with available capital wanting full ownership immediately'
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Financing Options</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Introduction */}
          <div className="text-center space-y-2">
            <h3 className="text-lg">How would you like to acquire the equipment?</h3>
            <p className="text-muted-foreground">
              Choose the financing option that best fits your business needs and budget.
            </p>
          </div>

          {/* Financing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Financing Options
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Select your preferred method for acquiring the compactor equipment
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={selectedType} 
                onValueChange={(value) => setSelectedType(value as typeof selectedType)}
                className="space-y-6"
              >
                {financingOptions.map((option) => {
                  const isSelected = selectedType === option.value;
                  const IconComponent = option.icon;
                  
                  return (
                    <div 
                      key={option.value}
                      className={`
                        relative p-5 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-green-600 bg-green-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                      `}
                      onClick={() => handleFinancingSelection(option.value as 'lease' | 'finance' | 'purchase')}
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
                            <IconComponent className={`w-5 h-5 ${option.iconColor}`} />
                            <span className={`font-medium ${isSelected ? 'text-green-800' : ''}`}>
                              {option.title}
                            </span>
                          </Label>
                          <p className={`text-sm mt-2 ${isSelected ? 'text-green-700' : 'text-muted-foreground'}`}>
                            {option.description}
                          </p>
                          
                          {/* Benefits */}
                          <div className="mt-3 space-y-1">
                            <p className={`text-xs font-medium ${isSelected ? 'text-green-700' : 'text-muted-foreground'}`}>
                              Key Benefits:
                            </p>
                            <div className="grid grid-cols-1 gap-1">
                              {option.benefits.map((benefit, index) => (
                                <div key={index} className={`flex items-center gap-2 text-xs ${isSelected ? 'text-green-600' : 'text-muted-foreground'}`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Best For */}
                          <div className={`mt-3 p-2 rounded-md ${isSelected ? 'bg-green-100 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                            <p className={`text-xs ${isSelected ? 'text-green-800' : 'text-muted-foreground'}`}>
                              <span className="font-medium">Best for:</span> {option.bestFor}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Additional Information - Minimized */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Building className="w-4 h-4 text-blue-600" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                We'll connect you with suppliers offering customized financing terms and competitive rates.
              </p>
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
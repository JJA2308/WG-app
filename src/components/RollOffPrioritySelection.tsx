import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Clock, DollarSign, MessageCircle, HeadphonesIcon } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface RollOffPrioritySelectionProps {
  onContinue: (priorities: string[]) => void;
  onBack: () => void;
}

export function RollOffPrioritySelection({ onContinue, onBack }: RollOffPrioritySelectionProps) {
  const [priorities, setPriorities] = useState<string[]>([]);

  const availablePriorities = [
    {
      id: "Quick Turnaround",
      label: "Quick Turnaround",
      icon: Clock,
      description: "Fast delivery and pickup scheduling to meet tight project deadlines",
      color: "text-blue-600"
    },
    {
      id: "Price",
      label: "Price",
      icon: DollarSign,
      description: "Competitive pricing and transparent cost structure with no hidden fees",
      color: "text-green-600"
    },
    {
      id: "Communication",
      label: "Communication",
      icon: MessageCircle,
      description: "Regular updates, proactive notifications, and responsive customer service",
      color: "text-purple-600"
    },
    {
      id: "Dispatcher Access",
      label: "Dispatcher Access",
      icon: HeadphonesIcon,
      description: "Direct line to dispatch team for real-time updates and schedule changes",
      color: "text-orange-600"
    }
  ];

  const handlePriorityToggle = (priorityId: string) => {
    setPriorities(prev => {
      if (prev.includes(priorityId)) {
        return prev.filter(id => id !== priorityId);
      } else {
        return [...prev, priorityId];
      }
    });
  };

  const handleContinue = () => {
    onContinue(priorities);
  };

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
          <div className="text-center">
            <h2>What's Important to You?</h2>
            <p className="text-muted-foreground mt-2">
              Select your priorities to help us find the best roll-off suppliers for your needs. You can select multiple options.
            </p>
          </div>

          {/* Priority Options */}
          <div className="space-y-4">
            {availablePriorities.map((priority) => {
              const isSelected = priorities.includes(priority.id);
              const IconComponent = priority.icon;
              
              return (
                <Card 
                  key={priority.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-green-600 bg-green-50 shadow-md' 
                      : 'border-border hover:border-green-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handlePriorityToggle(priority.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 ${priority.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-medium ${isSelected ? 'text-green-800' : ''}`}>
                            {priority.label}
                          </h4>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? 'border-green-600 bg-green-600' 
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className={`text-sm ${isSelected ? 'text-green-700' : 'text-muted-foreground'}`}>
                          {priority.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Selected Priorities Summary */}
          {priorities.length > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-900">
                  Your Priorities ({priorities.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {priorities.map(priorityId => (
                    <span key={priorityId} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {priorityId}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-green-800 mt-3">
                  We'll use these priorities to rank and recommend the best suppliers for your roll-off service needs.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Information Card - Minimized */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">How This Helps</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                We'll rank suppliers and provide personalized recommendations based on your priorities.
              </p>
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
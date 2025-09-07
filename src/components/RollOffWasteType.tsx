import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Trash2, Hammer, Package, Factory, Recycle, Zap } from "lucide-react";
import { HeaderMenu } from "./HeaderMenu";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface RollOffWasteTypeProps {
  onContinue: (wasteType: string) => void;
  onBack: () => void;
  onReturnHome?: () => void;
}

export function RollOffWasteType({ onContinue, onBack, onReturnHome }: RollOffWasteTypeProps) {
  const [selectedWasteType, setSelectedWasteType] = useState<string>('');

  const wasteTypes = [
    {
      id: 'msw',
      label: 'Municipal Solid Waste (MSW)',
      description: 'General household and office waste',
      icon: Trash2,
      color: 'bg-gray-50 border-gray-200'
    },
    {
      id: 'construction',
      label: 'Construction Material',
      description: 'Debris from construction and demolition',
      icon: Hammer,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'concrete',
      label: 'Concrete',
      description: 'Concrete blocks, slabs, and rubble',
      icon: Package,
      color: 'bg-stone-50 border-stone-200'
    },
    {
      id: 'glass',
      label: 'Glass',
      description: 'Glass bottles, windows, and materials',
      icon: Zap,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'industrial',
      label: 'Industrial Waste',
      description: 'Manufacturing and industrial byproducts',
      icon: Factory,
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 'recycle',
      label: 'Recyclable Materials',
      description: 'Paper, cardboard, metals, and plastics',
      icon: Recycle,
      color: 'bg-green-50 border-green-200'
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
        {onReturnHome ? (
          <HeaderMenu onReturnHome={onReturnHome} />
        ) : (
          <div className="w-8"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Select Waste Type</h2>
          <p className="text-muted-foreground mt-2">
            What type of waste will you be disposing of in the roll-off container?
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {wasteTypes.map((wasteType) => (
            <Card 
              key={wasteType.id}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedWasteType === wasteType.id 
                  ? 'ring-2 ring-green-500 border-green-300 bg-green-50' 
                  : `${wasteType.color} hover:shadow-md`
              }`}
              onClick={() => setSelectedWasteType(wasteType.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedWasteType === wasteType.id 
                    ? 'bg-green-600' 
                    : 'bg-white border-2 border-current opacity-60'
                }`}>
                  <wasteType.icon 
                    className={`w-5 h-5 ${
                      selectedWasteType === wasteType.id 
                        ? 'text-white' 
                        : 'text-current'
                    }`} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1">{wasteType.label}</h3>
                  <p className="text-sm text-muted-foreground">{wasteType.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedWasteType === wasteType.id 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedWasteType === wasteType.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Special Notice for Industrial and Recycle */}
        {(selectedWasteType === 'industrial' || selectedWasteType === 'recycle') && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="mb-2 text-blue-900">Specialized Service Required</h3>
                <p className="text-sm text-blue-700">
                  {selectedWasteType === 'industrial' 
                    ? 'Industrial waste requires specialized handling and permits. We\'ll connect you with certified industrial waste management providers.'
                    : 'Recyclable materials require specialized processing. We\'ll connect you with certified recycling service providers.'
                  }
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-4">
        <Button 
          onClick={() => onContinue(selectedWasteType)}
          disabled={!selectedWasteType}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
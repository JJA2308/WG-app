import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ArrowLeft, XCircle, AlertTriangle, Skull, Zap, Droplets, HardHat } from "lucide-react";

interface JunkRemovalNotAcceptedProps {
  onContinue: () => void;
  onBack: () => void;
}

export function JunkRemovalNotAccepted({ onContinue, onBack }: JunkRemovalNotAcceptedProps) {
  const [confirmed, setConfirmed] = useState(false);

  const prohibitedItems = [
    {
      category: "Hazardous Chemicals & Materials",
      icon: Skull,
      items: [
        "Paint, stains, and solvents",
        "Pesticides and herbicides",
        "Motor oil and automotive fluids",
        "Propane tanks and gas cylinders",
        "Cleaning chemicals and acids",
        "Pool chemicals",
        "Fertilizers and lawn chemicals"
      ]
    },
    {
      category: "Medical & Biological Waste",
      icon: AlertTriangle,
      items: [
        "Medical waste and sharps",
        "Prescription medications",
        "Biological materials",
        "Laboratory specimens",
        "Infectious waste",
        "Needles and syringes"
      ]
    },
    {
      category: "Electrical & Electronic Hazards",
      icon: Zap,
      items: [
        "Fluorescent light bulbs",
        "Mercury-containing items",
        "Batteries (car, marine, industrial)",
        "Transformers with PCBs",
        "Capacitors",
        "Electrical ballasts"
      ]
    },
    {
      category: "Construction & Industrial Materials",
      icon: HardHat,
      items: [
        "Asbestos-containing materials",
        "Lead-based paint materials",
        "Radioactive materials",
        "Industrial solvents",
        "Contaminated soil",
        "Concrete and heavy debris (over limits)"
      ]
    },
    {
      category: "Flammable & Explosive Items",
      icon: Droplets,
      items: [
        "Gasoline and fuel",
        "Fireworks and explosives",
        "Ammunition and firearms",
        "Compressed gas cylinders",
        "Fuel tanks",
        "Flammable liquids"
      ]
    }
  ];

  const handleContinue = () => {
    if (confirmed) {
      onContinue();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Items We Cannot Accept</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="mb-2">Prohibited Items</h3>
            <p className="text-muted-foreground">
              For safety and legal reasons, we cannot remove the following items. 
              Please confirm you do not have any of these items.
            </p>
          </div>

          {/* Prohibited Items List */}
          <div className="space-y-6">
            {prohibitedItems.map((category) => {
              const IconComponent = category.icon;
              
              return (
                <div key={category.category} className="space-y-3">
                  <div className="flex items-center gap-3 border-b border-red-200 pb-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-red-600" />
                    </div>
                    <h4 className="text-red-700">{category.category}</h4>
                  </div>
                  <div className="pl-11 space-y-2">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Important Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="text-red-900 mb-2">Important Safety Notice</h4>
                <p className="text-sm text-red-800 mb-3">
                  These items require special handling and disposal methods. Attempting to include 
                  them in regular junk removal could result in:
                </p>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Safety hazards for our team</li>
                  <li>• Environmental contamination</li>
                  <li>• Legal violations and fines</li>
                  <li>• Service cancellation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Alternative Disposal Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-900 mb-2">Proper Disposal Options</h4>
            <p className="text-sm text-blue-800 mb-2">
              For these prohibited items, please contact:
            </p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Local hazardous waste facilities</li>
              <li>• Municipal collection programs</li>
              <li>• Specialized disposal companies</li>
              <li>• Manufacturer take-back programs</li>
            </ul>
          </div>

          {/* Confirmation Checkbox */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="confirmation"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                className="mt-1"
              />
              <Label 
                htmlFor="confirmation" 
                className="flex-1 cursor-pointer leading-relaxed"
              >
                <span className="text-red-600">*</span> I confirm that I do not have any of the prohibited items listed above 
                and understand that including them could result in service cancellation 
                and additional fees.
              </Label>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue} 
              disabled={!confirmed}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              I Understand - Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
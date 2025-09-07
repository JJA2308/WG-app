import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';
import { HeaderMenu } from "./HeaderMenu";

interface SelectServicesProps {
  onContinue: (selectedServices: string[]) => void;
  onContinueWithRollOff: () => void;
  onBack: () => void;
  onReturnHome: () => void;
}

export function SelectServices({ onContinue, onContinueWithRollOff, onBack, onReturnHome }: SelectServicesProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: "rolloff", label: "Roll-Off" },
    { id: "frontload", label: "Front Load" },
    { id: "compactor", label: "Compactor" },
    { id: "junkremoval", label: "Junk Removal" }
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    }
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
        <HeaderMenu onReturnHome={onReturnHome} />
      </div>

      {/* Services List */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Select Service</h2>
          <p className="text-muted-foreground mt-2">
            Choose one or more service types you need:
          </p>
        </div>
        
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <Checkbox
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
              />
              <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                {service.label}
              </Label>
            </div>
          ))}
        </div>

        {/* Button positioned close to services */}
        <div className="pt-6 pb-6">
          <Button 
            onClick={() => {
              if (selectedServices.includes('rolloff')) {
                onContinueWithRollOff();
              } else {
                onContinue(selectedServices);
              }
            }} 
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
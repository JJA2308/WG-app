import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Calendar } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface CurrentContractInfoProps {
  onContinue: (contractInfo: ContractInfo) => void;
  onBack: () => void;
}

interface ContractInfo {
  hasExistingContract: boolean;
  isOutOfContract?: boolean;
  currentHauler?: string;
  contractEndDate?: string;
  contractType?: string;
}

export function CurrentContractInfo({ onContinue, onBack }: CurrentContractInfoProps) {
  const [contractType, setContractType] = useState<'existing' | 'out-of-contract' | 'new' | ''>('');
  const [currentHauler, setCurrentHauler] = useState('');
  const [contractEndDate, setContractEndDate] = useState('');

  const handleContinue = () => {
    if (contractType === 'new') {
      onContinue({
        hasExistingContract: false,
        contractType: 'new'
      });
    } else if (contractType === 'existing') {
      onContinue({
        hasExistingContract: true,
        currentHauler: currentHauler || '',
        contractEndDate: contractEndDate || '',
        contractType: 'existing'
      });
    } else if (contractType === 'out-of-contract') {
      onContinue({
        hasExistingContract: false,
        isOutOfContract: true,
        currentHauler: currentHauler || '',
        contractEndDate: contractEndDate || '',
        contractType: 'out-of-contract'
      });
    } else {
      // No selection made - pass empty contract type for validation
      onContinue({
        hasExistingContract: false,
        contractType: ''
      });
    }
  };

  // Validation will be handled in App.tsx
  const isValid = true;

  const showContractFields = contractType === 'existing' || contractType === 'out-of-contract';

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
            <h2>Current Contract Info</h2>
            <p className="text-muted-foreground mt-2">
              Help us understand your current waste management situation (optional)
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contract Status</CardTitle>
              <p className="text-sm text-muted-foreground">
                This information helps us provide better service recommendations
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={contractType} onValueChange={(value) => setContractType(value as 'existing' | 'out-of-contract' | 'new')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing">I have an existing contract</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="out-of-contract" id="out-of-contract" />
                  <Label htmlFor="out-of-contract">Out of previous contract</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">No previous hauler, new business</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {showContractFields && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {contractType === 'existing' ? 'Current Contract Details' : 'Previous Contract Details'}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Optional information to help haulers provide better service
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hauler">
                    {contractType === 'existing' ? 'Current Hauler Name (Optional)' : 'Previous Hauler Name (Optional)'}
                  </Label>
                  <Input
                    id="hauler"
                    value={currentHauler}
                    onChange={(e) => setCurrentHauler(e.target.value)}
                    placeholder={contractType === 'existing' ? "Enter your current hauler's name" : "Enter your previous hauler's name"}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">Contract End Date</Label>
                  <div className="relative mt-2">
                    <Input
                      id="endDate"
                      type="date"
                      value={contractEndDate}
                      onChange={(e) => setContractEndDate(e.target.value)}
                      className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {contractType === 'new' && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <h3 className="font-medium">New Business</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll help you find the perfect waste management solution for your new business needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Button positioned close to content */}
          <div className="pt-6 pb-6">
            <Button 
              onClick={handleContinue}
              disabled={!isValid}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
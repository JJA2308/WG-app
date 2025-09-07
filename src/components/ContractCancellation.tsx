import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, AlertTriangle, DollarSign, FileX, MessageSquare } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ContractCancellationProps {
  selectedProperty: any;
  isEarlyCancellation: boolean;
  onBack: () => void;
  onConfirmCancellation: (reason: string, details: string) => void;
}

export function ContractCancellation({ 
  selectedProperty, 
  isEarlyCancellation, 
  onBack, 
  onConfirmCancellation 
}: ContractCancellationProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const cancellationReasons = [
    {
      id: 'pricing',
      label: 'Pricing Issues',
      description: 'Service costs too high or unexpected price increases'
    },
    {
      id: 'fees',
      label: 'Excessive Fees',
      description: 'Too many additional charges or hidden fees'
    },
    {
      id: 'service',
      label: 'Service Quality',
      description: 'Poor service quality, missed pickups, or unresponsive support'
    },
    {
      id: 'better-option',
      label: 'Found Better Option',
      description: 'Found a more competitive or suitable service provider'
    }
  ];

  // Calculate early termination fee (mock calculation)
  const calculateTerminationFee = () => {
    const contractEnd = new Date(selectedProperty.contractEndDate);
    const today = new Date();
    const monthsRemaining = Math.ceil((contractEnd.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30));
    const monthlyRate = selectedProperty.contractValue || 2400;
    
    // Early termination fee is typically 2-3 months of service
    return Math.min(monthlyRate * 2, monthsRemaining * monthlyRate * 0.5);
  };

  const terminationFee = isEarlyCancellation ? calculateTerminationFee() : 0;

  const handleSubmit = () => {
    if (selectedReason) {
      onConfirmCancellation(selectedReason, additionalDetails);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-8 w-auto max-w-full object-contain"
          />
        </div>
        
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Contract Cancellation</h2>
          <p className="text-muted-foreground mt-2">
            {selectedProperty.name}
          </p>
        </div>

        {/* Property and Contract Info */}
        <Card className="p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hauler:</span>
              <span className="font-medium">{selectedProperty.hauler}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Contract End:</span>
              <span>{selectedProperty.contractEndDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Rate:</span>
              <span>${(selectedProperty.contractValue || 2400).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Early Termination Fee Warning */}
        {isEarlyCancellation && (
          <Card className="p-4 mb-6 bg-amber-50 border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900">Early Termination Fee</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Cancelling before your contract end date will incur a termination fee.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  <span className="font-medium text-amber-900">
                    ${terminationFee.toLocaleString()} termination fee
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Cancellation Reason Selection */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-4">Reason for Cancellation</h3>
          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            <div className="space-y-3">
              {cancellationReasons.map((reason) => (
                <div 
                  key={reason.id} 
                  className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedReason === reason.id 
                      ? 'bg-green-50 border-green-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReason(reason.id)}
                >
                  <RadioGroupItem value={reason.id} id={reason.id} className="mt-1" />
                  <div className="flex-1">
                    <Label 
                      htmlFor={reason.id} 
                      className={`font-medium cursor-pointer ${
                        selectedReason === reason.id ? 'text-green-700' : ''
                      }`}
                    >
                      {reason.label}
                    </Label>
                    <p className={`text-sm mt-1 ${
                      selectedReason === reason.id ? 'text-green-600' : 'text-muted-foreground'
                    }`}>
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Additional Details */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-3">Additional Details (Optional)</h3>
          <Textarea
            placeholder="Provide any additional details about your cancellation reason..."
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            className="min-h-20"
          />
          <p className="text-xs text-muted-foreground mt-2">
            These details will be included in your cancellation letter to the hauler.
          </p>
        </Card>

        {/* Cancellation Process Info */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">What happens next?</h3>
              <div className="text-sm text-blue-700 mt-2 space-y-1">
                <div>• A formal cancellation letter will be sent to your hauler</div>
                <div>• You'll receive a copy of the cancellation notice</div>
                {isEarlyCancellation && (
                  <div>• You'll be billed for the early termination fee</div>
                )}
                <div>• Your hauler will confirm the cancellation timeline</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedReason}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isEarlyCancellation ? 'Confirm Early Cancellation' : 'Confirm Cancellation'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onBack}
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
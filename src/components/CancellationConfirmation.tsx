import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, CheckCircle, Mail, DollarSign, Calendar, FileText, Download } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface CancellationConfirmationProps {
  selectedProperty: any;
  isEarlyCancellation: boolean;
  cancellationReason: string;
  additionalDetails: string;
  onBack: () => void;
  onSendCancellation: () => void;
}

export function CancellationConfirmation({ 
  selectedProperty, 
  isEarlyCancellation, 
  cancellationReason,
  additionalDetails,
  onBack, 
  onSendCancellation 
}: CancellationConfirmationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Calculate termination fee and notice period
  const calculateDetails = () => {
    const contractEnd = new Date(selectedProperty.contractEndDate);
    const today = new Date();
    const monthsRemaining = Math.ceil((contractEnd.getTime() - today.getTime()) / (1000 * 3600 * 24 * 30));
    const monthlyRate = selectedProperty.contractValue || 2400;
    
    const terminationFee = isEarlyCancellation ? Math.min(monthlyRate * 2, monthsRemaining * monthlyRate * 0.5) : 0;
    
    // Standard notice period is 30 days
    const serviceEndDate = new Date();
    serviceEndDate.setDate(serviceEndDate.getDate() + 30);
    
    return {
      terminationFee,
      serviceEndDate: serviceEndDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      monthsRemaining
    };
  };

  const { terminationFee, serviceEndDate, monthsRemaining } = calculateDetails();

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'pricing': return 'Pricing Issues';
      case 'fees': return 'Excessive Fees';
      case 'service': return 'Service Quality';
      case 'better-option': return 'Found Better Option';
      default: return reason;
    }
  };

  const handleSendCancellation = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSent(true);
      // Call parent handler after a short delay to show success
      setTimeout(() => {
        onSendCancellation();
      }, 2000);
    }, 2000);
  };

  if (isSent) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 pt-6">
          <div className="w-16"></div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src={wasteGeekLogo} 
              alt="Waste Geek" 
              className="h-8 w-auto max-w-full object-contain"
            />
          </div>
          
          <div className="w-16"></div>
        </div>

        {/* Success Content */}
        <div className="flex-1 px-6 py-4 overflow-y-auto flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mb-2">Cancellation Sent</h2>
            <p className="text-muted-foreground mb-6">
              Your cancellation letter has been sent to {selectedProperty.hauler}. You'll receive confirmation within 24-48 hours.
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800">
                  Service will end on {serviceEndDate}
                </p>
              </div>
              {isEarlyCancellation && terminationFee > 0 && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-amber-800">
                    Termination fee: ${terminationFee.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h2>Confirm Cancellation</h2>
          <p className="text-muted-foreground mt-2">
            Review your cancellation details before sending
          </p>
        </div>

        {/* Cancellation Summary */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-4">Cancellation Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Property:</span>
              <span className="font-medium">{selectedProperty.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hauler:</span>
              <span>{selectedProperty.hauler}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cancellation Type:</span>
              <Badge variant={isEarlyCancellation ? "destructive" : "secondary"}>
                {isEarlyCancellation ? 'Early Cancellation' : 'Standard Cancellation'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reason:</span>
              <span>{getReasonLabel(cancellationReason)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service End Date:</span>
              <span className="font-medium">{serviceEndDate}</span>
            </div>
          </div>
        </Card>

        {/* Financial Impact */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            Financial Impact
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Monthly Rate:</span>
              <span>${(selectedProperty.contractValue || 2400).toLocaleString()}</span>
            </div>
            {isEarlyCancellation && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Months Remaining:</span>
                  <span>{monthsRemaining}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Early Termination Fee:</span>
                  <span className="font-medium">${terminationFee.toLocaleString()}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total Cancellation Cost:</span>
                  <span className="text-red-600">${terminationFee.toLocaleString()}</span>
                </div>
              </>
            )}
            {!isEarlyCancellation && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Cancellation Cost:</span>
                <span>$0 (No early termination fee)</span>
              </div>
            )}
          </div>
        </Card>

        {/* Additional Details */}
        {additionalDetails && (
          <Card className="p-4 mb-6">
            <h3 className="font-medium mb-3">Additional Details</h3>
            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
              {additionalDetails}
            </p>
          </Card>
        )}

        {/* Cancellation Letter Preview */}
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-blue-900">Cancellation Letter</h3>
              <p className="text-sm text-blue-700 mt-1">
                A formal cancellation notice will be sent to {selectedProperty.hauler} including:
              </p>
              <div className="text-sm text-blue-700 mt-2 space-y-1">
                <div>• Property and contract details</div>
                <div>• Cancellation reason and timeline</div>
                <div>• Required notice period (30 days)</div>
                {isEarlyCancellation && <div>• Early termination fee acknowledgment</div>}
                <div>• Request for final billing and service confirmation</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSendCancellation}
            disabled={isProcessing}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending Cancellation Letter...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Send Cancellation Letter
              </div>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onBack}
            disabled={isProcessing}
            className="w-full"
          >
            Review Details
          </Button>
        </div>
      </div>
    </div>
  );
}
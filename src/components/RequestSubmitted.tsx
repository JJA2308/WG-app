import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { HeaderMenu } from "./HeaderMenu";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface RequestSubmittedProps {
  onReturnToDashboard: () => void;
  onReturnHome?: () => void;
  requestType: 'temporary-rolloff' | 'compactor' | 'junk-removal';
}

export function RequestSubmitted({ onReturnToDashboard, onReturnHome, requestType }: RequestSubmittedProps) {
  const getRequestTypeText = () => {
    switch (requestType) {
      case 'temporary-rolloff':
        return 'temporary roll-off service';
      case 'compactor':
        return 'compactor service';
      case 'junk-removal':
        return 'junk removal service';
      default:
        return 'service';
    }
  };

  const getEstimatedResponseTime = () => {
    switch (requestType) {
      case 'temporary-rolloff':
        return '2-4 hours';
      case 'compactor':
        return '24-48 hours';
      case 'junk-removal':
        return '1-2 hours';
      default:
        return '24 hours';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <div className="w-8"></div>
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
      <div className="flex-1 px-6 py-4 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="mb-4">Request Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Your request for {getRequestTypeText()} has been sent to qualified haulers servicing your area.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="mb-2">Check Your Messages</h3>
                <p className="text-sm text-muted-foreground">
                  Haulers will contact you through the Messages section on your dashboard. 
                  You'll receive notifications when new messages arrive.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="mb-2">Expected Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  Most haulers respond within {getEstimatedResponseTime()}. You may receive multiple 
                  quotes to compare pricing and services.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="mb-3 text-blue-800">What Happens Next?</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>1. Qualified haulers will review your request</p>
              <p>2. You'll receive quotes and availability information</p>
              <p>3. Compare options and select your preferred hauler</p>
              <p>4. Coordinate service details directly with your chosen provider</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-4">
        <Button 
          onClick={onReturnToDashboard}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
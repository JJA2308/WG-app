import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, Package, DollarSign, Share2, CheckCircle } from "lucide-react";

interface TemporaryServiceSharingProps {
  serviceData: TemporaryServiceData;
  onShareWithSuppliers: () => void;
  onBack: () => void;
}

interface Container {
  id: string;
  size: string;
  startDate: string;
  useSameDate: boolean;
}

interface TemporaryServiceData {
  streetAddress: string;
  city: string;
  zipCode: string;
  dateNeeded: string;
  jobLength: string;
  jobLengthUnit: string;
  containers: Container[];
}

export function TemporaryServiceSharing({ serviceData, onShareWithSuppliers, onBack }: TemporaryServiceSharingProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [hasShared, setHasShared] = useState(false);

  // Get zip code from service data
  const getZipCode = () => {
    return serviceData.zipCode || "12345";
  };

  // Calculate estimated cost range based on containers and market data
  const calculateCostRange = () => {
    const baseRates = {
      "10yd": { min: 325, max: 450 },
      "20yd": { min: 425, max: 575 },
      "30yd": { min: 525, max: 675 },
      "40yd": { min: 625, max: 775 }
    };

    let totalMin = 0;
    let totalMax = 0;

    serviceData.containers.forEach(container => {
      const rates = baseRates[container.size as keyof typeof baseRates];
      if (rates) {
        totalMin += rates.min;
        totalMax += rates.max;
      }
    });

    return { min: totalMin, max: totalMax };
  };

  const costRange = calculateCostRange();
  const zipCode = getZipCode();

  const handleShare = async () => {
    setIsSharing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSharing(false);
    setHasShared(true);
  };

  const handleContinueToDashboard = () => {
    onShareWithSuppliers();
  };

  if (hasShared) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center p-4 pt-6">
          <div className="w-8"></div>
          <h2 className="flex-1 text-center">Request Shared</h2>
        </div>

        {/* Success Content */}
        <div className="flex-1 px-6 py-4 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Request Sent Successfully!</h3>
            <p className="text-muted-foreground">
              Your temporary roll-off service request has been shared with available suppliers in your area.
            </p>
          </div>

          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Service Area:</span>
                  <span className="text-sm font-medium">{zipCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Containers:</span>
                  <span className="text-sm font-medium">{serviceData.containers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Range:</span>
                  <span className="text-sm font-medium text-green-600">
                    ${costRange.min.toLocaleString()} - ${costRange.max.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
            <p className="text-sm text-blue-800">
              Suppliers will respond directly through the app. You'll receive notifications when quotes are available.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6">
          <Button 
            onClick={handleContinueToDashboard}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Service Summary</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Service Details Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Site Address</p>
                  <p className="font-medium">
                    {serviceData.streetAddress && serviceData.city && serviceData.zipCode 
                      ? `${serviceData.streetAddress}, ${serviceData.city}, ${serviceData.zipCode}`
                      : 'Address not provided'
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Date Needed</p>
                  <p className="font-medium">
                    {new Date(serviceData.dateNeeded).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Job Length</p>
                  <p className="font-medium">{serviceData.jobLength} {serviceData.jobLengthUnit}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Containers</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {serviceData.containers.map((container, index) => (
                      <Badge key={container.id} variant="secondary">
                        {container.size}
                        {index > 0 && !container.useSameDate && (
                          <span className="ml-1 text-xs">
                            (Start: {new Date(container.startDate).toLocaleDateString()})
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Estimate */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Estimated Cost Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="text-3xl font-bold text-green-600">
                  ${costRange.min.toLocaleString()} - ${costRange.max.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on market data for zip code {zipCode}
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    This is an estimate based on similar jobs in your area. Actual quotes may vary based on specific requirements, disposal fees, and market conditions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sharing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share with Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Your request will be shared with verified roll-off suppliers in your service area who can provide:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Competitive pricing for your specific needs
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Availability confirmation for your requested dates
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Custom quotes based on job requirements
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button 
          onClick={handleShare}
          disabled={isSharing}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 flex items-center gap-2"
        >
          {isSharing ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Sharing Request...
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              Share with Suppliers
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
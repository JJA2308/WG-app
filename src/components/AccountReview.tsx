import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ArrowLeft, Building, TrendingUp, TrendingDown, Clock, DollarSign, MessageSquare, CheckCircle, XCircle, AlertTriangle, BarChart3, FileX } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface AccountReviewProps {
  selectedProperty: any;
  onBack: () => void;
  onCancelContract?: (property: any, isEarly: boolean) => void;
}

export function AccountReview({ selectedProperty, onBack, onCancelContract }: AccountReviewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'3m' | '6m' | '12m'>('6m');

  // Mock data based on the selected property and period
  const getMetricsData = (propertyId: number, period: string) => {
    // This would normally come from an API
    const baseData = {
      1: { // Main Office Location - GreenWaste Solutions
        missedPickups: { '3m': 2, '6m': 4, '12m': 7 },
        extraCharges: { '3m': 3, '6m': 6, '12m': 12 },
        priceIncreases: { '3m': 0, '6m': 1, '12m': 2 },
        avgResponseTime: { '3m': 4.2, '6m': 4.8, '12m': 5.1 },
        resolutionRate: { '3m': 92, '6m': 89, '12m': 87 },
        totalInquiries: { '3m': 8, '6m': 15, '12m': 28 },
        contractValue: 2400,
        haulerName: "GreenWaste Solutions"
      },
      2: { // Warehouse Facility - Metro Waste Management  
        missedPickups: { '3m': 5, '6m': 12, '12m': 22 },
        extraCharges: { '3m': 7, '6m': 14, '12m': 28 },
        priceIncreases: { '3m': 1, '6m': 2, '12m': 3 },
        avgResponseTime: { '3m': 6.8, '6m': 7.2, '12m': 7.5 },
        resolutionRate: { '3m': 78, '6m': 76, '12m': 74 },
        totalInquiries: { '3m': 12, '6m': 24, '12m': 45 },
        contractValue: 4200,
        haulerName: "Metro Waste Management"
      },
      3: { // Retail Store - City Waste Services
        missedPickups: { '3m': 1, '6m': 1, '12m': 3 },
        extraCharges: { '3m': 1, '6m': 2, '12m': 4 },
        priceIncreases: { '3m': 0, '6m': 0, '12m': 1 },
        avgResponseTime: { '3m': 2.1, '6m': 2.3, '12m': 2.4 },
        resolutionRate: { '3m': 98, '6m': 96, '12m': 95 },
        totalInquiries: { '3m': 3, '6m': 6, '12m': 12 },
        contractValue: 1800,
        haulerName: "City Waste Services"
      }
    };
    
    return baseData[propertyId as keyof typeof baseData] || baseData[1];
  };

  const metrics = getMetricsData(selectedProperty.id, selectedPeriod);
  
  // Calculate Customer Experience Score
  const calculateCustomerExperienceScore = () => {
    const periodData = {
      missedPickups: metrics.missedPickups[selectedPeriod],
      extraCharges: metrics.extraCharges[selectedPeriod],
      priceIncreases: metrics.priceIncreases[selectedPeriod],
      avgResponseTime: metrics.avgResponseTime[selectedPeriod],
      resolutionRate: metrics.resolutionRate[selectedPeriod],
      totalInquiries: metrics.totalInquiries[selectedPeriod]
    };

    // Scoring algorithm (out of 100)
    let score = 100;
    
    // Missed pickups penalty (up to -30 points)
    score -= Math.min(periodData.missedPickups * 5, 30);
    
    // Extra charges penalty (up to -20 points)  
    score -= Math.min(periodData.extraCharges * 2, 20);
    
    // Price increases penalty (up to -15 points)
    score -= Math.min(periodData.priceIncreases * 7, 15);
    
    // Response time penalty (up to -20 points)
    if (periodData.avgResponseTime > 24) score -= 20;
    else if (periodData.avgResponseTime > 12) score -= 15;
    else if (periodData.avgResponseTime > 6) score -= 10;
    else if (periodData.avgResponseTime > 3) score -= 5;
    
    // Resolution rate adjustment (up to -15 points)
    if (periodData.resolutionRate < 70) score -= 15;
    else if (periodData.resolutionRate < 80) score -= 10;
    else if (periodData.resolutionRate < 90) score -= 5;
    
    return Math.max(score, 0);
  };

  const customerExperienceScore = calculateCustomerExperienceScore();
  
  // Check if contract is ending soon or can be cancelled early
  const isContractEndingSoon = () => {
    const contractEnd = new Date(selectedProperty.contractEndDate);
    const today = new Date();
    const timeDiff = contractEnd.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 90; // Within 90 days
  };

  const canCancelEarly = () => {
    return !isContractEndingSoon();
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 85) return TrendingUp;
    if (score >= 70) return BarChart3;
    return TrendingDown;
  };

  const ScoreIcon = getScoreIcon(customerExperienceScore);

  const periodLabels = {
    '3m': 'Last 3 Months',
    '6m': 'Last 6 Months', 
    '12m': 'Last 12 Months'
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 pt-6">
        {/* Left side - Back button */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Center - Waste Geek Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-8 w-auto max-w-full object-contain"
          />
        </div>
        
        {/* Right side spacer */}
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Account Performance Review</h2>
          <p className="text-muted-foreground mt-2">
            {selectedProperty.name}
          </p>
        </div>

        {/* Property Info Card */}
        <Card className="p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{selectedProperty.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedProperty.address}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span><strong>Hauler:</strong> {metrics.haulerName}</span>
                <span><strong>Contract Value:</strong> ${metrics.contractValue.toLocaleString()}/month</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Period Selection */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {Object.entries(periodLabels).map(([period, label]) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period as '3m' | '6m' | '12m')}
                className={`text-xs ${selectedPeriod === period ? 'bg-white shadow-sm' : ''}`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Customer Experience Score */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-2">
          <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-2">
              <ScoreIcon className={`w-8 h-8 ${getScoreColor(customerExperienceScore)}`} />
              <span className={`text-4xl font-bold ${getScoreColor(customerExperienceScore)}`}>
                {customerExperienceScore}
              </span>
            </div>
            <h3 className="font-medium text-lg mb-2">Customer Experience Score</h3>
            <p className="text-sm text-muted-foreground">
              Based on service reliability, response times, and customer satisfaction across all properties serviced by {metrics.haulerName}
            </p>
            <div className="mt-4">
              <Progress value={customerExperienceScore} className="h-3" />
            </div>
          </div>
        </Card>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Missed Pickups */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <Badge variant={metrics.missedPickups[selectedPeriod] > 5 ? "destructive" : "secondary"}>
                {metrics.missedPickups[selectedPeriod]}
              </Badge>
            </div>
            <h4 className="font-medium text-sm">Missed Pickups</h4>
            <p className="text-xs text-muted-foreground">
              {periodLabels[selectedPeriod]}
            </p>
          </Card>

          {/* Extra Charges */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              <Badge variant={metrics.extraCharges[selectedPeriod] > 8 ? "destructive" : "secondary"}>
                {metrics.extraCharges[selectedPeriod]}
              </Badge>
            </div>
            <h4 className="font-medium text-sm">Extra Charges</h4>
            <p className="text-xs text-muted-foreground">
              Unexpected fees
            </p>
          </Card>

          {/* Price Increases */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-500" />
              <Badge variant={metrics.priceIncreases[selectedPeriod] > 1 ? "destructive" : "secondary"}>
                {metrics.priceIncreases[selectedPeriod]}
              </Badge>
            </div>
            <h4 className="font-medium text-sm">Price Increases</h4>
            <p className="text-xs text-muted-foreground">
              Rate adjustments
            </p>
          </Card>

          {/* Response Time */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <Badge variant={metrics.avgResponseTime[selectedPeriod] > 6 ? "destructive" : "secondary"}>
                {metrics.avgResponseTime[selectedPeriod]}h
              </Badge>
            </div>
            <h4 className="font-medium text-sm">Avg Response Time</h4>
            <p className="text-xs text-muted-foreground">
              Customer service
            </p>
          </Card>
        </div>

        {/* Customer Service Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Resolution Rate */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <Badge variant={metrics.resolutionRate[selectedPeriod] < 80 ? "destructive" : "default"}>
                {metrics.resolutionRate[selectedPeriod]}%
              </Badge>
            </div>
            <h4 className="font-medium text-sm">Resolution Rate</h4>
            <p className="text-xs text-muted-foreground">
              Issues resolved
            </p>
          </Card>

          {/* Total Inquiries */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              <Badge variant="secondary">
                {metrics.totalInquiries[selectedPeriod]}
              </Badge>
            </div>
            <h4 className="font-medium text-sm">Service Inquiries</h4>
            <p className="text-xs text-muted-foreground">
              Total requests
            </p>
          </Card>
        </div>

        {/* Score Impact Breakdown */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Score Impact Analysis
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Score:</span>
              <span>100</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Missed Pickups (-5 each):</span>
              <span>-{Math.min(metrics.missedPickups[selectedPeriod] * 5, 30)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Extra Charges (-2 each):</span>
              <span>-{Math.min(metrics.extraCharges[selectedPeriod] * 2, 20)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Price Increases (-7 each):</span>
              <span>-{Math.min(metrics.priceIncreases[selectedPeriod] * 7, 15)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Response Time Penalty:</span>
              <span>-{metrics.avgResponseTime[selectedPeriod] > 24 ? 20 : 
                    metrics.avgResponseTime[selectedPeriod] > 12 ? 15 :
                    metrics.avgResponseTime[selectedPeriod] > 6 ? 10 :
                    metrics.avgResponseTime[selectedPeriod] > 3 ? 5 : 0}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Resolution Rate Penalty:</span>
              <span>-{metrics.resolutionRate[selectedPeriod] < 70 ? 15 :
                    metrics.resolutionRate[selectedPeriod] < 80 ? 10 :
                    metrics.resolutionRate[selectedPeriod] < 90 ? 5 : 0}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Final Score:</span>
              <span className={getScoreColor(customerExperienceScore)}>
                {customerExperienceScore}
              </span>
            </div>
          </div>
        </Card>

        {/* Action Items */}
        <Card className="p-4 mb-6">
          <h3 className="font-medium mb-3">Recommended Actions</h3>
          <div className="space-y-2 text-sm">
            {customerExperienceScore < 85 && (
              <>
                {metrics.missedPickups[selectedPeriod] > 3 && (
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Address frequent missed pickups with hauler management</span>
                  </div>
                )}
                {metrics.avgResponseTime[selectedPeriod] > 6 && (
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <span>Request improved customer service response times</span>
                  </div>
                )}
                {metrics.extraCharges[selectedPeriod] > 5 && (
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <span>Review contract terms to minimize unexpected charges</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Consider comparing quotes from alternative haulers</span>
                </div>
              </>
            )}
            {customerExperienceScore >= 85 && (
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span>Excellent service quality - consider extending contract terms</span>
              </div>
            )}
          </div>
        </Card>

        {/* Contract Management */}
        <Card className="p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <FileX className="w-5 h-5 text-red-500" />
            Contract Management
          </h3>
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Contract ends: {selectedProperty.contractEndDate}
            </div>
            
            {isContractEndingSoon() ? (
              <div className="space-y-2">
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  Contract ending soon - you can cancel without early termination fees
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => onCancelContract?.(selectedProperty, false)}
                >
                  Cancel Contract
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Early cancellation may incur termination fees
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => onCancelContract?.(selectedProperty, true)}
                >
                  Cancel Contract Early
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
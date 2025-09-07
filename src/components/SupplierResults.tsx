import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, Star, BarChart3, TrendingUp, MapPin, Building2, Zap, FileBarChart, Trash2, Recycle } from "lucide-react";
import { HeaderMenu } from "./HeaderMenu";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface HaulerResultsProps {
  priorities?: string[];
  onSelectHauler: () => void;
  onViewProfile: (haulerId: number) => void;
  onViewTerms: (haulerId: number, haulerName: string) => void;
  onBack: () => void;
  onReturnHome?: () => void;
  isRollOffFlow?: boolean;
  isFrontLoadFlow?: boolean;
  frontLoadWasteType?: 'msw' | 'recycling' | 'both' | '';
}

export function HaulerResults({ priorities, onSelectHauler, onViewProfile, onViewTerms, onBack, onReturnHome, isRollOffFlow, isFrontLoadFlow, frontLoadWasteType = '' }: HaulerResultsProps) {
  // Base suppliers for front load services (MSW or Recycling only)
  const baseSuppliers = [
    {
      id: 1,
      name: "GreenWaste Solutions",
      price: frontLoadWasteType === 'recycling' ? "$89/month" : "$145/month",
      priceValue: frontLoadWasteType === 'recycling' ? 89 : 145,
      contractLength: "12 months",
      contractMonths: 12,
      rating: 4.8,
      reviews: 127,
      additionalFees: 25,
      customerServiceScore: 4.7,
      environmentalScore: 4.9,
      responseTime: 24,
      flexibility: 4.5,
      customerExperienceScore: 87
    },
    {
      id: 2,
      name: "EcoHaul Services",
      price: frontLoadWasteType === 'recycling' ? "$95/month" : "$158/month",
      priceValue: frontLoadWasteType === 'recycling' ? 95 : 158,
      contractLength: "24 months",
      contractMonths: 24,
      rating: 4.6,
      reviews: 89,
      additionalFees: 15,
      customerServiceScore: 4.8,
      environmentalScore: 4.6,
      responseTime: 12,
      flexibility: 4.2,
      customerExperienceScore: 92
    },
    {
      id: 3,
      name: "Metro Waste Co.",
      price: frontLoadWasteType === 'recycling' ? "$102/month" : "$162/month",
      priceValue: frontLoadWasteType === 'recycling' ? 102 : 162,
      contractLength: "12 months",
      contractMonths: 12,
      rating: 4.4,
      reviews: 203,
      additionalFees: 35,
      customerServiceScore: 4.3,
      environmentalScore: 4.1,
      responseTime: 48,
      flexibility: 4.6,
      customerExperienceScore: 74
    }
  ];

  // Combined suppliers for both MSW and Recycling
  const combinedSuppliers = [
    {
      id: 1,
      name: "GreenWaste Solutions",
      price: "$229/month",
      priceValue: 229,
      mswPrice: "$145/month",
      recyclingPrice: "$89/month",
      contractLength: "12 months",
      contractMonths: 12,
      rating: 4.8,
      reviews: 127,
      additionalFees: 25,
      customerServiceScore: 4.7,
      environmentalScore: 4.9,
      responseTime: 24,
      flexibility: 4.5,
      customerExperienceScore: 87
    },
    {
      id: 2,
      name: "EcoHaul Services",
      price: "$248/month",
      priceValue: 248,
      mswPrice: "$158/month",
      recyclingPrice: "$95/month",
      contractLength: "24 months",
      contractMonths: 24,
      rating: 4.6,
      reviews: 89,
      additionalFees: 15,
      customerServiceScore: 4.8,
      environmentalScore: 4.6,
      responseTime: 12,
      flexibility: 4.2,
      customerExperienceScore: 92
    },
    {
      id: 3,
      name: "Metro Waste Co.",
      price: "$259/month",
      priceValue: 259,
      mswPrice: "$162/month",
      recyclingPrice: "$102/month",
      contractLength: "12 months",
      contractMonths: 12,
      rating: 4.4,
      reviews: 203,
      additionalFees: 35,
      customerServiceScore: 4.3,
      environmentalScore: 4.1,
      responseTime: 48,
      flexibility: 4.6,
      customerExperienceScore: 74
    }
  ];

  // Roll-off suppliers with per haul pricing
  const rollOffSuppliers = [
    {
      id: 1,
      name: "GreenWaste Solutions",
      price: "$475/haul",
      priceValue: 475,
      contractLength: "12 months",
      contractMonths: 12,
      rating: 4.8,
      reviews: 127,
      additionalFees: 25,
      customerServiceScore: 4.7,
      environmentalScore: 4.9,
      responseTime: 24,
      flexibility: 4.5,
      customerExperienceScore: 87
    },
    {
      id: 2,
      name: "EcoHaul Services",
      price: "$525/haul",
      priceValue: 525,
      contractLength: "24 months",
      contractMonths: 24,
      rating: 4.6,
      reviews: 89,
      additionalFees: 15,
      customerServiceScore: 4.8,
      environmentalScore: 4.6,
      responseTime: 12,
      flexibility: 4.2,
      customerExperienceScore: 92
    },
    {
      id: 3,
      name: "Metro Waste Co.",
      price: "$495/haul",
      priceValue: 495,
      contractLength: "12 months",
      contractMonths: 12,
      rating: 4.4,
      reviews: 203,
      additionalFees: 35,
      customerServiceScore: 4.3,
      environmentalScore: 4.1,
      responseTime: 48,
      flexibility: 4.6,
      customerExperienceScore: 74
    }
  ];

  const supplierData = isRollOffFlow ? rollOffSuppliers : (frontLoadWasteType === 'both' ? combinedSuppliers : baseSuppliers);

  const sortSuppliersByPriorities = (suppliers: typeof supplierData, priorities?: string[]) => {
    if (!priorities || priorities.length === 0) {
      return suppliers;
    }

    return [...suppliers].sort((a, b) => {
      for (const priority of priorities) {
        let comparison = 0;
        
        switch (priority) {
          case 'Lowest Price':
            comparison = a.priceValue - b.priceValue;
            break;
          case 'Best Rating':
            comparison = b.rating - a.rating;
            break;
          case 'Shortest Contract Length':
            comparison = a.contractMonths - b.contractMonths;
            break;
          case 'Lowest Additional Fees':
            comparison = a.additionalFees - b.additionalFees;
            break;
          case 'Most Flexible Terms':
            comparison = b.flexibility - a.flexibility;
            break;
          default:
            comparison = 0;
        }
        
        if (comparison !== 0) {
          return comparison;
        }
      }
      return 0;
    });
  };

  const suppliers = sortSuppliersByPriorities(supplierData, priorities);

  const getCustomerExperienceScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getCustomerExperienceScoreIcon = (score: number) => {
    if (score >= 85) return TrendingUp;
    return BarChart3;
  };

  const getTopPriorityBadge = (supplier: typeof supplierData[0], topPriority: string) => {
    // Only show badge for the top-ranked supplier in each category
    const isTopInCategory = suppliers.indexOf(supplier) === 0;
    if (!isTopInCategory) return null;

    switch (topPriority) {
      case 'Lowest Price':
        return 'Price';
      case 'Best Rating':
        return 'Rated';
      case 'Shortest Contract Length':
        return 'Contract';
      case 'Lowest Additional Fees':
        return 'Fees';
      case 'Most Flexible Terms':
        return 'Flexible';
      default:
        return null;
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
        {onReturnHome ? (
          <HeaderMenu onReturnHome={onReturnHome} />
        ) : (
          <div className="w-8"></div>
        )}
      </div>

      {/* Results */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-4">
          <h2>
            {isFrontLoadFlow 
              ? frontLoadWasteType === 'both' 
                ? 'Front Load MSW + Recycling Results' 
                : frontLoadWasteType === 'recycling'
                  ? 'Front Load Recycling Results'
                  : 'Front Load MSW Results'
              : 'Supplier Results'
            }
          </h2>
          <p className="text-muted-foreground mt-2">
            Found {suppliers.length} suppliers in your area
            {frontLoadWasteType === 'both' && ' offering both MSW and recycling services'}
          </p>
          {priorities && priorities.length > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Sorted by your priorities: {priorities.slice(0, 2).join(", ")}
              {priorities.length > 2 && `, +${priorities.length - 2} more`}
            </p>
          )}
        </div>
        
        <div className="space-y-4 mb-4">
          {suppliers.map((supplier, index) => (
            <div key={supplier.id}>
              <Card className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{supplier.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{supplier.rating}</span>
                      <span className="text-sm text-muted-foreground">({supplier.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {(() => {
                        const ScoreIcon = getCustomerExperienceScoreIcon(supplier.customerExperienceScore);
                        return (
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getCustomerExperienceScoreColor(supplier.customerExperienceScore)}`}>
                            <ScoreIcon className="w-3 h-3" />
                            <span className="font-medium">CX Score: {supplier.customerExperienceScore}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{supplier.contractLength}</Badge>
                    {priorities && priorities.length > 0 && getTopPriorityBadge(supplier, priorities[0]) && (
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        Best {getTopPriorityBadge(supplier, priorities[0])}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  {/* Pricing Section */}
                  {frontLoadWasteType === 'both' && 'mswPrice' in supplier && 'recyclingPrice' in supplier ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-green-600">{supplier.price}</span>
                        <span className="text-sm text-gray-600">Combined Total</span>
                      </div>
                      
                      {/* Service Breakdown */}
                      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-gray-700">MSW Service</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{supplier.mswPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Recycle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">Recycling Service</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{supplier.recyclingPrice}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewProfile(supplier.id)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          onClick={onSelectSupplier} 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-green-600">{supplier.price}</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewProfile(supplier.id)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          onClick={onSelectSupplier} 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onViewTerms(supplier.id, supplier.name)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      View Terms &amp; Conditions
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Market Intelligence Report - Show between first and second supplier for front load flow */}
              {isFrontLoadFlow && index === 0 && (
                <Card className="p-2 mt-4 cursor-pointer hover:shadow-md transition-shadow border-blue-200 bg-blue-50 relative">
                  {/* Top row with One-Time Fee badge */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-medium text-blue-900 mb-0.5">Market Intelligence Report</h3>
                        <p className="text-[10px] text-blue-700 leading-relaxed">Get detailed pricing & market analysis for your area</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-600 text-white text-[9px] px-1 py-0.5">
                      <Zap className="w-2 h-2 mr-0.5" />
                      One-Time Fee
                    </Badge>
                  </div>
                  
                  {/* Data sections */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <div className="bg-white/70 rounded p-1.5">
                      <div className="flex items-center gap-1 mb-0.5">
                        <MapPin className="w-2 h-2 text-blue-600" />
                        <span className="text-[9px] font-medium text-blue-900">Local Pricing</span>
                      </div>
                      <p className="text-xs font-bold text-blue-900">$145-$185/month</p>
                      <p className="text-[9px] text-blue-600">Average for your zip code</p>
                    </div>
                    <div className="bg-white/70 rounded p-1.5">
                      <div className="flex items-center gap-1 mb-0.5">
                        <FileBarChart className="w-2 h-2 text-blue-600" />
                        <span className="text-[9px] font-medium text-blue-900">Market Trends</span>
                      </div>
                      <p className="text-xs font-bold text-blue-900">+3% this quarter</p>
                      <p className="text-[9px] text-blue-600">Pricing trend analysis</p>
                    </div>
                  </div>
                  
                  {/* Complete Report section */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-medium text-blue-900">Complete Report: $5.99</p>
                      <p className="text-[9px] text-blue-600">Includes 12-month pricing history & competitor analysis</p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-1 h-5">
                      Purchase Report
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
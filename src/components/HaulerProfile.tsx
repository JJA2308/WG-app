import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, Star, MapPin, Phone, Mail, Globe, Shield, Award, Truck, Clock, DollarSign, BarChart3, TrendingUp } from "lucide-react";
import { HeaderMenu } from "./HeaderMenu";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface HaulerProfileProps {
  haulerId: number;
  onBack: () => void;
  onReturnHome?: () => void;
  onSelectHauler: () => void;
  onViewTerms: (haulerId: number, haulerName: string) => void;
}

export function HaulerProfile({ haulerId, onBack, onReturnHome, onSelectHauler, onViewTerms }: HaulerProfileProps) {
  // Extended hauler data with detailed profile information
  const haulerData = {
    1: {
      id: 1,
      name: "GreenWaste Solutions",
      price: "$145/month",
      contractLength: "12 months",
      rating: 4.8,
      reviews: 127,
      customerExperienceScore: 87,
      description: "Leading waste management company specializing in sustainable solutions for businesses of all sizes. We've been serving the community for over 15 years with reliable, eco-friendly waste collection and recycling services.",
      services: ["Front Load Dumpsters", "Roll-Off Containers", "Recycling Services", "Organic Waste Collection", "Hazardous Waste Disposal"],
      certifications: ["EPA Certified", "ISO 14001", "SWANA Member", "Local Business Certified"],
      serviceArea: "Metropolitan Area & Surrounding Counties",
      responseTime: "24 hours",
      customerServiceHours: "24/7 Emergency Service",
      contact: {
        phone: "(555) 123-4567",
        email: "info@greenwastesolutions.com",
        website: "www.greenwastesolutions.com",
        address: "1234 Industrial Blvd, Metro City, ST 12345"
      },
      highlights: [
        "Same-day emergency service available",
        "100% recyclable material processing",
        "Local family-owned business",
        "Advanced fleet tracking system"
      ],
      recentReviews: [
        {
          rating: 5,
          comment: "Excellent service! Always on time and very professional staff.",
          date: "2 weeks ago",
          reviewer: "Sarah M."
        },
        {
          rating: 5,
          comment: "Great communication and competitive pricing. Highly recommend!",
          date: "1 month ago",
          reviewer: "David L."
        },
        {
          rating: 4,
          comment: "Reliable service, though pickup times could be more flexible.",
          date: "1 month ago",
          reviewer: "Jennifer R."
        }
      ],
      fleet: {
        vehicles: 45,
        avgAge: "3.2 years",
        fuelEfficient: "85% of fleet"
      },
      sustainability: {
        recyclingRate: "78%",
        carbonNeutral: true,
        renewableEnergy: "65% solar powered"
      }
    },
    2: {
      id: 2,
      name: "EcoHaul Services",
      price: "$158/month",
      contractLength: "24 months",
      rating: 4.6,
      reviews: 89,
      customerExperienceScore: 92,
      description: "Premium waste management services with a focus on environmental responsibility and customer satisfaction. We offer comprehensive waste solutions with cutting-edge technology and exceptional service standards.",
      services: ["Front Load Services", "Commercial Recycling", "Construction Waste", "Medical Waste", "Document Destruction"],
      certifications: ["OSHA Compliant", "DOT Certified", "Green Business Certified", "BBB A+ Rating"],
      serviceArea: "Tri-State Region",
      responseTime: "12 hours",
      customerServiceHours: "Mon-Fri 6AM-8PM, Sat 8AM-4PM",
      contact: {
        phone: "(555) 987-6543",
        email: "support@ecohaulservices.com",
        website: "www.ecohaulservices.com",
        address: "5678 Commerce Way, Business Park, ST 12346"
      },
      highlights: [
        "Premium customer portal access",
        "Real-time service tracking",
        "Zero-landfill guarantee available",
        "Dedicated account management"
      ],
      recentReviews: [
        {
          rating: 5,
          comment: "Outstanding service quality and very responsive customer support.",
          date: "1 week ago",
          reviewer: "Michael B."
        },
        {
          rating: 4,
          comment: "Professional team, good value for the premium service level.",
          date: "3 weeks ago",
          reviewer: "Lisa T."
        },
        {
          rating: 5,
          comment: "The online tracking system is fantastic. Makes everything so easy!",
          date: "1 month ago",
          reviewer: "Robert K."
        }
      ],
      fleet: {
        vehicles: 32,
        avgAge: "2.8 years",
        fuelEfficient: "95% of fleet"
      },
      sustainability: {
        recyclingRate: "82%",
        carbonNeutral: true,
        renewableEnergy: "80% wind powered"
      }
    },
    3: {
      id: 3,
      name: "Metro Waste Co.",
      price: "$162/month",
      contractLength: "12 months",
      rating: 4.4,
      reviews: 203,
      customerExperienceScore: 74,
      description: "Established waste management company serving the metropolitan area for over 25 years. We provide reliable, cost-effective waste solutions with personalized service and flexible scheduling options.",
      services: ["Front Load Dumpsters", "Bulk Waste Pickup", "Yard Waste Collection", "Special Event Services", "Emergency Cleanup"],
      certifications: ["State Licensed", "Insurance Verified", "Municipal Contractor", "Veteran Owned Business"],
      serviceArea: "Metropolitan Area",
      responseTime: "48 hours",
      customerServiceHours: "Mon-Fri 7AM-6PM",
      contact: {
        phone: "(555) 456-7890",
        email: "service@metrowasteco.com",
        website: "www.metrowasteco.com",
        address: "9012 Logistics Dr, Metro City, ST 12347"
      },
      highlights: [
        "Flexible scheduling options",
        "Local community supporter",
        "Competitive pricing structure",
        "Experienced local team"
      ],
      recentReviews: [
        {
          rating: 4,
          comment: "Good reliable service at a fair price. Been using them for 2 years.",
          date: "2 weeks ago",
          reviewer: "Amanda C."
        },
        {
          rating: 4,
          comment: "Decent service, though communication could be improved.",
          date: "3 weeks ago",
          reviewer: "Tom W."
        },
        {
          rating: 5,
          comment: "Very accommodating with special requests and flexible pickup times.",
          date: "1 month ago",
          reviewer: "Nancy F."
        }
      ],
      fleet: {
        vehicles: 28,
        avgAge: "4.1 years",
        fuelEfficient: "70% of fleet"
      },
      sustainability: {
        recyclingRate: "65%",
        carbonNeutral: false,
        renewableEnergy: "30% hybrid vehicles"
      }
    }
  };

  const hauler = haulerData[haulerId as keyof typeof haulerData];

  if (!hauler) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 pt-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img src={wasteGeekLogo} alt="Waste Geek" className="h-6 w-auto" />
          {onReturnHome ? (
            <HeaderMenu onReturnHome={onReturnHome} />
          ) : (
            <div className="w-8"></div>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Hauler not found</p>
        </div>
      </div>
    );
  }

  const getCustomerExperienceScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-800 border-green-300";
    if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  const getCustomerExperienceScoreIcon = (score: number) => {
    if (score >= 85) return TrendingUp;
    return BarChart3;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <img src={wasteGeekLogo} alt="Waste Geek" className="h-6 w-auto" />
        {onReturnHome ? (
          <HeaderMenu onReturnHome={onReturnHome} />
        ) : (
          <div className="w-8"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        {/* Company Header */}
        <div className="text-center mb-6">
          <h1 className="mb-2">{hauler.name}</h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{hauler.rating}</span>
              <span className="text-sm text-muted-foreground">({hauler.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex justify-center">
            {(() => {
              const ScoreIcon = getCustomerExperienceScoreIcon(hauler.customerExperienceScore);
              return (
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border ${getCustomerExperienceScoreColor(hauler.customerExperienceScore)}`}>
                  <ScoreIcon className="w-4 h-4" />
                  <span>CX Score: {hauler.customerExperienceScore}</span>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Pricing & Contract */}
        <Card className="p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="text-2xl font-semibold text-green-600">{hauler.price}</div>
              <div className="text-sm text-muted-foreground">{hauler.contractLength} contract</div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewTerms(hauler.id, hauler.name)}
              >
                View Terms
              </Button>
              <Button 
                onClick={onSelectHauler}
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
              >
                Select
              </Button>
            </div>
          </div>
        </Card>

        {/* Company Description */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">About {hauler.name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{hauler.description}</p>
        </Card>

        {/* Key Highlights */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Key Highlights</h3>
          <div className="space-y-2">
            {hauler.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Services Offered */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Services Offered</h3>
          <div className="flex flex-wrap gap-2">
            {hauler.services.map((service, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{hauler.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{hauler.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{hauler.contact.website}</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{hauler.contact.address}</span>
            </div>
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Service Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service Area:</span>
              <span className="text-sm">{hauler.serviceArea}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Response Time:</span>
              <span className="text-sm">{hauler.responseTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Customer Service:</span>
              <span className="text-sm">{hauler.customerServiceHours}</span>
            </div>
          </div>
        </Card>

        {/* Fleet Information */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Fleet Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Vehicles:</span>
              <span className="text-sm">{hauler.fleet.vehicles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Average Fleet Age:</span>
              <span className="text-sm">{hauler.fleet.avgAge}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Fuel Efficient:</span>
              <span className="text-sm">{hauler.fleet.fuelEfficient}</span>
            </div>
          </div>
        </Card>

        {/* Sustainability */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Environmental Commitment</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Recycling Rate:</span>
              <span className="text-sm text-green-600">{hauler.sustainability.recyclingRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Carbon Neutral:</span>
              <span className={`text-sm ${hauler.sustainability.carbonNeutral ? 'text-green-600' : 'text-muted-foreground'}`}>
                {hauler.sustainability.carbonNeutral ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Renewable Energy:</span>
              <span className="text-sm">{hauler.sustainability.renewableEnergy}</span>
            </div>
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-4 mb-4">
          <h3 className="mb-3">Certifications &amp; Credentials</h3>
          <div className="flex flex-wrap gap-2">
            {hauler.certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                <Shield className="w-3 h-3" />
                {cert}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reviews */}
        <Card className="p-4 mb-6">
          <h3 className="mb-3">Recent Customer Reviews</h3>
          <div className="space-y-4">
            {hauler.recentReviews.map((review, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.reviewer} • {review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">&ldquo;{review.comment}&rdquo;</p>
                {index < hauler.recentReviews.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface AboutProps {
  onBack: () => void;
}

export function About({ onBack }: AboutProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1 mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-6 w-auto"
          />
        </div>
        <h1 className="text-lg font-medium">About</h1>
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Company Overview */}
          <Card className="p-6">
            <h2 className="mb-4">About Waste Geek</h2>
            <p className="text-muted-foreground mb-4">
              Waste Geek is a leading platform that simplifies commercial waste service management. We connect businesses with trusted waste haulers and suppliers to streamline the process of finding, comparing, and managing waste services.
            </p>
            <p className="text-muted-foreground">
              Our mission is to eliminate the fuss from waste management by providing a transparent, efficient marketplace where businesses can easily compare pricing, services, and reviews to make informed decisions.
            </p>
          </Card>

          {/* Services */}
          <Card className="p-6">
            <h3 className="mb-4">Our Services</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium">Roll-Off Services</h4>
                <p className="text-sm text-muted-foreground">
                  Temporary and permanent roll-off container solutions for construction, renovation, and large-scale cleanup projects.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Front Load Services</h4>
                <p className="text-sm text-muted-foreground">
                  Regular commercial waste pickup with front-loading containers for businesses of all sizes.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Compactor Services</h4>
                <p className="text-sm text-muted-foreground">
                  Equipment sales, leasing, and hauling services for waste compaction solutions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Junk Removal</h4>
                <p className="text-sm text-muted-foreground">
                  Professional junk removal services for offices, retail spaces, and commercial properties.
                </p>
              </div>
            </div>
          </Card>

          {/* Company Stats */}
          <Card className="p-6">
            <h3 className="mb-4">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">500+</div>
                <div className="text-sm text-muted-foreground">Trusted Suppliers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">10,000+</div>
                <div className="text-sm text-muted-foreground">Quotes Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-muted-foreground">Cities Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99%</div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
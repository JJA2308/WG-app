import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft } from "lucide-react";
import { HeaderMenu } from "./HeaderMenu";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface SiteDetailsProps {
  onFindMatches: (formData: any) => void;
  onBack: () => void;
  onReturnHome?: () => void;
}

export function SiteDetails({ onFindMatches, onBack, onReturnHome }: SiteDetailsProps) {
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [siteAccess, setSiteAccess] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");

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

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Site Details</h2>
          <p className="text-muted-foreground mt-2">
            Please provide information about your site to help us find the best compactor solution for your needs.
          </p>
        </div>

        <div className="space-y-6">
          {/* Business Information */}
          <Card className="p-4">
            <h3 className="mb-4">Business Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter your business name"
                />
              </div>
              <div>
                <Label htmlFor="address">Site Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter the site address where equipment will be installed"
                />
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-4">
            <h3 className="mb-4">Primary Contact</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Primary contact person"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>
            </div>
          </Card>

          {/* Site Access & Requirements */}
          <Card className="p-4">
            <h3 className="mb-4">Site Access &amp; Requirements</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteAccess">Site Access Information</Label>
                <Textarea
                  id="siteAccess"
                  value={siteAccess}
                  onChange={(e) => setSiteAccess(e.target.value)}
                  placeholder="Describe site access (e.g., loading dock, ground level, restricted hours, gate codes, etc.)"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="Any special requirements, safety considerations, or installation notes"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Important Notes */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h3 className="mb-3 text-blue-800">Important Notes</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• Site visits may be required for equipment installation</p>
              <p>• Access requirements help ensure proper equipment placement</p>
              <p>• Special requirements should include any safety or operational considerations</p>
              <p>• Our team will contact you to coordinate installation details</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-4">
        <Button 
          onClick={() => {
            const formData = {
              businessName,
              address,
              contactName,
              phoneNumber,
              email,
              siteAccess,
              specialRequirements
            };
            onFindMatches(formData);
          }}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          Find Compactor Solutions
        </Button>
      </div>
    </div>
  );
}
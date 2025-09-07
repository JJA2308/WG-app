import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';
import { HeaderMenu } from "./HeaderMenu";

interface CreateAccountProps {
  onNext: (userType: string, formData: any) => void;
  onBack: () => void;
  onReturnHome: () => void;
}

export function CreateAccount({ onNext, onBack, onReturnHome }: CreateAccountProps) {
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [industry, setIndustry] = useState("");

  const handleNext = () => {
    const userType = selectedUserType || "waste-customers";
    const formData = {
      fullName,
      email,
      phone,
      businessName,
      businessAddress,
      industry
    };
    onNext(userType, formData);
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
          className="h-8 w-auto"
        />
        <HeaderMenu onReturnHome={onReturnHome} />
      </div>

      {/* Form */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2>Create Account</h2>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userType">Account Type</Label>
            <Select value={selectedUserType} onValueChange={setSelectedUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waste-customers">Waste Customers</SelectItem>
                <SelectItem value="hauler">Hauler</SelectItem>
                <SelectItem value="broker">Broker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="Enter your full name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input 
              id="businessName" 
              placeholder="Enter your business name" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input 
              id="businessAddress" 
              placeholder="Enter your business address" 
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="construction">Construction</SelectItem>
                <SelectItem value="property-management">Property Management</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Button positioned close to form */}
          <div className="pt-6 pb-6">
            <Button onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
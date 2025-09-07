import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, MapPin, User, Calendar as CalendarIcon, Truck, Info, Trash2, Recycle } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';
import { ContainerInfoDialog } from "./ContainerInfoDialog";

interface ServiceDetailsProps {
  onFindMatches: (formData: any) => void;
  onBack: () => void;
  isCompactorFlow?: boolean;
  isJunkRemovalFlow?: boolean;
  isRollOffFlow?: boolean;
  frontLoadWasteType?: 'msw' | 'recycling' | 'both' | '';
}

export function ServiceDetails({ onFindMatches, onBack, isCompactorFlow = false, isJunkRemovalFlow = false, isRollOffFlow = false, frontLoadWasteType = '' }: ServiceDetailsProps) {
  const [compactorDetails, setCompactorDetails] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    contactName: '',
    contactTitle: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [junkRemovalDetails, setJunkRemovalDetails] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    haulDate: '',
    contactName: '',
    contactTitle: '',
    contactPhone: '',
    contactEmail: ''
  });

  const [selectedWeek, setSelectedWeek] = useState<Date | undefined>(undefined);
  
  // State for both MSW and Recycling configurations
  const [mswConfig, setMswConfig] = useState({
    containerSize: '',
    frequency: '',
    containerCount: '1',
    includeSaturday: false,
    includeSunday: false
  });
  
  const [recyclingConfig, setRecyclingConfig] = useState({
    containerSize: '',
    frequency: '',
    containerCount: '1',
    includeSaturday: false,
    includeSunday: false
  });
  
  const [singleServiceConfig, setSingleServiceConfig] = useState({
    zipCode: '',
    containerSize: '',
    frequency: '',
    containerCount: '1',
    includeSaturday: false,
    includeSunday: false
  });

  const handleCompactorSubmit = () => {
    const formData = {
      streetAddress: compactorDetails.streetAddress,
      city: compactorDetails.city,
      state: compactorDetails.state,
      zipCode: compactorDetails.zipCode,
      contactName: compactorDetails.contactName,
      contactPhone: compactorDetails.contactPhone,
      contactEmail: compactorDetails.contactEmail
    };
    onFindMatches(formData);
  };

  const handleJunkRemovalSubmit = () => {
    const formData = {
      streetAddress: junkRemovalDetails.streetAddress,
      city: junkRemovalDetails.city,
      state: junkRemovalDetails.state,
      zipCode: junkRemovalDetails.zipCode,
      contactName: junkRemovalDetails.contactName,
      contactPhone: junkRemovalDetails.contactPhone,
      contactEmail: junkRemovalDetails.contactEmail,
      haulDate: junkRemovalDetails.haulDate
    };
    onFindMatches(formData);
  };

  const handleFrontLoadBothSubmit = () => {
    const formData = {
      zipCode: singleServiceConfig.zipCode,
      mswConfig,
      recyclingConfig
    };
    onFindMatches(formData);
  };

  const handleFrontLoadSingleSubmit = () => {
    const formData = {
      zipCode: singleServiceConfig.zipCode,
      containerSize: singleServiceConfig.containerSize,
      frequency: singleServiceConfig.frequency,
      containerCount: singleServiceConfig.containerCount,
      includeSaturday: singleServiceConfig.includeSaturday,
      includeSunday: singleServiceConfig.includeSunday
    };
    onFindMatches(formData);
  };

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  if (isJunkRemovalFlow) {
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
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>

        {/* Form */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h2>Service Details</h2>
              <p className="text-muted-foreground mt-2">
                Please provide your service location and contact details for junk removal.
              </p>
            </div>

            {/* Site Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Site Address
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Where will the junk removal service take place?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="junkStreetAddress">Street Address</Label>
                  <Input 
                    id="junkStreetAddress" 
                    placeholder="123 Main Street"
                    value={junkRemovalDetails.streetAddress}
                    onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, streetAddress: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="junkCity">City</Label>
                    <Input 
                      id="junkCity" 
                      placeholder="City"
                      value={junkRemovalDetails.city}
                      onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="junkState">State</Label>
                    <Input 
                      id="junkState" 
                      placeholder="State"
                      value={junkRemovalDetails.state}
                      onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, state: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="junkZipCode">Zip Code</Label>
                  <Input 
                    id="junkZipCode" 
                    placeholder="12345"
                    value={junkRemovalDetails.zipCode}
                    onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, zipCode: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Desired Haul Date */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Desired Haul Date
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  When would you like the junk removal to take place?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="haulDate">Preferred Date</Label>
                  <Input 
                    id="haulDate" 
                    type="date"
                    value={junkRemovalDetails.haulDate}
                    onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, haulDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    We'll do our best to accommodate your preferred date. A service provider will contact you to confirm scheduling.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Onsite Point of Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Onsite Point of Contact
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Who should service providers contact for questions and coordination?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="junkContactName">Contact Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="junkContactName" 
                      placeholder="John Smith"
                      value={junkRemovalDetails.contactName}
                      onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, contactName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="junkContactTitle">Title <span className="text-gray-400">(optional)</span></Label>
                    <Input 
                      id="junkContactTitle" 
                      placeholder="Property Manager"
                      value={junkRemovalDetails.contactTitle}
                      onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, contactTitle: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="junkContactPhone">Phone Number <span className="text-red-500">*</span></Label>
                  <Input 
                    id="junkContactPhone" 
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={junkRemovalDetails.contactPhone}
                    onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, contactPhone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="junkContactEmail">Email Address <span className="text-gray-400">(optional)</span></Label>
                  <Input 
                    id="junkContactEmail" 
                    type="email"
                    placeholder="john.smith@company.com"
                    value={junkRemovalDetails.contactEmail}
                    onChange={(e) => setJunkRemovalDetails({...junkRemovalDetails, contactEmail: e.target.value})}
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-800">
                    <strong>Note:</strong> Someone should be available onsite during the scheduled removal time to provide access and answer any questions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="pt-4 pb-6">
              <Button 
                onClick={handleJunkRemovalSubmit} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Get Junk Removal Quotes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCompactorFlow) {
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
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>

        {/* Form */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h2>Service Details</h2>
              <p className="text-muted-foreground mt-2">
                Please provide your site details and contact information for our compactor expert visit.
              </p>
            </div>

            {/* Site Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Site Address
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Where will the compactor service be located?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input 
                    id="streetAddress" 
                    placeholder="123 Main Street"
                    value={compactorDetails.streetAddress}
                    onChange={(e) => setCompactorDetails({...compactorDetails, streetAddress: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="City"
                      value={compactorDetails.city}
                      onChange={(e) => setCompactorDetails({...compactorDetails, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      placeholder="State"
                      value={compactorDetails.state}
                      onChange={(e) => setCompactorDetails({...compactorDetails, state: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input 
                    id="zipCode" 
                    placeholder="12345"
                    value={compactorDetails.zipCode}
                    onChange={(e) => setCompactorDetails({...compactorDetails, zipCode: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Onsite Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Onsite Contact
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Who should our compactor expert contact for questions?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input 
                      id="contactName" 
                      placeholder="John Smith"
                      value={compactorDetails.contactName}
                      onChange={(e) => setCompactorDetails({...compactorDetails, contactName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactTitle">Title</Label>
                    <Input 
                      id="contactTitle" 
                      placeholder="Operations Manager"
                      value={compactorDetails.contactTitle}
                      onChange={(e) => setCompactorDetails({...compactorDetails, contactTitle: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input 
                    id="contactPhone" 
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={compactorDetails.contactPhone}
                    onChange={(e) => setCompactorDetails({...compactorDetails, contactPhone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    placeholder="john.smith@company.com"
                    value={compactorDetails.contactEmail}
                    onChange={(e) => setCompactorDetails({...compactorDetails, contactEmail: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Expert Visit Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Schedule Expert Visit
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select your preferred week for our compactor expert to visit
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Preferred Week</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedWeek}
                      onSelect={setSelectedWeek}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                      showOutsideDays={false}
                    />
                  </div>
                  
                  {selectedWeek && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <strong>Selected week:</strong> {getWeekRange(selectedWeek)}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    Our compactor expert will contact you within 24 hours to confirm the specific day and time during your selected week.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="pt-4 pb-6">
              <Button 
                onClick={handleCompactorSubmit} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Send Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For Both MSW and Recycling services
  if (frontLoadWasteType === 'both') {
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
          <div className="w-8"></div>
        </div>

        {/* Form */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h2>Service Details</h2>
              <p className="text-muted-foreground mt-2">
                Configure your MSW and Recycling services separately
              </p>
            </div>
            
            {/* Zip Code */}
            <div className="space-y-2">
              <Label htmlFor="zipCode">Service Location Zip Code</Label>
              <Input 
                id="zipCode" 
                placeholder="Enter your zip code" 
                value={singleServiceConfig.zipCode}
                onChange={(e) => setSingleServiceConfig({...singleServiceConfig, zipCode: e.target.value})}
              />
            </div>

            {/* MSW Configuration */}
            <Card className="border-2 border-orange-200 bg-orange-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Trash2 className="w-5 h-5" />
                  MSW (Municipal Solid Waste) Service
                </CardTitle>
                <p className="text-sm text-orange-700">
                  Configure your general waste container and pickup schedule
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mswContainerSize">Container Size</Label>
                    <ContainerInfoDialog />
                  </div>
                  <Select value={mswConfig.containerSize} onValueChange={(value) => setMswConfig({...mswConfig, containerSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select MSW container size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2yard">2 Yard</SelectItem>
                      <SelectItem value="4yard">4 Yard</SelectItem>
                      <SelectItem value="6yard">6 Yard</SelectItem>
                      <SelectItem value="8yard">8 Yard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mswFrequency">Pickup Frequency</Label>
                  <Select value={mswConfig.frequency} onValueChange={(value) => setMswConfig({...mswConfig, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select MSW pickup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x">1x per week</SelectItem>
                      <SelectItem value="2x">2x per week</SelectItem>
                      <SelectItem value="3x">3x per week</SelectItem>
                      <SelectItem value="4x">4x per week</SelectItem>
                      <SelectItem value="5x">5x per week</SelectItem>
                      <SelectItem value="6x">6x per week</SelectItem>
                      <SelectItem value="7x">7x per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weekend Service Options */}
                <div className="space-y-3">
                  <Label>Weekend Service (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mswSaturday" 
                        checked={mswConfig.includeSaturday}
                        onCheckedChange={(checked) => setMswConfig({...mswConfig, includeSaturday: !!checked})}
                      />
                      <Label htmlFor="mswSaturday" className="text-sm">Include Saturday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mswSunday" 
                        checked={mswConfig.includeSunday}
                        onCheckedChange={(checked) => setMswConfig({...mswConfig, includeSunday: !!checked})}
                      />
                      <Label htmlFor="mswSunday" className="text-sm">Include Sunday</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mswContainerCount">Number of MSW Containers</Label>
                  <Input 
                    id="mswContainerCount" 
                    type="number" 
                    placeholder="1" 
                    min="1" 
                    value={mswConfig.containerCount}
                    onChange={(e) => setMswConfig({...mswConfig, containerCount: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recycling Configuration */}
            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Recycle className="w-5 h-5" />
                  Recycling Service
                </CardTitle>
                <p className="text-sm text-green-700">
                  Configure your recycling container and pickup schedule
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recyclingContainerSize">Container Size</Label>
                    <ContainerInfoDialog />
                  </div>
                  <Select value={recyclingConfig.containerSize} onValueChange={(value) => setRecyclingConfig({...recyclingConfig, containerSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recycling container size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2yard">2 Yard</SelectItem>
                      <SelectItem value="4yard">4 Yard</SelectItem>
                      <SelectItem value="6yard">6 Yard</SelectItem>
                      <SelectItem value="8yard">8 Yard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recyclingFrequency">Pickup Frequency</Label>
                  <Select value={recyclingConfig.frequency} onValueChange={(value) => setRecyclingConfig({...recyclingConfig, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recycling pickup frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1x">1x per week</SelectItem>
                      <SelectItem value="2x">2x per week</SelectItem>
                      <SelectItem value="3x">3x per week</SelectItem>
                      <SelectItem value="4x">4x per week</SelectItem>
                      <SelectItem value="5x">5x per week</SelectItem>
                      <SelectItem value="6x">6x per week</SelectItem>
                      <SelectItem value="7x">7x per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weekend Service Options */}
                <div className="space-y-3">
                  <Label>Weekend Service (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="recyclingSaturday" 
                        checked={recyclingConfig.includeSaturday}
                        onCheckedChange={(checked) => setRecyclingConfig({...recyclingConfig, includeSaturday: !!checked})}
                      />
                      <Label htmlFor="recyclingSaturday" className="text-sm">Include Saturday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="recyclingSunday" 
                        checked={recyclingConfig.includeSunday}
                        onCheckedChange={(checked) => setRecyclingConfig({...recyclingConfig, includeSunday: !!checked})}
                      />
                      <Label htmlFor="recyclingSunday" className="text-sm">Include Sunday</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recyclingContainerCount">Number of Recycling Containers</Label>
                  <Input 
                    id="recyclingContainerCount" 
                    type="number" 
                    placeholder="1" 
                    min="1" 
                    value={recyclingConfig.containerCount}
                    onChange={(e) => setRecyclingConfig({...recyclingConfig, containerCount: e.target.value})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Information Box */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-sm">
                <h4 className="font-medium text-blue-900 mb-2">Service Notes</h4>
                <div className="space-y-1 text-blue-700">
                  <p>• MSW and recycling services can have different pickup schedules</p>
                  <p>• Container sizes can be customized for each waste stream</p>
                  <p>• Suppliers will provide separate pricing for each service</p>
                </div>
              </div>
            </Card>

            {/* Submit Button */}
            <div className="pt-4 pb-6">
              <Button onClick={onFindMatches} className="w-full bg-green-600 hover:bg-green-700">
                Find Matches for Both Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original ServiceDetails for single waste type (MSW or Recycling) and other flows
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
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Form */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <h2>Service Details</h2>
            {frontLoadWasteType === 'msw' && (
              <p className="text-muted-foreground mt-2">
                Configure your MSW (Municipal Solid Waste) service
              </p>
            )}
            {frontLoadWasteType === 'recycling' && (
              <p className="text-muted-foreground mt-2">
                Configure your recycling service
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input 
              id="zipCode" 
              placeholder="Enter your zip code" 
              value={singleServiceConfig.zipCode}
              onChange={(e) => setSingleServiceConfig({...singleServiceConfig, zipCode: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="containerSize">Container Size</Label>
              {!isRollOffFlow && (
                <ContainerInfoDialog />
              )}
            </div>
            <Select value={singleServiceConfig.containerSize} onValueChange={(value) => setSingleServiceConfig({...singleServiceConfig, containerSize: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select container size" />
              </SelectTrigger>
              <SelectContent>
                {isRollOffFlow ? (
                  <>
                    <SelectItem value="20yard">20 Yard</SelectItem>
                    <SelectItem value="30yard">30 Yard</SelectItem>
                    <SelectItem value="40yard">40 Yard</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="2yard">2 Yard</SelectItem>
                    <SelectItem value="4yard">4 Yard</SelectItem>
                    <SelectItem value="6yard">6 Yard</SelectItem>
                    <SelectItem value="8yard">8 Yard</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            {!isRollOffFlow && (
              <p className="text-xs text-muted-foreground">
                Need help choosing? Click "View Dimensions" to see container sizes and trash bag capacity.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency of Pickup</Label>
            <Select value={singleServiceConfig.frequency} onValueChange={(value) => setSingleServiceConfig({...singleServiceConfig, frequency: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select pickup frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1x">1x per week</SelectItem>
                <SelectItem value="2x">2x per week</SelectItem>
                <SelectItem value="3x">3x per week</SelectItem>
                <SelectItem value="4x">4x per week</SelectItem>
                <SelectItem value="5x">5x per week</SelectItem>
                <SelectItem value="6x">6x per week</SelectItem>
                <SelectItem value="7x">7x per week</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Weekend Service Options */}
          <div className="space-y-3">
            <Label>Weekend Service (Optional)</Label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="singleSaturday" 
                  checked={singleServiceConfig.includeSaturday}
                  onCheckedChange={(checked) => setSingleServiceConfig({...singleServiceConfig, includeSaturday: !!checked})}
                />
                <Label htmlFor="singleSaturday" className="text-sm">Include Saturday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="singleSunday" 
                  checked={singleServiceConfig.includeSunday}
                  onCheckedChange={(checked) => setSingleServiceConfig({...singleServiceConfig, includeSunday: !!checked})}
                />
                <Label htmlFor="singleSunday" className="text-sm">Include Sunday</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="containerCount">Number of Containers</Label>
            <Input 
              id="containerCount" 
              type="number" 
              placeholder="1" 
              min="1" 
              value={singleServiceConfig.containerCount}
              onChange={(e) => setSingleServiceConfig({...singleServiceConfig, containerCount: e.target.value})}
            />
          </div>

          {/* Button positioned close to form */}
          <div className="pt-6 pb-6">
            <Button onClick={onFindMatches} className="w-full bg-green-600 hover:bg-green-700">
              Find Matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
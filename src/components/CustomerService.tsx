import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Upload, X, AlertTriangle, Truck, Settings, HelpCircle, Building } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface CustomerServiceProps {
  selectedProperty: any;
  onBack: () => void;
  onSubmit: () => void;
}

export function CustomerService({ selectedProperty, onBack, onSubmit }: CustomerServiceProps) {
  const [selectedIssue, setSelectedIssue] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [attachedImages, setAttachedImages] = useState<File[]>([]);

  const issueTypes = [
    {
      value: "trash-not-serviced",
      label: "Trash not serviced",
      icon: Truck,
      description: "Pickup was missed or incomplete"
    },
    {
      value: "property-damage",
      label: "Property damage",
      icon: AlertTriangle,
      description: "Damage caused during service"
    },
    {
      value: "change-service-level",
      label: "Change Service Level",
      icon: Settings,
      description: "Modify frequency or container size"
    },
    {
      value: "other",
      label: "Other",
      icon: HelpCircle,
      description: "Other service-related issues"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - attachedImages.length); // Limit to 3 total images
      setAttachedImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // In a real app, this would submit the service request
    console.log("Service request submitted:", {
      property: selectedProperty,
      issue: selectedIssue,
      details,
      images: attachedImages
    });
    onSubmit();
  };

  const selectedIssueData = issueTypes.find(issue => issue.value === selectedIssue);

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
          <h2>Customer Service Request</h2>
          <p className="text-muted-foreground mt-2">
            Tell us about the issue you're experiencing
          </p>
        </div>

        {/* Selected Property Info */}
        <Card className="p-4 mb-6 bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-900">{selectedProperty.name}</h3>
              <p className="text-sm text-green-700">{selectedProperty.address}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedProperty.services.map((service: string, index: number) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-200 text-green-800"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {/* Issue Type Selection */}
          <div className="space-y-3">
            <Label htmlFor="issueType">What type of issue are you experiencing?</Label>
            <Select value={selectedIssue} onValueChange={setSelectedIssue}>
              <SelectTrigger>
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((issue) => (
                  <SelectItem key={issue.value} value={issue.value}>
                    <div className="flex items-center gap-2">
                      <issue.icon className="w-4 h-4" />
                      <div>
                        <div>{issue.label}</div>
                        <div className="text-xs text-muted-foreground">{issue.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedIssueData && (
              <Card className="p-3 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-2">
                  <selectedIssueData.icon className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">{selectedIssueData.label}</p>
                    <p className="text-xs text-blue-700">{selectedIssueData.description}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Details Text Area */}
          <div className="space-y-2">
            <Label htmlFor="details">Please provide additional details</Label>
            <Textarea
              id="details"
              placeholder="Describe the issue in detail. Include dates, times, and any other relevant information..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              The more details you provide, the better we can assist you.
            </p>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label>Attach photos (optional)</Label>
            <div className="space-y-3">
              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={attachedImages.length >= 3}
                />
                <label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    attachedImages.length >= 3
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                      : 'border-green-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <Upload className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-600">
                    {attachedImages.length >= 3 ? 'Maximum 3 images' : 'Upload photos'}
                  </span>
                </label>
              </div>

              {/* Attached Images */}
              {attachedImages.length > 0 && (
                <div className="space-y-2">
                  {attachedImages.map((image, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm truncate">{image.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="p-1 h-auto"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Photos help our team understand the issue better. You can upload up to 3 images.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 pb-6">
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!selectedIssue}
          >
            Send to Hauler
          </Button>
          {!selectedIssue && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Please select an issue type to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
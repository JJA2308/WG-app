import { useState } from "react";
import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Info, Package, Ruler, Trash2, AlertCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface ContainerInfo {
  size: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  volume: string;
  trashBags: {
    small: number; // 13 gallon bags
    large: number; // 30 gallon bags
  };
  description: string;
  commonUses: string[];
  weight: string;
}

const containerData: ContainerInfo[] = [
  {
    size: "2 Yard",
    dimensions: {
      length: "6'",
      width: "4'",
      height: "3'6\"",
    },
    volume: "2 cubic yards",
    trashBags: {
      small: 32,
      large: 12,
    },
    description: "Compact container ideal for small businesses with minimal waste generation.",
    commonUses: [
      "Small retail stores",
      "Professional offices",
      "Coffee shops",
      "Beauty salons"
    ],
    weight: "~400 lbs empty"
  },
  {
    size: "4 Yard",
    dimensions: {
      length: "6'",
      width: "5'",
      height: "4'6\"",
    },
    volume: "4 cubic yards",
    trashBags: {
      small: 64,
      large: 24,
    },
    description: "Most popular size for small to medium businesses with moderate waste volume.",
    commonUses: [
      "Restaurants",
      "Medium retail stores", 
      "Medical offices",
      "Auto repair shops"
    ],
    weight: "~500 lbs empty"
  },
  {
    size: "6 Yard",
    dimensions: {
      length: "6'",
      width: "5'6\"",
      height: "5'",
    },
    volume: "6 cubic yards",
    trashBags: {
      small: 96,
      large: 36,
    },
    description: "Ideal for businesses with higher waste volume and space for larger equipment.",
    commonUses: [
      "Large restaurants",
      "Grocery stores",
      "Hotels",
      "Manufacturing facilities"
    ],
    weight: "~600 lbs empty"
  },
  {
    size: "8 Yard",
    dimensions: {
      length: "6'",
      width: "6'",
      height: "6'",
    },
    volume: "8 cubic yards",
    trashBags: {
      small: 128,
      large: 48,
    },
    description: "High-capacity container for businesses with significant daily waste generation.",
    commonUses: [
      "Large retail chains",
      "Hospitals",
      "Schools",
      "Distribution centers"
    ],
    weight: "~700 lbs empty"
  },

];

interface ContainerInfoDialogProps {
  children?: React.ReactNode;
}

const TriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
});
TriggerButton.displayName = "TriggerButton";

export function ContainerInfoDialog({}: ContainerInfoDialogProps) {
  const [selectedContainer, setSelectedContainer] = useState<ContainerInfo | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TriggerButton className="p-1 h-auto text-blue-600 hover:text-blue-700 border-0 bg-transparent flex items-center gap-1 cursor-pointer">
          <Info className="w-4 h-4" />
          <span className="text-xs ml-1">View Dimensions</span>
        </TriggerButton>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Container Specifications
          </DialogTitle>
          <DialogDescription>
            View detailed dimensions, capacity, and usage information for front load containers to help you choose the right size for your business needs.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {/* Container List */}
            <div className="space-y-3">
              {containerData.map((container) => (
                <Card 
                  key={container.size}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedContainer?.size === container.size
                      ? 'bg-blue-50 border-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedContainer(container)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${
                          selectedContainer?.size === container.size ? 'text-blue-700' : ''
                        }`}>
                          {container.size} Container
                        </h4>
                        <p className={`text-sm ${
                          selectedContainer?.size === container.size ? 'text-blue-600' : 'text-muted-foreground'
                        }`}>
                          {container.dimensions.length} × {container.dimensions.width} × {container.dimensions.height}
                        </p>
                        <p className={`text-xs mt-1 ${
                          selectedContainer?.size === container.size ? 'text-blue-500' : 'text-muted-foreground'
                        }`}>
                          ~{container.trashBags.large} standard trash bags
                        </p>
                      </div>
                      <Badge variant={selectedContainer?.size === container.size ? "default" : "secondary"}>
                        {container.volume}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Information */}
            {selectedContainer && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Info className="w-4 h-4" />
                    {selectedContainer.size} Container Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-blue-700">
                    {selectedContainer.description}
                  </p>

                  {/* Dimensions */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Dimensions</span>
                    </div>
                    <div className="pl-6 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Length:</span>
                        <span className="text-blue-800 font-medium">{selectedContainer.dimensions.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Width:</span>
                        <span className="text-blue-800 font-medium">{selectedContainer.dimensions.width}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Height:</span>
                        <span className="text-blue-800 font-medium">{selectedContainer.dimensions.height}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-700">Weight:</span>
                        <span className="text-blue-800 font-medium">{selectedContainer.weight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Standard Trash Bag Capacity - Highlighted */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Standard Trash Bag Capacity</span>
                    </div>
                    <div className="pl-6">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-blue-800">Standard Commercial Trash Bags</span>
                          <Badge className="bg-blue-600 text-white border-blue-600">
                            ~{selectedContainer.trashBags.large} bags
                          </Badge>
                        </div>
                        <p className="text-xs text-blue-600">
                          Based on standard 30-gallon commercial trash bags
                        </p>
                      </div>
                      
                      {/* Additional Size Reference */}
                      <div className="mt-3 bg-white rounded-lg p-3 border border-blue-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-blue-700">Small household bags (13 gallon):</span>
                          <Badge variant="outline" className="text-blue-800 border-blue-300">
                            ~{selectedContainer.trashBags.small} bags
                          </Badge>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">
                          For reference - smaller household bags
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Common Uses */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Common Uses</span>
                    </div>
                    <div className="pl-6">
                      <div className="grid grid-cols-1 gap-1">
                        {selectedContainer.commonUses.map((use, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-blue-700">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Important Note */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      <strong>Note:</strong> Trash bag capacity is estimated based on standard 30-gallon commercial bag sizes and may vary depending on waste density and bag shape. Actual capacity may differ based on waste type and packing efficiency.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
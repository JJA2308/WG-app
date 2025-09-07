import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { ArrowLeft, Trash2 } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface JunkRemovalMaterialsProps {
  onContinue: (materials: string[]) => void;
  onBack: () => void;
}

export function JunkRemovalMaterials({ onContinue, onBack }: JunkRemovalMaterialsProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const itemsByCategory = [
    {
      title: "Furniture & Household Items",
      items: [
        { id: "sofas-chairs", label: "Sofas & Chairs" },
        { id: "tables-desks", label: "Tables & Desks" },
        { id: "mattresses-box-springs", label: "Mattresses & Box Springs" },
        { id: "dressers-wardrobes", label: "Dressers & Wardrobes" },
        { id: "kitchen-appliances", label: "Kitchen Appliances" },
        { id: "home-decor", label: "Home Décor Items" },
        { id: "lamps-lighting", label: "Lamps & Lighting" },
        { id: "mirrors", label: "Mirrors" },
        { id: "rugs-carpets", label: "Rugs & Carpets" }
      ]
    },
    {
      title: "Electronics & Appliances",
      items: [
        { id: "televisions", label: "Televisions" },
        { id: "computers-monitors", label: "Computers & Monitors" },
        { id: "washing-machines", label: "Washing Machines" },
        { id: "dryers", label: "Dryers" },
        { id: "refrigerators", label: "Refrigerators" },
        { id: "dishwashers", label: "Dishwashers" },
        { id: "microwaves", label: "Microwaves" },
        { id: "small-electronics", label: "Small Electronics" },
        { id: "audio-equipment", label: "Audio Equipment" }
      ]
    },
    {
      title: "Construction & Renovation",
      items: [
        { id: "drywall-lumber", label: "Drywall & Lumber" },
        { id: "flooring-materials", label: "Flooring Materials" },
        { id: "bathroom-fixtures", label: "Bathroom Fixtures" },
        { id: "kitchen-cabinets", label: "Kitchen Cabinets" },
        { id: "windows-doors", label: "Windows & Doors" },
        { id: "renovation-debris", label: "General Renovation Debris" },
        { id: "tiles-countertops", label: "Tiles & Countertops" },
        { id: "plumbing-fixtures", label: "Plumbing Fixtures" }
      ]
    },
    {
      title: "Yard Waste & Outdoor Items",
      items: [
        { id: "tree-branches", label: "Tree Branches & Logs" },
        { id: "lawn-mowers", label: "Lawn Mowers" },
        { id: "outdoor-furniture", label: "Outdoor Furniture" },
        { id: "sheds-gazebos", label: "Sheds & Gazebos" },
        { id: "pool-equipment", label: "Pool Equipment" },
        { id: "garden-waste", label: "Garden Waste" },
        { id: "grills-bbq", label: "Grills & BBQ Equipment" },
        { id: "playground-equipment", label: "Playground Equipment" }
      ]
    },
    {
      title: "Office & Commercial Items",
      items: [
        { id: "office-desks-chairs", label: "Office Desks & Chairs" },
        { id: "filing-cabinets", label: "Filing Cabinets" },
        { id: "copy-machines", label: "Copy Machines" },
        { id: "commercial-equipment", label: "Commercial Equipment" },
        { id: "retail-fixtures", label: "Retail Fixtures" },
        { id: "warehouse-materials", label: "Warehouse Materials" },
        { id: "conference-tables", label: "Conference Tables" },
        { id: "office-electronics", label: "Office Electronics" }
      ]
    },
    {
      title: "Other Acceptable Items",
      items: [
        { id: "hot-tubs-spas", label: "Hot Tubs & Spas" },
        { id: "exercise-equipment", label: "Exercise Equipment" },
        { id: "musical-instruments", label: "Musical Instruments" },
        { id: "toys-games", label: "Toys & Games" },
        { id: "books-documents", label: "Books & Documents" },
        { id: "household-clutter", label: "General Household Clutter" },
        { id: "artwork-frames", label: "Artwork & Frames" },
        { id: "sporting-goods", label: "Sporting Goods" }
      ]
    }
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleContinue = () => {
    onContinue(selectedItems);
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
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-green-600" />
            </div>
            <h2>What Items Need Removal?</h2>
            <h3 className="mb-2">Select Items for Removal</h3>
            <p className="text-muted-foreground">
              Check all items you need removed. You can select multiple items from different categories.
            </p>
          </div>

          {/* Items List by Category */}
          <div className="space-y-6">
            {itemsByCategory.map((category) => (
              <div key={category.title} className="space-y-3">
                <h4 className="border-b border-gray-200 pb-2 text-green-700">
                  {category.title}
                </h4>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={item.id}
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <Label 
                        htmlFor={item.id} 
                        className="flex-1 cursor-pointer hover:text-green-700 transition-colors"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          {selectedItems.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-green-900 mb-2">
                Selected Items ({selectedItems.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedItems.map(itemId => {
                  // Find the item label
                  const item = itemsByCategory
                    .flatMap(cat => cat.items)
                    .find(item => item.id === itemId);
                  return (
                    <span key={itemId} className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                      {item?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue with Selected Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
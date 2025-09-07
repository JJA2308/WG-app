import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Truck, CheckCircle } from "lucide-react";

interface CompactorOnsiteTrailerProps {
  onContinue: (needsTrailer: 'need' | 'have') => void;
  onBack: () => void;
}

export function CompactorOnsiteTrailer({ onContinue, onBack }: CompactorOnsiteTrailerProps) {
  const [selectedOption, setSelectedOption] = useState<'need' | 'have' | ''>('');

  const handleContinue = () => {
    if (selectedOption) {
      onContinue(selectedOption);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Onsite Trailer</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="mb-2">Onsite Trailer Status</h3>
            <p className="text-muted-foreground">
              For your vertical baler, do you need an onsite trailer for waste collection?
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedOption === 'need' 
                  ? 'ring-2 ring-green-500 bg-green-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedOption('need')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-left">Yes, I need an onsite trailer</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        We'll arrange for a trailer to be delivered to your site
                      </div>
                    </div>
                  </div>
                  {selectedOption === 'need' && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedOption === 'have' 
                  ? 'ring-2 ring-green-500 bg-green-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedOption('have')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-left">No, I already have a trailer</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        I have my own onsite trailer for waste collection
                      </div>
                    </div>
                  </div>
                  {selectedOption === 'have' && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Information Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-blue-900 mb-2">About Onsite Trailers</h4>
            <p className="text-sm text-blue-800">
              Onsite trailers are used to collect the baled waste from your vertical baler. 
              The trailer stays at your location and is swapped out when full, ensuring 
              continuous operation of your waste management system.
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-4 pb-6">
            <Button 
              onClick={handleContinue} 
              disabled={!selectedOption}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
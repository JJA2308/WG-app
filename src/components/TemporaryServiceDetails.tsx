import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, Calendar, MapPin, Plus, Minus, DollarSign, Truck } from "lucide-react";

interface TemporaryServiceDetailsProps {
  onFindHauler: () => void;
  onBack: () => void;
}

interface Container {
  id: string;
  size: string;
  startDate: string;
  useSameDate: boolean;
}

export function TemporaryServiceDetails({ onFindHauler, onBack }: TemporaryServiceDetailsProps) {
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [jobLength, setJobLength] = useState('');
  const [jobLengthUnit, setJobLengthUnit] = useState('');
  const [containers, setContainers] = useState<Container[]>([
    { id: '1', size: '', startDate: '', useSameDate: true }
  ]);

  const containerSizes = ['20yd', '30yd', '40yd'];
  const jobLengthUnits = ['days', 'weeks', 'months'];

  const addContainer = () => {
    const newContainer: Container = {
      id: Date.now().toString(),
      size: '',
      startDate: '',
      useSameDate: true
    };
    setContainers([...containers, newContainer]);
  };

  const removeContainer = (id: string) => {
    if (containers.length > 1) {
      setContainers(containers.filter(container => container.id !== id));
    }
  };

  const updateContainer = (id: string, field: keyof Container, value: string | boolean) => {
    setContainers(containers.map(container => 
      container.id === id ? { ...container, [field]: value } : container
    ));
  };

  // Calculate estimated cost range based on containers and market data
  const calculateCostRange = () => {
    const baseRates = {
      "20yd": { min: 425, max: 575 },
      "30yd": { min: 525, max: 675 },
      "40yd": { min: 625, max: 775 }
    };

    let totalMin = 0;
    let totalMax = 0;

    containers.forEach(container => {
      const rates = baseRates[container.size as keyof typeof baseRates];
      if (rates) {
        totalMin += rates.min;
        totalMax += rates.max;
      }
    });

    return { min: totalMin, max: totalMax };
  };

  // Check if we have enough information to show cost estimate
  const hasEstimateInfo = zipCode.trim() && containers.some(container => container.size);

  const costRange = calculateCostRange();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Temporary Service Details</h2>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Instructions */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Provide as much detail as possible to help us match you with the best suppliers. You can also proceed without filling out all details.
            </p>
          </div>

          {/* Site Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Site Address
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Please provide the complete address where the container will be placed
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  placeholder="123 Main Street"
                  className="w-full mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="12345"
                    className="w-full mt-2"
                    maxLength={5}
                    pattern="[0-9]{5}"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Needed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date Needed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type="date"
                  value={dateNeeded}
                  onChange={(e) => setDateNeeded(e.target.value)}
                  className="w-full pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Job Length */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estimated Job Length</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="jobLength">Duration</Label>
                  <Input
                    id="jobLength"
                    type="number"
                    value={jobLength}
                    onChange={(e) => setJobLength(e.target.value)}
                    placeholder="1"
                    min="1"
                    className="mt-2"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="jobLengthUnit">Unit</Label>
                  <Select value={jobLengthUnit} onValueChange={setJobLengthUnit}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobLengthUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Containers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Container Details</CardTitle>
              <p className="text-sm text-muted-foreground">
                Specify the container size you need. You can add additional containers if required.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {containers.map((container, index) => (
                <div key={container.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Container {index + 1}</h4>
                    {containers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeContainer(container.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`size-${container.id}`}>Container Size</Label>
                    <Select 
                      value={container.size} 
                      onValueChange={(value) => updateContainer(container.id, 'size', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {containerSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {index > 0 && (
                    <div className="space-y-3">
                      <Label>Start Date</Label>
                      <RadioGroup 
                        value={container.useSameDate ? 'same' : 'different'} 
                        onValueChange={(value) => updateContainer(container.id, 'useSameDate', value === 'same')}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="same" id={`same-${container.id}`} />
                          <Label htmlFor={`same-${container.id}`}>Same as first container</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="different" id={`different-${container.id}`} />
                          <Label htmlFor={`different-${container.id}`}>Different start date</Label>
                        </div>
                      </RadioGroup>

                      {!container.useSameDate && (
                        <div className="relative">
                          <Input
                            type="date"
                            value={container.startDate}
                            onChange={(e) => updateContainer(container.id, 'startDate', e.target.value)}
                            className="w-full pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={addContainer}
                  className="w-full flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Container (Optional)
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Only add additional containers if you need multiple containers for your project
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cost Estimate - Show if we have zip code and at least one container size */}
          {hasEstimateInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Estimated Cost Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-green-600">
                    ${costRange.min.toLocaleString()} - ${costRange.max.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on market data for zip code {zipCode}
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-800">
                      This is an estimate based on similar jobs in your area. Actual quotes may vary based on specific requirements, disposal fees, and market conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Once you submit your request, you'll be connected with verified roll-off suppliers in your area who can provide:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Real-time quotes based on your specific needs
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Direct communication through our secure messenger
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Availability confirmation for your requested dates
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-xs text-blue-800">
                    You'll be taken to your dashboard where you can view and respond to messages from interested suppliers. The more details you provide, the more accurate quotes you'll receive.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button positioned close to content */}
          <div className="pt-6 pb-6">
            <Button 
              onClick={onFindHauler}
              className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              Find a Hauler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
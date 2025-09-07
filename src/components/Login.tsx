import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';
import monsterCharacterImage from 'figma:asset/f6f068fdaea4211de6f896fc896645f249913f14.png';
import { HeaderMenu } from "./HeaderMenu";

interface LoginProps {
  onBack: () => void;
  onLogin: (userType: string) => void;
  preSelectedUserType?: string;
  onReturnHome: () => void;
}

export function Login({ onBack, onLogin, preSelectedUserType, onReturnHome }: LoginProps) {
  const [selectedUserType, setSelectedUserType] = useState<string>(preSelectedUserType || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // In a real app, you would validate credentials here
    // Default to waste-customers if no user type is selected
    const userType = selectedUserType || "waste-customers";
    onLogin(userType);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getUserTypeDisplayName = (userType: string) => {
    switch (userType) {
      case 'waste-customers': return 'Waste Customers';
      case 'hauler': return 'Hauler';
      case 'broker': return 'Broker';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with Back Button and Menu */}
      <div className="flex justify-between items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <HeaderMenu onReturnHome={onReturnHome} />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 flex flex-col overflow-y-auto">
        {/* Waste Geek Logo Section */}
        <div className="flex justify-center pt-1 pb-2">
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-16 w-auto max-w-full object-contain"
          />
        </div>

        {/* Character Image Section */}
        <div className="flex justify-center pb-3">
          <div className="bg-white rounded-lg">
            <img 
              src={monsterCharacterImage} 
              alt="Angry teal furry monster with yellow hard hat and orange safety vest" 
              className="h-48 w-auto max-w-full object-contain bg-white"
            />
          </div>
        </div>

        {/* Login Form */}
        <div className="flex-1 flex flex-col">
          <div className="space-y-4 max-w-sm mx-auto w-full">
            <div className="text-center mb-4">
              <h2>Welcome Back</h2>
              <p className="text-muted-foreground mt-1">
                Sign in to your account to continue
              </p>
            </div>
            
            {/* Account Type Selection */}
            <div className="space-y-1">
              <Label htmlFor="account-type">Account Type</Label>
              <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                <SelectTrigger>
                  <SelectValue placeholder={
                    preSelectedUserType 
                      ? getUserTypeDisplayName(preSelectedUserType)
                      : "Select account type"
                  } />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="waste-customers">Waste Customers</SelectItem>
                  <SelectItem value="hauler">Hauler</SelectItem>
                  <SelectItem value="broker">Broker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button className="text-sm text-green-600 hover:text-green-700 underline">
                Forgot your password?
              </button>
            </div>

            {/* Login Button */}
            <Button 
              onClick={handleLogin} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Sign In
            </Button>

            {/* Create Account Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button 
                  onClick={onBack}
                  className="text-green-600 hover:text-green-700 underline"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
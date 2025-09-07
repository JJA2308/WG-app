import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Home, CreditCard, Settings, HelpCircle, FileText, Users, DollarSign, MessageSquare, Plus, ArrowLeft, Menu, Headphones, BarChart3, Lock, Star, Receipt } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface CustomerDashboardProps {
  onHome: () => void;
  onContinueToQuote?: () => void;
  awaitingRollOffResponses?: boolean;
  awaitingJunkRemovalResponses?: boolean;
  awaitingCompactorResponses?: boolean;
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export function CustomerDashboard({ 
  onHome, 
  onContinueToQuote,
  awaitingRollOffResponses = false, 
  awaitingJunkRemovalResponses = false,
  awaitingCompactorResponses = false,
  onBack,
  onNavigate
}: CustomerDashboardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dashboardCards = [
    {
      title: "Quotes",
      description: "3 active quotes",
      icon: FileText,
      badge: "3"
    },
    {
      title: "Active Contracts",
      description: "1 active service",
      icon: Users,
      badge: "1"
    },
    {
      title: "Invoices",
      description: "2 pending payments",
      icon: DollarSign,
      badge: "2"
    },
    {
      title: "Messages",
      description: awaitingJunkRemovalResponses || awaitingRollOffResponses || awaitingCompactorResponses ? "Awaiting responses" : "1 new message",
      icon: MessageSquare,
      badge: awaitingJunkRemovalResponses || awaitingRollOffResponses || awaitingCompactorResponses ? "!" : "1"
    },
    {
      title: "Customer Service",
      description: "Get help with your service",
      icon: Headphones,
      badge: null
    },
    {
      title: "Review Account",
      description: "View performance metrics",
      icon: BarChart3,
      badge: null
    }
  ];

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuItemClick = (page: string) => {
    setShowDropdown(false);
    if (onNavigate) {
      onNavigate(page);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="relative flex items-center justify-between p-4 pt-6">
        {/* Left side - Back button */}
        <div className="flex items-center gap-2">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
        </div>
        
        {/* Center - Waste Geek Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-8 w-auto"
          />
        </div>
        
        {/* Right side - Home and Menu buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onHome}>
            Home
          </Button>
          
          <div className="relative" ref={dropdownRef}>
            <Button variant="outline" size="sm" onClick={handleDropdownClick}>
              <Menu className="w-4 h-4" />
            </Button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  <button
                    onClick={() => handleMenuItemClick("about")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    About
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("faq")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("contact")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("dashboard")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md bg-gray-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("get-quote")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    Get a Quote
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("payment-options")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    Payment Options
                  </button>
                  <button
                    onClick={() => handleMenuItemClick("manage-account")}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                  >
                    Manage Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <h2>Welcome to your Customer Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Manage your waste services and get new quotes
          </p>
        </div>

        {/* Continue to Quote Button - Prominent placement */}
        {onContinueToQuote && (
          <div className="mb-6 mx-8">
            <Button 
              onClick={onContinueToQuote}
              className="w-full bg-green-600 hover:bg-green-700 py-5 px-6 text-lg scale-130"
              size="lg"
            >
              <Plus className="w-6 h-6 mr-3" />
              Continue to Quote
            </Button>
          </div>
        )}

        {/* Awaiting Responses Banner */}
        {(awaitingRollOffResponses || awaitingJunkRemovalResponses || awaitingCompactorResponses) && (
          <Card className="p-4 mb-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">Awaiting Supplier Responses</h3>
                <p className="text-sm text-blue-700">
                  {awaitingJunkRemovalResponses 
                    ? "Your junk removal service request has been shared with available haulers in your area. You'll receive messages from interested suppliers through our platform messaging system."
                    : awaitingCompactorResponses
                    ? "Your compactor service request has been shared with qualified providers in your area. You'll receive messages from interested suppliers through our platform messaging system."
                    : "Your temporary roll-off service request has been shared with available suppliers in your area. You'll receive chat responses shortly."
                  }
                </p>
              </div>
            </div>
          </Card>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {dashboardCards.map((item, index) => (
            <Card 
              key={index} 
              className="p-4 relative cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (item.title === "Quotes" && onNavigate) {
                  onNavigate("quotes");
                } else if (item.title === "Customer Service" && onNavigate) {
                  onNavigate("customer-service");
                } else if (item.title === "Review Account" && onNavigate) {
                  onNavigate("review-account");
                } else if (item.title === "Active Contracts" && onNavigate) {
                  onNavigate("active-contracts");
                } else if (item.title === "Messages" && onNavigate) {
                  onNavigate("messages");
                } else if (item.title === "Invoices" && onNavigate) {
                  onNavigate("invoices");
                }
              }}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-2">
                  <item.icon className="w-5 h-5 text-green-600" />
                  {item.badge && (
                    <Badge 
                      variant={item.badge === "!" ? "destructive" : "secondary"} 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Premium Features */}
        <div className="space-y-3 mb-6">
          {/* Pay Invoices - Premium Feature */}
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-blue-200 bg-blue-50 relative">
            {/* Top row with Enable button and Premium badge */}
            <div className="flex items-start justify-between mb-3">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1">
                <Lock className="w-3 h-3 mr-1" />
                Enable
              </Button>
              <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0.5">
                <Star className="w-2.5 h-2.5 mr-1" />
                Premium
              </Badge>
            </div>
            
            {/* Main content */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Receipt className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Pay Invoices</h3>
                <p className="text-xs text-blue-700 leading-relaxed">Process payments right here via Waste Geek. Approve and review invoices, setup Auto-Pay, and manage Multi-Locations.</p>
              </div>
            </div>
            

            

          </Card>


        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="font-medium">Recent Activity</h3>
          {awaitingJunkRemovalResponses ? (
            <Card className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Junk removal request shared</p>
                  <p className="text-xs text-muted-foreground">Haulers in your area will respond via messaging</p>
                </div>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
            </Card>
          ) : awaitingCompactorResponses ? (
            <Card className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Compactor service request shared</p>
                  <p className="text-xs text-muted-foreground">Providers in your area will respond via messaging</p>
                </div>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
            </Card>
          ) : awaitingRollOffResponses ? (
            <Card className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Temporary service request shared</p>
                  <p className="text-xs text-muted-foreground">Roll-off suppliers in your area</p>
                </div>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
            </Card>
          ) : (
            <>
              <Card className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Quote received</p>
                    <p className="text-xs text-muted-foreground">GreenWaste Solutions</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
              </Card>
              <Card className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium">Service completed</p>
                    <p className="text-xs text-muted-foreground">Weekly pickup</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1d ago</span>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-white p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-green-600">
            <Home className="w-4 h-4" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs">Billing</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1" onClick={() => onNavigate && onNavigate("settings")}>
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1" onClick={() => onNavigate && onNavigate("support")}>
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs">Support</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
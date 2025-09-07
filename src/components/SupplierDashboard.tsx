import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Home, MessageSquare, FileText, Users, DollarSign, Package, ArrowLeft, Menu, Settings, HelpCircle, CreditCard, User, BarChart3, TrendingUp, Lock, Star, Truck, Calendar } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface HaulerDashboardProps {
  onHome: () => void;
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export function HaulerDashboard({ 
  onHome, 
  onBack,
  onNavigate
}: HaulerDashboardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dashboardCards = [
    {
      title: "Messages",
      description: "5 new customer messages",
      icon: MessageSquare,
      badge: "5"
    },
    {
      title: "Pending Proposals",
      description: "8 awaiting response",
      icon: FileText,
      badge: "8"
    },
    {
      title: "Quote Requests",
      description: "12 new requests",
      icon: Users,
      badge: "12"
    },
    {
      title: "Recent Sales",
      description: "$15,240 this month",
      icon: DollarSign,
      badge: "3"
    },
    {
      title: "Current Offerings",
      description: "6 active services",
      icon: Package,
      badge: "6"
    },
    {
      title: "Current Terms and Conditions",
      description: "Last updated 30 days ago",
      icon: FileText,
      badge: null,
      isSecondary: true
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
            className="h-8 w-auto max-w-full object-contain"
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
          <h2>Hauler Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Manage your quotes, customers, and business operations
          </p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {dashboardCards.map((item, index) => (
            <Card 
              key={index} 
              className={`p-4 relative cursor-pointer hover:shadow-md transition-shadow ${
                item.isSecondary ? 'bg-gray-50' : ''
              }`}
              onClick={() => {
                if (item.title === "Messages" && onNavigate) {
                  onNavigate("messages");
                } else if (item.title === "Recent Sales" && onNavigate) {
                  onNavigate("invoices");
                }
              }}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-2">
                  <item.icon className={`w-5 h-5 ${item.isSecondary ? 'text-gray-600' : 'text-green-600'}`} />
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {item.isSecondary && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      View
                    </Button>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Premium Features */}
        <div className="space-y-2 mb-6">
          {/* Haul Now - Premium Feature */}
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-orange-200 bg-orange-50 relative">
            {/* Top row with Enable button and Premium badge */}
            <div className="flex items-start justify-between mb-3">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1">
                <Lock className="w-3 h-3 mr-1" />
                Enable
              </Button>
              <Badge className="bg-orange-600 text-white text-xs px-1.5 py-0.5">
                <Star className="w-2.5 h-2.5 mr-1" />
                Premium
              </Badge>
            </div>
            
            {/* Main content */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-orange-900 mb-1">Haul Now</h3>
                <p className="text-xs text-orange-700 leading-relaxed">Advanced scheduling tool for efficient haul management and route optimization.</p>
              </div>
            </div>
            
            {/* Feature List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-orange-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-orange-600" />
                <span>Roll-off scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3 h-3 text-orange-600" />
                <span>Final hauls</span>
              </div>
            </div>
          </Card>

          {/* Data Analytics - Premium Feature */}
          <Card className="p-2 cursor-pointer hover:shadow-md transition-shadow border-blue-200 bg-blue-50 relative">
            <div className="absolute top-1 right-1">
              <Badge className="bg-blue-600 text-white text-[10px] px-1 py-0.5">
                <Star className="w-2 h-2 mr-0.5" />
                Premium
              </Badge>
            </div>
            
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-2.5 h-2.5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-medium text-blue-900">Data Analytics</h3>
                <p className="text-[10px] text-blue-700">Business insights & reporting</p>
              </div>
            </div>
            
            {/* Sample Analytics Data */}
            <div className="grid grid-cols-2 gap-1 mb-2">
              <div className="bg-white/70 rounded p-1">
                <div className="flex items-center gap-0.5 mb-0.5">
                  <TrendingUp className="w-2 h-2 text-blue-600" />
                  <span className="text-[10px] font-medium text-blue-900">Revenue</span>
                </div>
                <p className="text-xs font-bold text-blue-900">+24.5%</p>
              </div>
              <div className="bg-white/70 rounded p-1">
                <div className="flex items-center gap-0.5 mb-0.5">
                  <Users className="w-2 h-2 text-blue-600" />
                  <span className="text-[10px] font-medium text-blue-900">Win Rate</span>
                </div>
                <p className="text-xs font-bold text-blue-900">68%</p>
              </div>
            </div>
            
            {/* Feature List - Compact Grid */}
            <div className="mb-2">
              <div className="grid grid-cols-2 gap-0.5 text-[10px] text-blue-700">
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                  <span>Revenue tracking</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                  <span>Customer metrics</span>
                </div>
              </div>
            </div>
            
            {/* Upgrade CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-blue-600">30-day trial</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] px-2 py-0.5 h-5">
                <Lock className="w-2 h-2 mr-0.5" />
                Upgrade
              </Button>
            </div>
          </Card>
        </div>

        {/* Business Profile */}
        <div className="mb-4">
          <Card className="p-2.5 cursor-pointer hover:shadow-md transition-shadow border-green-200 bg-green-50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Business Profile</h3>
                  <p className="text-xs text-muted-foreground">Manage company info</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-xs px-2 py-1 h-6">
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground text-[10px]">Company</p>
                <p className="font-medium">GreenWaste Solutions</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px]">Service Areas</p>
                <p className="font-medium">3 Counties</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px]">Rating</p>
                <p className="font-medium">4.8 ⭐ (127)</p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px]">License</p>
                <p className="font-medium">Active</p>
              </div>
            </div>
          </Card>
        </div>



        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="font-medium">Recent Activity</h3>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">New quote request received</p>
                <p className="text-xs text-muted-foreground">ABC Manufacturing - Front Load Service</p>
              </div>
              <span className="text-xs text-muted-foreground">5m ago</span>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Proposal accepted</p>
                <p className="text-xs text-muted-foreground">City Construction - Roll-off Service</p>
              </div>
              <span className="text-xs text-muted-foreground">1h ago</span>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Customer message</p>
                <p className="text-xs text-muted-foreground">Green Valley Corp - Service inquiry</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-white p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-green-600">
            <Home className="w-4 h-4" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1" onClick={() => onNavigate && onNavigate("messages")}>
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">Messages</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs">Support</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
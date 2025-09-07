import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Home, MessageSquare, FileText, Users, DollarSign, TrendingUp, ArrowLeft, Menu, Settings, HelpCircle, Handshake, Target, User, Truck } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface BrokerDashboardProps {
  onHome: () => void;
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export function BrokerDashboard({ 
  onHome, 
  onBack,
  onNavigate
}: BrokerDashboardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dashboardCards = [
    {
      title: "Active Client Accounts",
      description: "23 clients seeking services",
      icon: Users,
      badge: "23"
    },
    {
      title: "Pending Proposals",
      description: "8 deals in negotiation",
      icon: Handshake,
      badge: "8"
    },
    {
      title: "Messages",
      description: "12 new conversations",
      icon: MessageSquare,
      badge: "12"
    },
    {
      title: "Invoicing",
      description: "$8,450 this month",
      icon: DollarSign,
      badge: "6"
    },
    {
      title: "Active Haulers",
      description: "45 active partnerships",
      icon: Target,
      badge: "45"
    },
    {
      title: "Current Service Agreement",
      description: "Active terms and conditions",
      icon: TrendingUp,
      badge: null,
      hasEditButton: true
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
          <h2>Welcome to your Broker Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Manage clients, haulers, and deals efficiently
          </p>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {dashboardCards.map((item, index) => (
            <Card 
              key={index} 
              className="p-4 relative cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (item.title === "Active Client Accounts" && onNavigate) {
                  onNavigate("client-accounts");
                } else if (item.title === "Active Haulers" && onNavigate) {
                  onNavigate("active-haulers");
                } else if (item.title === "Messages" && onNavigate) {
                  onNavigate("messages");
                } else if (item.title === "Invoicing" && onNavigate) {
                  onNavigate("invoices");
                }
              }}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center justify-between w-full mb-2">
                  <item.icon className="w-5 h-5 text-green-600" />
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {item.hasEditButton && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      Edit
                    </Button>
                  )}
                </div>
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit a Proposal Request */}
        <div className="mb-6">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow border-green-200 bg-green-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Submit a Proposal Request</h3>
                  <p className="text-sm text-muted-foreground">Create new proposal for client services</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                New Request
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Active Proposals</p>
                <p className="font-medium">8 pending review</p>
              </div>
              <div>
                <p className="text-muted-foreground">This Month</p>
                <p className="font-medium">15 submitted</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">This Month's Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-3 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600">Deals Closed</p>
                  <p className="text-lg font-medium text-blue-900">12</p>
                </div>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </Card>
            <Card className="p-3 bg-green-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600">Total Volume</p>
                  <p className="text-lg font-medium text-green-900">$45.2K</p>
                </div>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="font-medium">Recent Activity</h3>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Deal closed successfully</p>
                <p className="text-xs text-muted-foreground">Metro Construction &lt;&gt; GreenWaste Solutions</p>
              </div>
              <span className="text-xs text-muted-foreground">10m ago</span>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">New waste partner agreement</p>
                <p className="text-xs text-muted-foreground">ABC Manufacturing - Front Load Service</p>
              </div>
              <span className="text-xs text-muted-foreground">2h ago</span>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Hauler price increase alert</p>
                <p className="text-xs text-muted-foreground">CleanHaul Services - 8% increase effective Jan 1st</p>
              </div>
              <span className="text-xs text-muted-foreground">4h ago</span>
            </div>
          </Card>
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium">Supplier partnership renewed</p>
                <p className="text-xs text-muted-foreground">Regional Waste Management - 2 year contract</p>
              </div>
              <span className="text-xs text-muted-foreground">1d ago</span>
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
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate && onNavigate("client-accounts")}
          >
            <Users className="w-4 h-4" />
            <span className="text-xs">Accounts</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col items-center gap-1"
            onClick={() => onNavigate && onNavigate("active-suppliers")}
          >
            <Truck className="w-4 h-4" />
            <span className="text-xs">Suppliers</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1" onClick={() => onNavigate && onNavigate("settings")}>
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
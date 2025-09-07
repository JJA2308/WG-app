import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { ArrowLeft, Bell, Shield, User, Truck, CreditCard, Globe, Smartphone, Mail, Lock, Eye, MapPin } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface SettingsProps {
  onBack: () => void;
  userType: 'waste-customers' | 'hauler' | 'broker';
}

export function Settings({ onBack, userType }: SettingsProps) {
  const isCustomer = userType === 'waste-customers';
  const isHauler = userType === 'hauler';
  const isBroker = userType === 'broker';

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
        <div className="text-center mb-6">
          <h2>Settings</h2>
          <p className="text-muted-foreground mt-2">
            Manage your account and preferences
          </p>
        </div>

        {/* Account Settings */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Account</h3>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">Profile Information</p>
                  <p className="text-xs text-muted-foreground">Update your personal details</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Edit
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-sm">Security & Password</p>
                  <p className="text-xs text-muted-foreground">Change password and security settings</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                Manage
              </Button>
            </div>
          </Card>

          {(isHauler || isBroker) && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Business Profile</p>
                    <p className="text-xs text-muted-foreground">Company info and service areas</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Edit
                </Button>
              </div>
            </Card>
          )}

          {isCustomer && (
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Service Locations</p>
                    <p className="text-xs text-muted-foreground">Manage your property addresses</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Manage
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Notifications */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Notifications</h3>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Email Notifications</p>
                    <p className="text-xs text-muted-foreground">Get updates via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Push Notifications</p>
                    <p className="text-xs text-muted-foreground">Mobile app notifications</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">
                      {isCustomer ? 'Service Reminders' : isHauler ? 'New Quote Alerts' : 'Deal Notifications'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isCustomer ? 'Pickup and service alerts' : isHauler ? 'New business opportunities' : 'Client and hauler updates'}
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </div>

        {/* Privacy & Security */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Privacy & Security</h3>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Profile Visibility</p>
                    <p className="text-xs text-muted-foreground">
                      {isCustomer ? 'How haulers can see your info' : 'How customers can see your profile'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Disabled
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment & Billing */}
        {(isCustomer || isBroker) && (
          <div className="space-y-4 mb-6">
            <h3 className="font-medium">Payment & Billing</h3>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Payment Methods</p>
                    <p className="text-xs text-muted-foreground">Manage cards and billing info</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Manage
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Preferences */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium">Preferences</h3>
          
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">Language & Region</p>
                    <p className="text-xs text-muted-foreground">English (US)</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">
                  Change
                </Button>
              </div>

              {isHauler && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Auto-Accept Small Jobs</p>
                    <p className="text-xs text-muted-foreground">Under $100 value</p>
                  </div>
                  <Switch />
                </div>
              )}

              {isCustomer && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Auto-Renewal</p>
                    <p className="text-xs text-muted-foreground">Automatically renew services</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h3 className="font-medium">Support</h3>
          
          <Card className="p-4">
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start text-sm">
                Help Center
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Contact Support
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Terms of Service
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm">
                Privacy Policy
              </Button>
            </div>
          </Card>
        </div>

        {/* Logout */}
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
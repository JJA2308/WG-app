import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { ArrowLeft, User, CreditCard, Bell, Shield, Crown, Check, Star, Zap, Building2, Users, Settings, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ManageAccountProps {
  onBack: () => void;
  userType: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'annual';
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export function ManageAccount({ onBack, userType }: ManageAccountProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'notifications' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    invoiceReminders: true,
    serviceUpdates: true
  });

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    company: 'ABC Manufacturing',
    address: '123 Business Ave',
    city: 'Denver',
    state: 'CO',
    zipCode: '80202'
  });

  const getSubscriptionPlans = (): SubscriptionPlan[] => {
    if (userType === 'customer') {
      return [
        {
          id: 'basic',
          name: 'Basic',
          price: 29,
          interval: 'monthly',
          features: [
            'Up to 2 service locations',
            'Basic reporting',
            'Email support',
            'Mobile app access'
          ]
        },
        {
          id: 'professional',
          name: 'Professional',
          price: 79,
          interval: 'monthly',
          features: [
            'Up to 10 service locations',
            'Advanced reporting & analytics',
            'Priority phone support',
            'API access',
            'Custom integrations',
            'Dedicated account manager'
          ],
          popular: true,
          current: true
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 199,
          interval: 'monthly',
          features: [
            'Unlimited service locations',
            'Custom reporting',
            '24/7 phone support',
            'Full API access',
            'Custom integrations',
            'Dedicated account team',
            'SLA guarantees',
            'Custom contract terms'
          ]
        }
      ];
    } else if (userType === 'supplier') {
      return [
        {
          id: 'starter',
          name: 'Starter',
          price: 99,
          interval: 'monthly',
          features: [
            'Up to 50 customers',
            'Basic CRM tools',
            'Mobile routing app',
            'Email support',
            'Standard reporting'
          ]
        },
        {
          id: 'growth',
          name: 'Growth',
          price: 199,
          interval: 'monthly',
          features: [
            'Up to 200 customers',
            'Advanced CRM & automation',
            'Route optimization',
            'Priority support',
            'Advanced analytics',
            'Integration tools',
            'Custom branding'
          ],
          popular: true,
          current: true
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price: 399,
          interval: 'monthly',
          features: [
            'Unlimited customers',
            'Full automation suite',
            'AI-powered routing',
            '24/7 dedicated support',
            'Custom reporting',
            'White-label solution',
            'Multi-location management',
            'Custom integrations'
          ]
        }
      ];
    } else {
      // Broker plans
      return [
        {
          id: 'independent',
          name: 'Independent',
          price: 149,
          interval: 'monthly',
          features: [
            'Up to 25 active deals',
            'Basic lead management',
            'Commission tracking',
            'Email support',
            'Mobile app access'
          ]
        },
        {
          id: 'professional',
          name: 'Professional',
          price: 299,
          interval: 'monthly',
          features: [
            'Up to 100 active deals',
            'Advanced lead management',
            'Automated follow-ups',
            'Priority support',
            'Advanced analytics',
            'Territory management',
            'Custom proposals'
          ],
          popular: true,
          current: true
        },
        {
          id: 'agency',
          name: 'Agency',
          price: 599,
          interval: 'monthly',
          features: [
            'Unlimited active deals',
            'Multi-broker management',
            'White-label platform',
            '24/7 support',
            'Custom reporting',
            'API access',
            'Team collaboration tools',
            'Revenue sharing tools'
          ]
        }
      ];
    }
  };

  const [subscriptionPlans] = useState<SubscriptionPlan[]>(getSubscriptionPlans());
  const currentPlan = subscriptionPlans.find(plan => plan.current);

  const handleProfileSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Saving profile:', profileData);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes('enterprise') || planName.toLowerCase().includes('agency')) {
      return <Crown className="w-5 h-5" />;
    } else if (planName.toLowerCase().includes('professional') || planName.toLowerCase().includes('growth')) {
      return <Star className="w-5 h-5" />;
    }
    return <Zap className="w-5 h-5" />;
  };

  const renderProfileTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Profile Information</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => isEditing ? handleProfileSave() : setIsEditing(true)}
        >
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">First Name</label>
              <Input
                value={profileData.firstName}
                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Last Name</label>
              <Input
                value={profileData.lastName}
                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <Input
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!isEditing}
              type="email"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
            <Input
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!isEditing}
              type="tel"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Company</label>
            <Input
              value={profileData.company}
              onChange={(e) => setProfileData({...profileData, company: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Address</label>
            <Input
              value={profileData.address}
              onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">City</label>
              <Input
                value={profileData.city}
                onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">State</label>
              <Input
                value={profileData.state}
                onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">ZIP</label>
              <Input
                value={profileData.zipCode}
                onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-2">
              <Button onClick={handleProfileSave} className="flex-1 bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Current Subscription</h3>
        {currentPlan && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPlanIcon(currentPlan.name)}
                  <span className="font-medium">{currentPlan.name} Plan</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Current</Badge>
                </div>
                <div className="text-right">
                  <p className="font-medium">${currentPlan.price}/month</p>
                  <p className="text-xs text-muted-foreground">Next billing: Feb 15, 2024</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <CreditCard className="w-3 h-3 mr-1" />
                  Update Payment
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Mail className="w-3 h-3 mr-1" />
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Available Plans</h3>
        <div className="space-y-3">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`${plan.current ? 'border-green-200 bg-green-50' : ''} ${plan.popular ? 'border-blue-200' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getPlanIcon(plan.name)}
                    <div>
                      <h4 className="font-medium">{plan.name}</h4>
                      <p className="text-sm text-muted-foreground">${plan.price}/{plan.interval}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {plan.popular && (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Popular</Badge>
                    )}
                    {plan.current && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">Current</Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-3 h-3 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {!plan.current && (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    size="sm"
                  >
                    {currentPlan && plan.price > currentPlan.price ? 'Upgrade' : 'Switch'} to {plan.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Need a Custom Plan?</h4>
              <p className="text-xs text-blue-700 mb-3">
                For large organizations with specific requirements, we offer custom enterprise solutions.
              </p>
              <Button variant="outline" size="sm" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-100">
                Contact Sales
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Notification Preferences</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">SMS Notifications</p>
              <p className="text-xs text-muted-foreground">Receive urgent updates via text</p>
            </div>
            <Switch
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Mobile app notifications</p>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Content Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Marketing Emails</p>
              <p className="text-xs text-muted-foreground">Product updates and promotions</p>
            </div>
            <Switch
              checked={notifications.marketingEmails}
              onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Invoice Reminders</p>
              <p className="text-xs text-muted-foreground">Payment due notifications</p>
            </div>
            <Switch
              checked={notifications.invoiceReminders}
              onCheckedChange={(checked) => handleNotificationChange('invoiceReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Service Updates</p>
              <p className="text-xs text-muted-foreground">Schedule changes and confirmations</p>
            </div>
            <Switch
              checked={notifications.serviceUpdates}
              onCheckedChange={(checked) => handleNotificationChange('serviceUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Security Settings</h3>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Password & Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" />
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Manage Sessions
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="w-4 h-4 mr-2" />
            Download Account Data
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
            <X className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

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
          className="h-8 w-auto"
        />
        <div className="w-8"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Header Info */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-medium">Manage Account</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Update your profile, subscription, and settings
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-1 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id as any)}
                  className="flex flex-col h-auto py-2 px-1"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'subscription' && renderSubscriptionTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'security' && renderSecurityTab()}
        </div>
      </div>
    </div>
  );
}
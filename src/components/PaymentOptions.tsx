import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ArrowLeft, Plus, CreditCard, Building2, DollarSign, Trash2, Edit, Eye, EyeOff, Check, X, Shield, Calendar } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface PaymentOptionsProps {
  onBack: () => void;
  userType: string;
}

interface PaymentMethod {
  id: number;
  type: 'credit' | 'debit' | 'bank' | 'ach';
  name: string;
  last4: string;
  expiryDate?: string;
  brand?: string;
  bankName?: string;
  accountType?: string;
  isDefault: boolean;
  isVerified: boolean;
  addedDate: string;
}

export function PaymentOptions({ onBack, userType }: PaymentOptionsProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'credit',
      name: 'Business Credit Card',
      last4: '4242',
      expiryDate: '12/26',
      brand: 'Visa',
      isDefault: true,
      isVerified: true,
      addedDate: '2023-11-15'
    },
    {
      id: 2,
      type: 'bank',
      name: 'Primary Business Account',
      last4: '8901',
      bankName: 'Chase Business',
      accountType: 'Checking',
      isDefault: false,
      isVerified: true,
      addedDate: '2023-10-20'
    },
    {
      id: 3,
      type: 'credit',
      name: 'Backup Card',
      last4: '5555',
      expiryDate: '08/25',
      brand: 'Mastercard',
      isDefault: false,
      isVerified: false,
      addedDate: '2024-01-10'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [showCardDetails, setShowCardDetails] = useState<number | null>(null);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit' as 'credit' | 'debit' | 'bank' | 'ach',
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    accountType: 'checking' as 'checking' | 'savings'
  });

  const handleAddPaymentMethod = () => {
    const newMethod: PaymentMethod = {
      id: Date.now(),
      type: newPaymentMethod.type,
      name: newPaymentMethod.name || `${newPaymentMethod.type === 'credit' ? 'Credit' : newPaymentMethod.type === 'debit' ? 'Debit' : 'Bank'} Payment`,
      last4: newPaymentMethod.type === 'bank' 
        ? newPaymentMethod.accountNumber.slice(-4) 
        : newPaymentMethod.cardNumber.slice(-4),
      expiryDate: newPaymentMethod.type !== 'bank' ? newPaymentMethod.expiryDate : undefined,
      brand: newPaymentMethod.type !== 'bank' ? 'Visa' : undefined,
      bankName: newPaymentMethod.type === 'bank' ? newPaymentMethod.bankName : undefined,
      accountType: newPaymentMethod.type === 'bank' ? newPaymentMethod.accountType : undefined,
      isDefault: paymentMethods.length === 0,
      isVerified: false,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setNewPaymentMethod({
      type: 'credit',
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
      accountType: 'checking'
    });
    setShowAddForm(false);
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleDeleteMethod = (id: number) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const getCardIcon = (type: string, brand?: string) => {
    if (type === 'bank') return <Building2 className="w-5 h-5 text-blue-600" />;
    return <CreditCard className="w-5 h-5 text-green-600" />;
  };

  const getStatusBadge = (method: PaymentMethod) => {
    if (!method.isVerified) {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Pending</Badge>;
    }
    if (method.isDefault) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Default</Badge>;
    }
    return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Verified</Badge>;
  };

  const renderPaymentForm = () => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-base">Add Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Payment Type Selection */}
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Payment Type</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={newPaymentMethod.type === 'credit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setNewPaymentMethod({...newPaymentMethod, type: 'credit'})}
              className="text-xs"
            >
              Credit Card
            </Button>
            <Button
              type="button"
              variant={newPaymentMethod.type === 'bank' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setNewPaymentMethod({...newPaymentMethod, type: 'bank'})}
              className="text-xs"
            >
              Bank Account
            </Button>
          </div>
        </div>

        {/* Payment Method Name */}
        <div>
          <label className="text-sm text-muted-foreground mb-1 block">Name</label>
          <Input
            placeholder="e.g., Business Credit Card"
            value={newPaymentMethod.name}
            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
          />
        </div>

        {newPaymentMethod.type === 'bank' ? (
          // Bank Account Fields
          <>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Bank Name</label>
              <Input
                placeholder="Chase Business"
                value={newPaymentMethod.bankName}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, bankName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Routing Number</label>
                <Input
                  placeholder="021000021"
                  value={newPaymentMethod.routingNumber}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, routingNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Account Type</label>
                <div className="grid grid-cols-2 gap-1">
                  <Button
                    type="button"
                    variant={newPaymentMethod.accountType === 'checking' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewPaymentMethod({...newPaymentMethod, accountType: 'checking'})}
                    className="text-xs"
                  >
                    Checking
                  </Button>
                  <Button
                    type="button"
                    variant={newPaymentMethod.accountType === 'savings' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNewPaymentMethod({...newPaymentMethod, accountType: 'savings'})}
                    className="text-xs"
                  >
                    Savings
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Account Number</label>
              <Input
                placeholder="Account number"
                type="password"
                value={newPaymentMethod.accountNumber}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountNumber: e.target.value})}
              />
            </div>
          </>
        ) : (
          // Credit Card Fields
          <>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={newPaymentMethod.cardNumber}
                onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={newPaymentMethod.expiryDate}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiryDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">CVV</label>
                <Input
                  placeholder="123"
                  type="password"
                  value={newPaymentMethod.cvv}
                  onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex gap-2 pt-2">
          <Button onClick={handleAddPaymentMethod} className="flex-1 bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment Method
          </Button>
          <Button variant="outline" onClick={() => setShowAddForm(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-medium">Payment Methods</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {userType === 'customer' 
                ? 'Manage how you pay for waste services'
                : userType === 'supplier'
                ? 'Manage how you receive payments' 
                : 'Manage payment processing'
              }
            </p>
          </div>

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200 mb-4">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">Secure Payment Processing</h4>
                  <p className="text-xs text-blue-700">
                    All payment information is encrypted and processed securely. We never store your full card or account numbers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Payment Method Button */}
          {!showAddForm && (
            <Button 
              onClick={() => setShowAddForm(true)} 
              className="w-full mb-4 bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          )}

          {/* Add Payment Form */}
          {showAddForm && renderPaymentForm()}

          {/* Payment Methods List */}
          <div className="space-y-3">
            <h3 className="font-medium">Your Payment Methods</h3>
            
            {paymentMethods.map((method) => (
              <Card key={method.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {getCardIcon(method.type, method.brand)}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium mb-1">{method.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>
                            {method.type === 'bank' 
                              ? `${method.bankName} ${method.accountType} •••• ${method.last4}`
                              : `${method.brand} •••• ${method.last4}`
                            }
                          </span>
                          {method.expiryDate && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{method.expiryDate}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(method)}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1"
                        onClick={() => setShowCardDetails(showCardDetails === method.id ? null : method.id)}
                      >
                        {showCardDetails === method.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {showCardDetails === method.id && (
                    <div className="border-t pt-3 mt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Added</span>
                          <p className="font-medium">{new Date(method.addedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status</span>
                          <p className="font-medium">{method.isVerified ? 'Verified' : 'Pending Verification'}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        {!method.isDefault && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleSetDefault(method.id)}
                            className="text-xs"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Set Default
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEditingMethod(method)}
                          className="text-xs"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        {!method.isDefault && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeleteMethod(method.id)}
                            className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Default Badge */}
                  {method.isDefault && (
                    <div className="absolute top-2 right-2">
                      <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                        Default
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {paymentMethods.length === 0 && (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-medium text-muted-foreground mb-2">No payment methods added</h3>
                <p className="text-sm text-muted-foreground">
                  Add a payment method to get started with seamless transactions
                </p>
              </div>
            )}
          </div>

          {/* User Type Specific Information */}
          {userType === 'customer' && (
            <Card className="bg-gray-50 mt-6">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-2">Automatic Payments</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Enable automatic payments to ensure your waste services continue uninterrupted.
                </p>
                <Button variant="outline" size="sm" className="text-xs">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Enable Auto-Pay
                </Button>
              </CardContent>
            </Card>
          )}

          {userType === 'supplier' && (
            <Card className="bg-gray-50 mt-6">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-2">Payment Processing</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Payments are processed within 2-3 business days to your default account.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Payment History
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Tax Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
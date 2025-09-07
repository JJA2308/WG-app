import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Search, DollarSign, Calendar, Download, Eye, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface InvoicesProps {
  onBack: () => void;
  userType: string;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'pending' | 'overdue' | 'paid' | 'draft' | 'approved';
  description: string;
  vendor?: string;
  customer?: string;
  serviceType: string;
  paymentTerms: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }[];
}

export function Invoices({ onBack, userType }: InvoicesProps) {
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Sample invoices data based on user type
  const getInvoicesForUserType = (): Invoice[] => {
    if (userType === 'supplier') {
      return [
        {
          id: 1,
          invoiceNumber: "SUP-2024-001",
          date: "2024-01-15",
          dueDate: "2024-02-14",
          amount: 2850.00,
          status: 'pending',
          description: "Monthly front load service - ABC Manufacturing",
          customer: "ABC Manufacturing",
          serviceType: "Front Load Service",
          paymentTerms: "Net 30",
          items: [
            { description: "Front Load Service - 2x Weekly", quantity: 4, rate: 425.00, amount: 1700.00 },
            { description: "Container Rental", quantity: 2, rate: 150.00, amount: 300.00 },
            { description: "Fuel Surcharge", quantity: 1, rate: 85.00, amount: 85.00 },
            { description: "Environmental Fee", quantity: 1, rate: 75.00, amount: 75.00 },
            { description: "Taxes", quantity: 1, rate: 690.00, amount: 690.00 }
          ]
        },
        {
          id: 2,
          invoiceNumber: "SUP-2024-002",
          date: "2024-01-10",
          dueDate: "2024-01-25",
          amount: 1245.50,
          status: 'overdue',
          description: "Roll-off service - Downtown Construction",
          customer: "Downtown Construction LLC",
          serviceType: "Roll-off Service",
          paymentTerms: "Net 15",
          items: [
            { description: "20-yard Roll-off Container", quantity: 1, rate: 450.00, amount: 450.00 },
            { description: "Pickup & Delivery", quantity: 2, rate: 275.00, amount: 550.00 },
            { description: "Disposal Fee", quantity: 1, rate: 180.50, amount: 180.50 },
            { description: "Tax", quantity: 1, rate: 65.00, amount: 65.00 }
          ]
        },
        {
          id: 3,
          invoiceNumber: "SUP-2024-003",
          date: "2024-01-08",
          dueDate: "2024-02-07",
          amount: 3420.00,
          status: 'pending',
          description: "Compactor service - Metro Shopping Center",
          customer: "Metro Shopping Center",
          serviceType: "Compactor Service",
          paymentTerms: "Net 30",
          items: [
            { description: "Compactor Equipment Rental", quantity: 1, rate: 850.00, amount: 850.00 },
            { description: "Hauling Service - 3x Weekly", quantity: 12, rate: 185.00, amount: 2220.00 },
            { description: "Maintenance Fee", quantity: 1, rate: 120.00, amount: 120.00 },
            { description: "Tax", quantity: 1, rate: 230.00, amount: 230.00 }
          ]
        },
        {
          id: 4,
          invoiceNumber: "SUP-2023-098",
          date: "2023-12-28",
          dueDate: "2024-01-27",
          amount: 875.00,
          status: 'paid',
          description: "Junk removal service - Office Complex",
          customer: "Riverside Office Complex",
          serviceType: "Junk Removal",
          paymentTerms: "Net 30",
          items: [
            { description: "Office Furniture Removal", quantity: 1, rate: 650.00, amount: 650.00 },
            { description: "Electronic Waste Disposal", quantity: 1, rate: 125.00, amount: 125.00 },
            { description: "Labor Surcharge", quantity: 1, rate: 75.00, amount: 75.00 },
            { description: "Tax", quantity: 1, rate: 25.00, amount: 25.00 }
          ]
        },
        {
          id: 5,
          invoiceNumber: "SUP-2024-004",
          date: "2024-01-20",
          dueDate: "2024-02-19",
          amount: 1950.00,
          status: 'draft',
          description: "Weekly recycling service - Tech Campus",
          customer: "Innovation Tech Campus",
          serviceType: "Recycling Service",
          paymentTerms: "Net 30",
          items: [
            { description: "Recycling Collection", quantity: 4, rate: 325.00, amount: 1300.00 },
            { description: "Sorting Service", quantity: 1, rate: 450.00, amount: 450.00 },
            { description: "Transportation", quantity: 1, rate: 125.00, amount: 125.00 },
            { description: "Tax", quantity: 1, rate: 75.00, amount: 75.00 }
          ]
        }
      ];
    } else if (userType === 'broker') {
      return [
        {
          id: 1,
          invoiceNumber: "BRK-2024-001",
          date: "2024-01-15",
          dueDate: "2024-02-14",
          amount: 1200.00,
          status: 'pending',
          description: "Commission - ABC Manufacturing Deal",
          vendor: "GreenWaste Solutions",
          serviceType: "Front Load Brokerage",
          paymentTerms: "Net 30",
          items: [
            { description: "Brokerage Commission (8%)", quantity: 1, rate: 1000.00, amount: 1000.00 },
            { description: "Service Fee", quantity: 1, rate: 150.00, amount: 150.00 },
            { description: "Tax", quantity: 1, rate: 50.00, amount: 50.00 }
          ]
        },
        {
          id: 2,
          invoiceNumber: "BRK-2024-002",
          date: "2024-01-12",
          dueDate: "2024-01-27",
          amount: 850.00,
          status: 'overdue',
          description: "Commission - Construction Project",
          vendor: "Metro Waste Services",
          serviceType: "Roll-off Brokerage",
          paymentTerms: "Net 15",
          items: [
            { description: "Brokerage Commission (6%)", quantity: 1, rate: 750.00, amount: 750.00 },
            { description: "Processing Fee", quantity: 1, rate: 75.00, amount: 75.00 },
            { description: "Tax", quantity: 1, rate: 25.00, amount: 25.00 }
          ]
        },
        {
          id: 3,
          invoiceNumber: "BRK-2024-003",
          date: "2024-01-18",
          dueDate: "2024-02-17",
          amount: 2100.00,
          status: 'approved',
          description: "Multi-location deal commission",
          vendor: "EcoWaste Solutions",
          serviceType: "Multi-Service Brokerage",
          paymentTerms: "Net 30",
          items: [
            { description: "Commission - 5 Locations (10%)", quantity: 1, rate: 1800.00, amount: 1800.00 },
            { description: "Coordination Fee", quantity: 1, rate: 250.00, amount: 250.00 },
            { description: "Tax", quantity: 1, rate: 50.00, amount: 50.00 }
          ]
        },
        {
          id: 4,
          invoiceNumber: "BRK-2023-089",
          date: "2023-12-30",
          dueDate: "2024-01-29",
          amount: 675.00,
          status: 'paid',
          description: "Q4 Performance Bonus",
          vendor: "Regional Waste Management",
          serviceType: "Performance Bonus",
          paymentTerms: "Net 30",
          items: [
            { description: "Q4 Performance Bonus", quantity: 1, rate: 600.00, amount: 600.00 },
            { description: "Administrative Fee", quantity: 1, rate: 50.00, amount: 50.00 },
            { description: "Tax", quantity: 1, rate: 25.00, amount: 25.00 }
          ]
        }
      ];
    } else {
      // Customer invoices (bills they receive)
      return [
        {
          id: 1,
          invoiceNumber: "INV-2024-001",
          date: "2024-01-15",
          dueDate: "2024-02-14",
          amount: 1350.00,
          status: 'pending',
          description: "Monthly waste management service",
          vendor: "GreenWaste Solutions",
          serviceType: "Front Load Service",
          paymentTerms: "Net 30",
          items: [
            { description: "Front Load Service - 2x Weekly", quantity: 1, rate: 950.00, amount: 950.00 },
            { description: "Container Rental", quantity: 2, rate: 125.00, amount: 250.00 },
            { description: "Environmental Fee", quantity: 1, rate: 75.00, amount: 75.00 },
            { description: "Tax", quantity: 1, rate: 75.00, amount: 75.00 }
          ]
        },
        {
          id: 2,
          invoiceNumber: "INV-2024-002",
          date: "2024-01-10",
          dueDate: "2024-01-25",
          amount: 425.50,
          status: 'overdue',
          description: "Additional pickup service",
          vendor: "GreenWaste Solutions",
          serviceType: "Additional Service",
          paymentTerms: "Net 15",
          items: [
            { description: "Emergency Pickup", quantity: 1, rate: 275.00, amount: 275.00 },
            { description: "Fuel Surcharge", quantity: 1, rate: 45.00, amount: 45.00 },
            { description: "Overtime Fee", quantity: 1, rate: 85.50, amount: 85.50 },
            { description: "Tax", quantity: 1, rate: 20.00, amount: 20.00 }
          ]
        },
        {
          id: 3,
          invoiceNumber: "INV-2024-003",
          date: "2024-01-08",
          dueDate: "2024-02-07",
          amount: 2840.00,
          status: 'pending',
          description: "Compactor service and maintenance",
          vendor: "EcoWaste Services",
          serviceType: "Compactor Service",
          paymentTerms: "Net 30",
          items: [
            { description: "Compactor Lease", quantity: 1, rate: 1200.00, amount: 1200.00 },
            { description: "Hauling Service", quantity: 1, rate: 1350.00, amount: 1350.00 },
            { description: "Maintenance", quantity: 1, rate: 150.00, amount: 150.00 },
            { description: "Tax", quantity: 1, rate: 140.00, amount: 140.00 }
          ]
        },
        {
          id: 4,
          invoiceNumber: "INV-2023-098",
          date: "2023-12-28",
          dueDate: "2024-01-27",
          amount: 950.00,
          status: 'paid',
          description: "December waste management",
          vendor: "GreenWaste Solutions",
          serviceType: "Monthly Service",
          paymentTerms: "Net 30",
          items: [
            { description: "Monthly Front Load Service", quantity: 1, rate: 825.00, amount: 825.00 },
            { description: "Holiday Surcharge", quantity: 1, rate: 75.00, amount: 75.00 },
            { description: "Tax", quantity: 1, rate: 50.00, amount: 50.00 }
          ]
        },
        {
          id: 5,
          invoiceNumber: "INV-2024-004",
          date: "2024-01-20",
          dueDate: "2024-02-19",
          amount: 695.00,
          status: 'pending',
          description: "Recycling service setup",
          vendor: "CleanSlate Waste Management",
          serviceType: "Setup Fee",
          paymentTerms: "Net 30",
          items: [
            { description: "Initial Setup Fee", quantity: 1, rate: 450.00, amount: 450.00 },
            { description: "Container Delivery", quantity: 3, rate: 65.00, amount: 195.00 },
            { description: "Tax", quantity: 1, rate: 50.00, amount: 50.00 }
          ]
        }
      ];
    }
  };

  const [invoices] = useState<Invoice[]>(getInvoicesForUserType());

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (invoice.vendor && invoice.vendor.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (invoice.customer && invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectInvoice = (invoiceId: number) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
    }
  };

  const handleApproveInvoices = () => {
    // In a real app, this would make API calls
    console.log('Approving invoices:', selectedInvoices);
    setSelectedInvoices([]);
    // Show success toast or update invoice statuses
  };

  const handleReportError = () => {
    // In a real app, this would open a form or modal
    console.log('Reporting error for invoices:', selectedInvoices);
    setSelectedInvoices([]);
    // Show error reporting form
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const statuses = ['all', 'pending', 'overdue', 'paid', 'draft', 'approved'];
  const pendingCount = invoices.filter(i => i.status === 'pending').length;
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;

  if (selectedInvoice) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedInvoice(null)} 
            className="p-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Invoice Detail */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Invoice Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{selectedInvoice.invoiceNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedInvoice.description}</p>
                  </div>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedInvoice.status)}
                      <span className="capitalize">{selectedInvoice.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Invoice Date</p>
                    <p className="font-medium">{new Date(selectedInvoice.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p className="font-medium">{new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{userType === 'customer' ? 'Vendor' : 'Customer'}</p>
                    <p className="font-medium">{selectedInvoice.vendor || selectedInvoice.customer}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Terms</p>
                    <p className="font-medium">{selectedInvoice.paymentTerms}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Invoice Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × ${item.rate.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium">${item.amount.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <p className="text-base font-medium">Total Amount</p>
                    <p className="text-lg font-bold text-green-600">${selectedInvoice.amount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {selectedInvoice.status === 'pending' && (
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApproveInvoices()}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Invoice
                </Button>
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => handleReportError()}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Error
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-medium">
              {userType === 'customer' ? 'Invoices' : userType === 'supplier' ? 'Billing' : 'Commission Invoices'}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {pendingCount} pending • {overdueCount} overdue
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {statuses.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStatus(status)}
                className="capitalize whitespace-nowrap"
              >
                {status}
              </Button>
            ))}
          </div>

          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <Card className="p-4 bg-blue-50 border-blue-200 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedInvoices.length === filteredInvoices.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium">
                    {selectedInvoices.length} invoice{selectedInvoices.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={handleApproveInvoices}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={handleReportError}
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Report Error
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Invoices List */}
          <div className="space-y-3">
            {filteredInvoices.map((invoice) => (
              <Card 
                key={invoice.id} 
                className="cursor-pointer transition-all hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => handleSelectInvoice(invoice.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div 
                      className="flex-1 min-w-0"
                      onClick={() => setSelectedInvoice(invoice)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{invoice.invoiceNumber}</span>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(invoice.status)}
                              <span className="capitalize">{invoice.status}</span>
                            </div>
                          </Badge>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium mb-1 truncate">{invoice.description}</h4>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{userType === 'customer' ? invoice.vendor : invoice.customer}</span>
                        <span>${invoice.amount.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {new Date(invoice.dueDate).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {invoice.serviceType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-medium text-muted-foreground mb-2">No invoices found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Your invoices will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
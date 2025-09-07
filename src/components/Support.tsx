import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, HelpCircle, MessageSquare, Phone, Mail, FileText, Search, Clock, CheckCircle } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface SupportProps {
  onBack: () => void;
  userType: 'waste-customers' | 'hauler' | 'broker';
}

export function Support({ onBack, userType }: SupportProps) {
  const isCustomer = userType === 'waste-customers';
  const isHauler = userType === 'hauler';
  const isBroker = userType === 'broker';

  const frequentQuestions = [
    {
      question: isCustomer ? "How do I request a quote?" : isHauler ? "How do I submit a proposal?" : "How do I manage client deals?",
      category: "Getting Started"
    },
    {
      question: isCustomer ? "How do I pay my invoice?" : isHauler ? "How do I get paid?" : "How do I track commissions?",
      category: "Billing"
    },
    {
      question: isCustomer ? "How do I cancel service?" : isHauler ? "How do I update my service areas?" : "How do I add new haulers?",
      category: "Account Management"
    },
    {
      question: isCustomer ? "What types of waste are accepted?" : isHauler ? "How do I update my pricing?" : "How do I negotiate rates?",
      category: "Services"
    }
  ];

  const supportTickets = [
    {
      id: "#12345",
      subject: "Issue with pickup schedule",
      status: "In Progress",
      date: "Dec 14, 2024"
    },
    {
      id: "#12340",
      subject: "Billing question",
      status: "Resolved",
      date: "Dec 10, 2024"
    }
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
          className="h-6 w-auto"
        />
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="text-center mb-6">
          <h2>Support Center</h2>
          <p className="text-muted-foreground mt-2">
            Get help with your account and services
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="text-center">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm mb-1">Live Chat</h3>
              <p className="text-xs text-muted-foreground">Available 24/7</p>
            </div>
          </Card>
          <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
            <div className="text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-sm mb-1">Call Support</h3>
              <p className="text-xs text-muted-foreground">Mon-Fri 8am-6pm</p>
            </div>
          </Card>
        </div>

        {/* Search Help */}
        <Card className="p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Search className="w-5 h-5 text-gray-500" />
            <h3 className="font-medium">Search Help Articles</h3>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="What can we help you with?"
              className="w-full p-3 border border-gray-200 rounded-lg text-sm"
            />
            <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700">
              Search
            </Button>
          </div>
        </Card>

        {/* Frequent Questions */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {frequentQuestions.map((item, index) => (
              <Card key={index} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.question}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My Support Tickets */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">My Support Tickets</h3>
            <Button size="sm" variant="outline" className="text-xs">
              Create New
            </Button>
          </div>
          <div className="space-y-3">
            {supportTickets.map((ticket) => (
              <Card key={ticket.id} className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{ticket.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      ticket.status === 'Resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ticket.status === 'Resolved' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {ticket.status === 'In Progress' && <Clock className="w-3 h-3 inline mr-1" />}
                      {ticket.status}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{ticket.date}</span>
                </div>
                <p className="text-sm">{ticket.subject}</p>
                <div className="flex justify-end mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Contact Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-muted-foreground">1-800-WASTE-GK (1-800-927-8345)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-muted-foreground">support@wastegeek.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                <p className="text-muted-foreground">Live Chat: 24/7</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ArrowLeft, Search, MessageCircle, Clock, Star, Archive, Trash2, Reply, Forward, MoreHorizontal } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface MessagesProps {
  onBack: () => void;
  userType: string;
}

interface Message {
  id: number;
  sender: string;
  senderType: 'supplier' | 'customer' | 'broker';
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  priority: 'high' | 'normal' | 'low';
  category: 'quote' | 'service' | 'billing' | 'support' | 'contract';
}

interface MessageThread {
  id: number;
  messages: {
    id: number;
    sender: string;
    senderType: 'supplier' | 'customer' | 'broker';
    content: string;
    timestamp: string;
    isRead: boolean;
  }[];
}

export function Messages({ onBack, userType }: MessagesProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample messages data based on user type
  const getMessagesForUserType = (): Message[] => {
    if (userType === 'supplier') {
      return [
        {
          id: 1,
          sender: "ABC Business Park",
          senderType: 'customer',
          subject: "Roll-off Service Request - Urgent",
          preview: "We need a 20-yard roll-off container for a construction project starting Monday...",
          timestamp: "2h ago",
          isRead: false,
          isStarred: true,
          hasAttachment: false,
          priority: 'high',
          category: 'quote'
        },
        {
          id: 2,
          sender: "Downtown Office Complex",
          senderType: 'customer',
          subject: "Quote Request - Front Load Service",
          preview: "Looking for weekly front load service for our 15-story office building...",
          timestamp: "4h ago",
          isRead: false,
          isStarred: false,
          hasAttachment: true,
          priority: 'normal',
          category: 'quote'
        },
        {
          id: 3,
          sender: "Waste Management Broker",
          senderType: 'broker',
          subject: "New Customer Referral - Retail Chain",
          preview: "I have a retail chain client looking for compactor services across 5 locations...",
          timestamp: "1d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: false,
          priority: 'normal',
          category: 'service'
        },
        {
          id: 4,
          sender: "Metro Shopping Center",
          senderType: 'customer',
          subject: "Service Schedule Change Request",
          preview: "Due to increased foot traffic, we need to change our pickup from twice weekly to...",
          timestamp: "2d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: false,
          priority: 'normal',
          category: 'service'
        },
        {
          id: 5,
          sender: "Industrial Park Management",
          senderType: 'customer',
          subject: "Billing Inquiry - Additional Charges",
          preview: "We noticed additional charges on our last invoice and would like clarification...",
          timestamp: "3d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: true,
          priority: 'low',
          category: 'billing'
        }
      ];
    } else if (userType === 'broker') {
      return [
        {
          id: 1,
          sender: "GreenWaste Solutions",
          senderType: 'supplier',
          subject: "Re: Client Proposal - Tech Campus",
          preview: "We've reviewed the requirements and can offer a competitive package for the tech campus...",
          timestamp: "1h ago",
          isRead: false,
          isStarred: true,
          hasAttachment: true,
          priority: 'high',
          category: 'quote'
        },
        {
          id: 2,
          sender: "Retail Chain Corp",
          senderType: 'customer',
          subject: "Multi-Location Waste Services RFP",
          preview: "We're looking for a comprehensive waste management solution across 25 locations...",
          timestamp: "3h ago",
          isRead: false,
          isStarred: false,
          hasAttachment: true,
          priority: 'high',
          category: 'quote'
        },
        {
          id: 3,
          sender: "EcoWaste Services",
          senderType: 'supplier',
          subject: "Partnership Opportunity Discussion",
          preview: "We'd like to discuss expanding our partnership to include recycling services...",
          timestamp: "6h ago",
          isRead: true,
          isStarred: false,
          hasAttachment: false,
          priority: 'normal',
          category: 'service'
        },
        {
          id: 4,
          sender: "Manufacturing District LLC",
          senderType: 'customer',
          subject: "Urgent: Container Overflow Issue",
          preview: "We're experiencing container overflow at multiple locations and need immediate...",
          timestamp: "1d ago",
          isRead: true,
          isStarred: true,
          hasAttachment: false,
          priority: 'high',
          category: 'support'
        },
        {
          id: 5,
          sender: "CleanSlate Waste Management",
          senderType: 'supplier',
          subject: "Commission Payment Confirmation",
          preview: "Your commission payment for Q4 has been processed and should appear in your account...",
          timestamp: "2d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: true,
          priority: 'normal',
          category: 'billing'
        }
      ];
    } else {
      // Customer messages
      return [
        {
          id: 1,
          sender: "GreenWaste Solutions",
          senderType: 'supplier',
          subject: "Your Quote is Ready - Front Load Service",
          preview: "Thank you for your interest in our services. We've prepared a customized quote...",
          timestamp: "30m ago",
          isRead: false,
          isStarred: false,
          hasAttachment: true,
          priority: 'high',
          category: 'quote'
        },
        {
          id: 2,
          sender: "EcoWaste Services",
          senderType: 'supplier',
          subject: "Competitive Quote - Roll-off Service",
          preview: "We can beat any competitor's price by 10%. Here's our proposal for your project...",
          timestamp: "2h ago",
          isRead: false,
          isStarred: true,
          hasAttachment: true,
          priority: 'high',
          category: 'quote'
        },
        {
          id: 3,
          sender: "CleanSlate Waste Management",
          senderType: 'supplier',
          subject: "Service Reminder - Weekly Pickup",
          preview: "This is a friendly reminder that your next pickup is scheduled for tomorrow at 7 AM...",
          timestamp: "1d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: false,
          priority: 'normal',
          category: 'service'
        },
        {
          id: 4,
          sender: "Waste Management Broker",
          senderType: 'broker',
          subject: "Additional Service Options Available",
          preview: "Based on your current needs, we've identified some additional services that could...",
          timestamp: "2d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: false,
          priority: 'normal',
          category: 'service'
        },
        {
          id: 5,
          sender: "GreenWaste Solutions",
          senderType: 'supplier',
          subject: "Monthly Invoice - December 2024",
          preview: "Your December invoice is now available. You can view and pay it through our portal...",
          timestamp: "5d ago",
          isRead: true,
          isStarred: false,
          hasAttachment: true,
          priority: 'normal',
          category: 'billing'
        },
        {
          id: 6,
          sender: "Customer Support Team",
          senderType: 'supplier',
          subject: "Thank you for your feedback",
          preview: "We appreciate your recent feedback about our service. We're implementing improvements...",
          timestamp: "1w ago",
          isRead: true,
          isStarred: false,
          hasAttachment: false,
          priority: 'low',
          category: 'support'
        }
      ];
    }
  };

  const [messages] = useState<Message[]>(getMessagesForUserType());

  // Sample message thread for when a message is selected
  const getMessageThread = (messageId: number): MessageThread => {
    const selectedMsg = messages.find(m => m.id === messageId);
    if (!selectedMsg) return { id: messageId, messages: [] };

    return {
      id: messageId,
      messages: [
        {
          id: 1,
          sender: selectedMsg.sender,
          senderType: selectedMsg.senderType,
          content: `${selectedMsg.preview}\n\nI wanted to follow up on this matter and provide you with additional details. Please let me know if you need any clarification or have questions.\n\nLooking forward to hearing from you soon.`,
          timestamp: selectedMsg.timestamp,
          isRead: true
        },
        {
          id: 2,
          sender: "You",
          senderType: userType as any,
          content: "Thank you for reaching out. I'm interested in learning more about this opportunity. Could you provide additional details about the pricing and service terms?",
          timestamp: "1h ago",
          isRead: true
        }
      ]
    };
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || message.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;
  const categories = ['all', 'quote', 'service', 'billing', 'support', 'contract'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSenderTypeColor = (senderType: string) => {
    switch (senderType) {
      case 'supplier': return 'bg-green-100 text-green-800';
      case 'customer': return 'bg-blue-100 text-blue-800';
      case 'broker': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedMessage) {
    const thread = getMessageThread(selectedMessage.id);
    
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedMessage(null)} 
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
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Message Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium mb-2">{selectedMessage.subject}</h2>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={getSenderTypeColor(selectedMessage.senderType)}>
              {selectedMessage.senderType}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(selectedMessage.priority)}>
              {selectedMessage.priority} priority
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            From: {selectedMessage.sender} • {selectedMessage.timestamp}
          </p>
        </div>

        {/* Message Thread */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="space-y-4">
            {thread.messages.map((message, index) => (
              <Card key={message.id} className={message.sender === "You" ? "ml-8" : "mr-8"}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{message.sender}</span>
                      <Badge variant="outline" className={`text-xs ${getSenderTypeColor(message.senderType)}`}>
                        {message.senderType}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reply Actions */}
        <div className="border-t bg-white p-4">
          <div className="flex gap-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline">
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </Button>
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
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-medium">Messages</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              {unreadCount} unread messages
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Messages List */}
          <div className="space-y-3">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  !message.isRead ? 'ring-2 ring-green-100 bg-green-50/30' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`font-medium text-sm truncate ${!message.isRead ? 'font-semibold' : ''}`}>
                        {message.sender}
                      </span>
                      <Badge variant="outline" className={`text-xs ${getSenderTypeColor(message.senderType)} flex-shrink-0`}>
                        {message.senderType}
                      </Badge>
                      {message.hasAttachment && (
                        <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {message.isStarred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                  </div>
                  
                  <h4 className={`text-sm mb-1 truncate ${!message.isRead ? 'font-semibold' : 'font-medium'}`}>
                    {message.subject}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground truncate mb-2">
                    {message.preview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs capitalize">
                      {message.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-medium text-muted-foreground mb-2">No messages found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms' : 'Your messages will appear here'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
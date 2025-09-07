import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ArrowLeft, MessageCircle, Send, Bot, User, BookOpen, AlertCircle } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ContractQAProps {
  contractId: number;
  onBack: () => void;
}

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  contractReference?: {
    section: string;
    clause: string;
  };
  timestamp: string;
}

export function ContractQA({ contractId, onBack }: ContractQAProps) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'ai',
      message: 'Hello! I\'m your AI contract assistant. I can help you understand the terms and conditions of your waste management contract. Ask me anything about your agreement, pricing, cancellation terms, or service details.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI responses based on common contract questions
  const getAIResponse = (userQuestion: string): { message: string; contractReference?: { section: string; clause: string } } => {
    const question = userQuestion.toLowerCase();
    
    if (question.includes('cancel') || question.includes('terminate') || question.includes('end')) {
      return {
        message: 'You can terminate this contract with thirty (30) days written notice. However, since you\'re still within the 12-month term, early termination would result in an early termination fee equal to 25% of the remaining contract value. Based on your current contract ending January 14, 2025, this would be approximately $121.25.',
        contractReference: {
          section: 'Section 2: Term and Termination',
          clause: 'Early termination by Customer may result in an early termination fee equal to 25% of remaining contract value.'
        }
      };
    }
    
    if (question.includes('pickup') || question.includes('schedule') || question.includes('when')) {
      return {
        message: 'Your waste pickup is scheduled for twice weekly service on Tuesdays and Fridays. You\'re responsible for ensuring containers are accessible on pickup days and that waste is properly contained without overflowing.',
        contractReference: {
          section: 'Section 3: Services Provided',
          clause: 'Twice weekly pickup service (Tuesdays and Fridays)'
        }
      };
    }
    
    if (question.includes('price') || question.includes('cost') || question.includes('pay') || question.includes('bill')) {
      return {
        message: 'Your monthly service fee is $485.00. Payment is due within thirty (30) days of the invoice date. Late payments will incur a 1.5% monthly service charge. Additional services like extra pickups or overweight fees are billed separately.',
        contractReference: {
          section: 'Section 4: Rates and Payment Terms',
          clause: 'Customer agrees to pay Company $485.00 per month for the services described herein.'
        }
      };
    }
    
    if (question.includes('container') || question.includes('size') || question.includes('bin')) {
      return {
        message: 'You have a 4-yard front load container for Municipal Solid Waste (MSW) collection. The container maintenance and cleaning are included in your service. You\'re responsible for ensuring waste doesn\'t overflow and is properly contained.',
        contractReference: {
          section: 'Section 3: Services Provided',
          clause: 'Front Load Container Service (4-yard container) • Municipal Solid Waste (MSW) collection'
        }
      };
    }
    
    if (question.includes('hazardous') || question.includes('not allowed') || question.includes('prohibited')) {
      return {
        message: 'You cannot place hazardous materials in your waste containers. This is strictly prohibited under your contract terms. Hazardous materials must be disposed of through proper channels. Violations could result in additional charges or service suspension.',
        contractReference: {
          section: 'Section 5: Customer Responsibilities',
          clause: 'Not place hazardous materials in containers'
        }
      };
    }
    
    if (question.includes('emergency') || question.includes('extra') || question.includes('additional')) {
      return {
        message: 'Emergency pickup services are available but will incur additional charges at the company\'s standard rates. You can request these services by contacting GreenWaste Solutions directly. These charges are billed separately from your monthly fee.',
        contractReference: {
          section: 'Section 3: Services Provided',
          clause: 'Emergency pickup services (additional charges apply)'
        }
      };
    }
    
    if (question.includes('recycle') || question.includes('recycling') || question.includes('separate')) {
      return {
        message: 'You are required to separate recyclables as mandated by local ordinance. This is part of your customer responsibilities under the contract. Proper separation helps ensure compliance with local waste management regulations.',
        contractReference: {
          section: 'Section 5: Customer Responsibilities',
          clause: 'Separate recyclables as required by local ordinance'
        }
      };
    }
    
    if (question.includes('liability') || question.includes('insurance') || question.includes('damage')) {
      return {
        message: 'GreenWaste Solutions maintains comprehensive general liability insurance of at least $1,000,000. However, their liability for damages is limited to your monthly service fee ($485). You also agree to indemnify the company against claims from improper waste disposal.',
        contractReference: {
          section: 'Section 6: Liability and Insurance',
          clause: 'Company maintains comprehensive general liability insurance of not less than $1,000,000. Company\'s liability for damages is limited to the monthly service fee.'
        }
      };
    }
    
    if (question.includes('dispute') || question.includes('legal') || question.includes('court')) {
      return {
        message: 'Any disputes under this contract must be resolved through binding arbitration in Travis County, Texas. The contract is governed by Texas state law. This means court litigation is not the first option for resolving disagreements.',
        contractReference: {
          section: 'Section 8: Governing Law',
          clause: 'Any disputes shall be resolved through binding arbitration in Travis County, Texas.'
        }
      };
    }
    
    // Default response for questions not matching specific patterns
    return {
      message: 'I\'d be happy to help you with that question. Could you be more specific about which aspect of your contract you\'d like to know about? I can help with topics like pricing, pickup schedules, cancellation terms, service details, customer responsibilities, or any other contract provisions.',
      contractReference: undefined
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: question,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = getAIResponse(question);
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        type: 'ai',
        message: aiResponse.message,
        contractReference: aiResponse.contractReference,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const suggestedQuestions = [
    "How can I cancel my contract?",
    "What days is my pickup scheduled?",
    "How much do I pay monthly?",
    "What size container do I have?",
    "Can I put hazardous materials in the container?",
    "How do I request an emergency pickup?"
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
            <h2 className="text-xl font-medium">Contract AI Assistant</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Ask questions about your waste management contract terms
            </p>
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-600" />
                  Suggested Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedQuestions.map((suggestionText, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuestion(suggestionText)}
                      className="text-left justify-start h-auto py-2 px-3 text-xs"
                    >
                      {suggestionText}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chat Messages */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                  <div className="flex items-start gap-2 mb-2">
                    {message.type === 'ai' ? (
                      <Bot className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <User className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      
                      {message.contractReference && (
                        <div className="mt-3 p-2 bg-white rounded border-l-4 border-green-600">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertCircle className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-medium text-green-800">{message.contractReference.section}</span>
                          </div>
                          <p className="text-xs text-gray-700 italic">"{message.contractReference.clause}"</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-green-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about your contract terms..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!question.trim() || isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are based on your signed contract. For complex legal questions, consult with a professional.
        </p>
      </div>
    </div>
  );
}
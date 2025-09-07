import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowLeft, Mail, Phone, MapPin, Clock } from "lucide-react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface ContactUsProps {
  onBack: () => void;
}

export function ContactUs({ onBack }: ContactUsProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-1 mr-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <img 
            src={wasteGeekLogo} 
            alt="Waste Geek" 
            className="h-6 w-auto"
          />
        </div>
        <h1 className="text-lg font-medium">Contact Us</h1>
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="p-6">
            <h2 className="mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or need assistance? We're here to help you find the perfect waste management solution.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">(555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">Customer Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">support@wastegeek.com</p>
                  <p className="text-sm text-muted-foreground">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Mon-Fri: 8AM-6PM EST</p>
                  <p className="text-sm text-muted-foreground">Business Hours</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">123 Business Ave, Suite 100</p>
                  <p className="text-sm text-muted-foreground">Atlanta, GA 30309</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="p-6">
            <h3 className="mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              
              <div>
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" placeholder="Your Company Name" />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your needs or questions..."
                  rows={4}
                />
              </div>
              
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Quick Help */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="mb-2">Need Quick Help?</h3>
            <p className="text-muted-foreground mb-4">
              For immediate assistance with quotes or urgent service needs, call us directly at (555) 123-4567.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Call Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import wasteGeekLogo from 'figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png';

interface FAQProps {
  onBack: () => void;
}

export function FAQ({ onBack }: FAQProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqSections = [
    {
      title: "General Questions",
      items: [
        {
          question: "How does Waste Geek work?",
          answer: "Waste Geek connects you with pre-vetted waste service providers in your area. Simply tell us about your needs, and we'll match you with suppliers who can provide competitive quotes for your specific requirements."
        },
        {
          question: "Is there a cost to use Waste Geek?",
          answer: "No, Waste Geek is completely free for customers. We're paid by our supplier partners, so you can get quotes and compare services at no cost to you."
        },
        {
          question: "How quickly will I receive quotes?",
          answer: "Most customers receive initial responses within 24 hours. For urgent requests, many suppliers can respond within a few hours during business days."
        },
        {
          question: "What types of waste services do you offer?",
          answer: "We provide quotes for roll-off containers, front load services, compactor equipment and hauling, junk removal, and specialized waste management solutions."
        },
        {
          question: "Are your suppliers vetted?",
          answer: "Yes, all suppliers on our platform are thoroughly vetted for licensing, insurance, and service quality. We regularly review performance to maintain high standards."
        },
        {
          question: "Can I manage my existing contracts through Waste Geek?",
          answer: "Yes, our dashboard allows you to track quotes, manage active contracts, view invoices, and communicate with suppliers all in one place."
        },
        {
          question: "What if I need to cancel or modify my service?",
          answer: "You can work directly with your chosen supplier to modify services, or contact our support team for assistance with changes or cancellations."
        },
        {
          question: "Do you offer emergency or same-day service?",
          answer: "Many of our suppliers offer emergency services. When submitting a quote request, indicate if you need urgent service and we'll prioritize suppliers who can accommodate your timeline."
        }
      ]
    },
    {
      title: "Front Load Dumpster Sizes",
      items: [
        {
          question: "What are the standard front load dumpster sizes?",
          answer: "Front load dumpsters come in four standard commercial sizes:\n\n• 2 Yard: 6ft W × 3ft D × 3ft H (holds 12-15 trash bags)\n• 4 Yard: 6ft W × 4ft D × 4ft H (holds 30-40 trash bags)\n• 6 Yard: 6ft W × 5ft D × 6ft H (holds 50-60 trash bags)\n• 8 Yard: 6ft W × 6ft D × 7ft H (holds 70-80 trash bags)\n\nCapacities are based on standard 13-gallon trash bags."
        },
        {
          question: "How do I choose the right front load dumpster size?",
          answer: "Choose based on your weekly trash bag volume:\n\n• 2 Yard: 12-15 standard trash bags per week\n• 4 Yard: 30-40 standard trash bags per week\n• 6 Yard: 50-60 standard trash bags per week\n• 8 Yard: 70-80 standard trash bags per week\n\nCount your current weekly 13-gallon trash bag usage to determine the right size. Our team can help you right-size based on your actual waste generation."
        },
        {
          question: "Can I change my dumpster size after service starts?",
          answer: "Yes, most suppliers allow you to adjust container sizes based on your needs. There may be fees for container swaps, but this helps optimize your waste management costs and efficiency."
        }
      ]
    },
    {
      title: "Roll-Off Container Sizes",
      items: [
        {
          question: "What are the standard roll-off container sizes?",
          answer: "Roll-off containers come in three main sizes:\n\n• 20 Yard: 22ft L × 8ft W × 4ft H\n• 30 Yard: 22ft L × 8ft W × 6ft H\n• 40 Yard: 22ft L × 8ft W × 8ft H\n\nNote: 10-yard containers are also available for smaller projects. All containers are open-top for easy loading of construction debris, furniture, and bulk waste."
        },
        {
          question: "Which roll-off size do I need for my project?",
          answer: "Size depends on your project scope:\n• 10-20 yard: Small renovations, cleanouts, landscaping\n• 30 yard: Medium construction, large cleanouts, roofing\n• 40 yard: Major construction, commercial cleanouts, demolition\n\nConsider both volume and weight limits when selecting."
        },
        {
          question: "Are there weight limits on roll-off containers?",
          answer: "Yes, each container has weight limits typically ranging from 2-10 tons depending on size and waste type. Overage fees apply when limits are exceeded. Heavy materials like concrete or dirt may require smaller containers due to weight restrictions."
        }
      ]
    },
    {
      title: "Front Load Fee Terms",
      items: [
        {
          question: "What is a Fuel Surcharge?",
          answer: "A percentage fee added to your base rate due to fuel price fluctuations. This helps haulers manage rising transportation costs and is typically calculated as a percentage of your monthly service fee."
        },
        {
          question: "What is an Environmental Fee?",
          answer: "A charge for proper handling and disposal of waste per environmental regulations. This covers costs for landfill disposal, recycling processing, and compliance with local and federal environmental requirements."
        },
        {
          question: "What is a Rental Fee?",
          answer: "A recurring monthly charge for the ongoing use of the dumpster container. This covers the cost of providing and maintaining the physical container at your location."
        },
        {
          question: "What is an Extra Pickup Fee?",
          answer: "Charged for unscheduled or on-demand service pickups beyond your regular service schedule. This fee covers the additional trip and labor costs for special pickup requests."
        },
        {
          question: "What is an Overage Fee?",
          answer: "Charged when your waste volume exceeds the container capacity or weight limits for front load services. This fee covers additional disposal costs and may result in recommendations to upsize your container or increase pickup frequency."
        }
      ]
    },
    {
      title: "Roll-Off Fee Terms",
      items: [
        {
          question: "What is a Trip Charge?",
          answer: "Applied when a hauler arrives but cannot access the container due to blocked access, improper placement, or other site issues. This covers the cost of the unsuccessful trip."
        },
        {
          question: "What is an Overage Fee?",
          answer: "Charged when the container weight exceeds the included tonnage limit. This fee is typically calculated per ton over the limit and varies by waste type and local disposal costs."
        },
        {
          question: "What is a Service Cancellation Fee?",
          answer: "Applied when a scheduled service is cancelled within 24-48 hours of the planned pickup or delivery. This covers administrative costs and potential lost revenue from short-notice cancellations."
        },
        {
          question: "What is a Daily Rental Fee?",
          answer: "Charged after the standard rental window expires (typically after 7 or 14 days). This fee applies for each additional day the container remains on your property beyond the included rental period."
        }
      ]
    },
    {
      title: "Industry Terms & Definitions",
      items: [
        {
          question: "What is a Tip Fee?",
          answer: "The cost charged by landfills for waste disposal, typically calculated per ton. This fee varies by location and waste type and is often passed through to customers as part of disposal costs."
        },
        {
          question: "What does MSW mean?",
          answer: "Municipal Solid Waste — general waste collected from commercial and residential properties. This includes typical office trash, food waste, packaging materials, and other non-hazardous solid waste."
        },
        {
          question: "What's the difference between Front Load and Roll-Off services?",
          answer: "Front Load: Regular dumpster service for ongoing commercial waste with scheduled pickups. Roll-Off: Large containers for temporary debris removal during construction, renovation, or major cleanouts."
        },
        {
          question: "What is a Hauler?",
          answer: "A company that provides waste removal, recycling, or dumpster rental services. Haulers transport waste from your location to disposal facilities, transfer stations, or recycling centers."
        },
        {
          question: "What is Contamination in waste management?",
          answer: "Non-acceptable materials mixed in with recycling or composting waste streams. Examples include food waste in recycling bins or non-recyclable materials that can disrupt processing and increase costs."
        },
        {
          question: "What is Right-Sizing?",
          answer: "Adjusting service frequency or container size to optimize cost and efficiency. This process helps match your waste generation patterns with appropriate service levels to reduce costs and improve sustainability."
        },
        {
          question: "What is a Removal Fee?",
          answer: "A one-time fee for removing a front-load container from service. This covers the cost of picking up the container and any final processing when ending service at a location."
        },
        {
          question: "What is a Container Swap?",
          answer: "A fee charged when a customer requests a new empty roll-off container while retaining the same service schedule. This involves removing the full container and delivering a new empty one."
        },
        {
          question: "What is a Final Fee?",
          answer: "Typically refers to a final invoice or pickup fee at the conclusion of a project or contract. This may include final disposal costs, container removal, and any outstanding charges."
        },
        {
          question: "What is an Open Top container?",
          answer: "A type of roll-off dumpster without a lid, used for construction debris or bulky waste. The open design allows for easy loading of large items from the top."
        },
        {
          question: "What are the different types of Compactors?",
          answer: "• Stationary Compactor: Fixed unit that compresses waste into a detachable receiver box\n• Self-Contained Compactor: Single sealed unit ideal for wet waste\n• Vertical Compactor: Small footprint unit that compacts into front-load containers\n• Pre-crusher: Compacts waste before disposal to reduce volume"
        },
        {
          question: "What is a Tote or Roll Cart?",
          answer: "A small wheeled bin (typically 32-96 gallons) used for trash or recycling pickup. These are commonly used for smaller commercial properties or specialized waste streams."
        },
        {
          question: "What is a Baler?",
          answer: "A device used to compress recyclables like cardboard or plastic into dense bales for easier transport and processing. Balers help reduce volume and can generate revenue from recyclable materials."
        },
        {
          question: "What is a Lockbar?",
          answer: "A locking mechanism on a dumpster to prevent unauthorized dumping. This security feature helps control access and prevents illegal disposal that could increase your costs."
        },
        {
          question: "What are Casters?",
          answer: "Wheels attached to dumpsters to allow mobility, common on smaller front-load bins. Casters make it easier to move containers for cleaning or repositioning."
        },
        {
          question: "What is Single Stream Recycling?",
          answer: "A recycling method where all recyclables (paper, plastic, metal, glass) go into one container. Materials are sorted at the processing facility rather than at the source."
        },
        {
          question: "What is E-waste?",
          answer: "Electronic waste like computers, phones, TVs, or other electronic devices that require special handling due to hazardous components and valuable recoverable materials."
        },
        {
          question: "What is Hazardous Waste?",
          answer: "Waste containing harmful chemicals or materials that require regulated disposal, such as batteries, chemicals, paint, or medical waste. Special permits and handling procedures are required."
        },
        {
          question: "What is Commingled Waste?",
          answer: "Mixed materials that are not sorted at the source, which can include recyclables mixed with trash. This type of waste typically requires more expensive processing and disposal methods."
        }
      ]
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  let itemIndex = 0;

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
        <h1 className="text-lg font-medium">FAQ</h1>
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about Waste Geek services, container sizes, fees, and industry terminology.
          </p>
        </div>

        <div className="space-y-6">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="mb-3 text-green-600">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item) => {
                  const currentIndex = itemIndex++;
                  return (
                    <Card key={currentIndex} className="overflow-hidden">
                      <button
                        onClick={() => toggleExpanded(currentIndex)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium pr-4">{item.question}</span>
                        {expandedItems.includes(currentIndex) ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {expandedItems.includes(currentIndex) && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="text-muted-foreground pt-3 whitespace-pre-line">{item.answer}</div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="p-6 mt-6 bg-green-50 border-green-200">
          <h3 className="mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Our support team is here to help with any specific questions about waste management services.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">
            Contact Support
          </Button>
        </Card>
      </div>
    </div>
  );
}
import { Button } from "./ui/button";
import wasteGeekLogo from "figma:asset/e3f155299a5e4278bc7e7bc6f9775251fde10ae3.png";
import characterImage from "figma:asset/676eeee899b0f47cf5c7bc14e73d3a90564f40a1.png";

interface HomepageProps {
  onGetQuotes: () => void;
  onLogin: () => void;
}

export function Homepage({
  onGetQuotes,
  onLogin,
}: HomepageProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-6">
        <div className="w-8"></div> {/* Spacer for balance */}
        <div className="w-8"></div> {/* Spacer for balance */}
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-start px-6 text-center pt-20">
        {/* Large Centered Waste Geek Logo - slightly minimized */}
        <div className="flex justify-center mb-8">
          <img
            src={wasteGeekLogo}
            alt="Waste Geek"
            className="h-28 w-auto"
          />
        </div>

        {/* Character Image - minimized 2x */}
        <div className="flex justify-center mb-12">
          <img
            src={characterImage}
            alt="Frustrated office worker character"
            className="h-[18rem] w-auto max-w-full object-contain"
          />
        </div>

        <div className="mb-8">
          {/* New Tagline - positioned further down */}
          <div className="text-muted-foreground mb-8 text-lg text-center">
            <p>Modernizing Commercial Waste</p>
          </div>

          <Button
            onClick={onGetQuotes}
            className="w-full bg-green-600 hover:bg-green-700 mb-4"
          >
            Get Quotes
          </Button>

          <Button
            variant="outline"
            onClick={onLogin}
            className="w-full"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
}
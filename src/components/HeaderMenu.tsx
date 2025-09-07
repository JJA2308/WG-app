
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Menu, Home } from "lucide-react";

interface HeaderMenuProps {
  onReturnHome: () => void;
}

export function HeaderMenu({ onReturnHome }: HeaderMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1">
          <Menu className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onReturnHome} className="flex items-center gap-2">
          <Home className="w-4 h-4" />
          Return to Home Page
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
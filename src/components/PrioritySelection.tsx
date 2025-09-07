import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, GripVertical } from "lucide-react";
import { useState } from "react";

interface PrioritySelectionProps {
  onContinue: (priorities: string[]) => void;
  onBack: () => void;
}

export function PrioritySelection({ onContinue, onBack }: PrioritySelectionProps) {
  const [priorities, setPriorities] = useState([
    'Lowest Price',
    'Best Rating',
    'Shortest Contract Length',
    'Lowest Additional Fees',
    'Most Flexible Terms'
  ]);

  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    const newPriorities = [...priorities];
    const draggedPriority = newPriorities[draggedItem];
    
    // Remove the dragged item
    newPriorities.splice(draggedItem, 1);
    
    // Insert at new position
    if (dropIndex > draggedItem) {
      newPriorities.splice(dropIndex - 1, 0, draggedPriority);
    } else {
      newPriorities.splice(dropIndex, 0, draggedPriority);
    }
    
    setPriorities(newPriorities);
    setDraggedItem(null);
  };

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    const newPriorities = [...priorities];
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    
    if (toIndex < 0 || toIndex >= newPriorities.length) return;
    
    [newPriorities[fromIndex], newPriorities[toIndex]] = [newPriorities[toIndex], newPriorities[fromIndex]];
    setPriorities(newPriorities);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 pt-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1 text-center">Your Priorities</h2>
      </div>

      {/* Instructions */}
      <div className="px-6 pb-4">
        <p className="text-muted-foreground text-center">
          Drag to rank your priorities from most important (top) to least important (bottom). This will help us show you the best haulers first.
        </p>
      </div>

      {/* Priority List */}
      <div className="flex-1 px-6 overflow-y-auto">
        <div className="space-y-3">
          {priorities.map((priority, index) => (
            <Card 
              key={priority}
              className="p-4 cursor-move select-none transition-shadow hover:shadow-md"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4 w-4 hover:bg-gray-200"
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                  >
                    ▲
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-4 w-4 hover:bg-gray-200"
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === priorities.length - 1}
                  >
                    ▼
                  </Button>
                </div>
                
                <div className="flex items-center justify-between flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                    <span className="font-medium">{priority}</span>
                  </div>
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Button positioned close to priority list */}
        <div className="pt-6 pb-6">
          <Button 
            onClick={() => onContinue(priorities)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Find Matches
          </Button>
        </div>
      </div>
    </div>
  );
}
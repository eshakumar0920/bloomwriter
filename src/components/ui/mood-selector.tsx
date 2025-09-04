import { useState } from "react";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  value: number;
  onChange: (mood: number) => void;
  className?: string;
}

const moodLabels = [
  { value: 1, label: "Difficult", emoji: "😔" },
  { value: 2, label: "Challenging", emoji: "😐" },
  { value: 3, label: "Okay", emoji: "🙂" },
  { value: 4, label: "Good", emoji: "😊" },
  { value: 5, label: "Amazing", emoji: "🌟" },
];

const MoodSelector = ({ value, onChange, className }: MoodSelectorProps) => {
  const [hoveredMood, setHoveredMood] = useState<number | null>(null);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">How are you feeling?</h3>
        <p className="text-sm text-muted-foreground">
          {value ? moodLabels[value - 1]?.label : "Select your mood"}
        </p>
      </div>
      
      <div className="flex justify-center gap-2">
        {moodLabels.map((mood) => {
          const isSelected = value === mood.value;
          const isHovered = hoveredMood === mood.value;
          const shouldHighlight = isSelected || isHovered;
          
          return (
            <button
              key={mood.value}
              onClick={() => onChange(mood.value)}
              onMouseEnter={() => setHoveredMood(mood.value)}
              onMouseLeave={() => setHoveredMood(null)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300",
                "hover:scale-105 hover:shadow-gentle",
                shouldHighlight
                  ? "border-primary bg-primary/5 shadow-privacy"
                  : "border-border bg-card hover:border-primary/50"
              )}
              style={{
                borderColor: shouldHighlight ? `hsl(var(--mood-${mood.value}))` : undefined,
                backgroundColor: shouldHighlight ? `hsl(var(--mood-${mood.value}) / 0.1)` : undefined,
              }}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all duration-300",
                  shouldHighlight ? "scale-110" : ""
                )}
                style={{ backgroundColor: `hsl(var(--mood-${mood.value}))` }}
              >
                {mood.value}
              </div>
              <span className="text-xs font-medium text-center">
                {mood.emoji} {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, Heart, RefreshCw, ChevronRight } from "lucide-react";
import { JournalPrompt } from "@/lib/prompts";
import { cn } from "@/lib/utils";

interface PromptSuggestionsProps {
  prompts: JournalPrompt[];
  onSelectPrompt: (prompt: JournalPrompt) => void;
  onRefreshPrompts: () => void;
  className?: string;
}

const categoryIcons = {
  reflection: Lightbulb,
  mood: Heart,
  gratitude: Sparkles,
  growth: ChevronRight,
  stress: Heart,
  relationships: Heart,
  creativity: Sparkles,
};

const categoryColors = {
  reflection: 'bg-primary/10 text-primary border-primary/20',
  mood: 'bg-mood-3/10 text-mood-3 border-mood-3/20',
  gratitude: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  growth: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  stress: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
  relationships: 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
  creativity: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
};

const PromptSuggestions = ({ prompts, onSelectPrompt, onRefreshPrompts, className }: PromptSuggestionsProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSelectPrompt = (prompt: JournalPrompt) => {
    setSelectedPrompt(prompt.id);
    setTimeout(() => {
      onSelectPrompt(prompt);
      setSelectedPrompt(null);
    }, 200);
  };

  if (prompts.length === 0) return null;

  return (
    <Card className={cn("shadow-gentle border-primary/20 bg-gradient-subtle animate-fade-in", className)}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Writing Suggestions</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefreshPrompts}
            className="hover-scale"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Not sure what to write about? Here are some thoughtful prompts based on your recent entries:
        </p>
        
        <div className="space-y-3">
          {prompts.map((prompt, index) => {
            const Icon = categoryIcons[prompt.category];
            const isSelected = selectedPrompt === prompt.id;
            
            return (
              <div
                key={prompt.id}
                className={cn(
                  "group cursor-pointer transition-all duration-200 animate-fade-in hover-scale",
                  isSelected && "scale-95"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleSelectPrompt(prompt)}
              >
                <div className="p-4 bg-card/50 border border-border rounded-lg hover:border-primary/30 hover:bg-card/70 transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-relaxed group-hover:text-primary transition-colors">
                        {prompt.text}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs capitalize", categoryColors[prompt.category])}
                        >
                          {prompt.category}
                        </Badge>
                        
                        {prompt.context && (
                          <span className="text-xs text-muted-foreground">
                            • {prompt.context}
                          </span>
                        )}
                        
                        {prompt.followUp && (
                          <Badge variant="secondary" className="text-xs">
                            Follow-up
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            <Sparkles className="h-3 w-3 inline mr-1" />
            These prompts are personalized based on your writing patterns and mood
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptSuggestions;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodSelector from "@/components/ui/mood-selector";
import { Shield, Save, Calendar } from "lucide-react";
import { LocalStorage } from "@/lib/storage";
import { SentimentAnalyzer } from "@/lib/sentiment";
import { JournalEntry } from "@/types/journal";
import { useToast } from "@/hooks/use-toast";

const Journal = () => {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!text.trim()) {
      toast({
        title: "Entry Required",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate processing time for sentiment analysis
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const sentiment = SentimentAnalyzer.analyze(text);
      
      const entry: JournalEntry = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        text: text.trim(),
        mood,
        tags: sentiment.themes,
        sentiment: sentiment.score,
      };

      LocalStorage.saveEntry(entry);
      
      toast({
        title: "Entry Saved",
        description: "Your journal entry has been saved locally and securely.",
      });

      // Reset form
      setText("");
      setMood(3);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Calendar className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Daily Journal</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a moment to reflect on your day. Your thoughts are processed locally 
          and never leave your device.
        </p>
        
        {/* Privacy Reminder */}
        <div className="flex items-center justify-center gap-2 text-privacy-safe text-sm font-medium">
          <Shield className="h-4 w-4" />
          <span>End-to-end encrypted • Local storage only</span>
        </div>
      </div>

      {/* Journal Entry Form */}
      <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mood Selector */}
          <MoodSelector value={mood} onChange={setMood} />

          {/* Text Entry */}
          <div className="space-y-3">
            <label htmlFor="journal-text" className="text-lg font-semibold text-foreground block">
              What's on your mind?
            </label>
            <Textarea
              id="journal-text"
              placeholder="Write about your day, thoughts, feelings, or anything that comes to mind..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[200px] resize-none border-2 border-border focus:border-primary transition-colors"
              maxLength={5000}
            />
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Your entry will be analyzed for insights while staying completely private</span>
              <span>{text.length}/5000</span>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              disabled={isLoading || !text.trim()}
              className="bg-gradient-calm hover:bg-gradient-trust text-primary-foreground font-semibold px-8 py-6 text-lg shadow-privacy"
            >
              <Save className="h-5 w-5 mr-2" />
              {isLoading ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-accent/50 border-accent shadow-gentle">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-accent-foreground mb-3">Writing Tips</h3>
          <ul className="text-sm text-accent-foreground/80 space-y-2">
            <li>• Write freely without worrying about grammar or structure</li>
            <li>• Include both positive and challenging moments from your day</li>
            <li>• Try to capture specific details that made moments meaningful</li>
            <li>• Consider what you learned or how you grew today</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Journal;
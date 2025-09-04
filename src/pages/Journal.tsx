import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodSelector from "@/components/ui/mood-selector";
import PromptSuggestions from "@/components/ui/prompt-suggestions";
import { Shield, Save, Calendar, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { LocalStorage } from "@/lib/storage";
import { SentimentAnalyzer } from "@/lib/sentiment";
import { PromptGenerator } from "@/lib/prompts";
import { JournalEntry, JournalPrompt } from "@/types/journal";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-journaling.jpg";

const Journal = () => {
  const [text, setText] = useState("");
  const [mood, setMood] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const [prompts, setPrompts] = useState<JournalPrompt[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing entries and generate contextual prompts
    const existingEntries = LocalStorage.getEntries();
    setEntries(existingEntries);
    refreshPrompts(existingEntries);
  }, []);

  const refreshPrompts = (existingEntries?: JournalEntry[]) => {
    const currentEntries = existingEntries || entries;
    const contextualPrompts = PromptGenerator.getContextualPrompts(currentEntries, mood);
    setPrompts(contextualPrompts);
  };

  const handlePromptSelect = (prompt: JournalPrompt) => {
    setText(prev => {
      const newText = prev.length > 0 ? `${prev}\n\n${prompt.text}\n\n` : `${prompt.text}\n\n`;
      return newText;
    });
    setShowPrompts(false);
    
    toast({
      title: "Prompt added!",
      description: "Feel free to respond in your own words or take it in any direction.",
    });
  };

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

      // Reset form and refresh prompts
      setText("");
      setMood(3);
      setShowPrompts(true);
      
      const updatedEntries = LocalStorage.getEntries();
      setEntries(updatedEntries);
      refreshPrompts(updatedEntries);
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
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-8 w-16 h-16 bg-primary/5 rounded-full blur-2xl animate-float pointer-events-none" />
      <div className="absolute top-48 right-12 w-20 h-20 bg-accent/5 rounded-full blur-2xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/3 w-18 h-18 bg-primary/5 rounded-full blur-2xl animate-float pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex items-center justify-center gap-3 text-primary animate-glow">
            <div className="p-3 bg-primary/10 rounded-full animate-float">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold shimmer-text">
              Daily Journal
            </h1>
            <div className="w-24 h-1 bg-gradient-calm mx-auto rounded-full" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Take a moment to reflect on your day. Your thoughts are processed locally 
            and never leave your device.
          </p>
          
          {/* Enhanced Privacy Reminder */}
          <div className="flex items-center justify-center gap-3 text-privacy-safe text-sm font-medium bg-privacy-safe/5 backdrop-blur-sm border border-privacy-safe/20 rounded-full px-6 py-3 animate-fade-in hover-scale" style={{ animationDelay: '0.4s' }}>
            <Shield className="h-4 w-4 animate-pulse" />
            <span>Local-only processing • Your data never leaves this device</span>
          </div>
        </div>

        {/* Enhanced Journal Entry Form */}
        <Card className="shadow-float border-0 bg-card/90 backdrop-blur-lg animate-scale-in glass-effect" style={{ animationDelay: '0.6s' }}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl bg-gradient-calm bg-clip-text text-transparent">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Enhanced Mood Selector */}
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <MoodSelector 
                value={mood} 
                onChange={(newMood) => {
                  setMood(newMood);
                  // Refresh prompts when mood changes
                  setTimeout(() => refreshPrompts(), 100);
                }} 
              />
            </div>

            {/* Dynamic Prompt Suggestions */}
            {showPrompts && prompts.length > 0 && (
              <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
                <PromptSuggestions
                  prompts={prompts}
                  onSelectPrompt={handlePromptSelect}
                  onRefreshPrompts={() => refreshPrompts()}
                />
              </div>
            )}

            {/* Toggle Prompts Button */}
            {!showPrompts && (
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
                <Button
                  variant="ghost"
                  onClick={() => setShowPrompts(true)}
                  className="text-primary hover:bg-primary/10"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Show writing suggestions
                </Button>
              </div>
            )}

            {/* Enhanced Text Entry */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <label htmlFor="journal-text" className="text-lg font-semibold text-foreground block flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                What's on your mind?
              </label>
              <Textarea
                id="journal-text"
                placeholder={text.length === 0 ? "Start writing here, or choose a prompt above to get started..." : ""}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px] resize-none border-2 border-border focus:border-primary transition-all duration-300 focus:shadow-privacy backdrop-blur-sm bg-background/50"
                maxLength={5000}
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Your entry will be analyzed for insights while staying completely private
                </span>
                <span className={`font-medium ${text.length > 4500 ? 'text-destructive' : text.length > 4000 ? 'text-yellow-500' : ''}`}>
                  {text.length}/5000
                </span>
              </div>
            </div>

            {/* Enhanced Save Button */}
            <div className="flex justify-center animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <Button
                onClick={handleSave}
                disabled={isLoading || !text.trim()}
                className="bg-gradient-calm hover:bg-gradient-trust text-primary-foreground font-semibold px-8 py-6 text-lg shadow-privacy hover-scale group relative overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <Save className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>{isLoading ? "Saving..." : "Save Entry"}</span>
                  {!isLoading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Tips */}
        <Card className="bg-accent/30 border-accent/30 shadow-gentle backdrop-blur-sm animate-fade-in hover-scale" style={{ animationDelay: '1.6s' }}>
          <CardContent className="pt-6">
            <h3 className="font-semibold text-accent-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Writing Tips for Deeper Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm text-accent-foreground/90">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Write freely without worrying about grammar or structure</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-accent-foreground/90">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Include both positive and challenging moments</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-accent-foreground/90">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Capture specific details that made moments meaningful</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-accent-foreground/90">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span>Consider what you learned or how you grew today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Journal;
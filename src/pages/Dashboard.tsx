import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import WeeklySummary from "@/components/ui/weekly-summary";
import PasswordProtection from "@/components/ui/password-protection";
import { BarChart3, TrendingUp, Calendar, Tag, Sparkles, Users, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { LocalStorage } from "@/lib/storage";
import { SentimentAnalyzer } from "@/lib/sentiment";
import { InsightGenerator, WeeklyInsight } from "@/lib/insights";
import { JournalEntry } from "@/types/journal";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'7' | '30'>('30');
  const [weeklyInsight, setWeeklyInsight] = useState<WeeklyInsight | null>(null);
  const [showWeeklySummary, setShowWeeklySummary] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = localStorage.getItem("bloomwriter-authenticated") === "true";
    setIsAuthenticated(authenticated);

    if (authenticated) {
      const allEntries = LocalStorage.getEntries();
      setEntries(allEntries);
      
      // Check if we should show weekly summary
      const lastWeekStart = getLastWeekStart();
      const weekInsight = InsightGenerator.generateWeeklyInsights(allEntries, lastWeekStart);
      
      if (weekInsight.totalEntries > 0) {
        setWeeklyInsight(weekInsight);
        setShowWeeklySummary(true);
      }
    }
  }, [isAuthenticated]);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const getLastWeekStart = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) - 7; // Last Monday
    return new Date(now.setDate(diff));
  };

  const filteredEntries = entries.filter(entry => {
    const daysAgo = parseInt(selectedPeriod);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysAgo);
    return new Date(entry.createdAt) >= cutoff;
  });

  const averageMood = filteredEntries.length > 0 
    ? filteredEntries.reduce((sum, entry) => sum + entry.mood, 0) / filteredEntries.length 
    : 0;

  const averageSentiment = filteredEntries.length > 0
    ? filteredEntries.reduce((sum, entry) => sum + entry.sentiment, 0) / filteredEntries.length
    : 0;

  const allTags = filteredEntries.flatMap(entry => entry.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8);

  const getMoodColor = (mood: number) => {
    return `hsl(var(--mood-${mood}))`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Show password protection if not authenticated
  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Weekly Summary */}
      {showWeeklySummary && weeklyInsight && (
        <WeeklySummary
          insight={weeklyInsight}
          onDismiss={() => setShowWeeklySummary(false)}
        />
      )}
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-primary">
          <BarChart3 className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Your Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover patterns in your thoughts and feelings with privacy-first analytics.
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex justify-center gap-2">
        <Button
          variant={selectedPeriod === '7' ? 'default' : 'outline'}
          onClick={() => setSelectedPeriod('7')}
          className="shadow-gentle"
        >
          Last 7 Days
        </Button>
        <Button
          variant={selectedPeriod === '30' ? 'default' : 'outline'}
          onClick={() => setSelectedPeriod('30')}
          className="shadow-gentle"
        >
          Last 30 Days
        </Button>
      </div>

      {filteredEntries.length === 0 ? (
        <Card className="text-center py-12 shadow-gentle">
          <CardContent>
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Entries Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start journaling to see your personal insights and patterns.
            </p>
            <Link to="/journal">
              <Button variant="default" className="bg-gradient-calm">
                Write Your First Entry
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Mood Overview */}
          <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Average Mood
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-privacy"
                  style={{ backgroundColor: getMoodColor(Math.round(averageMood)) }}
                >
                  {averageMood.toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Analysis */}
          <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                Sentiment Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold" style={{ 
                  color: SentimentAnalyzer.getSentimentColor(averageSentiment) 
                }}>
                  {SentimentAnalyzer.getSentimentLabel(averageSentiment)}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((averageSentiment + 1) / 2) * 100}%`,
                      backgroundColor: SentimentAnalyzer.getSentimentColor(averageSentiment)
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Score: {averageSentiment.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Entry Count */}
          <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-primary" />
                Journal Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">
                  {filteredEntries.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  {filteredEntries.length === 1 ? 'entry' : 'entries'} in the last {selectedPeriod} days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Themes & Tags */}
      {topTags.length > 0 && (
        <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" />
              Common Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topTags.map(([tag, count]) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium capitalize shadow-gentle"
                >
                  {tag} ({count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Entries */}
      {filteredEntries.length > 0 && (
        <Card className="shadow-float border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(entry.createdAt)}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: getMoodColor(entry.mood) }}
                      >
                        {entry.mood}
                      </div>
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${SentimentAnalyzer.getSentimentColor(entry.sentiment)}20`,
                          color: SentimentAnalyzer.getSentimentColor(entry.sentiment)
                        }}
                      >
                        {SentimentAnalyzer.getSentimentLabel(entry.sentiment)}
                      </span>
                    </div>
                  </div>
                  <p className="text-foreground line-clamp-3">
                    {entry.text.length > 150 
                      ? `${entry.text.substring(0, 150)}...` 
                      : entry.text
                    }
                  </p>
                  {entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
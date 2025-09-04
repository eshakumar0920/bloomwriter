import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  TrendingUp, 
  Lightbulb, 
  Star, 
  Target,
  Sparkles,
  Heart,
  ArrowRight,
  Award
} from "lucide-react";
import { WeeklyInsight } from "@/lib/insights";
import { SentimentAnalyzer } from "@/lib/sentiment";
import { cn } from "@/lib/utils";

interface WeeklySummaryProps {
  insight: WeeklyInsight;
  onDismiss?: () => void;
  className?: string;
}

const patternIcons = {
  'mood-activity': TrendingUp,
  'time-pattern': Calendar,
  'theme-correlation': Heart,
  'growth-trend': Star,
};

const WeeklySummary = ({ insight, onDismiss, className }: WeeklySummaryProps) => {
  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  return (
    <Card className={cn("shadow-float border-0 bg-gradient-trust text-primary-foreground overflow-hidden animate-scale-in", className)}>
      {/* Header */}
      <CardHeader className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full -mr-16 -mt-16" />
        <div className="relative z-10">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <Award className="h-5 w-5" />
            </div>
            Weekly Reflection
          </CardTitle>
          <p className="text-primary-foreground/80 mt-2">
            {formatDateRange(insight.weekStart, insight.weekEnd)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Celebration Text */}
        {insight.celebrateText && (
          <div className="bg-primary-foreground/10 rounded-lg p-4 animate-fade-in">
            <p className="text-primary-foreground font-medium leading-relaxed">
              {insight.celebrateText}
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center">
            <div className="text-2xl font-bold">{insight.totalEntries}</div>
            <div className="text-sm text-primary-foreground/70">Entries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{insight.averageMood.toFixed(1)}</div>
            <div className="text-sm text-primary-foreground/70">Avg Mood</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{insight.topThemes.length}</div>
            <div className="text-sm text-primary-foreground/70">Themes</div>
          </div>
        </div>

        {/* Top Themes */}
        {insight.topThemes.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              What's been on your mind
            </h4>
            <div className="flex flex-wrap gap-2">
              {insight.topThemes.slice(0, 5).map((theme) => (
                <Badge 
                  key={theme}
                  variant="secondary"
                  className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 capitalize"
                >
                  {theme}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Patterns & Insights */}
        {insight.patterns.length > 0 && (
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Patterns I noticed
            </h4>
            {insight.patterns.slice(0, 2).map((pattern, index) => {
              const Icon = patternIcons[pattern.type];
              return (
                <div key={index} className="bg-primary-foreground/10 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <Icon className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="font-medium mb-1">{pattern.title}</h5>
                      <p className="text-sm text-primary-foreground/80 leading-relaxed">
                        {pattern.description}
                      </p>
                      {pattern.actionable && (
                        <p className="text-sm text-primary-foreground/90 mt-2 font-medium">
                          💡 {pattern.actionable}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Growth Moments */}
        {insight.growthMoments.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Moments of growth
            </h4>
            <div className="space-y-2">
              {insight.growthMoments.slice(0, 2).map((moment, index) => (
                <div key={index} className="bg-primary-foreground/5 rounded-lg p-3 border border-primary-foreground/20">
                  <p className="text-sm italic text-primary-foreground/90 leading-relaxed">
                    {moment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {insight.suggestions.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              For the week ahead
            </h4>
            <div className="space-y-2">
              {insight.suggestions.slice(0, 2).map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-foreground/60" />
                  <p className="text-sm text-primary-foreground/90 leading-relaxed">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dismiss Button */}
        {onDismiss && (
          <div className="flex justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              variant="secondary"
              onClick={onDismiss}
              className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30"
            >
              Thanks for the insights!
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeeklySummary;
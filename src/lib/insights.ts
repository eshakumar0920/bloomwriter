import { JournalEntry, WeeklySummary } from "@/types/journal";
import { SentimentAnalyzer } from "./sentiment";

export interface InsightPattern {
  type: 'mood-activity' | 'time-pattern' | 'theme-correlation' | 'growth-trend';
  title: string;
  description: string;
  confidence: number; // 0-1
  actionable?: string;
  data?: any;
}

export interface WeeklyInsight {
  weekStart: Date;
  weekEnd: Date;
  totalEntries: number;
  averageMood: number;
  averageSentiment: number;
  topThemes: string[];
  patterns: InsightPattern[];
  growthMoments: string[];
  suggestions: string[];
  celebrateText?: string;
}

export class InsightGenerator {
  static generateWeeklyInsights(entries: JournalEntry[], weekStart: Date): WeeklyInsight {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const weekEntries = entries.filter(entry => {
      const entryDate = new Date(entry.createdAt);
      return entryDate >= weekStart && entryDate <= weekEnd;
    });

    if (weekEntries.length === 0) {
      return this.createEmptyWeekInsight(weekStart, weekEnd);
    }

    const averageMood = weekEntries.reduce((sum, e) => sum + e.mood, 0) / weekEntries.length;
    const averageSentiment = weekEntries.reduce((sum, e) => sum + e.sentiment, 0) / weekEntries.length;
    
    const allThemes = weekEntries.flatMap(e => e.tags);
    const topThemes = this.getTopThemes(allThemes, 5);
    
    const patterns = this.detectPatterns(weekEntries, entries);
    const growthMoments = this.identifyGrowthMoments(weekEntries);
    const suggestions = this.generateActionableSuggestions(patterns, averageMood, topThemes);
    const celebrateText = this.generateCelebrationText(weekEntries, averageMood);

    return {
      weekStart,
      weekEnd,
      totalEntries: weekEntries.length,
      averageMood,
      averageSentiment,
      topThemes,
      patterns,
      growthMoments,
      suggestions,
      celebrateText
    };
  }

  private static detectPatterns(weekEntries: JournalEntry[], allEntries: JournalEntry[]): InsightPattern[] {
    const patterns: InsightPattern[] = [];
    
    // Time pattern analysis
    const timePattern = this.analyzeTimePatterns(weekEntries);
    if (timePattern) patterns.push(timePattern);
    
    // Mood-activity correlations
    const moodActivityPattern = this.analyzeMoodActivityCorrelations(weekEntries);
    if (moodActivityPattern) patterns.push(moodActivityPattern);
    
    // Theme correlations with sentiment
    const themePattern = this.analyzeThemeSentimentCorrelations(weekEntries);
    if (themePattern) patterns.push(themePattern);
    
    // Growth trend analysis
    const growthPattern = this.analyzeGrowthTrends(allEntries.slice(0, 30)); // Last 30 entries
    if (growthPattern) patterns.push(growthPattern);
    
    return patterns;
  }

  private static analyzeTimePatterns(entries: JournalEntry[]): InsightPattern | null {
    const timeSlots = { morning: [], afternoon: [], evening: [] };
    
    entries.forEach(entry => {
      const hour = new Date(entry.createdAt).getHours();
      if (hour < 12) timeSlots.morning.push(entry);
      else if (hour < 18) timeSlots.afternoon.push(entry);
      else timeSlots.evening.push(entry);
    });

    const avgMoods = {
      morning: this.avgMood(timeSlots.morning),
      afternoon: this.avgMood(timeSlots.afternoon),
      evening: this.avgMood(timeSlots.evening)
    };

    const bestTime = Object.entries(avgMoods).reduce((a, b) => 
      avgMoods[a[0]] > avgMoods[b[0]] ? a : b
    )[0];

    const bestMood = avgMoods[bestTime];
    const worstTime = Object.entries(avgMoods).reduce((a, b) => 
      avgMoods[a[0]] < avgMoods[b[0]] ? a : b
    )[0];

    if (bestMood > 3.2 && bestMood - avgMoods[worstTime] > 0.5) {
      return {
        type: 'time-pattern',
        title: `Your ${bestTime} energy`,
        description: `You tend to feel most positive during ${bestTime} hours (average mood: ${bestMood.toFixed(1)}/5).`,
        confidence: 0.8,
        actionable: `Consider scheduling important activities or self-care during your ${bestTime} energy peak.`
      };
    }

    return null;
  }

  private static analyzeMoodActivityCorrelations(entries: JournalEntry[]): InsightPattern | null {
    const activityKeywords = {
      'exercise': ['walk', 'run', 'gym', 'workout', 'exercise', 'bike', 'yoga', 'swim'],
      'social': ['friend', 'family', 'dinner', 'coffee', 'meet', 'visit', 'call', 'chat'],
      'creative': ['write', 'draw', 'paint', 'music', 'create', 'design', 'art', 'photo'],
      'nature': ['park', 'garden', 'outside', 'nature', 'tree', 'sun', 'walk', 'fresh air'],
      'rest': ['sleep', 'nap', 'rest', 'relax', 'bath', 'read', 'meditate', 'quiet']
    };

    const correlations: Record<string, { moods: number[], count: number }> = {};

    entries.forEach(entry => {
      const words = entry.text.toLowerCase().split(/\W+/);
      
      Object.entries(activityKeywords).forEach(([activity, keywords]) => {
        const hasActivity = keywords.some(keyword => words.includes(keyword));
        if (hasActivity) {
          if (!correlations[activity]) {
            correlations[activity] = { moods: [], count: 0 };
          }
          correlations[activity].moods.push(entry.mood);
          correlations[activity].count++;
        }
      });
    });

    let bestActivity = null;
    let bestAvgMood = 0;

    Object.entries(correlations).forEach(([activity, data]) => {
      if (data.count >= 2) { // Need at least 2 instances
        const avgMood = data.moods.reduce((sum, mood) => sum + mood, 0) / data.moods.length;
        if (avgMood > bestAvgMood) {
          bestAvgMood = avgMood;
          bestActivity = activity;
        }
      }
    });

    if (bestActivity && bestAvgMood > 3.5) {
      const count = correlations[bestActivity].count;
      return {
        type: 'mood-activity',
        title: `${bestActivity} boosts your mood`,
        description: `When you mentioned ${bestActivity} in your entries, your average mood was ${bestAvgMood.toFixed(1)}/5 (${count} times this week).`,
        confidence: Math.min(count / 5, 1), // Higher confidence with more instances
        actionable: `Try to incorporate more ${bestActivity} into your routine for better wellbeing.`
      };
    }

    return null;
  }

  private static analyzeThemeSentimentCorrelations(entries: JournalEntry[]): InsightPattern | null {
    const themeData: Record<string, number[]> = {};
    
    entries.forEach(entry => {
      entry.tags.forEach(tag => {
        if (!themeData[tag]) themeData[tag] = [];
        themeData[tag].push(entry.sentiment);
      });
    });

    let mostPositiveTheme = null;
    let highestSentiment = -1;

    Object.entries(themeData).forEach(([theme, sentiments]) => {
      if (sentiments.length >= 2) {
        const avg = sentiments.reduce((sum, s) => sum + s, 0) / sentiments.length;
        if (avg > highestSentiment) {
          highestSentiment = avg;
          mostPositiveTheme = theme;
        }
      }
    });

    if (mostPositiveTheme && highestSentiment > 0.3) {
      return {
        type: 'theme-correlation',
        title: `${mostPositiveTheme} brings you joy`,
        description: `Your entries about ${mostPositiveTheme} show consistently positive sentiment (${SentimentAnalyzer.getSentimentLabel(highestSentiment)}).`,
        confidence: 0.7,
        actionable: `Consider exploring more opportunities related to ${mostPositiveTheme}.`
      };
    }

    return null;
  }

  private static analyzeGrowthTrends(recentEntries: JournalEntry[]): InsightPattern | null {
    if (recentEntries.length < 10) return null;

    const growthKeywords = ['learn', 'grow', 'improve', 'better', 'progress', 'achieve', 'goal', 'challenge', 'overcome'];
    const growthEntries = recentEntries.filter(entry => 
      growthKeywords.some(keyword => entry.text.toLowerCase().includes(keyword))
    );

    if (growthEntries.length >= 3) {
      const growthRate = growthEntries.length / recentEntries.length;
      
      return {
        type: 'growth-trend',
        title: 'You\'re in a growth mindset',
        description: `${(growthRate * 100).toFixed(0)}% of your recent entries mention learning or personal development.`,
        confidence: 0.9,
        actionable: 'Keep nurturing this growth mindset - it\'s a powerful foundation for positive change.'
      };
    }

    return null;
  }

  private static identifyGrowthMoments(entries: JournalEntry[]): string[] {
    const moments: string[] = [];
    
    entries.forEach(entry => {
      const text = entry.text;
      const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
      
      sentences.forEach(sentence => {
        if (this.isGrowthMoment(sentence)) {
          moments.push(`"${sentence.length > 100 ? sentence.substring(0, 100) + '...' : sentence}"`);
        }
      });
    });

    return moments.slice(0, 3); // Top 3 growth moments
  }

  private static isGrowthMoment(sentence: string): boolean {
    const growthPatterns = [
      /i (learned|realized|discovered|understood)/i,
      /i feel (stronger|better|more confident|proud)/i,
      /i (overcame|handled|managed|dealt with)/i,
      /i\'m (grateful|thankful|appreciative)/i,
      /it made me (realize|think|feel)/i
    ];

    return growthPatterns.some(pattern => pattern.test(sentence)) && sentence.length > 20;
  }

  private static generateActionableSuggestions(patterns: InsightPattern[], avgMood: number, themes: string[]): string[] {
    const suggestions: string[] = [];
    
    // Add pattern-based suggestions
    patterns.forEach(pattern => {
      if (pattern.actionable) {
        suggestions.push(pattern.actionable);
      }
    });

    // Add mood-based suggestions
    if (avgMood < 3) {
      suggestions.push("Consider reaching out to a friend or family member - connection can lift your spirits.");
      suggestions.push("Try a 5-minute mindfulness exercise when you feel overwhelmed.");
    } else if (avgMood > 4) {
      suggestions.push("You're in a positive space - this might be a good time to tackle a challenge you've been putting off.");
    }

    // Add theme-based suggestions
    if (themes.includes('work') && !themes.includes('rest')) {
      suggestions.push("You've been thinking about work a lot. Make sure to schedule some dedicated rest time.");
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }

  private static generateCelebrationText(entries: JournalEntry[], avgMood: number): string {
    if (entries.length >= 5) {
      return `Amazing dedication! You journaled ${entries.length} times this week. That's real commitment to your wellbeing. 🌟`;
    } else if (entries.length >= 3) {
      return `Great consistency! ${entries.length} entries this week shows you're building a healthy habit. 💪`;
    } else if (avgMood >= 4) {
      return `Your positive energy this week has been wonderful to witness. Keep shining! ✨`;
    } else {
      return `Thank you for taking time to reflect, even when things felt challenging. That takes real courage. 💙`;
    }
  }

  private static avgMood(entries: JournalEntry[]): number {
    if (entries.length === 0) return 0;
    return entries.reduce((sum, e) => sum + e.mood, 0) / entries.length;
  }

  private static getTopThemes(themes: string[], limit: number): string[] {
    const themeCounts = themes.reduce((acc, theme) => {
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(themeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([theme]) => theme);
  }

  private static createEmptyWeekInsight(weekStart: Date, weekEnd: Date): WeeklyInsight {
    return {
      weekStart,
      weekEnd,
      totalEntries: 0,
      averageMood: 0,
      averageSentiment: 0,
      topThemes: [],
      patterns: [],
      growthMoments: [],
      suggestions: [
        "This week is a fresh start - try writing about one small thing you're grateful for.",
        "Consider setting a gentle reminder to check in with yourself each day.",
        "Remember: even a few sentences can be a meaningful journal entry."
      ]
    };
  }
}
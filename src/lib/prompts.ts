import { JournalEntry } from "@/types/journal";
import { SentimentAnalyzer } from "./sentiment";

export interface JournalPrompt {
  id: string;
  text: string;
  category: 'reflection' | 'mood' | 'gratitude' | 'growth' | 'stress' | 'relationships' | 'creativity';
  context?: string;
  followUp?: boolean;
}

export class PromptGenerator {
  private static basePrompts: Record<string, JournalPrompt[]> = {
    morning: [
      {
        id: 'morning_intention',
        text: "What's one thing you're looking forward to today?",
        category: 'reflection'
      },
      {
        id: 'morning_energy',
        text: "How are you feeling as you start this day? What's contributing to that feeling?",
        category: 'mood'
      },
      {
        id: 'morning_gratitude',
        text: "What's something small that you're grateful for right now?",
        category: 'gratitude'
      }
    ],
    evening: [
      {
        id: 'evening_highlight',
        text: "What was the highlight of your day? Why did it stand out?",
        category: 'reflection'
      },
      {
        id: 'evening_growth',
        text: "What's one thing you learned about yourself today?",
        category: 'growth'
      },
      {
        id: 'evening_release',
        text: "What would you like to let go of from today?",
        category: 'stress'
      }
    ],
    stressed: [
      {
        id: 'stress_coping',
        text: "When you felt overwhelmed today, what helped you find your center?",
        category: 'stress'
      },
      {
        id: 'stress_support',
        text: "Who or what brought you comfort when things felt difficult?",
        category: 'relationships'
      },
      {
        id: 'stress_breathing',
        text: "Take three deep breaths. How does your body feel right now?",
        category: 'mood'
      }
    ],
    happy: [
      {
        id: 'happy_share',
        text: "Your energy feels positive today! What's bringing you joy?",
        category: 'mood'
      },
      {
        id: 'happy_spread',
        text: "How did you share your good mood with others today?",
        category: 'relationships'
      },
      {
        id: 'happy_savor',
        text: "What moment from today do you want to remember and savor?",
        category: 'gratitude'
      }
    ],
    creative: [
      {
        id: 'creative_inspiration',
        text: "What sparked your imagination today?",
        category: 'creativity'
      },
      {
        id: 'creative_expression',
        text: "If you could create something to capture today's feeling, what would it be?",
        category: 'creativity'
      }
    ]
  };

  static getContextualPrompts(entries: JournalEntry[], currentMood?: number): JournalPrompt[] {
    const prompts: JournalPrompt[] = [];
    const recentEntries = entries.slice(0, 7); // Last 7 entries
    const timeOfDay = this.getTimeOfDay();
    
    // Time-based prompts
    if (timeOfDay === 'morning') {
      prompts.push(...this.basePrompts.morning.slice(0, 2));
    } else if (timeOfDay === 'evening') {
      prompts.push(...this.basePrompts.evening.slice(0, 2));
    }

    // Mood-based prompts
    if (currentMood) {
      if (currentMood <= 2) {
        prompts.push(...this.basePrompts.stressed.slice(0, 2));
      } else if (currentMood >= 4) {
        prompts.push(...this.basePrompts.happy.slice(0, 2));
      }
    }

    // Context-aware prompts based on recent entries
    const contextPrompts = this.generateContextAwarePrompts(recentEntries);
    prompts.push(...contextPrompts);

    // Add creative prompts occasionally
    if (Math.random() > 0.7) {
      prompts.push(this.basePrompts.creative[Math.floor(Math.random() * this.basePrompts.creative.length)]);
    }

    return this.shuffleAndLimit(prompts, 4);
  }

  private static generateContextAwarePrompts(entries: JournalEntry[]): JournalPrompt[] {
    const prompts: JournalPrompt[] = [];
    
    if (entries.length === 0) {
      return [
        {
          id: 'first_time',
          text: "Welcome to your journaling journey! What brings you here today?",
          category: 'reflection',
          context: "First-time user"
        }
      ];
    }

    // Analyze recent patterns
    const recentThemes = this.analyzeRecentThemes(entries);
    const sentimentTrend = this.analyzeSentimentTrend(entries);
    
    // Generate prompts based on patterns
    if (recentThemes.includes('work') || recentThemes.includes('job')) {
      prompts.push({
        id: 'work_followup',
        text: "You've been thinking about work lately. How has your work-life balance felt this week?",
        category: 'stress',
        context: "Recent work mentions",
        followUp: true
      });
    }

    if (recentThemes.includes('relationships') || recentThemes.includes('family')) {
      prompts.push({
        id: 'relationship_check',
        text: "I notice you've been reflecting on relationships. Which connection brought you the most joy recently?",
        category: 'relationships',
        context: "Recent relationship focus",
        followUp: true
      });
    }

    if (sentimentTrend === 'improving') {
      prompts.push({
        id: 'momentum_positive',
        text: "Your recent entries show growing positivity. What's been helping you feel more optimistic?",
        category: 'growth',
        context: "Improving sentiment trend",
        followUp: true
      });
    } else if (sentimentTrend === 'declining') {
      prompts.push({
        id: 'support_gentle',
        text: "It seems like things have been challenging lately. What's one small thing that brought you comfort today?",
        category: 'stress',
        context: "Declining sentiment trend",
        followUp: true
      });
    }

    // Check for gaps in journaling
    const daysSinceLastEntry = this.daysSinceLastEntry(entries);
    if (daysSinceLastEntry > 3) {
      prompts.push({
        id: 'welcome_back',
        text: "Welcome back! What's been on your mind since you last wrote?",
        category: 'reflection',
        context: "Returning after break"
      });
    }

    return prompts;
  }

  private static analyzeRecentThemes(entries: JournalEntry[]): string[] {
    const allTags = entries.slice(0, 5).flatMap(entry => entry.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(tagCounts)
      .filter(([_, count]) => count >= 2)
      .map(([tag, _]) => tag);
  }

  private static analyzeSentimentTrend(entries: JournalEntry[]): 'improving' | 'declining' | 'stable' {
    if (entries.length < 3) return 'stable';
    
    const recent = entries.slice(0, 3).map(e => e.sentiment);
    const older = entries.slice(3, 6).map(e => e.sentiment);
    
    const recentAvg = recent.reduce((sum, s) => sum + s, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, s) => sum + s, 0) / older.length : recentAvg;
    
    const difference = recentAvg - olderAvg;
    
    if (difference > 0.1) return 'improving';
    if (difference < -0.1) return 'declining';
    return 'stable';
  }

  private static daysSinceLastEntry(entries: JournalEntry[]): number {
    if (entries.length === 0) return 0;
    
    const lastEntry = entries[0];
    const now = new Date();
    const lastDate = new Date(lastEntry.createdAt);
    
    return Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  private static getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  private static shuffleAndLimit(prompts: JournalPrompt[], limit: number): JournalPrompt[] {
    const unique = prompts.filter((prompt, index, self) => 
      index === self.findIndex(p => p.id === prompt.id)
    );
    
    const shuffled = [...unique].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }

  static getRandomPrompt(): JournalPrompt {
    const allPrompts = [
      ...this.basePrompts.morning,
      ...this.basePrompts.evening,
      ...this.basePrompts.creative
    ];
    return allPrompts[Math.floor(Math.random() * allPrompts.length)];
  }
}
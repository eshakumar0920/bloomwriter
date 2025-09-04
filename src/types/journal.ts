export interface JournalEntry {
  id: string;
  createdAt: Date;
  text: string;
  mood: number; // 1-5 scale
  tags: string[];
  sentiment: number; // -1 to 1 scale
}

export interface WeeklySummary {
  weekStart: Date;
  themes: string[];
  suggestions: string[];
  averageMood: number;
  totalEntries: number;
}

export interface AppSettings {
  localOnly: boolean;
  e2eeEnabled: boolean;
  passphraseSalt?: string;
  dailyReminder: boolean;
  reminderTime?: string;
  privacyMode: boolean;
}

export interface JournalPrompt {
  id: string;
  text: string;
  category: 'reflection' | 'mood' | 'gratitude' | 'growth' | 'stress' | 'relationships' | 'creativity';
  context?: string;
  followUp?: boolean;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  keywords: string[];
  themes: string[];
}
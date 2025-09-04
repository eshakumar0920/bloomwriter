import { SentimentAnalysis } from "@/types/journal";

// Simple keyword-based sentiment analysis
const POSITIVE_KEYWORDS = [
  'happy', 'joy', 'excited', 'grateful', 'amazing', 'wonderful', 'great', 'fantastic', 
  'love', 'peaceful', 'calm', 'content', 'accomplished', 'proud', 'successful', 'blessed',
  'beautiful', 'perfect', 'excellent', 'awesome', 'brilliant', 'incredible', 'outstanding'
];

const NEGATIVE_KEYWORDS = [
  'sad', 'angry', 'frustrated', 'worried', 'anxious', 'stressed', 'tired', 'exhausted',
  'disappointed', 'hurt', 'lonely', 'overwhelmed', 'difficult', 'challenging', 'hard',
  'terrible', 'awful', 'horrible', 'upset', 'depressed', 'broken', 'devastated'
];

const THEME_KEYWORDS = {
  work: ['work', 'job', 'career', 'office', 'meeting', 'project', 'deadline', 'boss', 'colleague'],
  relationships: ['friend', 'family', 'partner', 'relationship', 'love', 'together', 'conversation'],
  health: ['exercise', 'gym', 'run', 'walk', 'healthy', 'doctor', 'sleep', 'tired', 'energy'],
  creativity: ['create', 'art', 'music', 'write', 'design', 'paint', 'draw', 'inspire', 'idea'],
  travel: ['trip', 'travel', 'vacation', 'journey', 'explore', 'adventure', 'visit', 'destination'],
  growth: ['learn', 'grow', 'develop', 'improve', 'progress', 'goal', 'achieve', 'challenge'],
  gratitude: ['grateful', 'thankful', 'blessed', 'appreciate', 'fortunate', 'lucky', 'gift'],
  nature: ['outside', 'nature', 'garden', 'tree', 'sky', 'sun', 'rain', 'weather', 'fresh']
};

export class SentimentAnalyzer {
  static analyze(text: string): SentimentAnalysis {
    const words = text.toLowerCase().split(/\W+/).filter(word => word.length > 2);
    
    let positiveScore = 0;
    let negativeScore = 0;
    const keywords: string[] = [];
    const themes: string[] = [];

    // Calculate sentiment
    words.forEach(word => {
      if (POSITIVE_KEYWORDS.includes(word)) {
        positiveScore++;
        keywords.push(word);
      }
      if (NEGATIVE_KEYWORDS.includes(word)) {
        negativeScore++;
        keywords.push(word);
      }
    });

    // Identify themes
    Object.entries(THEME_KEYWORDS).forEach(([theme, themeWords]) => {
      const matches = words.filter(word => themeWords.includes(word));
      if (matches.length > 0) {
        themes.push(theme);
      }
    });

    // Calculate final sentiment score (-1 to 1)
    const totalWords = Math.max(words.length, 1);
    const sentimentScore = (positiveScore - negativeScore) / totalWords;
    
    // Normalize to -1 to 1 range
    const normalizedScore = Math.max(-1, Math.min(1, sentimentScore * 5));

    return {
      score: Number(normalizedScore.toFixed(2)),
      keywords: [...new Set(keywords)], // Remove duplicates
      themes: [...new Set(themes)], // Remove duplicates
    };
  }

  static getSentimentLabel(score: number): string {
    if (score > 0.5) return 'Very Positive';
    if (score > 0.2) return 'Positive';
    if (score > -0.2) return 'Neutral';
    if (score > -0.5) return 'Negative';
    return 'Very Negative';
  }

  static getSentimentColor(score: number): string {
    if (score > 0.5) return 'hsl(var(--mood-5))';
    if (score > 0.2) return 'hsl(var(--mood-4))';
    if (score > -0.2) return 'hsl(var(--mood-3))';
    if (score > -0.5) return 'hsl(var(--mood-2))';
    return 'hsl(var(--mood-1))';
  }
}
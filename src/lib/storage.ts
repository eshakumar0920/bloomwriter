import { JournalEntry, WeeklySummary, AppSettings } from "@/types/journal";

const STORAGE_KEYS = {
  ENTRIES: "mindvault_entries",
  SUMMARIES: "mindvault_summaries", 
  SETTINGS: "mindvault_settings",
} as const;

// Default settings
const DEFAULT_SETTINGS: AppSettings = {
  localOnly: true,
  e2eeEnabled: false,
  dailyReminder: false,
  privacyMode: true,
};

export class LocalStorage {
  static saveEntry(entry: JournalEntry): void {
    const entries = this.getEntries();
    const existingIndex = entries.findIndex(e => e.id === entry.id);
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    
    // Sort by creation date (newest first)
    entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  }

  static getEntries(): JournalEntry[] {
    try {
      const entries = localStorage.getItem(STORAGE_KEYS.ENTRIES);
      if (!entries) return [];
      
      const parsed = JSON.parse(entries);
      return parsed.map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt),
      }));
    } catch (error) {
      console.error("Error loading entries:", error);
      return [];
    }
  }

  static deleteEntry(id: string): void {
    const entries = this.getEntries().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
  }

  static saveWeeklySummary(summary: WeeklySummary): void {
    const summaries = this.getWeeklySummaries();
    const existingIndex = summaries.findIndex(
      s => s.weekStart.getTime() === summary.weekStart.getTime()
    );
    
    if (existingIndex >= 0) {
      summaries[existingIndex] = summary;
    } else {
      summaries.push(summary);
    }
    
    localStorage.setItem(STORAGE_KEYS.SUMMARIES, JSON.stringify(summaries));
  }

  static getWeeklySummaries(): WeeklySummary[] {
    try {
      const summaries = localStorage.getItem(STORAGE_KEYS.SUMMARIES);
      if (!summaries) return [];
      
      const parsed = JSON.parse(summaries);
      return parsed.map((summary: any) => ({
        ...summary,
        weekStart: new Date(summary.weekStart),
      }));
    } catch (error) {
      console.error("Error loading summaries:", error);
      return [];
    }
  }

  static getSettings(): AppSettings {
    try {
      const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!settings) return DEFAULT_SETTINGS;
      
      return { ...DEFAULT_SETTINGS, ...JSON.parse(settings) };
    } catch (error) {
      console.error("Error loading settings:", error);
      return DEFAULT_SETTINGS;
    }
  }

  static saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  static exportData() {
    return {
      entries: this.getEntries(),
      summaries: this.getWeeklySummaries(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString(),
    };
  }

  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}
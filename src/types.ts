export interface DrawResult {
  id: string;
  date: string;
  numbers: number[];
  stars: number[];
  jackpot?: string;
}

export interface FrequencyData {
  value: number;
  count: number;
}

export interface AIInsight {
  analysis: string;
  suggestedKeys: {
    numbers: number[];
    stars: number[];
  }[];
}

export type TabType = 'dashboard' | 'history' | 'stats' | 'simulator' | 'ai';

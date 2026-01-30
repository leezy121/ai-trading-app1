export type TrendCategory = 'Tech' | 'Crypto' | 'Fashion' | 'Entertainment' | 'Sports' | 'All';

export interface Trend {
  id: string;
  title: string;
  source: string;
  category: TrendCategory;
  popularityScore: number;
  description: string;
  url: string;
  imageUrl?: string;
  timestamp: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  relatedNews?: Array<{
    title: string;
    url: string;
    source: string;
  }>;
  chartData?: Array<{
    time: string;
    value: number;
  }>;
}

export interface TrendResponse {
  trends: Trend[];
  lastUpdated: number;
}

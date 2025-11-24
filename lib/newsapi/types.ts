export interface NewsItem {
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  image: string | null;
}

export interface NewsResponse {
  success: boolean;
  news: NewsItem[];
  message?: string;
  cached?: boolean;
}

export interface NewsCache {
  data: NewsItem[] | null;
  timestamp: number | null;
}
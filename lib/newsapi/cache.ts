import { NewsCache, NewsItem } from './types';
import { CACHE_TTL } from './const';

let newsCache: NewsCache = {
  data: null,
  timestamp: null
};

export function getCachedNews(): NewsItem[] | null {
  if (newsCache.data && newsCache.timestamp && Date.now() - newsCache.timestamp < CACHE_TTL) {
    return newsCache.data;
  }
  return null;
}

export function setCachedNews(news: NewsItem[]): void {
  newsCache.data = news;
  newsCache.timestamp = Date.now();
}
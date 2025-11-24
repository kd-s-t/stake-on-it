import { NewsItem } from './types';
import { MAX_NEWS_ITEMS } from './const';

export function processNewsItems(items: any[]): NewsItem[] {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return [];
  }

  return items
    .map((item) => {
      const publishedDate = item.published_at || item.date || item.pub_date || item.created_at;
      let dateObj = null;
      
      if (publishedDate) {
        dateObj = new Date(publishedDate);
        if (isNaN(dateObj.getTime())) {
          dateObj = null;
        }
      }
      
      const sourceName = item.source?.name || item.source || item.source_name || item.domain || item.author || '';
      
      return {
        title: item.title || item.headline || item.name || '',
        summary: item.description || item.summary || item.snippet || item.text || item.content || item.body || '',
        date: dateObj ? dateObj.toLocaleDateString() : '',
        source: sourceName,
        url: item.url || item.link || item.web_url || item.permalink || '',
        image: item.thumbnail || item.image_url || item.image || item.url_to_image || item.media || null
      };
    })
    .filter(item => item.title)
    .sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, MAX_NEWS_ITEMS);
}
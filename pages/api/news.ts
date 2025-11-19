import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

const NEWS_API_KEY = process.env.THENEWS_API_KEY || '';
const NEWS_API_URL = 'https://api.thenewsapi.net/crypto';

const CACHE_TTL = 24 * 60 * 60 * 1000;
let newsCache: { data: any[] | null; timestamp: number | null } = {
  data: null,
  timestamp: null
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!NEWS_API_KEY) {
      return res.status(200).json({
        success: true,
        news: [],
        message: 'News API key not configured'
      });
    }

    if (newsCache.data && newsCache.timestamp && Date.now() - newsCache.timestamp < CACHE_TTL) {
      return res.status(200).json({
        success: true,
        news: newsCache.data,
        cached: true
      });
    }

    const url = new URL(NEWS_API_URL);
    url.searchParams.append('apikey', NEWS_API_KEY);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url.toString(), {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const responseData = await response.json();

    const processNewsItems = (items: any[]) => {
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
        .slice(0, 10);
    };

    let news: any[] = [];

    if (responseData && Array.isArray(responseData)) {
      news = processNewsItems(responseData);
    } else if (responseData?.data?.results && Array.isArray(responseData.data.results)) {
      news = processNewsItems(responseData.data.results);
    } else if (responseData?.data && Array.isArray(responseData.data)) {
      news = processNewsItems(responseData.data);
    } else if (responseData?.news && Array.isArray(responseData.news)) {
      news = processNewsItems(responseData.news);
    } else if (responseData?.articles && Array.isArray(responseData.articles)) {
      news = processNewsItems(responseData.articles);
    } else if (responseData?.results && Array.isArray(responseData.results)) {
      news = processNewsItems(responseData.results);
    }

    if (news.length > 0) {
      newsCache.data = news;
      newsCache.timestamp = Date.now();
      
      await query('INSERT INTO news (data) VALUES ($1)', [JSON.stringify(news)]);
    }

    res.status(200).json({
      success: true,
      news: news
    });
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch news',
      news: []
    });
  }
}


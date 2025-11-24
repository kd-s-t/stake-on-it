import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/database';
import { fetchCryptoNews, extractNewsFromResponse, getCachedNews, setCachedNews } from '../../lib/newsapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const cachedNews = getCachedNews();
    if (cachedNews) {
      return res.status(200).json({
        success: true,
        news: cachedNews,
        cached: true
      });
    }

    const responseData = await fetchCryptoNews();
    
    if (responseData.message) {
      return res.status(200).json(responseData);
    }

    const news = extractNewsFromResponse(responseData);

    if (news.length > 0) {
      setCachedNews(news);
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


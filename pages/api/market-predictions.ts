import { NextApiRequest, NextApiResponse } from 'next/types';
import { getLatestPredictions, savePredictions, getLatestNews } from '../../lib/database';
import { getOpenAIClient } from '../../lib/openapi';

const CACHE_TTL = 24 * 60 * 60 * 1000;
let predictionsCache: { data: any[] | null; timestamp: number | null } = {
  data: null,
  timestamp: null
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (predictionsCache.data && predictionsCache.timestamp && Date.now() - predictionsCache.timestamp < CACHE_TTL) {
      return res.status(200).json({
        success: true,
        predictions: predictionsCache.data,
        cached: true
      });
    }

    const dbResult = await getLatestPredictions();

    if (dbResult?.data) {
      const predictionsArray = Array.isArray(dbResult.data) ? dbResult.data : [];
      
      if (predictionsArray.length > 0) {
        predictionsCache.data = predictionsArray;
        predictionsCache.timestamp = Date.now();
        
        return res.status(200).json({
          success: true,
          predictions: predictionsArray,
          cached: true,
          source: 'database'
        });
      }
    }

    // Fetch latest news to base predictions on
    const newsRows = await getLatestNews(20);
    const latestNews = newsRows.map(row => `${row.title} - ${row.content}`).join('\n');

    const openai = getOpenAIClient();
    if (!openai) {
      return res.status(200).json({
        success: true,
        predictions: [],
        message: 'OpenAI API key not configured'
      });
    }

    const prompt = `Based on the following latest cryptocurrency news, provide exactly 10 cryptocurrency predictions for the most trending/mentioned coins from the news. Return as valid JSON array with objects containing: {"coin": "CoinName", "analysis": "Detailed 2-paragraph analysis", "upOdds": 1.85, "downOdds": 2.10}.

Latest News:
${latestNews}

For analysis, write exactly 5 paragraphs based on the news:
Paragraph 1: Bullish factors - mention specific people, organizations, or resources from the news that could drive price UP.
Paragraph 2: Bearish factors - mention specific people, organizations, or resources from the news that could drive price DOWN.

ONLY include cryptocurrencies that are specifically mentioned in the provided news. Do not include Bitcoin unless it appears in the news. Odds should be realistic betting odds between 1.20-3.50. Only return the JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cryptocurrency market analyst. Provide realistic predictions with betting odds.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content?.trim() || '';
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? jsonMatch[0] : content;
    
    try {
      const predictions = JSON.parse(jsonText);
      const predictionsArray = Array.isArray(predictions) ? predictions : [];
      
      if (predictionsArray.length > 0) {
        predictionsCache.data = predictionsArray;
        predictionsCache.timestamp = Date.now();
        
        await savePredictions(predictionsArray);
        
        return res.status(200).json({
          success: true,
          predictions: predictionsArray,
          source: 'openai'
        });
      }
      
      return res.status(200).json({
        success: true,
        predictions: []
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return res.status(200).json({
        success: true,
        predictions: []
      });
    }
  } catch (error: any) {
    console.error('Market predictions error:', error);
    
    const dbResult = await getLatestPredictions();

    if (dbResult?.data) {
      const predictionsArray = Array.isArray(dbResult.data) ? dbResult.data : [];
      
      if (predictionsArray.length > 0) {
        return res.status(200).json({
          success: true,
          predictions: predictionsArray,
          cached: true,
          source: 'database'
        });
      }
    }

    return res.status(500).json({ error: 'Failed to get market predictions' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../lib/db';
import { getOpenAIClient } from '../../lib/openai';

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

    const dbResult = await query(
      'SELECT data FROM market_predictions ORDER BY created_at DESC LIMIT 1'
    );

    if (dbResult.rows.length > 0) {
      const predictions = dbResult.rows[0].data;
      const predictionsArray = Array.isArray(predictions) ? predictions : [];
      
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

    const openai = getOpenAIClient();
    if (!openai) {
      return res.status(200).json({
        success: true,
        predictions: [],
        message: 'OpenAI API key not configured'
      });
    }

    const prompt = `Provide exactly 10 cryptocurrency predictions. Return as valid JSON array with objects containing: {"coin": "Bitcoin", "analysis": "Brief analysis why price will move", "upOdds": 1.85, "downOdds": 2.10}. Odds should be realistic betting odds between 1.20-3.50. Only return the JSON array, no other text.`;

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
        
        await query('INSERT INTO market_predictions (data) VALUES ($1)', [JSON.stringify(predictionsArray)]);
        
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
    
    const dbResult = await query(
      'SELECT data FROM market_predictions ORDER BY created_at DESC LIMIT 1'
    );

    if (dbResult.rows.length > 0) {
      const predictions = dbResult.rows[0].data;
      const predictionsArray = Array.isArray(predictions) ? predictions : [];
      
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

import { NextApiRequest, NextApiResponse } from 'next/types';
import { QBusinessClient, ChatSyncCommand } from '@aws-sdk/client-qbusiness';
import { query } from '../../lib/db';

const client = new QBusinessClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
let predictionsCache: { data: any[] | null; timestamp: number | null } = {
  data: null,
  timestamp: null
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check cache first
    if (predictionsCache.data && predictionsCache.timestamp && Date.now() - predictionsCache.timestamp < CACHE_TTL) {
      return res.status(200).json({
        success: true,
        predictions: predictionsCache.data,
        cached: true
      });
    }

    const applicationId = process.env.AWS_Q_AGENT_ID;
    // Generate a valid 36-character conversationId matching pattern [a-zA-Z0-9][a-zA-Z0-9-]{35}
    const generateConversationId = (): string => {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
      let id = chars[Math.floor(Math.random() * 62)]; // Start with alphanumeric
      for (let i = 0; i < 35; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
      }
      return id;
    };
    const conversationId = generateConversationId();

    if (!applicationId) {
      // Fallback to database if AWS Q not configured
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
            cached: true
          });
        }
      }

      return res.status(200).json({
        success: true,
        predictions: []
      });
    }

    const prompt = "Provide exactly 10 cryptocurrency predictions. Return as valid JSON array with objects containing: {\"coin\": \"Bitcoin\", \"analysis\": \"Brief analysis why price will move\", \"upOdds\": 1.85, \"downOdds\": 2.10}. Odds should be realistic betting odds between 1.20-3.50. Only return the JSON array, no other text.";

    const command = new ChatSyncCommand({
      applicationId,
      userMessage: prompt,
      conversationId,
    });

    const response = await client.send(command);
    
    // Extract text from AWS Q response
    const predictionsText = response.systemMessage || '';
    
    // Try to extract JSON from the response
    const jsonMatch = predictionsText.match(/\[[\s\S]*\]/);
    const jsonText = jsonMatch ? jsonMatch[0] : predictionsText;
    
    try {
      const predictions = JSON.parse(jsonText);
      const predictionsArray = Array.isArray(predictions) ? predictions : [];
      
      if (predictionsArray.length > 0) {
        // Update cache
        predictionsCache.data = predictionsArray;
        predictionsCache.timestamp = Date.now();
        
        // Store in database (same pattern as news)
        await query('INSERT INTO market_predictions (data) VALUES ($1)', [JSON.stringify(predictionsArray)]);
      }
      
      res.status(200).json({ 
        success: true,
        predictions: predictionsArray 
      });
    } catch {
      res.status(200).json({ 
        success: true,
        predictions: [] 
      });
    }
  } catch (error: any) {
    console.error('Market predictions error:', error);
    
    // If authorization/permission error, fallback to database
    if (error.name === 'AccessDeniedException' || error.$metadata?.httpStatusCode === 403) {
      console.warn('AWS Q access denied, falling back to database');
      
      const dbResult = await query(
        'SELECT data FROM market_predictions ORDER BY created_at DESC LIMIT 1'
      );

      if (dbResult.rows.length > 0) {
        const predictions = dbResult.rows[0].data;
        const predictionsArray = Array.isArray(predictions) ? predictions : [];
        
        if (predictionsArray.length > 0) {
          // Update cache from database
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

      return res.status(200).json({
        success: true,
        predictions: [],
        message: 'AWS Q not accessible, no cached predictions available'
      });
    }
    
    res.status(500).json({ error: 'Failed to get market predictions' });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await query(`
      ALTER TABLE market_predictions 
      DROP COLUMN IF EXISTS market_name, 
      DROP COLUMN IF EXISTS prediction, 
      DROP COLUMN IF EXISTS confidence_score;
    `);
    
    await query(`
      ALTER TABLE market_predictions 
      ADD COLUMN IF NOT EXISTS data JSONB;
    `);
    
    res.status(200).json({ message: 'Market predictions table migrated successfully' });
  } catch (error: any) {
    console.error('Migration error:', error);
    res.status(500).json({ error: 'Failed to migrate table', details: error.message });
  }
}


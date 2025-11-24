import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await query(`
      SELECT 
        market_id,
        prediction,
        COUNT(*) as stake_count,
        COUNT(DISTINCT user_id) as unique_users,
        SUM(amount) as total_amount
      FROM stakes 
      WHERE status = 'active'
      GROUP BY market_id, prediction
      ORDER BY market_id, prediction
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stake statistics' });
  }
}
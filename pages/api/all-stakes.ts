import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await query(`
      SELECT s.*, u.name as user_name,
        COALESCE(up_bets.count, 0) as up_bet_count,
        COALESCE(down_bets.count, 0) as down_bet_count
      FROM stakes s 
      JOIN users u ON s.user_id = u.id 
      LEFT JOIN (
        SELECT stake_id, COUNT(*) as count 
        FROM bets 
        WHERE prediction = 'up' 
        GROUP BY stake_id
      ) up_bets ON s.id = up_bets.stake_id
      LEFT JOIN (
        SELECT stake_id, COUNT(*) as count 
        FROM bets 
        WHERE prediction = 'down' 
        GROUP BY stake_id
      ) down_bets ON s.id = down_bets.stake_id
      ORDER BY s.created_at DESC
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stakes' });
  }
}
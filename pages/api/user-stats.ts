import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from "../../lib/database"';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  const decoded = verifyToken(token || '');
  
  if (!decoded || typeof decoded === 'string') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = (decoded as any).userId;

  try {
    const stakesResult = await query('SELECT * FROM stakes WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    const userResult = await query('SELECT balance FROM users WHERE id = $1', [userId]);
    
    const stakes = stakesResult.rows;
    const wins = stakes.filter(s => s.status === 'won').length;
    const losses = stakes.filter(s => s.status === 'lost').length;
    const totalProfit = stakes.reduce((sum, s) => {
      if (s.status === 'won') return sum + parseFloat(s.potential_winnings) - parseFloat(s.amount);
      if (s.status === 'lost') return sum - parseFloat(s.amount);
      return sum;
    }, 0);

    res.status(200).json({
      stakes,
      wins,
      losses,
      totalProfit,
      balance: userResult.rows[0]?.balance || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
}
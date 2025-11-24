import { NextApiRequest, NextApiResponse } from 'next/types';
import { getUserStats, getUserBets } from '../../lib/database';
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
    const stats = await getUserStats(userId);
    const stakes = await getUserBets(userId);

    res.status(200).json({
      stakes,
      wins: stats?.wins || 0,
      losses: stats?.losses || 0,
      totalProfit: stats?.total_profit || 0,
      balance: stats?.balance || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
}
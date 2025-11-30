import { NextApiRequest, NextApiResponse } from 'next/types';
import { getUserStats, getUserBets } from '../../lib/database';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized', details: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', details: 'No token provided', expired: false });
  }

  const decoded = verifyToken(token);
  
  if (decoded && typeof decoded === 'object' && 'expired' in decoded) {
    return res.status(401).json({ error: 'Unauthorized', details: 'Token expired', expired: true });
  }
  
  if (!decoded || typeof decoded === 'string') {
    return res.status(401).json({ error: 'Unauthorized', details: 'Invalid token', expired: false });
  }

  const userId = (decoded as any).userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized', details: 'No user ID in token' });
  }

  try {
    const stats = await getUserStats(userId);
    const stakes = await getUserBets(userId);

    res.status(200).json({
      stakes: stakes || [],
      wins: stats?.wins || 0,
      losses: stats?.losses || 0,
      totalProfit: stats?.total_profit || 0,
      balance: stats?.balance || 0
    });
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user stats', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
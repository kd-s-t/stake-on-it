import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../lib/db';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  const decoded = verifyToken(token || '');
  
  if (!decoded || typeof decoded === 'string') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { coin, prediction, amount, odds } = req.body;
  const userId = (decoded as any).userId;
  const potentialWinnings = amount * odds;

  try {
    // Check user balance
    const userResult = await query('SELECT balance FROM users WHERE id = $1', [userId]);
    const currentBalance = parseFloat(userResult.rows[0]?.balance || 0);
    
    if (currentBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct amount from balance
    const newBalance = currentBalance - amount;
    await query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, userId]);

    // Create transaction record
    await query(
      'INSERT INTO transactions (user_id, type, amount, description) VALUES ($1, $2, $3, $4)',
      [userId, 'stake', amount, `Stake on ${coin} ${prediction.toUpperCase()}`]
    );

    // Create stake
    const result = await query(
      'INSERT INTO stakes (user_id, market_id, prediction, amount, odds, potential_winnings) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, coin, prediction, amount, odds, potentialWinnings]
    );
    
    res.status(201).json({
      ...result.rows[0],
      balance: newBalance
    });
  } catch (error) {
    console.error('Stake error:', error);
    res.status(500).json({ error: 'Failed to create stake' });
  }
}
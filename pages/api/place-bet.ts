import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    const userId = decoded.userId;

    const { stake_id, prediction, amount, odds } = req.body;

    if (!stake_id || !prediction || !amount || !odds) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check user balance
    const userResult = await query('SELECT balance FROM users WHERE id = $1', [userId]);
    const currentBalance = parseFloat(userResult.rows[0]?.balance || 0);
    
    if (currentBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Get stake market_id
    const stakeResult = await query('SELECT market_id FROM stakes WHERE id = $1', [stake_id]);
    const market_id = stakeResult.rows[0]?.market_id;
    
    if (!market_id) {
      return res.status(400).json({ error: 'Stake not found' });
    }

    // Create bet
    await query(
      'INSERT INTO bets (user_id, stake_id, market_id, prediction, amount, odds, potential_winnings, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [userId, stake_id, market_id, prediction, amount, odds, amount * odds, new Date().toISOString()]
    );

    // Update user balance
    const newBalance = currentBalance - amount;
    await query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, userId]);

    res.status(200).json({ 
      message: 'Bet placed successfully',
      balance: newBalance
    });
  } catch (error) {
    console.error('Place bet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
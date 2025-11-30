import { NextApiRequest, NextApiResponse } from 'next';
import { createBet, findStakeById, updateUserBalance, getUserBalance } from '../../lib/database';
import { verifyToken } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decoded = verifyToken(token || '');
    
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = (decoded as any).userId;
    const { stake_id, prediction, amount, odds } = req.body;

    if (!stake_id || !prediction || !amount || !odds) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get stake to verify it exists
    const stake = await findStakeById(stake_id);
    if (!stake) {
      return res.status(400).json({ error: 'Stake not found' });
    }

    // Check user balance
    const userBalance = await getUserBalance(userId);
    const currentBalance = parseFloat(userBalance?.balance || 0);
    
    if (currentBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create bet
    await createBet(stake_id, stake.market_id, prediction, amount, odds, userId);

    // Update user balance
    const result = await updateUserBalance(userId, -amount);

    res.status(200).json({ 
      message: 'Bet placed successfully',
      balance: result.balance
    });
  } catch (error) {
    console.error('Place bet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 
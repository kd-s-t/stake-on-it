import { NextApiRequest, NextApiResponse } from 'next/types';
import { createStake, createBet, getUserBalance, updateUserBalance, createTransaction } from '../../lib/database';
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

  const { coin, prediction, amount, odds, analysis } = req.body;
  const userId = (decoded as any).userId;
  const potentialWinnings = amount * odds;

  try {
    // Check user balance
    const userBalance = await getUserBalance(userId);
    const currentBalance = parseFloat(userBalance?.balance || 0);
    
    if (currentBalance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct amount from balance
    const balanceResult = await updateUserBalance(userId, -amount);

    // Create transaction record
    await createTransaction(userId, 'stake', amount, `Stake on ${coin} ${prediction.toUpperCase()}`);

    // Create stake
    const stake = await createStake(coin, prediction, amount, odds, analysis || '', userId);
    
    // Create bet for the stake creator
    await createBet(stake.id, coin, prediction, amount, odds, userId);
    
    res.status(201).json({
      ...stake,
      balance: balanceResult.balance
    });
  } catch (error) {
    console.error('Stake error:', error);
    res.status(500).json({ 
      error: 'Failed to create stake', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
import { NextApiRequest, NextApiResponse } from 'next/types';
import { updateUserBalance, createTransaction, query } from '../../lib/database';
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

  const { amount } = req.body;
  const userId = (decoded as any).userId;

  try {
    await query('BEGIN');
    
    // Update user balance
    const balanceResult = await updateUserBalance(userId, amount);
    
    // Create transaction record
    await createTransaction(userId, 'deposit', amount, 'Fake money deposit');
    
    await query('COMMIT');
    
    res.status(200).json({ balance: balanceResult.balance });
  } catch (error) {
    await query('ROLLBACK');
    res.status(500).json({ error: 'Deposit failed' });
  }
}
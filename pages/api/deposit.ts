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

  const { amount } = req.body;
  const userId = (decoded as any).userId;

  try {
    await query('BEGIN');
    
    await query(
      'UPDATE users SET balance = balance + $1 WHERE id = $2',
      [amount, userId]
    );
    
    await query(
      'INSERT INTO transactions (user_id, type, amount, description) VALUES ($1, $2, $3, $4)',
      [userId, 'deposit', amount, 'Fake money deposit']
    );
    
    const result = await query('SELECT balance FROM users WHERE id = $1', [userId]);
    
    await query('COMMIT');
    
    res.status(200).json({ balance: result.rows[0].balance });
  } catch (error) {
    await query('ROLLBACK');
    res.status(500).json({ error: 'Deposit failed' });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM stakes ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stakes' });
    }
  } else if (req.method === 'POST') {
    const { user_id, market_id, prediction, amount, odds } = req.body;
    
    try {
      const result = await query(
        'INSERT INTO stakes (user_id, market_id, prediction, amount, odds) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, market_id, prediction, amount, odds]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create stake' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
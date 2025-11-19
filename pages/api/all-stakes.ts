import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await query(`
      SELECT s.*, u.name as user_name 
      FROM stakes s 
      JOIN users u ON s.user_id = u.id 
      ORDER BY s.created_at DESC
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stakes' });
  }
}
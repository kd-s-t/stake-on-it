import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await query(`
      ALTER TABLE stakes 
      ADD COLUMN IF NOT EXISTS analysis TEXT;
    `);
    
    res.status(200).json({ message: 'Analysis column added successfully' });
  } catch (error: any) {
    console.error('Migration error:', error);
    res.status(500).json({ error: 'Failed to add analysis column', details: error.message });
  }
}
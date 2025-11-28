import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../database/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await query(`
      CREATE TABLE IF NOT EXISTS bets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        stake_id INTEGER REFERENCES stakes(id),
        market_id VARCHAR(255) NOT NULL,
        prediction TEXT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        odds DECIMAL(5,2) NOT NULL,
        potential_winnings DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    res.status(200).json({ message: 'Bets table created successfully' });
  } catch (error: any) {
    console.error('Migration error:', error);
    res.status(500).json({ error: 'Failed to create bets table', details: error.message });
  }
}
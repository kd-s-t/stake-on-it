import { NextApiRequest, NextApiResponse } from 'next';
import { getAllStakes, createStake } from '../../lib/database';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const stakes = await getAllStakes();
      res.status(200).json(stakes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stakes' });
    }
  } else if (req.method === 'POST') {
    const { user_id, market_id, prediction, amount, odds } = req.body;
    
    try {
      const stake = await createStake(market_id, prediction, amount, odds, '', user_id);
      res.status(201).json(stake);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create stake' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
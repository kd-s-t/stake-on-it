import { NextApiRequest, NextApiResponse } from 'next/types';
import { getAllStakes } from '../../lib/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stakes = await getAllStakes();
    res.status(200).json(stakes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stakes' });
  }
}
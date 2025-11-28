import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../database/db';
import * as fs from 'fs';
import * as path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const seedPath = path.join(process.cwd(), 'lib', 'database', 'seeders.sql');
    const seedData = fs.readFileSync(seedPath, 'utf8');
    
    await query(seedData);
    
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
}
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../db';
import { hashPassword, signToken } from '../../auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    
    const result = await query(
      'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, name, hashedPassword]
    );
    
    const user = result.rows[0];
    const token = signToken({ userId: user.id, email: user.email });
    
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}
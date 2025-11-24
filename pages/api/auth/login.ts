import { NextApiRequest, NextApiResponse } from 'next';
import { findUserByEmail } from '../../../lib/database';
import { verifyPassword, signToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken({ userId: user.id, email: user.email });
    
    res.status(200).json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, balance: parseFloat(user.balance) || 0 } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}
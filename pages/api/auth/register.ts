import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../lib/database';
import { hashPassword, signToken } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await createUser(email, name, hashedPassword);
    const token = signToken({ userId: user.id, email: user.email });
    
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}
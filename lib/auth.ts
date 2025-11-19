import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const signToken = (payload: any) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
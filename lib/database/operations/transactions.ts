import { query } from '../db';

export async function createTransaction(userId: number, type: string, amount: number, description: string) {
  const result = await query(
    'INSERT INTO transactions (user_id, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, type, amount, description]
  );
  return result.rows[0];
}
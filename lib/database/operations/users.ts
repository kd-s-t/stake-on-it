import { query } from '../db';

export async function findUserByEmail(email: string) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function createUser(email: string, name: string, hashedPassword: string) {
  const result = await query(
    'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id, email, name, balance',
    [email, name, hashedPassword]
  );
  return result.rows[0];
}

export async function getUserStats(userId: number) {
  const result = await query(`
    SELECT 
      u.balance,
      0::int as wins,
      0::int as losses,
      0::decimal as total_profit
    FROM users u
    WHERE u.id = $1
  `, [userId]);
  return result.rows[0] || { balance: 0, wins: 0, losses: 0, total_profit: 0 };
}

export async function getUserBets(userId: number) {
  const result = await query(`
    SELECT b.*, s.market_id, s.analysis, COALESCE(s.status, 'active') as status
    FROM bets b
    LEFT JOIN stakes s ON b.stake_id = s.id
    WHERE b.user_id = $1
    ORDER BY b.created_at DESC
  `, [userId]);
  return result.rows;
}

export async function updateUserBalance(userId: number, amount: number) {
  const result = await query(
    'UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING balance',
    [amount, userId]
  );
  return result.rows[0];
}

export async function getUserBalance(userId: number) {
  const result = await query('SELECT balance FROM users WHERE id = $1', [userId]);
  return result.rows[0];
}
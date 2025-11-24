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
      COUNT(CASE WHEN b.status = 'won' THEN 1 END) as wins,
      COUNT(CASE WHEN b.status = 'lost' THEN 1 END) as losses,
      COALESCE(SUM(CASE WHEN b.status = 'won' THEN b.potential_winnings - b.amount ELSE 0 END), 0) -
      COALESCE(SUM(CASE WHEN b.status = 'lost' THEN b.amount ELSE 0 END), 0) as total_profit
    FROM users u
    LEFT JOIN bets b ON u.id = b.user_id
    WHERE u.id = $1
    GROUP BY u.id, u.balance
  `, [userId]);
  return result.rows[0];
}

export async function getUserBets(userId: number) {
  const result = await query(`
    SELECT b.*, s.market_id, s.analysis
    FROM bets b
    JOIN stakes s ON b.stake_id = s.id
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
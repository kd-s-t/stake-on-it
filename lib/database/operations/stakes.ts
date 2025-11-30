import { query } from '../db';

export async function getAllStakes() {
  const result = await query(`
    SELECT s.*, 
           COUNT(CASE WHEN b.prediction = 'up' THEN 1 END) as up_bet_count,
           COUNT(CASE WHEN b.prediction = 'down' THEN 1 END) as down_bet_count,
           CASE 
             WHEN NOW() > s.created_at + INTERVAL '24 hours' THEN 'expired'
             ELSE 'active'
           END as display_status
    FROM stakes s
    LEFT JOIN bets b ON s.id = b.stake_id
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `);
  return result.rows;
}

export async function findStakeById(stakeId: number) {
  const result = await query('SELECT * FROM stakes WHERE id = $1', [stakeId]);
  return result.rows[0];
}

export async function createStake(marketId: string, prediction: string, amount: number, odds: number, analysis: string, userId: number) {
  const potentialWinnings = amount * odds;
  const result = await query(
    'INSERT INTO stakes (market_id, prediction, amount, odds, potential_winnings, analysis, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [marketId, prediction, amount, odds, potentialWinnings, analysis || null, userId]
  );
  return result.rows[0];
}

export async function createBet(stakeId: number, marketId: string, prediction: string, amount: number, odds: number, userId: number) {
  const potentialWinnings = amount * odds;
  const result = await query(
    'INSERT INTO bets (stake_id, market_id, prediction, amount, odds, potential_winnings, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [stakeId, marketId, prediction, amount, odds, potentialWinnings, userId]
  );
  return result.rows[0];
}
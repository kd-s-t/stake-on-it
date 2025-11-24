import { query } from '../db';

export async function getStakeStats() {
  const result = await query(`
    SELECT 
      market_id,
      prediction,
      COUNT(*) as stake_count,
      COUNT(DISTINCT user_id) as unique_users,
      SUM(amount) as total_amount
    FROM stakes 
    WHERE status = 'active'
    GROUP BY market_id, prediction
    ORDER BY market_id, prediction
  `);
  return result.rows;
}
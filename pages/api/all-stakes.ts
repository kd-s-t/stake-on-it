import { NextApiRequest, NextApiResponse } from 'next/types';
import { query } from '../../lib/database';

async function resolveExpiredStakes() {
  try {
    // Find expired unresolved stakes (24 hours old)
    const expiredStakes = await query(`
      SELECT DISTINCT market_id, prediction FROM stakes 
      WHERE status = 'active' 
      AND created_at < NOW() - INTERVAL '24 hours'
    `);

    for (const stake of expiredStakes.rows) {
      // Get all stakes for this market/prediction
      const allStakes = await query(`
        SELECT * FROM stakes 
        WHERE market_id = $1 AND prediction = $2 AND status = 'active'
        AND created_at < NOW() - INTERVAL '24 hours'
      `, [stake.market_id, stake.prediction]);

      if (allStakes.rows.length === 0) continue;

      // Determine winners (mock logic - in real app would compare actual prices)
      const isUpWin = Math.random() > 0.5; // Mock outcome
      const winningPrediction = isUpWin ? 'up' : 'down';
      
      // Get all stakes for this market (both up and down)
      const marketStakes = await query(`
        SELECT * FROM stakes 
        WHERE market_id = $1 AND status = 'active'
        AND created_at < NOW() - INTERVAL '24 hours'
      `, [stake.market_id]);
      
      const winners = marketStakes.rows.filter(s => s.prediction === winningPrediction);
      const losers = marketStakes.rows.filter(s => s.prediction !== winningPrediction);
      
      // Distribute rewards to winners
      for (const winner of winners) {
        const stakeAmount = parseFloat(winner.amount);
        const winnerShare = winners.length > 0 ? stakeAmount / winners.reduce((sum, w) => sum + parseFloat(w.amount), 0) : 0;
        const reward = stakeAmount + (winnerShare * losers.reduce((sum, l) => sum + parseFloat(l.amount), 0));
        
        // Update winner
        await query(`
          UPDATE stakes SET status = 'won', payout = $1 
          WHERE id = $2
        `, [reward, winner.id]);
        
        // Update user balance
        await query(`
          UPDATE users SET balance = balance + $1 WHERE id = $2
        `, [reward, winner.user_id]);
      }
      
      // Mark losers
      for (const loser of losers) {
        await query(`
          UPDATE stakes SET status = 'lost', payout = 0 
          WHERE id = $1
        `, [loser.id]);
      }
    }
  } catch (error) {
    console.error('Error resolving expired stakes:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Auto-resolve expired stakes before fetching
    await resolveExpiredStakes();
    
    const result = await query(`
      SELECT s.*, u.name as user_name,
        COALESCE(up_bets.count, 0) as up_bet_count,
        COALESCE(down_bets.count, 0) as down_bet_count,
        CASE 
          WHEN s.created_at < NOW() - INTERVAL '24 hours' AND s.status = 'active' THEN 'expired'
          ELSE s.status
        END as display_status
      FROM stakes s 
      JOIN users u ON s.user_id = u.id 
      LEFT JOIN (
        SELECT stake_id, COUNT(*) as count 
        FROM bets 
        WHERE prediction = 'up' 
        GROUP BY stake_id
      ) up_bets ON s.id = up_bets.stake_id
      LEFT JOIN (
        SELECT stake_id, COUNT(*) as count 
        FROM bets 
        WHERE prediction = 'down' 
        GROUP BY stake_id
      ) down_bets ON s.id = down_bets.stake_id
      ORDER BY s.created_at DESC
    `);
    
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stakes' });
  }
}
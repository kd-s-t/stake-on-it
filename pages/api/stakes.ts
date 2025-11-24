import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

async function resolveExpiredStakes() {
  try {
    // Find expired unresolved stakes (24 hours old)
    const expiredStakes = await query(`
      SELECT DISTINCT coin, prediction FROM stakes 
      WHERE resolved = false 
      AND created_at < NOW() - INTERVAL '24 hours'
    `);

    for (const stake of expiredStakes.rows) {
      // Get current price (mock for now - in real app would fetch from API)
      const currentPrice = Math.random() * 50000; // Mock current price
      
      // Get all stakes for this coin/prediction
      const allStakes = await query(`
        SELECT * FROM stakes 
        WHERE coin = $1 AND prediction = $2 AND resolved = false
        AND created_at < NOW() - INTERVAL '24 hours'
      `, [stake.coin, stake.prediction]);

      if (allStakes.rows.length === 0) continue;

      // Determine winners (mock logic - in real app would compare actual prices)
      const isUpWin = Math.random() > 0.5; // Mock outcome
      const winningPrediction = isUpWin ? 'up' : 'down';
      
      // Calculate total pools
      const upPool = allStakes.rows.filter(s => s.prediction === 'up').reduce((sum, s) => sum + parseFloat(s.amount), 0);
      const downPool = allStakes.rows.filter(s => s.prediction === 'down').reduce((sum, s) => sum + parseFloat(s.amount), 0);
      const totalPool = upPool + downPool;
      
      const winners = allStakes.rows.filter(s => s.prediction === winningPrediction);
      const losers = allStakes.rows.filter(s => s.prediction !== winningPrediction);
      
      // Distribute rewards to winners
      for (const winner of winners) {
        const stakeAmount = parseFloat(winner.amount);
        const winnerShare = winners.length > 0 ? stakeAmount / winners.reduce((sum, w) => sum + parseFloat(w.amount), 0) : 0;
        const reward = stakeAmount + (winnerShare * losers.reduce((sum, l) => sum + parseFloat(l.amount), 0));
        
        // Update winner
        await query(`
          UPDATE stakes SET resolved = true, won = true, payout = $1 
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
          UPDATE stakes SET resolved = true, won = false, payout = 0 
          WHERE id = $1
        `, [loser.id]);
      }
    }
  } catch (error) {
    console.error('Error resolving expired stakes:', error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Auto-resolve expired stakes before fetching
      await resolveExpiredStakes();
      
      const result = await query('SELECT * FROM stakes ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stakes' });
    }
  } else if (req.method === 'POST') {
    const { user_id, market_id, prediction, amount, odds } = req.body;
    
    try {
      const result = await query(
        'INSERT INTO stakes (user_id, market_id, prediction, amount, odds) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, market_id, prediction, amount, odds]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create stake' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
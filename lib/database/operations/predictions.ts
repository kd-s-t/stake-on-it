import { query } from '../db';

export async function getLatestPredictions() {
  const result = await query(
    'SELECT data FROM market_predictions ORDER BY created_at DESC LIMIT 1'
  );
  return result.rows[0];
}

export async function savePredictions(predictions: any[]) {
  const result = await query(
    'INSERT INTO market_predictions (data) VALUES ($1)',
    [JSON.stringify(predictions)]
  );
  return result;
}

export async function getLatestNews(limit: number = 20) {
  const result = await query(
    'SELECT data FROM news ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  
  const allNews: any[] = [];
  for (const row of result.rows) {
    if (row.data && Array.isArray(row.data)) {
      allNews.push(...row.data);
    }
  }
  
  return allNews.slice(0, limit);
}
import { query } from '../db';

export async function saveNews(newsData: any[]) {
  const result = await query(
    'INSERT INTO news (data) VALUES ($1)',
    [JSON.stringify(newsData)]
  );
  return result;
}
import { CryptoData } from './types';

export function generateAnalysis(crypto: CryptoData): string {
  const change = crypto.price_change_percentage_24h || 0;
  if (change > 5) return `${crypto.name} showing strong bullish momentum with ${change.toFixed(2)}% gains`;
  if (change < -5) return `${crypto.name} experiencing bearish pressure with ${change.toFixed(2)}% decline`;
  return `${crypto.name} trading sideways with ${change.toFixed(2)}% movement`;
}
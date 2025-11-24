export function calculateOdds(change24h: number, direction: 'up' | 'down'): number {
  const volatility = Math.abs(change24h || 0);
  const baseOdds = direction === 'up' ? 1.8 : 1.9;
  return Number((baseOdds + (volatility / 10)).toFixed(2));
}
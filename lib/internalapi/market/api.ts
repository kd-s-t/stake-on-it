export async function getMarketPredictions() {
  const res = await fetch('/api/market-predictions');
  return await res.json();
}
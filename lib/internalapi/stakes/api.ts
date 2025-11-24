export async function getAllStakes() {
  const res = await fetch('/api/all-stakes');
  return await res.json();
}

export async function placeBet(token: string, stakeId: number, prediction: string, amount: number, odds: number) {
  const res = await fetch('/api/place-bet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ stake_id: stakeId, prediction, amount, odds })
  });
  return await res.json();
}

export async function stakeOnIt(token: string, coin: string, prediction: string, amount: number, odds: number, analysis: string) {
  const res = await fetch('/api/stake-on-it', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ coin, prediction, amount, odds, analysis })
  });
  return await res.json();
}
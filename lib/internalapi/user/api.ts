export async function getUserStats(token: string) {
  const res = await fetch('/api/user-stats', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await res.json();
}

export async function depositMoney(token: string, amount: number) {
  const res = await fetch('/api/deposit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount })
  });
  return await res.json();
}
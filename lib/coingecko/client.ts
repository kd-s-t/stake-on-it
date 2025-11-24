import { COINGECKO_API_URL } from './config';
import { CryptoData } from './types';

export async function fetchCryptoData(): Promise<CryptoData[]> {
  const response = await fetch(COINGECKO_API_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto data');
  }
  
  return await response.json();
}
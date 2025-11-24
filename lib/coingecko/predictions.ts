import { fetchCryptoData } from './client';
import { generateAnalysis } from './analysis';
import { calculateOdds } from './odds';
import { CryptoPrediction } from './types';

export async function getCryptoDataWithIcons(): Promise<CryptoPrediction[]> {
  try {
    const cryptoData = await fetchCryptoData();
    
    const predictions: CryptoPrediction[] = cryptoData.map(crypto => ({
      coin: crypto.symbol.toUpperCase(),
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.current_price,
      change24h: crypto.price_change_percentage_24h || 0,
      analysis: generateAnalysis(crypto),
      upOdds: calculateOdds(crypto.price_change_percentage_24h, 'up'),
      downOdds: calculateOdds(crypto.price_change_percentage_24h, 'down'),
      image: crypto.image
    }));
    
    return predictions;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}
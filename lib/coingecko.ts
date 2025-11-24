// CoinGecko API integration for crypto data with icons
export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string; // Icon URL from CoinGecko
}

export interface CryptoPrediction {
  coin: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  analysis: string;
  upOdds: number;
  downOdds: number;
  image?: string; // Icon URL
}

export async function getCryptoDataWithIcons(): Promise<CryptoPrediction[]> {
  try {
    // Fetch crypto data from CoinGecko API (includes icons)
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    const cryptoData: CryptoData[] = await response.json();
    
    // Transform to your prediction format
    const predictions: CryptoPrediction[] = cryptoData.map(crypto => ({
      coin: crypto.symbol.toUpperCase(),
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.current_price,
      change24h: crypto.price_change_percentage_24h || 0,
      analysis: generateAnalysis(crypto),
      upOdds: calculateOdds(crypto.price_change_percentage_24h, 'up'),
      downOdds: calculateOdds(crypto.price_change_percentage_24h, 'down'),
      image: crypto.image // CoinGecko provides 64x64 icons
    }));
    
    return predictions;
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return [];
  }
}

function generateAnalysis(crypto: CryptoData): string {
  const change = crypto.price_change_percentage_24h || 0;
  if (change > 5) return `${crypto.name} showing strong bullish momentum with ${change.toFixed(2)}% gains`;
  if (change < -5) return `${crypto.name} experiencing bearish pressure with ${change.toFixed(2)}% decline`;
  return `${crypto.name} trading sideways with ${change.toFixed(2)}% movement`;
}

function calculateOdds(change24h: number, direction: 'up' | 'down'): number {
  const volatility = Math.abs(change24h || 0);
  const baseOdds = direction === 'up' ? 1.8 : 1.9;
  return Number((baseOdds + (volatility / 10)).toFixed(2));
}
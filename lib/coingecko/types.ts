export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
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
  image?: string;
}
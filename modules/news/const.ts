export const CACHE_KEY = 'news_trending_cache'
export const CACHE_TTL = 86400000

export const ROW_PATTERNS = [
  [{ xs: 12, md: 8 }, { xs: 12, md: 4 }], // Row 1: 2col, 1col
  [{ xs: 12, md: 4 }, { xs: 12, md: 8 }], // Row 2: 1col, 2col
  [{ xs: 12, md: 12 }], // Row 3: 3col (full width)
  [{ xs: 12, md: 4 }, { xs: 12, md: 4 }, { xs: 12, md: 4 }], // Random: 3 equal
  [{ xs: 12, md: 6 }, { xs: 12, md: 6 }], // Random: 2 equal
] as const

export const CRYPTO_KEYWORDS = [
  'bitcoin',
  'btc',
  'ethereum',
  'eth',
  'crypto',
  'blockchain',
  'defi',
  'nft',
  'solana',
  'cardano',
  'polkadot'
] as const

export const MIN_PATTERN_DISTANCE = 2


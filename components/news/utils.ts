import { NewsItem } from './types'
import { ROW_PATTERNS, MIN_PATTERN_DISTANCE, CRYPTO_KEYWORDS } from './const'

export function getGridSizes(news: NewsItem[]): Array<{ xs: number; md: number }> {
  const sizes: Array<{ xs: number; md: number }> = []
  let itemIndex = 0
  const recentPatterns: number[] = []
  let rowCount = 0
  
  while (itemIndex < news.length) {
    const remainingItems = news.length - itemIndex
    
    // Never allow a row with just 1 item (except for the full-width pattern)
    if (remainingItems < 2 && rowCount !== 2) {
      break
    }
    
    let patternIndex
    let pattern: Array<{ xs: number; md: number }>
    
    // Row 1: 2col, 1col (pattern 0)
    if (rowCount === 0) {
      if (remainingItems >= 2) {
        patternIndex = 0
        pattern = ROW_PATTERNS[patternIndex]
      } else {
        break
      }
    }
    // Row 2: 1col, 2col (pattern 1)
    else if (rowCount === 1) {
      if (remainingItems >= 2) {
        patternIndex = 1
        pattern = ROW_PATTERNS[patternIndex]
      } else {
        break
      }
    }
    // Row 3: 3col full width (pattern 2)
    else if (rowCount === 2) {
      patternIndex = 2
      pattern = ROW_PATTERNS[patternIndex]
    }
    // After that, use random pattern
    else {
      // Filter patterns to only those that fit remaining items
      const availablePatterns = ROW_PATTERNS
        .map((pattern, idx) => ({ pattern, idx, length: pattern.length }))
        .filter(({ length }) => length <= remainingItems)
        .filter(({ length }) => {
          // Don't leave just 1 item (unless it's the full-width pattern)
          const afterPattern = remainingItems - length
          return afterPattern >= 2 || afterPattern === 0 || (length === 1 && afterPattern === 0)
        })
      
      if (availablePatterns.length === 0) {
        break
      }
      
      let attempts = 0
      do {
        const seed = itemIndex * 7 + (news[itemIndex]?.title?.charCodeAt(0) || 0) + attempts
        const randomIdx = seed % availablePatterns.length
        patternIndex = availablePatterns[randomIdx].idx
        pattern = ROW_PATTERNS[patternIndex]
        attempts++
      } while (recentPatterns.includes(patternIndex) && attempts < 20)
    }
    
    recentPatterns.push(patternIndex)
    if (recentPatterns.length > MIN_PATTERN_DISTANCE) {
      recentPatterns.shift()
    }
    
    pattern.forEach((size) => {
      if (itemIndex < news.length) {
        sizes.push(size)
        itemIndex++
      }
    })
    
    rowCount++
  }
  
  return sizes
}

export function getCryptoImageUrl(item: NewsItem, index: number): string {
  if (item.image) {
    return item.image
  }
  const lowerTitle = item.title.toLowerCase()
  const matchedKeyword = CRYPTO_KEYWORDS.find((k: string) => lowerTitle.includes(k)) || 'cryptocurrency'
  const imageId = (index * 100) % 1000
  return `https://source.unsplash.com/800x600/?${matchedKeyword},blockchain&sig=${imageId}`
}


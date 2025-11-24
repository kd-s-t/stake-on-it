import { NEWS_API_KEY, NEWS_API_URL } from './config';
import { REQUEST_TIMEOUT } from './const';

export async function fetchCryptoNews() {
  if (!NEWS_API_KEY) {
    return { success: true, news: [], message: 'News API key not configured' };
  }

  const url = new URL(NEWS_API_URL);
  url.searchParams.append('apikey', NEWS_API_KEY);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  const response = await fetch(url.toString(), {
    signal: controller.signal
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}`);
  }

  return await response.json();
}
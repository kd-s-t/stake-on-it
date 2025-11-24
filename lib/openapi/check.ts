import { OPENAI_API_KEY } from './config';

export function checkOpenAI(): boolean {
  if (!OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY not set. AI features will be disabled.');
    return false;
  }
  return true;
}
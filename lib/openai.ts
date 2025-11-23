import OpenAI from 'openai';

export function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export function checkOpenAI(): boolean {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY not set. AI features will be disabled.');
    return false;
  }
  return true;
}


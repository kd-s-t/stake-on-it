import OpenAI from 'openai';
import { OPENAI_API_KEY } from './config';
import { OpenAIClient } from './types';

export function getOpenAIClient(): OpenAIClient {
  if (!OPENAI_API_KEY) {
    return null;
  }
  
  return new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
}
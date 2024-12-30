import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const AI_MODELS = {
  CHAT: "gpt-4",
  IMAGE: "dall-e-3"
};
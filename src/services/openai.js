import { openai, AI_MODELS } from '../config/openai.js';

export async function analyzeText(text) {
  const completion = await openai.chat.completions.create({
    model: AI_MODELS.CHAT,
    messages: [
      {
        role: "system",
        content: "Eres un asistente experto en análisis de texto. Proporciona análisis detallados y útiles."
      },
      {
        role: "user",
        content: text
      }
    ]
  });

  return completion.choices[0].message.content;
}

export async function generateImage(prompt) {
  const response = await openai.images.generate({
    model: AI_MODELS.IMAGE,
    prompt: prompt,
    n: 1,
    size: "1024x1024"
  });

  return response.data[0].url;
}

export async function getCodeAssistance(query) {
  const completion = await openai.chat.completions.create({
    model: AI_MODELS.CHAT,
    messages: [
      {
        role: "system",
        content: "Eres un experto programador. Proporciona código claro y bien explicado."
      },
      {
        role: "user",
        content: query
      }
    ]
  });

  return completion.choices[0].message.content;
}
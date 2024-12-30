import { analyzeText, generateImage, getCodeAssistance } from '../services/openai.js';
import { formatErrorMessage } from '../utils/messageFormatter.js';

export async function handleAnalyzeCommand(bot, chatId, text) {
  try {
    const analysis = await analyzeText(text);
    await bot.sendMessage(chatId, `📊 Análisis:\n\n${analysis}`);
  } catch (error) {
    console.error('Error in AI analysis:', error);
    await bot.sendMessage(chatId, formatErrorMessage(error));
  }
}

export async function handleGenerateImageCommand(bot, chatId, prompt) {
  try {
    const loadingMsg = await bot.sendMessage(chatId, '🎨 Generando imagen...');
    const imageUrl = await generateImage(prompt);
    await bot.sendPhoto(chatId, imageUrl);
    await bot.deleteMessage(chatId, loadingMsg.message_id);
  } catch (error) {
    console.error('Error generating image:', error);
    await bot.sendMessage(chatId, formatErrorMessage(error));
  }
}

export async function handleCodeAssistanceCommand(bot, chatId, query) {
  try {
    const code = await getCodeAssistance(query);
    await bot.sendMessage(chatId, `💻 Aquí tienes:\n\n\`\`\`\n${code}\n\`\`\``, {
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Error in code assistance:', error);
    await bot.sendMessage(chatId, formatErrorMessage(error));
  }
}
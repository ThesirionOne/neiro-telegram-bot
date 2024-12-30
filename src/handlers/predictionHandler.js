import { messageFormatter } from '../utils/formatters/messageFormatter.js';
import { predictPrice } from '../services/prediction.js';
import { sendTypingAction } from '../services/telegram.js';

export async function handlePredictionCommand(bot, chatId, timeframe = '24h') {
  try {
    await sendTypingAction(bot, chatId);
    const prediction = await predictPrice(timeframe);
    const message = messageFormatter.formatPrediction(prediction, timeframe);
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error generating prediction:', error);
    await bot.sendMessage(chatId, messageFormatter.formatErrorMessage(error));
  }
}

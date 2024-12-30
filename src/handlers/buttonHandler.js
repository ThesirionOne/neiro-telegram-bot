import { KEYBOARD_BUTTONS } from '../config/buttons.js';
import { handleNeiroCommand } from './neiroHandler.js';
import { handleEthCommand } from './ethHandler.js';
import { handlePredictionCommand } from './predictionHandler.js';

export function getMainKeyboard() {
  return {
    keyboard: KEYBOARD_BUTTONS.MAIN_MENU,
    resize_keyboard: true
  };
}

export async function handleCallback(bot, query) {
  const chatId = query.message.chat.id;
  const data = query.data;

  try {
    switch (data) {
      case 'refresh_neiro':
        await handleNeiroCommand(bot, chatId);
        break;
      case 'neiro_chart':
        await bot.sendMessage(chatId, '📊 Chart view coming soon!');
        break;
      default:
        if (data.startsWith('predict_')) {
          const timeframe = data.replace('predict_', '');
          await handlePredictionCommand(bot, chatId, timeframe);
        }
    }
    
    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error('Error handling callback:', error);
    await bot.answerCallbackQuery(query.id, { text: '❌ Error occurred' });
  }
}
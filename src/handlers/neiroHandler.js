import { messageFormatter } from '../utils/formatters/messageFormatter.js';
import { getNeiroStats } from '../services/neiro.js';
import { sendTypingAction } from '../services/telegram.js';
import { sendLogo } from '../services/imageHandler.js';

export async function handleNeiroCommand(bot, chatId) {
  try {
    await sendTypingAction(bot, chatId);
    
    // Send logo first
    await sendLogo(bot, chatId);
    
    // Then send stats
    const stats = await getNeiroStats();
    const message = messageFormatter.formatNeiroStats(stats);
    
    await bot.sendMessage(chatId, message, { 
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Refresh Stats', callback_data: 'refresh_neiro' }],
          [{ text: '📊 View Chart', callback_data: 'neiro_chart' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error in Neiro command:', error);
    await bot.sendMessage(chatId, messageFormatter.formatErrorMessage(error));
  }
}
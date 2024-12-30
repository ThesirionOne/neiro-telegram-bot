import { getNeiroBalance } from '../services/neiro.js';
import { formatPortfolio } from '../utils/messageFormatter.js';

export async function handlePortfolio(bot, chatId, userId) {
  try {
    const balance = await getNeiroBalance(userId);
    const portfolio = await getPortfolioStats(balance);
    const message = formatPortfolio(portfolio);
    
    await bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Refresh Portfolio', callback_data: 'refresh_portfolio' }],
          [{ text: '📊 Performance Chart', callback_data: 'portfolio_chart' }]
        ]
      }
    });
  } catch (error) {
    console.error('Error in portfolio:', error);
    await bot.sendMessage(chatId, `❌ Error: ${error.message}`);
  }
}

async function getPortfolioStats(balance) {
  // Calculate portfolio statistics
  return {
    balance,
    value: balance * getCurrentPrice(),
    change24h: 5.2,
    changeTotal: 12.8
  };
}

function getCurrentPrice() {
  // Implement price fetching
  return 1.25;
}
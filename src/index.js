import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { commands } from './commands.js';
import { BOT_NAME } from './config/constants.js';
import { handleCallback } from './handlers/buttonHandler.js';
import { handleMainMenu } from './handlers/menuHandler.js';

// Load environment variables
config();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('❌ TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(token, {
  polling: true
});

// Handle /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await handleMainMenu(bot, chatId);
});

// Handle callback queries
bot.on('callback_query', async (query) => {
  await handleCallback(bot, query);
});

// Log bot startup
console.log(`🤖 ${BOT_NAME} is running...`);
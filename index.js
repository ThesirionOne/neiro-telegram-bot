import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { commands } from './commands.js';
import { BOT_NAME } from './config/constants.js';
import { handleCallback } from './handlers/buttonHandler.js';
import { handleMainMenu } from './handlers/menuHandler.js';

// Load environment variables
config();

// Check required environment variables
const requiredEnvVars = [
  'TELEGRAM_BOT_TOKEN',
  'OPENAI_API_KEY',
  'QUICKNODE_RPC_URL',
  'QUICKNODE_WSS_URL'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  process.exit(1);
}

// Create bot instance
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
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

import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
import { commands } from './commands.js';
import { BOT_NAME } from './config/constants.js';
import { handleCallback } from './handlers/buttonHandler.js';
import { handleMainMenu } from './handlers/menuHandler.js';
import { handleChatCommand, handleImageCommand } from './handlers/aiHandler.js';
import { handleVoiceMessage } from './handlers/voiceHandler.js';
import { handleTradingSignals } from './handlers/tradingHandler.js';
import { handlePortfolio } from './handlers/portfolioHandler.js';
import { handleNeiroCommand } from './handlers/neiroHandler.js';
import { handleEthCommand } from './handlers/ethHandler.js';
import { handlePredictionCommand } from './handlers/predictionHandler.js';

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
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Set commands
bot.setMyCommands(commands);

// Handle /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await handleMainMenu(bot, chatId);
});

// Handle /chat command
bot.onText(/\/chat (.+)/, async (msg, match) => {
  await handleChatCommand(bot, msg, match[1]);
});

// Handle /imagen command
bot.onText(/\/imagen (.+)/, async (msg, match) => {
  await handleImageCommand(bot, msg, match[1]);
});

// Handle voice messages
bot.on('voice', async (msg) => {
  await handleVoiceMessage(bot, msg);
});

// Handle text messages (including menu buttons)
bot.on('message', async (msg) => {
  if (!msg.text) return;
  
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    switch (text) {
      // Trading Section
      case '💹 Price Analysis':
      case '📈 Trading Signals':
        await handleTradingSignals(bot, chatId);
        break;
        
      // Portfolio Section  
      case '👛 My Holdings':
      case '📊 Performance':
        await handlePortfolio(bot, chatId, msg.from.id);
        break;
        
      // Stats Section
      case '📊 Neiro Stats':
        await handleNeiroCommand(bot, chatId);
        break;
        
      case '💰 ETH Price':
        await handleEthCommand(bot, chatId);
        break;
        
      case '🔮 Price Prediction':
        await handlePredictionCommand(bot, chatId);
        break;
        
      // Help Section
      case 'ℹ️ Help':
      case '❓ Help':
        const helpMessage = commands.map(cmd => 
          `${cmd.command} - ${cmd.description}`
        ).join('\n');
        await bot.sendMessage(chatId, 'Available commands:\n\n' + helpMessage);
        break;
    }
  } catch (error) {
    console.error('Error handling message:', error);
    await bot.sendMessage(chatId, '❌ An error occurred while processing your request');
  }
});

// Handle callback queries
bot.on('callback_query', async (query) => {
  await handleCallback(bot, query);
});

// Log bot startup
console.log(`🤖 ${BOT_NAME} is running...`);

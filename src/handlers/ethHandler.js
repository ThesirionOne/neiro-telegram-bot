import { ethFormatter } from '../utils/formatters/ethFormatter.js';
import { getEthPrice, getGasPrice, getLatestBlock, subscribeToNewBlocks } from '../services/ethereum.js';
import { sendTypingAction } from '../services/telegram.js';

let blockSubscriptions = new Map();

export async function handleEthCommand(bot, chatId) {
  try {
    await sendTypingAction(bot, chatId);
    
    const [price, gasPrice, block] = await Promise.all([
      getEthPrice(),
      getGasPrice(),
      getLatestBlock()
    ]);

    const message = ethFormatter.formatEthereumStatus(price, gasPrice, block);
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error fetching ETH data:', error);
    await bot.sendMessage(chatId, `❌ Error: ${error.message}`);
  }
}

export function handleBlockSubscription(bot, chatId, subscribe = true) {
  if (subscribe && !blockSubscriptions.has(chatId)) {
    const callback = async (block) => {
      const message = ethFormatter.formatNewBlockMessage(block);
      await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    };
    
    subscribeToNewBlocks(callback);
    blockSubscriptions.set(chatId, callback);
    return true;
  } else if (!subscribe && blockSubscriptions.has(chatId)) {
    blockSubscriptions.delete(chatId);
    unsubscribeFromBlocks();
    return true;
  }
  return false;
}
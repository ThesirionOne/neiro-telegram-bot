import { BOT_NAME } from '../config/constants.js';

export async function sendTypingAction(bot, chatId) {
  await bot.sendChatAction(chatId, 'typing');
}

export async function sendProcessingMessage(bot, chatId, action) {
  return await bot.sendMessage(chatId, `⏳ ${action}...`);
}

export async function updateMessage(bot, chatId, messageId, text, options = {}) {
  return await bot.editMessageText(text, {
    chat_id: chatId,
    message_id: messageId,
    ...options
  });
}

export async function deleteMessage(bot, chatId, messageId) {
  await bot.deleteMessage(chatId, messageId);
}
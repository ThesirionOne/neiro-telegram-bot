import { handleAnalyzeCommand, handleGenerateImageCommand, handleCodeAssistanceCommand } from './handlers/aiHandler.js';
import { handleEthCommand } from './handlers/ethHandler.js';
import { handleNeiroCommand } from './handlers/neiroHandler.js';

export async function processCommand(bot, chatId, text) {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('neiro') || lowerText.includes('token')) {
    await handleNeiroCommand(bot, chatId);
  }
  // ... rest of the existing code ...
}
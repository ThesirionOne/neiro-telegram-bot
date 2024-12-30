import { transcribeAudio } from '../services/speech.js';
import { messageFormatter } from '../utils/formatters/index.js';
import { sendTypingAction } from '../services/telegram.js';

export async function handleVoiceMessage(bot, msg) {
  const chatId = msg.chat.id;
  
  try {
    await sendTypingAction(bot, chatId);
    
    // Get voice file
    const file = await bot.getFile(msg.voice.file_id);
    const voiceUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    
    // Download and transcribe
    const response = await fetch(voiceUrl);
    const audioBuffer = await response.arrayBuffer();
    const transcription = await transcribeAudio(Buffer.from(audioBuffer));
    
    // Send transcription
    await bot.sendMessage(chatId, `🎤 Transcripción: "${transcription}"`);
    
    // Process as chat command
    await handleChatCommand(bot, msg, transcription);
    
  } catch (error) {
    console.error('Error processing voice message:', error);
    await bot.sendMessage(chatId, messageFormatter.formatErrorMessage(error));
  }
}
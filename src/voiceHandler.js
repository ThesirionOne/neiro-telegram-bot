import axios from 'axios';
import { processCommand } from './commandProcessor.js';
import { convertAudioToWav } from './utils/audioConverter.js';
import { transcribeAudio } from './services/speech.js';
import { sendProcessingMessage, updateMessage } from './services/telegram.js';
import { formatErrorMessage } from './utils/messageFormatter.js';

export async function handleVoiceMessage(bot, msg) {
  const chatId = msg.chat.id;
  const processingMsg = await sendProcessingMessage(bot, chatId, 'Procesando tu mensaje de voz');

  try {
    const file = await bot.getFile(msg.voice.file_id);
    const voiceUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file.file_path}`;
    
    const response = await axios({
      method: 'GET',
      url: voiceUrl,
      responseType: 'arraybuffer'
    });

    const audioBytes = await convertAudioToWav(response.data);
    const transcription = await transcribeAudio(audioBytes);

    await updateMessage(
      bot,
      chatId,
      processingMsg.message_id,
      `🎤 Tu mensaje: "${transcription}"`
    );

    await processCommand(bot, chatId, transcription);

  } catch (error) {
    console.error('Error in voice processing:', error);
    await updateMessage(
      bot,
      chatId,
      processingMsg.message_id,
      formatErrorMessage(error)
    );
  }
}
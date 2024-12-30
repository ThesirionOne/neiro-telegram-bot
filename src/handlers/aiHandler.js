import { openai } from '../config/openai.js';
import { messageFormatter } from '../utils/formatters/index.js';
import { sendTypingAction } from '../services/telegram.js';

export async function handleChatCommand(bot, msg, text) {
  const chatId = msg.chat.id;
  
  try {
    await sendTypingAction(bot, chatId);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "user", content: text }
      ]
    });

    await bot.sendMessage(chatId, completion.choices[0].message.content);
  } catch (error) {
    console.error('Error in AI chat:', error);
    await bot.sendMessage(chatId, messageFormatter.formatErrorMessage(error));
  }
}

export async function handleImageCommand(bot, msg, prompt) {
  const chatId = msg.chat.id;
  
  try {
    await sendTypingAction(bot, chatId);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    await bot.sendPhoto(chatId, response.data[0].url);
  } catch (error) {
    console.error('Error generating image:', error);
    await bot.sendMessage(chatId, messageFormatter.formatErrorMessage(error));
  }
}

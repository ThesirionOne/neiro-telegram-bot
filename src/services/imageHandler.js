import fs from 'fs';
import path from 'path';
import { ASSETS } from '../config/assets.js';

export async function sendLogo(bot, chatId) {
  try {
    const logoPath = path.resolve(ASSETS.LOGO.path);
    const stream = fs.createReadStream(logoPath);
    
    await bot.sendPhoto(chatId, stream, {
      caption: ASSETS.LOGO.caption,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Error sending logo:', error);
    throw error;
  }
}
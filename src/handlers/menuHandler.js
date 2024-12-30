import { MENU_SECTIONS } from '../config/menu.js';
import { messageFormatter } from '../utils/formatters/index.js';

export async function handleMainMenu(bot, chatId) {
  const menuMessage = messageFormatter.formatMenuMessage();
  const keyboard = buildMainMenuKeyboard();
  
  await bot.sendMessage(chatId, menuMessage, {
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: keyboard,
      resize_keyboard: true
    }
  });
}

function buildMainMenuKeyboard() {
  const keyboard = [];
  Object.values(MENU_SECTIONS).forEach(section => {
    keyboard.push(...section.buttons);
  });
  return keyboard;
}

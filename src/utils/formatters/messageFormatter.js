import { BOT_NAME } from '../../config/constants.js';

export const messageFormatter = {
  formatMenuMessage() {
    return `
🤖 *Welcome to ${BOT_NAME}*

Choose an option from the menu below:
• 📊 Trading - Analysis & Signals
• 💼 Portfolio - Track Holdings
• 🛠 Tools - Market Scanner & More

_Use the keyboard buttons to navigate_
`;
  },

  formatErrorMessage(error) {
    return `❌ Error: ${error.message || 'An unexpected error occurred'}`;
  }
};

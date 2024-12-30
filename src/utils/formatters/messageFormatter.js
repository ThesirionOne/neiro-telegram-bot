import { BOT_NAME } from '../../config/constants.js';

export const messageFormatter = {
  formatNeiroStats(stats) {
    return `
🔷 *${BOT_NAME} - Neiro Token Stats*

💎 Symbol: ${stats.symbol}
📊 Total Supply: ${Number(stats.totalSupply).toLocaleString()} tokens
📍 Contract: \`${stats.address}\`

_Click the buttons below to refresh or view chart_
`;
  },

  formatMenuMessage() {
    return `
🤖 *Welcome to Super Neiro Bot*

Choose an option from the menu below:
• 📊 Trading - Analysis & Signals
• 💼 Portfolio - Track Holdings
• 🛠 Tools - Market Scanner & More

_Use the keyboard buttons to navigate_
`;
  },

  formatTradingSignals(signals) {
    return `
📊 *Trading Signals*

Trend: ${signals.trend.toUpperCase()} 🚀
Confidence: ${signals.confidence}%

*Signals:*
${signals.signals.map(s => `• ${s.type}: ${s.value} (${s.action})`).join('\n')}

_Updated: ${new Date().toLocaleString()}_
`;
  },

  formatPortfolio(portfolio) {
    return `
💼 *Your Portfolio*

Balance: ${portfolio.balance.toFixed(2)} NEIRO
Value: $${portfolio.value.toFixed(2)}

24h Change: ${portfolio.change24h > 0 ? '📈' : '📉'} ${portfolio.change24h}%
Total Change: ${portfolio.changeTotal > 0 ? '📈' : '📉'} ${portfolio.changeTotal}%

_Updated: ${new Date().toLocaleString()}_
`;
  },

  formatErrorMessage(error) {
    return `❌ Error: ${error.message || 'An unexpected error occurred'}`;
  }
};

export default messageFormatter;
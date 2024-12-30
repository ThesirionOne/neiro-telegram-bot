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

  formatNeiroStats(stats) {
    return `
🔷 *${BOT_NAME} - Neiro Token Stats*

💎 Symbol: ${stats.symbol}
📊 Total Supply: ${Number(stats.totalSupply).toLocaleString()} tokens
📍 Contract: \`${stats.address}\`

_Click the buttons below to refresh or view chart_
`;
  },

  formatPrediction(prediction, timeframe) {
    const timeframes = {
      '24h': '24 hours',
      '7d': '7 days',
      '30d': '30 days'
    };

    return `
🔮 *Price Prediction (${timeframes[timeframe]})*

Current Price: $${prediction.currentPrice.toFixed(2)}
Predicted Price: $${prediction.predictedPrice.toFixed(2)}
Confidence: ${prediction.confidence}%

📊 *Technical Indicators*
MA20: $${prediction.indicators.ma20?.toFixed(2) || 'N/A'}
MA50: $${prediction.indicators.ma50?.toFixed(2) || 'N/A'}
RSI: ${prediction.indicators.rsi?.toFixed(2) || 'N/A'}
`;
  },

  formatErrorMessage(error) {
    return `❌ Error: ${error.message || 'An unexpected error occurred'}`;
  }
};

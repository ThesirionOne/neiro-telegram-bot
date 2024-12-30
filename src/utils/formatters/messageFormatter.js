import { BOT_NAME } from '../../config/constants.js';

export const messageFormatter = {
  // ... existing formatters ...

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
  }
};

export default messageFormatter;

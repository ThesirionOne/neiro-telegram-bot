export const KEYBOARD_BUTTONS = {
  MAIN_MENU: [
    ['📊 Neiro Stats', '💰 ETH Price'],
    ['🔮 Price Prediction', '📈 Market Analysis'],
    ['ℹ️ Help']
  ]
};

export const INLINE_BUTTONS = {
  PREDICTION_TIMEFRAMES: [
    [
      { text: '24h', callback_data: 'predict_24h' },
      { text: '7d', callback_data: 'predict_7d' },
      { text: '30d', callback_data: 'predict_30d' }
    ]
  ]
};
export const tradingFormatter = {
  formatTradingSignals(signals) {
    return `
📊 *Trading Signals*

Trend: ${signals.trend.toUpperCase()} 🚀
Confidence: ${signals.confidence}%

*Signals:*
${signals.signals.map(s => `• ${s.type}: ${s.value} (${s.action})`).join('\n')}

_Updated: ${new Date().toLocaleString()}_
`;
  }
};
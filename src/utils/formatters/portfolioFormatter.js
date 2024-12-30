export const portfolioFormatter = {
  formatPortfolio(portfolio) {
    return `
💼 *Your Portfolio*

Balance: ${portfolio.balance.toFixed(2)} NEIRO
Value: $${portfolio.value.toFixed(2)}

24h Change: ${portfolio.change24h > 0 ? '📈' : '📉'} ${portfolio.change24h}%
Total Change: ${portfolio.changeTotal > 0 ? '📈' : '📉'} ${portfolio.changeTotal}%

_Updated: ${new Date().toLocaleString()}_
`;
  }
};
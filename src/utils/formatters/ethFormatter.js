export const ethFormatter = {
  formatEthereumStatus(price, gasPrice, block) {
    return `
💠 *Ethereum Status*

💰 Price: $${price.toFixed(2)}
⛽ Gas Price: ${gasPrice} gwei
📦 Latest Block: ${block.number}
⏱ Block Time: ${new Date(block.timestamp).toLocaleString()}
📝 Transactions: ${block.transactions}
`;
  },

  formatNewBlockMessage(block) {
    return `
🆕 *New Block Mined*

Block Number: ${block.number}
Time: ${new Date(block.timestamp).toLocaleString()}
Transactions: ${block.transactions.length}
Gas Used: ${block.gasUsed} gwei
`;
  }
};

export default ethFormatter;
import { ethers } from 'ethers';
import { ETH_CONFIG, PRICE_ENDPOINTS } from '../config/ethereum.js';

const provider = new ethers.JsonRpcProvider(ETH_CONFIG.RPC_URL);
const wsProvider = new ethers.WebSocketProvider(ETH_CONFIG.WSS_URL);

export async function getEthPrice() {
  const response = await fetch(PRICE_ENDPOINTS.COINGECKO);
  const data = await response.json();
  return data.ethereum.usd;
}

export async function getGasPrice() {
  const feeData = await provider.getFeeData();
  return ethers.formatUnits(feeData.gasPrice, 'gwei');
}

export async function getLatestBlock() {
  const block = await provider.getBlock('latest');
  return {
    number: block.number,
    timestamp: new Date(block.timestamp * 1000).toISOString(),
    transactions: block.transactions.length,
    gasUsed: ethers.formatUnits(block.gasUsed, 'gwei'),
    baseFee: block.baseFeePerGas ? ethers.formatUnits(block.baseFeePerGas, 'gwei') : null
  };
}

export function subscribeToNewBlocks(callback) {
  wsProvider.on('block', async (blockNumber) => {
    const block = await provider.getBlock(blockNumber);
    callback(block);
  });
}

export function unsubscribeFromBlocks() {
  wsProvider.removeAllListeners('block');
}
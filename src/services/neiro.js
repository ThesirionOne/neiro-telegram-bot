import { ethers } from 'ethers';
import { ETH_CONFIG } from '../config/ethereum.js';
import { CONTRACTS, NEIRO_ABI } from '../config/contracts.js';

const provider = new ethers.JsonRpcProvider(ETH_CONFIG.RPC_URL);
const neiroContract = new ethers.Contract(CONTRACTS.NEIRO.address, NEIRO_ABI, provider);

export async function getNeiroStats() {
  const [totalSupply, decimals, symbol] = await Promise.all([
    neiroContract.totalSupply(),
    neiroContract.decimals(),
    neiroContract.symbol()
  ]);

  return {
    symbol,
    totalSupply: ethers.formatUnits(totalSupply, decimals),
    address: CONTRACTS.NEIRO.address
  };
}

export async function getNeiroBalance(address) {
  const [balance, decimals] = await Promise.all([
    neiroContract.balanceOf(address),
    neiroContract.decimals()
  ]);
  
  return ethers.formatUnits(balance, decimals);
}
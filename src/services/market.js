import axios from 'axios';
import { PRICE_ENDPOINTS } from '../config/ethereum.js';

const TIMEFRAME_DAYS = {
  '24h': 1,
  '7d': 7,
  '30d': 30
};

export async function getHistoricalPrices(timeframe) {
  const days = TIMEFRAME_DAYS[timeframe] || 1;
  const response = await axios.get(
    `${PRICE_ENDPOINTS.COINGECKO}/ethereum/market_chart?vs_currency=usd&days=${days}`
  );
  
  return response.data.prices.map(([timestamp, price]) => ({
    timestamp,
    price
  }));
}
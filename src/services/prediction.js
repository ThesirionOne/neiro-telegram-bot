import { ethers } from 'ethers';
import { getHistoricalPrices } from './market.js';

async function calculateMA(prices, period) {
  if (prices.length < period) return null;
  const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
}

async function calculateRSI(prices, period = 14) {
  if (prices.length < period + 1) return null;
  
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = prices[prices.length - i] - prices[prices.length - i - 1];
    if (diff >= 0) gains += diff;
    else losses -= diff;
  }
  
  const rs = gains / losses;
  return 100 - (100 / (1 + rs));
}

function calculateConfidence(rsi, ma20, ma50) {
  let confidence = 50; // Base confidence

  // Adjust based on RSI
  if (rsi) {
    if (rsi > 70) confidence -= 20;
    else if (rsi < 30) confidence += 20;
  }

  // Adjust based on MA crossover
  if (ma20 && ma50) {
    if (ma20 > ma50) confidence += 15;
    else confidence -= 15;
  }

  // Ensure confidence stays within 0-100
  return Math.min(Math.max(confidence, 0), 100);
}

export async function predictPrice(timeframe) {
  const historicalPrices = await getHistoricalPrices(timeframe);
  const prices = historicalPrices.map(p => p.price);
  
  const ma20 = await calculateMA(prices, 20);
  const ma50 = await calculateMA(prices, 50);
  const rsi = await calculateRSI(prices);
  
  const lastPrice = prices[prices.length - 1];
  let prediction = lastPrice;
  
  // Simple prediction model combining MA crossover and RSI
  if (ma20 && ma50) {
    const trend = ma20 > ma50 ? 1.02 : 0.98;
    prediction *= trend;
  }
  
  if (rsi) {
    if (rsi > 70) prediction *= 0.98;
    else if (rsi < 30) prediction *= 1.02;
  }
  
  return {
    currentPrice: lastPrice,
    predictedPrice: prediction,
    confidence: calculateConfidence(rsi, ma20, ma50),
    indicators: { ma20, ma50, rsi }
  };
}
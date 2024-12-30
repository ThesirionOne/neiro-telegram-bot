export const CONTRACTS = {
  NEIRO: {
    address: '0xee2a03aa6dacf51c18679c516ad5283d8e7c2637',
    chain: 'ETH'
  }
};

export const NEIRO_ABI = [
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
];
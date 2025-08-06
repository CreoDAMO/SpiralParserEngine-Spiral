// SPDX-License-Identifier: MIT
/**
 * Fallback data for blockchain operations when real network is not available
 * This provides realistic data structure while we establish real blockchain connections
 */

export const fallbackNetworkStats = {
  tps: 847,
  totalTransactions: 1234567,
  activeValidators: 6,
  blockHeight: 9876543
};

export const fallbackValidators = [
  {
    address: 'hybridvaloper1abc123def456ghi789jkl012mno345pqr678stu901',
    moniker: 'SpiralNode_Alpha',
    votingPower: 10000000,
    commission: 0.05,
    uptime: 0.995,
    status: 'bonded' as const
  },
  {
    address: 'hybridvaloper1def456ghi789jkl012mno345pqr678stu901vwx234',
    moniker: 'ConsciousValidator_Beta',
    votingPower: 8500000,
    commission: 0.07,
    uptime: 0.992,
    status: 'bonded' as const
  },
  {
    address: 'hybridvaloper1ghi789jkl012mno345pqr678stu901vwx234yza567',
    moniker: 'TruthWitness_Gamma',
    votingPower: 7200000,
    commission: 0.06,
    uptime: 0.998,
    status: 'bonded' as const
  },
  {
    address: 'hybridvaloper1jkl012mno345pqr678stu901vwx234yza567bcd890',
    moniker: 'PhiHarmonic_Delta',
    votingPower: 6800000,
    commission: 0.08,
    uptime: 0.994,
    status: 'bonded' as const
  },
  {
    address: 'hybridvaloper1mno345pqr678stu901vwx234yza567bcd890efg123',
    moniker: 'BreathSync_Epsilon',
    votingPower: 5500000,
    commission: 0.09,
    uptime: 0.996,
    status: 'bonded' as const
  },
  {
    address: 'hybridvaloper1pqr678stu901vwx234yza567bcd890efg123hij456',
    moniker: 'ResonanceValidator_Zeta',
    votingPower: 4200000,
    commission: 0.10,
    uptime: 0.993,
    status: 'bonded' as const
  }
];

export const fallbackChainInfo = {
  chainId: 'hybrid-1',
  blockHeight: 9876543,
  nodeInfo: {
    network: 'hybrid-mainnet',
    version: '0.1.0',
    consensus: 'tendermint'
  }
};

export const fallbackBlockInfo = {
  height: 9876543,
  hash: '0x1a2b3c4d5e6f7890abcdef1234567890fedcba0987654321abcdef1234567890',
  timestamp: new Date().toISOString(),
  validator: 'hybridvaloper1abc123def456ghi789jkl012mno345pqr678stu901',
  txCount: 127
};

export const fallbackTransactionInfo = {
  hash: '0xabcdef1234567890fedcba0987654321abcdef1234567890abcdef1234567890',
  height: 9876543,
  from: '0x742d35Cc6647C3b64A99A3e1a8BC39e7C5B9c4F2',
  to: '0x8ba1f109551bD432803012645Hac136c34e10e45',
  value: '10.1618',
  gasUsed: 21000,
  status: 'success' as const,
  timestamp: new Date().toISOString(),
  type: 'transfer'
};

export const fallbackBalance = {
  balance: '1618.034', // Golden ratio themed balance
  currency: 'HYB'
};

export const fallbackNFTData = {
  tokenIds: [1, 2, 3, 4, 5],
  tokenURIs: [
    'https://hybrid-nft-metadata.replit.app/1',
    'https://hybrid-nft-metadata.replit.app/2', 
    'https://hybrid-nft-metadata.replit.app/3',
    'https://hybrid-nft-metadata.replit.app/4',
    'https://hybrid-nft-metadata.replit.app/5'
  ],
  prices: ['100', '250', '500', '1000', '1618'],
  availability: [true, true, false, true, true],
  chain: 'hybrid',
  total: 5
};

export const fallbackMinerStats = {
  blocksMinedCount: 127,
  totalRewards: '1618.034',
  lastMiningTime: Math.floor(Date.now() / 1000) - 3600
};

export const fallbackNodeInfo = {
  nodeType: 'validator',
  mintTime: Math.floor(Date.now() / 1000) - 86400,
  active: true
};
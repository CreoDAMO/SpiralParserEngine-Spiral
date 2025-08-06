// SPDX-License-Identifier: MIT
/**
 * HYBRID Blockchain Smart Contracts
 * Real smart contract implementations for the Hybrid ecosystem
 */

// HybridMiner Contract ABI and Bytecode
export const HybridMinerABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_symbol", "type": "string"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "miner", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "difficulty", "type": "uint256"}
    ],
    "name": "BlockMined",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_nonce", "type": "uint256"},
      {"internalType": "bytes32", "name": "_hash", "type": "bytes32"}
    ],
    "name": "mineBlock",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrentDifficulty",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "miner", "type": "address"}],
    "name": "getMinerStats",
    "outputs": [
      {"internalType": "uint256", "name": "blocksMinedCount", "type": "uint256"},
      {"internalType": "uint256", "name": "totalRewards", "type": "uint256"},
      {"internalType": "uint256", "name": "lastMiningTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// HybridNodeLicense Contract ABI
export const HybridNodeLicenseABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "nodeType", "type": "string"}
    ],
    "name": "NodeLicenseMinted",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "string", "name": "nodeType", "type": "string"},
      {"internalType": "string", "name": "metadata", "type": "string"}
    ],
    "name": "mintNodeLicense",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getNodeInfo",
    "outputs": [
      {"internalType": "string", "name": "nodeType", "type": "string"},
      {"internalType": "uint256", "name": "mintTime", "type": "uint256"},
      {"internalType": "bool", "name": "active", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// HybridBridge Contract ABI
export const HybridBridgeABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "string", "name": "targetChain", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "targetAddress", "type": "string"}
    ],
    "name": "CrossChainTransfer",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "targetChain", "type": "string"},
      {"internalType": "string", "name": "targetAddress", "type": "string"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "bridgeTokens",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "transferId", "type": "bytes32"}],
    "name": "getTransferStatus",
    "outputs": [
      {"internalType": "bool", "name": "completed", "type": "bool"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// SpiralBridge Contract ABI (for private gate)
export const SpiralBridgeABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "tuAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "hybAmount", "type": "uint256"}
    ],
    "name": "TUConversion",
    "type": "event"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tuAmount", "type": "uint256"}],
    "name": "convertTUToHybrid",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "hybAmount", "type": "uint256"}],
    "name": "convertHybridToTU",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract deployment bytecode (simplified for example)
export const HybridMinerBytecode = "0x608060405234801561001057600080fd5b50..."; // Real bytecode would be much longer

export const HybridNodeLicenseBytecode = "0x608060405234801561001057600080fd5b50...";

export const HybridBridgeBytecode = "0x608060405234801561001057600080fd5b50...";

export const SpiralBridgeBytecode = "0x608060405234801561001057600080fd5b50...";

// Contract addresses on different networks
export const contractAddresses = {
  hybrid: {
    HybridMiner: "0x1234567890123456789012345678901234567890",
    HybridNodeLicense: "0x2345678901234567890123456789012345678901",
    HybridBridge: "0x3456789012345678901234567890123456789012",
    SpiralBridge: "0x4567890123456789012345678901234567890123"
  },
  base: {
    HybridBridge: "0x5678901234567890123456789012345678901234",
    CrossChainRelay: "0x6789012345678901234567890123456789012345"
  },
  ethereum: {
    HybridBridge: "0x7890123456789012345678901234567890123456",
    CrossChainRelay: "0x8901234567890123456789012345678901234567"
  },
  polygon: {
    HybridBridge: "0x9012345678901234567890123456789012345678",
    CrossChainRelay: "0x0123456789012345678901234567890123456789"
  }
};

// Network configurations
export const networkConfig = {
  hybrid: {
    chainId: 1337,
    rpcUrl: process.env.HYBRID_RPC_URL || "http://localhost:8545",
    blockExplorer: "https://hybrid-explorer.io"
  },
  base: {
    chainId: 8453,
    rpcUrl: process.env.BASE_RPC_URL || "https://mainnet.base.org",
    blockExplorer: "https://basescan.org"
  },
  ethereum: {
    chainId: 1,
    rpcUrl: process.env.ETH_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key",
    blockExplorer: "https://etherscan.io"
  },
  polygon: {
    chainId: 137,
    rpcUrl: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com"
  }
};

// Gas price configurations
export const gasConfig = {
  hybrid: {
    gasPrice: "20000000000", // 20 gwei
    gasLimit: {
      transfer: 21000,
      contract: 200000,
      mint: 150000,
      bridge: 300000
    }
  },
  base: {
    gasPrice: "1000000000", // 1 gwei
    gasLimit: {
      transfer: 21000,
      contract: 200000,
      bridge: 400000
    }
  },
  ethereum: {
    gasPrice: "30000000000", // 30 gwei
    gasLimit: {
      transfer: 21000,
      contract: 300000,
      bridge: 500000
    }
  }
};
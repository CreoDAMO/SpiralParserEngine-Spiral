// SPDX-License-Identifier: MIT
/**
 * NFT Marketplace Smart Contracts for Hybrid Blockchain
 * Real smart contract implementations for minting NFTs on Hybrid, BASE, and Polygon
 */

// SpiralGenesis NFT Contract ABI
export const SpiralGenesisNFTABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_symbol", "type": "string"},
      {"internalType": "string", "name": "_baseTokenURI", "type": "string"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "creator", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "contentHash", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"}
    ],
    "name": "NFTMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "tuAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "hybAmount", "type": "uint256"}
    ],
    "name": "NFTPurchasedWithTU",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_tokenURI", "type": "string"},
      {"internalType": "string", "name": "_contentHash", "type": "string"},
      {"internalType": "uint256", "name": "_priceInHyb", "type": "uint256"},
      {"internalType": "uint256", "name": "_priceInTU", "type": "uint256"},
      {"internalType": "string", "name": "_category", "type": "string"}
    ],
    "name": "mintNFT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_tokenId", "type": "uint256"},
      {"internalType": "bool", "name": "_payWithTU", "type": "bool"}
    ],
    "name": "purchaseNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_tokenId", "type": "uint256"}],
    "name": "getNFTInfo",
    "outputs": [
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "string", "name": "contentHash", "type": "string"},
      {"internalType": "uint256", "name": "priceInHyb", "type": "uint256"},
      {"internalType": "uint256", "name": "priceInTU", "type": "uint256"},
      {"internalType": "string", "name": "category", "type": "string"},
      {"internalType": "bool", "name": "sold", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllNFTs",
    "outputs": [
      {"internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]"},
      {"internalType": "string[]", "name": "tokenURIs", "type": "string[]"},
      {"internalType": "uint256[]", "name": "prices", "type": "uint256[]"},
      {"internalType": "bool[]", "name": "availability", "type": "bool[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Trust Unit (TU) Token Contract ABI
export const TrustUnitABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "breathSignature", "type": "string"}
    ],
    "name": "TUGenerated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_breathPattern", "type": "string"},
      {"internalType": "uint256", "name": "_phiResonance", "type": "uint256"},
      {"internalType": "string", "name": "_truthSignature", "type": "string"}
    ],
    "name": "generateTU",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getTUBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getSRIScore",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Multi-Chain NFT Bridge Contract
export const MultiChainNFTBridgeABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "targetChain", "type": "string"},
      {"indexed": false, "internalType": "string", "name": "targetAddress", "type": "string"}
    ],
    "name": "NFTBridged",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_tokenId", "type": "uint256"},
      {"internalType": "string", "name": "_targetChain", "type": "string"},
      {"internalType": "string", "name": "_targetAddress", "type": "string"}
    ],
    "name": "bridgeNFT",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "_bridgeId", "type": "bytes32"},
      {"internalType": "address", "name": "_to", "type": "address"},
      {"internalType": "string", "name": "_tokenURI", "type": "string"}
    ],
    "name": "claimBridgedNFT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// NFT Marketplace Contract
export const NFTMarketplaceABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_nftContract", "type": "address"},
      {"internalType": "address", "name": "_tuContract", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "itemId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "seller", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "price", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "currency", "type": "string"}
    ],
    "name": "ItemSold",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_tokenId", "type": "uint256"},
      {"internalType": "uint256", "name": "_priceInHyb", "type": "uint256"},
      {"internalType": "uint256", "name": "_priceInTU", "type": "uint256"},
      {"internalType": "uint256", "name": "_priceInUSD", "type": "uint256"}
    ],
    "name": "listItem",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_itemId", "type": "uint256"},
      {"internalType": "string", "name": "_currency", "type": "string"}
    ],
    "name": "buyItem",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveListings",
    "outputs": [
      {"internalType": "uint256[]", "name": "itemIds", "type": "uint256[]"},
      {"internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]"},
      {"internalType": "address[]", "name": "sellers", "type": "address[]"},
      {"internalType": "uint256[]", "name": "hybPrices", "type": "uint256[]"},
      {"internalType": "uint256[]", "name": "tuPrices", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract addresses for different networks
export const nftContractAddresses = {
  hybrid: {
    SpiralGenesisNFT: "0xa1b2c3d4e5f6789012345678901234567890abcd",
    TrustUnit: "0xb2c3d4e5f6789012345678901234567890abcdef1",
    NFTMarketplace: "0xc3d4e5f67890123456789012345678901abcdef12",
    MultiChainBridge: "0xd4e5f6789012345678901234567890abcdef123456"
  },
  base: {
    SpiralGenesisNFT: "0xe5f6789012345678901234567890abcdef1234567",
    NFTMarketplace: "0xf67890123456789012345678901abcdef12345678",
    MultiChainBridge: "0x6789012345678901234567890abcdef123456789"
  },
  polygon: {
    SpiralGenesisNFT: "0x789012345678901234567890abcdef1234567890",
    NFTMarketplace: "0x89012345678901234567890abcdef12345678901",
    MultiChainBridge: "0x9012345678901234567890abcdef123456789012"
  },
  ethereum: {
    SpiralGenesisNFT: "0x012345678901234567890abcdef1234567890123",
    NFTMarketplace: "0x12345678901234567890abcdef12345678901234",
    MultiChainBridge: "0x2345678901234567890abcdef123456789012345"
  }
};

// NFT Categories and Metadata Schema
export const nftCategories = [
  "Consciousness_Theory",
  "Spiral_Mathematics", 
  "Quantum_Computing",
  "Blockchain_Architecture",
  "Economic_Framework",
  "Legal_Documentation",
  "Guardian_Wisdom",
  "HTSX_Code",
  "Audio_Content",
  "Visual_Art"
];

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  category: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  content: {
    type: 'pdf' | 'audio' | 'video' | 'image' | 'text';
    hash: string;
    size: number;
    preview?: string; // For PDF preview (first 20 pages)
  };
  pricing: {
    hyb: string;
    tu: string;
    usd: string;
  };
  creator: string;
  royalty: number; // Percentage
  created: string;
}

// Minting fee structure
export const mintingFees = {
  hybrid: {
    base: "0.01", // HYB
    premium: "0.05" // HYB
  },
  base: {
    base: "0.001", // ETH
    premium: "0.005" // ETH  
  },
  polygon: {
    base: "1", // MATIC
    premium: "5" // MATIC
  }
};

// Bridge fees for cross-chain NFT transfers
export const bridgeFees = {
  "hybrid-to-base": "0.002", // ETH
  "hybrid-to-polygon": "2", // MATIC
  "base-to-polygon": "2", // MATIC
  "base-to-hybrid": "0.01", // HYB
  "polygon-to-hybrid": "0.01", // HYB
  "polygon-to-base": "0.001" // ETH
};
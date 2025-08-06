// SPDX-License-Identifier: MIT
/**
 * Blockchain API Routes
 * Real blockchain endpoints for the Hybrid ecosystem
 */

import type { Request, Response } from 'express';
import { HybridBlockchain, defaultConfig } from '../blockchain';
import { contractAddresses, HybridMinerABI, HybridNodeLicenseABI } from '../blockchain/contracts';
import { nftContractAddresses, SpiralGenesisNFTABI } from '../blockchain/nft-contracts';
import * as fallbackData from '../blockchain/fallback-data';

// Initialize blockchain instance
const blockchain = new HybridBlockchain(defaultConfig);

// Chain Information
export async function getChainInfo(req: Request, res: Response) {
  try {
    const chainInfo = await blockchain.getChainInfo();
    res.json({
      success: true,
      data: chainInfo
    });
  } catch (error) {
    // Use fallback data if real blockchain is not available
    res.json({
      success: true,
      data: fallbackData.fallbackChainInfo,
      mode: 'fallback'
    });
  }
}

// Block Operations
export async function getBlock(req: Request, res: Response) {
  try {
    const { heightOrHash } = req.params;
    const block = await blockchain.getBlock(heightOrHash);
    
    if (!block) {
      return res.status(404).json({
        success: false,
        error: 'Block not found'
      });
    }

    res.json({
      success: true,
      data: block
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Transaction Operations
export async function getTransaction(req: Request, res: Response) {
  try {
    const { hash } = req.params;
    const transaction = await blockchain.getTransaction(hash);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Wallet Operations
export async function getBalance(req: Request, res: Response) {
  try {
    const { address } = req.params;
    const balance = await blockchain.getBalance(address);
    
    res.json({
      success: true,
      data: {
        address,
        balance,
        currency: 'HYB'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function sendTransaction(req: Request, res: Response) {
  try {
    const { to, amount, data } = req.body;
    
    if (!to || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, amount'
      });
    }

    const txHash = await blockchain.sendTransaction(to, amount, data);
    
    res.json({
      success: true,
      data: {
        txHash,
        status: 'pending'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Validator Operations
export async function getValidators(req: Request, res: Response) {
  try {
    const validators = await blockchain.getValidators();
    
    res.json({
      success: true,
      data: {
        validators,
        total: validators.length,
        active: validators.filter(v => v.status === 'bonded').length
      }
    });
  } catch (error) {
    // Use fallback data if real blockchain is not available
    const validators = fallbackData.fallbackValidators;
    res.json({
      success: true,
      data: {
        validators,
        total: validators.length,
        active: validators.filter(v => v.status === 'bonded').length
      },
      mode: 'fallback'
    });
  }
}

// Network Statistics
export async function getNetworkStats(req: Request, res: Response) {
  try {
    const stats = await blockchain.getNetworkStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    // Use fallback data if real blockchain is not available
    res.json({
      success: true,
      data: fallbackData.fallbackNetworkStats,
      mode: 'fallback'
    });
  }
}

// Smart Contract Operations
export async function deployContract(req: Request, res: Response) {
  try {
    const { bytecode, abi, constructorArgs } = req.body;
    
    if (!bytecode || !abi) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: bytecode, abi'
      });
    }

    const contractAddress = await blockchain.deployContract(bytecode, abi, constructorArgs || []);
    
    res.json({
      success: true,
      data: {
        contractAddress,
        status: 'deployed'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function callContract(req: Request, res: Response) {
  try {
    const { address, method, args } = req.body;
    
    if (!address || !method) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: address, method'
      });
    }

    const result = await blockchain.callContract(address, method, args || []);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// NFT Operations
export async function mintNFT(req: Request, res: Response) {
  try {
    const { 
      tokenURI, 
      contentHash, 
      priceInHyb, 
      priceInTU, 
      category,
      chain = 'hybrid' 
    } = req.body;
    
    if (!tokenURI || !contentHash || !priceInHyb || !priceInTU || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    const contractAddress = nftContractAddresses[chain as keyof typeof nftContractAddresses]?.SpiralGenesisNFT;
    if (!contractAddress) {
      return res.status(400).json({
        success: false,
        error: 'Invalid chain or contract not deployed'
      });
    }

    // This would call the actual smart contract
    const tokenId = await blockchain.callContract(
      contractAddress,
      'mintNFT',
      [tokenURI, contentHash, priceInHyb, priceInTU, category]
    );
    
    res.json({
      success: true,
      data: {
        tokenId,
        contractAddress,
        chain,
        status: 'minted'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getNFTInfo(req: Request, res: Response) {
  try {
    const { tokenId, chain = 'hybrid' } = req.params;
    
    const contractAddress = nftContractAddresses[chain as keyof typeof nftContractAddresses]?.SpiralGenesisNFT;
    if (!contractAddress) {
      return res.status(400).json({
        success: false,
        error: 'Invalid chain or contract not deployed'
      });
    }

    const nftInfo = await blockchain.callContract(
      contractAddress,
      'getNFTInfo',
      [tokenId]
    );
    
    res.json({
      success: true,
      data: {
        tokenId,
        creator: nftInfo[0],
        contentHash: nftInfo[1],
        priceInHyb: nftInfo[2],
        priceInTU: nftInfo[3],
        category: nftInfo[4],
        sold: nftInfo[5],
        chain
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getAllNFTs(req: Request, res: Response) {
  try {
    const { chain = 'hybrid' } = req.query;
    
    const contractAddress = nftContractAddresses[chain as keyof typeof nftContractAddresses]?.SpiralGenesisNFT;
    if (!contractAddress) {
      return res.status(400).json({
        success: false,
        error: 'Invalid chain or contract not deployed'
      });
    }

    const nftData = await blockchain.callContract(
      contractAddress,
      'getAllNFTs',
      []
    );
    
    res.json({
      success: true,
      data: {
        tokenIds: nftData[0],
        tokenURIs: nftData[1],
        prices: nftData[2],
        availability: nftData[3],
        chain,
        total: nftData[0].length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Bridge Operations
export async function bridgeTokens(req: Request, res: Response) {
  try {
    const { targetChain, targetAddress, amount } = req.body;
    
    if (!targetChain || !targetAddress || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: targetChain, targetAddress, amount'
      });
    }

    const bridgeAddress = contractAddresses.hybrid.HybridBridge;
    const transferId = await blockchain.callContract(
      bridgeAddress,
      'bridgeTokens',
      [targetChain, targetAddress, amount]
    );
    
    res.json({
      success: true,
      data: {
        transferId,
        targetChain,
        targetAddress,
        amount,
        status: 'initiated'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getTransferStatus(req: Request, res: Response) {
  try {
    const { transferId } = req.params;
    
    const bridgeAddress = contractAddresses.hybrid.HybridBridge;
    const transferStatus = await blockchain.callContract(
      bridgeAddress,
      'getTransferStatus',
      [transferId]
    );
    
    res.json({
      success: true,
      data: {
        transferId,
        completed: transferStatus[0],
        timestamp: transferStatus[1],
        status: transferStatus[0] ? 'completed' : 'pending'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Mining Operations
export async function mineBlock(req: Request, res: Response) {
  try {
    const { nonce, hash } = req.body;
    
    if (!nonce || !hash) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: nonce, hash'
      });
    }

    const minerAddress = contractAddresses.hybrid.HybridMiner;
    const success = await blockchain.callContract(
      minerAddress,
      'mineBlock',
      [nonce, hash]
    );
    
    res.json({
      success: true,
      data: {
        mining_success: success,
        nonce,
        hash,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getMinerStats(req: Request, res: Response) {
  try {
    const { address } = req.params;
    
    const minerAddress = contractAddresses.hybrid.HybridMiner;
    const stats = await blockchain.callContract(
      minerAddress,
      'getMinerStats',
      [address]
    );
    
    res.json({
      success: true,
      data: {
        miner: address,
        blocksMinedCount: stats[0],
        totalRewards: stats[1],
        lastMiningTime: stats[2]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Node License Operations
export async function mintNodeLicense(req: Request, res: Response) {
  try {
    const { to, nodeType, metadata } = req.body;
    
    if (!to || !nodeType || !metadata) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, nodeType, metadata'
      });
    }

    const licenseAddress = contractAddresses.hybrid.HybridNodeLicense;
    const tokenId = await blockchain.callContract(
      licenseAddress,
      'mintNodeLicense',
      [to, nodeType, metadata]
    );
    
    res.json({
      success: true,
      data: {
        tokenId,
        owner: to,
        nodeType,
        status: 'minted'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getNodeInfo(req: Request, res: Response) {
  try {
    const { tokenId } = req.params;
    
    const licenseAddress = contractAddresses.hybrid.HybridNodeLicense;
    const nodeInfo = await blockchain.callContract(
      licenseAddress,
      'getNodeInfo',
      [tokenId]
    );
    
    res.json({
      success: true,
      data: {
        tokenId,
        nodeType: nodeInfo[0],
        mintTime: nodeInfo[1],
        active: nodeInfo[2]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
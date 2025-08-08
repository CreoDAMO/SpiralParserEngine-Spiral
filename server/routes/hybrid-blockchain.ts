/**
 * HYBRID Blockchain API Routes
 * Production endpoints for wallet generation, NFT licensing, and cross-chain operations
 */

import { Router } from 'express';
import { HybridAPI, hybridBlockchain } from '../blockchain/hybrid-blockchain.js';

const router = Router();

// Blockchain Status and Info
router.get('/status', (req, res) => {
  try {
    const status = HybridAPI.getBlockchainStatus();
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Error getting blockchain status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get blockchain status'
    });
  }
});

// Founder Wallet Info (read-only)
router.get('/founder-wallet', (req, res) => {
  try {
    const founderWallet = HybridAPI.getFounderWallet();
    res.json({
      success: true,
      data: founderWallet
    });
  } catch (error) {
    console.error('Error getting founder wallet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get founder wallet info'
    });
  }
});

// Generate New Wallet
router.post('/wallet/generate', (req, res) => {
  try {
    const { type = 'public' } = req.body;
    
    if (!['public', 'validator', 'storage'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid wallet type. Must be: public, validator, or storage'
      });
    }

    const wallet = HybridAPI.generateWallet(type);
    
    // Return wallet without private key for security
    const { privateKey, ...safeWallet } = wallet;
    
    res.json({
      success: true,
      data: {
        ...safeWallet,
        note: 'Store your mnemonic phrase securely. Private key not returned for security.'
      }
    });
  } catch (error) {
    console.error('Error generating wallet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate wallet'
    });
  }
});

// Get Wallet Info
router.get('/wallet/:address', (req, res) => {
  try {
    const { address } = req.params;
    const wallet = HybridAPI.getWallet(address);
    
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    // Return wallet without private key
    const { privateKey, ...safeWallet } = wallet;
    
    res.json({
      success: true,
      data: safeWallet
    });
  } catch (error) {
    console.error('Error getting wallet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get wallet info'
    });
  }
});

// Purchase NFT License
router.post('/license/purchase', async (req, res) => {
  try {
    const { buyer, licenseType, payment } = req.body;
    
    if (!buyer || !licenseType) {
      return res.status(400).json({
        success: false,
        error: 'buyer and licenseType are required'
      });
    }

    if (!['HNL-VAL', 'HNL-STR', 'HNL-GOV'].includes(licenseType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid license type. Must be: HNL-VAL, HNL-STR, or HNL-GOV'
      });
    }

    const license = await HybridAPI.purchaseNFTLicense(buyer, licenseType, payment);
    
    res.json({
      success: true,
      data: license
    });
  } catch (error) {
    console.error('Error purchasing license:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to purchase license'
    });
  }
});

// Get All NFT Licenses
router.get('/licenses', (req, res) => {
  try {
    const licenses = HybridAPI.getAllNFTLicenses();
    res.json({
      success: true,
      data: licenses
    });
  } catch (error) {
    console.error('Error getting licenses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get licenses'
    });
  }
});

// Create Transaction
router.post('/transaction', async (req, res) => {
  try {
    const { from, to, amount, type, data } = req.body;
    
    if (!from || !to || !amount || !type) {
      return res.status(400).json({
        success: false,
        error: 'from, to, amount, and type are required'
      });
    }

    const transaction = await HybridAPI.createTransaction({
      from,
      to,
      amount: parseFloat(amount),
      type,
      data
    });
    
    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create transaction'
    });
  }
});

// Initiate Cross-Chain Bridge
router.post('/bridge/initiate', async (req, res) => {
  try {
    const { from_chain, to_chain, token, amount, sender, recipient } = req.body;
    
    if (!from_chain || !to_chain || !token || !amount || !sender || !recipient) {
      return res.status(400).json({
        success: false,
        error: 'All bridge parameters are required'
      });
    }

    const validChains = ['hybrid', 'base', 'polygon', 'solana'];
    if (!validChains.includes(from_chain) || !validChains.includes(to_chain)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid chain. Valid chains: hybrid, base, polygon, solana'
      });
    }

    const bridge = await HybridAPI.initiateBridge(
      from_chain,
      to_chain,
      token,
      parseFloat(amount),
      sender,
      recipient
    );
    
    res.json({
      success: true,
      data: bridge
    });
  } catch (error) {
    console.error('Error initiating bridge:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to initiate bridge'
    });
  }
});

// Get Bridge Transfers
router.get('/bridges', (req, res) => {
  try {
    const { status } = req.query;
    const bridges = HybridAPI.getBridges(status as any);
    
    res.json({
      success: true,
      data: bridges
    });
  } catch (error) {
    console.error('Error getting bridges:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get bridge transfers'
    });
  }
});

// Verify Wallet Signature (for consciousness authentication)
router.post('/wallet/verify-signature', (req, res) => {
  try {
    const { address, message, signature } = req.body;
    
    if (!address || !message || !signature) {
      return res.status(400).json({
        success: false,
        error: 'address, message, and signature are required'
      });
    }

    const isValid = HybridAPI.verifySignature(address, message, signature);
    
    res.json({
      success: true,
      data: {
        valid: isValid,
        address,
        message,
        verified_at: new Date()
      }
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify signature'
    });
  }
});

// Get All Wallets (admin endpoint)
router.get('/admin/wallets', (req, res) => {
  try {
    const wallets = HybridAPI.getAllWallets().map(wallet => {
      const { privateKey, ...safeWallet } = wallet;
      return safeWallet;
    });
    
    res.json({
      success: true,
      data: wallets
    });
  } catch (error) {
    console.error('Error getting all wallets:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get wallets'
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    blockchain: 'HYBRID',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date()
  });
});

export default router;
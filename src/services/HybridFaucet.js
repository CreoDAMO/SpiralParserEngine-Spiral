/**
 * HYBRID Coin Public Distribution System
 * Implements faucet, airdrops, and public access mechanisms
 * Based on lawful/hybrid architecture - Public Gate only
 */

class HybridFaucet {
  constructor() {
    this.faucetAddress = 'hybrid1faucet7777777777777777777777777777777';
    this.dailyLimit = 100; // 100 HYB per wallet per day
    this.claimHistory = new Map();
    this.totalDistributed = 0;
    this.faucetBalance = 10000000; // 10M HYB in faucet
    this.isActive = true;
    
    // Distribution campaigns
    this.campaigns = {
      welcome_airdrop: {
        name: 'Welcome to HYBRID',
        amount: 50, // 50 HYB
        active: true,
        claimed: new Set()
      },
      community_builder: {
        name: 'Community Builder Reward',
        amount: 200, // 200 HYB
        active: true,
        claimed: new Set(),
        requirements: ['social_share', 'wallet_verified']
      },
      phi_alignment: {
        name: 'φ-Harmonic Alignment Bonus',
        amount: 161.8, // φ-aligned amount
        active: true,
        claimed: new Set(),
        requirements: ['phi_resonance']
      }
    };
  }

  async initialize() {
    console.log('🚿 Initializing HYBRID Faucet System...');
    await this.loadClaimHistory();
    console.log(`💧 Faucet active with ${this.faucetBalance} HYB available`);
    console.log(`📊 Daily limit: ${this.dailyLimit} HYB per wallet`);
  }

  async claimFaucet(walletAddress, captchaToken = null) {
    try {
      // Validate wallet address
      if (!this.isValidHybridAddress(walletAddress)) {
        throw new Error('Invalid HYBRID wallet address');
      }

      // Check daily limit
      const todayKey = new Date().toDateString();
      const userKey = `${walletAddress}_${todayKey}`;
      
      if (this.claimHistory.has(userKey)) {
        const claimed = this.claimHistory.get(userKey);
        if (claimed >= this.dailyLimit) {
          throw new Error(`Daily limit reached. Try again tomorrow. (${claimed}/${this.dailyLimit} HYB claimed)`);
        }
      }

      // Check faucet balance
      const claimAmount = Math.min(10, this.dailyLimit); // 10 HYB base claim
      if (this.faucetBalance < claimAmount) {
        throw new Error('Faucet temporarily empty. Please try again later.');
      }

      // Process claim
      await this.processFaucetClaim(walletAddress, claimAmount);
      
      // Update history
      const currentClaimed = this.claimHistory.get(userKey) || 0;
      this.claimHistory.set(userKey, currentClaimed + claimAmount);
      
      this.faucetBalance -= claimAmount;
      this.totalDistributed += claimAmount;

      console.log(`💧 Faucet claim: ${claimAmount} HYB sent to ${walletAddress}`);
      
      return {
        success: true,
        amount: claimAmount,
        txHash: this.generateTxHash(),
        remaining_today: this.dailyLimit - (currentClaimed + claimAmount),
        faucet_balance: this.faucetBalance,
        message: `Successfully claimed ${claimAmount} HYB!`
      };

    } catch (error) {
      console.error('❌ Faucet claim failed:', error);
      return {
        success: false,
        error: error.message,
        remaining_today: this.getRemainingDaily(walletAddress)
      };
    }
  }

  async claimAirdrop(walletAddress, campaignId, proof = {}) {
    try {
      const campaign = this.campaigns[campaignId];
      if (!campaign || !campaign.active) {
        throw new Error('Campaign not found or inactive');
      }

      // Check if already claimed
      if (campaign.claimed.has(walletAddress)) {
        throw new Error('Airdrop already claimed for this campaign');
      }

      // Verify requirements
      if (campaign.requirements) {
        await this.verifyAirdropRequirements(walletAddress, campaign.requirements, proof);
      }

      // Process airdrop
      await this.processAirdrop(walletAddress, campaign.amount, campaignId);
      
      // Mark as claimed
      campaign.claimed.add(walletAddress);
      this.totalDistributed += campaign.amount;

      console.log(`🎁 Airdrop: ${campaign.amount} HYB sent to ${walletAddress} (${campaign.name})`);

      return {
        success: true,
        campaign: campaign.name,
        amount: campaign.amount,
        txHash: this.generateTxHash(),
        message: `Congratulations! You received ${campaign.amount} HYB from ${campaign.name}!`
      };

    } catch (error) {
      console.error('❌ Airdrop claim failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verifyAirdropRequirements(walletAddress, requirements, proof) {
    for (const requirement of requirements) {
      switch (requirement) {
        case 'social_share':
          if (!proof.socialShare) {
            throw new Error('Social media share required');
          }
          break;
        case 'wallet_verified':
          if (!proof.walletVerified) {
            throw new Error('Wallet verification required');
          }
          break;
        case 'phi_resonance':
          const phiScore = await this.calculatePhiResonance(walletAddress);
          if (phiScore < 1.6) {
            throw new Error('Insufficient φ-harmonic resonance');
          }
          break;
      }
    }
  }

  async calculatePhiResonance(walletAddress) {
    // Calculate user's φ-harmonic alignment
    const addressSum = walletAddress.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const phiBase = 1.618;
    const resonance = phiBase + (addressSum % 100) / 1000;
    return Math.min(resonance, 1.618);
  }

  async processFaucetClaim(walletAddress, amount) {
    // Simulate blockchain transaction
    const tx = {
      from: this.faucetAddress,
      to: walletAddress,
      amount: amount,
      denom: 'uhybrid', // micro-hybrid (1 HYB = 1,000,000 uhybrid)
      gas: '200000',
      timestamp: Date.now(),
      type: 'faucet_claim'
    };

    // Would send to actual HYBRID blockchain
    return this.sendToBlockchain(tx);
  }

  async processAirdrop(walletAddress, amount, campaignId) {
    const tx = {
      from: this.faucetAddress,
      to: walletAddress,
      amount: amount,
      denom: 'uhybrid',
      gas: '200000',
      timestamp: Date.now(),
      type: 'airdrop',
      campaign: campaignId
    };

    return this.sendToBlockchain(tx);
  }

  async sendToBlockchain(tx) {
    // Simulate sending to HYBRID blockchain
    // In real implementation, would use HYBRID SDK
    await new Promise(resolve => setTimeout(resolve, 1000));
    return tx;
  }

  generateTxHash() {
    return '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
  }

  isValidHybridAddress(address) {
    return address && address.startsWith('hybrid1') && address.length === 47;
  }

  getRemainingDaily(walletAddress) {
    const todayKey = new Date().toDateString();
    const userKey = `${walletAddress}_${todayKey}`;
    const claimed = this.claimHistory.get(userKey) || 0;
    return Math.max(0, this.dailyLimit - claimed);
  }

  async loadClaimHistory() {
    // Load from persistent storage (would be database in production)
    console.log('📚 Loading claim history...');
  }

  async getStats() {
    return {
      faucet_balance: this.faucetBalance,
      total_distributed: this.totalDistributed,
      daily_limit: this.dailyLimit,
      active_campaigns: Object.keys(this.campaigns).filter(id => this.campaigns[id].active),
      total_claims_today: Array.from(this.claimHistory.keys()).filter(key => 
        key.includes(new Date().toDateString())
      ).length
    };
  }

  // Public access methods for the dashboard
  async handleFaucetRequest(req, res) {
    const { wallet_address, captcha_token } = req.body;
    const result = await this.claimFaucet(wallet_address, captcha_token);
    res.json(result);
  }

  async handleAirdropRequest(req, res) {
    const { wallet_address, campaign_id, proof } = req.body;
    const result = await this.claimAirdrop(wallet_address, campaign_id, proof);
    res.json(result);
  }

  async handleStatsRequest(req, res) {
    const stats = await this.getStats();
    res.json({ success: true, data: stats });
  }
}

// Global instance
const hybridFaucet = new HybridFaucet();

export { hybridFaucet, HybridFaucet };
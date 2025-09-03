/**
 * HYBRID Faucet System Component
 * Public distribution interface for HYBRID Coin
 * Implements faucet, airdrops, and φ-alignment rewards
 */

import { hybridFaucet } from '../services/HybridFaucet.js';

class HybridFaucetSystem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      walletAddress: '',
      claimInProgress: false,
      lastClaimResult: null,
      stats: null,
      campaigns: []
    };
    
    this.render();
    this.loadFaucetStats();
    this.setupEventListeners();
  }

  async loadFaucetStats() {
    try {
      this.state.stats = await hybridFaucet.getStats();
      this.updateStatsDisplay();
    } catch (error) {
      console.error('Error loading faucet stats:', error);
    }
  }

  async claimFaucet() {
    if (!this.state.walletAddress) {
      this.showNotification('Please enter your HYBRID wallet address', 'error');
      return;
    }

    this.state.claimInProgress = true;
    this.updateClaimButton();

    try {
      const result = await hybridFaucet.claimFaucet(this.state.walletAddress);
      this.state.lastClaimResult = result;
      
      if (result.success) {
        this.showNotification(`🎉 ${result.message}`, 'success');
        await this.loadFaucetStats();
      } else {
        this.showNotification(`❌ ${result.error}`, 'error');
      }
      
      this.updateClaimResult();
    } catch (error) {
      console.error('Faucet claim error:', error);
      this.showNotification('Failed to process claim', 'error');
    }

    this.state.claimInProgress = false;
    this.updateClaimButton();
  }

  async claimAirdrop(campaignId) {
    if (!this.state.walletAddress) {
      this.showNotification('Please enter your HYBRID wallet address', 'error');
      return;
    }

    try {
      // Gather proof based on campaign requirements
      const proof = await this.gatherAirdropProof(campaignId);
      
      const result = await hybridFaucet.claimAirdrop(this.state.walletAddress, campaignId, proof);
      
      if (result.success) {
        this.showNotification(`🎁 ${result.message}`, 'success');
        await this.loadFaucetStats();
      } else {
        this.showNotification(`❌ ${result.error}`, 'error');
      }
    } catch (error) {
      console.error('Airdrop claim error:', error);
      this.showNotification('Failed to process airdrop', 'error');
    }
  }

  async gatherAirdropProof(campaignId) {
    const proof = {};
    
    switch (campaignId) {
      case 'welcome_airdrop':
        // No proof needed for welcome airdrop
        break;
      case 'community_builder':
        // Would integrate with social media APIs
        proof.socialShare = true;
        proof.walletVerified = true;
        break;
      case 'phi_alignment':
        // Automatic φ-resonance calculation
        proof.phiResonance = await this.calculatePhiAlignment();
        break;
    }
    
    return proof;
  }

  async calculatePhiAlignment() {
    // Calculate user's φ-harmonic resonance
    if (!this.state.walletAddress) return 0;
    
    const addressSum = this.state.walletAddress.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const phiBase = 1.618;
    const alignment = phiBase + (addressSum % 100) / 1000;
    return Math.min(alignment, 1.618);
  }

  updateStatsDisplay() {
    if (!this.state.stats) return;
    
    const statsContainer = this.shadowRoot.querySelector('#faucet-stats');
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div class="stat-item">
          <div class="stat-label">Faucet Balance</div>
          <div class="stat-value">${this.state.stats.faucet_balance.toLocaleString()} HYB</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Total Distributed</div>
          <div class="stat-value">${this.state.stats.total_distributed.toLocaleString()} HYB</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Daily Limit</div>
          <div class="stat-value">${this.state.stats.daily_limit} HYB</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">Claims Today</div>
          <div class="stat-value">${this.state.stats.total_claims_today}</div>
        </div>
      `;
    }
  }

  updateClaimButton() {
    const button = this.shadowRoot.querySelector('#claim-faucet');
    if (button) {
      button.disabled = this.state.claimInProgress;
      button.textContent = this.state.claimInProgress ? '⏳ Processing...' : '💧 Claim Free HYB';
    }
  }

  updateClaimResult() {
    const resultContainer = this.shadowRoot.querySelector('#claim-result');
    if (!resultContainer || !this.state.lastClaimResult) return;
    
    const result = this.state.lastClaimResult;
    
    if (result.success) {
      resultContainer.innerHTML = `
        <div class="success-result">
          <h4>✅ Claim Successful!</h4>
          <p><strong>Amount:</strong> ${result.amount} HYB</p>
          <p><strong>Transaction:</strong> ${result.txHash}</p>
          <p><strong>Remaining Today:</strong> ${result.remaining_today} HYB</p>
        </div>
      `;
    } else {
      resultContainer.innerHTML = `
        <div class="error-result">
          <h4>❌ Claim Failed</h4>
          <p>${result.error}</p>
          ${result.remaining_today !== undefined ? `<p><strong>Remaining Today:</strong> ${result.remaining_today} HYB</p>` : ''}
        </div>
      `;
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const container = this.shadowRoot.querySelector('.notification-container');
    if (container) {
      container.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  }

  setupEventListeners() {
    const walletInput = this.shadowRoot.querySelector('#wallet-address');
    if (walletInput) {
      walletInput.addEventListener('input', (e) => {
        this.state.walletAddress = e.target.value.trim();
      });
    }

    const claimButton = this.shadowRoot.querySelector('#claim-faucet');
    if (claimButton) {
      claimButton.addEventListener('click', () => this.claimFaucet());
    }

    // Airdrop buttons
    const airdropButtons = this.shadowRoot.querySelectorAll('.airdrop-button');
    airdropButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const campaignId = e.target.dataset.campaign;
        this.claimAirdrop(campaignId);
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Orbitron', monospace;
        }

        .faucet-container {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 165, 0, 0.1));
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 15px;
          padding: 25px;
          margin: 20px 0;
        }

        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }

        .notification {
          padding: 10px 20px;
          border-radius: 8px;
          margin-bottom: 10px;
          color: white;
          font-weight: bold;
        }

        .notification.success { background: #4CAF50; }
        .notification.error { background: #f44336; }
        .notification.info { background: #2196F3; }

        .faucet-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .faucet-title {
          font-size: 1.5em;
          color: #ffd700;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .faucet-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .stat-item {
          text-align: center;
          padding: 15px;
          background: rgba(255, 215, 0, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(255, 215, 0, 0.3);
        }

        .stat-label {
          font-size: 0.9em;
          color: #ccc;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 1.2em;
          font-weight: bold;
          color: #ffd700;
        }

        .claim-section {
          background: rgba(0, 0, 0, 0.3);
          padding: 25px;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #ffd700;
          font-weight: bold;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 2px solid rgba(255, 215, 0, 0.3);
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-family: monospace;
          font-size: 14px;
        }

        .form-input:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }

        .claim-button {
          width: 100%;
          padding: 15px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          border: none;
          border-radius: 8px;
          font-size: 1.1em;
          font-weight: bold;
          color: #000;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .claim-button:hover {
          background: linear-gradient(45deg, #ffed4e, #ffd700);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }

        .claim-button:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .claim-result {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
        }

        .success-result {
          background: rgba(76, 175, 80, 0.2);
          border: 1px solid #4CAF50;
          color: #4CAF50;
        }

        .error-result {
          background: rgba(244, 67, 54, 0.2);
          border: 1px solid #f44336;
          color: #f44336;
        }

        .airdrops-section {
          margin-top: 40px;
        }

        .airdrops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .airdrop-card {
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .airdrop-title {
          color: #ffd700;
          font-size: 1.2em;
          margin-bottom: 10px;
        }

        .airdrop-amount {
          font-size: 2em;
          font-weight: bold;
          color: #fff;
          margin: 15px 0;
        }

        .airdrop-button {
          width: 100%;
          padding: 10px;
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          border: none;
          border-radius: 6px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .airdrop-button:hover {
          background: linear-gradient(45deg, #f7931e, #ff6b35);
          transform: translateY(-1px);
        }
      </style>

      <div class="faucet-container">
        <div class="notification-container"></div>
        
        <div class="faucet-header">
          <h2 class="faucet-title">💧 HYBRID Coin Faucet</h2>
          <p>Get free HYBRID Coin daily! No purchase necessary.</p>
        </div>

        <div class="faucet-stats" id="faucet-stats">
          <div class="stat-item">
            <div class="stat-label">Loading...</div>
            <div class="stat-value">---</div>
          </div>
        </div>

        <div class="claim-section">
          <h3 style="color: #ffd700; margin-bottom: 20px;">🎯 Daily Faucet Claim</h3>
          <div class="form-group">
            <label class="form-label">HYBRID Wallet Address</label>
            <input type="text" class="form-input" id="wallet-address" 
                   placeholder="hybrid1..." maxlength="47">
          </div>
          <button class="claim-button" id="claim-faucet">
            💧 Claim Free HYB
          </button>
          <div class="claim-result" id="claim-result"></div>
        </div>

        <div class="airdrops-section">
          <h3 style="color: #ffd700; margin-bottom: 20px;">🎁 Special Airdrops</h3>
          <div class="airdrops-grid">
            <div class="airdrop-card">
              <h4 class="airdrop-title">🌟 Welcome Airdrop</h4>
              <div class="airdrop-amount">50 HYB</div>
              <p>One-time welcome bonus for new users</p>
              <button class="airdrop-button" data-campaign="welcome_airdrop">
                Claim Welcome Bonus
              </button>
            </div>
            <div class="airdrop-card">
              <h4 class="airdrop-title">🏗️ Community Builder</h4>
              <div class="airdrop-amount">200 HYB</div>
              <p>Share on social media & verify wallet</p>
              <button class="airdrop-button" data-campaign="community_builder">
                Claim Builder Reward
              </button>
            </div>
            <div class="airdrop-card">
              <h4 class="airdrop-title">🌀 φ-Alignment Bonus</h4>
              <div class="airdrop-amount">161.8 HYB</div>
              <p>Golden ratio harmonic resonance reward</p>
              <button class="airdrop-button" data-campaign="phi_alignment">
                Claim φ-Bonus
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('hybrid-faucet-system', HybridFaucetSystem);

export { HybridFaucetSystem };
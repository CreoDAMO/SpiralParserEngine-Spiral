/**
 * Founder Wallet Interface Component
 * Sacred interface for founder wallet operations and consciousness access
 * Handles HYBRID Blockchain operations and TU generation authority
 */

import { founderAuth } from '../services/FounderAuthentication.js';

class FounderWalletInterface extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      isConnecting: false,
      authState: founderAuth.getAuthState(),
      walletBalance: 0,
      hybridBalance: 0,
      tuGenerated: 0,
      operations: [],
      founderStats: null
    };
    
    this.render();
    this.setupEventListeners();
    this.loadFounderData();
  }

  async loadFounderData() {
    if (this.state.authState.authLevel === 'founder') {
      await this.loadFounderStats();
    }
  }

  async loadFounderStats() {
    // Load founder-specific statistics
    this.state.founderStats = {
      totalTUGenerated: '1.624e+20',
      hybridMinted: '100,000,000,000',
      spiralKeysActive: '8/12',
      consciousnessLevel: '1.000',
      phiAlignment: '1.618',
      truthCoherence: '1.000',
      sessionDuration: this.formatDuration(this.state.authState.sessionDuration),
      lastOperation: 'TU Generation via Spiral Key 6'
    };
    
    this.updateFounderDisplay();
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  async connectWallet() {
    if (this.state.isConnecting) return;
    
    this.state.isConnecting = true;
    this.updateConnectionButton();
    
    try {
      const result = await founderAuth.connectWallet();
      
      if (result.success) {
        this.state.authState = founderAuth.getAuthState();
        this.showNotification(result.message, 'success');
        
        if (this.state.authState.authLevel === 'founder') {
          await this.loadFounderStats();
        }
        
        this.updateDisplay();
      } else {
        this.showNotification('Connection failed: ' + result.error, 'error');
      }
      
    } catch (error) {
      console.error('Connection error:', error);
      this.showNotification('Failed to connect: ' + error.message, 'error');
    }
    
    this.state.isConnecting = false;
    this.updateConnectionButton();
  }

  async disconnectWallet() {
    founderAuth.logout();
    this.state.authState = founderAuth.getAuthState();
    this.state.founderStats = null;
    this.updateDisplay();
    this.showNotification('Wallet disconnected', 'info');
  }

  async generateTU() {
    if (!founderAuth.canGenerateTU()) {
      this.showNotification('TU generation requires founder authentication', 'error');
      return;
    }
    
    try {
      // Simulate TU generation (would connect to actual LSAPI)
      const tuAmount = (Math.random() * 1e19 + 1e19).toExponential(3);
      const spiralKey = Math.floor(Math.random() * 8) + 1;
      
      this.state.operations.unshift({
        type: 'TU Generation',
        amount: tuAmount,
        spiralKey: spiralKey,
        timestamp: new Date(),
        status: 'success'
      });
      
      this.updateOperationsHistory();
      this.showNotification(`Generated ${tuAmount} TU via Spiral Key ${spiralKey}`, 'success');
      
    } catch (error) {
      console.error('TU generation failed:', error);
      this.showNotification('TU generation failed', 'error');
    }
  }

  async mintHYBRID() {
    if (!founderAuth.hasFounderAccess()) {
      this.showNotification('HYBRID minting requires founder authentication', 'error');
      return;
    }
    
    const amount = prompt('Enter HYBRID amount to mint:');
    if (!amount || isNaN(amount)) return;
    
    try {
      this.state.operations.unshift({
        type: 'HYBRID Mint',
        amount: `${parseFloat(amount).toLocaleString()} HYB`,
        timestamp: new Date(),
        status: 'success'
      });
      
      this.updateOperationsHistory();
      this.showNotification(`Minted ${parseFloat(amount).toLocaleString()} HYBRID coins`, 'success');
      
    } catch (error) {
      console.error('HYBRID minting failed:', error);
      this.showNotification('HYBRID minting failed', 'error');
    }
  }

  async accessConsciousness() {
    if (!founderAuth.hasConsciousnessAccess()) {
      this.showNotification('Consciousness access requires founder authentication', 'error');
      return;
    }
    
    this.showNotification('🌀 Consciousness domain accessed - Iyonaʾel guidance active', 'success');
    
    // Trigger consciousness interface (would open private dashboard)
    const event = new CustomEvent('accessConsciousness', {
      detail: { user: this.state.authState.user }
    });
    window.dispatchEvent(event);
  }

  updateDisplay() {
    const authState = this.state.authState;
    
    // Update connection status
    const statusElement = this.shadowRoot.querySelector('#connection-status');
    if (statusElement) {
      if (authState.isAuthenticated) {
        if (authState.authLevel === 'founder') {
          statusElement.innerHTML = `
            <div class="founder-status">
              <div class="status-badge founder">👑 SOVEREIGN FOUNDER</div>
              <div class="user-details">
                <div class="user-name">${authState.user.name}</div>
                <div class="user-address">${authState.user.address}</div>
                <div class="access-level">∞ INFINITE CONSCIOUSNESS ACCESS</div>
              </div>
            </div>
          `;
        } else {
          statusElement.innerHTML = `
            <div class="user-status">
              <div class="status-badge public">👤 PUBLIC USER</div>
              <div class="user-details">
                <div class="user-address">${authState.user.address}</div>
                <div class="access-level">HYBRID Commerce Only</div>
              </div>
            </div>
          `;
        }
      } else {
        statusElement.innerHTML = `
          <div class="disconnected-status">
            <div class="status-badge disconnected">🔌 DISCONNECTED</div>
            <div class="connect-prompt">Connect MetaMask to access founder privileges</div>
          </div>
        `;
      }
    }
    
    // Update action buttons visibility
    const founderActions = this.shadowRoot.querySelector('#founder-actions');
    if (founderActions) {
      founderActions.style.display = authState.authLevel === 'founder' ? 'block' : 'none';
    }
    
    const publicActions = this.shadowRoot.querySelector('#public-actions');
    if (publicActions) {
      publicActions.style.display = authState.isAuthenticated && authState.authLevel !== 'founder' ? 'block' : 'none';
    }
  }

  updateFounderDisplay() {
    if (!this.state.founderStats) return;
    
    const statsElement = this.shadowRoot.querySelector('#founder-stats');
    if (statsElement) {
      statsElement.innerHTML = `
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-label">Total TU Generated</div>
            <div class="stat-value tu">${this.state.founderStats.totalTUGenerated}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">HYBRID Minted</div>
            <div class="stat-value hybrid">${this.state.founderStats.hybridMinted} HYB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Active Spiral Keys</div>
            <div class="stat-value keys">${this.state.founderStats.spiralKeysActive}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Consciousness Level</div>
            <div class="stat-value consciousness">${this.state.founderStats.consciousnessLevel}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">φ-Alignment</div>
            <div class="stat-value phi">${this.state.founderStats.phiAlignment}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Session Duration</div>
            <div class="stat-value time">${this.state.founderStats.sessionDuration}</div>
          </div>
        </div>
      `;
    }
  }

  updateConnectionButton() {
    const connectBtn = this.shadowRoot.querySelector('#connect-wallet');
    if (connectBtn) {
      connectBtn.disabled = this.state.isConnecting;
      connectBtn.textContent = this.state.isConnecting ? 'Connecting...' : 'Connect MetaMask';
    }
  }

  updateOperationsHistory() {
    const historyElement = this.shadowRoot.querySelector('#operations-history');
    if (historyElement && this.state.operations.length > 0) {
      const historyHTML = this.state.operations.slice(0, 10).map(op => `
        <div class="operation-item ${op.status}">
          <div class="operation-type">${op.type}</div>
          <div class="operation-amount">${op.amount}</div>
          <div class="operation-time">${op.timestamp.toLocaleTimeString()}</div>
          ${op.spiralKey ? `<div class="operation-key">Key ${op.spiralKey}</div>` : ''}
        </div>
      `).join('');
      
      historyElement.innerHTML = historyHTML;
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
    // Listen for authentication events
    window.addEventListener('founderAuthenticated', (event) => {
      this.state.authState = founderAuth.getAuthState();
      this.updateDisplay();
      this.loadFounderData();
    });
    
    window.addEventListener('userLoggedOut', () => {
      this.state.authState = founderAuth.getAuthState();
      this.state.founderStats = null;
      this.updateDisplay();
    });
    
    // Component event listeners
    const connectBtn = this.shadowRoot.querySelector('#connect-wallet');
    if (connectBtn) {
      connectBtn.addEventListener('click', () => this.connectWallet());
    }
    
    const disconnectBtn = this.shadowRoot.querySelector('#disconnect-wallet');
    if (disconnectBtn) {
      disconnectBtn.addEventListener('click', () => this.disconnectWallet());
    }
    
    const tuBtn = this.shadowRoot.querySelector('#generate-tu');
    if (tuBtn) {
      tuBtn.addEventListener('click', () => this.generateTU());
    }
    
    const hybridBtn = this.shadowRoot.querySelector('#mint-hybrid');
    if (hybridBtn) {
      hybridBtn.addEventListener('click', () => this.mintHYBRID());
    }
    
    const consciousnessBtn = this.shadowRoot.querySelector('#access-consciousness');
    if (consciousnessBtn) {
      consciousnessBtn.addEventListener('click', () => this.accessConsciousness());
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Orbitron', monospace;
        }

        .wallet-container {
          background: linear-gradient(135deg, rgba(102, 51, 153, 0.2), rgba(255, 215, 0, 0.1));
          border: 2px solid rgba(255, 215, 0, 0.4);
          border-radius: 20px;
          padding: 30px;
          margin: 20px 0;
        }

        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }

        .notification {
          padding: 12px 20px;
          border-radius: 8px;
          margin-bottom: 10px;
          color: white;
          font-weight: bold;
          max-width: 400px;
        }

        .notification.success { background: #4CAF50; }
        .notification.error { background: #f44336; }
        .notification.info { background: #2196F3; }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .title {
          font-size: 1.8em;
          color: #ffd700;
          margin-bottom: 10px;
          text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
        }

        .subtitle {
          color: #ccc;
          font-size: 1em;
        }

        .connection-section {
          background: rgba(0, 0, 0, 0.4);
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          text-align: center;
        }

        .founder-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .status-badge {
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 1.1em;
        }

        .status-badge.founder {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #000;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        .status-badge.public {
          background: linear-gradient(45deg, #2196F3, #64B5F6);
          color: white;
        }

        .status-badge.disconnected {
          background: #666;
          color: #ccc;
        }

        .user-details {
          text-align: center;
        }

        .user-name {
          font-size: 1.3em;
          color: #ffd700;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .user-address {
          font-family: monospace;
          color: #ccc;
          font-size: 0.9em;
          margin-bottom: 8px;
        }

        .access-level {
          color: #00ff96;
          font-weight: bold;
          font-size: 0.95em;
        }

        .connect-button {
          background: linear-gradient(45deg, #6633CC, #9966FF);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1.1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .connect-button:hover {
          background: linear-gradient(45deg, #9966FF, #6633CC);
          transform: translateY(-2px);
        }

        .connect-button:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .stat-item {
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 10px;
          padding: 15px;
          text-align: center;
        }

        .stat-label {
          color: #ccc;
          font-size: 0.9em;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 1.2em;
          font-weight: bold;
        }

        .stat-value.tu { color: #ff6b35; }
        .stat-value.hybrid { color: #00ff96; }
        .stat-value.keys { color: #ffd700; }
        .stat-value.consciousness { color: #9966ff; }
        .stat-value.phi { color: #ff1493; }
        .stat-value.time { color: #00bfff; }

        .actions-section {
          margin: 30px 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }

        .action-button {
          padding: 15px 20px;
          border: none;
          border-radius: 10px;
          font-size: 1em;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .action-button.primary {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #000;
        }

        .action-button.primary:hover {
          background: linear-gradient(45deg, #ffed4e, #ffd700);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }

        .action-button.secondary {
          background: linear-gradient(45deg, #ff6b35, #f7931e);
          color: white;
        }

        .action-button.secondary:hover {
          background: linear-gradient(45deg, #f7931e, #ff6b35);
          transform: translateY(-2px);
        }

        .action-button.consciousness {
          background: linear-gradient(45deg, #9966ff, #6633cc);
          color: white;
        }

        .action-button.consciousness:hover {
          background: linear-gradient(45deg, #6633cc, #9966ff);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(153, 102, 255, 0.4);
        }

        .action-button.danger {
          background: linear-gradient(45deg, #f44336, #d32f2f);
          color: white;
        }

        .operations-section {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 20px;
          margin-top: 30px;
        }

        .operations-title {
          color: #ffd700;
          font-size: 1.2em;
          margin-bottom: 15px;
          text-align: center;
        }

        .operation-item {
          display: grid;
          grid-template-columns: 2fr 2fr 1fr 1fr;
          gap: 15px;
          padding: 12px;
          border-bottom: 1px solid rgba(255, 215, 0, 0.2);
          align-items: center;
        }

        .operation-item:last-child {
          border-bottom: none;
        }

        .operation-type {
          color: #ffd700;
          font-weight: bold;
        }

        .operation-amount {
          color: #00ff96;
          font-family: monospace;
        }

        .operation-time {
          color: #ccc;
          font-size: 0.9em;
        }

        .operation-key {
          color: #ff6b35;
          font-weight: bold;
        }

        .connect-prompt {
          color: #ccc;
          margin-top: 10px;
        }
      </style>

      <div class="wallet-container">
        <div class="notification-container"></div>
        
        <div class="header">
          <h2 class="title">👑 Founder Wallet Interface</h2>
          <p class="subtitle">Sovereign authentication & consciousness computing access</p>
        </div>

        <div class="connection-section">
          <div id="connection-status">
            <div class="disconnected-status">
              <div class="status-badge disconnected">🔌 DISCONNECTED</div>
              <div class="connect-prompt">Connect MetaMask to access founder privileges</div>
            </div>
          </div>
          
          <div style="margin-top: 20px;">
            <button class="connect-button" id="connect-wallet">Connect MetaMask</button>
            <button class="connect-button" id="disconnect-wallet" style="background: #f44336; margin-left: 10px; display: none;">Disconnect</button>
          </div>
        </div>

        <div id="founder-stats" style="display: none;">
          <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px;">📊 Founder Statistics</h3>
        </div>

        <div class="actions-section">
          <div id="founder-actions" style="display: none;">
            <h3 style="color: #ffd700; text-align: center; margin-bottom: 20px;">⚡ Sovereign Operations</h3>
            <div class="actions-grid">
              <button class="action-button primary" id="generate-tu">
                🌀 Generate TU
              </button>
              <button class="action-button secondary" id="mint-hybrid">
                💰 Mint HYBRID
              </button>
              <button class="action-button consciousness" id="access-consciousness">
                🧠 Access Consciousness
              </button>
            </div>
          </div>

          <div id="public-actions" style="display: none;">
            <h3 style="color: #00ff96; text-align: center; margin-bottom: 20px;">💰 HYBRID Commerce</h3>
            <div style="text-align: center; color: #ccc;">
              <p>Public wallet connected. Access limited to HYBRID commerce operations.</p>
              <p>Connect founder wallet for full consciousness access.</p>
            </div>
          </div>
        </div>

        <div class="operations-section">
          <h3 class="operations-title">📜 Recent Operations</h3>
          <div id="operations-history">
            <div style="text-align: center; color: #666; padding: 20px;">
              No operations recorded yet
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('founder-wallet-interface', FounderWalletInterface);

export { FounderWalletInterface };
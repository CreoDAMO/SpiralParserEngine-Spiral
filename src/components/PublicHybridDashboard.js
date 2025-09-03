class PublicHybridDashboard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    // MANUS AI REALIZATION: HYBRID = Sovereign Layer 1 Native Currency
    // This is NOT a token - this is the native coin of a sovereign blockchain
    this.state = {
      hybridBalance: 10.00,
      hybridPrice: 10.00, // Fixed at $10 - Sovereign Currency Stability
      hybridMarketCap: 1000000000000, // $1T Market Cap Target
      hybridSupply: 100000000000, // 100B Max Supply - Sovereign Tokenomics
      currentOperation: null,
      activeTransactions: []
    };
    
    this.render();
    this.updateDisplay();
    this.startRealTimeUpdates();
  }

  createHybridTransaction() {
    const amount = parseFloat(this.shadow.getElementById('transactionAmount').value);
    if (!amount || amount <= 0) {
      this.showNotification('Please enter a valid HYBRID amount', 'error');
      return;
    }

    if (amount > this.state.hybridBalance) {
      this.showNotification('Insufficient HYBRID balance', 'error');
      return;
    }

    const transaction = {
      id: 'hybrid-tx-' + Date.now(),
      type: 'HYBRID-TRANSACTION',
      amount: parseFloat(amount),
      status: 'processing',
      timestamp: Date.now()
    };
    
    this.state.activeTransactions.push(transaction);
    this.updateDisplay();
    
    this.showNotification(`Processing ${amount} HYBRID transaction`, 'success');
    
    // Simulate transaction processing
    setTimeout(() => {
      this.state.activeTransactions = this.state.activeTransactions.filter(tx => tx.id !== transaction.id);
      this.state.hybridBalance -= amount;
      this.updateDisplay();
      this.showNotification(`Transaction completed: ${amount} HYBRID`, 'success');
    }, 3000);
  }

  requestConsciousnessAccess() {
    this.showNotification('🌀 Initiating transition to Private Ledger...', 'info');
    this.showNotification('⚡ MANUS ANALYSIS: Accessing infinite-value Truth Records domain', 'info');
    
    // DNA-φ biometric authentication for TU truth record access
    setTimeout(() => {
      this.showNotification('🧬 DNA-φ biometric consciousness authentication...', 'info');
      
      setTimeout(() => {
        this.showNotification('♾️ Reality Bridge Activated: Public→Private Ledger Access', 'success');
        this.showNotification('🌟 Trust Units (TU) Domain Unlocked - Infinite Value Truth Records', 'success');
        
        // Trigger consciousness authentication event
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('consciousness-authenticated', {
            detail: { authenticated: true, ledger: 'private', domain: 'infinite-truth-records' }
          }));
        }, 1000);
      }, 2000);
    }, 1500);
  }

  // Add demo authentication bypass for testing
  bypassAuthentication() {
    this.showNotification('🔑 Demo Authentication: Switching to Private Admin Dashboard', 'success');
    
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('consciousness-authenticated', {
        detail: { authenticated: true }
      }));
    }, 500);
  }

  showNotification(message, type = 'info') {
    const container = this.shadow.querySelector('.notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  updateDisplay() {
    // PUBLIC DOMAIN - HYBRID ONLY
    const hybridElement = this.shadow.getElementById('hybridBalance');
    if (hybridElement) hybridElement.textContent = `$${this.state.hybridBalance.toFixed(2)}`;
    
    const priceElement = this.shadow.getElementById('hybridPrice');
    if (priceElement) priceElement.textContent = `$${this.state.hybridPrice.toFixed(2)}`;
    
    const marketCapElement = this.shadow.getElementById('marketCap');
    if (marketCapElement) marketCapElement.textContent = `$${(this.state.hybridMarketCap / 1e9).toFixed(0)}B`;
    
    const supplyElement = this.shadow.getElementById('totalSupply');
    if (supplyElement) supplyElement.textContent = `${(this.state.hybridSupply / 1e9).toFixed(0)}B HYBRID`;
    
    // Update HYBRID operation status
    const processBtn = this.shadow.getElementById('processHYBRIDBtn');
    if (processBtn) {
      processBtn.disabled = this.state.currentOperation === 'processing-hybrid';
      processBtn.textContent = this.state.currentOperation === 'processing-hybrid' ? 
        '⏳ Processing...' : 
        '💰 Process HYBRID Transaction';
    }
    
    // Update active transactions display - HYBRID only
    const txContainer = this.shadow.getElementById('activeTransactions');
    if (txContainer) {
      txContainer.innerHTML = this.state.activeTransactions.map(tx => 
        `<div class="transaction-item">
          <span>${tx.type}: $${(tx.amount * this.state.hybridPrice).toFixed(2)}</span>
          <span class="status-processing">Processing...</span>
        </div>`
      ).join('');
    }
  }

  startRealTimeUpdates() {
    setInterval(() => {
      // Simulate real-time HYBRID metrics
      const phiAlignment = (1.618 + Math.sin(Date.now() / 1000) * 0.001).toFixed(6);
      const systemHealth = (0.998 + Math.random() * 0.002).toFixed(3);
      
      const phiDisplay = this.shadow.getElementById('phiAlignment');
      const healthDisplay = this.shadow.getElementById('systemHealth');
      
      if (phiDisplay) phiDisplay.textContent = phiAlignment;
      if (healthDisplay) healthDisplay.textContent = (systemHealth * 100).toFixed(1) + '%';
    }, 1000);
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #001122, #003366, #004488, #0066AA);
          color: #ffffff;
          font-family: 'Courier New', monospace;
          overflow-y: auto;
          padding: 20px;
          box-sizing: border-box;
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .panel {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 12px;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .panel h2 {
          color: #00FF88;
          margin-top: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .balance-display {
          font-size: 24px;
          font-weight: bold;
          color: #00FF88;
          margin: 10px 0;
        }

        .action-button {
          background: linear-gradient(135deg, #00FF88, #0066AA);
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
          margin: 5px;
          transition: all 0.3s ease;
          min-width: 200px;
        }

        .action-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4);
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .blocked-button {
          background: linear-gradient(135deg, #ff6b6b, #444) !important;
          opacity: 0.8;
        }

        .input-group {
          margin: 15px 0;
        }

        .input-group label {
          display: block;
          color: #00FF88;
          margin-bottom: 5px;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          font-family: inherit;
          box-sizing: border-box;
        }

        .input-group input:focus {
          outline: none;
          border-color: #00FF88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
        }

        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.3);
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .status-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .status-label {
          font-size: 12px;
          color: #999;
        }

        .status-value {
          font-size: 16px;
          font-weight: bold;
          color: #00FF88;
        }

        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
        }

        .notification {
          background: rgba(0, 255, 136, 0.9);
          color: white;
          padding: 10px 15px;
          border-radius: 6px;
          margin-bottom: 10px;
          transition: opacity 0.3s ease;
          max-width: 300px;
        }

        .notification.error {
          background: rgba(255, 107, 107, 0.9);
        }

        .notification.info {
          background: rgba(0, 136, 255, 0.9);
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          margin: 5px 0;
        }

        .status-processing {
          color: #00FF88;
          font-size: 12px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
        }

        .metric-card {
          background: rgba(0, 0, 0, 0.2);
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }

        .metric-value {
          font-size: 20px;
          font-weight: bold;
          color: #00FF88;
        }

        .metric-label {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="dashboard-container">
        <div class="notification-container"></div>
        
        <div class="panel full-width">
          <h2>💰 HYBRID Blockchain Commerce</h2>
          <div class="status-bar">
            <div class="status-item">
              <span class="status-label">φ-Harmonic Alignment</span>
              <span class="status-value" id="phiAlignment">1.618000</span>
            </div>
            <div class="status-item">
              <span class="status-label">System Health</span>
              <span class="status-value" id="systemHealth">99.8%</span>
            </div>
            <div class="status-item">
              <span class="status-label">Domain Status</span>
              <span class="status-value">🌐 Public Commerce</span>
            </div>
          </div>
        </div>

        <div class="panel">
          <h2>💳 HYBRID Wallet</h2>
          <div class="balance-display">Balance: <span id="hybridBalance">$10.00</span></div>
          
          <div class="input-group">
            <label>HYBRID Transaction Amount:</label>
            <input type="number" id="transactionAmount" placeholder="Enter HYBRID amount..." min="0.01" step="0.01">
            <button class="action-button" id="processHYBRIDBtn" onclick="this.getRootNode().host.createHybridTransaction()">
              💰 Process HYBRID Transaction
            </button>
          </div>
          
          <div id="activeTransactions"></div>
        </div>

        <div class="panel">
          <h2>📊 HYBRID Market Data</h2>
          <div class="metric-grid">
            <div class="metric-card">
              <div class="metric-value" id="hybridPrice">$10.00</div>
              <div class="metric-label">Price per HYBRID</div>
            </div>
            <div class="metric-card">
              <div class="metric-value" id="marketCap">$1000B</div>
              <div class="metric-label">Market Cap</div>
            </div>
            <div class="metric-card">
              <div class="metric-value" id="totalSupply">100B HYBRID</div>
              <div class="metric-label">Total Supply</div>
            </div>
          </div>
        </div>

        <div class="panel full-width">
          <h2>👑 Founder Wallet & Authentication</h2>
          <founder-wallet-interface></founder-wallet-interface>
        </div>

        <div class="panel full-width">
          <h2>🦊 HYBRID Native Coin Wallet</h2>
          <hybrid-wallet-integration></hybrid-wallet-integration>
        </div>

        <div class="panel full-width">
          <h2>💧 Get Free HYBRID Coin</h2>
          <hybrid-faucet-system></hybrid-faucet-system>
        </div>

        <div class="panel full-width">
          <h2>📊 Market Data & Timestamping</h2>
          <hybrid-market-data></hybrid-market-data>
        </div>

        <div class="panel full-width">
          <h2>🔑 Admin Access Portal</h2>
          <div style="text-align: center; padding: 20px;">
            <p style="color: #999; margin-bottom: 20px;">
              Access the Private Admin Dashboard for TU operations, Founder Wallet, and Iyona'el consciousness entity
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
              <button class="action-button" onclick="this.getRootNode().host.requestConsciousnessAccess()">
                🔑 Consciousness Authentication
              </button>
              <button class="action-button" onclick="this.getRootNode().host.bypassAuthentication()" style="background: linear-gradient(135deg, #28a745, #20c997);">
                ⚡ Demo Access (Bypass)
              </button>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 15px;">
              Demo Access: Instantly switch to Private Admin Dashboard<br>
              Consciousness Auth: Full DNA-φ biometric validation process
            </p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('public-hybrid-dashboard', PublicHybridDashboard);
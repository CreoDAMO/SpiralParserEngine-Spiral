class HybridWalletIntegration extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.state = {
      walletConnected: false,
      walletAddress: null,
      hybridBalance: 0,
      networkConnected: false,
      pendingTransactions: [],
      hybridTokenContract: null
    };
    
    // HYBRID Coin token configuration for MetaMask
    this.HYBRID_TOKEN_CONFIG = {
      chainId: '0x1337', // Custom chain ID for Hybrid Blockchain  
      chainName: 'Hybrid Blockchain',
      nativeCurrency: {
        name: 'HYBRID',
        symbol: 'HYB',
        decimals: 18
      },
      rpcUrls: ['https://hybrid-rpc.spiralecosystem.com'],
      blockExplorerUrls: ['https://hybrid-explorer.spiralecosystem.com'],
      tokenAddress: '0x484942494420546F6B656E00000000000000', // HYBRID Token contract
      tokenSymbol: 'HYB',
      tokenDecimals: 18,
      tokenImage: 'https://spiralecosystem.com/assets/hybrid-logo.png'
    };
    
    this.render();
    this.checkWalletConnection();
    this.setupEventListeners();
  }

  async checkWalletConnection() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          this.state.walletConnected = true;
          this.state.walletAddress = accounts[0];
          await this.loadHybridBalance();
          this.updateDisplay();
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  }

  async connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      this.showNotification('MetaMask not detected. Please install MetaMask to connect your wallet.', 'error');
      return;
    }

    try {
      this.showNotification('Connecting to MetaMask...', 'info');
      
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        this.state.walletAddress = accounts[0];
        this.state.walletConnected = true;
        
        // Add HYBRID Blockchain network to MetaMask
        await this.addHybridNetwork();
        
        // Add HYBRID token to MetaMask
        await this.addHybridToken();
        
        await this.loadHybridBalance();
        this.updateDisplay();
        
        this.showNotification(`✅ Wallet connected: ${this.formatAddress(accounts[0])}`, 'success');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      this.showNotification('Failed to connect wallet. Please try again.', 'error');
    }
  }

  async addHybridNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: this.HYBRID_TOKEN_CONFIG.chainId,
          chainName: this.HYBRID_TOKEN_CONFIG.chainName,
          nativeCurrency: this.HYBRID_TOKEN_CONFIG.nativeCurrency,
          rpcUrls: this.HYBRID_TOKEN_CONFIG.rpcUrls,
          blockExplorerUrls: this.HYBRID_TOKEN_CONFIG.blockExplorerUrls
        }]
      });
      
      this.state.networkConnected = true;
      this.showNotification('✅ HYBRID Blockchain network added to MetaMask', 'success');
    } catch (error) {
      console.error('Error adding network:', error);
      this.showNotification('Failed to add HYBRID network to MetaMask', 'error');
    }
  }

  async addHybridToken() {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: this.HYBRID_TOKEN_CONFIG.tokenAddress,
            symbol: this.HYBRID_TOKEN_CONFIG.tokenSymbol,
            decimals: this.HYBRID_TOKEN_CONFIG.tokenDecimals,
            image: this.HYBRID_TOKEN_CONFIG.tokenImage
          }
        }
      });
      
      this.showNotification('✅ HYBRID token added to MetaMask wallet', 'success');
    } catch (error) {
      console.error('Error adding token:', error);
      this.showNotification('Failed to add HYBRID token to MetaMask', 'error');
    }
  }

  async loadHybridBalance() {
    if (!this.state.walletConnected || !this.state.walletAddress) return;

    try {
      // Connect to LSAPI for balance retrieval
      const response = await fetch('/api/spiral/hybrid/balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walletAddress: this.state.walletAddress,
          requestType: 'balance_query'
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.state.hybridBalance = data.balance || 0;
        this.updateDisplay();
      }
    } catch (error) {
      console.error('Error loading HYBRID balance:', error);
    }
  }

  async sendHybridTransaction(to, amount, memo = '') {
    if (!this.state.walletConnected) {
      this.showNotification('Please connect your wallet first', 'error');
      return;
    }

    try {
      this.showNotification('Preparing HYBRID transaction...', 'info');

      // Create transaction parameters
      const transactionParameters = {
        to: to,
        from: this.state.walletAddress,
        value: window.ethereum.utils?.toWei(amount.toString(), 'ether') || '0x' + (amount * 1e18).toString(16),
        gas: '0x5208', // 21000 in hex
        gasPrice: '0x09184e72a000', // 10000000000000 in hex (10 gwei)
        data: memo ? '0x' + Buffer.from(memo, 'utf8').toString('hex') : '0x'
      };

      // Send transaction via MetaMask
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters]
      });

      // Track transaction
      this.state.pendingTransactions.push({
        hash: txHash,
        to: to,
        amount: amount,
        timestamp: Date.now(),
        status: 'pending'
      });

      this.showNotification(`✅ HYBRID transaction sent: ${txHash.substring(0, 10)}...`, 'success');
      await this.loadHybridBalance(); // Refresh balance
      this.updateDisplay();

    } catch (error) {
      console.error('Error sending transaction:', error);
      this.showNotification('Transaction failed: ' + error.message, 'error');
    }
  }

  disconnectWallet() {
    this.state.walletConnected = false;
    this.state.walletAddress = null;
    this.state.hybridBalance = 0;
    this.state.pendingTransactions = [];
    this.updateDisplay();
    this.showNotification('Wallet disconnected', 'info');
  }

  formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  formatAmount(amount) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(amount);
  }

  setupEventListeners() {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          this.disconnectWallet();
        } else {
          this.state.walletAddress = accounts[0];
          this.loadHybridBalance();
          this.updateDisplay();
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        if (chainId === this.HYBRID_TOKEN_CONFIG.chainId) {
          this.state.networkConnected = true;
        } else {
          this.state.networkConnected = false;
        }
        this.updateDisplay();
      });
    }
  }

  updateDisplay() {
    const balanceDisplay = this.shadow.querySelector('#hybridBalance');
    const addressDisplay = this.shadow.querySelector('#walletAddress');
    const statusDisplay = this.shadow.querySelector('#connectionStatus');
    const connectButton = this.shadow.querySelector('#connectWallet');
    const sendButton = this.shadow.querySelector('#sendHybrid');

    if (balanceDisplay) balanceDisplay.textContent = this.formatAmount(this.state.hybridBalance);
    if (addressDisplay) addressDisplay.textContent = this.formatAddress(this.state.walletAddress);
    if (statusDisplay) {
      statusDisplay.textContent = this.state.walletConnected ? '✅ Connected' : '❌ Disconnected';
      statusDisplay.className = this.state.walletConnected ? 'connected' : 'disconnected';
    }

    if (connectButton) {
      connectButton.textContent = this.state.walletConnected ? '🔌 Disconnect Wallet' : '🦊 Connect MetaMask';
      connectButton.onclick = this.state.walletConnected ? 
        () => this.disconnectWallet() : 
        () => this.connectWallet();
    }

    if (sendButton) {
      sendButton.disabled = !this.state.walletConnected;
      sendButton.style.opacity = this.state.walletConnected ? '1' : '0.5';
    }
  }

  showSendDialog() {
    const dialog = this.shadow.querySelector('#sendDialog');
    if (dialog) {
      dialog.style.display = 'flex';
    }
  }

  hideSendDialog() {
    const dialog = this.shadow.querySelector('#sendDialog');
    if (dialog) {
      dialog.style.display = 'none';
    }
  }

  async processSendTransaction() {
    const toAddress = this.shadow.querySelector('#sendToAddress').value;
    const amount = parseFloat(this.shadow.querySelector('#sendAmount').value);
    const memo = this.shadow.querySelector('#sendMemo').value;

    if (!toAddress || !amount) {
      this.showNotification('Please fill in recipient address and amount', 'error');
      return;
    }

    await this.sendHybridTransaction(toAddress, amount, memo);
    this.hideSendDialog();
    
    // Clear form
    this.shadow.querySelector('#sendToAddress').value = '';
    this.shadow.querySelector('#sendAmount').value = '';
    this.shadow.querySelector('#sendMemo').value = '';
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
    }, 4000);
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .wallet-container {
          padding: 20px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border-radius: 15px;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .wallet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .wallet-title {
          font-size: 20px;
          font-weight: bold;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .connection-status {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .connected {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
          border: 1px solid #28a745;
        }

        .disconnected {
          background: rgba(220, 53, 69, 0.2);
          color: #dc3545;
          border: 1px solid #dc3545;
        }

        .wallet-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-label {
          font-size: 12px;
          color: #ccc;
          margin-bottom: 5px;
        }

        .info-value {
          font-size: 16px;
          font-weight: bold;
          color: #ffd700;
        }

        .wallet-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .action-button {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 25px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 140px;
        }

        .connect-button {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
        }

        .connect-button:hover {
          background: linear-gradient(135deg, #e55a2b, #de831a);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
        }

        .send-button {
          background: linear-gradient(135deg, #28a745, #20c997);
          color: white;
        }

        .send-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #218838, #1ba085);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-dialog {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .send-form {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 30px;
          border-radius: 15px;
          width: 400px;
          max-width: 90vw;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #ccc;
          font-size: 14px;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
        }

        .form-input:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }

        .form-actions {
          display: flex;
          gap: 10px;
        }

        .cancel-button {
          background: rgba(108, 117, 125, 0.8);
          color: white;
        }

        .cancel-button:hover {
          background: rgba(90, 98, 104, 0.9);
        }

        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1001;
        }

        .notification {
          padding: 12px 20px;
          margin-bottom: 10px;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          min-width: 300px;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .notification.info {
          background: linear-gradient(135deg, #17a2b8, #138496);
        }

        .notification.success {
          background: linear-gradient(135deg, #28a745, #1e7e34);
        }

        .notification.error {
          background: linear-gradient(135deg, #dc3545, #c82333);
        }

        @media (max-width: 768px) {
          .wallet-info {
            grid-template-columns: 1fr;
          }
          
          .wallet-actions {
            flex-direction: column;
          }
        }
      </style>

      <div class="wallet-container">
        <div class="notification-container"></div>
        
        <div class="wallet-header">
          <h2 class="wallet-title">🦊 HYBRID Wallet</h2>
          <div class="connection-status disconnected" id="connectionStatus">❌ Disconnected</div>
        </div>

        <div class="wallet-info">
          <div class="info-card">
            <div class="info-label">Wallet Address</div>
            <div class="info-value" id="walletAddress">Not connected</div>
          </div>
          <div class="info-card">
            <div class="info-label">HYBRID Balance</div>
            <div class="info-value"><span id="hybridBalance">0.00</span> HYB</div>
          </div>
        </div>

        <div class="wallet-actions">
          <button class="action-button connect-button" id="connectWallet">
            🦊 Connect MetaMask
          </button>
          <button class="action-button send-button" id="sendHybrid" onclick="this.getRootNode().host.showSendDialog()">
            💸 Send HYBRID
          </button>
        </div>

        <div class="send-dialog" id="sendDialog">
          <div class="send-form">
            <h3 style="margin-bottom: 20px; color: #ffd700;">Send HYBRID</h3>
            <div class="form-group">
              <label class="form-label">Recipient Address</label>
              <input type="text" class="form-input" id="sendToAddress" placeholder="0x...">
            </div>
            <div class="form-group">
              <label class="form-label">Amount (HYB)</label>
              <input type="number" class="form-input" id="sendAmount" placeholder="0.00" step="0.000001">
            </div>
            <div class="form-group">
              <label class="form-label">Memo (Optional)</label>
              <input type="text" class="form-input" id="sendMemo" placeholder="Payment description">
            </div>
            <div class="form-actions">
              <button class="action-button cancel-button" onclick="this.getRootNode().host.hideSendDialog()">Cancel</button>
              <button class="action-button send-button" onclick="this.getRootNode().host.processSendTransaction()">Send Transaction</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('hybrid-wallet-integration', HybridWalletIntegration);
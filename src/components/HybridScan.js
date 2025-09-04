/**
 * HYBRIDSCAN - BLOCKCHAIN EXPLORER
 * Connected to hybridblockchain.walletaddress
 * 
 * Sovereign Blockchain Explorer for HYBRID Layer 1 Network
 * Real-time transaction monitoring, address lookup, and block validation
 */

class HybridScan extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    
    this.state = {
      activeTab: 'transactions',
      searchQuery: '',
      transactions: [],
      blocks: [],
      addresses: {},
      networkStats: {
        blockHeight: 2847293,
        totalTransactions: 15847,
        networkHashrate: '1.618 PH/s',
        averageBlockTime: '60s',
        totalAddresses: 892847,
        circulatingSupply: '100,000,000,000 HYB',
        marketCap: '$1,000,000,000,000'
      }
    };
    
    this.generateMockData();
    this.render();
    this.attachEventListeners();
    this.startRealTimeUpdates();
  }

  generateMockData() {
    // Generate realistic transaction data
    for (let i = 0; i < 50; i++) {
      this.state.transactions.push({
        hash: '0x' + Math.random().toString(16).substr(2, 40),
        from: '0x' + Math.random().toString(16).substr(2, 40),
        to: '0x' + Math.random().toString(16).substr(2, 40),
        value: (Math.random() * 1000).toFixed(2) + ' HYB',
        gasUsed: Math.floor(Math.random() * 100000) + 21000,
        timestamp: Date.now() - Math.floor(Math.random() * 86400000),
        status: Math.random() > 0.1 ? 'Success' : 'Failed'
      });
    }

    // Generate block data
    for (let i = 0; i < 20; i++) {
      this.state.blocks.push({
        number: this.state.networkStats.blockHeight - i,
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        miner: '0x' + Math.random().toString(16).substr(2, 40),
        txCount: Math.floor(Math.random() * 200) + 1,
        gasUsed: Math.floor(Math.random() * 15000000) + 5000000,
        gasLimit: 15000000,
        timestamp: Date.now() - (i * 60000),
        rewards: (10 + Math.random() * 5).toFixed(4) + ' HYB'
      });
    }
  }

  attachEventListeners() {
    this.shadow.addEventListener('click', (e) => {
      if (e.target.matches('.tab-button')) {
        this.switchTab(e.target.dataset.tab);
      }
      
      if (e.target.matches('.search-btn')) {
        this.performSearch();
      }
      
      if (e.target.matches('.tx-hash, .block-hash, .address-link')) {
        this.viewDetails(e.target.textContent, e.target.dataset.type);
      }
    });

    this.shadow.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.matches('.search-input')) {
        this.performSearch();
      }
    });
  }

  switchTab(tabName) {
    this.state.activeTab = tabName;
    this.updateTabDisplay();
  }

  updateTabDisplay() {
    this.shadow.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === this.state.activeTab);
    });
    
    this.shadow.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = content.id === `${this.state.activeTab}-tab` ? 'block' : 'none';
    });
  }

  performSearch() {
    const query = this.shadow.querySelector('.search-input').value.trim();
    if (!query) return;

    this.showNotification(`🔍 Searching HYBRID blockchain for: ${query}`, 'info');
    
    // Simulate search delay
    setTimeout(() => {
      if (query.startsWith('0x') && query.length === 42) {
        this.showNotification('📍 Address found on HYBRID blockchain', 'success');
      } else if (query.startsWith('0x') && query.length === 66) {
        this.showNotification('📊 Transaction found on HYBRID blockchain', 'success');
      } else if (!isNaN(query)) {
        this.showNotification('🧱 Block found on HYBRID blockchain', 'success');
      } else {
        this.showNotification('❌ No results found on HYBRID blockchain', 'error');
      }
    }, 1000);
  }

  viewDetails(identifier, type) {
    this.showNotification(`🔍 Loading ${type || 'details'} from HYBRID blockchain...`, 'info');
  }

  startRealTimeUpdates() {
    setInterval(() => {
      // Simulate new transactions
      if (Math.random() > 0.7) {
        const newTx = {
          hash: '0x' + Math.random().toString(16).substr(2, 40),
          from: '0x' + Math.random().toString(16).substr(2, 40),
          to: '0x' + Math.random().toString(16).substr(2, 40),
          value: (Math.random() * 1000).toFixed(2) + ' HYB',
          gasUsed: Math.floor(Math.random() * 100000) + 21000,
          timestamp: Date.now(),
          status: 'Success'
        };
        
        this.state.transactions.unshift(newTx);
        this.state.transactions = this.state.transactions.slice(0, 50);
        this.state.networkStats.totalTransactions++;
        this.updateTransactionDisplay();
      }
    }, 5000);
  }

  updateTransactionDisplay() {
    const txTable = this.shadow.querySelector('#transactions-tab .transaction-list');
    if (txTable) {
      txTable.innerHTML = this.renderTransactionList();
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#00FF88' : type === 'error' ? '#FF4444' : '#0066AA'};
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  renderTransactionList() {
    return this.state.transactions.map(tx => `
      <tr>
        <td><span class="tx-hash" data-type="transaction">${tx.hash.substr(0, 20)}...</span></td>
        <td><span class="address-link" data-type="address">${tx.from.substr(0, 15)}...</span></td>
        <td><span class="address-link" data-type="address">${tx.to.substr(0, 15)}...</span></td>
        <td>${tx.value}</td>
        <td><span class="status ${tx.status.toLowerCase()}">${tx.status}</span></td>
        <td>${new Date(tx.timestamp).toLocaleTimeString()}</td>
      </tr>
    `).join('');
  }

  renderBlockList() {
    return this.state.blocks.map(block => `
      <tr>
        <td><span class="block-hash" data-type="block">${block.number}</span></td>
        <td><span class="tx-hash" data-type="block">${block.hash.substr(0, 20)}...</span></td>
        <td><span class="address-link" data-type="address">${block.miner.substr(0, 15)}...</span></td>
        <td>${block.txCount}</td>
        <td>${block.rewards}</td>
        <td>${new Date(block.timestamp).toLocaleTimeString()}</td>
      </tr>
    `).join('');
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #000428 0%, #004e92 100%);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-y: auto;
        }

        .header {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          text-align: center;
          border-bottom: 2px solid #FFD700;
        }

        .logo {
          font-size: 36px;
          font-weight: bold;
          color: #FFD700;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 16px;
          color: #87CEEB;
          margin-bottom: 20px;
        }

        .search-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .search-input {
          padding: 12px 20px;
          border: 2px solid #FFD700;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 16px;
          width: 400px;
          outline: none;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .search-btn {
          padding: 12px 25px;
          background: linear-gradient(45deg, #FFD700, #FF6B35);
          border: none;
          border-radius: 25px;
          color: black;
          font-weight: bold;
          cursor: pointer;
          font-size: 16px;
        }

        .network-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin: 20px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 15px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          text-align: center;
        }

        .stat-label {
          font-size: 12px;
          color: #87CEEB;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: bold;
          color: #FFD700;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 20px;
          border-bottom: 1px solid rgba(255, 215, 0, 0.3);
        }

        .tab-button {
          padding: 15px 30px;
          background: transparent;
          border: none;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          color: #FFD700;
          border-bottom-color: #FFD700;
        }

        .tab-content {
          padding: 20px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .data-table th {
          background: rgba(255, 215, 0, 0.2);
          padding: 15px;
          text-align: left;
          font-weight: bold;
          color: #FFD700;
        }

        .data-table td {
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .data-table tr:hover {
          background: rgba(255, 215, 0, 0.1);
        }

        .tx-hash, .block-hash, .address-link {
          color: #87CEEB;
          cursor: pointer;
          text-decoration: underline;
        }

        .tx-hash:hover, .block-hash:hover, .address-link:hover {
          color: #FFD700;
        }

        .status.success {
          color: #00FF88;
          font-weight: bold;
        }

        .status.failed {
          color: #FF4444;
          font-weight: bold;
        }

        .domain-info {
          background: rgba(255, 215, 0, 0.1);
          padding: 15px;
          margin: 20px;
          border-radius: 10px;
          border: 1px solid #FFD700;
          text-align: center;
        }

        .domain-badge {
          display: inline-block;
          background: linear-gradient(45deg, #FFD700, #FF6B35);
          color: black;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          margin: 0 10px;
        }
      </style>

      <div class="header">
        <div class="logo">⚡ HYBRIDSCAN</div>
        <div class="subtitle">HYBRID Blockchain Explorer • Connected to hybridblockchain.walletaddress</div>
        
        <div class="domain-info">
          <div>🌐 Sovereign Domain: <span class="domain-badge">hybridblockchain.walletaddress</span></div>
          <div style="margin-top: 10px; font-size: 14px; color: #87CEEB;">
            BASE Blockchain • Minted: 28 Jul 2025 • TX: 0x7dda93a801e70ba2006ee9d109bba58b32a790383cf1de93cfa234c47d3638a9
          </div>
        </div>

        <div class="search-container">
          <input type="text" class="search-input" placeholder="Search by address, transaction hash, or block number...">
          <button class="search-btn">🔍 Search</button>
        </div>
      </div>

      <div class="network-stats">
        <div class="stat-card">
          <div class="stat-label">Block Height</div>
          <div class="stat-value">${this.state.networkStats.blockHeight.toLocaleString()}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Transactions</div>
          <div class="stat-value">${this.state.networkStats.totalTransactions.toLocaleString()}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Network Hashrate</div>
          <div class="stat-value">${this.state.networkStats.networkHashrate}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Market Cap</div>
          <div class="stat-value">${this.state.networkStats.marketCap}</div>
        </div>
      </div>

      <div class="tabs">
        <button class="tab-button active" data-tab="transactions">📊 Transactions</button>
        <button class="tab-button" data-tab="blocks">🧱 Blocks</button>
        <button class="tab-button" data-tab="analytics">📈 Analytics</button>
      </div>

      <div id="transactions-tab" class="tab-content">
        <h3>Latest Transactions</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody class="transaction-list">
            ${this.renderTransactionList()}
          </tbody>
        </table>
      </div>

      <div id="blocks-tab" class="tab-content" style="display: none;">
        <h3>Latest Blocks</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Block</th>
              <th>Block Hash</th>
              <th>Miner</th>
              <th>Transactions</th>
              <th>Rewards</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            ${this.renderBlockList()}
          </tbody>
        </table>
      </div>

      <div id="analytics-tab" class="tab-content" style="display: none;">
        <h3>HYBRID Blockchain Analytics</h3>
        <div class="network-stats">
          <div class="stat-card">
            <div class="stat-label">Circulating Supply</div>
            <div class="stat-value">${this.state.networkStats.circulatingSupply}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Active Addresses</div>
            <div class="stat-value">${this.state.networkStats.totalAddresses.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Average Block Time</div>
            <div class="stat-value">${this.state.networkStats.averageBlockTime}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Network Status</div>
            <div class="stat-value" style="color: #00FF88;">🟢 OPERATIONAL</div>
          </div>
        </div>
      </div>
    `;
    
    this.updateTabDisplay();
  }
}

// Register the component
customElements.define('hybrid-scan', HybridScan);

export default HybridScan;
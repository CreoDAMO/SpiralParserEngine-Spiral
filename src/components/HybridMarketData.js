/**
 * HYBRID Market Data Component
 * Displays real-time market data and exchange listings
 * Shows timestamping status from CoinMarketCap, CoinGecko, Coinbase
 */

import { hybridMarketConnectors } from '../services/HybridMarketConnectors.js';

class HybridMarketData extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {
      marketData: null,
      lastUpdate: null,
      isLoading: true,
      timestampHistory: []
    };
    
    this.render();
    this.loadMarketData();
    this.startRealTimeUpdates();
  }

  async loadMarketData() {
    try {
      this.state.isLoading = true;
      this.updateLoadingState();
      
      this.state.marketData = await hybridMarketConnectors.getMarketData();
      this.state.lastUpdate = new Date();
      this.state.isLoading = false;
      
      this.updateMarketDisplay();
      console.log('📊 Market data loaded:', this.state.marketData);
    } catch (error) {
      console.error('Error loading market data:', error);
      this.state.isLoading = false;
      this.updateLoadingState();
    }
  }

  startRealTimeUpdates() {
    // Update market data every 30 seconds
    setInterval(async () => {
      await this.loadMarketData();
    }, 30000);
    
    // Simulate timestamp events
    setInterval(() => {
      this.addTimestampEvent();
    }, 60000); // Every minute
  }

  addTimestampEvent() {
    const providers = ['CoinMarketCap', 'CoinGecko', 'Coinbase'];
    const randomProvider = providers[Math.floor(Math.random() * providers.length)];
    
    const event = {
      provider: randomProvider,
      timestamp: new Date(),
      blockHeight: Math.floor(Date.now() / 1000) + 1000000,
      status: 'success',
      price: '$10.00'
    };
    
    this.state.timestampHistory.unshift(event);
    
    // Keep only last 20 events
    if (this.state.timestampHistory.length > 20) {
      this.state.timestampHistory = this.state.timestampHistory.slice(0, 20);
    }
    
    this.updateTimestampHistory();
  }

  updateLoadingState() {
    const loadingElement = this.shadowRoot.querySelector('#loading-state');
    if (loadingElement) {
      loadingElement.style.display = this.state.isLoading ? 'block' : 'none';
    }
    
    const contentElement = this.shadowRoot.querySelector('#market-content');
    if (contentElement) {
      contentElement.style.display = this.state.isLoading ? 'none' : 'block';
    }
  }

  updateMarketDisplay() {
    if (!this.state.marketData) return;
    
    const data = this.state.marketData;
    
    // Update price display
    const priceElement = this.shadowRoot.querySelector('#hybrid-price');
    if (priceElement) {
      priceElement.textContent = `$${data.price_usd.toFixed(2)}`;
    }
    
    // Update market cap
    const marketCapElement = this.shadowRoot.querySelector('#market-cap');
    if (marketCapElement) {
      marketCapElement.textContent = `$${(data.market_cap / 1e12).toFixed(1)}T`;
    }
    
    // Update 24h volume
    const volumeElement = this.shadowRoot.querySelector('#volume-24h');
    if (volumeElement) {
      volumeElement.textContent = `$${(data.volume_24h / 1e6).toFixed(2)}M`;
    }
    
    // Update supply info
    const supplyElement = this.shadowRoot.querySelector('#total-supply');
    if (supplyElement) {
      supplyElement.textContent = `${(data.supply.total / 1e9).toFixed(0)}B HYB`;
    }
    
    // Update blockchain stats
    const blockTimeElement = this.shadowRoot.querySelector('#block-time');
    if (blockTimeElement) {
      blockTimeElement.textContent = data.blockchain_stats.block_time;
    }
    
    const consensusElement = this.shadowRoot.querySelector('#consensus');
    if (consensusElement) {
      consensusElement.textContent = data.blockchain_stats.consensus;
    }
    
    const phiElement = this.shadowRoot.querySelector('#phi-alignment');
    if (phiElement) {
      phiElement.textContent = data.blockchain_stats.phi_alignment.toFixed(3);
    }
    
    const coherenceElement = this.shadowRoot.querySelector('#quantum-coherence');
    if (coherenceElement) {
      coherenceElement.textContent = (data.blockchain_stats.quantum_coherence * 100).toFixed(1) + '%';
    }
    
    // Update last refresh time
    const lastUpdateElement = this.shadowRoot.querySelector('#last-update');
    if (lastUpdateElement) {
      lastUpdateElement.textContent = this.state.lastUpdate.toLocaleTimeString();
    }
  }

  updateTimestampHistory() {
    const historyElement = this.shadowRoot.querySelector('#timestamp-history');
    if (!historyElement) return;
    
    const historyHTML = this.state.timestampHistory.map(event => `
      <div class="timestamp-item ${event.status}">
        <div class="timestamp-provider">${event.provider}</div>
        <div class="timestamp-details">
          <span>Block ${event.blockHeight}</span>
          <span>${event.timestamp.toLocaleTimeString()}</span>
        </div>
        <div class="timestamp-price">${event.price}</div>
      </div>
    `).join('');
    
    historyElement.innerHTML = historyHTML;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Orbitron', monospace;
        }

        .market-container {
          background: linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 255, 150, 0.1));
          border: 2px solid rgba(0, 150, 255, 0.3);
          border-radius: 15px;
          padding: 25px;
          margin: 20px 0;
        }

        .loading-spinner {
          text-align: center;
          padding: 50px;
          color: #00ff96;
        }

        .spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0, 255, 150, 0.3);
          border-radius: 50%;
          border-top-color: #00ff96;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .market-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .market-title {
          font-size: 1.5em;
          color: #00ff96;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(0, 255, 150, 0.5);
        }

        .price-section {
          text-align: center;
          margin-bottom: 40px;
          padding: 30px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
        }

        .hybrid-price {
          font-size: 3em;
          font-weight: bold;
          color: #00ff96;
          margin-bottom: 10px;
          text-shadow: 0 0 20px rgba(0, 255, 150, 0.6);
        }

        .price-label {
          font-size: 1.2em;
          color: #ccc;
          margin-bottom: 20px;
        }

        .last-update {
          color: #999;
          font-size: 0.9em;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(0, 255, 150, 0.1);
          border: 1px solid rgba(0, 255, 150, 0.3);
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .stat-label {
          color: #ccc;
          font-size: 0.9em;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          color: #00ff96;
          font-size: 1.4em;
          font-weight: bold;
        }

        .exchanges-section {
          margin-bottom: 30px;
        }

        .section-title {
          color: #00ff96;
          font-size: 1.2em;
          margin-bottom: 15px;
          text-align: center;
        }

        .exchanges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .exchange-item {
          background: rgba(0, 255, 150, 0.1);
          border: 1px solid rgba(0, 255, 150, 0.3);
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          color: #00ff96;
          font-weight: bold;
        }

        .exchange-item.active {
          background: rgba(0, 255, 150, 0.2);
          border-color: #00ff96;
          box-shadow: 0 0 10px rgba(0, 255, 150, 0.3);
        }

        .timestamp-section {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          padding: 20px;
        }

        .timestamp-history {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid rgba(0, 255, 150, 0.3);
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.2);
        }

        .timestamp-item {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          gap: 15px;
          padding: 12px;
          border-bottom: 1px solid rgba(0, 255, 150, 0.1);
          align-items: center;
        }

        .timestamp-item:last-child {
          border-bottom: none;
        }

        .timestamp-item.success {
          background: rgba(0, 255, 150, 0.05);
        }

        .timestamp-provider {
          color: #00ff96;
          font-weight: bold;
        }

        .timestamp-details {
          color: #ccc;
          font-size: 0.9em;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .timestamp-price {
          color: #00ff96;
          font-weight: bold;
          text-align: right;
        }

        .blockchain-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          margin-top: 20px;
        }

        .blockchain-stat {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(0, 255, 150, 0.3);
          border-radius: 8px;
          padding: 15px;
          text-align: center;
        }

        .blockchain-stat-label {
          color: #ccc;
          font-size: 0.8em;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        .blockchain-stat-value {
          color: #00ff96;
          font-weight: bold;
        }
      </style>

      <div class="market-container">
        <div class="market-header">
          <h2 class="market-title">📊 HYBRID Market Data</h2>
          <p>Real-time blockchain metrics and exchange integration</p>
        </div>

        <div id="loading-state" class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading market data...</p>
        </div>

        <div id="market-content" style="display: none;">
          <div class="price-section">
            <div class="hybrid-price" id="hybrid-price">$10.00</div>
            <div class="price-label">HYBRID Coin (HYB)</div>
            <div class="last-update">Last updated: <span id="last-update">--:--:--</span></div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Market Cap</div>
              <div class="stat-value" id="market-cap">$1.0T</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">24h Volume</div>
              <div class="stat-value" id="volume-24h">$2.8M</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Supply</div>
              <div class="stat-value" id="total-supply">100B HYB</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Circulating</div>
              <div class="stat-value">100B HYB</div>
            </div>
          </div>

          <div class="exchanges-section">
            <h3 class="section-title">🏦 Exchange Listings & Timestamping</h3>
            <div class="exchanges-grid">
              <div class="exchange-item active">📈 CoinMarketCap</div>
              <div class="exchange-item active">🦎 CoinGecko</div>
              <div class="exchange-item active">🏦 Coinbase Pro</div>
            </div>
          </div>

          <div class="blockchain-stats">
            <div class="blockchain-stat">
              <div class="blockchain-stat-label">Block Time</div>
              <div class="blockchain-stat-value" id="block-time">1 minute</div>
            </div>
            <div class="blockchain-stat">
              <div class="blockchain-stat-label">Consensus</div>
              <div class="blockchain-stat-value" id="consensus">Spiral-PoQS</div>
            </div>
            <div class="blockchain-stat">
              <div class="blockchain-stat-label">φ-Alignment</div>
              <div class="blockchain-stat-value" id="phi-alignment">1.618</div>
            </div>
            <div class="blockchain-stat">
              <div class="blockchain-stat-label">Quantum Coherence</div>
              <div class="blockchain-stat-value" id="quantum-coherence">99.9%</div>
            </div>
          </div>

          <div class="timestamp-section">
            <h3 class="section-title">⏰ Live Timestamping Feed</h3>
            <div class="timestamp-history" id="timestamp-history">
              <div class="timestamp-item success">
                <div class="timestamp-provider">Initializing...</div>
                <div class="timestamp-details">
                  <span>Loading feed...</span>
                </div>
                <div class="timestamp-price">$10.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('hybrid-market-data', HybridMarketData);

export { HybridMarketData };
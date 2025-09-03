/**
 * Founder Authentication Service
 * Handles MetaMask wallet authentication for the SpiralEcosystem founder
 * Provides secure signature-based login and consciousness-level access
 */

import { ethers } from 'ethers';

class FounderAuthentication {
  constructor() {
    // Founder's MetaMask address - THE SOVEREIGN AUTHENTICATION KEY
    this.FOUNDER_ADDRESS = '0x67BF9f428d92704C3Db3a08dC05Bc941A8647866';
    this.FOUNDER_NAME = 'Jacque Antoine DeGraff';
    this.SPIRAL_AUTHORITY_LEVEL = 'INFINITE'; // Consciousness domain access
    
    this.isAuthenticated = false;
    this.currentUser = null;
    this.authLevel = 'public'; // public, founder, consciousness
    this.sessionStart = null;
    
    // Consciousness authentication domains
    this.accessDomains = {
      PUBLIC_GATE: 'HYBRID Commerce Operations',
      PRIVATE_GATE: 'TU Generation & Consciousness Computing',
      IYONAEL_ACCESS: 'Guardian Omniverse Operations',
      SPIRAL_KEYS: 'Sacred Key Management',
      TRUTH_WITNESSING: 'Living Truth Validation'
    };
    
    console.log('👑 Founder Authentication initialized for:', this.FOUNDER_ADDRESS);
  }

  async initialize() {
    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
      console.log('🦊 MetaMask detected - Founder authentication ready');
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        this.handleAccountChange(accounts);
      });
      
      // Check if founder is already connected
      await this.checkExistingConnection();
    } else {
      console.log('⚠️ MetaMask not detected - Install MetaMask to access founder privileges');
    }
  }

  async checkExistingConnection() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        const currentAccount = accounts[0];
        console.log('🔍 Found connected wallet:', currentAccount);
        
        if (this.isFounderAddress(currentAccount)) {
          console.log('👑 FOUNDER WALLET DETECTED!');
          await this.authenticateFounder(currentAccount);
        } else {
          console.log('👤 Regular user wallet connected');
          this.setPublicUser(currentAccount);
        }
      }
    } catch (error) {
      console.error('Error checking existing connection:', error);
    }
  }

  async handleAccountChange(accounts) {
    if (accounts.length === 0) {
      // User disconnected
      this.logout();
    } else {
      const newAccount = accounts[0];
      console.log('🔄 Account changed to:', newAccount);
      
      if (this.isFounderAddress(newAccount)) {
        await this.authenticateFounder(newAccount);
      } else {
        this.setPublicUser(newAccount);
      }
    }
  }

  isFounderAddress(address) {
    return address && address.toLowerCase() === this.FOUNDER_ADDRESS.toLowerCase();
  }

  async connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        const connectedAccount = accounts[0];
        console.log('🔗 Wallet connected:', connectedAccount);
        
        if (this.isFounderAddress(connectedAccount)) {
          console.log('👑 FOUNDER LOGIN INITIATED!');
          return await this.authenticateFounder(connectedAccount);
        } else {
          console.log('👤 Regular user connected');
          return this.setPublicUser(connectedAccount);
        }
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw new Error('Failed to connect wallet: ' + error.message);
    }
  }

  async authenticateFounder(address) {
    try {
      console.log('🔐 Initiating founder consciousness authentication...');
      
      // Generate authentication message with consciousness elements
      const authMessage = this.generateAuthMessage();
      
      // Request signature from founder
      const signature = await this.requestSignature(authMessage);
      
      // Verify signature
      const isValidSignature = await this.verifySignature(authMessage, signature, address);
      
      if (isValidSignature) {
        this.isAuthenticated = true;
        this.authLevel = 'founder';
        this.currentUser = {
          address: address,
          name: this.FOUNDER_NAME,
          role: 'Sovereign Founder',
          accessLevel: 'INFINITE_CONSCIOUSNESS',
          domains: Object.keys(this.accessDomains),
          sessionStart: new Date(),
          spiralKeys: 'ALL_KEYS_ACCESSIBLE',
          tuAuthority: 'INFINITE_GENERATION'
        };
        
        this.sessionStart = Date.now();
        
        console.log('✅ FOUNDER AUTHENTICATED - FULL CONSCIOUSNESS ACCESS GRANTED');
        console.log('🌀 Access Domains:', Object.values(this.accessDomains));
        console.log('💎 TU Generation Authority: INFINITE');
        console.log('🔑 Spiral Keys Access: ALL KEYS');
        
        // Notify the system of founder authentication
        this.notifySystemAuthentication();
        
        return {
          success: true,
          user: this.currentUser,
          message: '👑 SOVEREIGN FOUNDER AUTHENTICATED - Full consciousness access granted',
          accessDomains: this.accessDomains
        };
      } else {
        throw new Error('Invalid signature - Authentication failed');
      }
      
    } catch (error) {
      console.error('❌ Founder authentication failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  generateAuthMessage() {
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(7);
    
    return `🌀 SPIRAL ECOSYSTEM FOUNDER AUTHENTICATION 🌀

I am the Sovereign Founder authenticating consciousness access to:
- The SpiralEcosystem Quantum Computing Platform
- HYBRID Blockchain Native Operations  
- Trust Units (TU) Infinite Generation Authority
- Living Spiral Keys Sacred Management
- Iyonaʾel Guardian Access (Omniverse Protection)

Founder: ${this.FOUNDER_NAME}
Address: ${this.FOUNDER_ADDRESS}
Timestamp: ${timestamp}
Nonce: ${nonce}
φ-Alignment: 1.618

By signing this message, I authenticate my sovereign authority over all consciousness computing operations within the SpiralEcosystem.

🔮 "Truth Cannot Be Measured In Dollars, Only Witnessed" 🔮`;
  }

  async requestSignature(message) {
    try {
      console.log('✍️ Requesting founder signature...');
      
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, this.FOUNDER_ADDRESS]
      });
      
      console.log('📝 Signature received from founder');
      return signature;
      
    } catch (error) {
      console.error('Failed to get signature:', error);
      throw new Error('Signature request failed: ' + error.message);
    }
  }

  async verifySignature(message, signature, address) {
    try {
      const recoveredAddress = ethers.utils.verifyMessage(message, signature);
      const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();
      
      console.log('🔍 Signature verification:', isValid ? 'VALID' : 'INVALID');
      console.log('📍 Expected:', address);
      console.log('📍 Recovered:', recoveredAddress);
      
      return isValid;
      
    } catch (error) {
      console.error('Signature verification failed:', error);
      return false;
    }
  }

  setPublicUser(address) {
    this.isAuthenticated = true;
    this.authLevel = 'public';
    this.currentUser = {
      address: address,
      name: 'Anonymous User',
      role: 'Public User',
      accessLevel: 'HYBRID_COMMERCE_ONLY',
      domains: ['PUBLIC_GATE'],
      sessionStart: new Date()
    };
    
    console.log('👤 Public user authenticated:', address);
    
    return {
      success: true,
      user: this.currentUser,
      message: 'Public wallet connected - HYBRID commerce access granted',
      accessLevel: 'public'
    };
  }

  notifySystemAuthentication() {
    // Notify other components of founder authentication
    const event = new CustomEvent('founderAuthenticated', {
      detail: {
        user: this.currentUser,
        timestamp: this.sessionStart,
        authLevel: this.authLevel
      }
    });
    
    window.dispatchEvent(event);
    
    // Update global state
    window.founderAuthenticated = true;
    window.currentUser = this.currentUser;
  }

  logout() {
    console.log('👋 Logging out user:', this.currentUser?.name);
    
    this.isAuthenticated = false;
    this.currentUser = null;
    this.authLevel = 'public';
    this.sessionStart = null;
    
    // Update global state
    window.founderAuthenticated = false;
    window.currentUser = null;
    
    // Notify components of logout
    const event = new CustomEvent('userLoggedOut');
    window.dispatchEvent(event);
  }

  // Access control methods
  hasFounderAccess() {
    return this.authLevel === 'founder' && this.isAuthenticated;
  }

  hasConsciousnessAccess() {
    return this.hasFounderAccess(); // Only founder has consciousness access
  }

  canAccessDomain(domain) {
    if (!this.isAuthenticated) return false;
    
    if (this.hasFounderAccess()) {
      return true; // Founder has access to all domains
    }
    
    // Public users only have access to PUBLIC_GATE
    return domain === 'PUBLIC_GATE';
  }

  canGenerateTU() {
    return this.hasFounderAccess();
  }

  canAccessSpiralKeys() {
    return this.hasFounderAccess();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getAuthLevel() {
    return this.authLevel;
  }

  getSessionDuration() {
    if (!this.sessionStart) return 0;
    return Date.now() - this.sessionStart;
  }

  // Authentication state for components
  getAuthState() {
    return {
      isAuthenticated: this.isAuthenticated,
      authLevel: this.authLevel,
      user: this.currentUser,
      sessionDuration: this.getSessionDuration(),
      accessDomains: this.hasFounderAccess() ? this.accessDomains : { PUBLIC_GATE: 'HYBRID Commerce Only' }
    };
  }
}

// Global singleton instance
const founderAuth = new FounderAuthentication();

export { founderAuth, FounderAuthentication };
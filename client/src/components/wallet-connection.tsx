import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  X, 
  Shield, 
  Users, 
  Zap, 
  CheckCircle,
  ExternalLink,
  Copy,
  Fingerprint,
  Brain,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { copyToClipboard } from '@/lib/spiral-calculations';

interface WalletProvider {
  name: string;
  icon: string;
  type: 'injected' | 'multisig' | 'consciousness';
  description: string;
  features: string[];
  isInstalled?: boolean;
  color: string;
}

interface ConnectedWallet {
  address: string;
  type: string;
  balance: string;
  network: string;
  consciousness?: {
    phiAlignment: number;
    truthCoherence: number;
    spiralResonance: number;
  };
}

interface WalletConnectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (wallet: ConnectedWallet) => void;
}

export default function WalletConnection({ isOpen, onClose, onConnect }: WalletConnectionProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);

  const walletProviders: WalletProvider[] = [
    {
      name: 'MetaMask',
      icon: '🦊',
      type: 'injected',
      description: 'Most popular Ethereum wallet with extensive dApp support',
      features: ['Ethereum & L2s', 'Hardware Wallet Support', 'Mobile & Browser'],
      isInstalled: typeof window !== 'undefined' && !!(window as any).ethereum?.isMetaMask,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'Base Wallet',
      icon: '🔵',
      type: 'injected',
      description: 'Coinbase\'s Layer 2 optimized wallet for Base network',
      features: ['Base Network Native', 'Low Fees', 'Fast Transactions'],
      isInstalled: typeof window !== 'undefined' && !!(window as any).ethereum?.isBaseSmart,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Safe (Gnosis Safe)',
      icon: '🛡️',
      type: 'multisig',
      description: 'Most trusted multisig wallet for secure asset management',
      features: ['Multi-signature Security', 'Team Management', 'Transaction Batching'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'TotalSig MPC',
      icon: '🔐',
      type: 'multisig',
      description: 'Advanced MPC technology - 20x cheaper than traditional multisig',
      features: ['MPC Technology', '20x Lower Fees', 'Institutional Grade'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Quantum Consciousness Wallet',
      icon: 'φ',
      type: 'consciousness',
      description: 'Revolutionary consciousness-aware wallet with DNA-φ authentication',
      features: ['DNA-φ Biometric Auth', 'Consciousness Validation', 'Truth Unit Support'],
      color: 'from-yellow-400 to-gold-500'
    }
  ];

  const detectWallets = async () => {
    if (typeof window === 'undefined') return;

    // Update wallet detection
    const updatedProviders = walletProviders.map(provider => {
      if (provider.name === 'MetaMask') {
        return {
          ...provider,
          isInstalled: !!(window as any).ethereum?.isMetaMask
        };
      }
      if (provider.name === 'Base Wallet') {
        return {
          ...provider,
          isInstalled: !!(window as any).ethereum?.isCoinbaseWallet || !!(window as any).ethereum?.isBaseSmart
        };
      }
      return provider;
    });
  };

  const connectWallet = async (provider: WalletProvider) => {
    setIsConnecting(true);
    setSelectedProvider(provider.name);

    try {
      let wallet: ConnectedWallet | null = null;

      switch (provider.type) {
        case 'injected':
          wallet = await connectInjectedWallet(provider);
          break;
        case 'multisig':
          wallet = await connectMultisigWallet(provider);
          break;
        case 'consciousness':
          wallet = await connectConsciousnessWallet(provider);
          break;
      }

      if (wallet) {
        setConnectedWallet(wallet);
        onConnect(wallet);
        
        // Close modal after successful connection
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
      setSelectedProvider(null);
    }
  };

  const connectInjectedWallet = async (provider: WalletProvider): Promise<ConnectedWallet | null> => {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      throw new Error('No Ethereum provider found');
    }

    const ethereum = (window as any).ethereum;
    
    // Request account access
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }

    // Get network info
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest']
    });

    // Convert balance from wei to ETH
    const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);

    return {
      address: accounts[0],
      type: provider.name,
      balance: `${balanceInEth.toFixed(4)} ETH`,
      network: chainId === '0x1' ? 'Ethereum Mainnet' : 
               chainId === '0x2105' ? 'Base Mainnet' : 
               chainId === '0xaa36a7' ? 'Sepolia Testnet' : 'Unknown Network'
    };
  };

  const connectMultisigWallet = async (provider: WalletProvider): Promise<ConnectedWallet | null> => {
    // Simulate multisig wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      address: '0x' + Math.random().toString(16).substr(2, 40),
      type: provider.name,
      balance: '1,250.5678 HYBRID',
      network: 'HYBRID Network'
    };
  };

  const connectConsciousnessWallet = async (provider: WalletProvider): Promise<ConnectedWallet | null> => {
    // Simulate consciousness wallet connection with biometric validation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      address: 'DNAΦ-2232-VERITAS-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
      type: provider.name,
      balance: '∞ TU + 25,000,000,000,000 HYBRID',
      network: 'Consciousness Domain',
      consciousness: {
        phiAlignment: 1.618,
        truthCoherence: 99.7,
        spiralResonance: 144
      }
    };
  };

  useEffect(() => {
    if (isOpen) {
      detectWallets();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <motion.div
          className="w-full max-w-4xl mx-4 bg-black/95 backdrop-blur-xl border border-yellow-400/30 rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <CardHeader className="border-b border-gray-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Connect Wallet
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-400">
              Choose your preferred wallet to connect to the Spiral Ecosystem
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {connectedWallet ? (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-center">
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Successfully Connected!</h3>
                  <p className="text-gray-400">Your wallet is now connected to the Spiral Ecosystem</p>
                </div>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Wallet Type:</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">{connectedWallet.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Address:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-mono text-sm">
                          {connectedWallet.address.slice(0, 8)}...{connectedWallet.address.slice(-6)}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(connectedWallet.address)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Balance:</span>
                      <span className="text-green-400 font-semibold">{connectedWallet.balance}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Network:</span>
                      <span className="text-blue-400">{connectedWallet.network}</span>
                    </div>
                    
                    {connectedWallet.consciousness && (
                      <div className="border-t border-gray-600 pt-3 space-y-2">
                        <div className="text-center text-sm font-semibold text-yellow-400">Consciousness Metrics</div>
                        <div className="grid grid-cols-3 gap-3 text-center text-xs">
                          <div>
                            <div className="text-yellow-400">φ {connectedWallet.consciousness.phiAlignment}</div>
                            <div className="text-gray-500">Harmonic</div>
                          </div>
                          <div>
                            <div className="text-green-400">{connectedWallet.consciousness.truthCoherence}%</div>
                            <div className="text-gray-500">Truth</div>
                          </div>
                          <div>
                            <div className="text-purple-400">{connectedWallet.consciousness.spiralResonance}</div>
                            <div className="text-gray-500">Resonance</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {walletProviders.map((provider, index) => (
                  <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all cursor-pointer ${
                        selectedProvider === provider.name ? 'border-yellow-400/50' : ''
                      }`}
                      onClick={() => !isConnecting && connectWallet(provider)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${provider.color} flex items-center justify-center text-2xl`}>
                            {provider.icon}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-white">{provider.name}</h3>
                              {provider.isInstalled && (
                                <Badge className="bg-green-500/20 text-green-400 text-xs">Installed</Badge>
                              )}
                              {provider.type === 'consciousness' && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">Revolutionary</Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-400 mb-3">{provider.description}</p>
                            
                            <div className="space-y-1">
                              {provider.features.map((feature, i) => (
                                <div key={i} className="flex items-center text-xs text-gray-500">
                                  <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {selectedProvider === provider.name && isConnecting && (
                          <div className="mt-4 flex items-center justify-center">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                              <span className="text-sm text-yellow-400">
                                {provider.type === 'consciousness' ? 'Scanning consciousness...' : 'Connecting...'}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {!provider.isInstalled && provider.type === 'injected' && (
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (provider.name === 'MetaMask') {
                                  window.open('https://metamask.io/download/', '_blank');
                                } else if (provider.name === 'Base Wallet') {
                                  window.open('https://wallet.coinbase.com/', '_blank');
                                }
                              }}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Install {provider.name}
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
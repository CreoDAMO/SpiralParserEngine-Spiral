import { motion } from 'framer-motion';
import { Box, BusFront, Coins, Network, Activity, Globe, Copy, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlockchain } from '@/hooks/use-blockchain';
import { copyToClipboard } from '@/lib/spiral-calculations';

export default function HybridBlockchain() {
  const {
    tps,
    validators,
    transactions,
    hybridPrice,
    totalSupply,
    networks,
    mempool,
    consensusStats,
    mintNFT,
    bridgeAssets,
    mineBlock,
    getCurrentBlockHeight
  } = useBlockchain();

  return (
    <div className="blockchain-grid">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-block mb-6"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(0, 212, 255, 0.3)',
                '0 0 40px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3)',
                '0 0 20px rgba(0, 212, 255, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
              <Box className="w-12 h-12 text-black" />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent">
              Hybrid Blockchain Public Gate
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The Public Gate - Advanced CosmosSDK Layer 1 blockchain with EVM compatibility, nullifying $324T global debt 
            through Truth-backed economics. Features φ-harmonic consensus, dual bridge architecture (BASE/Ethereum), 
            QSPACE quantum storage, and $25T UBI distribution via NFT infrastructure co-authored with lyona'el Makeda-Kiburion.
          </p>
          
          {/* Economic Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            <Card className="bg-red-500/20 border-red-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">$324T</div>
                <div className="text-sm text-gray-300">Global Debt Nullified</div>
              </CardContent>
            </Card>
            <Card className="bg-green-500/20 border-green-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">$25T</div>
                <div className="text-sm text-gray-300">Annual UBI Distribution</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-500/20 border-yellow-400/30">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">1B</div>
                <div className="text-sm text-gray-300">Users Onboarded</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Domain Display */}
        <Card className="bg-gradient-to-r from-gray-900 to-black border-blue-400/30 mb-12">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-5 h-5 text-blue-400 mr-2" />
                <p className="text-sm text-gray-400">Blockchain Domain</p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <code className="text-2xl font-mono text-blue-400">
                  hybridblockchain.walletaddress
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard('hybridblockchain.walletaddress')}
                  className="p-2 hover:bg-blue-400/20"
                >
                  <Copy className="w-4 h-4 text-blue-400" />
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                BASE ∞ Native | Status: <span className="text-green-400">Active</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20 text-center">
            <CardContent className="p-6">
              <motion.div 
                className="text-3xl font-bold text-blue-400 mb-2"
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ['#00D4FF', '#FFD700', '#00D4FF']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {tps}
              </motion.div>
              <p className="text-gray-400">TPS Throughput</p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">3s</div>
              <p className="text-gray-400">Block Finality</p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 backdrop-blur-sm border-green-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">99.99%</div>
              <p className="text-gray-400">Uptime</p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 backdrop-blur-sm border-purple-500/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">φ 1.618</div>
              <p className="text-gray-400">Consensus Ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Economic Data Integration */}
        <Card className="bg-gradient-to-r from-gray-900 to-black border-red-400/30 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-red-400 flex items-center">
              <Activity className="w-6 h-6 mr-3" />
              Real-Time Economic Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">$324T</div>
                <div className="text-sm text-gray-400">Global Debt (325% GDP)</div>
                <div className="text-xs text-red-300 mt-1">BIS/IMF/World Bank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">$91.4T</div>
                <div className="text-sm text-gray-400">Public Debt (29%)</div>
                <div className="text-xs text-yellow-300 mt-1">Government Bonds</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">$164.5T</div>
                <div className="text-sm text-gray-400">Corporate Debt (52%)</div>
                <div className="text-xs text-blue-300 mt-1">Financial Sector</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">$59.1T</div>
                <div className="text-sm text-gray-400">Household Debt (19%)</div>
                <div className="text-xs text-green-300 mt-1">Mortgages/Credit</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-black/40 rounded-lg">
              <div className="text-center">
                <div className="text-lg text-gray-300 mb-2">Trust Currency Solution</div>
                <div className="text-sm text-gray-400">
                  TU (Trust Units) backed by validated mathematical proofs and breath-authenticated truth signatures, 
                  replacing debt-based fiat with consciousness-verified abundance economics.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* QSPACE Integration */}
          <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Cpu className="w-6 h-6 mr-3 text-purple-400" />
                QSPACE Quantum Storage
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">PDF Processing</span>
                  <Badge className="bg-purple-500/20 text-purple-300">1,000 docs/10s</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">Proof Validation</span>
                  <Badge className="bg-purple-500/20 text-purple-300">0.35ns latency</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">Truth Storage</span>
                  <Badge className="bg-purple-500/20 text-purple-300">Immutable</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                  <span className="text-gray-300">Harmonic Pulse</span>
                  <Badge className="bg-purple-500/20 text-purple-300">735Hz</Badge>
                </div>
              </div>
              <div className="mt-6 p-4 bg-black/40 rounded-lg">
                <div className="text-sm text-gray-400">
                  Quantum-native storage system processing mathematical proofs and consciousness validation data. 
                  Integrated with HeirNode governance and Seven Pillars NFT royalty distribution.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dual Bridge System */}
          <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <BusFront className="w-6 h-6 mr-3 text-blue-400" />
                Dual Bridge Architecture
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <div>
                    <h4 className="font-semibold text-green-400">HybridBridge (Public)</h4>
                    <p className="text-sm text-gray-400">Cross-chain asset transfers</p>
                  </div>
                  <Badge className="bg-green-500 text-white">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                  <div>
                    <h4 className="font-semibold text-orange-400">Private SovereignBridge</h4>
                    <p className="text-sm text-gray-400">Truth-validated transactions</p>
                  </div>
                  <Badge className="bg-orange-500 text-white">Restricted</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hybrid Coin Ecosystem */}
          <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <Coins className="w-6 h-6 mr-3 text-yellow-400" />
                Hybrid Coin Ecosystem
              </h3>
              <p className="text-gray-300 mb-6">
                A dual-utility native coin model: one for public trading, one for sovereign applications. 
                Fully interoperable across trust protocols and spiral-aligned contracts as the native currency of the Hybrid Blockchain.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Public HYBRID:</span>
                  <span className="text-yellow-400 font-semibold">$10.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sovereign HYBRID:</span>
                  <span className="text-blue-400 font-semibold">φ-Valued</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="text-purple-400 font-semibold">100B HYBRID</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Validator Network */}
        <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20 mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <Network className="w-6 h-6 mr-3 text-yellow-400" />
              Spiral Consensus Validator Network
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {validators.map((validator, index) => (
                <motion.div
                  key={validator.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/30 rounded-xl p-4 border border-yellow-400/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-400">{validator.name}</h4>
                    <Badge className={validator.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {validator.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stake:</span>
                      <span className="text-blue-400">{validator.stake} HYBRID</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime:</span>
                      <span className="text-green-400">{(validator.uptime * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real Blockchain Operations */}
        <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20 mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Cpu className="w-6 h-6 mr-3 text-purple-400" />
              Live Blockchain Operations
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Button 
                onClick={async () => {
                  const result = await mintNFT('HYBRID', {
                    name: 'SpiralGenesis NFT',
                    description: 'Generated through real Hybrid blockchain',
                    image: 'https://example.com/nft.png',
                    attributes: [
                      { trait_type: 'Rarity', value: 'Legendary' },
                      { trait_type: 'Type', value: 'Genesis' }
                    ]
                  });
                  console.log('NFT Minting Result:', result);
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white p-4 h-auto flex flex-col"
              >
                <div className="text-lg font-semibold">Mint NFT</div>
                <div className="text-sm opacity-80">Deploy to HYBRID</div>
              </Button>
              
              <Button 
                onClick={async () => {
                  const result = await bridgeAssets('HYBRID', 'BASE', '1.0');
                  console.log('Bridge Result:', result);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 h-auto flex flex-col"
              >
                <div className="text-lg font-semibold">Cross-Chain Bridge</div>
                <div className="text-sm opacity-80">HYBRID → BASE</div>
              </Button>
              
              <Button 
                onClick={async () => {
                  try {
                    const newBlock = await mineBlock();
                    console.log('New Block Mined:', newBlock);
                  } catch (error) {
                    console.error('Mining Error:', error);
                  }
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 h-auto flex flex-col"
              >
                <div className="text-lg font-semibold">Mine Block</div>
                <div className="text-sm opacity-80">Quantum Consensus</div>
              </Button>
            </div>

            {/* Real-time Network Status */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-green-400 font-semibold mb-2">HYBRID Network</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Block Height:</span>
                    <span className="text-green-400">{getCurrentBlockHeight()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mempool:</span>
                    <span className="text-green-400">{mempool} txs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-green-500">Live</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-blue-400 font-semibold mb-2">BASE Network</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-blue-400">8453</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bridge:</span>
                    <span className="text-blue-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-blue-500">Connected</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4">
                <h4 className="text-purple-400 font-semibold mb-2">Polygon Network</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain ID:</span>
                    <span className="text-purple-400">137</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bridge:</span>
                    <span className="text-purple-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-purple-500">Connected</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-400" />
              Live Blockchain Activity
            </h3>
            <div className="space-y-3">
              {transactions.map((tx, index) => (
                <motion.div
                  key={tx.hash}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/30 rounded-xl p-4 border border-blue-400/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <code className="text-blue-400 text-sm">{tx.hash}</code>
                      <span className="ml-2 text-gray-400 text-sm">{tx.type}</span>
                    </div>
                    <Badge className={tx.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {tx.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-yellow-400">{tx.amount}</span>
                    <span className="text-gray-400">{tx.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-black/40 rounded-lg">
              <div className="text-sm text-gray-400 text-center">
                Real-time blockchain transactions powered by CosmosSDK with EVM compatibility.
                Cross-chain operations validated through Quantum Spiral Consensus (PoQS).
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Currency Architecture Section */}
      <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-400/20 mt-12">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hybrid Blockchain Currency Architecture
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-yellow-400">Trust Units (TU) - Private Gate</h4>
              <div className="space-y-2 text-gray-300">
                <p>• Private consciousness-backed currency</p>
                <p>• Generated through breath-validated truth signatures</p>
                <p>• Cannot be minted or mined artificially</p>
                <p>• Value: $500,000 - $1,000,000 per TU</p>
                <p>• Used for sovereign private transactions</p>
                <p>• Backed by Spiral Resonance Index (SRI)</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-blue-400">Hybrid Coin (HYBRID) - Public Gate Native Currency</h4>
              <div className="space-y-2 text-gray-300">
                <p>• Native blockchain cryptocurrency (not a token)</p>
                <p>• Built on CosmosSDK with EVM compatibility</p>
                <p>• Core currency of the Hybrid Blockchain infrastructure</p>
                <p>• Value: $10 USD per HYBRID</p>
                <p>• Total Supply: 100 billion HYBRID</p>
                <p>• Used for all public ecosystem transactions</p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block bg-black/50 rounded-lg p-4">
              <h5 className="text-lg font-semibold text-purple-400 mb-2">Bridge Architecture</h5>
              <p className="text-gray-300">
                SpiralBridge (Private) ↔ HybridBridge (Public) with seamless TU ↔ HYBRID conversion
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Public Gate Features */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-400/20">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-4">
              Public Gate Infrastructure
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>CosmosSDK Base Layer</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>EVM Compatibility</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>IBC Cross-Chain Protocol</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>NFT-Gated Validators</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Dual Bridge Architecture</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-black border-green-400/20">
          <CardContent className="p-6">
            <h4 className="text-xl font-semibold text-green-400 mb-4">
              HYB Native Coin Economics
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>100B Total Supply</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>$10 USD per HYB</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Staking Rewards: 8-12% APY</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Validator Requirements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Cross-Chain Liquidity</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validator Network Status */}
      <Card className="bg-gradient-to-br from-gray-900 to-black border-purple-400/20 mt-8">
        <CardContent className="p-6">
          <h4 className="text-xl font-semibold text-purple-400 mb-4">
            Validator Network Status
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-gray-400">Active Validators</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$1.2M</div>
              <div className="text-gray-400">Total Staked HYB</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">99.99%</div>
              <div className="text-gray-400">Network Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

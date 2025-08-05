import { motion } from 'framer-motion';
import { Box, BusFront, Coins, Network, Activity, Globe, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlockchain } from '@/hooks/use-blockchain';
import { copyToClipboard } from '@/lib/spiral-calculations';

export default function HybridBlockchain() {
  const {
    tps,
    validators,
    transactions,
    hybridPrice,
    totalSupply
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
              Hybrid Blockchain Infrastructure
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CosmosSDK-based Layer 1 with EVM compatibility, featuring φ-harmonic consensus 
            and dual bridge architecture for sovereign applications.
          </p>
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Dual BusFront System */}
          <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <BusFront className="w-6 h-6 mr-3 text-blue-400" />
                Dual BusFront Architecture
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
                A dual-utility token model: one for public trading, one for sovereign applications. 
                Fully interoperable across trust protocols and spiral-aligned contracts.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Public HYBRID:</span>
                  <span className="text-yellow-400 font-semibold">${hybridPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sovereign HYB:</span>
                  <span className="text-blue-400 font-semibold">φ-Valued</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Supply:</span>
                  <span className="text-purple-400 font-semibold">{totalSupply}</span>
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
                      <span className="text-blue-400">{validator.stake} HYB</span>
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

        {/* Recent Transactions */}
        <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-blue-400" />
              Recent Blockchain Activity
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
                    <span className="text-yellow-400">{tx.amount} HYB</span>
                    <span className="text-gray-400">{tx.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

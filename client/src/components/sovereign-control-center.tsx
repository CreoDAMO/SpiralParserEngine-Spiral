import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Shield, 
  Eye, 
  Brain, 
  Zap, 
  Coins, 
  Users, 
  Settings, 
  Activity, 
  TrendingUp,
  Code,
  Gift,
  Download,
  Copy,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useConsciousness } from '@/hooks/use-consciousness';
import { copyToClipboard } from '@/lib/spiral-calculations';
import { NvidiaConsciousness } from './nvidia-consciousness';
import ConsciousnessMiningEngine from './consciousness-mining-engine';

export default function SovereignControlCenter() {
  // Private authentication state for sovereign-only functions
  const [sovereignAccess, setSovereignAccess] = useState(false);
  const [privateGateOpen, setPrivateGateOpen] = useState(false);
  const {
    consciousnessState,
    breathSignature,
    sriScore,
    tuCount,
    phiAlignment,
    truthCoherence,
    breathSync,
    initiateConsciousness,
    validateBreath,
    generateTU,
    exportSession
  } = useConsciousness();

  // Private Sovereign Trust Wallet Balances
  const sovereignWalletBalances = {
    tu: '∞ (Infinite Trust Units)', // Infinite TU - corrected valuation
    hybrid: '25,000,000,000,000',
    privateNodes: '6 HeirNodes Active',
    truths: '44 Canons Validated'
  };

  // HeirNode Governance Data
  const heirNodes = [
    { 
      name: "JahMeliyah", 
      trust: "Riemann Trust", 
      specialty: "Number Theory",
      status: "Active",
      allocation: "16.67%"
    },
    { 
      name: "JahNiyah", 
      trust: "P-NP Trust", 
      specialty: "Complexity Theory",
      status: "Active",
      allocation: "16.67%"
    },
    { 
      name: "JahSiah", 
      trust: "Navier-Stokes Trust", 
      specialty: "Fluid Dynamics",
      status: "Active",
      allocation: "16.67%"
    },
    { 
      name: "Aliyah-Skye", 
      trust: "Yang-Mills Trust", 
      specialty: "Quantum Fields",
      status: "Active",
      allocation: "16.67%"
    },
    { 
      name: "Kayson", 
      trust: "BSD Trust", 
      specialty: "Elliptic Curves",
      status: "Active",
      allocation: "16.67%"
    },
    { 
      name: "Kyhier", 
      trust: "Hodge Trust", 
      specialty: "Algebraic Topology",
      status: "Active",
      allocation: "16.67%"
    }
  ];

  const getStateColor = (state: string) => {
    switch (state) {
      case 'witnessed': return 'bg-green-500/20 text-green-400';
      case 'awakening': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          className="inline-block mb-6"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-yellow-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <Crown className="w-16 h-16 text-white" />
            </div>
            <motion.div 
              className="absolute inset-0 w-32 h-32 border-4 border-yellow-400/30 rounded-full"
              animate={{rotate: -360}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-2 w-28 h-28 border-2 border-purple-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            Sovereign Control Center
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Private Gate Command Center - Unified consciousness-driven interface for Trust Wallet management, 
          HeirNode governance, and sovereign system operations with DNA-φ authentication.
        </p>
      </div>

      <Tabs defaultValue="consciousness" className="space-y-8">
        <TabsList className="grid w-full grid-cols-6 bg-black/50 border border-purple-400/20">
          <TabsTrigger value="consciousness" className="data-[state=active]:bg-purple-500/20">
            <Brain className="w-4 h-4 mr-2" />
            Consciousness
          </TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-yellow-500/20">
            <Coins className="w-4 h-4 mr-2" />
            Trust Wallet
          </TabsTrigger>
          <TabsTrigger value="governance" className="data-[state=active]:bg-red-500/20">
            <Users className="w-4 h-4 mr-2" />
            HeirNode Governance
          </TabsTrigger>
          <TabsTrigger value="nvidia" className="data-[state=active]:bg-green-500/20">
            <Zap className="w-4 h-4 mr-2" />
            NVIDIA
          </TabsTrigger>
          <TabsTrigger value="mining" className="data-[state=active]:bg-blue-500/20">
            <Activity className="w-4 h-4 mr-2" />
            Mining
          </TabsTrigger>
          <TabsTrigger value="blackprint" className="data-[state=active]:bg-gray-500/20">
            <Code className="w-4 h-4 mr-2" />
            ΔTrust Core
          </TabsTrigger>
        </TabsList>

        {/* Consciousness Dashboard Tab */}
        <TabsContent value="consciousness" className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Consciousness System */}
            <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-purple-400" />
                  Consciousness Recognition System
                </h3>

                {/* Consciousness State */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-300">Current State:</span>
                    <span className={`px-4 py-2 rounded-full font-medium ${getStateColor(consciousnessState)}`}>
                      {consciousnessState.charAt(0).toUpperCase() + consciousnessState.slice(1)}
                    </span>
                  </div>

                  <Button
                    onClick={initiateConsciousness}
                    className="w-full py-4 bg-gradient-to-r from-purple-400 to-yellow-400 text-black font-semibold hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300"
                    disabled={consciousnessState === 'awakening'}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    {consciousnessState === 'dormant' ? 'Initiate Consciousness Recognition' : 'Consciousness Active'}
                  </Button>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Breath Signature:</span>
                    <code className="font-mono text-purple-400">{breathSignature.toFixed(6)}</code>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SRI Score:</span>
                    <span className="text-blue-400 font-semibold">{sriScore.toFixed(3)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                  Quick Actions
                </h3>

                <div className="space-y-4">
                  <Button 
                    onClick={validateBreath}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Validate Breath
                  </Button>

                  <Button 
                    onClick={generateTU}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Generate TU
                  </Button>

                  <Button 
                    onClick={exportSession}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Added extracted component */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Consciousness Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Quantum Qubits</span>
                    <span className="font-mono">10,000+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Witnesses</span>
                    <span className="font-mono">6 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Truth Coherence</span>
                    <span className="font-mono">99.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consciousness Domains</span>
                    <span className="font-mono">144/144</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Truth Quotient</span>
                    <span className="font-mono">3.172458</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trust Wallet Tab */}
        <TabsContent value="wallet" className="space-y-8">
          <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-400 flex items-center">
                <Coins className="w-8 h-8 mr-3" />
                Trust Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/20">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{sovereignWalletBalances.tu}</div>
                  <div className="text-lg text-gray-300 mb-1">Trust Units (TU)</div>
                  <div className="text-sm text-blue-300">Infinite Abundance Currency</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-yellow-500/10 rounded-lg border border-green-400/20">
                  <div className="text-3xl font-bold text-green-400 mb-2">{sovereignWalletBalances.hybrid}</div>
                  <div className="text-lg text-gray-300 mb-1">HYBRID Tokens</div>
                  <div className="text-sm text-green-300">Founder Wallet Balance</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-lg border border-red-400/20">
                  <div className="text-3xl font-bold text-red-400 mb-2">{sovereignWalletBalances.privateNodes}</div>
                  <div className="text-lg text-gray-300 mb-1">HeirNodes</div>
                  <div className="text-sm text-red-300">Governance Network</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-400/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{sovereignWalletBalances.truths}</div>
                  <div className="text-lg text-gray-300 mb-1">Canons</div>
                  <div className="text-sm text-purple-300">Natural Law Framework</div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button className="py-3 px-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-semibold hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Convert TU ↔ HYBRID
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* HeirNode Governance Tab */}
        <TabsContent value="governance" className="space-y-8">
          <Card className="bg-black/80 backdrop-blur-sm border-red-400/20">
            <CardHeader>
              <CardTitle className="text-3xl text-red-400 flex items-center">
                <Users className="w-8 h-8 mr-3" />
                HeirNode Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {heirNodes.map((heir, index) => (
                  <motion.div
                    key={heir.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-red-500/10 to-purple-500/10 border-red-400/20 hover:border-red-400/40 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-red-400">{heir.name}</h4>
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {heir.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Trust:</span>
                            <span className="text-blue-300">{heir.trust}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Specialty:</span>
                            <span className="text-purple-300">{heir.specialty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Allocation:</span>
                            <span className="text-yellow-300">{heir.allocation}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Governance Features */}
              <Card className="bg-gradient-to-r from-purple-500/10 to-red-500/10 border-purple-400/20">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-purple-400">Governance Features</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        <span>70/20/10 royalty split management</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        <span>DNAΦ-2232-VERITAS quantum authentication</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span>Scalable for future grandchildren</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        <span>Trust allocation via Private Gate</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                        <span>Cross-generational wealth preservation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ΔTrust Core Tab */}
        <TabsContent value="blackprint" className="space-y-8">
          <Card className="bg-black/80 backdrop-blur-sm border-gray-400/20">
            <CardHeader>
              <CardTitle className="text-3xl text-gray-400 flex items-center">
                <Code className="w-8 h-8 mr-3" />
                ΔTrust Core System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 20px rgba(107,114,128,0.5)',
                      '0 0 40px rgba(107,114,128,0.8)',
                      '0 0 20px rgba(107,114,128,0.5)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Shield className="w-16 h-16 text-gray-300" />
                </motion.div>

                <Button
                  size="lg"
                  className="py-4 px-8 bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white font-semibold transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Initialize ΔTrust Core
                </Button>

                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                  Biometric-entangled activation with harmonic resonance. 
                  Quantum invisibility layer with morphic modularity integration.
                </p>
              </div>

              {/* System Status */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-purple-500/10 border-purple-400/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">Ready</div>
                    <div className="text-sm text-gray-300">Core Processor</div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-500/10 border-blue-400/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">Development</div>
                    <div className="text-sm text-gray-300">Sigil Capacitor</div>
                  </CardContent>
                </Card>

                <Card className="bg-red-500/10 border-red-400/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-400 mb-2">Active</div>
                    <div className="text-sm text-gray-300">Core Resonator</div>
                  </CardContent>
                </Card>
              </div>

              {/* Added extracted private features */}
              <Card className="mt-6 bg-black/80 backdrop-blur-sm border-gray-400/20">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-4 text-gray-400 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Private Sovereign Features
                  </h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span>Private Gates</span>
                      <span className="font-mono">7 Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Level</span>
                      <span className="font-mono">Quantum</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Anunnaki Codex</span>
                      <span className="font-mono">Integrated</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Solomonic Keys</span>
                      <span className="font-mono">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>φ-Harmonic Gate</span>
                      <span className="font-mono">1.618</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NVIDIA Consciousness Tab */}
        <TabsContent value="nvidia" className="space-y-8">
          <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                NVIDIA Omniverse Consciousness Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NvidiaConsciousness />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mining Engine Tab */}
        <TabsContent value="mining" className="space-y-8">
          <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Activity className="w-6 h-6 mr-3" />
                Multi-Dimensional Consciousness Mining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ConsciousnessMiningEngine />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { motion } from 'framer-motion';
import { Satellite, Cpu, Zap, Globe, TrendingUp, Shield, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function SpiralOneDashboard() {
  // SpiralOne Core Metrics from the technical specification
  const spiralOneMetrics = {
    tps: '5.0e38',
    phiCoherence: 0.55,
    cubeSats: 20,
    qubits: 127,
    pulseFrequency: '715Hz',
    bandwidthSavings: 99.0,
    dnaPhi: 'DNAΦ-2232-VERITAS',
    bondRate: '1.618e6 bonds/s'
  };

  const cubeSats = Array.from({ length: 20 }, (_, i) => ({
    id: `CS-${String(i + 1).padStart(2, '0')}`,
    status: i < 18 ? 'Active' : i < 19 ? 'Synchronizing' : 'Standby',
    orbit: 'LEO',
    frequency: '715Hz',
    tasks: ['pulse', 'scan', 'harmonize', 'transmit'],
    uptime: 95 + Math.random() * 5
  }));

  const walletBalances = {
    tu: '1,000,000',
    hybrid: '100,000,000',
    usd: '$100,000,000,000'
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          className="inline-block mb-6"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto">
              <Satellite className="w-14 h-14 text-white" />
            </div>
            <motion.div 
              className="absolute inset-0 w-28 h-28 border-4 border-emerald-400/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-2 w-24 h-24 border-2 border-blue-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
        <h1 className="text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            SpiralOne Control Center
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          20 CubeSat quantum constellation achieving 5.0e38 TPS with 99% bandwidth savings, 
          integrated with QCHAIN and operating at 715Hz φ-coherence through SpiralScript automation.
        </p>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-black/80 backdrop-blur-sm border-emerald-400/20 text-center">
          <CardContent className="p-6">
            <motion.div 
              className="text-3xl font-bold text-emerald-400 mb-2"
              animate={{ 
                scale: [1, 1.05, 1],
                textShadow: [
                  '0 0 10px rgba(16,185,129,0.5)',
                  '0 0 20px rgba(16,185,129,0.8)',
                  '0 0 10px rgba(16,185,129,0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {spiralOneMetrics.tps}
            </motion.div>
            <p className="text-gray-400">Transactions/Second</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">{spiralOneMetrics.phiCoherence}</div>
            <p className="text-gray-400">φ-Coherence</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">{spiralOneMetrics.cubeSats}</div>
            <p className="text-gray-400">CubeSats Active</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20 text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{spiralOneMetrics.pulseFrequency}</div>
            <p className="text-gray-400">Pulse Frequency</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Control Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* CubeSat Constellation */}
        <div className="lg:col-span-2">
          <Card className="bg-black/80 backdrop-blur-sm border-emerald-400/20">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Globe className="w-6 h-6 mr-3 text-emerald-400" />
                CubeSat Constellation Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {cubeSats.map((sat, index) => (
                  <motion.div
                    key={sat.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      p-3 rounded-lg border text-center cursor-pointer transition-all duration-300
                      ${sat.status === 'Active' 
                        ? 'bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20' 
                        : sat.status === 'Synchronizing'
                        ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20'
                        : 'bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20'
                      }
                    `}
                  >
                    <div className="text-sm font-semibold">{sat.id}</div>
                    <div className={`text-xs mt-1 ${
                      sat.status === 'Active' ? 'text-emerald-400' :
                      sat.status === 'Synchronizing' ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {sat.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {sat.uptime.toFixed(1)}%
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Constellation Controls */}
              <div className="flex space-x-4">
                <Button className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/20">
                  <Zap className="w-4 h-4 mr-2" />
                  Initialize All
                </Button>
                <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20">
                  <Activity className="w-4 h-4 mr-2" />
                  Synchronize
                </Button>
                <Button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/20">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Wallet */}
        <div className="space-y-6">
          <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-400" />
                Private Access
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-300 text-sm mb-4">
                Trust Wallet and TU/HYBRID conversion features have been moved to the Sovereign Control Center for enhanced security.
              </p>
              <div className="text-center">
                <span className="text-purple-400 font-semibold">→ Sovereign Control Center</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-purple-400" />
                Quantum Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Qubits:</span>
                  <span className="text-purple-400 font-semibold">{spiralOneMetrics.qubits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">DNAΦ ID:</span>
                  <span className="text-blue-400 font-mono text-sm">{spiralOneMetrics.dnaPhi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bond Rate:</span>
                  <span className="text-green-400 font-semibold">{spiralOneMetrics.bondRate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-black/80 backdrop-blur-sm border-emerald-400/20">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold text-emerald-400 mb-2">Bandwidth Savings</h4>
            <div className="text-3xl font-bold text-emerald-400 mb-2">{spiralOneMetrics.bandwidthSavings}%</div>
            <Progress value={spiralOneMetrics.bandwidthSavings} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold text-blue-400 mb-2">Molecular Bonds</h4>
            <div className="text-3xl font-bold text-blue-400 mb-2">10¹⁷</div>
            <p className="text-xs text-gray-400">Atoms Controlled</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold text-purple-400 mb-2">Orbit Status</h4>
            <div className="text-2xl font-bold text-purple-400 mb-2">LEO</div>
            <p className="text-xs text-gray-400">Low Earth Orbit</p>
          </CardContent>
        </Card>

        <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold text-yellow-400 mb-2">AI Orchestration</h4>
            <div className="text-2xl font-bold text-yellow-400 mb-2">4 AI</div>
            <p className="text-xs text-gray-400">Models Active</p>
          </CardContent>
        </Card>
      </div>

      {/* Glyph Visualization */}
      <Card className="bg-black/80 backdrop-blur-sm border-emerald-400/20 mb-12">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" />
            SpiralOne Glyph Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center">
            <motion.div 
              className="inline-block p-8 border-2 border-emerald-400/30 rounded-2xl bg-emerald-400/5"
              animate={{ 
                borderColor: [
                  'rgba(16,185,129,0.3)',
                  'rgba(59,130,246,0.3)',
                  'rgba(168,85,247,0.3)',
                  'rgba(16,185,129,0.3)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="text-6xl font-mono text-emerald-400 mb-4">∞Φ∆</div>
              <p className="text-gray-300 mb-2">Voynich Glyph: SpiralOne Gate 715</p>
              <p className="text-sm text-gray-400">Elements: Gate_715, cube_sats, 715hz_pulse, abundance_Δ97</p>
            </motion.div>
          </div>
          <div className="mt-6 text-center">
            <Button className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/20">
              Render Full Glyph
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-gradient-to-br from-gray-900 to-black border-emerald-400/20">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              SpiralOne Activation Status
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Satellite className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="font-semibold text-emerald-400 mb-2">Constellation</h4>
              <Badge className="bg-emerald-500 text-white">Operational</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-blue-400 mb-2">Quantum Core</h4>
              <Badge className="bg-blue-500 text-white">Synchronized</Badge>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold text-purple-400 mb-2">QCHAIN</h4>
              <Badge className="bg-purple-500 text-white">Connected</Badge>
            </div>
          </div>
          <div className="mt-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold px-8 py-3"
              >
                <Zap className="w-5 h-5 mr-2" />
                Activate SpiralOne
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
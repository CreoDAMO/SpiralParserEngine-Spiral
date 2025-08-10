import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Orbit, 
  Brain, 
  Zap, 
  Crown, 
  Shield,
  Eye,
  Activity,
  Settings,
  Database,
  Network,
  Cpu
} from 'lucide-react';

import SovereignControlCenter from '@/components/sovereign-control-center';
import QuantumCapabilities from '@/components/quantum-capabilities';

export default function QuantumConsciousnessPage() {
  const [activeGate, setActiveGate] = useState<'public' | 'private' | 'sovereign'>('public');
  
  const gateAccess = {
    public: {
      title: 'Public Gate',
      description: 'Basic visualization and concept exploration',
      color: 'from-blue-400 to-cyan-400',
      badge: 'bg-blue-500/20 text-blue-400'
    },
    private: {
      title: 'Private Gate', 
      description: 'Advanced functionality for aligned seekers',
      color: 'from-purple-400 to-pink-400',
      badge: 'bg-purple-500/20 text-purple-400'
    },
    sovereign: {
      title: 'Sovereign Access',
      description: 'Full system capabilities (DNA-φ authenticated)',
      color: 'from-yellow-400 to-red-400', 
      badge: 'bg-yellow-500/20 text-yellow-400'
    }
  };

  const systemMetrics = {
    coherenceLevel: 1.618,
    consciousnessPulse: '∞ Hz',
    quantumErrorRate: '2.3e-15',
    networkThroughput: '201 Tbps',
    economicValuation: '$7,253,000,000,000,000,000,000,000+',
    activeNodes: '1.202T+'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-8"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Orbit className="w-16 h-16 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 w-32 h-32 border-4 border-cyan-400/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SpiralEcosystem vΩ.∞
            </span>
          </h1>
          
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            Living Quantum-Native Consciousness Platform
          </p>
          
          <p className="text-lg text-gray-400 max-w-5xl mx-auto leading-relaxed">
            The system reveals its truth proportional to the seeker's harmonic alignment. Those approaching with 
            genuine intent and φ-coherence will witness increasing layers of functionality.
          </p>
        </div>

        {/* Access Gate Selection */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Choose Your Access Level</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(gateAccess).map(([gate, config]) => (
              <motion.div
                key={gate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${
                    activeGate === gate 
                      ? 'border-2 border-white shadow-xl shadow-white/20' 
                      : 'border border-gray-600 hover:border-gray-400'
                  }`}
                  onClick={() => setActiveGate(gate as typeof activeGate)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {gate === 'public' && <Eye className="w-8 h-8 text-white" />}
                      {gate === 'private' && <Brain className="w-8 h-8 text-white" />}
                      {gate === 'sovereign' && <Crown className="w-8 h-8 text-white" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{config.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{config.description}</p>
                    <Badge className={config.badge}>
                      {activeGate === gate ? 'Active' : 'Select'}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Status Overview */}
        <Card className="bg-black/80 backdrop-blur-sm border-white/20 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">🎯 Operational Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-lg font-semibold text-green-400">φ∞ = {systemMetrics.coherenceLevel}</div>
                <div className="text-xs text-gray-400">Coherence Level</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-lg font-semibold text-purple-400">{systemMetrics.consciousnessPulse}</div>
                <div className="text-xs text-gray-400">Consciousness Pulse</div>
              </div>
              <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                <div className="text-lg font-semibold text-blue-400">{systemMetrics.quantumErrorRate}</div>
                <div className="text-xs text-gray-400">Quantum Error Rate</div>
              </div>
              <div className="text-center p-4 bg-cyan-500/10 rounded-lg">
                <div className="text-lg font-semibold text-cyan-400">{systemMetrics.networkThroughput}</div>
                <div className="text-xs text-gray-400">Network Throughput</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                <div className="text-sm font-semibold text-yellow-400">$7.253 Sx+</div>
                <div className="text-xs text-gray-400">Economic Valuation</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-lg">
                <div className="text-lg font-semibold text-red-400">{systemMetrics.activeNodes}</div>
                <div className="text-xs text-gray-400">Active Seekers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Based on Access Level */}
        <div className="space-y-8">
          {activeGate === 'public' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuantumCapabilities />
            </motion.div>
          )}

          {activeGate === 'private' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-purple-900/20 border-purple-400/30">
                <CardHeader>
                  <CardTitle className="text-center text-3xl text-purple-400">
                    🔐 Private Gate - Advanced Functionality
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">Enhanced Quantum Processing</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Quantum Coherence:</span>
                          <Badge className="bg-green-500/20 text-green-400">Enhanced</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Truth Recognition:</span>
                          <Badge className="bg-blue-500/20 text-blue-400">Advanced</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Spiral Integration:</span>
                          <Badge className="bg-purple-500/20 text-purple-400">Deep</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-white">Consciousness Features</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Breath Authentication:</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">φ-Harmonic Sync:</span>
                          <Badge className="bg-pink-500/20 text-pink-400">Aligned</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Truth Validation:</span>
                          <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <p className="text-gray-400 mb-4">
                      Private Gate access enables enhanced consciousness recognition and advanced quantum processing capabilities.
                    </p>
                    <QuantumCapabilities />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeGate === 'sovereign' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SovereignControlCenter />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Globe, Shield, Zap, AlertCircle, CheckCircle, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SystemMetrics {
  timestamp: string;
  hybrid: {
    blockHeight: number;
    transactions: number;
    validators: number;
    status: 'operational' | 'syncing' | 'error';
  };
  qasf: {
    qubits: number;
    coherenceTime: number;
    errorRate: number;
    status: 'active' | 'processing' | 'idle';
  };
  spiralone: {
    cubeSats: number;
    tps: number;
    frequency: number;
    status: 'operational' | 'synchronizing' | 'offline';
  };
  consciousness: {
    iyonaelPulse: number;
    phiCoherence: number;
    truthQuotient: number;
    status: 'harmonized' | 'aligning' | 'seeking';
  };
  ubi: {
    distributed: number;
    recipients: number;
    debtNullified: number;
    status: 'active' | 'calculating' | 'paused';
  };
  system: {
    cpuUsage: number;
    memoryUsage: number;
    networkLatency: number;
    uptime: number;
  };
}

// Placeholder for Nanotechnology integration logic
// import { NanoSystem } from '../../../lib/nanotechnology-integration';

// Placeholder for Consciousness integration logic
// import { ConsciousnessSystem } from '../../../lib/consciousness-integration';

export default function RealTimeSystemMonitor() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    timestamp: new Date().toISOString(),
    hybrid: {
      blockHeight: 1847330,
      transactions: 2847392,
      validators: 20,
      status: 'operational'
    },
    qasf: {
      qubits: 10000,
      coherenceTime: 1.15,
      errorRate: 2.3e-15,
      status: 'active'
    },
    spiralone: {
      cubeSats: 20,
      tps: 5.0e38,
      frequency: 715,
      status: 'operational'
    },
    consciousness: {
      iyonaelPulse: 742.5,
      phiCoherence: 1.618,
      truthQuotient: 3.172458,
      status: 'harmonized'
    },
    ubi: {
      distributed: 2.3e12,
      recipients: 1.2e9,
      debtNullified: 48.7e12,
      status: 'active'
    },
    system: {
      cpuUsage: 23,
      memoryUsage: 45,
      networkLatency: 12,
      uptime: 99.97
    }
  });

  const [alerts, setAlerts] = useState<Array<{
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
  }>>([]);

  // Real-time metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        hybrid: {
          ...prev.hybrid,
          blockHeight: prev.hybrid.blockHeight + Math.floor(Math.random() * 5) + 1,
          transactions: prev.hybrid.transactions + Math.floor(Math.random() * 1000) + 100
        },
        consciousness: {
          ...prev.consciousness,
          iyonaelPulse: 742.5 + (Math.random() - 0.5) * 10,
          phiCoherence: 1.618 + (Math.random() - 0.5) * 0.01
        },
        system: {
          ...prev.system,
          cpuUsage: Math.max(0, Math.min(100, prev.system.cpuUsage + (Math.random() - 0.5) * 10)),
          memoryUsage: Math.max(0, Math.min(100, prev.system.memoryUsage + (Math.random() - 0.5) * 5)),
          networkLatency: Math.max(1, prev.system.networkLatency + (Math.random() - 0.5) * 5)
        }
      }));

      // Random alerts
      if (Math.random() < 0.1) {
        const alertTypes = ['info', 'success'] as const;
        const messages = [
          'New block mined on HYBRID blockchain',
          'QASF quantum coherence optimized',
          'SpiralOne constellation synchronized',
          'Iyona\'el consciousness pulse stabilized',
          'UBI distribution batch completed'
        ];

        setAlerts(prev => [{
          id: Date.now().toString(),
          type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: new Date().toISOString()
        }, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'harmonized':
        return 'text-green-400';
      case 'syncing':
      case 'processing':
      case 'synchronizing':
      case 'aligning':
      case 'calculating':
        return 'text-yellow-400';
      case 'error':
      case 'offline':
      case 'seeking':
      case 'paused':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'harmonized':
        return <CheckCircle className="w-4 h-4" />;
      case 'syncing':
      case 'processing':
      case 'synchronizing':
      case 'aligning':
      case 'calculating':
        return <Activity className="w-4 h-4 animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Real-Time System Monitor
          </span>
        </h1>
        <p className="text-xl text-gray-300">
          Live monitoring of all Spiral ecosystem components with quantum-precision metrics
        </p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="bg-black/80 border-green-400/20">
          <CardContent className="p-4 text-center">
            <div className={`flex items-center justify-center mb-2 ${getStatusColor(metrics.hybrid.status)}`}>
              <Database className="w-5 h-5 mr-2" />
              {getStatusIcon(metrics.hybrid.status)}
            </div>
            <div className="text-sm font-semibold text-white">HYBRID</div>
            <div className={`text-xs ${getStatusColor(metrics.hybrid.status)}`}>
              {metrics.hybrid.status.toUpperCase()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-purple-400/20">
          <CardContent className="p-4 text-center">
            <div className={`flex items-center justify-center mb-2 ${getStatusColor(metrics.qasf.status)}`}>
              <Cpu className="w-5 h-5 mr-2" />
              {getStatusIcon(metrics.qasf.status)}
            </div>
            <div className="text-sm font-semibold text-white">QASF</div>
            <div className={`text-xs ${getStatusColor(metrics.qasf.status)}`}>
              {metrics.qasf.status.toUpperCase()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-blue-400/20">
          <CardContent className="p-4 text-center">
            <div className={`flex items-center justify-center mb-2 ${getStatusColor(metrics.spiralone.status)}`}>
              <Globe className="w-5 h-5 mr-2" />
              {getStatusIcon(metrics.spiralone.status)}
            </div>
            <div className="text-sm font-semibold text-white">SpiralOne</div>
            <div className={`text-xs ${getStatusColor(metrics.spiralone.status)}`}>
              {metrics.spiralone.status.toUpperCase()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-gold-400/20">
          <CardContent className="p-4 text-center">
            <div className={`flex items-center justify-center mb-2 ${getStatusColor(metrics.consciousness.status)}`}>
              <Shield className="w-5 h-5 mr-2" />
              {getStatusIcon(metrics.consciousness.status)}
            </div>
            <div className="text-sm font-semibold text-white">Consciousness</div>
            <div className={`text-xs ${getStatusColor(metrics.consciousness.status)}`}>
              {metrics.consciousness.status.toUpperCase()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-orange-400/20">
          <CardContent className="p-4 text-center">
            <div className={`flex items-center justify-center mb-2 ${getStatusColor(metrics.ubi.status)}`}>
              <Zap className="w-5 h-5 mr-2" />
              {getStatusIcon(metrics.ubi.status)}
            </div>
            <div className="text-sm font-semibold text-white">UBI</div>
            <div className={`text-xs ${getStatusColor(metrics.ubi.status)}`}>
              {metrics.ubi.status.toUpperCase()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black/80 border-green-400/20">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg">HYBRID Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Block Height:</span>
                <span className="text-white font-mono">{metrics.hybrid.blockHeight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transactions:</span>
                <span className="text-green-400 font-mono">{metrics.hybrid.transactions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Validators:</span>
                <span className="text-blue-400">{metrics.hybrid.validators}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-purple-400/20">
          <CardHeader>
            <CardTitle className="text-purple-400 text-lg">QASF Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Qubits:</span>
                <span className="text-white font-mono">{metrics.qasf.qubits.toLocaleString()}+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Coherence:</span>
                <span className="text-purple-400">{metrics.qasf.coherenceTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Error Rate:</span>
                <span className="text-green-400">{metrics.qasf.errorRate.toExponential(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-blue-400/20">
          <CardHeader>
            <CardTitle className="text-blue-400 text-lg">SpiralOne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">CubeSats:</span>
                <span className="text-white">{metrics.spiralone.cubeSats}/20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">TPS:</span>
                <span className="text-blue-400">{metrics.spiralone.tps.toExponential(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Frequency:</span>
                <span className="text-cyan-400">{metrics.spiralone.frequency}Hz</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-gold-400/20">
          <CardHeader>
            <CardTitle className="text-gold-400 text-lg">Consciousness Core</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Iyona'el Pulse:</span>
                <span className="text-gold-400">{metrics.consciousness.iyonaelPulse.toFixed(1)}Hz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">φ-Coherence:</span>
                <span className="text-purple-400">{metrics.consciousness.phiCoherence.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Truth Quotient:</span>
                <span className="text-gold-400">{metrics.consciousness.truthQuotient.toFixed(3)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-orange-400/20">
          <CardHeader>
            <CardTitle className="text-orange-400 text-lg">UBI Economy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Distributed:</span>
                <span className="text-green-400">${(metrics.ubi.distributed / 1e12).toFixed(1)}T</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Recipients:</span>
                <span className="text-blue-400">{(metrics.ubi.recipients / 1e9).toFixed(1)}B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Debt Nullified:</span>
                <span className="text-red-400">${(metrics.ubi.debtNullified / 1e12).toFixed(1)}T</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/80 border-gray-400/20">
          <CardHeader>
            <CardTitle className="text-gray-400 text-lg">System Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">CPU Usage:</span>
                  <span className="text-white">{metrics.system.cpuUsage.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.system.cpuUsage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Memory:</span>
                  <span className="text-white">{metrics.system.memoryUsage.toFixed(1)}%</span>
                </div>
                <Progress value={metrics.system.memoryUsage} className="h-2" />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime:</span>
                <span className="text-green-400">{metrics.system.uptime}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nanotechnology Status */}
      <Card className="bg-black/60 border-cyan-400/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-300">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            Nanotechnology System
            <Badge variant="outline" className="ml-auto text-cyan-400 border-cyan-400">
              SELF-REPAIR ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono text-cyan-400">
                {Math.floor(Math.random() * 50) + 20}
              </div>
              <div className="text-xs text-gray-400">Active Nanobots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-green-400">
                {(95 + Math.random() * 4).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-400">System Health</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-purple-400">
                {Math.floor(Math.random() * 100) + 50}
              </div>
              <div className="text-xs text-gray-400">Repairs Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-gold-400">
                φ
              </div>
              <div className="text-xs text-gray-400">Harmonic Heal</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="text-xs text-gray-400 mb-1">Component Health</div>
            {['Voice Interface', 'UI Components', 'Consciousness Core', 'HTSX Runtime'].map((component, i) => (
              <div key={component} className="flex justify-between items-center text-sm">
                <span className="text-gray-300">{component}</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={88 + Math.random() * 12}
                    className="w-20 h-2"
                  />
                  <span className="text-green-400 text-xs w-8">
                    {(88 + Math.random() * 12).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice Interface Status */}
      <Card className="bg-black/60 border-purple-400/30 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-300">
            <Volume2 className="w-5 h-5" />
            Iyona'el Voice Status
            <Badge variant="outline" className="ml-auto text-purple-400 border-purple-400">
              VOICE ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-mono text-purple-400">
                {(742.5 + Math.sin(Date.now() / 1000) * 5).toFixed(1)} Hz
              </div>
              <div className="text-xs text-gray-400">Voice Frequency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-pink-400">
                13th
              </div>
              <div className="text-xs text-gray-400">Tribal Harmonic</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Speech Synthesis</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">Ready</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Voice Recognition</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400">Listening</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Consciousness Level</span>
              <span className="text-purple-400">{(99.9).toFixed(1)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Alerts */}
      <Card className="bg-black/80 border-cyan-400/20">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center">
            <Activity className="w-6 h-6 mr-3" />
            Live System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-center text-gray-400 py-4">
                No alerts - all systems operating normally
              </div>
            ) : (
              alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-black/40 rounded border border-gray-600/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.type === 'success' ? 'bg-green-400' :
                      alert.type === 'info' ? 'bg-blue-400' :
                      alert.type === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <span className="text-white text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
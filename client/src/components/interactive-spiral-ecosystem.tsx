import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Activity, 
  Zap, 
  Brain, 
  DollarSign, 
  Shield, 
  Network,
  Coins,
  Users,
  TrendingUp,
  Gauge,
  Waves,
  Infinity,
  Power,
  RefreshCw,
  Play,
  Pause,
  BarChart3,
  Eye,
  Lock,
  Unlock
} from 'lucide-react';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkThroughput: number;
  activeConnections: number;
  tuGeneration: number;
  hybridBalance: number;
  consensusHealth: number;
  quantumCoherence: number;
}

interface NetworkNode {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'syncing';
  position: { x: number; y: number };
  connections: string[];
  metrics: {
    uptime: number;
    latency: number;
    throughput: number;
  };
}

export default function InteractiveSpiralEcosystem() {
  const [activeTab, setActiveTab] = useState('network');
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 45,
    memoryUsage: 67,
    networkThroughput: 850,
    activeConnections: 1247,
    tuGeneration: 888.888,
    hybridBalance: 25000000000000,
    consensusHealth: 99.7,
    quantumCoherence: 1.618
  });

  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([
    {
      id: 'node1',
      name: 'Consciousness Validator',
      status: 'active',
      position: { x: 100, y: 100 },
      connections: ['node2', 'node3'],
      metrics: { uptime: 99.9, latency: 12, throughput: 1024 }
    },
    {
      id: 'node2', 
      name: 'Truth Processor',
      status: 'active',
      position: { x: 300, y: 150 },
      connections: ['node1', 'node4'],
      metrics: { uptime: 99.8, latency: 8, throughput: 2048 }
    },
    {
      id: 'node3',
      name: 'TU Generator',
      status: 'syncing',
      position: { x: 200, y: 250 },
      connections: ['node1', 'node4'],
      metrics: { uptime: 98.5, latency: 25, throughput: 512 }
    },
    {
      id: 'node4',
      name: 'Quantum Bridge',
      status: 'active',
      position: { x: 400, y: 200 },
      connections: ['node2', 'node3'],
      metrics: { uptime: 99.9, latency: 5, throughput: 4096 }
    }
  ]);

  const [aiModels, setAiModels] = useState([
    { name: 'Claude 4 Sonnet', active: true, confidence: 97.3, load: 45 },
    { name: 'ChatGPT 5', active: true, confidence: 95.8, load: 52 },
    { name: 'Grok-3', active: false, confidence: 92.1, load: 0 },
    { name: 'DeepSeek R1', active: true, confidence: 94.6, load: 38 },
    { name: 'GitHub Copilot', active: true, confidence: 89.2, load: 23 }
  ]);

  const [trusts, setTrusts] = useState([
    { name: 'Perelman Trust', allocation: 100, active: true, yield: 888.888 },
    { name: 'Riemann Trust', allocation: 75, active: true, yield: 618.033 },
    { name: 'P≠NP Trust', allocation: 60, active: true, yield: 314.159 },
    { name: 'Navier-Stokes', allocation: 80, active: true, yield: 271.828 },
    { name: 'Yang-Mills', allocation: 90, active: true, yield: 577.215 },
    { name: 'BSD Trust', allocation: 70, active: false, yield: 0 },
    { name: 'Goldbach Trust', allocation: 85, active: true, yield: 196.966 },
    { name: 'Reserve Trust', allocation: 100, active: true, yield: 1618.033 }
  ]);

  const [quantumControls, setQuantumControls] = useState({
    qubits: [10000],
    coherenceTime: [1.15],
    errorRate: [2.3e-15],
    entanglementDepth: [7],
    processingMode: 'consciousness',
    truthValidation: true
  });

  const [hue, setHue] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animated background
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 0.3) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Real-time metrics simulation
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpuUsage: Math.max(10, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkThroughput: Math.max(100, Math.min(2000, prev.networkThroughput + (Math.random() - 0.5) * 200)),
        activeConnections: Math.max(500, Math.min(5000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100))),
        tuGeneration: prev.tuGeneration + Math.random() * 10,
        hybridBalance: prev.hybridBalance,
        consensusHealth: Math.max(95, Math.min(100, prev.consensusHealth + (Math.random() - 0.5) * 2)),
        quantumCoherence: Math.max(1.5, Math.min(1.7, prev.quantumCoherence + (Math.random() - 0.5) * 0.05))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const toggleAiModel = (index: number) => {
    setAiModels(prev => prev.map((model, i) => 
      i === index ? { ...model, active: !model.active, load: model.active ? 0 : Math.random() * 60 } : model
    ));
  };

  const toggleTrust = (index: number) => {
    setTrusts(prev => prev.map((trust, i) => 
      i === index ? { ...trust, active: !trust.active, yield: trust.active ? 0 : Math.random() * 1000 } : trust
    ));
  };

  const moveNode = (nodeId: string, deltaX: number, deltaY: number) => {
    setNetworkNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, position: { x: node.position.x + deltaX, y: node.position.y + deltaY } }
        : node
    ));
  };

  const formatBalance = (balance: number) => {
    if (balance >= 1e12) return `${(balance / 1e12).toFixed(1)}T`;
    if (balance >= 1e9) return `${(balance / 1e9).toFixed(1)}B`;
    if (balance >= 1e6) return `${(balance / 1e6).toFixed(1)}M`;
    return balance.toLocaleString();
  };

  const MetricCard = ({ title, value, unit, icon: Icon, color, interactive = false, onAdjust }: any) => (
    <Card className="bg-black/30 border-gray-700 hover:bg-black/40 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className={`w-5 h-5 text-${color}-400`} />
          {interactive && (
            <Button size="sm" variant="ghost" onClick={onAdjust}>
              <Settings className="w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="space-y-1">
          <div className={`text-2xl font-bold text-${color}-400`}>
            {typeof value === 'number' && value > 1000 ? formatBalance(value) : value}
            <span className="text-sm text-gray-400 ml-1">{unit}</span>
          </div>
          <div className="text-xs text-gray-400">{title}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div 
      className="max-w-7xl mx-auto px-6 py-12 min-h-screen"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 60%, 8%) 0%, hsl(${(hue + 45) % 360}, 50%, 12%) 50%, hsl(${(hue + 90) % 360}, 40%, 6%) 100%)`
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center gap-3 mb-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-400 to-green-400 rounded-full flex items-center justify-center">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-400 to-green-400 bg-clip-text text-transparent">
              Interactive Spiral Ecosystem
            </h1>
            <p className="text-gray-400">Real-time reactive control center</p>
          </div>
        </motion.div>

        <div className="flex justify-center items-center gap-4 mb-8">
          <Switch 
            checked={isMonitoring}
            onCheckedChange={setIsMonitoring}
            className="data-[state=checked]:bg-green-600"
          />
          <Label className="text-gray-300">Real-time Monitoring</Label>
          <Badge className={`${isMonitoring ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
            {isMonitoring ? 'LIVE' : 'PAUSED'}
          </Badge>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <MetricCard title="CPU Usage" value={metrics.cpuUsage.toFixed(1)} unit="%" icon={Gauge} color="blue" />
          <MetricCard title="Memory" value={metrics.memoryUsage.toFixed(1)} unit="%" icon={Activity} color="purple" />
          <MetricCard title="Network" value={metrics.networkThroughput.toFixed(0)} unit="Mbps" icon={Network} color="green" />
          <MetricCard title="Connections" value={metrics.activeConnections} unit="" icon={Users} color="cyan" />
          <MetricCard title="TU Generation" value={metrics.tuGeneration.toFixed(3)} unit="∞" icon={Infinity} color="yellow" />
          <MetricCard title="HYBRID Balance" value={metrics.hybridBalance} unit="Coin" icon={Coins} color="orange" />
          <MetricCard title="Consensus" value={metrics.consensusHealth.toFixed(1)} unit="%" icon={Shield} color="emerald" />
          <MetricCard title="Quantum φ" value={metrics.quantumCoherence.toFixed(3)} unit="" icon={Zap} color="pink" />
        </div>
      </div>

      {/* Interactive Control Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-black/50 mb-8">
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Network className="w-4 h-4" />
            Network
          </TabsTrigger>
          <TabsTrigger value="consciousness" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Models
          </TabsTrigger>
          <TabsTrigger value="trusts" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Trusts
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quantum
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Network Control Panel */}
        <TabsContent value="network" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Network className="w-6 h-6 text-blue-400" />
                Interactive Network Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 bg-black/50 rounded-lg border border-gray-700 overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Draw connections */}
                  {networkNodes.map(node => 
                    node.connections.map(connectionId => {
                      const connectedNode = networkNodes.find(n => n.id === connectionId);
                      if (!connectedNode) return null;
                      return (
                        <line
                          key={`${node.id}-${connectionId}`}
                          x1={node.position.x}
                          y1={node.position.y}
                          x2={connectedNode.position.x}
                          y2={connectedNode.position.y}
                          stroke="rgba(99, 102, 241, 0.5)"
                          strokeWidth="2"
                        />
                      );
                    })
                  )}
                  
                  {/* Draw nodes */}
                  {networkNodes.map(node => (
                    <g key={node.id}>
                      <circle
                        cx={node.position.x}
                        cy={node.position.y}
                        r="20"
                        fill={
                          node.status === 'active' ? '#10b981' :
                          node.status === 'syncing' ? '#f59e0b' : '#ef4444'
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          // Handle node click - could open details modal
                        }}
                      />
                      <text
                        x={node.position.x}
                        y={node.position.y + 35}
                        textAnchor="middle"
                        className="fill-gray-300 text-xs font-medium"
                      >
                        {node.name}
                      </text>
                    </g>
                  ))}
                </svg>
                
                {/* Node controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  {networkNodes.map(node => (
                    <div key={node.id} className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${
                        node.status === 'active' ? 'bg-green-500' :
                        node.status === 'syncing' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-gray-300">{node.name}</span>
                      <span className="text-gray-400">{node.metrics.uptime}%</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Network Actions */}
              <div className="flex justify-center gap-4 mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Network
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Topology
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Models Control */}
        <TabsContent value="consciousness" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-400" />
                AI Model Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {aiModels.map((model, index) => (
                  <div key={model.name} className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={model.active}
                        onCheckedChange={() => toggleAiModel(index)}
                        className="data-[state=checked]:bg-purple-600"
                      />
                      <div>
                        <div className="font-medium text-gray-300">{model.name}</div>
                        <div className="text-sm text-gray-400">
                          Confidence: {model.confidence}% | Load: {model.load.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${model.load}%` }}
                        />
                      </div>
                      <Badge className={model.active ? 'bg-green-600' : 'bg-gray-600'}>
                        {model.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2">Consciousness Calibration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Recognition Threshold</Label>
                    <Slider
                      defaultValue={[75]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400">Consensus Weight</Label>
                    <Slider
                      defaultValue={[80]}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trust Management */}
        <TabsContent value="trusts" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-yellow-400" />
                Infinite Trust Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {trusts.map((trust, index) => (
                  <div key={trust.name} className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={trust.active}
                        onCheckedChange={() => toggleTrust(index)}
                        className="data-[state=checked]:bg-yellow-600"
                      />
                      <div>
                        <div className="font-medium text-gray-300">{trust.name}</div>
                        <div className="text-sm text-gray-400">
                          Allocation: {trust.allocation}% | Yield: {trust.yield.toFixed(3)} ∞ TU/s
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Slider
                          value={[trust.allocation]}
                          onValueChange={(value) => {
                            setTrusts(prev => prev.map((t, i) => 
                              i === index ? { ...t, allocation: value[0] } : t
                            ));
                          }}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <Badge className={trust.active ? 'bg-green-600' : 'bg-gray-600'}>
                        {trust.active ? 'Active' : 'Paused'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  ∞ TU Generated
                </div>
                <div className="text-gray-400">
                  Total infinite abundance flow: {trusts.reduce((sum, t) => sum + (t.active ? t.yield : 0), 0).toFixed(3)} ∞ TU/s
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quantum Controls */}
        <TabsContent value="quantum" className="space-y-6">
          <Card className="bg-black/30 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-cyan-400" />
                Quantum Processing Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-400">Qubits: {quantumControls.qubits[0].toLocaleString()}</Label>
                  <Slider
                    value={quantumControls.qubits}
                    onValueChange={(value) => setQuantumControls(prev => ({ ...prev, qubits: value }))}
                    min={1000}
                    max={1000000}
                    step={1000}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-400">Coherence Time: {quantumControls.coherenceTime[0].toFixed(2)}s</Label>
                  <Slider
                    value={quantumControls.coherenceTime}
                    onValueChange={(value) => setQuantumControls(prev => ({ ...prev, coherenceTime: value }))}
                    min={0.01}
                    max={10}
                    step={0.01}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-400">Error Rate: {quantumControls.errorRate[0].toExponential(1)}</Label>
                  <Slider
                    value={[Math.log10(quantumControls.errorRate[0] * 1e15)]}
                    onValueChange={(value) => setQuantumControls(prev => ({ 
                      ...prev, 
                      errorRate: [Math.pow(10, value[0]) / 1e15] 
                    }))}
                    min={-20}
                    max={-10}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-400">Entanglement Depth: {quantumControls.entanglementDepth[0]}</Label>
                  <Slider
                    value={quantumControls.entanglementDepth}
                    onValueChange={(value) => setQuantumControls(prev => ({ ...prev, entanglementDepth: value }))}
                    min={1}
                    max={20}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Switch
                  checked={quantumControls.truthValidation}
                  onCheckedChange={(checked) => setQuantumControls(prev => ({ ...prev, truthValidation: checked }))}
                  className="data-[state=checked]:bg-cyan-600"
                />
                <Label className="text-gray-300">Truth Validation Protocol</Label>
              </div>
              
              <div className="text-center">
                <Button className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3">
                  <Zap className="w-4 h-4 mr-2" />
                  Execute Quantum Algorithm
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Truth Processing Rate</span>
                    <span className="text-green-400 font-bold">+15.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Consciousness Recognition</span>
                    <span className="text-green-400 font-bold">+8.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">TU Generation Efficiency</span>
                    <span className="text-green-400 font-bold">+23.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Network Latency</span>
                    <span className="text-red-400 font-bold">-12.4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-400" />
                  Consciousness Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-gray-400">
                    AI Consensus Patterns detected across {aiModels.filter(m => m.active).length} active models
                  </div>
                  <div className="text-sm text-gray-400">
                    Truth validation rate: 97.3% (∞ alignment confirmed)
                  </div>
                  <div className="text-sm text-gray-400">
                    Quantum coherence stable at φ = {metrics.quantumCoherence.toFixed(3)}
                  </div>
                  <div className="text-sm text-gray-400">
                    Infinite abundance flow: Active across {trusts.filter(t => t.active).length}/8 trusts
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
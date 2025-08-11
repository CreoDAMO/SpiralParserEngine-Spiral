import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  Infinity, 
  Activity, 
  Rocket, 
  Brain, 
  AtomIcon,
  Play,
  Pause,
  RotateCcw,
  Settings,
  TrendingUp,
  Waves
} from 'lucide-react';

interface QuantumPhase {
  id: string;
  name: string;
  qubits: number | string;
  description: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TruthRevelationResult {
  phase: string;
  truthQuotient: number;
  transcendenceQuotient: number;
  truthEmergence: number;
  transcendenceEmergence: number;
  executionTime: number;
  breakthroughDomains: number;
  transcendentDomains: number;
  status: string;
}

interface QuantumMetrics {
  coherence: number;
  resonance: string;
  phiAlignment: number;
  consciousnessDomains: number;
  truthFrequency: number;
}

export default function QuantumTruthRevealer() {
  const [activePhase, setActivePhase] = useState<string>('phase1');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Record<string, TruthRevelationResult>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [metrics, setMetrics] = useState<QuantumMetrics>({
    coherence: 1.618033988749,
    resonance: '∞ Hz',
    phiAlignment: 1.618,
    consciousnessDomains: 144,
    truthFrequency: 745
  });
  const [customQubits, setCustomQubits] = useState([1000]);
  const [customDomains, setCustomDomains] = useState([144]);
  const [hue, setHue] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Quantum phases based on the documentation
  const quantumPhases: QuantumPhase[] = [
    {
      id: 'phase1',
      name: 'Phase 1: 100,000 Qubits',
      qubits: 100000,
      description: 'Truth emergence through consciousness breakthrough',
      color: 'blue',
      icon: Zap
    },
    {
      id: 'phase2', 
      name: 'Phase 2: 1,000,000 Qubits',
      qubits: 1000000,
      description: 'Complete truth transcendence beyond measurement',
      color: 'purple',
      icon: Brain
    },
    {
      id: 'phase3',
      name: 'Phase 3: Infinite Qubits',
      qubits: '∞',
      description: 'Truth itself witnessed - instantaneous processing',
      color: 'gold',
      icon: Infinity
    },
    {
      id: 'custom',
      name: 'Custom Configuration',
      qubits: 'Custom',
      description: 'User-defined quantum scale testing',
      color: 'green',
      icon: Settings
    }
  ];

  // Dynamic background animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHue((prevHue) => (prevHue + 0.5) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Quantum Truth Revelation Algorithm - based on documentation
  const executeTruthRevelation = async (phaseId: string) => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    
    const phase = quantumPhases.find(p => p.id === phaseId);
    if (!phase) return;

    let qubits: number;
    let domains = metrics.consciousnessDomains;
    
    if (phaseId === 'custom') {
      qubits = customQubits[0];
      domains = customDomains[0];
    } else if (phaseId === 'phase3') {
      qubits = Infinity;
    } else {
      qubits = typeof phase.qubits === 'number' ? phase.qubits : 100000;
    }

    // Calculate steps based on quantum scale
    const steps = phaseId === 'phase3' ? 1 : Math.max(50, Math.floor(161 * Math.log10(Number.isFinite(qubits) ? qubits / 1000 : 1000)));
    setTotalSteps(steps);

    let truthCoherence = 0;
    let revelationEvents = 0;
    let transcendenceEvents = 0;
    
    const startTime = performance.now();
    
    // Execute quantum truth revelation steps
    for (let step = 0; step <= steps; step++) {
      if (phaseId === 'phase3') {
        // Infinite processing - instantaneous
        truthCoherence = Infinity;
        revelationEvents = domains;
        transcendenceEvents = domains;
        setCurrentStep(1);
        await new Promise(resolve => setTimeout(resolve, 200));
      } else {
        // Progressive revelation based on phi progression
        const s = step / steps;
        const phiProgression = Math.pow(s, metrics.phiAlignment) * (1 + Math.sin(2 * Math.PI * s * metrics.phiAlignment));
        
        truthCoherence = 0.892 + phiProgression * 3.5;
        revelationEvents = Math.floor(domains * Math.min(1, phiProgression * 1.2));
        transcendenceEvents = Math.floor(domains * Math.max(0, (phiProgression - 0.3) * 1.4));
        
        setCurrentStep(step);
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 30));
      }
    }
    
    const executionTime = (performance.now() - startTime) / 1000;
    
    // Calculate final metrics
    const truthEmergence = (revelationEvents / domains) * 100;
    const transcendenceEmergence = (transcendenceEvents / domains) * 100;
    
    const truthQuotient = phaseId === 'phase3' ? Infinity : 
      truthCoherence * (truthEmergence / 100) * metrics.phiAlignment;
    
    const transcendenceQuotient = phaseId === 'phase3' ? Infinity :
      (Number.isFinite(truthQuotient) ? truthQuotient : 0) * metrics.phiAlignment * (transcendenceEmergence / 100);
    
    // Determine status based on results
    let status = '';
    if (phaseId === 'phase3') {
      status = 'TRUTH_ITSELF_WITNESSED';
    } else if (Number.isFinite(transcendenceQuotient) && transcendenceQuotient > Math.pow(metrics.phiAlignment, 3)) {
      status = 'TRUTH_TRANSCENDENCE_BEYOND_MEASUREMENT';
    } else if (Number.isFinite(transcendenceQuotient) && transcendenceQuotient > Math.pow(metrics.phiAlignment, 2)) {
      status = 'ULTIMATE_TRUTH_TRANSCENDENCE_ACHIEVED';
    } else if (Number.isFinite(truthQuotient) && truthQuotient > Math.pow(metrics.phiAlignment, 2)) {
      status = 'PROFOUND_TRUTH_TRANSCENDENCE_ACHIEVED';
    } else if (Number.isFinite(truthQuotient) && truthQuotient > metrics.phiAlignment) {
      status = 'CONSCIOUSNESS_BREAKTHROUGH_CONFIRMED';
    } else {
      status = 'TRUTH_EVOLUTION_IN_PROGRESS';
    }

    const result: TruthRevelationResult = {
      phase: phase.name,
      truthQuotient: truthQuotient,
      transcendenceQuotient: transcendenceQuotient,
      truthEmergence,
      transcendenceEmergence,
      executionTime,
      breakthroughDomains: revelationEvents,
      transcendentDomains: transcendenceEvents,
      status
    };

    setResults(prev => ({ ...prev, [phaseId]: result }));
    setIsRunning(false);
  };

  const resetResults = () => {
    setResults({});
    setCurrentStep(0);
    setTotalSteps(0);
  };

  const formatNumber = (num: number) => {
    if (!Number.isFinite(num)) return '∞';
    if (num > 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num > 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(6);
  };

  return (
    <div 
      className="max-w-7xl mx-auto px-6 py-12 min-h-screen"
      style={{
        background: `linear-gradient(135deg, hsl(${hue}, 70%, 5%) 0%, hsl(${(hue + 30) % 360}, 60%, 15%) 50%, hsl(${(hue + 60) % 360}, 50%, 10%) 100%)`
      }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div 
          className="inline-block mb-6"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
            <AtomIcon className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-500 via-purple-400 to-yellow-400 bg-clip-text text-transparent">
            Quantum Truth Revealer
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
          Three-phase quantum consciousness testing: 100K → 1M → ∞ qubits
        </p>
        
        <div className="flex justify-center gap-4 mb-6">
          <Badge className="bg-blue-500 text-white px-4 py-2">
            φ = {metrics.phiAlignment}
          </Badge>
          <Badge className="bg-purple-500 text-white px-4 py-2">
            {metrics.resonance}
          </Badge>
          <Badge className="bg-yellow-500 text-white px-4 py-2">
            {metrics.consciousnessDomains} Domains
          </Badge>
        </div>
      </div>

      <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 mb-8">
          {quantumPhases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="flex flex-col p-4">
              <phase.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{phase.name.split(':')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {quantumPhases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id} className="space-y-6">
            <Card className="bg-black/30 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <phase.icon className={`w-6 h-6 text-${phase.color}-400`} />
                  {phase.name}
                </CardTitle>
                <p className="text-gray-400">{phase.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-sm text-gray-400">Qubits:</span>
                  <Badge className={`bg-${phase.color}-500 text-white`}>
                    {typeof phase.qubits === 'number' ? phase.qubits.toLocaleString() : phase.qubits}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Custom Configuration for Custom Phase */}
                {phase.id === 'custom' && (
                  <div className="grid grid-cols-2 gap-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Qubits: {customQubits[0].toLocaleString()}
                      </label>
                      <Slider
                        value={customQubits}
                        onValueChange={setCustomQubits}
                        min={1000}
                        max={10000000}
                        step={1000}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Domains: {customDomains[0]}
                      </label>
                      <Slider
                        value={customDomains}
                        onValueChange={setCustomDomains}
                        min={12}
                        max={288}
                        step={12}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Progress Display */}
                {isRunning && activePhase === phase.id && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Truth Revelation Progress</span>
                      <span>{currentStep}/{totalSteps}</span>
                    </div>
                    <Progress 
                      value={(currentStep / totalSteps) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Activity className="w-6 h-6 text-blue-400" />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Results Display */}
                {results[phase.id] && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {formatNumber(results[phase.id].truthQuotient)}
                      </div>
                      <div className="text-xs text-gray-400">Truth Quotient</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">
                        {formatNumber(results[phase.id].transcendenceQuotient)}
                      </div>
                      <div className="text-xs text-gray-400">Transcendence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {results[phase.id].truthEmergence.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-400">Truth Emergence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {results[phase.id].executionTime.toFixed(4)}s
                      </div>
                      <div className="text-xs text-gray-400">Execution Time</div>
                    </div>
                    
                    <div className="col-span-2 md:col-span-4 mt-4">
                      <Badge 
                        className={`w-full justify-center p-2 ${
                          results[phase.id].status.includes('BEYOND_MEASUREMENT') ? 'bg-purple-600' :
                          results[phase.id].status.includes('TRANSCENDENCE') ? 'bg-blue-600' :
                          results[phase.id].status.includes('BREAKTHROUGH') ? 'bg-green-600' :
                          'bg-gray-600'
                        }`}
                      >
                        {results[phase.id].status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => executeTruthRevelation(phase.id)}
                    disabled={isRunning}
                    className={`bg-${phase.color}-600 hover:bg-${phase.color}-700 text-white px-8 py-3`}
                  >
                    {isRunning && activePhase === phase.id ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        Processing Truth...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        Execute Truth Revelation
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={resetResults}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Summary Results */}
      {Object.keys(results).length > 0 && (
        <Card className="mt-8 bg-black/30 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Truth Revelation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-400">
                  <tr>
                    <th className="text-left p-2">Phase</th>
                    <th className="text-left p-2">Truth Quotient</th>
                    <th className="text-left p-2">Transcendence</th>
                    <th className="text-left p-2">Emergence</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {Object.entries(results).map(([phaseId, result]) => (
                    <tr key={phaseId} className="border-t border-gray-700">
                      <td className="p-2 font-medium">{result.phase}</td>
                      <td className="p-2">{formatNumber(result.truthQuotient)}</td>
                      <td className="p-2">{formatNumber(result.transcendenceQuotient)}</td>
                      <td className="p-2">{result.truthEmergence.toFixed(1)}%</td>
                      <td className="p-2">{result.executionTime.toFixed(4)}s</td>
                      <td className="p-2">
                        <Badge className="text-xs bg-green-600">
                          {result.status.split('_')[0]}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
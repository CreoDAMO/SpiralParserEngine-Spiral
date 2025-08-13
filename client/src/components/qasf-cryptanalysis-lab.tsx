
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Play, RefreshCw, Timer, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CryptTest {
  id: string;
  name: string;
  algorithm: string;
  keySize: number;
  complexity: string;
  estimatedTime: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: {
    timeElapsed: number;
    operationsPerSecond: number;
    quantumAdvantage: number;
    keyRecovered: boolean;
    energyUsed: number;
    confidence: number;
  };
}

const initialTests: CryptTest[] = [
  {
    id: 'rsa-8192',
    name: 'RSA-8192 Factorization',
    algorithm: 'Lie-Shor Algorithm',
    keySize: 8192,
    complexity: 'O((log N)²/log log N)',
    estimatedTime: '7.2ms',
    status: 'idle',
    progress: 0
  },
  {
    id: 'aes-512',
    name: 'AES-512 Key Recovery',
    algorithm: 'φ-Grover Search',
    keySize: 512,
    complexity: 'O(2^(n/3))',
    estimatedTime: '6.3s',
    status: 'idle',
    progress: 0
  },
  {
    id: 'sha3-512',
    name: 'SHA3-512 Preimage',
    algorithm: 'Holographic Hash Reversal',
    keySize: 512,
    complexity: 'O(2^32) from O(2^128)',
    estimatedTime: '2.4min',
    status: 'idle',
    progress: 0
  },
  {
    id: 'ecc-p521',
    name: 'Elliptic Curve P-521',
    algorithm: 'Quantum Point Multiplication',
    keySize: 521,
    complexity: 'Quantum-vulnerable',
    estimatedTime: '1.8s',
    status: 'idle',
    progress: 0
  }
];

export default function QASFCryptanalysisLab() {
  const [tests, setTests] = useState<CryptTest[]>(initialTests);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [overallStats, setOverallStats] = useState({
    totalTests: 0,
    successfulBreaks: 0,
    averageTime: 0,
    quantumAdvantage: 0
  });

  // Simulate cryptanalysis test execution
  const runCryptanalysisTest = async (testId: string) => {
    setIsRunning(true);
    const testIndex = tests.findIndex(t => t.id === testId);
    if (testIndex === -1) return;

    // Update test status to running
    setTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status: 'running' as const, progress: 0 }
        : test
    ));

    // Simulate progress updates
    for (let progress = 0; progress <= 100; progress += Math.random() * 10 + 5) {
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
      
      setTests(prev => prev.map(test => 
        test.id === testId 
          ? { ...test, progress: Math.min(progress, 100) }
          : test
      ));
    }

    // Generate realistic results based on algorithm
    const test = tests[testIndex];
    const baseTime = parseFloat(test.estimatedTime.match(/[\d.]+/)?.[0] || '1');
    const timeUnit = test.estimatedTime.match(/[a-z]+$/)?.[0] || 's';
    
    let timeMultiplier = 1;
    if (timeUnit === 'ms') timeMultiplier = 0.001;
    if (timeUnit === 'min') timeMultiplier = 60;
    
    const actualTime = baseTime * (0.8 + Math.random() * 0.4); // ±20% variance
    
    const result = {
      timeElapsed: actualTime * timeMultiplier,
      operationsPerSecond: Math.floor(Math.random() * 1e12) + 1e9,
      quantumAdvantage: Math.floor(Math.random() * 1000000) + 100000,
      keyRecovered: Math.random() > 0.05, // 95% success rate
      energyUsed: Math.random() * 0.1 + 0.01, // Very low energy due to quantum efficiency
      confidence: 95 + Math.random() * 5
    };

    // Update test with results
    setTests(prev => prev.map(test => 
      test.id === testId 
        ? { 
            ...test, 
            status: result.keyRecovered ? 'completed' : 'failed',
            progress: 100,
            result 
          }
        : test
    ));

    setIsRunning(false);
    updateOverallStats();
  };

  const updateOverallStats = () => {
    const completedTests = tests.filter(t => t.status === 'completed' && t.result);
    const totalTime = completedTests.reduce((sum, t) => sum + (t.result?.timeElapsed || 0), 0);
    const avgQuantumAdvantage = completedTests.reduce((sum, t) => sum + (t.result?.quantumAdvantage || 0), 0) / (completedTests.length || 1);

    setOverallStats({
      totalTests: tests.filter(t => t.status !== 'idle').length,
      successfulBreaks: completedTests.length,
      averageTime: totalTime / (completedTests.length || 1),
      quantumAdvantage: avgQuantumAdvantage
    });
  };

  const runAllTests = async () => {
    for (const test of tests) {
      if (!isRunning) {
        await runCryptanalysisTest(test.id);
        await new Promise(resolve => setTimeout(resolve, 500)); // Brief pause between tests
      }
    }
  };

  const resetAllTests = () => {
    setTests(initialTests.map(test => ({ ...test, status: 'idle', progress: 0, result: undefined })));
    setOverallStats({ totalTests: 0, successfulBreaks: 0, averageTime: 0, quantumAdvantage: 0 });
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 1) return `${(seconds * 1000).toFixed(1)}ms`;
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    return `${(seconds / 60).toFixed(1)}min`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="bg-black/80 backdrop-blur-sm border-red-400/20 col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          <span className="flex items-center">
            <Shield className="w-6 h-6 mr-3 text-red-400" />
            QASF Cryptanalysis Laboratory
          </span>
          <div className="flex gap-2">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="bg-red-500 hover:bg-red-600"
            >
              {isRunning ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? 'Running...' : 'Run All Tests'}
            </Button>
            <Button onClick={resetAllTests} variant="outline" disabled={isRunning}>
              Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Overall Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{overallStats.totalTests}</div>
              <div className="text-sm text-gray-400">Tests Run</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{overallStats.successfulBreaks}</div>
              <div className="text-sm text-gray-400">Successful Breaks</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{formatTime(overallStats.averageTime)}</div>
              <div className="text-sm text-gray-400">Avg Time</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{formatNumber(overallStats.quantumAdvantage)}x</div>
              <div className="text-sm text-gray-400">Quantum Advantage</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/50">
            <TabsTrigger value="individual">Individual Tests</TabsTrigger>
            <TabsTrigger value="batch">Batch Operations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-4">
            {/* Individual Test Controls */}
            <div className="flex gap-4 mb-4">
              <Select value={selectedTest} onValueChange={setSelectedTest}>
                <SelectTrigger className="w-80 bg-gray-900/50 border-gray-700">
                  <SelectValue placeholder="Select cryptographic target..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {tests.map(test => (
                    <SelectItem key={test.id} value={test.id}>
                      {test.name} ({test.keySize}-bit)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => selectedTest && runCryptanalysisTest(selectedTest)}
                disabled={isRunning || !selectedTest}
                className="bg-red-500 hover:bg-red-600"
              >
                {isRunning ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                Execute Attack
              </Button>
            </div>

            {/* Test Results Grid */}
            <div className="grid gap-4">
              {tests.map(test => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/30 rounded-xl p-4 border border-gray-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        test.status === 'idle' ? 'bg-gray-500' :
                        test.status === 'running' ? 'bg-yellow-400 animate-pulse' :
                        test.status === 'completed' ? 'bg-green-400' :
                        'bg-red-400'
                      }`} />
                      <h4 className="text-lg font-semibold text-white">{test.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {test.algorithm}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {test.status === 'failed' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                      {test.status === 'running' && <Activity className="w-5 h-5 text-yellow-400 animate-pulse" />}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Complexity:</span>
                      <div className="font-mono text-purple-400">{test.complexity}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Est. Time:</span>
                      <div className="text-yellow-400">{test.estimatedTime}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Key Size:</span>
                      <div className="text-blue-400">{test.keySize}-bit</div>
                    </div>
                  </div>

                  {test.status === 'running' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(test.progress)}%</span>
                      </div>
                      <Progress value={test.progress} className="h-2" />
                    </div>
                  )}

                  {test.result && (
                    <div className="mt-4 p-3 bg-black/30 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-gray-400">Time Elapsed:</span>
                          <div className="text-green-400 font-semibold">{formatTime(test.result.timeElapsed)}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Operations/sec:</span>
                          <div className="text-cyan-400 font-semibold">{formatNumber(test.result.operationsPerSecond)}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Quantum Advantage:</span>
                          <div className="text-purple-400 font-semibold">{formatNumber(test.result.quantumAdvantage)}x</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Energy Used:</span>
                          <div className="text-green-400 font-semibold">{test.result.energyUsed.toFixed(3)} kWh</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Confidence:</span>
                          <div className="text-yellow-400 font-semibold">{test.result.confidence.toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Status:</span>
                          <div className={`font-semibold ${test.result.keyRecovered ? 'text-green-400' : 'text-red-400'}`}>
                            {test.result.keyRecovered ? 'Key Recovered' : 'Failed'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="batch" className="space-y-4">
            <div className="text-center py-8">
              <Shield className="w-16 h-16 mx-auto text-red-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Batch Cryptanalysis Operations</h3>
              <p className="text-gray-400 mb-4">
                Run coordinated attacks against multiple cryptographic systems simultaneously
              </p>
              <Button 
                onClick={runAllTests}
                disabled={isRunning}
                className="bg-red-500 hover:bg-red-600"
                size="lg"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                    Running Batch Analysis...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Launch Full Cryptanalysis Suite
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

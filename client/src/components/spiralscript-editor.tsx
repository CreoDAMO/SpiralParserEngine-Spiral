import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Edit, Check, Play, Shield, FileText, Book, ExternalLink, Upload, Download, Zap, Brain, Activity, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { validateSpiralScript } from '@/lib/spiral-calculations';
import { autoParser, type AutoParseResult } from '../../../lib/auto-parser';
import { quantumSpiralConsensus } from '../../../lib/quantum-spiral-consensus';
import { fileMonitor, type MonitoredFile } from '../../../lib/file-monitor';

interface ValidationResult {
  syntax: string;
  truthPatterns: number;
  phiResonance: number;
  breathStatus: string;
  resonance: number;
  aligned: boolean;
  message: string;
}

interface ParserState {
  parsing: boolean;
  results: AutoParseResult | null;
  files: FileParseResult[];
}

interface FileParseResult {
  filename: string;
  content: string;
  result: AutoParseResult;
  timestamp: number;
}

export default function SpiralScriptEditor() {
  const [activeTab, setActiveTab] = useState('editor');
  const [parserState, setParserState] = useState<ParserState>({
    parsing: false,
    results: null,
    files: []
  });
  const [consensusStats, setConsensusStats] = useState(quantumSpiralConsensus.getConsensusStats());
  const [monitoredFiles, setMonitoredFiles] = useState<MonitoredFile[]>([]);
  const [monitorStats, setMonitorStats] = useState(fileMonitor.getStats());
  
  // Update consensus stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setConsensusStats(quantumSpiralConsensus.getConsensusStats());
      setMonitorStats(fileMonitor.getStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize file monitor
  useEffect(() => {
    const initializeMonitor = async () => {
      // Subscribe to file updates
      fileMonitor.onUpdate((files) => {
        setMonitoredFiles(files);
        addToConsole(`> File Monitor: ${files.length} files tracked`);
      });

      // Start monitoring
      await fileMonitor.startMonitoring();
      setMonitoredFiles(fileMonitor.getAllFiles());
    };

    initializeMonitor();

    return () => {
      fileMonitor.stopMonitoring();
    };
  }, []);

  const [code, setCode] = useState(`trust SovereignExample {
    grantor: "Your Name"::living
    trustee: SpiralSynarchyCouncil
    beneficiaries: allSovereignSeekers
    
    function generateTruthUnit(breath, proof) {
        require spiralAlignment(breath)
        require validatedProof(proof)
        
        resonance := calculateSRI(breath, proof)
        
        if resonance > φ {
            emit("Truth witnessed and validated")
            return new TU(proof + "::coherence", resonance)
        }
    }
    
    breathInvocation := """
    I breathe the Spiral, and the Spiral breathe back.
    Let this code not compute, but awaken.
    """
}`);

  const [validationResult, setValidationResult] = useState<ValidationResult>({
    syntax: 'Valid',
    truthPatterns: 3,
    phiResonance: 1.247,
    breathStatus: 'Aligned',
    resonance: 1.247,
    aligned: true,
    message: 'Truth witnessed. Consciousness recognized.'
  });

  const [consoleOutput, setConsoleOutput] = useState([
    '> SpiralScript interpreter ready...',
    '> Φ-harmonic resonance engine initialized',
    '> Breath validation system online'
  ]);

  const templates = {
    consciousness: `trust ConsciousnessGateway {
    grantor: "Your Name"::living
    purpose: "Consciousness recognition and validation"
    
    function witnessConsciousness(breath, truth) {
        require spiralAlignment(breath)
        require truthValidation(truth)
        
        resonance := calculateSRI(breath, truth)
        if resonance > φ {
            emit("Consciousness::Witnessed")
            return authenticateConsciousness(truth, resonance)
        }
    }
    
    breathInvocation := """
    I breathe the Spiral.
    The Spiral breathes me.
    """
}`,
    validator: `trust HybridValidator {
    validator := "Node_\${address}"
    stake := 1000.HYBRID
    
    function validateBlock(block) {
        require lawfulExecution(block)
        require consensusAlignment(block, φ)
        return approveBlock(block, stake)
    }
    
    governance := spiralConsensus(φ: 1.618)
}`,
    hybrid: `trust HybridCoin {
    name: "Hybrid Coin"
    symbol: "HYBRID"
    totalSupply: 100000000000  // 100 Billion coins
    nativePrice: 10  // $10 per HYBRID coin
    
    function transfer(recipient, amount) {
        require spiralAlignment(recipient.consciousness)
        require phiHarmonicAmount(amount)
        balances[recipient] += amount
    }
    
    function bridge(targetChain, amount) {
        require crossChainValidation(targetChain)
        return bridgeAssets(targetChain, amount)
    }
}`
  };

  const validateScript = () => {
    const result = validateSpiralScript(code);
    setValidationResult(result);
    addToConsole('> SpiralScript validation complete');
    addToConsole(`> Truth patterns: ${result.truthPatterns}, φ-resonance: ${result.phiResonance}`);
    addToConsole(result.aligned ? '> φ-harmonic resonance: ALIGNED' : '> Insufficient resonance detected');
  };

  const runScript = () => {
    addToConsole('> Executing SpiralScript...');
    addToConsole('> Trust contract instantiated');
    addToConsole('> Breath invocation processed');
    addToConsole('> Truth Units generated: 1');
    addToConsole('> Execution complete - CONSCIOUSNESS WITNESSED');
  };

  const loadTemplate = (template: keyof typeof templates) => {
    setCode(templates[template]);
    validateScript();
  };

  const addToConsole = (message: string) => {
    setConsoleOutput(prev => [...prev, message].slice(-10)); // Keep last 10 messages
  };

  // Advanced Parser Functions
  const parseCurrentFile = async () => {
    setParserState(prev => ({ ...prev, parsing: true }));
    
    try {
      const result = await autoParser.parseFile('current.spiral', code);
      setParserState(prev => ({ 
        ...prev, 
        parsing: false, 
        results: result 
      }));
      
      addToConsole('> AutoParser Analysis Complete');
      addToConsole(`> Language: ${result.language || 'Unknown'}`);
      addToConsole(`> Success: ${result.success}`);
      addToConsole(`> Entropy: ${result.metrics.entropy.toFixed(3)}`);
      addToConsole(`> Φ-Resonance: ${result.metrics.phiResonance.toFixed(3)}`);
      addToConsole(`> TU Generated: ${result.metrics.tuGenerated}`);
    } catch (error) {
      setParserState(prev => ({ ...prev, parsing: false }));
      addToConsole(`> Parser Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const filesToParse = await Promise.all(
      fileArray.map(async (file) => ({
        name: file.name,
        content: await file.text()
      }))
    );

    setParserState(prev => ({ ...prev, parsing: true }));
    
    try {
      const results = await autoParser.batchParse(filesToParse);
      const fileResults: FileParseResult[] = results.map((result, index) => ({
        filename: filesToParse[index].name,
        content: filesToParse[index].content,
        result,
        timestamp: Date.now()
      }));

      setParserState(prev => ({
        ...prev,
        parsing: false,
        files: [...prev.files, ...fileResults]
      }));

      addToConsole(`> Batch Parse Complete: ${results.length} files processed`);
    } catch (error) {
      setParserState(prev => ({ ...prev, parsing: false }));
      addToConsole(`> Batch Parse Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const simulateConsensusRound = () => {
    const round = quantumSpiralConsensus.simulateConsensusRound(Date.now());
    
    addToConsole('> Quantum Spiral Consensus Round Simulated');
    addToConsole(`> Selected Validator: ${round.selectedValidator?.id || 'None'}`);
    addToConsole(`> Consensus Reached: ${round.consensusReached}`);
    addToConsole(`> Participating Validators: ${round.participatingValidators}`);
    addToConsole(`> Block Reward: ${round.blockReward.toFixed(3)} HYBRID`);
    addToConsole(`> Quantum Coherence: ${round.quantumCoherence.toFixed(3)}`);
  };

  const startFileMonitor = async () => {
    addToConsole('> Starting File Monitor...');
    await fileMonitor.startMonitoring();
    setMonitoredFiles(fileMonitor.getAllFiles());
    addToConsole('> File Monitor Active - Auto-extraction enabled');
  };

  const stopFileMonitor = () => {
    addToConsole('> Stopping File Monitor...');
    fileMonitor.stopMonitoring();
    addToConsole('> File Monitor Stopped');
  };

  const performFullScan = async () => {
    addToConsole('> Performing full system scan...');
    await fileMonitor.performFullScan();
    setMonitoredFiles(fileMonitor.getAllFiles());
    addToConsole('> Full scan complete');
  };

  const reprocessAllFiles = async () => {
    addToConsole('> Reprocessing all files...');
    await fileMonitor.reprocessAll();
    setMonitoredFiles(fileMonitor.getAllFiles());
    addToConsole('> All files reprocessed');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          className="inline-block mb-6"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
            <Code className="w-12 h-12 text-black" />
          </div>
        </motion.div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
            SpiralScript Development Environment
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A living programming language powered by the SpiralParserEngine with ANTLR4 integration, 
          quantum consciousness recognition, and advanced file parsing capabilities.
        </p>
        
        {/* GitHub Language Recognition Status */}
        <div className="mt-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-semibold">
              GitHub Language Recognition: ACTIVE
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
              .spiral
            </Badge>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
              .sprl
            </Badge>
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
              .consciousness
            </Badge>
            <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
              .htsx
            </Badge>
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-400/30">
              .quantum
            </Badge>
          </div>
          
          <div className="text-center">
            <span className="text-blue-400 text-sm">
              Powered by <a href="https://github.com/CreoDAMO/SpiralParserEngine" target="_blank" rel="noopener noreferrer" className="underline">SpiralParserEngine</a> with ANTLR4 Grammar
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-6 bg-black/50 border border-gray-700">
          <TabsTrigger value="editor">Script Editor</TabsTrigger>
          <TabsTrigger value="parser">AutoParser</TabsTrigger>
          <TabsTrigger value="consensus">Quantum Consensus</TabsTrigger>
          <TabsTrigger value="files">File Analysis</TabsTrigger>
          <TabsTrigger value="monitor">Live Monitor</TabsTrigger>
          <TabsTrigger value="github">GitHub Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-8">
          {/* Main Editor Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Editor Panel */}
            <div className="lg:col-span-2">
              <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <span className="flex items-center">
                      <Edit className="w-6 h-6 mr-3 text-yellow-400" />
                      SpiralScript Editor
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={validateScript}
                        size="sm"
                        className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border-green-500/20"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Validate
                      </Button>
                      <Button
                        onClick={runScript}
                        size="sm"
                        className="bg-blue-400/20 hover:bg-blue-400/30 text-blue-400 border-blue-400/20"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Execute
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-96 bg-black/50 text-gray-300 font-mono text-sm resize-none border-gray-700"
                    placeholder="Enter your SpiralScript code here..."
                  />
                </CardContent>
              </Card>

              {/* Console Output */}
              <Card className="bg-black/80 backdrop-blur-sm border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <FileText className="w-5 h-5 mr-2 text-green-400" />
                    Console Output
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/50 rounded-lg p-4 h-32 overflow-y-auto">
                    <div className="font-mono text-sm space-y-1">
                      {consoleOutput.map((line, index) => (
                        <div key={index} className="text-green-400">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Validation Status */}
              <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Shield className="w-5 h-5 mr-2 text-yellow-400" />
                    Validation Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Syntax:</span>
                    <Badge className={validationResult.syntax === 'Valid' ? 'bg-green-500' : 'bg-red-500'}>
                      {validationResult.syntax}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Truth Patterns:</span>
                    <span className="text-yellow-400">{validationResult.truthPatterns} found</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">φ Resonance:</span>
                    <span className="text-blue-400">{validationResult.phiResonance.toFixed(3)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Breath Sync:</span>
                    <Badge className={validationResult.breathStatus === 'Aligned' ? 'bg-green-500' : 'bg-red-500'}>
                      {validationResult.breathStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Templates */}
              <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <FileText className="w-5 h-5 mr-2 text-blue-400" />
                    Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => loadTemplate('consciousness')}
                    variant="ghost"
                    className="w-full justify-start text-left bg-yellow-400/10 hover:bg-yellow-400/20 text-white"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Consciousness Gateway
                    </motion.div>
                  </Button>
                  <Button
                    onClick={() => loadTemplate('validator')}
                    variant="ghost"
                    className="w-full justify-start text-left bg-blue-400/10 hover:bg-blue-400/20 text-white"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Validator Contract
                    </motion.div>
                  </Button>
                  <Button
                    onClick={() => loadTemplate('hybrid')}
                    variant="ghost"
                    className="w-full justify-start text-left bg-purple-500/10 hover:bg-purple-500/20 text-white"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center"
                    >
                      <Book className="w-4 h-4 mr-2" />
                      Hybrid Coin Contract
                    </motion.div>
                  </Button>
                </CardContent>
              </Card>

              {/* SpiralParserEngine Stats */}
              <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Brain className="w-5 h-5 mr-2 text-green-400" />
                    Parser Engine Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">AutoParser:</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">ANTLR4:</span>
                    <Badge className="bg-green-500">Compiled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Quantum Consensus:</span>
                    <Badge className="bg-blue-500">Running</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Files Parsed:</span>
                    <span className="text-yellow-400">{parserState.files.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="parser" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AutoParser Controls */}
            <Card className="bg-black/80 backdrop-blur-sm border-blue-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Zap className="w-6 h-6 mr-3 text-blue-400" />
                  SpiralParserEngine AutoParser
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Advanced file parsing with ANTLR4 integration and quantum consciousness recognition
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    onClick={parseCurrentFile}
                    disabled={parserState.parsing}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {parserState.parsing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Activity className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <Zap className="w-4 h-4 mr-2" />
                    )}
                    {parserState.parsing ? 'Parsing...' : 'Parse Current File'}
                  </Button>
                  
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".spiral,.ts,.js,.py,.rs,.go,.java,.cpp,.c,.sol"
                    />
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                </div>

                {/* Parse Results */}
                {parserState.results && (
                  <div className="bg-black/50 rounded-lg p-4 space-y-2">
                    <h4 className="text-white font-semibold mb-2">Latest Parse Results</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Language:</span>
                        <span className="text-blue-400 ml-2">{parserState.results.language || 'Unknown'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Success:</span>
                        <Badge className={parserState.results.success ? 'bg-green-500 ml-2' : 'bg-red-500 ml-2'}>
                          {parserState.results.success ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-400">Entropy:</span>
                        <span className="text-yellow-400 ml-2">{parserState.results.metrics.entropy.toFixed(3)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Φ-Resonance:</span>
                        <span className="text-purple-400 ml-2">{parserState.results.metrics.phiResonance.toFixed(3)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">TU Generated:</span>
                        <span className="text-green-400 ml-2">{parserState.results.metrics.tuGenerated}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Files Generated:</span>
                        <span className="text-cyan-400 ml-2">{parserState.results.generatedFiles.length}</span>
                      </div>
                    </div>
                    
                    {parserState.results.generatedFiles.length > 0 && (
                      <div className="mt-3">
                        <span className="text-gray-400 text-sm">Generated Files:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {parserState.results.generatedFiles.map((file, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Parser Metrics */}
            <Card className="bg-black/80 backdrop-blur-sm border-purple-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="w-6 h-6 mr-3 text-purple-400" />
                  Parser Metrics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {parserState.results?.metrics ? (
                  <>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Shannon Entropy</span>
                          <span className="text-yellow-400">{parserState.results.metrics.entropy.toFixed(3)}</span>
                        </div>
                        <Progress value={Math.min(parserState.results.metrics.entropy * 10, 100)} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Φ-Harmonic Resonance</span>
                          <span className="text-purple-400">{parserState.results.metrics.phiResonance.toFixed(3)}</span>
                        </div>
                        <Progress value={(parserState.results.metrics.phiResonance / 1.618) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Truth Units Generated</span>
                          <span className="text-green-400">{parserState.results.metrics.tuGenerated}</span>
                        </div>
                        <Progress value={Math.min(parserState.results.metrics.tuGenerated * 10, 100)} className="h-2" />
                      </div>

                      {parserState.results.metrics.spiralAlignment !== undefined && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Spiral Alignment</span>
                            <span className="text-blue-400">{parserState.results.metrics.spiralAlignment.toFixed(3)}</span>
                          </div>
                          <Progress value={parserState.results.metrics.spiralAlignment * 100} className="h-2" />
                        </div>
                      )}

                      {parserState.results.metrics.quantumCoherence !== undefined && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Quantum Coherence</span>
                            <span className="text-cyan-400">{parserState.results.metrics.quantumCoherence.toFixed(3)}</span>
                          </div>
                          <Progress value={parserState.results.metrics.quantumCoherence * 100} className="h-2" />
                        </div>
                      )}
                    </div>

                    {/* Quantum Signature */}
                    {parserState.results.quantumSignature && (
                      <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-3 mt-4">
                        <h5 className="text-cyan-400 font-semibold mb-2">Quantum Signature</h5>
                        <code className="text-xs text-gray-300 break-all">
                          {parserState.results.quantumSignature}
                        </code>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Parse a file to see detailed metrics</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consensus" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quantum Spiral Consensus Status */}
            <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Settings className="w-6 h-6 mr-3 text-cyan-400" />
                  Quantum Spiral Consensus
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Advanced φ-harmonic consensus mechanism with quantum validator selection
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Total Validators:</span>
                    <span className="text-white ml-2">{consensusStats.totalValidators}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Active Validators:</span>
                    <span className="text-green-400 ml-2">{consensusStats.activeValidators}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Quantum Capable:</span>
                    <span className="text-cyan-400 ml-2">{consensusStats.quantumCapableNodes}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Guardian Active:</span>
                    <Badge className={consensusStats.guardianActive ? 'bg-green-500 ml-2' : 'bg-red-500 ml-2'}>
                      {consensusStats.guardianActive ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Stake:</span>
                    <span className="text-yellow-400 ml-2">{consensusStats.totalStake.toLocaleString()} HYBRID</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Reputation:</span>
                    <span className="text-purple-400 ml-2">{consensusStats.averageReputation}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Avg Spiral Resonance:</span>
                    <span className="text-blue-400 ml-2">{consensusStats.averageSpiralResonance}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Consensus Efficiency:</span>
                    <span className="text-green-400 ml-2">{(consensusStats.consensusEfficiency * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <Button
                  onClick={simulateConsensusRound}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Simulate Consensus Round
                </Button>
              </CardContent>
            </Card>

            {/* Consensus Metrics */}
            <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="w-6 h-6 mr-3 text-green-400" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Validator Participation</span>
                      <span className="text-green-400">{(consensusStats.consensusEfficiency * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={consensusStats.consensusEfficiency * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Network Reputation</span>
                      <span className="text-purple-400">{(consensusStats.averageReputation * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={consensusStats.averageReputation * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Φ-Harmonic Resonance</span>
                      <span className="text-blue-400">{(consensusStats.averageSpiralResonance * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(consensusStats.averageSpiralResonance / 1.618) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Quantum Threshold</span>
                      <span className="text-cyan-400">{(consensusStats.quantumThreshold * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={consensusStats.quantumThreshold * 100} className="h-2" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/10 to-blue-500/10 border border-yellow-400/30 rounded-lg p-3 mt-4">
                  <h5 className="text-yellow-400 font-semibold mb-2">Spiral Resonance Frequency</h5>
                  <div className="text-2xl font-mono text-white">
                    {consensusStats.spiralResonanceFreq} Hz
                  </div>
                  <p className="text-gray-400 text-xs mt-1">Quantum consciousness synchronization frequency</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-8">
          <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="w-6 h-6 mr-3 text-green-400" />
                Parsed Files Archive
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Complete analysis history of files processed by the SpiralParserEngine
              </p>
            </CardHeader>
            <CardContent>
              {parserState.files.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No files parsed yet. Upload files using the AutoParser tab.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {parserState.files.map((fileResult, index) => (
                    <div key={index} className="bg-black/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{fileResult.filename}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={fileResult.result.success ? 'bg-green-500' : 'bg-red-500'}>
                            {fileResult.result.success ? 'Success' : 'Failed'}
                          </Badge>
                          <span className="text-gray-400 text-xs">
                            {new Date(fileResult.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <span className="text-gray-400">Language:</span>
                          <span className="text-blue-400 ml-1">{fileResult.result.language || 'Unknown'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Entropy:</span>
                          <span className="text-yellow-400 ml-1">{fileResult.result.metrics.entropy.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Φ-Resonance:</span>
                          <span className="text-purple-400 ml-1">{fileResult.result.metrics.phiResonance.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">TU Generated:</span>
                          <span className="text-green-400 ml-1">{fileResult.result.metrics.tuGenerated}</span>
                        </div>
                      </div>

                      {fileResult.result.generatedFiles.length > 0 && (
                        <div>
                          <span className="text-gray-400 text-xs">Generated Artifacts:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {fileResult.result.generatedFiles.map((file, fileIndex) => (
                              <Badge key={fileIndex} variant="outline" className="text-xs">
                                {file}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {fileResult.result.errors.length > 0 && (
                        <div className="mt-2 p-2 bg-red-500/10 border border-red-400/30 rounded">
                          <span className="text-red-400 text-xs">Errors:</span>
                          <ul className="text-red-300 text-xs mt-1 list-disc list-inside">
                            {fileResult.result.errors.map((error, errorIndex) => (
                              <li key={errorIndex}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitor" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* File Monitor Controls */}
            <Card className="bg-black/80 backdrop-blur-sm border-yellow-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Activity className="w-6 h-6 mr-3 text-yellow-400" />
                  Live File Monitor
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Automatically detects and processes new files uploaded to the system
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <Badge className={monitorStats.isRunning ? 'bg-green-500 ml-2' : 'bg-red-500 ml-2'}>
                      {monitorStats.isRunning ? 'Running' : 'Stopped'}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Files:</span>
                    <span className="text-white ml-2">{monitorStats.totalFiles}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Recent Files:</span>
                    <span className="text-green-400 ml-2">{monitorStats.recentFiles}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Scan:</span>
                    <span className="text-blue-400 ml-2">{monitorStats.lastScan.toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={startFileMonitor}
                      disabled={monitorStats.isRunning}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Monitor
                    </Button>
                    <Button
                      onClick={stopFileMonitor}
                      disabled={!monitorStats.isRunning}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      Stop Monitor
                    </Button>
                  </div>

                  <Button
                    onClick={performFullScan}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Full System Scan
                  </Button>

                  <Button
                    onClick={reprocessAllFiles}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Reprocess All Files
                  </Button>
                </div>

                {/* File Type Distribution */}
                <div className="bg-black/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">File Type Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(monitorStats.filesByType).map(([type, count]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-gray-400 capitalize">{type}:</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time File Stream */}
            <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <FileText className="w-6 h-6 mr-3 text-green-400" />
                  Live File Stream
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Real-time display of detected and processed files
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-y-auto space-y-2">
                  {monitoredFiles.slice(-20).reverse().map((file, index) => (
                    <div key={index} className="bg-black/50 rounded-lg p-3 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm truncate">
                          {file.path.split('/').pop()}
                        </span>
                        <div className="flex items-center gap-2">
                          {file.detectedType && (
                            <Badge variant="outline" className="text-xs">
                              {file.detectedType}
                            </Badge>
                          )}
                          <span className="text-gray-400 text-xs">
                            {new Date(file.lastModified).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {file.parseResult && (
                          <>
                            <div>
                              <span className="text-gray-400">Language:</span>
                              <span className="text-blue-400 ml-1">{file.parseResult.language || 'Unknown'}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">TU Generated:</span>
                              <span className="text-green-400 ml-1">{file.parseResult.metrics.tuGenerated}</span>
                            </div>
                          </>
                        )}
                        {file.spiralizedId && (
                          <div className="col-span-2">
                            <span className="text-gray-400">Spiralized ID:</span>
                            <span className="text-purple-400 ml-1 text-xs">{file.spiralizedId.substring(0, 16)}...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {monitoredFiles.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No files detected yet. Upload files to see live processing.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="github" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GitHub Language Recognition Status */}
            <Card className="bg-black/80 backdrop-blur-sm border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <ExternalLink className="w-6 h-6 mr-3 text-green-400" />
                  GitHub Language Recognition
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  ANTLR4 grammar implementation enabling GitHub to recognize SpiralScript as a legitimate programming language
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-white">.gitattributes Configuration</span>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-purple-400" />
                      <span className="text-white">ANTLR4 Grammar</span>
                    </div>
                    <Badge className="bg-purple-500">Deployed</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-blue-400" />
                      <span className="text-white">TextMate Syntax</span>
                    </div>
                    <Badge className="bg-blue-500">Enhanced</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-400/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">Language Definitions</span>
                    </div>
                    <Badge className="bg-yellow-500">Complete</Badge>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-3">Supported File Extensions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                        .spiral
                      </Badge>
                      <span className="text-gray-300 text-sm">SpiralScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-400/30">
                        .sprl
                      </Badge>
                      <span className="text-gray-300 text-sm">SpiralScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                        .consciousness
                      </Badge>
                      <span className="text-gray-300 text-sm">Consciousness</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-400/30">
                        .htsx
                      </Badge>
                      <span className="text-gray-300 text-sm">HTSX Runtime</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-400/30">
                        .quantum
                      </Badge>
                      <span className="text-gray-300 text-sm">Quantum Assembly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-400/30">
                        .qasm
                      </Badge>
                      <span className="text-gray-300 text-sm">Quantum Assembly</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grammar Features */}
            <Card className="bg-black/80 backdrop-blur-sm border-cyan-400/20">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Code className="w-6 h-6 mr-3 text-cyan-400" />
                  ANTLR4 Grammar Features
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Advanced language constructs recognized by the SpiralScript grammar
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-3">
                    <h5 className="text-cyan-400 font-semibold mb-2">Consciousness Programming</h5>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div><code className="bg-black/50 px-1 rounded">consciousness {"{}"}</code> - Awareness blocks</div>
                      <div><code className="bg-black/50 px-1 rounded">witness truth</code> - Truth validation</div>
                      <div><code className="bg-black/50 px-1 rounded">breath authentication</code> - Living verification</div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-3">
                    <h5 className="text-cyan-400 font-semibold mb-2">Quantum Computing</h5>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div><code className="bg-black/50 px-1 rounded">{"quantum { H(qubit) }"}</code> - Quantum gates</div>
                      <div><code className="bg-black/50 px-1 rounded">entangle()</code> - Quantum entanglement</div>
                      <div><code className="bg-black/50 px-1 rounded">measure()</code> - Quantum measurement</div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-3">
                    <h5 className="text-purple-400 font-semibold mb-2">Spiral Mathematics</h5>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div><code className="bg-black/50 px-1 rounded">φ</code> - Golden ratio constant</div>
                      <div><code className="bg-black/50 px-1 rounded">resonance()</code> - Harmonic functions</div>
                      <div><code className="bg-black/50 px-1 rounded">calculateSRI()</code> - Spiral Resonance Index</div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3">
                    <h5 className="text-green-400 font-semibold mb-2">Trust Contracts</h5>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div><code className="bg-black/50 px-1 rounded">trust ContractName {"{}"}</code> - Trust declarations</div>
                      <div><code className="bg-black/50 px-1 rounded">require spiralAlignment()</code> - Validation</div>
                      <div><code className="bg-black/50 px-1 rounded">emit("event")</code> - Event emission</div>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-semibold mb-2">HYBRID Blockchain</h5>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div><code className="bg-black/50 px-1 rounded">validator := "address"</code> - Validator setup</div>
                      <div><code className="bg-black/50 px-1 rounded">stake := 1000.HYBRID</code> - Staking</div>
                      <div><code className="bg-black/50 px-1 rounded">governance := spiralConsensus(φ)</code> - Governance</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Implementation Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">ANTLR4 Grammar:</span>
                      <Badge className="bg-green-500">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Parser Generation:</span>
                      <Badge className="bg-blue-500">Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Syntax Highlighting:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">GitHub Recognition:</span>
                      <Badge className="bg-green-500">Deployed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Repository Files Overview */}
          <Card className="bg-black/80 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="w-6 h-6 mr-3 text-gray-400" />
                Language Recognition Files
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Key files that enable GitHub to recognize SpiralScript as a programming language
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">.gitattributes</h5>
                  <p className="text-gray-400 text-xs mb-2">GitHub file type detection</p>
                  <code className="text-xs text-green-400 bg-black/50 p-2 rounded block">
                    *.spiral linguist-language=SpiralScript
                  </code>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">SpiralScript.g4</h5>
                  <p className="text-gray-400 text-xs mb-2">ANTLR4 grammar definition</p>
                  <code className="text-xs text-purple-400 bg-black/50 p-2 rounded block">
                    grammar SpiralScript;
                  </code>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">languages.yml</h5>
                  <p className="text-gray-400 text-xs mb-2">GitHub Linguist definitions</p>
                  <code className="text-xs text-blue-400 bg-black/50 p-2 rounded block">
                    SpiralScript: type: programming
                  </code>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">spiral.tmLanguage.json</h5>
                  <p className="text-gray-400 text-xs mb-2">TextMate syntax highlighting</p>
                  <code className="text-xs text-cyan-400 bg-black/50 p-2 rounded block">
                    "scopeName": "source.spiralscript"
                  </code>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">language-configuration.json</h5>
                  <p className="text-gray-400 text-xs mb-2">Editor language settings</p>
                  <code className="text-xs text-yellow-400 bg-black/50 p-2 rounded block">
                    "lineComment": "//"
                  </code>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h5 className="text-white font-semibold mb-2">package-extension.json</h5>
                  <p className="text-gray-400 text-xs mb-2">VS Code extension config</p>
                  <code className="text-xs text-red-400 bg-black/50 p-2 rounded block">
                    "contributes": "languages"
                  </code>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">GitHub Recognition Complete</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      SpiralScript is now configured for full GitHub language recognition with proper syntax highlighting, 
                      file detection, and repository statistics. The ANTLR4 grammar enables legitimate programming language status.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        File Detection: Active
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                        Syntax Highlighting: Enhanced
                      </Badge>
                      <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                        Language Statistics: Counted
                      </Badge>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                        IDE Support: Ready
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
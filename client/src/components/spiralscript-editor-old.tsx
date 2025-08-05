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
  
  // Update consensus stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setConsensusStats(quantumSpiralConsensus.getConsensusStats());
    }, 5000);
    return () => clearInterval(interval);
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
      addToConsole(`> Parser Error: ${error.message}`);
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
      addToConsole(`> Batch Parse Error: ${error.message}`);
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
        
        {/* GitHub Integration Notice */}
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full">
          <ExternalLink className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 text-sm">
            Powered by <a href="https://github.com/CreoDAMO/SpiralParserEngine" target="_blank" rel="noopener noreferrer" className="underline">SpiralParserEngine</a>
          </span>
        </div>
      </div>

      {/* Enhanced Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-gray-700">
          <TabsTrigger value="editor">Script Editor</TabsTrigger>
          <TabsTrigger value="parser">AutoParser</TabsTrigger>
          <TabsTrigger value="consensus">Quantum Consensus</TabsTrigger>
          <TabsTrigger value="files">File Analysis</TabsTrigger>
        </TabsList>

      {/* Enhanced Tabs Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 border border-gray-700">
          <TabsTrigger value="editor">Script Editor</TabsTrigger>
          <TabsTrigger value="parser">AutoParser</TabsTrigger>
          <TabsTrigger value="consensus">Quantum Consensus</TabsTrigger>
          <TabsTrigger value="files">File Analysis</TabsTrigger>
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
                  <div className="w-4 h-4 mr-2 rounded-full bg-purple-400" />
                  Hybrid Coin
                </motion.div>
              </Button>
            </CardContent>
          </Card>

          {/* Language Guide */}
          <Card className="bg-black/80 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Book className="w-5 h-5 mr-2 text-purple-400" />
                Language Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <code className="text-blue-400">trust</code>
                <span className="text-gray-400 ml-2">- Declares a trust contract</span>
              </div>
              <div>
                <code className="text-yellow-400">require</code>
                <span className="text-gray-400 ml-2">- Validation requirement</span>
              </div>
              <div>
                <code className="text-purple-400">breathInvocation</code>
                <span className="text-gray-400 ml-2">- Consciousness sync</span>
              </div>
              <div>
                <code className="text-green-400">φ</code>
                <span className="text-gray-400 ml-2">- Golden ratio constant</span>
              </div>
              <Button
                onClick={() => addToConsole('> Opening SpiralScript documentation...')}
                className="w-full mt-4 bg-purple-500/20 hover:bg-purple-500/30 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Documentation
              </Button>
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

      </Tabs>
    </div>
  );
}

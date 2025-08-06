import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HolographicLayer {
  id: string;
  name: string;
  type: 'transaction' | 'block' | 'validator' | 'smart_contract' | 'consciousness';
  position: { x: number; y: number; z: number };
  color: {
    frequency: number;
    amplitude: number;
    phase: number;
    coherence: number;
  };
  opacity: number;
  quantumState: {
    superposition: boolean;
    entangled: string[];
    observationCollapse: boolean;
    phiResonance: number;
  };
}

interface HolographicNFT {
  tokenId: string;
  volumetricData: {
    width: number;
    height: number;
    depth: number;
    compressionAlgorithm: string;
  };
  viewingAngles: Array<{
    theta: number;
    phi: number;
    hiddenLayers: string[];
    revealedContent: any;
  }>;
  quantumProperties: {
    superpositionStates: any[];
    entanglementChain: string[];
    observerEffect: boolean;
    consciousnessLevel: number;
  };
}

export function HolographicVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [observerPosition, setObserverPosition] = useState({ x: 0, y: 0, z: 10 });
  const [consciousnessLevel, setConsciousnessLevel] = useState(0.618);
  const [selectedLayer, setSelectedLayer] = useState<string>('');
  const [viewingAngle, setViewingAngle] = useState(0);
  const [quantumMeasurement, setQuantumMeasurement] = useState(false);

  // Fetch holographic state
  const { data: holographicState, refetch } = useQuery({
    queryKey: ['/api/holographic/state'],
    refetchInterval: 1000,
  });

  // Fetch quantum entanglements
  const { data: entanglements } = useQuery({
    queryKey: ['/api/holographic/quantum/entanglements'],
    refetchInterval: 2000,
  });

  // Fetch holographic metrics
  const { data: metrics } = useQuery({
    queryKey: ['/api/holographic/metrics'],
    refetchInterval: 3000,
  });

  // Initialize WebSocket connection
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/holographic-ws`;
    
    wsRef.current = new WebSocket(wsUrl);
    
    wsRef.current.onopen = () => {
      console.log('Holographic WebSocket connected');
    };
    
    wsRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };
    
    wsRef.current.onclose = () => {
      console.log('Holographic WebSocket disconnected');
    };
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (message: any) => {
    switch (message.type) {
      case 'holographic_initialization':
        renderHolographicSpace(message.layers, message.nfts);
        break;
      case 'layer_update':
        updateLayer(message.layer);
        break;
    }
  };

  const renderHolographicSpace = (layers: HolographicLayer[], nfts: HolographicNFT[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas to dark background for holographic effect
    ctx.fillStyle = '#000011';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Render holographic layers
    layers.forEach(layer => {
      renderHolographicLayer(ctx, layer, canvas.width, canvas.height);
    });
    
    // Render holographic NFTs
    nfts.forEach(nft => {
      renderHolographicNFT(ctx, nft, canvas.width, canvas.height);
    });
  };

  const renderHolographicLayer = (
    ctx: CanvasRenderingContext2D, 
    layer: HolographicLayer, 
    width: number, 
    height: number
  ) => {
    const centerX = width / 2 + layer.position.x * 50;
    const centerY = height / 2 + layer.position.y * 50;
    
    // Calculate holographic color from frequency
    const color = frequencyToRGB(layer.color.frequency);
    
    // Create holographic interference pattern
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, 100 * layer.color.amplitude
    );
    
    gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.opacity})`);
    gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${layer.opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
    
    ctx.fillStyle = gradient;
    
    // Draw interference pattern
    for (let i = 0; i < 5; i++) {
      const radius = 20 + i * 15 * layer.color.coherence;
      const phase = layer.color.phase + i * Math.PI / 4;
      
      ctx.save();
      ctx.globalAlpha = layer.opacity * (1 - i * 0.15);
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(phase) * 10,
        centerY + Math.sin(phase) * 10,
        radius,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.restore();
    }
    
    // Draw quantum entanglement lines
    if (layer.quantumState.entangled.length > 0) {
      layer.quantumState.entangled.forEach(entangledId => {
        drawQuantumEntanglement(ctx, centerX, centerY, entangledId, width, height);
      });
    }
    
    // Layer label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px monospace';
    ctx.fillText(layer.name, centerX - 40, centerY - 120);
    
    // Quantum state indicator
    if (layer.quantumState.superposition) {
      ctx.fillStyle = '#FFD700';
      ctx.font = '10px monospace';
      ctx.fillText('⚛️ SUPERPOSITION', centerX - 30, centerY - 105);
    }
  };

  const renderHolographicNFT = (
    ctx: CanvasRenderingContext2D,
    nft: HolographicNFT,
    width: number,
    height: number
  ) => {
    const x = width * 0.8;
    const y = height * 0.2 + (parseInt(nft.tokenId) % 5) * 60;
    
    // NFT holographic representation
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${nft.quantumProperties.consciousnessLevel})`);
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    ctx.fill();
    
    // Consciousness level indicator
    ctx.fillStyle = '#FFD700';
    ctx.font = '8px monospace';
    ctx.fillText(`NFT ${nft.tokenId}`, x - 15, y - 35);
    ctx.fillText(`Consciousness: ${(nft.quantumProperties.consciousnessLevel * 100).toFixed(1)}%`, x - 25, y - 25);
  };

  const drawQuantumEntanglement = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    entangledId: string,
    width: number,
    height: number
  ) => {
    // Simplified entanglement visualization
    const x2 = width / 2 + Math.random() * 100 - 50;
    const y2 = height / 2 + Math.random() * 100 - 50;
    
    ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const frequencyToRGB = (frequency: number): { r: number; g: number; b: number } => {
    // Convert frequency to RGB (simplified visible spectrum)
    const wavelength = 299792458 / frequency * 1e9; // Convert to nanometers
    
    if (wavelength >= 380 && wavelength < 440) {
      return { r: Math.floor((440 - wavelength) / (440 - 380) * 255), g: 0, b: 255 };
    } else if (wavelength >= 440 && wavelength < 490) {
      return { r: 0, g: Math.floor((wavelength - 440) / (490 - 440) * 255), b: 255 };
    } else if (wavelength >= 490 && wavelength < 510) {
      return { r: 0, g: 255, b: Math.floor((510 - wavelength) / (510 - 490) * 255) };
    } else if (wavelength >= 510 && wavelength < 580) {
      return { r: Math.floor((wavelength - 510) / (580 - 510) * 255), g: 255, b: 0 };
    } else if (wavelength >= 580 && wavelength < 645) {
      return { r: 255, g: Math.floor((645 - wavelength) / (645 - 580) * 255), b: 0 };
    } else if (wavelength >= 645 && wavelength <= 750) {
      return { r: 255, g: 0, b: 0 };
    }
    
    return { r: 255, g: 255, b: 255 }; // Default white
  };

  const updateLayer = (layer: HolographicLayer) => {
    // Trigger re-render when layer updates
    refetch();
  };

  const sendConsciousnessInteraction = async () => {
    if (!wsRef.current) return;
    
    const interaction = {
      type: 'consciousness_sync',
      data: {
        level: consciousnessLevel,
        observerPosition,
        quantumMeasurement,
        timestamp: new Date().toISOString()
      }
    };
    
    wsRef.current.send(JSON.stringify(interaction));
    
    // Also send to REST API
    try {
      await fetch('/api/holographic/consciousness/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interactionType: 'consciousness_sync',
          consciousnessLevel,
          observerPosition,
          quantumMeasurement
        })
      });
    } catch (error) {
      console.error('Error sending consciousness interaction:', error);
    }
  };

  // Render visualization when data changes
  useEffect(() => {
    if (holographicState?.data) {
      renderHolographicSpace(holographicState.data.layers, holographicState.data.nfts);
    }
  }, [holographicState, observerPosition, viewingAngle]);

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* Main Holographic Display */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gold-400">🌌 HTSX Holographic Blockchain Visualization</CardTitle>
              <CardDescription className="text-gray-300">
                Real-time 3D holographic representation of blockchain state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto border border-gray-600 rounded-lg bg-black"
              />
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          {/* Observer Controls */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-blue-400">🧭 Observer Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Consciousness Level</label>
                <input
                  type="range"
                  value={consciousnessLevel}
                  onChange={(e) => setConsciousnessLevel(parseFloat(e.target.value))}
                  max={1}
                  min={0}
                  step={0.01}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{(consciousnessLevel * 100).toFixed(1)}%</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Viewing Angle</label>
                <input
                  type="range"
                  value={viewingAngle}
                  onChange={(e) => setViewingAngle(parseInt(e.target.value))}
                  max={20}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">Angle {viewingAngle}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="quantum-measurement"
                  checked={quantumMeasurement}
                  onChange={(e) => setQuantumMeasurement(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="quantum-measurement" className="text-sm">Quantum Measurement</label>
              </div>
              
              <Button 
                onClick={sendConsciousnessInteraction}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                🧠 Sync Consciousness
              </Button>
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400">📊 Holographic Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {metrics?.data && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Layers:</span>
                    <Badge variant="secondary">{metrics.data.totalLayers}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Holographic NFTs:</span>
                    <Badge variant="secondary">{metrics.data.totalNFTs}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Quantum Entanglements:</span>
                    <Badge variant="secondary">{metrics.data.quantumEntanglements}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">φ-Coherence:</span>
                    <Badge variant="secondary">{metrics.data.phiCoherence?.toFixed(3)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Superposition States:</span>
                    <Badge variant="secondary">{metrics.data.quantumSuperposition}</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quantum Entanglements */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-purple-400">⚛️ Quantum State</CardTitle>
            </CardHeader>
            <CardContent>
              {entanglements?.data?.entanglements?.map((entanglement: any, index: number) => (
                <div key={index} className="text-xs text-gray-300 mb-1">
                  <span className="text-purple-300">{entanglement.primary}</span>
                  <span className="text-gray-500"> ↔ </span>
                  <span className="text-blue-300">{entanglement.entangled.join(', ')}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
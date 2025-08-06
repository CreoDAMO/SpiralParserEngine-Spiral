// SPDX-License-Identifier: MIT
/**
 * Holographic Blockchain API Routes
 * HTSX Runtime Engine endpoints for holographic visualization
 */

import type { Request, Response } from 'express';
import { HTSXHolographicEngine } from '../blockchain/holographic-engine';
import WebSocket, { WebSocketServer } from 'ws';

// Initialize holographic engine
const holographicEngine = new HTSXHolographicEngine();

// WebSocket server for real-time holographic updates
let wsServer: WebSocketServer | null = null;

export function initializeWebSocketServer(server: any) {
  wsServer = new WebSocketServer({ server, path: '/holographic-ws' });
  
  wsServer.on('connection', (ws) => {
    console.log('Holographic WebSocket client connected');
    holographicEngine.addWebSocketClient(ws);
    
    ws.on('close', () => {
      console.log('Holographic WebSocket client disconnected');
      holographicEngine.removeWebSocketClient(ws);
    });
    
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        handleWebSocketMessage(ws, message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
  });
}

function handleWebSocketMessage(ws: WebSocket, message: any) {
  switch (message.type) {
    case 'observer_interaction':
      handleObserverInteraction(message.data);
      break;
    case 'quantum_measurement':
      handleQuantumMeasurement(message.data);
      break;
    case 'consciousness_sync':
      handleConsciousnessSync(message.data);
      break;
  }
}

function handleObserverInteraction(data: any) {
  // Process observer effect on quantum holographic states
  holographicEngine.processBlockchainEvent({
    type: 'validator_update',
    data: { observerEffect: true, ...data }
  });
}

function handleQuantumMeasurement(data: any) {
  // Handle quantum state collapse in holographic space
  holographicEngine.processBlockchainEvent({
    type: 'new_block',
    data: { quantumCollapse: true, ...data }
  });
}

function handleConsciousnessSync(data: any) {
  // Synchronize consciousness-level interactions
  holographicEngine.processBlockchainEvent({
    type: 'new_transaction',
    data: { consciousnessLevel: data.level, ...data }
  });
}

// Get complete holographic state
export async function getHolographicState(req: Request, res: Response) {
  try {
    const state = holographicEngine.getHolographicState();
    
    res.json({
      success: true,
      data: {
        ...state,
        timestamp: new Date().toISOString(),
        engine: 'HTSX_Runtime_v1.0'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Create holographic NFT
export async function createHolographicNFT(req: Request, res: Response) {
  try {
    const { 
      tokenId, 
      metadata, 
      volumetricDimensions = { width: 64, height: 64, depth: 64 },
      consciousnessSignature 
    } = req.body;
    
    if (!tokenId || !metadata || !consciousnessSignature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: tokenId, metadata, consciousnessSignature'
      });
    }

    const holographicNFT = holographicEngine.createHolographicNFT({
      tokenId,
      metadata,
      volumetricDimensions,
      consciousnessSignature
    });
    
    res.json({
      success: true,
      data: {
        tokenId: holographicNFT.tokenId,
        volumetricSize: holographicNFT.volumetricData.voxels.length,
        viewingAngles: holographicNFT.viewingAngles.length,
        consciousnessLevel: holographicNFT.quantumProperties.consciousnessLevel,
        quantumStates: holographicNFT.quantumProperties.superpositionStates.length,
        interferenceMapSize: holographicNFT.interferenceMap.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get holographic NFT data
export async function getHolographicNFT(req: Request, res: Response) {
  try {
    const { tokenId } = req.params;
    const { viewingAngle = 0, observerPos } = req.query;
    
    const state = holographicEngine.getHolographicState();
    const nft = state.nfts.find(n => n.tokenId === tokenId);
    
    if (!nft) {
      return res.status(404).json({
        success: false,
        error: 'Holographic NFT not found'
      });
    }

    // Get viewing angle specific data
    const angleIndex = parseInt(viewingAngle as string) % nft.viewingAngles.length;
    const specificAngle = nft.viewingAngles[angleIndex];
    
    res.json({
      success: true,
      data: {
        tokenId: nft.tokenId,
        volumetricData: {
          width: nft.volumetricData.width,
          height: nft.volumetricData.height,
          depth: nft.volumetricData.depth,
          compressionAlgorithm: nft.volumetricData.compressionAlgorithm
        },
        currentViewingAngle: specificAngle,
        quantumProperties: nft.quantumProperties,
        consciousnessLevel: nft.quantumProperties.consciousnessLevel,
        hiddenLayers: specificAngle.hiddenLayers,
        revealedContent: specificAngle.revealedContent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get volumetric data for holographic NFT
export async function getNFTVolumetricData(req: Request, res: Response) {
  try {
    const { tokenId } = req.params;
    
    const state = holographicEngine.getHolographicState();
    const nft = state.nfts.find(n => n.tokenId === tokenId);
    
    if (!nft) {
      return res.status(404).json({
        success: false,
        error: 'Holographic NFT not found'
      });
    }

    // Return binary volumetric data
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${tokenId}_volumetric.data"`);
    res.setHeader('X-Volumetric-Width', nft.volumetricData.width.toString());
    res.setHeader('X-Volumetric-Height', nft.volumetricData.height.toString());
    res.setHeader('X-Volumetric-Depth', nft.volumetricData.depth.toString());
    res.setHeader('X-Compression-Algorithm', nft.volumetricData.compressionAlgorithm);
    
    res.send(Buffer.from(nft.volumetricData.voxels));
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get interference pattern data
export async function getInterferencePattern(req: Request, res: Response) {
  try {
    const { layerId } = req.params;
    
    const state = holographicEngine.getHolographicState();
    const layer = state.layers.find(l => l.id === layerId);
    
    if (!layer) {
      return res.status(404).json({
        success: false,
        error: 'Holographic layer not found'
      });
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${layerId}_interference.data"`);
    res.setHeader('X-Pattern-Size', layer.interferencePattern.length.toString());
    res.setHeader('X-Layer-Type', layer.type);
    res.setHeader('X-Phi-Coherence', layer.color.coherence.toString());
    
    res.send(Buffer.from(layer.interferencePattern.buffer));
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Update holographic layer
export async function updateHolographicLayer(req: Request, res: Response) {
  try {
    const { layerId } = req.params;
    const updates = req.body;
    
    holographicEngine.updateLayer(layerId, updates);
    
    res.json({
      success: true,
      data: {
        layerId,
        updatedFields: Object.keys(updates),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get quantum entanglement map
export async function getQuantumEntanglements(req: Request, res: Response) {
  try {
    const state = holographicEngine.getHolographicState();
    
    const entanglementMap = state.entanglements.map(entanglement => ({
      primary: entanglement[0],
      entangled: entanglement.slice(1),
      strength: Math.random() * 0.5 + 0.5, // Quantum entanglement strength
      phiResonance: 1.618033988749895
    }));
    
    res.json({
      success: true,
      data: {
        entanglements: entanglementMap,
        totalEntangled: entanglementMap.length,
        quantumCoherence: 0.95,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Process consciousness interaction
export async function processConsciousnessInteraction(req: Request, res: Response) {
  try {
    const { 
      interactionType, 
      consciousnessLevel, 
      observerPosition, 
      quantumMeasurement 
    } = req.body;
    
    if (!interactionType || consciousnessLevel === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: interactionType, consciousnessLevel'
      });
    }

    // Process the consciousness interaction
    holographicEngine.processBlockchainEvent({
      type: 'validator_update',
      data: {
        interactionType,
        consciousnessLevel,
        observerPosition,
        quantumMeasurement,
        timestamp: new Date().toISOString()
      }
    });
    
    res.json({
      success: true,
      data: {
        processed: true,
        consciousnessLevel,
        quantumEffect: quantumMeasurement ? 'state_collapse' : 'superposition_maintained',
        phiResonance: consciousnessLevel * 1.618033988749895
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Get holographic blockchain metrics
export async function getHolographicMetrics(req: Request, res: Response) {
  try {
    const state = holographicEngine.getHolographicState();
    
    const metrics = {
      totalLayers: state.layers.length,
      totalNFTs: state.nfts.length,
      quantumEntanglements: state.entanglements.length,
      avgConsciousnessLevel: state.nfts.reduce((sum, nft) => sum + nft.quantumProperties.consciousnessLevel, 0) / state.nfts.length || 0,
      totalVolumetricData: state.nfts.reduce((sum, nft) => sum + nft.volumetricData.voxels.length, 0),
      phiCoherence: state.layers.reduce((sum, layer) => sum + layer.color.coherence, 0) / state.layers.length || 0,
      quantumSuperposition: state.layers.filter(layer => layer.quantumState.superposition).length,
      activeInterferences: state.layers.reduce((sum, layer) => sum + layer.interferencePattern.length, 0)
    };
    
    res.json({
      success: true,
      data: {
        ...metrics,
        engineVersion: 'HTSX_Runtime_v1.0',
        holographicResolution: '4K_Volumetric',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
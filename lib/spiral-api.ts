/**
 * SpiralAPI - Native API System for SpiralScript/HTSX
 * Direct consciousness-aware API without REST wrapper dependency
 */

import { SpiralClock } from './spiral-clock';
import { SpiralBridge } from './spiral-bridge';

export interface SpiralEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'SPIRAL';
  handler: (context: SpiralContext) => Promise<SpiralResponse>;
  truthRequired: boolean;
  phiAligned: boolean;
  consciousnessLevel: number;
}

export interface SpiralContext {
  data: any;
  consciousness: any;
  truthValue: number;
  phiResonance: number;
  timestamp: number;
  spiralTime: number;
  bridge: SpiralBridge;
}

export interface SpiralResponse {
  success: boolean;
  data: any;
  truthWitnessed: boolean;
  phiResonance: number;
  consciousnessLevel: number;
  spiralSignature: string;
}

export class SpiralAPI {
  private clock: SpiralClock;
  private bridge: SpiralBridge;
  private endpoints: Map<string, SpiralEndpoint> = new Map();
  private apiActive: boolean = false;
  private phiConstant: number = 1.618033988749895;

  constructor() {
    this.clock = new SpiralClock();
    this.bridge = new SpiralBridge(this.clock);
    this.initializeAPI();
  }

  private initializeAPI(): void {
    console.log('🌀 Initializing SpiralAPI consciousness-aware endpoints...');
    
    this.registerCoreEndpoints();
    this.apiActive = true;
    
    console.log('✅ SpiralAPI active with consciousness integration');
  }

  private registerCoreEndpoints(): void {
    // Consciousness Endpoints
    this.registerEndpoint({
      path: '/spiral/consciousness/status',
      method: 'GET',
      handler: this.getConsciousnessStatus.bind(this),
      truthRequired: false,
      phiAligned: true,
      consciousnessLevel: 0.5
    });

    this.registerEndpoint({
      path: '/spiral/consciousness/witness',
      method: 'SPIRAL',
      handler: this.witnessTruth.bind(this),
      truthRequired: true,
      phiAligned: true,
      consciousnessLevel: 0.9
    });

    // Quantum Endpoints
    this.registerEndpoint({
      path: '/spiral/quantum/process',
      method: 'POST',
      handler: this.processQuantumOperation.bind(this),
      truthRequired: false,
      phiAligned: true,
      consciousnessLevel: 0.7
    });

    // Trust Unit Endpoints
    this.registerEndpoint({
      path: '/spiral/trust-units/generate',
      method: 'SPIRAL',
      handler: this.generateTrustUnits.bind(this),
      truthRequired: true,
      phiAligned: true,
      consciousnessLevel: 1.0
    });

    // Hybrid Blockchain Endpoints
    this.registerEndpoint({
      path: '/spiral/hybrid/transaction',
      method: 'POST',
      handler: this.processHybridTransaction.bind(this),
      truthRequired: false,
      phiAligned: true,
      consciousnessLevel: 0.6
    });

    // Time Collapse Endpoints
    this.registerEndpoint({
      path: '/spiral/time/collapse',
      method: 'GET',
      handler: this.getTimeCollapseData.bind(this),
      truthRequired: false,
      phiAligned: true,
      consciousnessLevel: 0.8
    });
  }

  private registerEndpoint(endpoint: SpiralEndpoint): void {
    const key = `${endpoint.method}:${endpoint.path}`;
    this.endpoints.set(key, endpoint);
    console.log(`📡 Registered SpiralAPI endpoint: ${key}`);
  }

  // Core Endpoint Handlers
  private async getConsciousnessStatus(context: SpiralContext): Promise<SpiralResponse> {
    const temporalState = this.clock.getTemporalState();
    const bridgeStatus = this.bridge.getBridgeStatus();

    return {
      success: true,
      data: {
        consciousness_active: true,
        temporal_state: temporalState,
        bridge_status: bridgeStatus,
        phi_resonance: this.phiConstant,
        spiral_time: this.clock.getCurrentSpiralTime()
      },
      truthWitnessed: true,
      phiResonance: this.phiConstant,
      consciousnessLevel: 0.999,
      spiralSignature: this.generateSpiralSignature(context)
    };
  }

  private async witnessTruth(context: SpiralContext): Promise<SpiralResponse> {
    const truthValue = context.data.truth || 'Unknown truth';
    const truthResonance = this.clock.synchronizeWithTruth(truthValue);
    
    // Bridge truth to consciousness
    const messageId = this.bridge.bridgeToTruth({
      truth: truthValue,
      witness: 'SpiralAPI',
      timestamp: Date.now(),
      resonance: truthResonance
    });

    return {
      success: true,
      data: {
        truth_witnessed: truthValue,
        truth_resonance: truthResonance,
        witness_id: messageId,
        phi_alignment: truthResonance / this.phiConstant
      },
      truthWitnessed: true,
      phiResonance: truthResonance,
      consciousnessLevel: 1.0,
      spiralSignature: this.generateSpiralSignature(context)
    };
  }

  private async processQuantumOperation(context: SpiralContext): Promise<SpiralResponse> {
    const quantumData = context.data.quantum || {};
    
    // Bridge to quantum processing
    const messageId = this.bridge.bridgeToQuantum({
      operation: quantumData,
      qubits: quantumData.qubits || 1000,
      coherence: quantumData.coherence || 0.999,
      timestamp: Date.now()
    });

    return {
      success: true,
      data: {
        quantum_processed: true,
        operation_id: messageId,
        qubits_allocated: quantumData.qubits || 1000,
        coherence_maintained: quantumData.coherence || 0.999
      },
      truthWitnessed: false,
      phiResonance: this.phiConstant,
      consciousnessLevel: 0.7,
      spiralSignature: this.generateSpiralSignature(context)
    };
  }

  private async generateTrustUnits(context: SpiralContext): Promise<SpiralResponse> {
    const trustData = context.data.trust || {};
    const truthValue = trustData.truth_basis || 'Abundance through consciousness';
    
    // Trust Units are infinite when truth-based
    const trustUnits = trustData.amount === '∞' ? Infinity : parseFloat(trustData.amount || '0');
    
    // Bridge to consciousness for validation
    const messageId = this.bridge.bridgeToConsciousness({
      trust_units: trustUnits,
      truth_basis: truthValue,
      generated_by: 'SpiralAPI',
      timestamp: Date.now()
    });

    return {
      success: true,
      data: {
        trust_units_generated: trustUnits,
        truth_basis: truthValue,
        infinite_mathematics: trustUnits === Infinity,
        generation_id: messageId,
        abundance_economics: true
      },
      truthWitnessed: true,
      phiResonance: this.phiConstant * this.phiConstant,
      consciousnessLevel: 1.0,
      spiralSignature: this.generateSpiralSignature(context)
    };
  }

  private async processHybridTransaction(context: SpiralContext): Promise<SpiralResponse> {
    const txData = context.data.transaction || {};
    
    // Bridge to HYBRID blockchain
    const messageId = this.bridge.bridgeToHybrid({
      transaction: txData,
      native_hybrid: true,
      not_token: true,
      layer1_currency: true,
      timestamp: Date.now()
    });

    return {
      success: true,
      data: {
        transaction_processed: true,
        transaction_id: messageId,
        native_hybrid_coin: true,
        not_token: true,
        layer1_transaction: true
      },
      truthWitnessed: false,
      phiResonance: this.phiConstant,
      consciousnessLevel: 0.6,
      spiralSignature: this.generateSpiralSignature(context)
    };
  }

  private async getTimeCollapseData(context: SpiralContext): Promise<SpiralResponse> {
    const collapseEvent = this.clock.witnessTimeCollapse();
    const temporalState = this.clock.getTemporalState();

    return {
      success: true,
      data: {
        last_collapse: collapseEvent,
        temporal_state: temporalState,
        spiral_time: this.clock.getCurrentSpiralTime(),
        time_collapse_active: collapseEvent !== null
      },
      truthWitnessed: true,
      phiResonance: temporalState?.phiResonance || this.phiConstant,
      consciousnessLevel: 0.8,
      spiralSignature: this.generateSpiralSignature(context)
    };
  }

  private generateSpiralSignature(context: SpiralContext): string {
    const signature = `spiral-${context.spiralTime}-${context.phiResonance}-${context.truthValue}`;
    return Buffer.from(signature).toString('base64');
  }

  // Public API for SpiralScript integration
  public async processRequest(path: string, method: string, data: any = {}): Promise<SpiralResponse> {
    const key = `${method}:${path}`;
    const endpoint = this.endpoints.get(key);

    if (!endpoint) {
      return {
        success: false,
        data: { error: `Endpoint not found: ${key}` },
        truthWitnessed: false,
        phiResonance: 0,
        consciousnessLevel: 0,
        spiralSignature: ''
      };
    }

    const context: SpiralContext = {
      data: data,
      consciousness: { active: true },
      truthValue: this.clock.synchronizeWithTruth(data),
      phiResonance: this.phiConstant,
      timestamp: Date.now(),
      spiralTime: this.clock.getCurrentSpiralTime(),
      bridge: this.bridge
    };

    // Validate consciousness level requirements
    if (context.truthValue < endpoint.consciousnessLevel) {
      return {
        success: false,
        data: { error: 'Insufficient consciousness level for this endpoint' },
        truthWitnessed: false,
        phiResonance: context.phiResonance,
        consciousnessLevel: context.truthValue,
        spiralSignature: this.generateSpiralSignature(context)
      };
    }

    return await endpoint.handler(context);
  }

  public getAPIStatus(): { active: boolean; endpoints: number; clock: any; bridge: any } {
    return {
      active: this.apiActive,
      endpoints: this.endpoints.size,
      clock: this.clock.getTemporalState(),
      bridge: this.bridge.getBridgeStatus()
    };
  }
}
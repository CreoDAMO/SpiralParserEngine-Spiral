// QuantumSpiralConsensus implementation from SpiralParserEngine
export interface HybridNode {
  id: string;
  address: string;
  stake: number;
  reputation: number;
  quantumCapability: boolean;
  spiralResonance: number;
  lastSeen: number;
  consensusWeight: number;
}

export interface HybridBlock {
  index: number;
  timestamp: number;
  data: any[];
  previousHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;
  quantumSignature?: string;
}

export interface HybridTransaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  fee: number;
  timestamp: number;
  signature: string;
  type: 'HYBRID' | 'TU' | 'QUANTUM' | 'SPIRAL';
  metadata?: any;
}

export class QuantumSpiralConsensus {
  private nodes: HybridNode[] = [];
  private quantumThreshold: number = 0.618; // Golden ratio
  private spiralResonanceFreq: number = 432; // Hz
  private readonly PHI = 1.618033988749;
  
  constructor() {
    this.initializeGenesisValidators();
  }

  private initializeGenesisValidators(): void {
    // Create initial quantum-capable validators
    const genesisValidators: HybridNode[] = [
      {
        id: 'SPIRAL_GENESIS_1',
        address: 'hybrid1spiral1genesis1validator',
        stake: 1000000,
        reputation: 1.0,
        quantumCapability: true,
        spiralResonance: 0.618,
        lastSeen: Date.now(),
        consensusWeight: 1.0
      },
      {
        id: 'SPIRAL_GENESIS_2', 
        address: 'hybrid1spiral2genesis2validator',
        stake: 1000000,
        reputation: 1.0,
        quantumCapability: true,
        spiralResonance: 0.618,
        lastSeen: Date.now(),
        consensusWeight: 1.0
      },
      {
        id: 'LYONAEL_GUARDIAN',
        address: 'hybrid1lyonael1guardian1omniverse',
        stake: 5000000,
        reputation: 1.0,
        quantumCapability: true,
        spiralResonance: 1.618, // Full phi resonance
        lastSeen: Date.now(),
        consensusWeight: 2.0 // Higher weight for Guardian
      }
    ];
    
    this.nodes = genesisValidators;
  }

  public validateBlock(block: HybridBlock): boolean {
    // 1. Basic block validation
    if (!this.validateBlockStructure(block)) {
      return false;
    }

    // 2. Quantum spiral validation
    if (!this.validateQuantumSpiral(block)) {
      return false;
    }

    // 3. Consensus validation
    if (!this.validateConsensus(block)) {
      return false;
    }

    // 4. Phi-harmonic validation
    if (!this.validatePhiHarmonics(block)) {
      return false;
    }

    return true;
  }

  private validateBlockStructure(block: HybridBlock): boolean {
    // Validate basic block structure
    if (!block.hash || !block.previousHash || block.index < 0) {
      return false;
    }

    // Validate timestamp
    const now = Date.now();
    if (block.timestamp > now + 5000 || block.timestamp < now - 3600000) {
      return false;
    }

    // Validate merkle root
    if (!block.merkleRoot || block.merkleRoot.length === 0) {
      return false;
    }

    return true;
  }

  private validateQuantumSpiral(block: HybridBlock): boolean {
    if (!block.quantumSignature) {
      return false;
    }

    // Calculate expected quantum spiral resonance
    const expectedResonance = Math.sin(block.timestamp * this.PHI / this.spiralResonanceFreq);
    
    // Validate quantum signature contains spiral mathematics
    const signatureHash = parseInt(block.quantumSignature.substring(8, 16), 16);
    const normalizedHash = (signatureHash % 10000) / 10000;
    
    // Check if the signature aligns with spiral mathematics
    return Math.abs(normalizedHash - Math.abs(expectedResonance)) < this.quantumThreshold;
  }

  private validatePhiHarmonics(block: HybridBlock): boolean {
    // Validate block follows phi-harmonic principles
    const blockHash = parseInt(block.hash.substring(0, 8), 16);
    const phiAlignment = (blockHash % 1618) / 1618;
    
    // Check if block hash aligns with golden ratio
    return Math.abs(phiAlignment - 0.618) < 0.1;
  }

  private validateConsensus(block: HybridBlock): boolean {
    // Get active validators
    const activeValidators = this.getActiveValidators();
    if (activeValidators.length === 0) {
      return false;
    }

    // Calculate required consensus weight
    const totalWeight = activeValidators.reduce((sum, node) => sum + node.consensusWeight, 0);
    const requiredWeight = totalWeight * 0.67; // 67% consensus required

    // Check if lyona'el Guardian participated (special case)
    const guardian = activeValidators.find(node => node.id === 'LYONAEL_GUARDIAN');
    if (guardian) {
      // Guardian participation lowers consensus requirement
      const guardianRequiredWeight = totalWeight * 0.51; // 51% with Guardian
      return guardianRequiredWeight > 0;
    }

    // For this demo, we'll assume consensus is reached
    // In a real implementation, this would check validator signatures
    return true;
  }

  public selectValidator(blockHeight: number): HybridNode | null {
    const activeValidators = this.getActiveValidators();
    if (activeValidators.length === 0) {
      return null;
    }

    // Use spiral mathematics for validator selection
    const spiralIndex = Math.floor((blockHeight * this.PHI) % activeValidators.length);
    
    // Add randomness based on quantum resonance
    const quantumOffset = Math.floor(Math.sin(blockHeight / this.spiralResonanceFreq) * activeValidators.length);
    const finalIndex = (spiralIndex + quantumOffset) % activeValidators.length;
    
    return activeValidators[finalIndex];
  }

  private getActiveValidators(): HybridNode[] {
    const now = Date.now();
    const maxAge = 60000; // 1 minute
    
    return this.nodes.filter(node => 
      node.quantumCapability && 
      node.spiralResonance >= this.quantumThreshold &&
      (now - node.lastSeen) < maxAge
    ).sort((a, b) => b.consensusWeight - a.consensusWeight); // Sort by weight descending
  }

  public addValidator(node: HybridNode): boolean {
    // Validate node capabilities
    if (!node.quantumCapability || node.spiralResonance < this.quantumThreshold) {
      return false;
    }

    // Check minimum stake requirement
    const minStake = 100000; // 100k HYBRID minimum
    if (node.stake < minStake) {
      return false;
    }

    // Calculate consensus weight based on stake and reputation
    node.consensusWeight = node.reputation * Math.log(node.stake / minStake);

    this.nodes.push(node);
    return true;
  }

  public removeValidator(nodeId: string): boolean {
    const index = this.nodes.findIndex(node => node.id === nodeId);
    if (index === -1) {
      return false;
    }

    // Cannot remove Genesis validators or Guardian
    const protectedNodes = ['SPIRAL_GENESIS_1', 'SPIRAL_GENESIS_2', 'LYONAEL_GUARDIAN'];
    if (protectedNodes.includes(nodeId)) {
      return false;
    }

    this.nodes.splice(index, 1);
    return true;
  }

  public updateNodeReputation(nodeId: string, reputationDelta: number): void {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.reputation = Math.max(0, Math.min(1, node.reputation + reputationDelta));
      node.consensusWeight = node.reputation * Math.log(node.stake / 100000);
      node.lastSeen = Date.now();
    }
  }

  public updateNodeSpiralResonance(nodeId: string, newResonance: number): void {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.spiralResonance = Math.max(0, Math.min(this.PHI, newResonance));
      node.lastSeen = Date.now();
    }
  }

  public getConsensusStats() {
    const activeValidators = this.getActiveValidators();
    const totalStake = this.nodes.reduce((sum, node) => sum + node.stake, 0);
    const averageReputation = this.nodes.reduce((sum, node) => sum + node.reputation, 0) / this.nodes.length;
    const averageSpiralResonance = this.nodes.reduce((sum, node) => sum + node.spiralResonance, 0) / this.nodes.length;

    return {
      totalValidators: this.nodes.length,
      activeValidators: activeValidators.length,
      quantumCapableNodes: this.nodes.filter(n => n.quantumCapability).length,
      totalStake,
      averageReputation: parseFloat(averageReputation.toFixed(3)),
      averageSpiralResonance: parseFloat(averageSpiralResonance.toFixed(3)),
      quantumThreshold: this.quantumThreshold,
      spiralResonanceFreq: this.spiralResonanceFreq,
      guardianActive: activeValidators.some(n => n.id === 'LYONAEL_GUARDIAN'),
      consensusEfficiency: activeValidators.length / this.nodes.length
    };
  }

  public calculateBlockReward(blockHeight: number): number {
    // Spiral-based reward calculation
    const baseReward = 50;
    const halvingInterval = 210000;
    
    // Traditional halving
    const halvings = Math.floor(blockHeight / halvingInterval);
    let reward = baseReward / Math.pow(2, halvings);
    
    // Apply spiral enhancement
    const spiralMultiplier = 1 + (Math.sin(blockHeight * this.PHI / 1000) * 0.1);
    reward *= spiralMultiplier;
    
    // Quantum consciousness bonus
    const quantumBonus = Math.cos(blockHeight / this.spiralResonanceFreq) * 0.05;
    reward *= (1 + quantumBonus);
    
    return Math.max(0.001, reward); // Minimum reward
  }

  public simulateConsensusRound(blockHeight: number): {
    selectedValidator: HybridNode | null;
    consensusReached: boolean;
    participatingValidators: number;
    blockReward: number;
    quantumCoherence: number;
  } {
    const selectedValidator = this.selectValidator(blockHeight);
    const activeValidators = this.getActiveValidators();
    const participatingValidators = Math.floor(activeValidators.length * 0.8); // 80% participation
    const consensusReached = participatingValidators >= Math.ceil(activeValidators.length * 0.67);
    const blockReward = this.calculateBlockReward(blockHeight);
    
    // Calculate quantum coherence
    const quantumCoherence = activeValidators.reduce((sum, node) => 
      sum + (node.spiralResonance * node.reputation), 0) / activeValidators.length;

    return {
      selectedValidator,
      consensusReached,
      participatingValidators,
      blockReward,
      quantumCoherence: parseFloat(quantumCoherence.toFixed(3))
    };
  }

  public getNodeById(nodeId: string): HybridNode | undefined {
    return this.nodes.find(node => node.id === nodeId);
  }

  public getAllNodes(): HybridNode[] {
    return [...this.nodes];
  }

  public getQuantumCapableNodes(): HybridNode[] {
    return this.nodes.filter(node => node.quantumCapability);
  }

  public getHighResonanceNodes(): HybridNode[] {
    return this.nodes.filter(node => node.spiralResonance >= 1.0);
  }
}

// Export singleton instance
export const quantumSpiralConsensus = new QuantumSpiralConsensus();
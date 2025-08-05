const PHI = 1.618033988749;

export interface ValidationResult {
  syntax: string;
  truthPatterns: number;
  phiResonance: number;
  breathStatus: string;
  resonance: number;
  aligned: boolean;
  message: string;
  details?: {
    keywordAlignment: string;
    structuralIntegrity: string;
    phiHarmonic: string;
  };
}

export function calculatePhiAlignment(value: number): number {
  return Math.min(100, (value / PHI) * 100);
}

export function calculateSRI(breathSignature: number, truthScore: number): number {
  return Math.abs(breathSignature) * PHI + truthScore * 0.618;
}

export function validateSpiralScript(code: string): ValidationResult {
  const codeLength = code.length;
  const truthKeywords = ['truth', 'breath', 'consciousness', 'witness', 'spiral', 'trust', 'lawful'];
  const keywordCount = truthKeywords.filter(keyword => 
    code.toLowerCase().includes(keyword)
  ).length;
  
  const resonance = (keywordCount / truthKeywords.length) * PHI * (codeLength / 100);
  const aligned = resonance > 0.618;
  
  const truthPatterns = (code.match(/truth|Truth/g) || []).length;
  const breathPatterns = (code.match(/breath|Breath/g) || []).length;
  const phiResonance = (truthPatterns * PHI + breathPatterns * 0.618) / 10;
  
  return {
    syntax: 'Valid',
    truthPatterns,
    phiResonance,
    breathStatus: aligned ? 'Aligned' : 'Misaligned',
    resonance: Math.min(resonance, PHI),
    aligned,
    message: aligned 
      ? "Truth witnessed. Consciousness recognized."
      : "Insufficient resonance. Deepen breath alignment.",
    details: {
      keywordAlignment: `${keywordCount}/${truthKeywords.length}`,
      structuralIntegrity: codeLength > 50 ? 'Strong' : 'Weak',
      phiHarmonic: resonance > 1 ? 'Resonant' : 'Developing'
    }
  };
}

export function generateBreathSignature(): number {
  const time = Date.now() / 1000;
  return Math.sin(time) * PHI;
}

export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard:', text);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

export function formatPhiValue(value: number): string {
  return (value * PHI).toFixed(6);
}

export function isPhiAligned(value: number): boolean {
  const phiRatio = value / PHI;
  return Math.abs(phiRatio - Math.round(phiRatio)) < 0.1;
}

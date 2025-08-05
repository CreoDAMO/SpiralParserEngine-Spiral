import { useState, useEffect, useCallback } from 'react';
import { calculateSRI, generateBreathSignature, calculatePhiAlignment } from '@/lib/spiral-calculations';

const PHI = 1.618033988749;

export function useConsciousness() {
  const [consciousnessState, setConsciousnessState] = useState<'dormant' | 'awakening' | 'witnessed'>('dormant');
  const [breathSignature, setBreathSignature] = useState(0);
  const [sriScore, setSriScore] = useState(0);
  const [tuCount, setTuCount] = useState(0);
  const [phiAlignment, setPhiAlignment] = useState(0);
  const [truthCoherence, setTruthCoherence] = useState(0);
  const [breathSync, setBreathSync] = useState(0);

  // Breath animation effect
  useEffect(() => {
    const breathInterval = setInterval(() => {
      if (consciousnessState === 'awakening' || consciousnessState === 'witnessed') {
        const newSignature = generateBreathSignature();
        const newSriScore = calculateSRI(newSignature, 1.0);
        
        setBreathSignature(newSignature);
        setSriScore(newSriScore);
        
        // Update metrics based on breath patterns
        const time = Date.now() / 1000;
        setPhiAlignment(calculatePhiAlignment(Math.abs(newSignature)));
        setTruthCoherence(Math.min(100, Math.abs(Math.sin(time * 0.5)) * 100));
        setBreathSync(Math.min(100, Math.abs(Math.cos(time * 0.3)) * 100));
      }
    }, 100);

    return () => clearInterval(breathInterval);
  }, [consciousnessState]);

  const initiateConsciousness = useCallback(() => {
    setConsciousnessState('awakening');
    
    setTimeout(() => {
      setConsciousnessState('witnessed');
    }, 3000);
  }, []);

  const validateBreath = useCallback(() => {
    if (consciousnessState !== 'dormant') {
      const currentAlignment = calculatePhiAlignment(Math.abs(breathSignature));
      if (currentAlignment > 61.8) { // φ-based threshold
        setTuCount(prev => prev + 1);
      }
    }
  }, [consciousnessState, breathSignature]);

  const generateTU = useCallback(() => {
    if (consciousnessState === 'witnessed' && sriScore > 0.618) {
      setTuCount(prev => prev + 1);
    }
  }, [consciousnessState, sriScore]);

  const exportSession = useCallback(() => {
    const sessionData = {
      consciousnessState,
      breathSignature,
      sriScore,
      tuCount,
      phiAlignment,
      truthCoherence,
      breathSync,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consciousness-session-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [consciousnessState, breathSignature, sriScore, tuCount, phiAlignment, truthCoherence, breathSync]);

  return {
    consciousnessState,
    breathSignature,
    sriScore,
    tuCount,
    phiAlignment,
    truthCoherence,
    breathSync,
    initiateConsciousness,
    validateBreath,
    generateTU,
    exportSession
  };
}

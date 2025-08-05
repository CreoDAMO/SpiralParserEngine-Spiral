import { useState, useEffect } from 'react';

interface Validator {
  name: string;
  stake: number;
  uptime: number;
  status: 'Active' | 'Syncing';
}

interface Transaction {
  hash: string;
  type: string;
  amount: string;
  status: 'Confirmed' | 'Pending';
  timestamp: string;
}

export function useBlockchain() {
  const [tps, setTps] = useState(847);
  const [hybridPrice, setHybridPrice] = useState('0.1618');
  const [totalSupply] = useState('∞ (φ-Generated)');
  const [validators, setValidators] = useState<Validator[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Initialize blockchain data
  useEffect(() => {
    generateValidators();
    generateTransactions();
    
    // Update intervals
    const tpsInterval = setInterval(updateTps, 3000);
    const validatorInterval = setInterval(updateValidators, 5000);
    const transactionInterval = setInterval(updateTransactions, 7000);
    const priceInterval = setInterval(updatePrice, 10000);
    
    return () => {
      clearInterval(tpsInterval);
      clearInterval(validatorInterval);
      clearInterval(transactionInterval);
      clearInterval(priceInterval);
    };
  }, []);

  const generateValidators = () => {
    const validatorNames = [
      'SpiralNode_Alpha',
      'ConsciousValidator_Beta', 
      'TruthWitness_Gamma',
      'PhiHarmonic_Delta',
      'BreathSync_Epsilon',
      'ResonanceValidator_Zeta'
    ];
    
    setValidators(validatorNames.map(name => ({
      name,
      stake: Math.floor(Math.random() * 10000) + 1000,
      uptime: Math.random() * 0.05 + 0.95,
      status: Math.random() > 0.1 ? 'Active' : 'Syncing'
    })));
  };

  const generateTransactions = () => {
    const txTypes = ['Transfer', 'TruthValidation', 'ConsciousnessSync', 'PhiCalculation', 'BreathAuth'];
    
    setTransactions(Array.from({length: 8}, () => ({
      hash: '0x' + Math.random().toString(16).substr(2, 8),
      type: txTypes[Math.floor(Math.random() * txTypes.length)],
      amount: (Math.random() * 1000).toFixed(2),
      status: Math.random() > 0.2 ? 'Confirmed' : 'Pending',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString()
    })));
  };

  const updateTps = () => {
    const baseTps = 847;
    const variation = Math.floor(Math.random() * 40) - 20;
    setTps(Math.max(800, baseTps + variation));
  };

  const updateValidators = () => {
    setValidators(prev => prev.map(validator => ({
      ...validator,
      uptime: Math.random() < 0.1 
        ? Math.min(1, validator.uptime + (Math.random() * 0.01 - 0.005))
        : validator.uptime
    })));
  };

  const updateTransactions = () => {
    if (Math.random() < 0.4) {
      const txTypes = ['Transfer', 'TruthValidation', 'ConsciousnessSync', 'PhiCalculation', 'BreathAuth'];
      const newTx: Transaction = {
        hash: '0x' + Math.random().toString(16).substr(2, 8),
        type: txTypes[Math.floor(Math.random() * txTypes.length)],
        amount: (Math.random() * 1000).toFixed(2),
        status: 'Pending',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setTransactions(prev => [newTx, ...prev.slice(0, 7)]);
    }
  };

  const updatePrice = () => {
    // Simulate price fluctuation around φ-related values
    const basePrice = 0.1618;
    const variation = (Math.random() - 0.5) * 0.01;
    setHybridPrice((basePrice + variation).toFixed(4));
  };

  return {
    tps,
    hybridPrice,
    totalSupply,
    validators,
    transactions
  };
}

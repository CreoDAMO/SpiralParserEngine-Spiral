import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import ConsciousnessGateway from '@/components/consciousness-gateway';
import HybridBlockchain from '@/components/hybrid-blockchain';
import TestbedsSystem from '@/components/testbeds-system';
import SpiralScriptEditor from '@/components/spiralscript-editor';
import NFTMarketplace from '@/components/nft-marketplace';
import PDFUploadSystem from '@/components/pdf-upload-system';
import { Zap } from 'lucide-react';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('consciousness');
  const [quantumMode, setQuantumMode] = useState(false);

  // Initialize with consciousness section
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (['consciousness', 'blockchain', 'testbeds', 'spiralscript', 'marketplace', 'upload'].includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  const toggleQuantumMode = () => {
    setQuantumMode(!quantumMode);
  };

  return (
    <div className={`min-h-screen overflow-x-hidden ${quantumMode ? 'quantum-state' : ''}`}>
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 consciousness-gradient pointer-events-none z-0"
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 50%, hsla(51, 100%, 50%, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, hsla(51, 100%, 50%, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, hsla(51, 100%, 50%, 0.3) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Navigation */}
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {activeSection === 'consciousness' && <ConsciousnessGateway />}
        {activeSection === 'blockchain' && <HybridBlockchain />}
        {activeSection === 'testbeds' && <TestbedsSystem />}
        {activeSection === 'spiralscript' && <SpiralScriptEditor />}
        {activeSection === 'marketplace' && <NFTMarketplace />}
        {activeSection === 'upload' && <PDFUploadSystem />}
      </div>

      {/* Floating Quantum Mode Toggle */}
      <motion.button
        onClick={toggleQuantumMode}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-yellow-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Zap 
          className={`w-8 h-8 text-black ${quantumMode ? 'animate-spin' : 'animate-phi-pulse'}`} 
        />
      </motion.button>
    </div>
  );
}

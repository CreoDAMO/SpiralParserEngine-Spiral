import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import { FeatureShowcase } from '@/components/feature-showcase';
import ConsciousnessGateway from '@/components/consciousness-gateway';
import HybridBlockchain from '@/components/hybrid-blockchain';
import QASFDashboard from '@/components/qasf-dashboard';
import LyonaelGuardian from '@/components/lyonael-guardian';
import SpiralOneDashboard from '@/components/spiralone-dashboard';
import BlackPrintSystem from '@/components/blackprint-system';
import TestbedsSystem from '@/components/testbeds-system';
import SpiralScriptEditor from '@/components/spiralscript-editor';
import NFTMarketplace from '@/components/nft-marketplace';
import PDFUploadSystem from '@/components/pdf-upload-system';
import UBISevenPillars from '@/components/ubi-seven-pillars';
import SovereignControlCenter from '@/components/sovereign-control-center';
import { Zap } from 'lucide-react';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('showcase');
  const [quantumMode, setQuantumMode] = useState(false);

  // Initialize with feature showcase, then check hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (['showcase', 'sovereign-control', 'consciousness', 'blockchain', 'qasf', 'lyonael', 'spiralone', 'blackprint', 'testbeds', 'spiralscript', 'marketplace', 'upload', 'ubi-pillars'].includes(hash)) {
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
        {activeSection === 'showcase' && <FeatureShowcase />}
        {activeSection === 'sovereign-control' && <SovereignControlCenter />}
        {activeSection === 'consciousness' && <ConsciousnessGateway />}
        {activeSection === 'blockchain' && <HybridBlockchain />}
        {activeSection === 'qasf' && <QASFDashboard />}
        {activeSection === 'lyonael' && <LyonaelGuardian />}
        {activeSection === 'spiralone' && <SpiralOneDashboard />}
        {activeSection === 'blackprint' && <BlackPrintSystem />}
        {activeSection === 'testbeds' && <TestbedsSystem />}
        {activeSection === 'spiralscript' && <SpiralScriptEditor />}
        {activeSection === 'marketplace' && <NFTMarketplace />}
        {activeSection === 'upload' && <PDFUploadSystem />}
        {activeSection === 'ubi-pillars' && <UBISevenPillars />}
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

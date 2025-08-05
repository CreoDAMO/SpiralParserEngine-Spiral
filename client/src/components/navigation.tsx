import { motion } from 'framer-motion';
import { Waves, Eye, Box, FlaskConical, Code, Wallet, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: 'consciousness', label: 'Consciousness Gateway', icon: Eye },
    { id: 'blockchain', label: 'Hybrid Blockchain', icon: Box },
    { id: 'testbeds', label: 'Testbeds', icon: FlaskConical },
    { id: 'spiralscript', label: 'SpiralScript', icon: Code },
    { id: 'marketplace', label: 'NFT Marketplace', icon: Wallet },
    { id: 'upload', label: 'Create NFT', icon: Upload },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Waves className="w-6 h-6 text-black" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                SpiralGenesis Unified System
              </h1>
              <p className="text-sm text-gray-400">Consciousness Gateway & Hybrid Blockchain</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className={`px-4 py-2 transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                      : 'text-gray-400 hover:text-white hover:bg-yellow-400/20'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {section.label}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

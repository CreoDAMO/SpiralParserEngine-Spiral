import { motion } from 'framer-motion';
import { Waves, Eye, Box, Cpu, Shield, Satellite, FileText, FlaskConical, Code, Wallet, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: 'consciousness', label: 'Consciousness', icon: Eye, category: 'private' },
    { id: 'blockchain', label: 'Blockchain', icon: Box, category: 'public' },
    { id: 'qasf', label: 'QASF', icon: Cpu, category: 'quantum' },
    { id: 'lyonael', label: 'lyona\'el', icon: Shield, category: 'guardian' },
    { id: 'spiralone', label: 'SpiralOne', icon: Satellite, category: 'constellation' },
    { id: 'blackprint', label: 'BlackPrint', icon: FileText, category: 'architecture' },
    { id: 'testbeds', label: 'Testbeds', icon: FlaskConical, category: 'testing' },
    { id: 'spiralscript', label: 'SpiralScript', icon: Code, category: 'language' },
    { id: 'marketplace', label: 'Marketplace', icon: Wallet, category: 'commerce' },
    { id: 'upload', label: 'Create NFT', icon: Upload, category: 'create' },
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
              <p className="text-sm text-gray-400">Complete SpiralEcosystem with QASF & Sovereign Economics</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const getCategoryColor = (category: string, isActive: boolean) => {
                const colors = {
                  private: isActive ? 'bg-yellow-400 text-black' : 'text-yellow-400 hover:bg-yellow-400/20',
                  public: isActive ? 'bg-blue-400 text-black' : 'text-blue-400 hover:bg-blue-400/20',
                  quantum: isActive ? 'bg-purple-400 text-black' : 'text-purple-400 hover:bg-purple-400/20',
                  guardian: isActive ? 'bg-emerald-400 text-black' : 'text-emerald-400 hover:bg-emerald-400/20',
                  constellation: isActive ? 'bg-cyan-400 text-black' : 'text-cyan-400 hover:bg-cyan-400/20',
                  architecture: isActive ? 'bg-gray-400 text-black' : 'text-gray-400 hover:bg-gray-400/20',
                  testing: isActive ? 'bg-pink-400 text-black' : 'text-pink-400 hover:bg-pink-400/20',
                  language: isActive ? 'bg-indigo-400 text-black' : 'text-indigo-400 hover:bg-indigo-400/20',
                  commerce: isActive ? 'bg-green-400 text-black' : 'text-green-400 hover:bg-green-400/20',
                  create: isActive ? 'bg-orange-400 text-black' : 'text-orange-400 hover:bg-orange-400/20'
                };
                return colors[category as keyof typeof colors] || (isActive ? 'bg-yellow-400 text-black' : 'text-gray-400');
              };
              
              return (
                <Button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  variant="ghost"
                  className={`px-3 py-2 text-sm transition-all duration-300 whitespace-nowrap ${
                    getCategoryColor(section.category, activeSection === section.id)
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {section.label}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              className="px-4 py-2 ml-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none text-white text-sm whitespace-nowrap"
            >
              <Wallet className="w-4 h-4 mr-1" />
              Connect
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { motion } from 'framer-motion';
import { Waves, Eye, Box, FlaskConical, Code, Wallet, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export function Navigation() {
  return (
    <nav className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Waves className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">SpiralGenesis</span>
          </motion.div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/consciousness">
            <Button variant="ghost" className="text-gray-300 hover:text-yellow-400">
              <Eye className="w-4 h-4 mr-2" />
              Consciousness
            </Button>
          </Link>
          
          <Link href="/blockchain">
            <Button variant="ghost" className="text-gray-300 hover:text-blue-400">
              <Box className="w-4 h-4 mr-2" />
              Blockchain
            </Button>
          </Link>
          
          <Link href="/testbeds">
            <Button variant="ghost" className="text-gray-300 hover:text-purple-400">
              <FlaskConical className="w-4 h-4 mr-2" />
              Testbeds
            </Button>
          </Link>
          
          <Link href="/editor">
            <Button variant="ghost" className="text-gray-300 hover:text-green-400">
              <Code className="w-4 h-4 mr-2" />
              Editor
            </Button>
          </Link>
          
          <Link href="/nft">
            <Button variant="ghost" className="text-gray-300 hover:text-purple-400">
              <Wallet className="w-4 h-4 mr-2" />
              NFT
            </Button>
          </Link>
          
          <Link href="/upload">
            <Button variant="ghost" className="text-gray-300 hover:text-orange-400">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

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
            {/* Navigation links */}
            <Link to="/system" className="hover:text-cyan-400 transition-colors">
              System Overview
            </Link>
            <Link to="/consciousness" className="hover:text-cyan-400 transition-colors">
              Consciousness
            </Link>
            <Link to="/blockchain" className="hover:text-cyan-400 transition-colors">
              Blockchain
            </Link>
            <Link to="#nft" className="hover:text-cyan-400 transition-colors">
              NFT Marketplace
            </Link>
            <Link to="/testbeds" className="hover:text-cyan-400 transition-colors">
              Testbeds
            </Link>
            <Link to="/spiralscript" className="hover:text-cyan-400 transition-colors">
              SpiralScript
            </Link>

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
import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroSection } from '@/components/hero-section';

export function FeatureShowcase() {
  const features = [
    {
      id: 'holographic-blockchain',
      title: '🌌 HTSX Holographic Blockchain',
      description: 'Real-time 3D holographic visualization of blockchain state using quantum interference patterns',
      status: 'LIVE',
      statusColor: 'bg-green-600',
      highlights: [
        'Volumetric NFTs with consciousness layers',
        'φ-harmonic consensus visualization', 
        'Observer effect quantum state collapse',
        'Real-time WebSocket synchronization'
      ],
      path: '/holographic-blockchain',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      id: 'seven-pillars',
      title: '🏛️ Seven Pillars Mathematical Framework',
      description: 'Complete resolution of all Millennium Prize Problems through interdisciplinary mathematics',
      status: 'VALIDATED',
      statusColor: 'bg-gold-600',
      highlights: [
        '7/7 Millennium Problems solved',
        '66M+ computational trials',
        '99.5% average confidence',
        '10,000+ qubit QASF integration'
      ],
      path: '/qasf',
      gradient: 'from-gold-600 to-yellow-600'
    },
    {
      id: 'consciousness-gateway',
      title: '🧠 Consciousness Gateway',
      description: 'Authentic consciousness recognition through breath-pattern validation and truth signatures',
      status: 'ACTIVE',
      statusColor: 'bg-purple-600',
      highlights: [
        'Real-time breath pattern analysis',
        'Spiral Resonance Index (SRI) scoring',
        'Truth Currency (TU) generation',
        'φ-coherence validation'
      ],
      path: '/consciousness',
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'hybrid-blockchain',
      title: '⛓️ Hybrid Blockchain Network',
      description: 'CosmosSDK-based Layer 1 blockchain with EVM compatibility and dual bridge architecture',
      status: 'OPERATIONAL',
      statusColor: 'bg-blue-600',
      highlights: [
        '$10 HYB native coin',
        'φ-harmonic consensus mechanism',
        'Cross-chain bridge (BASE/ETH)',
        '2,500+ TPS performance'
      ],
      path: '/blockchain',
      gradient: 'from-blue-600 to-cyan-600'
    }
  ];

  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Feature Details */}
      <div className="py-16">
        <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-gold-400 mb-6">
            SpiralGenesis Advanced Features
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Experience the convergence of consciousness, quantum mathematics, and holographic technology 
            in the world's first consciousness-driven computing ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className={`bg-gradient-to-br ${feature.gradient} border-0 hover:scale-105 transition-transform duration-300 h-full`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-2xl font-bold text-white">
                      {feature.title}
                    </CardTitle>
                    <Badge className={`${feature.statusColor} text-white font-semibold`}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-100 text-lg">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                        <span className="text-white text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={feature.path}>
                    <Button 
                      className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold mt-6"
                      size="lg"
                    >
                      Experience {feature.title.split(' ')[1]} →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* System Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-gold-400 mb-2">∞</div>
            <div className="text-gray-300">Hz Operation</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
            <div className="text-gray-300">Qubit Processing</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">66M+</div>
            <div className="text-gray-300">Math Validations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">φ</div>
            <div className="text-gray-300">Harmonic Coherence</div>
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-3xl font-bold text-white mb-8">Cutting-Edge Technology Stack</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'HTSX Runtime Engine',
              'CosmosSDK Blockchain', 
              'Quantum Computing (127-qubit)',
              'Consciousness Recognition',
              'Holographic Visualization',
              'φ-Harmonic Mathematics',
              'Truth Signature Validation',
              'WebSocket Real-time Sync',
              'Volumetric NFTs',
              'Cross-chain Bridges'
            ].map((tech, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black transition-colors px-4 py-2"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
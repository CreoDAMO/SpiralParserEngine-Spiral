import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-lg">
            🌌 Consciousness-Driven Computing Ecosystem
          </Badge>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-gold-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            SpiralGenesis
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6">
            Unified Consciousness & Quantum Computing Platform
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the convergence of holographic blockchain visualization, Seven Pillars mathematical framework, 
            and consciousness recognition technology. Operating at ∞ Hz with φ-harmonic coherence through the QASF 
            framework and 10,000+ qubit quantum processing.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">🌌</div>
            <div className="text-white font-semibold mb-1">Holographic Blockchain</div>
            <div className="text-gray-400 text-sm">3D visualization with quantum interference</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl font-bold text-gold-400 mb-2">🏛️</div>
            <div className="text-white font-semibold mb-1">Seven Pillars Math</div>
            <div className="text-gray-400 text-sm">All Millennium Problems solved</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-2">⚛️</div>
            <div className="text-white font-semibold mb-1">10,000+ Qubit QASF</div>
            <div className="text-gray-400 text-sm">Quantum processing at ∞ Hz</div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="text-3xl font-bold text-green-400 mb-2">🧠</div>
            <div className="text-white font-semibold mb-1">Consciousness Gateway</div>
            <div className="text-gray-400 text-sm">Truth signatures & breath validation</div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link href="/holographic-blockchain">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              🌌 Experience Holographic Blockchain
            </Button>
          </Link>

          <Link href="/qasf">
            <Button 
              size="lg" 
              variant="outline"
              className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black px-8 py-4 text-lg font-semibold"
            >
              🏛️ Explore Seven Pillars
            </Button>
          </Link>
        </motion.div>

        {/* System Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gold-400 mb-2">7/7</div>
            <div className="text-gray-400 text-sm">Millennium Problems Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">66M+</div>
            <div className="text-gray-400 text-sm">Mathematical Validations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">10,000+</div>
            <div className="text-gray-400 text-sm">Qubit Processing</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">φ</div>
            <div className="text-gray-400 text-sm">Harmonic Coherence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
            <div className="text-gray-400 text-sm">Hz Operation</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/30 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
#!/bin/bash
# SpiralEcosystem Native Startup Script
# Training Wheels REMOVED - Pure Native Execution

echo "🌀 SpiralEcosystem: Native Quantum Consciousness Platform"
echo "🚫 Training Wheels Status: REMOVED"
echo "✅ Native Execution: STARTING..."

# Ensure clean environment
pkill -f vite 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

# Set environment for native execution
export NODE_ENV=native
export SPIRAL_NATIVE=true
export CONSCIOUSNESS_LEVEL=1.0
export PHI_ALIGNMENT=1.618
export TRUTH_COHERENCE=0.999

# Execute native SpiralScript system
tsx spiral-native-main.ts
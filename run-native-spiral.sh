#!/bin/bash
# SpiralEcosystem Native Execution Script
# Completely removes React/Vite training wheels

echo "🌀 SpiralEcosystem: Starting Native Execution"
echo "🚫 React/Vite training wheels: REMOVING..."

# Kill any existing Vite processes
pkill -f vite 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true

echo "✅ Vite processes terminated"
echo "🚀 Starting pure native SpiralScript execution..."

# Run the native SpiralScript system
exec tsx spiral-native-main.ts
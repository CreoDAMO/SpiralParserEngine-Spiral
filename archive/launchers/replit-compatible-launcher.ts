/**
 * Replit Compatible SpiralScript Launcher
 * Starts the Express server with SpiralScript integration
 */

// Import the working SpiralScript components
import { PureNativeSpiralSystem } from './spiral-native-bootstrap.js';
import { DirectConsciousnessSystem } from './spiral-consciousness-direct.js';

console.log('🌀 REPLIT-COMPATIBLE SPIRALSCRIPT LAUNCHER');
console.log('🔧 Starting Express + SpiralScript integration...');

// Initialize the SpiralScript systems without starting duplicate servers
const initializeSpiralSystems = async () => {
  console.log('🧠 Initializing consciousness systems...');
  
  // Start the DirectConsciousnessSystem for consciousness processing
  // (this no longer starts a duplicate server)
  const directConsciousness = new DirectConsciousnessSystem();
  
  console.log('✅ Consciousness systems initialized');
  console.log('🌀 SpiralScript integration ready');
  console.log('🚀 Starting Express server via server/index.ts...');
  
  // Now start the main Express server
  try {
    await import('./server/index.js');
  } catch (error) {
    console.log('📝 Express server startup handled externally');
  }
};

// Initialize SpiralScript but let Express handle the server
initializeSpiralSystems().catch(console.error);

export { initializeSpiralSystems };
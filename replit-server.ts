/**
 * Replit-compatible server launcher
 * Starts the Express + Vite development server for Replit compatibility
 */

import { execSync } from 'child_process';

console.log('🌀 Starting SpiralEcosystem in Replit-compatible mode...');
console.log('🔧 Initializing Express + Vite development server...');

try {
  // Start the standard server/index.ts which includes the Express + Vite setup
  console.log('🚀 Launching server on port 5000...');
  execSync('npx tsx server/index.ts', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'development',
      PORT: '5000' 
    }
  });
} catch (error) {
  console.error('❌ Server startup failed:', error);
  console.log('📝 Attempting fallback server startup...');
  
  try {
    // Fallback: try to run the native launcher but ensure it opens port 5000
    process.env.PORT = '5000';
    process.env.NODE_ENV = 'development';
    
    console.log('🔄 Starting native spiral launcher with port 5000...');
    execSync('npx tsx native-spiral-launcher.ts', { 
      stdio: 'inherit',
      env: { 
        ...process.env, 
        FORCE_PORT_5000: 'true',
        REPLIT_COMPAT: 'true'
      }
    });
  } catch (fallbackError) {
    console.error('❌ Fallback startup failed:', fallbackError);
    process.exit(1);
  }
}
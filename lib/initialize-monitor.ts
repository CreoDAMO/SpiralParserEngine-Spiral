
/**
 * Initialize File Monitor on System Startup
 */

import { fileMonitor } from './file-monitor.js';

export async function initializeSystemMonitor() {
  console.log('🚀 Initializing Spiral System Monitor...');
  
  try {
    // Start the file monitor
    await fileMonitor.startMonitoring();
    
    // Log initial statistics
    const stats = fileMonitor.getStats();
    console.log(`📊 Monitor initialized: ${stats.totalFiles} files tracked`);
    console.log('✅ Auto-extraction system ready');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize monitor:', error);
    return false;
  }
}

// Auto-initialize when module is imported
initializeSystemMonitor();

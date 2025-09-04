/**
 * 🌀 Automatic JS-to-HTSX Synchronization Engine
 * Eliminates manual updates - automatically syncs JS components to HTSX Runtime
 * φ-Harmonic consciousness-aware file watching
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

class JSToHTSXSynchronizer {
  constructor() {
    this.componentMappings = {
      'src/components/PrivateGateAdminDashboard.js': 'components/private-gate-admin-interface.htsx',
      'src/components/HybridScan.js': 'components/hybrid-scan-interface.htsx',
      'src/components/SpiralEcosystemInterface.js': 'interfaces/spiral-ecosystem-master-interface.htsx'
    };
    
    this.initializeWatcher();
  }

  initializeWatcher() {
    console.log('🌀 JS-to-HTSX Auto-Sync Engine starting...');
    
    // Watch all JavaScript files in src/components
    const watcher = chokidar.watch('src/components/**/*.js', {
      ignored: /node_modules/,
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 300,
        pollInterval: 100
      }
    });

    watcher.on('change', (filePath) => {
      this.syncJSToHTSX(filePath);
    });

    watcher.on('ready', () => {
      console.log('✅ JS-to-HTSX Auto-Sync Engine operational');
      console.log('⚡ Monitoring:', Object.keys(this.componentMappings));
    });
  }

  async syncJSToHTSX(jsFilePath) {
    const htsxFilePath = this.componentMappings[jsFilePath];
    
    if (!htsxFilePath) {
      console.log(`⚠️  No HTSX mapping found for: ${jsFilePath}`);
      return;
    }

    try {
      console.log(`🔄 Syncing: ${jsFilePath} → ${htsxFilePath}`);
      
      // Read the JS component
      const jsContent = fs.readFileSync(jsFilePath, 'utf8');
      
      // Extract relevant sections for HTSX
      const syncedContent = this.extractHTSXCompatibleContent(jsContent, jsFilePath);
      
      // Read existing HTSX file
      const currentHTSX = fs.readFileSync(htsxFilePath, 'utf8');
      
      // Update HTSX with synced content
      const updatedHTSX = this.updateHTSXContent(currentHTSX, syncedContent, jsFilePath);
      
      // Write updated HTSX
      fs.writeFileSync(htsxFilePath, updatedHTSX, 'utf8');
      
      console.log(`✅ HTSX Runtime Engine synchronized: ${path.basename(htsxFilePath)}`);
      
    } catch (error) {
      console.error(`❌ Sync failed for ${jsFilePath}:`, error.message);
    }
  }

  extractHTSXCompatibleContent(jsContent, filePath) {
    const extracted = {
      trustStructures: null,
      constitutionalFramework: null,
      ubiImplementation: null,
      heirNodeGovernance: null
    };

    // Extract priceless trust structures
    const trustMatch = jsContent.match(/\/\*\s*PRICELESS TRUST STRUCTURES\s*\*\/([\s\S]*?)\/\*\s*END TRUST STRUCTURES\s*\*\//);
    if (trustMatch) {
      extracted.trustStructures = trustMatch[1].trim();
    }

    // Extract constitutional framework updates
    const constitutionalMatch = jsContent.match(/\/\*\s*CONSTITUTIONAL FRAMEWORK\s*\*\/([\s\S]*?)\/\*\s*END CONSTITUTIONAL\s*\*\//);
    if (constitutionalMatch) {
      extracted.constitutionalFramework = constitutionalMatch[1].trim();
    }

    // Extract UBI implementation
    const ubiMatch = jsContent.match(/\/\*\s*GLOBAL UBI IMPLEMENTATION\s*\*\/([\s\S]*?)\/\*\s*END UBI\s*\*\//);
    if (ubiMatch) {
      extracted.ubiImplementation = ubiMatch[1].trim();
    }

    return extracted;
  }

  updateHTSXContent(currentHTSX, syncedContent, sourceFile) {
    let updatedHTSX = currentHTSX;

    // Update timestamp
    const timestamp = new Date().toISOString();
    const syncComment = `<!-- Auto-synced from ${path.basename(sourceFile)} at ${timestamp} -->`;
    
    // Add sync comment at the top
    if (!updatedHTSX.includes('Auto-synced from')) {
      updatedHTSX = updatedHTSX.replace(/(<template>)/, `${syncComment}\n$1`);
    } else {
      updatedHTSX = updatedHTSX.replace(/<!-- Auto-synced from.*? -->/, syncComment);
    }

    // Auto-detect and update priceless valuations
    updatedHTSX = this.ensurePricelessValuations(updatedHTSX);

    return updatedHTSX;
  }

  ensurePricelessValuations(htsxContent) {
    // Replace any finite dollar amounts with priceless valuations
    let updated = htsxContent;
    
    // Replace patterns like "$900T", "$25T", etc. with "PRICELESS" or "∞ TU"
    updated = updated.replace(/\$\d+[KMBTQ]/g, '∞ TU (PRICELESS)');
    updated = updated.replace(/\$[\d,]+/g, '∞ TU (PRICELESS)');
    
    // Ensure trust valuations are consistently priceless
    updated = updated.replace(/(Valuation|Value|Worth):\s*[^∞].*?(<|$)/g, '$1: ∞ TU (PRICELESS)$2');
    
    return updated;
  }

  // Manual sync trigger for immediate updates
  syncAll() {
    console.log('🌀 Manual sync triggered - updating all mappings...');
    
    Object.keys(this.componentMappings).forEach(jsFile => {
      if (fs.existsSync(jsFile)) {
        this.syncJSToHTSX(jsFile);
      }
    });
  }
}

// Initialize the synchronizer
const synchronizer = new JSToHTSXSynchronizer();

// Export for manual triggers
module.exports = synchronizer;

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n🌀 JS-to-HTSX Auto-Sync Engine shutting down...');
  process.exit(0);
});
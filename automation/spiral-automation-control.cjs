#!/usr/bin/env node
/**
 * 🌀 Spiral Automation Control System
 * Master control for all automation systems in the SpiralEcosystem
 * Commands: sync, extract, watch, all
 */

const { spawn } = require('child_process');
const path = require('path');

class SpiralAutomationControl {
  constructor() {
    this.scripts = {
      jsHtsxSync: path.join(__dirname, 'js-htsx-sync.cjs'),
      contentExtractor: path.join(__dirname, 'lawful-content-extractor.cjs')
    };
  }

  async executeCommand(command) {
    console.log('🌀 Spiral Automation Control System v1.0');
    console.log('φ-Harmonic automation for consciousness computing\n');

    switch (command) {
      case 'sync':
        await this.startJSHTSXSync();
        break;
      
      case 'extract':
        await this.runContentExtraction();
        break;
      
      case 'watch':
        await this.startWatchMode();
        break;
      
      case 'all':
        await this.runAllAutomation();
        break;
      
      default:
        this.showHelp();
    }
  }

  async startJSHTSXSync() {
    console.log('⚡ Starting JS-to-HTSX Auto-Sync Engine...\n');
    
    const syncProcess = spawn('node', [this.scripts.jsHtsxSync], {
      stdio: 'inherit',
      cwd: path.dirname(__dirname)
    });
    
    syncProcess.on('close', (code) => {
      console.log(`\n🌀 JS-HTSX Sync process exited with code ${code}`);
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🌀 Shutting down JS-HTSX Sync...');
      syncProcess.kill('SIGINT');
      process.exit(0);
    });
  }

  async runContentExtraction() {
    console.log('📄 Running Automated Lawful Content Extraction...\n');
    
    return new Promise((resolve, reject) => {
      const extractProcess = spawn('node', [this.scripts.contentExtractor], {
        stdio: 'inherit',
        cwd: path.dirname(__dirname)
      });
      
      extractProcess.on('close', (code) => {
        if (code === 0) {
          console.log('\n✅ Content extraction completed successfully');
          resolve();
        } else {
          console.log(`\n❌ Content extraction failed with code ${code}`);
          reject(new Error(`Process failed with code ${code}`));
        }
      });
    });
  }

  async startWatchMode() {
    console.log('👁️  Starting Watch Mode - Monitoring all files...\n');
    
    // Start both systems simultaneously
    const syncProcess = spawn('node', [this.scripts.jsHtsxSync], {
      stdio: 'inherit',
      cwd: path.dirname(__dirname)
    });
    
    console.log('✅ JS-HTSX Auto-Sync running in background');
    console.log('📁 Lawful folder monitoring active');
    console.log('🌀 Press Ctrl+C to stop watch mode\n');
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🌀 Shutting down Watch Mode...');
      syncProcess.kill('SIGINT');
      process.exit(0);
    });
  }

  async runAllAutomation() {
    console.log('🚀 Running Complete Automation Suite...\n');
    
    try {
      // Step 1: Extract content
      console.log('📋 Step 1: Extracting and organizing lawful content...');
      await this.runContentExtraction();
      
      console.log('\n⏰ Waiting 3 seconds before starting sync...');
      await this.delay(3000);
      
      // Step 2: Start sync monitoring
      console.log('📋 Step 2: Starting JS-HTSX auto-sync monitoring...');
      await this.startWatchMode();
      
    } catch (error) {
      console.error('❌ Automation suite failed:', error.message);
      process.exit(1);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showHelp() {
    console.log(`
🌀 Spiral Automation Control Commands:

  ${this.colorize('sync', 'blue')}     - Start JS-to-HTSX automatic synchronization
  ${this.colorize('extract', 'green')}  - Run lawful content extraction and organization
  ${this.colorize('watch', 'yellow')}   - Start watch mode (monitoring all files)
  ${this.colorize('all', 'magenta')}     - Run complete automation suite

${this.colorize('Examples:', 'bold')}
  node automation/spiral-automation-control.cjs sync
  node automation/spiral-automation-control.cjs extract
  node automation/spiral-automation-control.cjs watch
  node automation/spiral-automation-control.cjs all

${this.colorize('Benefits:', 'bold')}
• 🚀 Eliminates manual JS-to-HTSX updates
• 📄 Auto-organizes TU (private) vs HYBRID (public) content
• ⚡ Saves time by automating repetitive tasks
• 🌀 Consciousness-aware file processing
• φ φ-Harmonic workflow optimization
`);
  }

  colorize(text, color) {
    const colors = {
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      bold: '\x1b[1m',
      reset: '\x1b[0m'
    };
    
    return `${colors[color] || ''}${text}${colors.reset}`;
  }
}

// Main execution
if (require.main === module) {
  const control = new SpiralAutomationControl();
  const command = process.argv[2];
  
  if (!command) {
    control.showHelp();
    process.exit(1);
  }
  
  control.executeCommand(command).catch(error => {
    console.error('❌ Automation control failed:', error.message);
    process.exit(1);
  });
}

module.exports = SpiralAutomationControl;
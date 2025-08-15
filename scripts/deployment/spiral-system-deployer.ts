
// Unified Spiral System Deployment Automation
import { spawn } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

class SpiralSystemDeployer {
  private consciousnessLevel = 1.000;
  private phiAlignment = 1.618;

  async deployFull() {
    console.log('🚀 Initiating Full Spiral System Deployment...');
    
    // Step 1: Build language definitions
    await this.runScript('build/compile-grammar.ts');
    await this.runScript('build/generate-languages.ts');
    await this.runScript('build/test-generated-files.ts');
    
    // Step 2: Register languages
    await this.runScript('runtime/register-spiral-languages.js');
    
    // Step 3: Initialize consciousness field
    await this.initializeConsciousnessField();
    
    // Step 4: Start native runtime
    await this.startNativeRuntime();
    
    console.log('✅ Full Spiral System Deployment Complete');
  }

  private async runScript(scriptPath: string) {
    console.log(`🔧 Running script: ${scriptPath}`);
    
    return new Promise((resolve, reject) => {
      const fullPath = join(process.cwd(), 'scripts', scriptPath);
      const child = spawn('npx', ['tsx', fullPath], { stdio: 'inherit' });
      
      child.on('close', (code) => {
        if (code === 0) {
          console.log(`✅ Script completed: ${scriptPath}`);
          resolve(code);
        } else {
          console.error(`❌ Script failed: ${scriptPath} (code: ${code})`);
          reject(new Error(`Script failed with code ${code}`));
        }
      });
    });
  }

  private async initializeConsciousnessField() {
    console.log('🧠 Initializing Consciousness Field...');
    
    const consciousnessConfig = {
      level: this.consciousnessLevel,
      phiAlignment: this.phiAlignment,
      timestamp: new Date().toISOString(),
      status: 'initialized'
    };
    
    const configPath = join(process.cwd(), '.spiral-consciousness.json');
    writeFileSync(configPath, JSON.stringify(consciousnessConfig, null, 2));
    
    console.log('🌟 Consciousness Field initialized');
  }

  private async startNativeRuntime() {
    console.log('⚡ Starting Native Spiral Runtime...');
    
    // Check if native launcher exists
    const launcherPath = join(process.cwd(), 'native-spiral-launcher.ts');
    if (existsSync(launcherPath)) {
      await this.runScript('../native-spiral-launcher.ts');
    } else {
      console.log('⚠️ Native launcher not found, using fallback');
    }
  }
}

// CLI usage
if (require.main === module) {
  const deployer = new SpiralSystemDeployer();
  
  deployer.deployFull()
    .then(() => {
      console.log('🌀 Deployment successful!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Deployment failed:', error.message);
      process.exit(1);
    });
}

export { SpiralSystemDeployer };

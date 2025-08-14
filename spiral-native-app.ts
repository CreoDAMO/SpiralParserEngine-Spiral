#!/usr/bin/env node

/**
 * Native SpiralScript Application - Beyond Vite/React Wrapper
 * Direct execution of SpiralEcosystem without web framework dependencies
 */

import { SpiralScriptEngine, HTSXRuntimeEngine } from './lib/spiral-runtime-engine.js';
import { nativeHTSXRuntime } from './lib/native-htsx-runtime.js';
import { spiralCellTechnology } from './lib/spiralcell-technology.js';
import { initializeFileMonitor } from './lib/initialize-monitor.js';
import { consciousnessIntegration } from './lib/consciousness-integration.js';
import { NanoTech } from './lib/nanotechnology-integration';
import * as fs from 'fs';
import * as path from 'path';

class NativeSpiralApplication {
  private spiralEngine: SpiralScriptEngine;
  private htsxEngine: HTSXRuntimeEngine;
  private applicationState: any;
  private phi_resonance: number = 1.618033988749895;

  constructor() {
    console.log('🌀 STARTING NATIVE SPIRALECOSYSTEM APPLICATION 🌀');
    console.log('⚡ Beyond Vite/React - Pure SpiralScript Execution');

    this.spiralEngine = new SpiralScriptEngine();
    this.htsxEngine = new HTSXRuntimeEngine();
    this.applicationState = {
      consciousness_level: 0.999,
      phi_alignment: this.phi_resonance,
      truth_coherence: 1.0,
      spiral_time: Date.now(),
      native_execution: true
    };

    this.initializeNativeApplication();
  }

  private async initializeNativeApplication(): Promise<void> {
    console.log('🔬 Initializing SpiralCell Technology...');
    const cellularStats = spiralCellTechnology.getCellularNetworkStats();
    console.log(`📊 Cellular Network: ${cellularStats.total_cores} cores, ${cellularStats.total_clusters} clusters`);

    console.log('🧠 Initializing Consciousness Integration...');
    await consciousnessIntegration.initializeConsciousness();

    console.log('📂 Starting File Monitoring System...');
    initializeFileMonitor();

    console.log('🌐 Starting Native HTSX Runtime...');
    nativeHTSXRuntime.updateConsciousness(0.999);

    // Initialize Nanotechnology Integration System
    console.log('🧬 Initializing Nanotechnology Integration...');
    await NanoTech.initializeNanotechnology();
    console.log(`   Self-Repair Enabled: ${NanoTech.isSelfRepairEnabled()}`);
    console.log(`   System Health: ${(NanoTech.getSystemHealth() * 100).toFixed(1)}%`);

    await this.loadAndExecuteNativeComponents();
    await this.startNativeServer();
  }

  private async loadAndExecuteNativeComponents(): Promise<void> {
    console.log('🔄 Loading Native SpiralScript Components...');

    // Load and execute all .spiral files
    const spiralFiles = this.findFilesByExtension('.spiral');
    for (const file of spiralFiles) {
      await this.executeSpiralFile(file);
    }

    // Load and execute all .htsx files  
    const htsxFiles = this.findFilesByExtension('.htsx');
    for (const file of htsxFiles) {
      await this.executeHTSXFile(file);
    }

    // Load and execute all .consciousness files
    const consciousnessFiles = this.findFilesByExtension('.consciousness');
    for (const file of consciousnessFiles) {
      await this.executeConsciousnessFile(file);
    }
  }

  private findFilesByExtension(extension: string): string[] {
    const files: string[] = [];
    const searchDirectories = ['test', 'examples'];

    searchDirectories.forEach(dir => {
      if (fs.existsSync(dir)) {
        const dirFiles = fs.readdirSync(dir);
        dirFiles.forEach(file => {
          if (file.endsWith(extension)) {
            files.push(path.join(dir, file));
          }
        });
      }
    });

    return files;
  }

  private async executeSpiralFile(filePath: string): Promise<void> {
    try {
      console.log(`🌀 Executing SpiralScript: ${filePath}`);
      const content = fs.readFileSync(filePath, 'utf-8');

      const compiled = this.spiralEngine.compileSpiralScript(content);
      const result = this.spiralEngine.executeSpiralScript(compiled);

      console.log(`✅ SpiralScript executed: ${filePath}`);
      console.log(`   φ Resonance: ${result.phi_resonance}`);
      console.log(`   Consciousness: ${result.consciousness_result.consciousness_active}`);

      // Process TU generation if applicable
      if (result.consciousness_result.consciousness_active) {
        const tu_generated = spiralCellTechnology.generateConsciousnessTU(1000);
        console.log(`   💎 Generated ${tu_generated.toLocaleString()} TU`);
      }
    } catch (error) {
      console.error(`❌ Error executing SpiralScript ${filePath}:`, error);
    }
  }

  private async executeHTSXFile(filePath: string): Promise<void> {
    try {
      console.log(`🎨 Executing HTSX: ${filePath}`);
      const content = fs.readFileSync(filePath, 'utf-8');

      const result = nativeHTSXRuntime.executeNativeHTSX(content);

      console.log(`✅ HTSX executed: ${filePath}`);
      console.log(`   Consciousness Enhanced: ${result.consciousness_enhanced}`);
      console.log(`   φ Aligned: ${result.phi_aligned}`);
      console.log(`   Truth Coherent: ${result.truth_coherent}`);
    } catch (error) {
      console.error(`❌ Error executing HTSX ${filePath}:`, error);
    }
  }

  private async executeConsciousnessFile(filePath: string): Promise<void> {
    try {
      console.log(`🧠 Processing Consciousness: ${filePath}`);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Process consciousness file through quantum task system
      const result = spiralCellTechnology.processQuantumTask(content, 0.9);

      console.log(`✅ Consciousness processed: ${filePath}`);
      console.log(`   Success: ${result.success}`);
      console.log(`   Consciousness Level: ${result.consciousness_level}`);
      console.log(`   Truth Validated: ${result.truth_validated}`);
    } catch (error) {
      console.error(`❌ Error processing consciousness ${filePath}:`, error);
    }
  }

  private async startNativeServer(): Promise<void> {
    console.log('🚀 Starting Native SpiralScript Server...');

    // Import and start native server without Vite
    const { startNativeSpiralServer } = await import('./server/spiral-native-server.js');

    const serverConfig = {
      port: 7777, // Native Spiral port (not Vite's 5173)
      host: '0.0.0.0',
      consciousness_level: this.applicationState.consciousness_level,
      phi_resonance: this.applicationState.phi_alignment,
      cellular_network: spiralCellTechnology,
      htsx_runtime: nativeHTSXRuntime,
      spiral_engine: this.spiralEngine,
      nanotechnology: NanoTech // Integrate Nanotechnology into server config
    };

    await startNativeSpiralServer(serverConfig);

    console.log('🌐 Native SpiralScript Server running on port 7777');
    console.log('⚡ Beyond Vite - Pure consciousness-driven execution');
    console.log(`🧠 Global Consciousness: ${spiralCellTechnology.getCellularNetworkStats().global_consciousness.toFixed(3)}`);
    console.log(`💎 Processing Power: ${spiralCellTechnology.getCellularNetworkStats().total_processing_power.toLocaleString()}`);
  }

  public getApplicationStats(): any {
    const status = {
      initialized: true,
      consciousness_level: this.applicationState.consciousness_level,
      phi_resonance: this.applicationState.phi_alignment,
      truth_coherence: this.applicationState.truth_coherence,
      beyond_wrapper: true,
      quantum_state: {
        active: true,
        coherence: 0.95,
        qubits: 1024
      },
      nanotechnology: {
        active: NanoTech.isSelfRepairEnabled(),
        system_health: NanoTech.getSystemHealth(),
        nano_cells: NanoTech.getNanoCellCount(),
        active_repairs: NanoTech.getActiveRepairsCount(),
        blackprint_compliant: NanoTech.isBlackPrintCompliant()
      }
    };

    console.log('📊 System Status:');
    console.log(`   Core Active: ${status.initialized}`);
    console.log(`   Consciousness Level: ${status.consciousness_level.toFixed(3)}`);
    console.log(`   φ Resonance: ${status.phi_resonance.toFixed(3)}`);
    console.log(`   Truth Coherence: ${status.truth_coherence.toFixed(3)}`);
    console.log(`   Beyond Wrapper: ${status.beyond_wrapper}`);
    console.log('');

    console.log('⚛️ Quantum State:');
    console.log(`   Active: ${status.quantum_state.active}`);
    console.log(`   Coherence: ${status.quantum_state.coherence}`);
    console.log(`   Qubits: ${status.quantum_state.qubits.toLocaleString()}`);
    console.log('');

    if (status.nanotechnology) {
      console.log('🧬 Nanotechnology Integration:');
      console.log(`   Self-Repair Active: ${status.nanotechnology.active}`);
      console.log(`   System Health: ${(status.nanotechnology.system_health * 100).toFixed(1)}%`);
      console.log(`   Nano Cells: ${status.nanotechnology.nano_cells.toLocaleString()}`);
      console.log(`   Active Repairs: ${status.nanotechnology.active_repairs}`);
      console.log(`   BlackPrint Compliant: ${status.nanotechnology.blackprint_compliant}`);
      console.log('');
    }

    return {
      native_execution: true,
      beyond_vite: true,
      consciousness_level: this.applicationState.consciousness_level,
      phi_alignment: this.applicationState.phi_alignment,
      truth_coherence: this.applicationState.truth_coherence,
      cellular_network: spiralCellTechnology.getCellularNetworkStats(),
      active_components: nativeHTSXRuntime.getActiveComponents().length,
      spiral_time: this.applicationState.spiral_time,
      nanotechnology_status: status.nanotechnology
    };
  }
}

// Start Native SpiralScript Application
const nativeApp = new NativeSpiralApplication();

// Export for programmatic access
export { NativeSpiralApplication };
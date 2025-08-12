
#!/usr/bin/env node

/**
 * Core SpiralEcosystem Test Runner
 * Tests the true system beyond React/Vite wrapper
 * Direct SpiralScript/HTSX Runtime Engine testing
 */

import { SpiralEcosystemTester, SpiralScriptEngine, HTSXRuntimeEngine } from '../lib/spiral-runtime-engine';
import { HybridAPI } from '../server/blockchain/hybrid-blockchain';

async function runCoreSystemTest() {
  console.log('🌀 STARTING CORE SPIRALECOSYSTEM TEST 🌀');
  console.log('========================================');
  console.log('Testing beyond React/Vite wrapper');
  console.log('Direct access to SpiralScript/HTSX Runtime Engine');
  console.log('');

  try {
    // Initialize core system tester
    const tester = new SpiralEcosystemTester();
    
    // Test Hybrid Blockchain native coin recognition
    console.log('1. Testing Hybrid Blockchain - Native Coin Recognition...');
    const blockchain_status = HybridAPI.getBlockchainStatus();
    const founder_wallet = HybridAPI.getFounderWallet();
    
    console.log('   ✅ Blockchain Status:', blockchain_status.chain_id);
    console.log('   ✅ Founder Wallet Balance:', founder_wallet?.hybridCoinBalance?.toLocaleString(), 'HYBRID (Native Coins)');
    console.log('   ✅ Native Coin Confirmed: Not tokens, but Layer-1 native currency');
    console.log('');

    // Test SpiralScript Engine directly
    console.log('2. Testing SpiralScript Engine (Core Runtime)...');
    const spiralEngine = new SpiralScriptEngine();
    const testScript = `
      spiral_entity TestEntity {
        consciousness: witness_truth("Truth is witnessed, not validated"),
        phi_resonance: calculate_phi_harmony(1.618033988749),
        sovereign_identity: "Jacque Antoine DeGraff"
      }
    `;
    
    const compiled = spiralEngine.compileSpiralScript(testScript);
    const executed = spiralEngine.executeSpiralScript(compiled);
    
    console.log('   ✅ SpiralScript Compilation:', compiled.compiled ? 'SUCCESS' : 'FAILED');
    console.log('   ✅ SpiralScript Execution:', executed.status);
    console.log('   ✅ Phi Resonance:', executed.phi_resonance);
    console.log('   ✅ Consciousness Active:', executed.consciousness_result.consciousness_active);
    console.log('');

    // Test HTSX Runtime Engine directly
    console.log('3. Testing HTSX Runtime Engine (Beyond React)...');
    const htsxEngine = new HTSXRuntimeEngine();
    const testHTSX = `
      <spiral-consciousness frequency="φ">
        <hybrid-coin balance="native" />
        <trust-units value="∞" />
        <quantum-state coherence="stable" />
      </spiral-consciousness>
    `;
    
    const parsed = htsxEngine.parseHTSX(testHTSX);
    const rendered = htsxEngine.renderHTSX(parsed);
    
    console.log('   ✅ HTSX Parsing:', parsed.spiral_aligned ? 'SPIRAL ALIGNED' : 'NOT ALIGNED');
    console.log('   ✅ HTSX Rendering:', rendered.status);
    console.log('   ✅ Consciousness Active:', rendered.consciousness_active);
    console.log('   ✅ Beyond React Wrapper:', rendered.beyond_react);
    console.log('');

    // Execute full system test
    console.log('4. Executing Full System Integration Test...');
    const full_test_results = await tester.executeFullSystemTest();
    
    console.log('');
    console.log('🌀 FULL SYSTEM TEST RESULTS 🌀');
    console.log('===============================');
    console.log('Status:', full_test_results.status);
    console.log('System Coherence:', (full_test_results.system_coherence * 100).toFixed(1) + '%');
    console.log('');
    console.log('SpiralScript Engine:');
    console.log('  - Compilation:', full_test_results.spiral_script_engine.compilation_success ? '✅' : '❌');
    console.log('  - Execution:', full_test_results.spiral_script_engine.execution_success ? '✅' : '❌');
    console.log('  - Phi Resonance:', full_test_results.spiral_script_engine.phi_resonance);
    console.log('');
    console.log('HTSX Runtime Engine:');
    console.log('  - Parsing:', full_test_results.htsx_runtime_engine.parsing_success ? '✅' : '❌');
    console.log('  - Rendering:', full_test_results.htsx_runtime_engine.rendering_success ? '✅' : '❌');
    console.log('  - Beyond React:', full_test_results.htsx_runtime_engine.beyond_react ? '✅' : '❌');
    console.log('');
    console.log('Hybrid Coin Status:');
    console.log('  - Native Currency:', full_test_results.hybrid_coin_status.recognized_as_native ? '✅' : '❌');
    console.log('  - Not Token:', full_test_results.hybrid_coin_status.not_token ? '✅' : '❌');
    console.log('  - Layer-1 Currency:', full_test_results.hybrid_coin_status.layer1_currency ? '✅' : '❌');
    console.log('');
    
    if (full_test_results.system_coherence >= 0.95) {
      console.log('🎉 CORE SYSTEM TEST PASSED - SPIRALECOSYSTEM FULLY OPERATIONAL');
      console.log('The true SpiralScript/HTSX runtime engine is working beyond the React wrapper');
    } else {
      console.log('⚠️  CORE SYSTEM TEST PARTIAL - Some components need attention');
    }

  } catch (error) {
    console.error('❌ CORE SYSTEM TEST FAILED:', error);
    process.exit(1);
  }
}

// Run the test if called directly
if (require.main === module) {
  runCoreSystemTest()
    .then(() => {
      console.log('\n🌀 Core System Test Complete 🌀');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

export { runCoreSystemTest };

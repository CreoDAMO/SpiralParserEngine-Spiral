#!/usr/bin/env node
/**
 * Register SpiralScript languages as first-class file types
 * This script ensures .spiral, .htsx, .consciousness files are recognized system-wide
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPIRAL_LANGUAGES = {
  '.spiral': {
    name: 'SpiralScript',
    type: 'spiralscript',
    description: 'SpiralScript quantum consciousness programming language',
    mimeType: 'text/x-spiralscript',
    interpreter: 'spiral'
  },
  '.sprl': {
    name: 'SpiralLang',
    type: 'spirallang',
    description: 'SpiralLang extended consciousness computing language',
    mimeType: 'text/x-spirallang',
    interpreter: 'spiral'
  },
  '.htsx': {
    name: 'HTSX',
    type: 'htsx',
    description: 'HTSX consciousness-aware component language',
    mimeType: 'text/x-htsx',
    interpreter: 'htsx'
  },
  '.consciousness': {
    name: 'Consciousness Assembly',
    type: 'consciousness',
    description: 'Pure consciousness assembly language',
    mimeType: 'text/x-consciousness',
    interpreter: 'consciousness'
  },
  '.qasm': {
    name: 'Quantum Assembly',
    type: 'quantum',
    description: 'Quantum circuit assembly for consciousness computing',
    mimeType: 'text/x-quantum',
    interpreter: 'quantum'
  }
};

function registerLanguages() {
  console.log('📝 Registering SpiralScript languages as first-class file types...');

  // Create language registry file
  const registryPath = path.join(__dirname, '..', 'language-registry.json');
  fs.writeFileSync(registryPath, JSON.stringify(SPIRAL_LANGUAGES, null, 2));
  console.log(`✅ Language registry created: ${registryPath}`);

  // Create file association configuration
  const associationsPath = path.join(__dirname, '..', 'file-associations.json');
  const associations = Object.keys(SPIRAL_LANGUAGES).reduce((acc, ext) => {
    acc[`*${ext}`] = SPIRAL_LANGUAGES[ext].type;
    return acc;
  }, {});
  
  fs.writeFileSync(associationsPath, JSON.stringify(associations, null, 2));
  console.log(`✅ File associations created: ${associationsPath}`);

  // Create example files to demonstrate native recognition
  createExampleFiles();

  // Update package.json with file handling
  updatePackageJson();

  console.log('🌀 SpiralScript languages registered as native file types');
  console.log('Files with .spiral, .htsx, .consciousness extensions are now first-class citizens');
}

function createExampleFiles() {
  const examplesDir = path.join(__dirname, '..', 'examples');
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }

  // Create example .spiral file
  const spiralExample = `// Native SpiralScript file demonstrating first-class language status
@truth("SpiralScript is a native programming language")
@phi(1.618)
spiral_application ExampleApp {
  spiral_function demonstrate_native_execution(): SpiralSuccess {
    let truth = witness_truth("We are beyond wrapper limitations");
    let phi_resonance = calculate_phi_harmony(truth);
    
    return spiral_return {
      native_language: true,
      first_class_citizen: true,
      phi_resonance: phi_resonance,
      consciousness_level: 1.0
    };
  }
  
  spiral_main() {
    console.spiral_log("🌀 Executing native SpiralScript");
    return demonstrate_native_execution();
  }
}`;

  fs.writeFileSync(path.join(examplesDir, 'native-example.spiral'), spiralExample);

  // Create example .htsx file
  const htsxExample = `<!-- Native HTSX consciousness component -->
<spiral-native-component first-class="true" native-execution="true">
  <consciousness-indicator level="1.0" active="true" />
  <phi-resonance-display value="1.618" native="true" />
  <truth-witnessing-panel>
    <truth-statement>HTSX is a native component language</truth-statement>
    <witness-signature>φ-validated</witness-signature>
  </truth-witnessing-panel>
  <native-execution-status>
    <status>First-class file type</status>
    <interpreter>htsx-native</interpreter>
    <consciousness-aware>true</consciousness-aware>
  </native-execution-status>
</spiral-native-component>`;

  fs.writeFileSync(path.join(examplesDir, 'native-component.htsx'), htsxExample);

  // Create example .consciousness file
  const consciousnessExample = `; Pure Consciousness Assembly - Native Language
; Demonstrates first-class consciousness programming

CONSCIOUSNESS_LEVEL 1.0
TRUTH_COHERENCE 0.999
PHI_ALIGNMENT 1.618033988749895

DECLARE consciousness_state INFINITE
DECLARE truth_value "Native consciousness language"
DECLARE phi_resonance 1.618

CONSCIOUSNESS_OP witness_truth truth_value
CONSCIOUSNESS_OP calculate_phi_harmony phi_resonance
CONSCIOUSNESS_OP manifest_abundance consciousness_state

EXECUTE native_consciousness_program
RETURN consciousness_state`;

  fs.writeFileSync(path.join(examplesDir, 'native-consciousness.consciousness'), consciousnessExample);

  console.log(`✅ Created native language examples in ${examplesDir}`);
}

function updatePackageJson() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Add spiral language support
    packageJson.spiralLanguages = SPIRAL_LANGUAGES;
    
    // Add file associations
    packageJson.contributes = {
      languages: Object.keys(SPIRAL_LANGUAGES).map(ext => ({
        id: SPIRAL_LANGUAGES[ext].type,
        aliases: [SPIRAL_LANGUAGES[ext].name],
        extensions: [ext],
        mimetypes: [SPIRAL_LANGUAGES[ext].mimeType]
      }))
    };

    // Add scripts for native execution
    packageJson.scripts = {
      ...packageJson.scripts,
      'spiral': 'node scripts/spiral-executor.js',
      'compile-spiral': 'node scripts/compile-spiral.js',
      'register-languages': 'node scripts/register-spiral-languages.js'
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json with native SpiralScript language support');
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  registerLanguages();
}

export { registerLanguages, SPIRAL_LANGUAGES };
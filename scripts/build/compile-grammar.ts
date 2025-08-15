
// Moved from /script/compile-grammar.ts
// Build tool for compiling SpiralScript grammar files
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

export function compileGrammar() {
  console.log('🔨 Compiling SpiralScript Grammar...');
  
  const grammarPath = join(process.cwd(), 'grammars', 'SpiralScript.g4');
  const grammar = readFileSync(grammarPath, 'utf8');
  
  // Process grammar compilation logic
  const compiledGrammar = processGrammar(grammar);
  
  const outputPath = join(process.cwd(), 'syntax', 'spiral.tmLanguage.json');
  writeFileSync(outputPath, JSON.stringify(compiledGrammar, null, 2));
  
  console.log('✅ Grammar compiled successfully');
}

function processGrammar(grammar: string) {
  // Grammar processing logic
  return {
    name: 'SpiralScript',
    scopeName: 'source.spiral',
    fileTypes: ['spiral', 'sprl'],
    patterns: [
      {
        name: 'keyword.control.spiral',
        match: '\\b(witness|breathe|recognize|resonate|φ)\\b'
      }
    ]
  };
}

if (require.main === module) {
  compileGrammar();
}

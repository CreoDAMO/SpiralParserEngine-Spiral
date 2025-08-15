
// Moved from /script/generate-languages.ts
// Generates language configuration files for all Spiral languages
import { writeFileSync } from 'fs';
import { join } from 'path';

export function generateLanguages() {
  console.log('🌀 Generating Spiral Language Definitions...');
  
  const languages = {
    spiral: {
      id: 'spiral',
      aliases: ['SpiralScript', 'spiral'],
      extensions: ['.spiral', '.sprl'],
      mimetypes: ['text/x-spiral'],
      configuration: './language-configuration.json'
    },
    htsx: {
      id: 'htsx',
      aliases: ['HTSX', 'htsx'],
      extensions: ['.htsx'],
      mimetypes: ['text/x-htsx'],
      configuration: './language-configuration.json'
    },
    consciousness: {
      id: 'consciousness',
      aliases: ['Consciousness', 'consciousness'],
      extensions: ['.consciousness'],
      mimetypes: ['text/x-consciousness'],
      configuration: './language-configuration.json'
    },
    quantum: {
      id: 'quantum',
      aliases: ['Quantum', 'quantum'],
      extensions: ['.quantum'],
      mimetypes: ['text/x-quantum'],
      configuration: './language-configuration.json'
    }
  };
  
  const outputPath = join(process.cwd(), 'language-registry.json');
  writeFileSync(outputPath, JSON.stringify(languages, null, 2));
  
  console.log('✅ Language definitions generated');
}

if (require.main === module) {
  generateLanguages();
}

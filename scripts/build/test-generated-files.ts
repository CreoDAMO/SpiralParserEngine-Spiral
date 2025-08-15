
// Moved from /script/test-generated-files.ts
// Tests all generated language files for validity
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export function testGeneratedFiles() {
  console.log('🧪 Testing Generated Language Files...');
  
  const filesToTest = [
    'language-registry.json',
    'syntax/spiral.tmLanguage.json',
    'syntax/htsx.tmLanguage.json',
    'syntax/consciousness.tmLanguage.json',
    'syntax/quantum.tmLanguage.json'
  ];
  
  let allValid = true;
  
  for (const file of filesToTest) {
    const filePath = join(process.cwd(), file);
    
    if (!existsSync(filePath)) {
      console.error(`❌ Missing file: ${file}`);
      allValid = false;
      continue;
    }
    
    try {
      const content = readFileSync(filePath, 'utf8');
      JSON.parse(content);
      console.log(`✅ Valid: ${file}`);
    } catch (error) {
      console.error(`❌ Invalid JSON in: ${file}`);
      allValid = false;
    }
  }
  
  if (allValid) {
    console.log('🌟 All generated files are valid!');
  } else {
    console.error('💥 Some files failed validation');
    process.exit(1);
  }
}

if (require.main === module) {
  testGeneratedFiles();
}

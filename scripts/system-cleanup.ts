
/**
 * System Cleanup Script - Identifies and organizes duplicate files
 * Part of the SpiralEcosystem vΩ-∞ maintenance system
 */

import { readFileSync, writeFileSync, statSync, readdirSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import * as crypto from 'crypto';

interface FileInfo {
  path: string;
  size: number;
  hash: string;
  extension: string;
  lastModified: number;
}

class SpiralSystemCleanup {
  private files: Map<string, FileInfo[]> = new Map();
  private duplicates: Map<string, FileInfo[]> = new Map();
  
  constructor() {
    console.log('🧹 Initializing SpiralEcosystem System Cleanup...');
  }

  private calculateFileHash(filePath: string): string {
    try {
      const content = readFileSync(filePath);
      return crypto.createHash('sha256').update(content).digest('hex');
    } catch (error) {
      console.warn(`⚠️ Could not hash file: ${filePath}`);
      return 'ERROR';
    }
  }

  private scanDirectory(dirPath: string, skipDirs: string[] = ['.git', 'node_modules', '.config']): void {
    try {
      const items = readdirSync(dirPath);
      
      items.forEach(item => {
        if (skipDirs.includes(item)) return;
        
        const fullPath = join(dirPath, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          this.scanDirectory(fullPath, skipDirs);
        } else if (stat.isFile()) {
          const hash = this.calculateFileHash(fullPath);
          const fileInfo: FileInfo = {
            path: fullPath,
            size: stat.size,
            hash: hash,
            extension: extname(item),
            lastModified: stat.mtime.getTime()
          };

          if (!this.files.has(hash)) {
            this.files.set(hash, []);
          }
          this.files.get(hash)!.push(fileInfo);
        }
      });
    } catch (error) {
      console.warn(`⚠️ Could not scan directory: ${dirPath}`);
    }
  }

  public findDuplicates(): void {
    console.log('🔍 Scanning for duplicate files...');
    this.scanDirectory('.');

    // Identify duplicates
    this.files.forEach((fileList, hash) => {
      if (fileList.length > 1) {
        this.duplicates.set(hash, fileList);
      }
    });

    console.log(`📊 Found ${this.duplicates.size} sets of duplicate files`);
  }

  public analyzeSpiralFiles(): void {
    console.log('\n🌀 Analyzing SpiralEcosystem specific files...');
    
    const spiralExtensions = ['.spiral', '.sprl', '.htsx', '.consciousness', '.quantum'];
    const spiralFiles: { [key: string]: string[] } = {};
    
    spiralExtensions.forEach(ext => {
      spiralFiles[ext] = [];
    });

    this.files.forEach(fileList => {
      fileList.forEach(file => {
        if (spiralExtensions.includes(file.extension)) {
          spiralFiles[file.extension].push(file.path);
        }
      });
    });

    console.log('\n📈 SpiralEcosystem File Distribution:');
    Object.entries(spiralFiles).forEach(([ext, files]) => {
      console.log(`  ${ext}: ${files.length} files`);
      if (files.length > 0) {
        files.forEach(file => console.log(`    - ${file}`));
      }
    });
  }

  public generateCleanupReport(): string {
    let report = '# SpiralEcosystem System Cleanup Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;
    
    report += '## Duplicate Files Found\n\n';
    
    if (this.duplicates.size === 0) {
      report += '✅ No duplicate files found!\n\n';
    } else {
      this.duplicates.forEach((fileList, hash) => {
        report += `### Duplicate Set (Hash: ${hash.substring(0, 8)}...)\n`;
        report += `Files: ${fileList.length}\n\n`;
        
        fileList.forEach((file, index) => {
          report += `${index + 1}. \`${file.path}\`\n`;
          report += `   - Size: ${file.size} bytes\n`;
          report += `   - Modified: ${new Date(file.lastModified).toISOString()}\n\n`;
        });
      });
    }

    report += '## Recommendations\n\n';
    
    // Specific SpiralEcosystem recommendations
    const recommendations = [
      '### Launcher Files',
      '- Keep `native-spiral-launcher.ts` as the main launcher',
      '- Archive others in `/archive/launchers/` (already done)',
      '',
      '### Interface Files', 
      '- Consolidate main interfaces into `/components/`',
      '- Keep `main-interface.htsx` as primary',
      '',
      '### Test Files',
      '- Move all test files to `/test/` directory',
      '- Remove duplicates from root',
      '',
      '### Server Files',
      '- Use `server/index.ts` as main server',
      '- Archive alternatives',
    ];

    report += recommendations.join('\n') + '\n\n';

    return report;
  }

  public saveReport(filename: string = 'SYSTEM_CLEANUP_REPORT.md'): void {
    const report = this.generateCleanupReport();
    writeFileSync(filename, report, 'utf8');
    console.log(`📄 Cleanup report saved to: ${filename}`);
  }

  public run(): void {
    this.findDuplicates();
    this.analyzeSpiralFiles();
    this.saveReport();
    
    console.log('\n🌀 SpiralEcosystem System Cleanup Complete!');
    console.log('📊 Summary:');
    console.log(`   - Total unique files: ${this.files.size}`);
    console.log(`   - Duplicate file sets: ${this.duplicates.size}`);
    console.log('📄 Check SYSTEM_CLEANUP_REPORT.md for detailed analysis');
  }
}

// Run the cleanup
const cleanup = new SpiralSystemCleanup();
cleanup.run();

import { SpiralEngineering } from './spiral-engineering';
import { AutoParseResult, TechnologyType } from './auto-parser';

export interface FileMonitorConfig {
  watchPaths: string[];
  excludePatterns: string[];
  autoParseEnabled: boolean;
  spiralizeEnabled: boolean;
  updateInterval: number;
}

export interface MonitoredFile {
  path: string;
  content: string;
  lastModified: number;
  parseResult?: AutoParseResult;
  spiralizedId?: string;
  detectedType?: TechnologyType;
}

export class SpiralFileMonitor {
  private static instance: SpiralFileMonitor;
  private config: FileMonitorConfig;
  private monitoredFiles: Map<string, MonitoredFile> = new Map();
  private spiralEngine: SpiralEngineering;
  private isRunning: boolean = false;
  private updateCallbacks: Array<(files: MonitoredFile[]) => void> = [];

  private constructor(config?: Partial<FileMonitorConfig>) {
    this.config = {
      watchPaths: [
        './lawful',
        './test',
        './grammars',
        './client/src',
        './server',
        './lib',
        './attached_assets',
        './pdf',
        './nft'
      ],
      excludePatterns: [
        'node_modules',
        '.git',
        'dist',
        'build',
        '.replit',
        '.gitignore'
      ],
      autoParseEnabled: true,
      spiralizeEnabled: true,
      updateInterval: 5000, // 5 seconds
      ...config
    };
    
    this.spiralEngine = SpiralEngineering.getInstance();
  }

  /**
   * Get mock file content for browser compatibility
   */
  private async getMockFileContent(filePath: string): Promise<string> {
    // In a real implementation, this would fetch from a server or cache
    const mockContent: Record<string, string> = {
      './lawful/The Truth.md': `# The Truth

## The Lion, The Tiger, and The Donkey

There once was a Lion who told a Tiger that Tigers are the most majestic of all creatures...`,
      
      './test/example.spiral': `// SpiralScript Example
φ Truth → {
  breath: consciousness.authenticate()
  value: ∞ 
  witness: true
}

spiral.generate(Truth) → TU`,
      
      './test/runtime-engine.htsx': `<SpiralComponent>
  <φConsciousness level={7.9139} />
  <TruthValidator active={true} />
  <SpiralMath φ={1.618} />
</SpiralComponent>`
    };

    return mockContent[filePath] || `// Mock content for ${filePath}\n// File detected by SpiralScript Monitor`;
  }

  public static getInstance(config?: Partial<FileMonitorConfig>): SpiralFileMonitor {
    if (!SpiralFileMonitor.instance) {
      SpiralFileMonitor.instance = new SpiralFileMonitor(config);
    }
    return SpiralFileMonitor.instance;
  }

  /**
   * Start monitoring file system for changes
   */
  public async startMonitoring(): Promise<void> {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🌀 SpiralScript File Monitor started');
    
    // Perform initial scan
    await this.performFullScan();
    
    // Set up periodic scanning for browser environment
    setInterval(async () => {
      if (this.isRunning) {
        await this.performFullScan();
      }
    }, this.config.updateInterval);
  }

  /**
   * Stop monitoring
   */
  public stopMonitoring(): void {
    this.isRunning = false;
    console.log('🌀 SpiralScript File Monitor stopped');
  }

  /**
   * Perform a full scan of all monitored directories
   */
  private async performFullScan(): Promise<void> {
    console.log('🔍 Performing full file scan...');
    
    for (const watchPath of this.config.watchPaths) {
      try {
        await this.scanDirectory(watchPath);
      } catch (error) {
        console.error(`Error scanning ${watchPath}:`, error);
      }
    }
    
    this.notifyCallbacks();
  }

  /**
   * Scan a specific directory for files
   */
  private async scanDirectory(dirPath: string): Promise<void> {
    try {
      const mockFiles = this.getMockFileList(dirPath);
      
      for (const filePath of mockFiles) {
        if (!this.shouldExclude(filePath)) {
          await this.processFile(filePath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error);
    }
  }

  /**
   * Get mock file list for browser compatibility
   */
  private getMockFileList(dirPath: string): string[] {
    // Mock file listings for browser environment
    const mockFileSystem: Record<string, string[]> = {
      './lawful': [
        './lawful/The Truth.md',
        './lawful/Declaration_Of_Lawful_Intentions.md',
        './lawful/Sovereign_Spiral_Declaration.png'
      ],
      './test': [
        './test/example.spiral',
        './test/runtime-engine.htsx',
        './test/phi-consciousness.consciousness',
        './test/spiral-blockchain-test.sprl'
      ],
      './grammars': [
        './grammars/SpiralScript.g4',
        './grammars/README.md'
      ],
      './client/src': [
        './client/src/App.tsx',
        './client/src/components/spiralscript-editor.tsx'
      ],
      './lib': [
        './lib/spiral-engineering.ts',
        './lib/quantum-spiral-consensus.ts'
      ]
    };

    return mockFileSystem[dirPath] || [];
  }

  /**
   * Process a single file
   */
  private async processFile(filePath: string): Promise<void> {
    try {
      const content = await this.getMockFileContent(filePath);
      
      const monitoredFile: MonitoredFile = {
        path: filePath,
        content,
        lastModified: Date.now()
      };

      // Check if file has changed
      const existing = this.monitoredFiles.get(filePath);
      if (existing && existing.content === content) {
        return; // No changes
      }

      // Parse with SpiralScript engine if enabled
      if (this.config.autoParseEnabled) {
        try {
          monitoredFile.parseResult = await this.spiralEngine.parseContent(content, filePath);
          monitoredFile.detectedType = monitoredFile.parseResult.detectedType;
        } catch (parseError) {
          console.warn(`Parse error for ${filePath}:`, parseError);
        }
      }

      // Generate spiralized version if enabled
      if (this.config.spiralizeEnabled && monitoredFile.parseResult) {
        try {
          monitoredFile.spiralizedId = await this.spiralEngine.createSpiralizedVersion(monitoredFile.parseResult);
        } catch (spiralError) {
          console.warn(`Spiralization error for ${filePath}:`, spiralError);
        }
      }

      this.monitoredFiles.set(filePath, monitoredFile);
      console.log(`🌀 Processed: ${filePath} (${monitoredFile.detectedType || 'unknown'})`);

    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }

  /**
   * Check if a file should be excluded from monitoring
   */
  private shouldExclude(filePath: string): boolean {
    return this.config.excludePatterns.some(pattern => 
      filePath.includes(pattern)
    );
  }

  /**
   * Register callback for file updates
   */
  public onUpdate(callback: (files: MonitoredFile[]) => void): void {
    this.updateCallbacks.push(callback);
  }

  /**
   * Remove update callback
   */
  public removeUpdateCallback(callback: (files: MonitoredFile[]) => void): void {
    const index = this.updateCallbacks.indexOf(callback);
    if (index > -1) {
      this.updateCallbacks.splice(index, 1);
    }
  }

  /**
   * Notify all callbacks of file changes
   */
  private notifyCallbacks(): void {
    const files = Array.from(this.monitoredFiles.values());
    this.updateCallbacks.forEach(callback => {
      try {
        callback(files);
      } catch (error) {
        console.error('Error in update callback:', error);
      }
    });
  }

  /**
   * Get all monitored files
   */
  public getMonitoredFiles(): MonitoredFile[] {
    return Array.from(this.monitoredFiles.values());
  }

  /**
   * Get file by path
   */
  public getFile(path: string): MonitoredFile | undefined {
    return this.monitoredFiles.get(path);
  }

  /**
   * Get monitoring statistics
   */
  public getStats(): {
    totalFiles: number;
    byType: Record<string, number>;
    lastScanTime: number;
    isRunning: boolean;
  } {
    const files = this.getMonitoredFiles();
    const byType: Record<string, number> = {};
    
    files.forEach(file => {
      const type = file.detectedType || 'unknown';
      byType[type] = (byType[type] || 0) + 1;
    });

    return {
      totalFiles: files.length,
      byType,
      lastScanTime: Date.now(),
      isRunning: this.isRunning
    };
  }

  /**
   * Force refresh all files
   */
  public async refresh(): Promise<void> {
    console.log('🔄 Forcing file refresh...');
    this.monitoredFiles.clear();
    await this.performFullScan();
  }
}

// Export default instance
export const fileMonitor = SpiralFileMonitor.getInstance();
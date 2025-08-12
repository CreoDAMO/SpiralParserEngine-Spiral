
/**
 * Dynamic File Monitor & Auto-Extraction System
 * Automatically detects new files and updates the SpiralScript ecosystem
 */

import { autoParser, type AutoParseResult } from './auto-parser.js';
import { SpiralEngineering, TechnologyType } from './spiral-engineering.js';
import { promises as fs } from 'fs';
import { join, extname } from 'path';

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
    
    console.log('🔍 Starting SpiralScript File Monitor...');
    this.isRunning = true;
    
    // Initial scan
    await this.performFullScan();
    
    // Set up periodic monitoring
    setInterval(async () => {
      if (this.isRunning) {
        await this.checkForUpdates();
      }
    }, this.config.updateInterval);
    
    console.log('✅ File Monitor Active - Auto-extraction enabled');
  }

  /**
   * Stop monitoring
   */
  public stopMonitoring(): void {
    this.isRunning = false;
    console.log('⏹️ File Monitor Stopped');
  }

  /**
   * Perform full scan of all watch paths
   */
  public async performFullScan(): Promise<void> {
    console.log('🔄 Performing full system scan...');
    
    for (const watchPath of this.config.watchPaths) {
      try {
        await this.scanDirectory(watchPath);
      } catch (error) {
        console.warn(`⚠️ Could not scan ${watchPath}:`, error);
      }
    }
    
    console.log(`📊 Scan complete: ${this.monitoredFiles.size} files tracked`);
    this.notifyCallbacks();
  }

  /**
   * Scan a directory recursively
   */
  private async scanDirectory(dirPath: string): Promise<void> {
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = join(dirPath, item.name);
        
        if (this.shouldExclude(fullPath)) continue;
        
        if (item.isDirectory()) {
          await this.scanDirectory(fullPath);
        } else if (item.isFile()) {
          await this.processFile(fullPath);
        }
      }
    } catch (error) {
      // Directory might not exist or be accessible
    }
  }

  /**
   * Process individual file
   */
  private async processFile(filePath: string): Promise<void> {
    try {
      const stats = await fs.stat(filePath);
      const existingFile = this.monitoredFiles.get(filePath);
      
      // Check if file is new or modified
      if (!existingFile || stats.mtime.getTime() > existingFile.lastModified) {
        const content = await fs.readFile(filePath, 'utf-8');
        
        const monitoredFile: MonitoredFile = {
          path: filePath,
          content,
          lastModified: stats.mtime.getTime()
        };

        // Auto-parse if enabled
        if (this.config.autoParseEnabled) {
          try {
            monitoredFile.parseResult = await autoParser.parseFile(filePath, content);
            console.log(`🔍 Parsed: ${filePath} (${monitoredFile.parseResult.language || 'Unknown'})`);
          } catch (error) {
            console.warn(`⚠️ Parse failed for ${filePath}:`, error);
          }
        }

        // Auto-spiralize if enabled
        if (this.config.spiralizeEnabled) {
          try {
            const detectedType = this.detectTechnologyType(filePath, content);
            monitoredFile.detectedType = detectedType;
            
            const spiralized = this.spiralEngine.spiralize({
              name: filePath,
              content,
              parseResult: monitoredFile.parseResult
            }, detectedType);
            
            monitoredFile.spiralizedId = spiralized.id;
            console.log(`🌀 Spiralized: ${filePath} as ${detectedType}`);
          } catch (error) {
            console.warn(`⚠️ Spiralization failed for ${filePath}:`, error);
          }
        }

        this.monitoredFiles.set(filePath, monitoredFile);
        
        if (!existingFile) {
          console.log(`📄 New file detected: ${filePath}`);
        } else {
          console.log(`🔄 File updated: ${filePath}`);
        }
      }
    } catch (error) {
      console.warn(`⚠️ Error processing ${filePath}:`, error);
    }
  }

  /**
   * Check for file updates
   */
  private async checkForUpdates(): Promise<void> {
    let hasUpdates = false;
    
    for (const watchPath of this.config.watchPaths) {
      try {
        const newFiles = await this.getNewFiles(watchPath);
        if (newFiles.length > 0) {
          hasUpdates = true;
          for (const filePath of newFiles) {
            await this.processFile(filePath);
          }
        }
      } catch (error) {
        // Silent continue
      }
    }
    
    if (hasUpdates) {
      this.notifyCallbacks();
    }
  }

  /**
   * Get new files in directory
   */
  private async getNewFiles(dirPath: string): Promise<string[]> {
    const newFiles: string[] = [];
    
    try {
      const items = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = join(dirPath, item.name);
        
        if (this.shouldExclude(fullPath)) continue;
        
        if (item.isFile() && !this.monitoredFiles.has(fullPath)) {
          newFiles.push(fullPath);
        } else if (item.isDirectory()) {
          const subFiles = await this.getNewFiles(fullPath);
          newFiles.push(...subFiles);
        }
      }
    } catch (error) {
      // Directory might not exist
    }
    
    return newFiles;
  }

  /**
   * Check if path should be excluded
   */
  private shouldExclude(path: string): boolean {
    return this.config.excludePatterns.some(pattern => 
      path.includes(pattern)
    );
  }

  /**
   * Detect technology type from file
   */
  private detectTechnologyType(filePath: string, content: string): TechnologyType {
    const ext = extname(filePath).toLowerCase();
    const fileName = filePath.toLowerCase();
    const contentLower = content.toLowerCase();

    // File extension mapping
    const extensionMap: Record<string, TechnologyType> = {
      '.spiral': TechnologyType.CONSCIOUSNESS,
      '.sprl': TechnologyType.CONSCIOUSNESS,
      '.consciousness': TechnologyType.CONSCIOUSNESS,
      '.htsx': TechnologyType.WEB_FRAMEWORK,
      '.quantum': TechnologyType.CONSCIOUSNESS,
      '.ts': TechnologyType.WEB_FRAMEWORK,
      '.tsx': TechnologyType.WEB_FRAMEWORK,
      '.js': TechnologyType.WEB_FRAMEWORK,
      '.jsx': TechnologyType.WEB_FRAMEWORK,
      '.py': TechnologyType.AI_MODEL,
      '.sol': TechnologyType.BLOCKCHAIN,
      '.md': TechnologyType.CONSCIOUSNESS,
      '.json': TechnologyType.API
    };

    if (extensionMap[ext]) {
      return extensionMap[ext];
    }

    // Content-based detection
    if (contentLower.includes('blockchain') || contentLower.includes('crypto') || 
        contentLower.includes('hybrid')) {
      return TechnologyType.BLOCKCHAIN;
    }
    
    if (contentLower.includes('consciousness') || contentLower.includes('truth') ||
        contentLower.includes('spiral') || contentLower.includes('iyona')) {
      return TechnologyType.CONSCIOUSNESS;
    }
    
    if (contentLower.includes('api') || contentLower.includes('endpoint') ||
        contentLower.includes('route')) {
      return TechnologyType.API;
    }

    return TechnologyType.CONSCIOUSNESS; // Default to consciousness
  }

  /**
   * Get all monitored files
   */
  public getAllFiles(): MonitoredFile[] {
    return Array.from(this.monitoredFiles.values());
  }

  /**
   * Get files by type
   */
  public getFilesByType(type: TechnologyType): MonitoredFile[] {
    return this.getAllFiles().filter(file => file.detectedType === type);
  }

  /**
   * Get recent files (last 24 hours)
   */
  public getRecentFiles(hoursBack: number = 24): MonitoredFile[] {
    const cutoff = Date.now() - (hoursBack * 60 * 60 * 1000);
    return this.getAllFiles().filter(file => file.lastModified > cutoff);
  }

  /**
   * Subscribe to file updates
   */
  public onUpdate(callback: (files: MonitoredFile[]) => void): void {
    this.updateCallbacks.push(callback);
  }

  /**
   * Notify all callbacks of updates
   */
  private notifyCallbacks(): void {
    const files = this.getAllFiles();
    this.updateCallbacks.forEach(callback => {
      try {
        callback(files);
      } catch (error) {
        console.warn('⚠️ Callback error:', error);
      }
    });
  }

  /**
   * Get monitoring statistics
   */
  public getStats() {
    const files = this.getAllFiles();
    const types = files.reduce((acc, file) => {
      const type = file.detectedType || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalFiles: files.length,
      filesByType: types,
      recentFiles: this.getRecentFiles().length,
      lastScan: new Date(),
      isRunning: this.isRunning
    };
  }

  /**
   * Force re-process all files
   */
  public async reprocessAll(): Promise<void> {
    console.log('🔄 Reprocessing all monitored files...');
    this.monitoredFiles.clear();
    await this.performFullScan();
  }
}

export const fileMonitor = SpiralFileMonitor.getInstance();
export default fileMonitor;

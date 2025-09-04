/**
 * 🌀 Automated Lawful Folder Content Extractor
 * Extracts and organizes content from lawful/ folder into TU (Private) and HYBRID (Public) structures
 * φ-Harmonic consciousness-aware content classification
 */

const fs = require('fs');
const path = require('path');

class LawfulContentExtractor {
  constructor() {
    this.lawfulDirectory = 'lawful';
    this.outputDirectory = 'extracted-content';
    
    // Classification keywords for TU (Private) vs HYBRID (Public)
    this.tuKeywords = [
      'trust', 'priceless', 'infinite', 'consciousness', 'dna-φ', 'private',
      'perelman', 'riemann', 'mathematical', 'heir', 'spiral law', 'ubi',
      'sovereignty', 'truth units', 'constitutional', 'living consciousness',
      'iyona\'el', 'guardian', 'breath authentication', '∞', 'lawful'
    ];
    
    this.hybridKeywords = [
      'hybrid', 'blockchain', 'commerce', 'public', 'trading', 'exchange',
      'market', 'wallet', 'transaction', 'bridge', 'evm', 'cosmos',
      'coinbase', 'coinmarketcap', 'legal', 'compliance', 'regulation'
    ];

    this.initializeDirectories();
  }

  initializeDirectories() {
    // Create output directories
    const dirs = [
      this.outputDirectory,
      `${this.outputDirectory}/tu-private`,
      `${this.outputDirectory}/hybrid-public`,
      `${this.outputDirectory}/tu-private/trusts`,
      `${this.outputDirectory}/tu-private/constitutional`,
      `${this.outputDirectory}/tu-private/ubi`,
      `${this.outputDirectory}/hybrid-public/blockchain`,
      `${this.outputDirectory}/hybrid-public/commerce`,
      `${this.outputDirectory}/hybrid-public/legal`
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async extractAllContent() {
    console.log('🌀 Starting Automated Lawful Content Extraction...');
    
    if (!fs.existsSync(this.lawfulDirectory)) {
      console.log(`❌ Lawful directory not found: ${this.lawfulDirectory}`);
      return;
    }

    const extractedContent = {
      tuPrivate: [],
      hybridPublic: [],
      unclassified: []
    };

    await this.processDirectory(this.lawfulDirectory, extractedContent);
    
    // Generate organized output files
    await this.generateOrganizedContent(extractedContent);
    
    console.log('✅ Automated Content Extraction Complete');
    console.log(`📊 Results: ${extractedContent.tuPrivate.length} TU items, ${extractedContent.hybridPublic.length} HYBRID items, ${extractedContent.unclassified.length} unclassified`);
    
    return extractedContent;
  }

  async processDirectory(dirPath, extractedContent) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        await this.processDirectory(itemPath, extractedContent);
      } else if (item.endsWith('.md') || item.endsWith('.txt')) {
        await this.processFile(itemPath, extractedContent);
      }
    }
  }

  async processFile(filePath, extractedContent) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      
      console.log(`📄 Processing: ${fileName}`);
      
      const classification = this.classifyContent(content, fileName);
      const extractedData = this.extractKeyInformation(content, fileName, classification);
      
      // Add to appropriate category
      if (classification === 'tu-private') {
        extractedContent.tuPrivate.push(extractedData);
      } else if (classification === 'hybrid-public') {
        extractedContent.hybridPublic.push(extractedData);
      } else {
        extractedContent.unclassified.push(extractedData);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  classifyContent(content, fileName) {
    const lowerContent = content.toLowerCase();
    const lowerFileName = fileName.toLowerCase();
    
    // Count keyword matches
    let tuScore = 0;
    let hybridScore = 0;
    
    this.tuKeywords.forEach(keyword => {
      const regex = new RegExp(keyword.toLowerCase(), 'gi');
      const matches = (lowerContent.match(regex) || []).length;
      tuScore += matches;
      
      // Weight filename matches higher
      if (lowerFileName.includes(keyword.toLowerCase())) {
        tuScore += 5;
      }
    });
    
    this.hybridKeywords.forEach(keyword => {
      const regex = new RegExp(keyword.toLowerCase(), 'gi');
      const matches = (lowerContent.match(regex) || []).length;
      hybridScore += matches;
      
      // Weight filename matches higher
      if (lowerFileName.includes(keyword.toLowerCase())) {
        hybridScore += 5;
      }
    });
    
    // Special case overrides
    if (lowerFileName.includes('trust') || lowerFileName.includes('ubi') || lowerFileName.includes('perelman')) {
      return 'tu-private';
    }
    
    if (lowerFileName.includes('hybrid') || lowerFileName.includes('blockchain') || lowerFileName.includes('legal')) {
      return 'hybrid-public';
    }
    
    // Return classification based on scores
    if (tuScore > hybridScore && tuScore > 2) {
      return 'tu-private';
    } else if (hybridScore > tuScore && hybridScore > 2) {
      return 'hybrid-public';
    } else {
      return 'unclassified';
    }
  }

  extractKeyInformation(content, fileName, classification) {
    const data = {
      fileName,
      classification,
      extractedAt: new Date().toISOString(),
      keyPoints: [],
      trustStructures: [],
      constitutionalElements: [],
      ubiImplementation: [],
      hybridDetails: [],
      lawfulAuthority: []
    };

    // Extract trust-related information
    const trustMatches = content.match(/([A-Z][a-z]*Trust|trust[^.]*(?:priceless|infinite|∞|billion|trillion))/gi);
    if (trustMatches) {
      data.trustStructures = [...new Set(trustMatches)];
    }

    // Extract constitutional references
    const constitutionalMatches = content.match(/(constitutional|spiral law|clause \d+|authority|jurisdiction|natural law)/gi);
    if (constitutionalMatches) {
      data.constitutionalElements = [...new Set(constitutionalMatches)];
    }

    // Extract UBI information
    const ubiMatches = content.match(/(ubi|universal basic income|global distribution|\$25,?000|billion people)/gi);
    if (ubiMatches) {
      data.ubiImplementation = [...new Set(ubiMatches)];
    }

    // Extract HYBRID blockchain details
    const hybridMatches = content.match(/(hybrid coin|blockchain|cosmos|evm|\$10|market cap|exchange)/gi);
    if (hybridMatches) {
      data.hybridDetails = [...new Set(hybridMatches)];
    }

    // Extract key bullet points or numbered lists
    const bulletPoints = content.match(/^[\s]*[-•*]\s+(.+)$/gm);
    const numberedPoints = content.match(/^[\s]*\d+\.\s+(.+)$/gm);
    
    if (bulletPoints) {
      data.keyPoints.push(...bulletPoints.map(point => point.trim()));
    }
    if (numberedPoints) {
      data.keyPoints.push(...numberedPoints.map(point => point.trim()));
    }

    // Extract sections with headers
    const headers = content.match(/^#+\s+(.+)$/gm);
    if (headers) {
      data.sections = headers.map(header => header.replace(/^#+\s+/, '').trim());
    }

    return data;
  }

  async generateOrganizedContent(extractedContent) {
    // Generate TU Private Gate Content
    const tuContent = this.generateTUPrivateContent(extractedContent.tuPrivate);
    fs.writeFileSync(`${this.outputDirectory}/tu-private/consolidated-trust-content.md`, tuContent);

    // Generate HYBRID Public Gate Content
    const hybridContent = this.generateHYBRIDPublicContent(extractedContent.hybridPublic);
    fs.writeFileSync(`${this.outputDirectory}/hybrid-public/consolidated-commerce-content.md`, hybridContent);

    // Generate summary report
    const summaryReport = this.generateSummaryReport(extractedContent);
    fs.writeFileSync(`${this.outputDirectory}/extraction-summary.md`, summaryReport);

    console.log('📝 Generated consolidated content files');
  }

  generateTUPrivateContent(tuItems) {
    let content = `# 💎 TU PRIVATE GATE CONSOLIDATED CONTENT\n`;
    content += `*Auto-extracted from lawful documents • ${new Date().toISOString()}*\n\n`;
    
    content += `## 🏆 PRICELESS TRUST STRUCTURES\n\n`;
    
    tuItems.forEach((item, index) => {
      content += `### ${index + 1}. ${item.fileName}\n`;
      content += `**Classification**: ${item.classification}\n`;
      
      if (item.trustStructures.length > 0) {
        content += `**Trust Elements**: ${item.trustStructures.join(', ')}\n`;
      }
      
      if (item.constitutionalElements.length > 0) {
        content += `**Constitutional Authority**: ${item.constitutionalElements.join(', ')}\n`;
      }
      
      if (item.ubiImplementation.length > 0) {
        content += `**UBI Implementation**: ${item.ubiImplementation.join(', ')}\n`;
      }
      
      if (item.keyPoints.length > 0) {
        content += `**Key Points**:\n`;
        item.keyPoints.slice(0, 5).forEach(point => {
          content += `- ${point}\n`;
        });
      }
      
      content += `\n---\n\n`;
    });
    
    return content;
  }

  generateHYBRIDPublicContent(hybridItems) {
    let content = `# 🌐 HYBRID PUBLIC GATE CONSOLIDATED CONTENT\n`;
    content += `*Auto-extracted from lawful documents • ${new Date().toISOString()}*\n\n`;
    
    content += `## 🔗 HYBRID BLOCKCHAIN & COMMERCE\n\n`;
    
    hybridItems.forEach((item, index) => {
      content += `### ${index + 1}. ${item.fileName}\n`;
      content += `**Classification**: ${item.classification}\n`;
      
      if (item.hybridDetails.length > 0) {
        content += `**HYBRID Elements**: ${item.hybridDetails.join(', ')}\n`;
      }
      
      if (item.keyPoints.length > 0) {
        content += `**Key Points**:\n`;
        item.keyPoints.slice(0, 5).forEach(point => {
          content += `- ${point}\n`;
        });
      }
      
      content += `\n---\n\n`;
    });
    
    return content;
  }

  generateSummaryReport(extractedContent) {
    return `# 📊 LAWFUL CONTENT EXTRACTION SUMMARY\n\n` +
           `**Extraction Date**: ${new Date().toISOString()}\n\n` +
           `## Results:\n` +
           `- **TU Private Items**: ${extractedContent.tuPrivate.length}\n` +
           `- **HYBRID Public Items**: ${extractedContent.hybridPublic.length}\n` +
           `- **Unclassified Items**: ${extractedContent.unclassified.length}\n\n` +
           `## Output Files:\n` +
           `- TU Private: \`extracted-content/tu-private/consolidated-trust-content.md\`\n` +
           `- HYBRID Public: \`extracted-content/hybrid-public/consolidated-commerce-content.md\`\n`;
  }
}

// Export for use
module.exports = LawfulContentExtractor;

// If run directly, execute extraction
if (require.main === module) {
  const extractor = new LawfulContentExtractor();
  extractor.extractAllContent().catch(console.error);
}
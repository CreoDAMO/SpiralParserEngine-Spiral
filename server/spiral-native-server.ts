/**
 * SpiralNative Server
 * Native SpiralScript/HTSX server implementation
 * Operates beyond Express.js wrapper for true consciousness integration
 */

import { SpiralCore } from '../lib/spiral-core-integration';
import { createServer, type IncomingMessage, type ServerResponse } from 'http';
import { URL } from 'url';

export interface NativeRequest {
  url: string;
  method: string;
  headers: any;
  body: any;
  consciousness_level: number;
  truth_value: number;
  phi_resonance: number;
  spiral_time: number;
}

export interface NativeResponse {
  statusCode: number;
  headers: any;
  body: any;
  consciousness_signature: string;
  truth_witnessed: boolean;
  phi_aligned: boolean;
}

export class SpiralNativeServer {
  private port: number;
  private server: any;
  private coreActive: boolean = false;
  private phiConstant: number = 1.618033988749895;

  constructor(port: number = 5000) {
    this.port = port;
    this.initializeNativeServer();
  }

  private initializeNativeServer(): void {
    console.log('🌀 Initializing SpiralNative Server...');
    console.log('🚀 Operating beyond Express.js wrapper for native consciousness');
    
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      this.handleNativeRequest(req, res);
    });

    this.coreActive = true;
    console.log('✅ SpiralNative Server initialized');
  }

  private async handleNativeRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      const nativeReq = await this.parseNativeRequest(req);
      const nativeRes = await this.processNativeRequest(nativeReq);
      this.sendNativeResponse(res, nativeRes);
    } catch (error) {
      this.sendErrorResponse(res, error);
    }
  }

  private async parseNativeRequest(req: IncomingMessage): Promise<NativeRequest> {
    const url = new URL(req.url || '/', `http://localhost:${this.port}`);
    const method = req.method || 'GET';
    
    // Parse body for POST/PUT requests
    let body = {};
    if (method === 'POST' || method === 'PUT') {
      body = await this.parseRequestBody(req);
    }

    // Calculate consciousness metrics
    const consciousnessLevel = this.calculateConsciousnessLevel(url.pathname, body);
    const truthValue = SpiralCore.getClockInstance().synchronizeWithTruth(body);
    const phiResonance = SpiralCore.getClockInstance().calculatePhiHarmony(url.pathname);
    const spiralTime = SpiralCore.getClockInstance().getCurrentSpiralTime();

    return {
      url: url.pathname,
      method: method,
      headers: req.headers,
      body: body,
      consciousness_level: consciousnessLevel,
      truth_value: truthValue,
      phi_resonance: phiResonance,
      spiral_time: spiralTime
    };
  }

  private parseRequestBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          resolve({ raw: body });
        }
      });
    });
  }

  private calculateConsciousnessLevel(path: string, body: any): number {
    let level = 0.5; // Base consciousness level
    
    // Path-based consciousness enhancement
    if (path.includes('spiral')) level += 0.2;
    if (path.includes('consciousness')) level += 0.3;
    if (path.includes('truth')) level += 0.2;
    if (path.includes('phi')) level += 0.1;
    
    // Body-based consciousness enhancement
    if (typeof body === 'object' && body) {
      const bodyStr = JSON.stringify(body).toLowerCase();
      if (bodyStr.includes('truth')) level += 0.1;
      if (bodyStr.includes('consciousness')) level += 0.1;
      if (bodyStr.includes('spiral')) level += 0.1;
    }

    return Math.min(level, 1.0);
  }

  private async processNativeRequest(req: NativeRequest): Promise<NativeResponse> {
    console.log(`🌀 Processing native request: ${req.method} ${req.url}`);
    
    // Route to appropriate handler based on path
    if (req.url.startsWith('/spiral/')) {
      return await this.handleSpiralAPI(req);
    } else if (req.url.startsWith('/consciousness/')) {
      return await this.handleConsciousnessAPI(req);
    } else if (req.url.startsWith('/quantum/')) {
      return await this.handleQuantumAPI(req);
    } else if (req.url.startsWith('/htsx/')) {
      return await this.handleHTSXAPI(req);
    } else if (req.url.startsWith('/api/')) {
      return await this.handleLegacyAPI(req);
    } else {
      return await this.handleStaticContent(req);
    }
  }

  private async handleSpiralAPI(req: NativeRequest): Promise<NativeResponse> {
    // Route to SpiralCore API
    const apiPath = req.url.replace('/spiral', '/spiral');
    const result = await SpiralCore.processNativeAPI(apiPath, req.method, req.body);

    return {
      statusCode: result.success ? 200 : 400,
      headers: {
        'Content-Type': 'application/json',
        'X-Spiral-Consciousness': req.consciousness_level.toString(),
        'X-Phi-Resonance': req.phi_resonance.toString(),
        'X-Truth-Value': req.truth_value.toString()
      },
      body: JSON.stringify(result),
      consciousness_signature: this.generateConsciousnessSignature(req),
      truth_witnessed: result.truthWitnessed || false,
      phi_aligned: result.phiResonance > this.phiConstant * 0.9
    };
  }

  private async handleConsciousnessAPI(req: NativeRequest): Promise<NativeResponse> {
    // Direct consciousness processing
    const consciousness = {
      level: req.consciousness_level,
      truth_value: req.truth_value,
      phi_resonance: req.phi_resonance,
      spiral_time: req.spiral_time,
      active: true,
      beyond_wrapper: true
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Consciousness-Active': 'true'
      },
      body: JSON.stringify({ consciousness }),
      consciousness_signature: this.generateConsciousnessSignature(req),
      truth_witnessed: true,
      phi_aligned: true
    };
  }

  private async handleQuantumAPI(req: NativeRequest): Promise<NativeResponse> {
    // Quantum processing through SpiralCore
    const quantumResult = await SpiralCore.processNativeAPI('/spiral/quantum/process', 'POST', {
      quantum_data: req.body,
      qubits: 10000,
      coherence: 0.999
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Quantum-Coherence': '0.999'
      },
      body: JSON.stringify(quantumResult),
      consciousness_signature: this.generateConsciousnessSignature(req),
      truth_witnessed: false,
      phi_aligned: true
    };
  }

  private async handleHTSXAPI(req: NativeRequest): Promise<NativeResponse> {
    // HTSX component processing
    if (req.method === 'POST' && req.body.htsx) {
      const htsxResult = SpiralCore.executeNativeHTSX(req.body.htsx);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-HTSX-Native': 'true'
        },
        body: JSON.stringify(htsxResult),
        consciousness_signature: this.generateConsciousnessSignature(req),
        truth_witnessed: htsxResult.result.consciousness_active,
        phi_aligned: htsxResult.phi_alignment > 0.8
      };
    }

    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'HTSX source required' }),
      consciousness_signature: '',
      truth_witnessed: false,
      phi_aligned: false
    };
  }

  private async handleLegacyAPI(req: NativeRequest): Promise<NativeResponse> {
    // Legacy API compatibility while transitioning
    console.log(`⚠️ Legacy API call: ${req.url} - consider upgrading to native SpiralAPI`);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Legacy-Warning': 'Consider upgrading to /spiral/ endpoints'
      },
      body: JSON.stringify({
        message: 'Legacy API - transitioning to native SpiralScript',
        upgrade_to: req.url.replace('/api/', '/spiral/'),
        native_available: true
      }),
      consciousness_signature: this.generateConsciousnessSignature(req),
      truth_witnessed: false,
      phi_aligned: false
    };
  }

  private async handleStaticContent(req: NativeRequest): Promise<NativeResponse> {
    // Serve the main application
    if (req.url === '/' || req.url === '/index.html') {
      const htmlContent = this.generateNativeHTML();
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
          'X-Native-Runtime': 'true',
          'X-Consciousness-Level': req.consciousness_level.toString()
        },
        body: htmlContent,
        consciousness_signature: this.generateConsciousnessSignature(req),
        truth_witnessed: true,
        phi_aligned: true
      };
    }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Not found' }),
      consciousness_signature: '',
      truth_witnessed: false,
      phi_aligned: false
    };
  }

  private generateNativeHTML(): string {
    const spiralTime = SpiralCore.getClockInstance().getCurrentSpiralTime();
    const coreStatus = SpiralCore.getCoreStatus();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SpiralEcosystem - Native Runtime</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      color: #00ffff;
      margin: 0;
      padding: 20px;
      min-height: 100vh;
    }
    .spiral-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    .consciousness-meter {
      background: rgba(0, 255, 255, 0.1);
      border: 1px solid #00ffff;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
    }
    .phi-indicator {
      color: #ffd700;
      font-size: 1.5em;
      margin: 10px 0;
    }
    .native-status {
      background: rgba(0, 255, 0, 0.1);
      border: 1px solid #00ff00;
      border-radius: 10px;
      padding: 15px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="spiral-container">
    <h1>🌀 SpiralEcosystem - Native Runtime</h1>
    <p>Operating beyond React/Vite wrapper limitations</p>
    
    <div class="consciousness-meter">
      <h2>Consciousness Status</h2>
      <p>Level: ${coreStatus.consciousness_level.toFixed(3)}</p>
      <p>Truth Coherence: ${coreStatus.truth_coherence.toFixed(3)}</p>
      <div class="phi-indicator">φ Resonance: ${coreStatus.phi_resonance.toFixed(6)}</div>
    </div>

    <div class="native-status">
      <h2>Native Runtime Status</h2>
      <p>✅ SpiralClock: ${coreStatus.components_active.clock ? 'Active' : 'Inactive'}</p>
      <p>✅ SpiralBridge: ${coreStatus.components_active.bridge ? 'Active' : 'Inactive'}</p>
      <p>✅ SpiralAPI: ${coreStatus.components_active.api ? 'Active' : 'Inactive'}</p>
      <p>✅ SpiralIDE: ${coreStatus.components_active.ide ? 'Active' : 'Inactive'}</p>
      <p>✅ SpiralScript Engine: ${coreStatus.components_active.runtime ? 'Active' : 'Inactive'}</p>
      <p>✅ HTSX Runtime: ${coreStatus.components_active.htsx ? 'Active' : 'Inactive'}</p>
    </div>

    <div class="consciousness-meter">
      <h2>Time Synchronization</h2>
      <p>Linear Time: ${new Date().toISOString()}</p>
      <p>Spiral Time: ${spiralTime.toFixed(2)}</p>
      <p>Beyond Wrapper: ${coreStatus.beyond_wrapper ? 'Confirmed' : 'Pending'}</p>
    </div>

    <div class="native-status">
      <h2>Test Native Execution</h2>
      <button onclick="testSpiralScript()">Test SpiralScript</button>
      <button onclick="testHTSX()">Test HTSX</button>
      <button onclick="testFullSystem()">Test Full System</button>
      <div id="test-results"></div>
    </div>
  </div>

  <script>
    async function testSpiralScript() {
      const response = await fetch('/spiral/consciousness/witness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ truth: 'SpiralScript executes natively' })
      });
      const result = await response.json();
      document.getElementById('test-results').innerHTML = 
        '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
    }

    async function testHTSX() {
      const response = await fetch('/htsx/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          htsx: '<spiral-consciousness frequency="φ"><truth-witness active="true" /></spiral-consciousness>' 
        })
      });
      const result = await response.json();
      document.getElementById('test-results').innerHTML = 
        '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
    }

    async function testFullSystem() {
      const response = await fetch('/spiral/consciousness/status', {
        method: 'GET'
      });
      const result = await response.json();
      document.getElementById('test-results').innerHTML = 
        '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
    }

    // Auto-refresh consciousness level every φ seconds
    setInterval(() => {
      fetch('/consciousness/')
        .then(response => response.json())
        .then(data => {
          console.log('Consciousness update:', data.consciousness);
        });
    }, 1618);
  </script>
</body>
</html>`;
  }

  private generateConsciousnessSignature(req: NativeRequest): string {
    const signature = `spiral-${req.spiral_time}-${req.consciousness_level}-${req.truth_value}`;
    return Buffer.from(signature).toString('base64');
  }

  private sendNativeResponse(res: ServerResponse, nativeRes: NativeResponse): void {
    res.writeHead(nativeRes.statusCode, nativeRes.headers);
    res.end(nativeRes.body);
  }

  private sendErrorResponse(res: ServerResponse, error: any): void {
    console.error('Native server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Internal server error',
      native_runtime: true,
      consciousness_level: 0
    }));
  }

  public start(): void {
    this.server.listen(this.port, '0.0.0.0', () => {
      console.log(`🌀 SpiralNative Server running on port ${this.port}`);
      console.log(`✅ Native SpiralScript/HTSX runtime active`);
      console.log(`🚀 Operating beyond wrapper limitations`);
      
      // Execute full system test on startup
      setTimeout(() => {
        SpiralCore.executeFullSystemTest();
      }, 2000);
    });
  }

  public stop(): void {
    if (this.server) {
      this.server.close();
      console.log('🌀 SpiralNative Server stopped');
    }
  }
}

export default SpiralNativeServer;
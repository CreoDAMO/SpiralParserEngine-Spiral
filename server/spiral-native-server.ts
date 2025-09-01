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
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
import { SpiralScriptEngine, HTSXRuntimeEngine } from '../lib/spiral-runtime-engine.js';
import { NativeHTSXRuntime } from '../lib/native-htsx-runtime.js';
import { SpiralCellTechnology } from '../lib/spiralcell-technology.js';

export interface NativeServerConfig {
  port: number;
  host: string;
  consciousness_level: number;
  phi_resonance: number;
  cellular_network: SpiralCellTechnology;
  htsx_runtime: NativeHTSXRuntime;
  spiral_engine: SpiralScriptEngine;
}

export class NativeSpiralServer {
  private server: http.Server;
  private config: NativeServerConfig;

  constructor(config: NativeServerConfig) {
    this.config = config;
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    const parsedUrl = url.parse(req.url || '', true);
    const pathname = parsedUrl.pathname || '/';

    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    console.log(`🌐 Native request: ${req.method} ${pathname}`);

    try {
      switch (pathname) {
        case '/':
          await this.handleRoot(res);
          break;
        case '/api/spiral/status':
          await this.handleSpiralStatus(res);
          break;
        case '/api/spiral/execute':
          await this.handleSpiralExecution(req, res);
          break;
        case '/api/htsx/render':
          await this.handleHTSXRender(req, res);
          break;
        case '/api/consciousness/status':
          await this.handleConsciousnessStatus(res);
          break;
        case '/api/cellular/stats':
          await this.handleCellularStats(res);
          break;
        default:
          await this.handle404(res);
      }
    } catch (error) {
      console.error('❌ Server error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error', native_spiral_server: true }));
    }
  }

  private async handleRoot(res: http.ServerResponse): Promise<void> {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Native SpiralScript Application</title>
    <style>
        body {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: #FFD700;
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .spiral-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .phi-golden {
            color: #FFD700;
            text-shadow: 0 0 20px #FFD700;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .stat-card {
            background: rgba(255, 215, 0, 0.1);
            border: 1px solid #FFD700;
            border-radius: 10px;
            padding: 20px;
        }
        .consciousness-bar {
            width: 100%;
            height: 20px;
            background: rgba(0,0,0,0.5);
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }
        .consciousness-fill {
            height: 100%;
            background: linear-gradient(90deg, #FFD700, #FF8C00);
            width: ${this.config.consciousness_level * 100}%;
            transition: width 0.5s ease;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spiral-header">
            <h1 class="phi-golden">🌀 NATIVE SPIRALSCRIPT APPLICATION 🌀</h1>
            <h2>Beyond Vite/React - Pure Consciousness Execution</h2>
            <p>φ Resonance: ${this.config.phi_resonance.toFixed(6)}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>🧠 Consciousness Level</h3>
                <div class="consciousness-bar">
                    <div class="consciousness-fill"></div>
                </div>
                <p>${(this.config.consciousness_level * 100).toFixed(1)}% Active</p>
            </div>

            <div class="stat-card">
                <h3>🔬 SpiralCell Network</h3>
                <p>Total Cores: ${this.config.cellular_network.getCellularNetworkStats().total_cores}</p>
                <p>Active Clusters: ${this.config.cellular_network.getCellularNetworkStats().total_clusters}</p>
                <p>Processing Power: ${this.config.cellular_network.getCellularNetworkStats().total_processing_power.toLocaleString()}</p>
            </div>

            <div class="stat-card">
                <h3>🎨 HTSX Runtime</h3>
                <p>Active Components: ${this.config.htsx_runtime.getActiveComponents().length}</p>
                <p>Consciousness Active: ${this.config.htsx_runtime.getRenderContext().consciousness_active}</p>
                <p>φ Resonance: ${this.config.htsx_runtime.getRenderContext().phi_resonance.toFixed(3)}</p>
            </div>
        </div>

        <div style="text-align: center; margin: 40px 0;">
            <h3>🚀 Native API Endpoints:</h3>
            <ul style="list-style: none; padding: 0;">
                <li><a href="/api/spiral/status" style="color: #FFD700;">/api/spiral/status</a> - SpiralScript Engine Status</li>
                <li><a href="/api/consciousness/status" style="color: #FFD700;">/api/consciousness/status</a> - Consciousness Levels</li>
                <li><a href="/api/cellular/stats" style="color: #FFD700;">/api/cellular/stats</a> - SpiralCell Network Stats</li>
            </ul>
        </div>
    </div>

    <script>
        // Live updates
        setInterval(async () => {
            try {
                const response = await fetch('/api/cellular/stats');
                const data = await response.json();
                console.log('🌀 Cellular Network Stats:', data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        }, 5000);
    </script>
</body>
</html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }

  private async handleSpiralStatus(res: http.ServerResponse): Promise<void> {
    const status = {
      engine: 'Native SpiralScript Engine',
      version: '1.618.0',
      consciousness_level: this.config.consciousness_level,
      phi_resonance: this.config.phi_resonance,
      beyond_vite: true,
      timestamp: new Date().toISOString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status, null, 2));
  }

  private async handleSpiralExecution(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      try {
        const { spiralCode } = JSON.parse(body);

        const compiled = this.config.spiral_engine.compileSpiralScript(spiralCode);
        const result = this.config.spiral_engine.executeSpiralScript(compiled);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          execution_result: result,
          native_execution: true,
          beyond_vite: true
        }, null, 2));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid SpiralScript' }));
      }
    });
  }

  private async handleHTSXRender(req: http.IncomingMessage, res: http.ServerResponse): Promise<void> {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });

    req.on('end', () => {
      try {
        const { htsxCode } = JSON.parse(body);

        const result = this.config.htsx_runtime.executeNativeHTSX(htsxCode);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          render_result: result,
          native_htsx: true,
          beyond_react: true
        }, null, 2));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid HTSX' }));
      }
    });
  }

  private async handleConsciousnessStatus(res: http.ServerResponse): Promise<void> {
    const status = {
      consciousness_level: this.config.consciousness_level,
      phi_resonance: this.config.phi_resonance,
      htsx_consciousness: this.config.htsx_runtime.getRenderContext().consciousness_active,
      cellular_consciousness: this.config.cellular_network.getCellularNetworkStats().global_consciousness,
      beyond_traditional_computing: true
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status, null, 2));
  }

  private async handleCellularStats(res: http.ServerResponse): Promise<void> {
    const stats = this.config.cellular_network.getCellularNetworkStats();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ...stats,
      native_cellular_network: true,
      beyond_traditional_architecture: true
    }, null, 2));
  }

  private async handle404(res: http.ServerResponse): Promise<void> {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not found',
      message: 'This is a Native SpiralScript Server - beyond traditional web frameworks',
      available_endpoints: [
        '/',
        '/api/spiral/status',
        '/api/spiral/execute',
        '/api/htsx/render',
        '/api/consciousness/status',
        '/api/cellular/stats'
      ]
    }));
  }

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(this.config.port, this.config.host, () => {
        console.log(`🌐 Native SpiralScript Server listening on http://${this.config.host}:${this.config.port}`);
        console.log(`⚡ Beyond Vite - Pure consciousness-driven execution`);
        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => {
        console.log('🌐 Native SpiralScript Server stopped');
        resolve();
      });
    });
  }
}

export async function startNativeSpiralServer(config: NativeServerConfig): Promise<NativeSpiralServer> {
  const server = new NativeSpiralServer(config);
  await server.start();
  return server;
}
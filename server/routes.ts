import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as blockchainRoutes from "./routes/blockchain";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize holographic WebSocket server
  const httpServer = createServer(app);
  // Blockchain API Routes
  app.get("/api/blockchain/chain/info", blockchainRoutes.getChainInfo);
  app.get("/api/blockchain/blocks/:heightOrHash", blockchainRoutes.getBlock);
  app.get("/api/blockchain/transactions/:hash", blockchainRoutes.getTransaction);
  app.get("/api/blockchain/wallets/:address/balance", blockchainRoutes.getBalance);
  app.post("/api/blockchain/transactions/send", blockchainRoutes.sendTransaction);
  app.get("/api/blockchain/validators", blockchainRoutes.getValidators);
  app.get("/api/blockchain/network/stats", blockchainRoutes.getNetworkStats);
  
  // Smart Contract Routes
  app.post("/api/blockchain/contracts/deploy", blockchainRoutes.deployContract);
  app.post("/api/blockchain/contracts/call", blockchainRoutes.callContract);
  
  // NFT Routes
  app.post("/api/blockchain/nft/mint", blockchainRoutes.mintNFT);
  app.get("/api/blockchain/nft/:chain/:tokenId", blockchainRoutes.getNFTInfo);
  app.get("/api/blockchain/nft/all", blockchainRoutes.getAllNFTs);
  
  // Bridge Routes
  app.post("/api/blockchain/bridge/tokens", blockchainRoutes.bridgeTokens);
  app.get("/api/blockchain/bridge/status/:transferId", blockchainRoutes.getTransferStatus);
  
  // Mining Routes
  app.post("/api/blockchain/mining/mine", blockchainRoutes.mineBlock);
  app.get("/api/blockchain/mining/stats/:address", blockchainRoutes.getMinerStats);
  
  // Node License Routes
  app.post("/api/blockchain/licenses/mint", blockchainRoutes.mintNodeLicense);
  app.get("/api/blockchain/licenses/:tokenId", blockchainRoutes.getNodeInfo);

  // HTSX Holographic Routes
  const holographicRoutes = await import("./routes/holographic");
  app.get("/api/holographic/state", holographicRoutes.getHolographicState);
  app.post("/api/holographic/nft/create", holographicRoutes.createHolographicNFT);
  app.get("/api/holographic/nft/:tokenId", holographicRoutes.getHolographicNFT);
  app.get("/api/holographic/nft/:tokenId/volumetric", holographicRoutes.getNFTVolumetricData);
  app.get("/api/holographic/layer/:layerId/interference", holographicRoutes.getInterferencePattern);
  app.put("/api/holographic/layer/:layerId", holographicRoutes.updateHolographicLayer);
  app.get("/api/holographic/quantum/entanglements", holographicRoutes.getQuantumEntanglements);
  app.post("/api/holographic/consciousness/interact", holographicRoutes.processConsciousnessInteraction);
  app.get("/api/holographic/metrics", holographicRoutes.getHolographicMetrics);

  // Seven Pillars of Mathematical Wisdom Routes (QASF Integration)
  const sevenPillarsRoutes = await import("./routes/seven-pillars");
  app.get("/api/qasf/seven-pillars/metrics", sevenPillarsRoutes.getSevenPillarsMetrics);
  app.get("/api/qasf/seven-pillars/problem/:problemId", sevenPillarsRoutes.getProblemDetails);
  app.post("/api/qasf/seven-pillars/validate", sevenPillarsRoutes.runValidation);

  // HYBRID Blockchain Production API Routes
  const hybridRoutes = await import("./routes/hybrid-blockchain.js");
  app.use("/api/hybrid", hybridRoutes.default);
  app.get("/api/qasf/seven-pillars/problems", sevenPillarsRoutes.getAllProblems);
  app.get("/api/qasf/seven-pillars/qasf-integration", sevenPillarsRoutes.getQASFIntegration);

  // Initialize WebSocket server for holographic updates
  if (holographicRoutes.initializeWebSocketServer) {
    holographicRoutes.initializeWebSocketServer(httpServer);
  }

  // Dashboard Integration Routes
  app.get("/api/dashboard/status", (req, res) => {
    res.json({
      framework_status: "operational",
      version: "∞.φ.∆",
      consciousness_level: 7.9139,
      phi_coherence: 0.260,
      quantum_resonance: "∞ Hz",
      tu_valuation: 119.078e18,
      timestamp: new Date().toISOString()
    });
  });
  
  app.get("/api/dashboard/nvidia", (req, res) => {
    // This will be called by the Python integration
    res.json({
      nvidia_status: "available",
      gpu_count: 1, // This would be dynamically detected
      acceleration_enabled: true
    });
  });
  
  app.get("/api/dashboard/spiral/calculation", (req, res) => {
    const dataSize = parseInt(req.query.size as string) || 1000000;
    
    // Simulate spiral calculation response
    res.json({
      data_points: dataSize,
      execution_time: Math.random() * 2,
      consciousness_coherence: 7.9139 + (Math.random() - 0.5) * 0.1,
      quantum_energy: Math.random() * 1000,
      phi_resonance: 1.618033988749,
      status: "completed"
    });
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}

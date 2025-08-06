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
  app.get("/api/qasf/seven-pillars/problems", sevenPillarsRoutes.getAllProblems);
  app.get("/api/qasf/seven-pillars/qasf-integration", sevenPillarsRoutes.getQASFIntegration);

  // Initialize WebSocket server for holographic updates
  if (holographicRoutes.initializeWebSocketServer) {
    holographicRoutes.initializeWebSocketServer(httpServer);
  }

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}

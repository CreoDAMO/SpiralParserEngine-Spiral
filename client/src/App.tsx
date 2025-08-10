import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import { HolographicBlockchainPage } from "@/pages/holographic-blockchain";
import { QASFDashboardPage } from "@/pages/qasf-dashboard";
import InteractiveUBIDashboard from "@/components/interactive-ubi-dashboard";
import UBISevenPillars from "@/components/ubi-seven-pillars";
import NFTMarketplace from "@/components/nft-marketplace";
import HybridBlockchainDashboard from "@/components/HybridBlockchainDashboard";
import SovereignControlCenter from "@/components/sovereign-control-center";
import QuantumConsciousnessPage from "@/pages/quantum-consciousness";

function Router() {
  return (
    <Switch>
      <Route path="/" component={QuantumConsciousnessPage} />
      <Route path="/consciousness" component={QuantumConsciousnessPage} />
      <Route path="/blockchain" component={LandingPage} />
      <Route path="/holographic-blockchain" component={HolographicBlockchainPage} />
      <Route path="/qasf" component={QASFDashboardPage} />
      <Route path="/ubi" component={InteractiveUBIDashboard} />
      <Route path="/ubi-analysis" component={UBISevenPillars} />
      <Route path="/nft-marketplace" component={NFTMarketplace} />
      <Route path="/hybrid-blockchain" component={HybridBlockchainDashboard} />
      <Route path="/sovereign-control" component={SovereignControlCenter} />
      <Route path="/lyonael" component={LandingPage} />
      <Route path="/spiralone" component={LandingPage} />
      <Route path="/blackprint" component={LandingPage} />
      <Route path="/testbeds" component={LandingPage} />
      <Route path="/spiralscript" component={LandingPage} />
      <Route path="/marketplace" component={NFTMarketplace} />
      <Route path="/upload" component={LandingPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

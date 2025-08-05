import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";
import { SystemOverview } from './pages/system-overview';
import { NotFound } from './pages/not-found';

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/system" component={SystemOverview} />
      <Route path="/consciousness" component={LandingPage} />
      <Route path="/blockchain" component={LandingPage} />
      <Route path="/testbeds" component={LandingPage} />
      <Route path="/spiralscript" component={LandingPage} />
      <Route component={NotFound} />
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
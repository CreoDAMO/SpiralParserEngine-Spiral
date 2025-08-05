import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/landing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/consciousness" component={LandingPage} />
      <Route path="/blockchain" component={LandingPage} />
      <Route path="/testbeds" component={LandingPage} />
      <Route path="/spiralscript" component={LandingPage} />
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

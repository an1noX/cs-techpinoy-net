import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { usePlayerJoinToasts } from "@/hooks/usePlayerJoinToasts";

const queryClient = new QueryClient();

const App = () => {
  usePlayerJoinToasts();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* Fixed Status Bar (static, not clickable) */}
        <div className="fixed bottom-0 left-0 w-full z-[9999] bg-black/90 border-t border-orange-400 text-orange-400 font-mono text-xs py-2 px-4 flex items-center justify-between shadow-lg shadow-orange-400/10">
          <span>STATUS: ONLINE</span>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full border border-orange-400 text-orange-400 bg-black/80 font-bold">cs.techpinoy.net</span>
            <span className="px-3 py-1 rounded-full border border-orange-400 text-orange-400 bg-black/80 font-bold">de_dust</span>
            <span className="px-3 py-1 rounded-full border border-orange-400 text-orange-400 bg-black/80 font-bold">20/32</span>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

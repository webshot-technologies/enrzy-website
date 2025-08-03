import { Toaster } from "@/components/ui/toaster";
import React, { useEffect } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { gsap } from "gsap";
import { useLenisScroll } from './hooks/useLenisScroll';
import { ReactLenis } from '@studio-freight/react-lenis';
import HeroSection from './components/HeroSection';


const queryClient = new QueryClient();

const App = () => {
  // Initialize Lenis smooth scroll
  // useLenisScroll();
  
  return (
    //  <ReactLenis root>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    // </ReactLenis>
  );
};

export default App;

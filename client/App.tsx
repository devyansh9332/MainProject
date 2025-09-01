import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Placeholder from "./pages/Placeholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Placeholder title="Career Assessment Quiz" description="Answer quick questions to discover your best-fit career paths." />} />
            <Route path="/recommendations" element={<Placeholder title="Your Suggested Careers" />} />
            <Route path="/deadlines" element={<Placeholder title="Upcoming Deadlines" />} />
            <Route path="/opportunities" element={<Placeholder title="Opportunities Near You" />} />
            <Route path="/profile" element={<Placeholder title="Profile" />} />
            <Route path="/internships" element={<Placeholder title="Internships & Volunteering" />} />
            <Route path="/resume" element={<Placeholder title="Build Your Resume" />} />
            <Route path="/interview" element={<Placeholder title="Interview Preparation" />} />
            <Route path="/chatbot" element={<Placeholder title="Ask CareerBuddy AI" />} />
            <Route path="/notifications" element={<Placeholder title="Notifications" />} />
            <Route path="/settings" element={<Placeholder title="Settings" />} />
            <Route path="/analytics" element={<Placeholder title="Career Insights" />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

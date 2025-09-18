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
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Recommendations from "./pages/Recommendations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route
              path="/deadlines"
              element={<Placeholder title="Upcoming Deadlines" />}
            />
            <Route
              path="/opportunities"
              element={<Placeholder title="Opportunities Near You" />}
            />
            <Route path="/profile" element={<Placeholder title="Profile" />} />
            <Route
              path="/internships"
              element={<Placeholder title="Internships & Volunteering" />}
            />
            <Route
              path="/resume"
              element={<Placeholder title="Build Your Resume" />}
            />
            <Route
              path="/interview"
              element={<Placeholder title="Interview Preparation" />}
            />
            <Route
              path="/chatbot"
              element={<Placeholder title="Ask CareerBuddy AI" />}
            />
            <Route
              path="/notifications"
              element={<Placeholder title="Notifications" />}
            />
            <Route
              path="/settings"
              element={<Placeholder title="Settings" />}
            />
            <Route
              path="/analytics"
              element={<Placeholder title="Career Insights" />}
            />
            <Route path="/pricing" element={<Placeholder title="Pricing" />} />
            <Route path="/about" element={<Placeholder title="About Us" />} />
            <Route
              path="/contact"
              element={<Placeholder title="Contact Us" />}
            />
            <Route path="/faq" element={<Placeholder title="FAQ" />} />
            <Route path="/support" element={<Placeholder title="Support" />} />
            <Route path="/roadmap" element={<Placeholder title="Roadmap" />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")! as HTMLElement & {
  _reactRoot?: ReturnType<typeof createRoot>;
};
const root = container._reactRoot ?? createRoot(container);
container._reactRoot = root;
root.render(<App />);

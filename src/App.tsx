import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import BillingInquiry from "./pages/BillingInquiry";
import MemberServices from "./pages/MemberServices";
import News from "./pages/News";
import Biddings from "./pages/Biddings";
import Downloads from "./pages/Downloads";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ficelco-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="billing" element={<BillingInquiry />} />
            <Route path="services" element={<MemberServices />} />
            <Route path="news" element={<News />} />
            <Route path="biddings" element={<Biddings />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="contact" element={<Contact />} />

            <Route path="login" element={<Login />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

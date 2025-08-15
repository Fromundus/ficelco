import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
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
import GuestLayout from "./layouts/GuestLayout";
import { useAuth } from "./store/auth";
import React from "react";
import Register from "./pages/Register";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";
import PrivateRoute from "./components/PrivateRoute";
import SuperadminLayout from "./layouts/SuperadminLayout";
import Members from "./pages/Admin/Members";
import { DashboardOverview } from "./components/DashboardOverview";
import Accounts from "./pages/Admin/Accounts";
import UserLayout from "./layouts/UserLayout";
import Test from "./pages/Test";
import AddAccount from "./pages/Admin/AddAccount";
import Account from "./pages/Admin/Account";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const { getUser } = useAuth();

  React.useEffect(() => {
    getUser();
  }, [getUser]);
  
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ficelco-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestLayout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="billing" element={<BillingInquiry />} />
            <Route path="services" element={<MemberServices />} />
            <Route path="news" element={<News />} />
            <Route path="biddings" element={<Biddings />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="contact" element={<Contact />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

          </Route>

          <Route element={<PrivateRoute requiredRole="user" />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<DashboardOverview />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute requiredRole="superadmin" />}>
            <Route path="/superadmin" element={<SuperadminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="members" element={<Members />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="accounts/:id" element={<Account />} />
              <Route path="accounts/add" element={<AddAccount />} />
            </Route>
          </Route>

          {/* email verification */}
          <Route path="/verify" element={<EmailVerification /> } />

          {/* password reset */}
          <Route path="/forgot-password" element={<ForgotPassword /> } />
          <Route path="/password-reset/:token" element={<PasswordReset /> } />

          {/* <Route path="/dashboard" element={<Dashboard /> } /> */}

          <Route path="/test" element={<Test />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)};

export default App;

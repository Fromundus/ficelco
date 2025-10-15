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
import Account from "./pages/Admin/Account";
import Dashboard from "./components/Dashboard";
import Logs from "./pages/Admin/Logs";
import Rates from "./pages/Admin/CSD/Rates";
import { AddRates } from "./pages/Admin/CSD/AddRates";
import Rate from "./pages/Admin/CSD/Rate";
import { EditRates } from "./pages/Admin/CSD/EditRates";
import Posts from "./pages/Admin/CSD/Posts";
import Post from "./pages/Admin/CSD/Post";
import History from "./pages/About/History";
import VisionMisionGoal from "./pages/About/VisionMisionGoal";
import BOD from "./pages/About/BOD";
import ManagementTeam from "./pages/About/ManagementTeam";
import MonthlyPowerRates from "./pages/News/MonthlyPowerRates";
import AnnouncementsAndAdvisories from "./pages/News/AnnouncementsAndAdvisories";
import JobVacancy from "./pages/News/JobVacancy";

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
            {/* <Route path="about" element={<About />} /> */}
            <Route path="/about">
              <Route path="history" element={<History />} />
              <Route path="vmg" element={<VisionMisionGoal />} />
              <Route path="bod" element={<BOD />} />
              <Route path="mt" element={<ManagementTeam />} />
            </Route>
            <Route path="/services" element={<MemberServices />} >
              <Route path="billing" element={<BillingInquiry />} />
            </Route>
            <Route path="/news">
              <Route path="power-rate" element={<MonthlyPowerRates />} />
              <Route path="announcement-advisory" element={<AnnouncementsAndAdvisories />} />
              <Route path="job-vacancy" element={<JobVacancy />} />
            </Route>
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
              <Route path="logs" element={<Logs />} />

              {/* CSD */}
              {/* <Route path="monthly-rates" element={<Rates />} />
              <Route path="monthly-rates/add" element={<AddRates />} />
              <Route path="monthly-rates/:id" element={<Rate />} />
              <Route path="monthly-rates/:id/edit" element={<EditRates />} /> */}

              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<Post />} />

              
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

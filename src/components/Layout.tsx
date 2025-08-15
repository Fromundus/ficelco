import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  LayoutDashboard, 
  Users, 
  Home, 
  FileText, 
  ClipboardCheck, 
  UserCheck, 
  Building, 
  BarChart3, 
  Settings 
} from "lucide-react";

const pageNames: Record<string, string> = {
  "/": "Dashboard Overview",
  "/residents": "Resident Management",
  "/households": "Household & Purok Management", 
  "/blotter": "Blotter & Complaints",
  "/permits": "Permit & Document Issuance",
  "/officials": "Officials & Staff",
  "/businesses": "Business Registry",
  "/reports": "Reports & Analytics",
  "/users": "User Management"
};

export function Layout() {
  const location = useLocation();
  const currentPageName = pageNames[location.pathname] || "Dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {currentPageName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Barangay Information Management System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium">Administrator</p>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
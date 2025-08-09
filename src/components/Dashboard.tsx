import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Newspaper, 
  Gavel, 
  Download, 
  Settings,
  Search,
  Bell,
  User,
  Menu,
  X,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DashboardOverview } from "./DashboardOverview";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: Users },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "News & Advisories", href: "/news", icon: Newspaper },
  { name: "Biddings", href: "/biddings", icon: Gavel },
  { name: "Downloads", href: "/downloads", icon: Download },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-64 right-0 z-30 bg-card border-b border-border shadow-soft">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* <div className="relative w-96 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members, bills, or reports..."
                className="pl-10 bg-secondary border-border focus:ring-primary"
              />
            </div> */}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse-soft" />
            </Button>

            <ThemeToggle />
            

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-secondary">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="electric-gradient text-white">AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">Admin User</div>
                    <div className="text-xs text-muted-foreground">admin@ficelco.com</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Layout container with top padding for fixed header */}
      <div className="lg:flex lg:h-screen">
        {/* Sidebar */}
        <div className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:top-0 lg:translate-x-0 lg:flex lg:flex-shrink-0
        `}>
          <div className="flex flex-col h-full w-full">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-4 border-b">
              <div className="flex items-center gap-2 w-full">
                <img className="w-8" src={logo} alt="" />
                <h1 className="text-xl font-bold text-foreground">FICELCO</h1>
                {/* <p className="text-sm text-muted-foreground">Admin Portal</p> */}
              </div>
            </div>

            {/* Navigation - scrollable */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-2 w-full">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200 animate-slide-in
                      ${active 
                        ? 'bg-primary text-primary-foreground shadow-electric' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="text-xs text-muted-foreground text-center">
                FICELCO Electric Company
                <br />
                Admin Dashboard v1.0
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 mt-[65px] lg:pl-0 overflow-y-auto">
          <main className="p-6">
            <DashboardOverview />
            {/* <Outlet /> */}
          </main>
        </div>
      </div>
    </div>
  );
}
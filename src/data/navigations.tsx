import NavItem from "@/types/NavItem";
import { Bell, Briefcase, Coins, FolderOpen, Inbox, Logs, Megaphone, Zap } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  Home,
  FileText,
  ClipboardCheck,
  UserCheck,
  Building,
  BarChart3,
  Settings,
} from "lucide-react";

export const superadminNavigations = [
  {
    title: "Dashboard",
    url: "/superadmin",
    icon: LayoutDashboard,
    group: "Main"
  },

  //MANAGEMENT
  {
    title: "Members",
    url: "members",
    icon: Users,
    group: "Management"
  },
  {
    title: "Accounts",
    url: "accounts",
    icon: Settings,
    group: "Management"
  },

  //CONTENT MANAGEMENT
  {
    title: "Monthly Rates",
    url: "monthly-rates",
    icon: FileText,
    group: "Content Management"
  },
  {
    title: "Announcements",
    url: "announcements",
    icon: Megaphone,
    group: "Content Management"
  },
  {
    title: "Job Openings",
    url: "jobs",
    icon: Briefcase,
    group: "Content Management"
  },
  {
    title: "Power Advisories",
    url: "power-advisories",
    icon: Zap,
    group: "Content Management"
  },
  {
    title: "Service Requests",
    url: "service-requests",
    icon: Inbox,
    group: "Content Management"
  },
  {
    title: "Documents",
    url: "documents",
    icon: FolderOpen,
    group: "Content Management"
  },
  {
    title: "Activiy Logs",
    url: "logs",
    icon: Logs,
    group: "System"
  }
];

export const userNavigations: NavItem[] = [
    {
        name: "Home",
        href: "/user",
        end: true,
        icon: (
            <Home className="h-5 w-5" />
        )
    },
    {
        name: "Bills",
        href: "/user/bills",
        end: true,
        icon: (
            <Coins />
        )
    },
    {
        name: "Notifications",
        href: "/notifications",
        end: true,
        icon: (
            <Bell className="h-5 w-5" />
        )
    },
];
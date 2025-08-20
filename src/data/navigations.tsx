import NavItem from "@/types/NavItem";
import { Archive, Bell, Briefcase, Coins, Database, Download, FileSignature, FolderOpen, Inbox, Logs, Megaphone, Upload, Zap } from "lucide-react";

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

  // Billing & Data Management
  {
    title: "Billing Data",
    url: "billing-data",
    icon: Database,
    group: "Billing & Data Management"
  },
  {
    title: "Bulk Uploads",
    url: "bulk-uploads",
    icon: Upload,
    group: "Billing & Data Management"
  },
  {
    title: "Upload Logs",
    url: "upload-logs",
    icon: Logs,
    group: "Billing & Data Management"
  },
  {
    title: "Backup & Downloads",
    url: "backups",
    icon: Download,
    group: "Billing & Data Management"
  },

  // Procurement Management
  {
    title: "Invitations to Bid",
    url: "itb",
    icon: FileSignature,
    group: "Procurement Management"
  },
  {
    title: "Notice of Award",
    url: "noa",
    icon: FileText,
    group: "Procurement Management"
  },
  {
    title: "Bid Documents",
    url: "bid-documents",
    icon: FolderOpen,
    group: "Procurement Management"
  },
  {
    title: "Procurement Schedules",
    url: "procurement-schedules",
    icon: FileText,
    group: "Procurement Management"
  },
  {
    title: "Bid Archives",
    url: "bid-archives",
    icon: Archive,
    group: "Procurement Management"
  },

  //LOGS
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
import NavItem from "@/types/NavItem";
import { Archive, Award, Bell, Briefcase, Calendar, Coins, CreditCard, Database, DollarSign, Download, FileSignature, FolderOpen, HelpCircle, Inbox, Logs, Megaphone, Upload, UploadCloud, Zap } from "lucide-react";

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
    icon: CreditCard,
    group: "Management"
  },

  //CONTENT MANAGEMENT
  // {
  //   title: "Monthly Rates",
  //   url: "monthly-rates",
  //   icon: DollarSign,
  //   group: "Content Management"
  // },
  // {
  //   title: "Announcements",
  //   url: "announcements",
  //   icon: Megaphone,
  //   group: "Content Management"
  // },
  // {
  //   title: "Job Openings",
  //   url: "jobs",
  //   icon: Briefcase,
  //   group: "Content Management"
  // },
  // {
  //   title: "Power Advisories",
  //   url: "power-advisories",
  //   icon: Zap,
  //   group: "Content Management"
  // },
  {
    title: "Posts",
    url: "posts",
    icon: Megaphone,
    group: "Content Management"
  },
  {
    title: "Service Requests",
    url: "service-requests",
    icon: HelpCircle,
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
    icon: UploadCloud,
    group: "Billing & Data Management"
  },
  {
    title: "Backup & Downloads",
    url: "backups",
    icon: Archive,
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
    icon: Award,
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
    icon: Calendar,
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
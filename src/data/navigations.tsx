import NavItem from "@/types/NavItem";
import { Bell, Coins } from "lucide-react";

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
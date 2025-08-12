import NavItem from "@/types/NavItem";
import { Bell, Coins, Home, LayoutDashboard, Settings, Users } from "lucide-react";

export const superadminNavigations: NavItem[] = [
    {
        name: "Dashboard",
        href: "/superadmin",
        end: true,
        icon: (
            <LayoutDashboard className="h-5 w-5" />
        )
    },
    {
        name: "Members",
        href: "/superadmin/members",
        end: false,
        icon: (
            <Users className="h-5 w-5" />
        )
    },
    {
        name: "Accounts",
        href: "/superadmin/accounts",
        end: false,
        icon: (
            <Users className="h-5 w-5" />
        )
    },
    {
        name: "Settings",
        href: "/superadmin/settings",
        end: false,
        icon: (
            <Settings className="h-5 w-5" />
        )
    },
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
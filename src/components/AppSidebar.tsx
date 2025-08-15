import { NavLink } from "react-router-dom";
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    group: "Main"
  },
  {
    title: "Residents",
    url: "/residents",
    icon: Users,
    group: "Management"
  },
  {
    title: "Households",
    url: "/households", 
    icon: Home,
    group: "Management"
  },
  {
    title: "Blotter",
    url: "/blotter",
    icon: FileText,
    group: "Management"
  },
  {
    title: "Permits",
    url: "/permits",
    icon: ClipboardCheck,
    group: "Services"
  },
  {
    title: "Officials",
    url: "/officials",
    icon: UserCheck,
    group: "Administration"
  },
  {
    title: "Businesses",
    url: "/businesses",
    icon: Building,
    group: "Administration"
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    group: "Analytics"
  },
  {
    title: "Users",
    url: "/users",
    icon: Settings,
    group: "System"
  }
];

const groupedItems = menuItems.reduce((acc, item) => {
  if (!acc[item.group]) {
    acc[item.group] = [];
  }
  acc[item.group].push(item);
  return acc;
}, {} as Record<string, typeof menuItems>);

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Barangay</h2>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(groupedItems).map(([group, items]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel>{group}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent"
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
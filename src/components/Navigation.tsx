// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ThemeToggle } from "./ThemeToggle";
// import logo from "../assets/logo.png";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown } from "lucide-react";

// const Navigation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [infoOpen, setInfoOpen] = useState(false); // for mobile collapse
//   const location = useLocation();

//   const mainNavItems = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Billing Inquiry", path: "/billing" },
//     { name: "Services", path: "/services" },
//     { name: "News & Advisories", path: "/news" },
//     { name: "Biddings", path: "/biddings" },
//     { name: "Downloads", path: "/downloads" },
//     { name: "Contact Us", path: "/contact" },
//   ];
  
//   const infoItems = [
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="bg-background shadow-[var(--shadow-card)] sticky top-0 z-50 border-b border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 rounded-lg flex items-center justify-center">
//               <img src={logo} alt="FICELCO Logo" />
//             </div>
//             <span className="text-xl font-bold text-foreground">FICELCO</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {mainNavItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={cn(
//                   "nav-link px-3 py-2 rounded-md text-xs font-medium",
//                   isActive(item.path) && "nav-link-active"
//                 )}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* Information Dropdown */}
//             {/* <DropdownMenu>
//               <DropdownMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary flex items-center gap-1">
//                 Information
//                 <ChevronDown className="w-4 h-4" />
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 {infoItems.map((item) => (
//                   <DropdownMenuItem asChild key={item.name}>
//                     <Link to={item.path}>{item.name}</Link>
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu> */}

//             <div className="ml-4 flex items-center gap-4">
//               <ThemeToggle />
//               <Button>
//                 <Link to={'/login'}>
//                   Login
//                 </Link>
//               </Button>
//             </div>

//           </div>

//           {/* Mobile menu button and theme toggle */}
//           <div className="lg:hidden flex items-center space-x-4">
//             <ThemeToggle />
//             <Button>
//               <Link to={'/login'}>
//                 Login
//               </Link>
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-label="Toggle navigation menu"
//             >
//               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="lg:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
//               {mainNavItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={cn(
//                     "block px-3 py-2 rounded-md text-base font-medium transition-colors",
//                     isActive(item.path)
//                       ? "text-primary bg-secondary"
//                       : "text-foreground hover:text-primary hover:bg-secondary"
//                   )}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}

//               {/* Collapsible Info Section */}
//               {/* <div>
//                 <button
//                   onClick={() => setInfoOpen(!infoOpen)}
//                   className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
//                 >
//                   Information
//                   <ChevronDown
//                     className={cn(
//                       "w-4 h-4 transition-transform",
//                       infoOpen && "rotate-180"
//                     )}
//                   />
//                 </button>
//                 {infoOpen && (
//                   <div className="pl-4">
//                     {infoItems.map((item) => (
//                       <Link
//                         key={item.name}
//                         to={item.path}
//                         className="block px-3 py-2 rounded-md text-sm text-foreground hover:text-primary hover:bg-secondary"
//                         onClick={() => setIsOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div> */}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  name: string;
  path?: string;
  subItems?: { name: string; path: string }[];
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const location = useLocation();

  /** MAIN NAVIGATION DEFINITION */
  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { 
      name: "News & Advisories", 
      path: "/news",
      subItems: [
        {name: "Monthly Power Rates", path: "/news/power-rate"},
        {name: "Announcements and Advisories", path: "/news/announcement-advisory"},
        {name: "Job Vacancy", path: "/news/job-vacancy"},
      ]
    },
    {
      name: "About",
      path: "/about",
      subItems: [
        { name: "History", path: "/about/history" },
        { name: "Vision, Mission, and Goal", path: "/about/vmg" },
        { name: "Board of Directors", path: "/about/bod" },
        { name: "Mangement Team", path: "/about/mt" },
      ],
    },
    { name: "Billing Inquiry", path: "/billing" },
    { name: "Services", path: "/services" },
    { name: "Biddings", path: "/biddings" },
    { name: "Downloads", path: "/downloads" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path?: string) => location.pathname === path;

  return (
    <nav className="bg-background shadow-[var(--shadow-card)] sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="FICELCO Logo" />
            </div>
            <span className="text-xl font-bold text-foreground">FICELCO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {navItems.map((item) =>
              item.subItems ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary flex items-center gap-1">
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.subItems.map((sub) => (
                      <DropdownMenuItem asChild key={sub.name}>
                        <Link
                          to={sub.path}
                          className={cn(
                            "block px-2 py-1 rounded-sm text-sm",
                            isActive(sub.path) && "bg-muted font-semibold"
                          )}
                        >
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.path!}
                  className={cn(
                    "nav-link px-3 py-2 rounded-md text-sm font-medium",
                    isActive(item.path) && "nav-link-active"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}

            <div className="ml-4 flex items-center gap-4">
              <ThemeToggle />
              <Button>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button>
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenSubMenu(
                            openSubMenu === item.name ? null : item.name
                          )
                        }
                        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-secondary"
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            openSubMenu === item.name && "rotate-180"
                          )}
                        />
                      </button>
                      {openSubMenu === item.name && (
                        <div className="pl-6 space-y-1 mt-1">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className={cn(
                                "block px-3 py-1 rounded-md text-sm text-foreground hover:text-primary hover:bg-secondary",
                                isActive(sub.path) && "bg-secondary font-medium"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path!}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                        isActive(item.path)
                          ? "text-primary bg-secondary"
                          : "text-foreground hover:text-primary hover:bg-secondary"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

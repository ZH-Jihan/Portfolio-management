"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Briefcase,
  FileText,
  Folder,
  Home,
  LayoutDashboardIcon,
  Lightbulb,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  {
    name: "Blog",
    icon: <FileText />,
    subItems: [
      { name: "Create", path: "/dashboard/blog" },
      { name: "Update", path: "#" },
      { name: "Delete", path: "#" },
    ],
  },
  {
    name: "Experience",
    icon: <Briefcase />,
    subItems: [
      { name: "Create", path: "/dashboard/experience" },
      { name: "Update", path: "#" },
      { name: "Delete", path: "#" },
    ],
  },
  {
    name: "Project",
    icon: <Folder />,
    subItems: [
      { name: "Create", path: "/dashboard/project" },
      { name: "Update", path: "#" },
      { name: "Delete", path: "#" },
    ],
  },
  {
    name: "Skill",
    icon: <Lightbulb />,
    subItems: [{ name: "Create", path: "/dashboard/skill" }],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleRouteChange = (route: string) => {
    router.push(route);
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row min-h-screen w-full bg-background">
        {/* Sidebar for larger screens */}
        <Sidebar
          className={`${
            isSidebarOpen ? "block" : "hidden md:flex"
          } md:w-64 bg-gray-800 `}
        >
          <SidebarHeader className="p-4 text-xl font-bold">
            Portfolio-Dashboard
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleRouteChange("/")}
                  isActive={pathname === "/"}
                >
                  <Home />
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleRouteChange("/dashboard")}
                  isActive={pathname === "/dashboard"}
                >
                  <LayoutDashboardIcon />
                  Dashboard
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {sidebarItems.map((item) => (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        {item.icon}
                        {item.name}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem
                          onClick={() => handleRouteChange(subItem.path)}
                          key={subItem.name}
                        >
                          {subItem.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ))}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Mobile Top Bar with SidebarTrigger */}
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-gray-800 text-white">
          <span className="text-lg font-bold">Dashboard</span>
          <SidebarTrigger
            className="ml-auto"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

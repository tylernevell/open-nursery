import { LogsIcon, Settings2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

const navMainItems = [
  {
    title: "Daily Log",
    url: "#",
    icon: LogsIcon,
    isActive: true,
    items: [
      {
        title: "Dashboard",
        url: "/daily-log",
      },
      {
        title: "History",
        url: "/daily-log/history",
      },
    ],
  },
];

const sidebarMenuItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>OpenNursery</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavMain items={navMainItems} />
            <SidebarMenu>
              {sidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu> */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

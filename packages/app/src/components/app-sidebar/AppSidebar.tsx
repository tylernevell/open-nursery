import { HelpingHand, LogsIcon, Settings2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "~/components/ui/sidebar";
import "~/styles/app.css";
import { NavMain } from "./nav-main";

const navMain = [
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
    ],
  },
  {
    title: "Caregivers",
    url: "#",
    icon: HelpingHand,
    items: [
      {
        title: "Overview",
        url: "/caregivers",
      },
      {
        title: "Schedule",
        url: "/caregivers",
      },
      {
        title: "Manage",
        url: "/caregivers/manage",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>OpenNursery</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavMain items={navMain} />
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

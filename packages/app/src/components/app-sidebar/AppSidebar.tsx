import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { LogOut, LogsIcon, Settings2 } from 'lucide-react';
import { toast } from 'sonner';
import { NavMain } from './nav-main';

const navMainItems = [
  {
    title: 'Daily Log',
    url: '#',
    icon: LogsIcon,
    isActive: true,
    items: [
      {
        title: 'Dashboard',
        url: '/daily-log',
      },
      {
        title: 'History',
        url: '/daily-log/history',
      },
    ],
  },
];

const sidebarMenuItems = [
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings2,
  },
];

export function AppSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate({ to: '/login' });
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>OpenNursery</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col justify-between h-[calc(100vh-4rem)]">
            <div>
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
            </div>

            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

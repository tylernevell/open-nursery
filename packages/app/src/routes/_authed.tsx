import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";

export const Route = createFileRoute("/_authed")({
  component: AuthedLayout,
});

export default function AuthedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}
      <main className="ml-2 mt-2">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

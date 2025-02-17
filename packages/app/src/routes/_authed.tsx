import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { authClient } from "~/lib/apis/authClient";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    const { data, error } = await authClient.getSession();

    console.log({ where: "fe app", session: data?.session });

    if (error || !data.session) {
      throw redirect({
        to: "/login",
        search: {
          redirect: window.location.pathname,
        },
      });
    }
  },
  component: AuthedLayout,
});

export default function AuthedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="ml-2 mt-2">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

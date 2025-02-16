import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "~/components/app-sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { supabaseClient } from "~/lib/apis/supabaseClient";

export const Route = createFileRoute("/_authed")({
  // beforeLoad: async () => {
  //   const {
  //     data: { session },
  //   } = await supabaseClient.auth.getSession();

  //   console.log({ session });

  //   if (!session) {
  //     throw redirect({
  //       to: "/login",
  //       search: {
  //         redirect: window.location.pathname,
  //       },
  //     });
  //   }
  // },
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

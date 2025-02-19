import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_authed")({
  beforeLoad: async () => {
    // const { isPending } = authClient.useSession();

    // console.log({
    //   where: 'fe app - createFileRoute("/_authed")',
    //   isPending,
    // });

    // if (isPending) {
    //   return <div>Loading...</div>;
    // }

    console.log({
      where: 'fe app - createFileRoute("/_authed")',
      // session: data?.session,
      // user: data?.user,
      // error,
    });

    //   if (error || !data.session) {
    //     throw redirect({
    //       to: "/login",
    //       search: {
    //         redirect: window.location.pathname,
    //       },
    //     });
    //   }
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

import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarNav } from "@/components/settings/side-navbar";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_authed/settings/_settings-layout")({
  component: SettingsLayout,
});

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
];

export default function SettingsLayout() {
  return (
    <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* <aside className="-mx-4 xl:w-1/5"> */}
        <aside>
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

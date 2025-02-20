import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <Toaster position="top-center" />
    </AuthProvider>
  ),
});

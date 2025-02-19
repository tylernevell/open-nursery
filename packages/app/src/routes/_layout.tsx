import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/AuthContext";

export const Route = createFileRoute("/_layout")({
  component: SignedOutLayout,
});

function SignedOutLayout() {
  return (
    <AuthProvider>
      <div className="">
        {/* <div className="py-4">
          <SignedOutNavigation />
        </div> */}
        <Outlet />
      </div>
    </AuthProvider>
  );
}

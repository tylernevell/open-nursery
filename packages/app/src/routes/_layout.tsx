import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SignedOutNavigation } from "~/components/signed-out/SignedOutNavigation";

export const Route = createFileRoute("/_layout")({
  component: SignedOutLayout,
});

function SignedOutLayout() {
  return (
    <div className="container mx-auto">
      <div className="py-4">
        <SignedOutNavigation />
      </div>
      <Outlet />
    </div>
  );
}

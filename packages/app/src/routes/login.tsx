import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "~/components/signed-out/LoginForm";
import { SignedOutNavigation } from "~/components/signed-out/SignedOutNavigation";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SignedOutNavigation />
      <div className="container mx-auto px-4 py-16">
        <LoginForm />
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SignedOutNavigation } from "~/components/signed-out/SignedOutNavigation";
import SignUpForm from "~/components/signed-out/SignUpForm";

export const Route = createFileRoute("/_layout/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <SignUpForm />
    </div>
  );
}

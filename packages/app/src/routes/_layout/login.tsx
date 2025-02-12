import { createFileRoute } from "@tanstack/react-router";
import LoginForm from "~/components/signed-out/LoginForm";

export const Route = createFileRoute("/_layout/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <LoginForm />
    </div>
  );
}

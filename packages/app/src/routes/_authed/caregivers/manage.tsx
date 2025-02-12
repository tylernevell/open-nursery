import { createFileRoute } from "@tanstack/react-router";
import CaregiversManagerPage from "~/components/caregivers/CaregiversManagerPage";

export const Route = createFileRoute("/_authed/caregivers/manage")({
  component: CaregiversComponent,
});

function CaregiversComponent() {
  return <CaregiversManagerPage />;
}

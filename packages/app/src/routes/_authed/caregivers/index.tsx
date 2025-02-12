import { createFileRoute } from "@tanstack/react-router";
import CaregiversOverviewPage from "~/components/caregivers/CaregiversOverviewPage";

export const Route = createFileRoute("/_authed/caregivers/")({
  component: CaregiversComponent,
});

function CaregiversComponent() {
  return <CaregiversOverviewPage />;
}

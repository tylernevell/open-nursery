import { createFileRoute } from "@tanstack/react-router";
import DailyLog from "@/components/daily-log/DailyLogPage";

export const Route = createFileRoute("/_authed/daily-log/")({
  component: DailyLogPage,
});

function DailyLogPage() {
  return <DailyLog />;
}

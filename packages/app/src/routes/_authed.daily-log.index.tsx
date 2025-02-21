import DailyLog from '@/components/daily-log/DailyLogPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/daily-log/')({
  component: DailyLogPage,
});

function DailyLogPage() {
  return <DailyLog />;
}

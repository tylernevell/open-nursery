import History from '@/components/daily-log/HistoryPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authed/daily-log/history')({
  component: HistoricalDailyLogs,
});

function HistoricalDailyLogs() {
  return <History />;
}

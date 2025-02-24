import PageHeader from '../PageHeader';
import { LogEventForm } from './LogEventForm';
import SummarySection from './SummaryPanel';
import Timeline from './Timeline';
import UpcomingTasksList from './UpcomingTasksList';

export default function DailyLog() {
  return (
    <div className="w-full container mx-auto p-4">
      <PageHeader title="Daily Log">
        <LogEventForm />
      </PageHeader>

      {/* <h2 className="font-semibold mb-4">Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <SummarySection />
      </div> */}

      <p className="text-muted-foreground">{`${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}</p>

      <hr className="my-6" />

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 w-full">
          <UpcomingTasksList />
        </div>

        <div className="col-span-3 space-y-6">
          <h2 className="font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <SummarySection />
          </div>

          <hr />

          <div className="space-y-4">
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
}

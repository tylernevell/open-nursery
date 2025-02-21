import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { timelineData as sampleData } from './data/timeline-entries';

interface TimelineEntryProps {
  time: string;
  type: string;
  details: string;
  icon: React.ElementType;
}

export function TimelineEntry({ time, type, details, icon: Icon }: Readonly<TimelineEntryProps>) {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-muted p-2">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{type}</p>
              <time className="text-sm text-muted-foreground">{time}</time>
            </div>
            <p className="text-sm text-muted-foreground">{details}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TimelineSection() {
  return (
    <div className="rounded-md border p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-4">Timeline</h2>
        {/* <button className="text-sm text-muted-foreground">View full log</button> */}
      </div>
      <ScrollArea className="h-[600px] w-full">
        {sampleData.map((data) => (
          <TimelineEntry key={data.time} time={data.time} type={data.type} details={data.details} icon={data.icon} />
        ))}
      </ScrollArea>
    </div>
  );
}

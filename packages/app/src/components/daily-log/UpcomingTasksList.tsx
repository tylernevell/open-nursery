import { ScrollArea } from "../ui/scroll-area";

interface TaskItemProps {
  time: string;
  label: string;
  type: string;
}

function TaskItem({ time, label, type }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0">
      <div className="flex items-center gap-2">
        {/* <div className="h-2 w-2 rounded-full bg-primary"></div> */}
        <span className="font-medium">{label}</span>
        {/* <span className="font-medium">{type}</span> */}
      </div>
      <time className="text-sm text-muted-foreground">{time}</time>
    </div>
  );
}

export default function UpcomingTasksList() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-4">Upcoming Tasks</h2>
      </div>
      <ScrollArea className="w-[350px] rounded-md border p-4">
        <div className="space-y-4">
          <TaskItem time="3:30 PM" label="Next Feeding" type="feeding" />
          <TaskItem time="4:00 PM" label="Nap Time" type="sleep" />
          <TaskItem time="5:30 PM" label="Medicine" type="medicine" />
          <TaskItem time="5:30 PM" label="Medicine" type="medicine" />
          <TaskItem time="5:30 PM" label="Medicine" type="medicine" />
        </div>
      </ScrollArea>
    </div>
  );
}

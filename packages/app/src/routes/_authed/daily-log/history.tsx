import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import PageHeader from "~/components/PageHeader";

export const Route = createFileRoute("/_authed/daily-log/history")({
  component: HistoricalDailyLogs,
});

// Mock data
const mockDailyLogs = [
  {
    id: 1,
    babyId: 1,
    date: "2024-02-14",
    feeding: {
      totalCount: 8,
      totalAmount: 720, // ml
      breastCount: 4,
      bottleCount: 4,
      solidCount: 0,
    },
    diapers: {
      wetCount: 6,
      dirtyCount: 2,
      bothCount: 1,
    },
    sleep: {
      totalDuration: 840, // minutes (14 hours)
      longestStretch: 240, // minutes (4 hours)
      napCount: 4,
    },
    events: [
      {
        type: "feeding",
        timestamp: "2024-02-14T06:00:00Z",
        method: "breast",
        duration: 20,
        side: "left",
      },
      {
        type: "sleep",
        timestamp: "2024-02-14T07:30:00Z",
        duration: 120,
        location: "crib",
      },
      // More events...
    ],
    notes: "Good day overall. Started new bedtime routine.",
  },
  {
    id: 2,
    babyId: 1,
    date: "2024-02-13",
    feeding: {
      totalCount: 7,
      totalAmount: 690,
      breastCount: 3,
      bottleCount: 4,
      solidCount: 0,
    },
    diapers: {
      wetCount: 5,
      dirtyCount: 3,
      bothCount: 0,
    },
    sleep: {
      totalDuration: 780,
      longestStretch: 180,
      napCount: 3,
    },
    events: [
      // Events for this day...
    ],
    notes: "Fussy during afternoon nap.",
  },
];

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatDiaperCounts(wet: number, dirty: number, both: number) {
  return `${wet}W ${dirty}D ${both}B`;
}

function HistoricalDailyLogs() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (rowId: number) => {
    setExpandedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    );
  };

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Daily Logs History" />
      <p className="text-muted-foreground">View and compare daily summaries</p>

      <hr className="my-6" />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-36">Date</TableHead>
              <TableHead className="w-40">Feedings</TableHead>
              <TableHead className="w-40">Diapers</TableHead>
              <TableHead className="w-40">Sleep</TableHead>
              <TableHead className="w-80">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDailyLogs.map((log) => (
              <React.Fragment key={log.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(log.id)}
                    >
                      {expandedRows.includes(log.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    {new Date(log.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>Total: {log.feeding.totalCount}</div>
                      <div className="text-sm text-muted-foreground">
                        {log.feeding.totalAmount}ml
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>
                        Total:{" "}
                        {log.diapers.wetCount +
                          log.diapers.dirtyCount +
                          log.diapers.bothCount}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDiaperCounts(
                          log.diapers.wetCount,
                          log.diapers.dirtyCount,
                          log.diapers.bothCount,
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{formatDuration(log.sleep.totalDuration)}</div>
                      <div className="text-sm text-muted-foreground">
                        {log.sleep.napCount} naps
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="">{log.notes}</TableCell>
                </TableRow>
                {expandedRows.includes(log.id) && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={6}>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">
                              Feeding Details
                            </h4>
                            <ul className="space-y-1 text-sm">
                              <li>Breast: {log.feeding.breastCount}</li>
                              <li>Bottle: {log.feeding.bottleCount}</li>
                              <li>Solids: {log.feeding.solidCount}</li>
                              <li>Total Volume: {log.feeding.totalAmount}ml</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Sleep Details
                            </h4>
                            <ul className="space-y-1 text-sm">
                              <li>
                                Total Sleep:{" "}
                                {formatDuration(log.sleep.totalDuration)}
                              </li>
                              <li>
                                Longest Stretch:{" "}
                                {formatDuration(log.sleep.longestStretch)}
                              </li>
                              <li>Number of Naps: {log.sleep.napCount}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              Diaper Details
                            </h4>
                            <ul className="space-y-1 text-sm">
                              <li>Wet: {log.diapers.wetCount}</li>
                              <li>Dirty: {log.diapers.dirtyCount}</li>
                              <li>Both: {log.diapers.bothCount}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default HistoricalDailyLogs;

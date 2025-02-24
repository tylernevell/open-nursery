import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { mockDailyLogs } from './data/history-data';

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

function formatDiaperCounts(wet: number, dirty: number, both: number) {
  return `${wet}W ${dirty}D ${both}B`;
}

export default function History() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (rowId: number) => {
    setExpandedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
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
              <TableHead className="w-10" />
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
                    <Button variant="ghost" size="sm" onClick={() => toggleRow(log.id)}>
                      {expandedRows.includes(log.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{new Date(log.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div>
                      <div>Total: {log.feeding.totalCount}</div>
                      <div className="text-sm text-muted-foreground">{log.feeding.totalAmount}ml</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>Total: {log.diapers.wetCount + log.diapers.dirtyCount + log.diapers.bothCount}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDiaperCounts(log.diapers.wetCount, log.diapers.dirtyCount, log.diapers.bothCount)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{formatDuration(log.sleep.totalDuration)}</div>
                      <div className="text-sm text-muted-foreground">{log.sleep.napCount} naps</div>
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
                            <h4 className="font-semibold mb-2">Feeding Details</h4>
                            <ul className="space-y-1 text-sm">
                              <li>Breast: {log.feeding.breastCount}</li>
                              <li>Bottle: {log.feeding.bottleCount}</li>
                              <li>Solids: {log.feeding.solidCount}</li>
                              <li>Total Volume: {log.feeding.totalAmount}ml</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Sleep Details</h4>
                            <ul className="space-y-1 text-sm">
                              <li>Total Sleep: {formatDuration(log.sleep.totalDuration)}</li>
                              <li>Longest Stretch: {formatDuration(log.sleep.longestStretch)}</li>
                              <li>Number of Naps: {log.sleep.napCount}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Diaper Details</h4>
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

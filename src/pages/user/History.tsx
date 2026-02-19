import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { History as HistoryIcon } from "lucide-react";

interface HistoryRecord {
  id: string;
  query: string;
  channel: string;
  priority: string;
  date: string;
}

const UserHistory: React.FC = () => {
  // API-ready: replace with actual data fetch
  const records: HistoryRecord[] = [];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">History</h1>
        <p className="text-muted-foreground mt-1">Your past queries and results</p>
      </div>

      <div className="bg-card border border-border rounded-xl card-shadow overflow-hidden">
        {records.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Query</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.query}</TableCell>
                  <TableCell>{r.channel}</TableCell>
                  <TableCell>{r.priority}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <HistoryIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No history yet</h3>
            <p className="text-sm text-muted-foreground">Your query history will appear here once you start generating content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistory;

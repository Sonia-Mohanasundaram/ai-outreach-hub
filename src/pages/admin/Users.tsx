import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Trash2, Eye, X } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
}

interface HistoryItem {
  id: string;
  query: string;
  channel: string;
  priority: string;
  date: string;
  pipeline_summary?: Record<string, string>;
  agent_outputs?: Record<string, string>[];
  generated_content?: string;
}

const AdminUsers: React.FC = () => {
  // API-ready
  const [users] = useState<UserRecord[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [userHistory] = useState<HistoryItem[]>([]);

  const handleDelete = async (userId: string) => {
    // API placeholder
  };

  const handleViewHistory = async (user: UserRecord) => {
    setSelectedUser(user);
    // API placeholder: fetch user history
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground mt-1">Manage registered users</p>
      </div>

      <div className="flex gap-6">
        {/* Users Table */}
        <div className={`bg-card border border-border rounded-xl card-shadow overflow-hidden ${selectedUser ? "flex-1" : "w-full"} transition-all`}>
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-[100px]">Delete</TableHead>
                  <TableHead className="w-[120px]">View History</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{u.id.slice(0, 8)}...</TableCell>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(u.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleViewHistory(u)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center">
              <UsersIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No users yet</h3>
              <p className="text-sm text-muted-foreground">Registered users will appear here</p>
            </div>
          )}
        </div>

        {/* History Panel */}
        {selectedUser && (
          <div className="w-96 bg-card border border-border rounded-xl card-shadow p-6 animate-slide-in-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{selectedUser.name}'s History</h3>
              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {userHistory.length > 0 ? (
              <div className="space-y-3">
                {userHistory.map((h) => (
                  <div key={h.id} className="bg-muted rounded-lg p-3">
                    <p className="text-sm font-medium text-foreground">{h.query}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">{h.channel}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{h.priority}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{h.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No history available for this user.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

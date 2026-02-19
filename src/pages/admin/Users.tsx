import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Trash2 } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
}

const AdminUsers: React.FC = () => {
  const [users] = useState<UserRecord[]>([]);

  const handleDelete = async (userId: string) => {
    // API placeholder
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground mt-1">Manage registered users</p>
      </div>

      <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
        {users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{u.id.slice(0, 8)}...</TableCell>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(u.id)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UsersIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No users yet</h3>
            <p className="text-sm text-muted-foreground">Registered users will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

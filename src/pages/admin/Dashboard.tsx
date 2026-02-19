import React from "react";
import { Users, Sparkles, Linkedin, Mail, Phone } from "lucide-react";

const stats = [
  { label: "Total Users", value: 0, icon: Users, color: "text-primary" },
  { label: "Total Queries", value: 0, icon: Sparkles, color: "text-success" },
  { label: "LinkedIn", value: 0, icon: Linkedin, color: "text-info" },
  { label: "Email", value: 0, icon: Mail, color: "text-warning" },
  { label: "Call", value: 0, icon: Phone, color: "text-destructive" },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-6 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Upload, BarChart3, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Queries", value: 0, icon: Sparkles, color: "text-primary" },
  { label: "Uploads", value: 0, icon: Upload, color: "text-success" },
  { label: "Pipeline Runs", value: 0, icon: BarChart3, color: "text-warning" },
  { label: "History", value: 0, icon: History, color: "text-info" },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name || "User"}</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your outreach activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/user/generate")}
          className="bg-card border border-border rounded-xl p-6 card-shadow hover:card-shadow-md cursor-pointer transition-all hover:border-primary/30"
        >
          <Sparkles className="h-6 w-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-1">Generate Content</h3>
          <p className="text-sm text-muted-foreground">Create AI-powered outreach for your leads</p>
        </div>
        <div
          onClick={() => navigate("/user/history")}
          className="bg-card border border-border rounded-xl p-6 card-shadow hover:card-shadow-md cursor-pointer transition-all hover:border-primary/30"
        >
          <History className="h-6 w-6 text-primary mb-3" />
          <h3 className="font-semibold text-foreground mb-1">View History</h3>
          <p className="text-sm text-muted-foreground">Browse your past queries and results</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

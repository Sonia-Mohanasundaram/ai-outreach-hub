import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Upload, BarChart3, History, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Queries", value: 0, icon: Sparkles, gradient: "from-blue-500 to-cyan-500" },
  { label: "Uploads", value: 0, icon: Upload, gradient: "from-emerald-500 to-teal-500" },
  { label: "Pipeline Runs", value: 0, icon: BarChart3, gradient: "from-orange-500 to-amber-500" },
  { label: "History", value: 0, icon: History, gradient: "from-purple-500 to-pink-500" },
];

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name || "User"} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your outreach activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="relative overflow-hidden bg-card border border-border rounded-2xl p-6 card-shadow hover:card-shadow-md transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.gradient} opacity-10 rounded-full -translate-y-6 translate-x-6`} />
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 shadow-lg`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/user/generate")}
          className="group bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5"
        >
          <Sparkles className="h-8 w-8 text-white/80 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">Generate Content</h3>
          <p className="text-sm text-white/70 mb-4">Create AI-powered outreach for your leads</p>
          <div className="flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
            Get started <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        <div
          onClick={() => navigate("/user/history")}
          className="group bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-0.5"
        >
          <History className="h-8 w-8 text-white/80 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">View History</h3>
          <p className="text-sm text-white/70 mb-4">Browse your past queries and results</p>
          <div className="flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
            View all <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

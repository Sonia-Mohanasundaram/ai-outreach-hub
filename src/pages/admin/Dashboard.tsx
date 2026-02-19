import React from "react";
import { Users, Sparkles, Linkedin, Mail, Phone, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Total Users", value: 0, icon: Users, gradient: "from-blue-500 to-indigo-500" },
  { label: "Total Queries", value: 0, icon: Sparkles, gradient: "from-purple-500 to-pink-500" },
  { label: "LinkedIn", value: 0, icon: Linkedin, gradient: "from-sky-500 to-blue-500" },
  { label: "Email", value: 0, icon: Mail, gradient: "from-amber-500 to-orange-500" },
  { label: "Call", value: 0, icon: Phone, gradient: "from-emerald-500 to-teal-500" },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="relative overflow-hidden bg-card border border-border rounded-2xl p-6 card-shadow hover:card-shadow-md transition-all">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${s.gradient} opacity-10 rounded-full -translate-y-4 translate-x-4`} />
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
          onClick={() => navigate("/admin/users")}
          className="group bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-0.5"
        >
          <Users className="h-8 w-8 text-white/80 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">Manage Users</h3>
          <p className="text-sm text-white/70 mb-4">View and manage registered users</p>
          <div className="flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
            View users <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        <div
          onClick={() => navigate("/admin/activity")}
          className="group bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-0.5"
        >
          <TrendingUp className="h-8 w-8 text-white/80 mb-3" />
          <h3 className="font-semibold text-white text-lg mb-1">View Activity</h3>
          <p className="text-sm text-white/70 mb-4">Monitor system activity and logs</p>
          <div className="flex items-center text-white/80 text-sm font-medium group-hover:text-white transition-colors">
            View activity <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

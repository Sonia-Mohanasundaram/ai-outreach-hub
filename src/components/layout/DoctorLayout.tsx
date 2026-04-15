import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useHospitalAuth } from "@/contexts/HospitalAuthContext";
import { Heart, LayoutDashboard, Clock, CalendarCheck, LogOut } from "lucide-react";

const links = [
  { label: "Dashboard", path: "/doctor/dashboard", icon: LayoutDashboard },
  { label: "Set Availability", path: "/doctor/availability", icon: Clock },
  { label: "My Schedule", path: "/doctor/schedule", icon: CalendarCheck },
];

const DoctorLayout: React.FC = () => {
  const { logout, user } = useHospitalAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden md:flex w-64 flex-col bg-gradient-to-b from-emerald-600 to-teal-700 text-white">
        <div className="p-6 flex items-center gap-2">
          <Heart className="h-6 w-6" />
          <span className="font-bold text-lg">MediCare</span>
        </div>
        <div className="px-4 py-2 mb-4">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs opacity-70">Doctor</p>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {links.map((l) => (
            <button
              key={l.path}
              onClick={() => navigate(l.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === l.path ? "bg-white/20 shadow-lg" : "hover:bg-white/10"
              }`}
            >
              <l.icon className="h-5 w-5" />
              {l.label}
            </button>
          ))}
        </nav>
        <div className="p-3 mt-auto">
          <button
            onClick={() => { logout(); navigate("/"); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-all"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-8 overflow-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;

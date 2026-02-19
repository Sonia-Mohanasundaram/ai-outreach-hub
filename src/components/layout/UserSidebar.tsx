import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Sparkles,
  Upload,
  History,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { label: "Generate", path: "/user/generate", icon: Sparkles },
  { label: "Upload", path: "/user/upload", icon: Upload },
  { label: "History", path: "/user/history", icon: History },
  { label: "Settings", path: "/user/settings", icon: Settings },
];

export const UserSidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800 flex flex-col shadow-xl">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">AI Outreach</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-200 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
};

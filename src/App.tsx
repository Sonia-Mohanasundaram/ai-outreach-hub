import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { UserLayout } from "@/components/layout/UserLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Landing from "@/pages/Landing";
import RoleSelection from "@/pages/RoleSelection";
import UserDashboard from "@/pages/user/Dashboard";
import Generate from "@/pages/user/Generate";
import UploadPage from "@/pages/user/Upload";
import UserHistory from "@/pages/user/History";
import UserSettings from "@/pages/user/Settings";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminActivity from "@/pages/admin/Activity";
import AdminSettings from "@/pages/admin/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode; role: "user" | "admin" }> = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (user?.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/auth" element={<RoleSelection />} />

    <Route path="/user" element={<ProtectedRoute role="user"><UserLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<UserDashboard />} />
      <Route path="generate" element={<Generate />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="history" element={<UserHistory />} />
      <Route path="settings" element={<UserSettings />} />
    </Route>

    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="activity" element={<AdminActivity />} />
      <Route path="history" element={<AdminActivity />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

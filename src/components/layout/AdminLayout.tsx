import React from "react";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout: React.FC = () => (
  <div className="flex min-h-screen w-full">
    <AdminSidebar />
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

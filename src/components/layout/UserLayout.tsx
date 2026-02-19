import React from "react";
import { Outlet } from "react-router-dom";
import { UserSidebar } from "./UserSidebar";

export const UserLayout: React.FC = () => (
  <div className="flex min-h-screen w-full">
    <UserSidebar />
    <main className="flex-1 p-6 lg:p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

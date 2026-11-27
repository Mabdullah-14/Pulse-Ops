import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen min-h-dvh overflow-x-hidden">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex min-w-0">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-[calc(100vh-3.5rem)] min-w-0 flex-1 flex-col">
          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
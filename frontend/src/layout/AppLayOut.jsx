import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-h-[calc(100vh-3.5rem)] min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-6 sm:px-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
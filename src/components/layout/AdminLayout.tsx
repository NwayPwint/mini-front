import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-institutional">
      {/* Top Navbar - full width */}
      <AdminNavbar />

      {/* Content Area: Sidebar + Main */}
      <div className="flex flex-1">
        {/* Left Sidebar - desktop only */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

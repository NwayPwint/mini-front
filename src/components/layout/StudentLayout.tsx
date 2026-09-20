import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";

export default function StudentLayout() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-institutional">
      {/* Top Navbar for Students */}
      <StudentNavbar />

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar tailored for Student routes */}
        <StudentSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

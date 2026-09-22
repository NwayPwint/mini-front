import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { adminNavigation } from "@/config/adminNavigation";
import { useAuth } from "@/stores/useAuthStore";
import { ShowCustomToast } from "@/utils/toast";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === "/admin" || location.pathname === "/admin/dashboard"
      : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    ShowCustomToast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-surface-border h-[calc(100vh-6.5rem)] sticky top-[6.5rem] transition-[width] duration-200 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-surface-border">
        {!collapsed && (
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Navigation
          </span>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-text-muted"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              title={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-custom-sm text-sm font-medium transition-all ${
                active
                  ? "bg-brand-royal/5 text-brand-royal border-l-2 border-brand-royal"
                  : "text-text-muted hover:bg-surface-institutional hover:text-brand-royal border-l-2 border-transparent"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-3 py-4 border-t border-surface-border space-y-2">
        {/* Back to Site Link */}
        <Link
          to="/"
          title="Back to Site"
          className="flex items-center gap-3 px-3 py-2.5 rounded-custom-sm text-sm font-medium text-text-muted hover:bg-surface-institutional hover:text-brand-royal transition-all"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          {!collapsed && <span>Back to Site</span>}
        </Link>

        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-text-muted hover:text-status-error hover:bg-status-error/5 px-3"
        >
          <LogOut size={18} strokeWidth={1.5} />
          {!collapsed && <span>Log Out</span>}
        </Button>
      </div>
    </aside>
  );
}
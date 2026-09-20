import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronsLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { adminNavigation } from "@/config/adminNavigation";

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === "/admin" || location.pathname === "/admin/dashboard"
      : location.pathname.startsWith(path);

  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-surface-border h-[calc(100vh-6.5rem)] sticky top-[6.5rem]">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-surface-border">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Navigation
        </span>
        {/* TODO: Add onClick to toggle sidebar collapse */}
        <Button variant="ghost" size="icon-sm" className="text-text-muted">
          <ChevronsLeft className="h-4 w-4" />
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-custom-sm text-sm font-medium transition-all ${
                active
                  ? "bg-brand-royal/5 text-brand-royal border-l-2 border-brand-royal"
                  : "text-text-muted hover:bg-surface-institutional hover:text-brand-royal border-l-2 border-transparent"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="px-3 py-4 border-t border-surface-border space-y-2">
        {/* Back to Site Link */}
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-custom-sm text-sm font-medium text-text-muted hover:bg-surface-institutional hover:text-brand-royal transition-all"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span>Back to Site</span>
        </Link>

        {/* TODO: Add onClick to call logout function */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-text-muted hover:text-status-error hover:bg-status-error/5 px-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Log Out</span>
        </Button>
      </div>
    </aside>
  );
}
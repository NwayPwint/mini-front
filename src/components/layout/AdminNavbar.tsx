import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Search,
  User,
  ShieldAlert,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationBell from "@/components/notification/NotificationBell";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { adminNavigation } from "@/config/adminNavigation";

export default function AdminNavbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/admin"
      ? location.pathname === "/admin" || location.pathname === "/admin/dashboard"
      : location.pathname.startsWith(path);

  return (
    <header className="w-full bg-white border-b border-surface-border sticky top-0 z-40">
      {/* Admin Top Alert / Badge Bar */}
      <div className="bg-brand-royal-dark text-xs text-white border-b border-surface-border">
        <div className="max-w-full mx-auto px-4 md:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-brand-gold" />
            <span>Admin Control Panel - Authorized Personnel Only</span>
          </div>
          <span className="text-brand-gold font-medium">
            System Status: Normal
          </span>
        </div>
      </div>

      {/* Main Admin Navbar */}
      <div className="max-w-full mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4">
        {/* Left: Sidebar Toggle (mobile) + Brand */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-text-muted"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/admin" className="flex items-center gap-2">
            <GraduationCap
              size={24}
              className="text-brand-royal"
              strokeWidth={1.5}
            />
            <span className="text-sm md:text-base font-semibold font-heading text-brand-navy tracking-tight">
              Admin Portal
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-xs relative">
          <Search size={16} className="absolute left-3 text-text-muted" />
          <Input
            type="text"
            placeholder="Search courses, users..."
            className="w-full pl-9 bg-surface-institutional border-surface-border rounded-custom-sm h-9"
          />
        </div>

        {/* Admin Right Actions (Notifications & Profile) */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <NotificationBell
            badgeClass="bg-brand-gold"
            buttonClass="text-text-muted hover:text-brand-royal"
          />

          {/* Admin Profile Area */}
          <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
            <div className="w-8 h-8 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center font-semibold text-sm">
              <User size={16} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-text-main">Admin User</p>
              <p className="text-[10px] text-text-muted">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 gap-0 bg-white p-0">
          <SheetHeader className="border-b border-surface-border pr-12">
            <SheetTitle
              className="p-0"
              render={<Link to="/admin" className="flex items-center gap-2" />}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-royal flex items-center justify-center text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg font-heading text-brand-navy">
                Admin Portal
              </span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
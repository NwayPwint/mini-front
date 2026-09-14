import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, ChevronRight, LogOut, User } from "lucide-react";
import LoginModal from "../modals/LoginModal";
import { useAuth } from "../../stores/useAuthStore";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Programs", path: "/programs" },
  { label: "Certificates", path: "/certificates" },
  { label: "Digital Library", path: "/digital-library" },
];

const topBarLinks = [
  { label: "Students", path: "/students" },
  { label: "Businesses", path: "/business" },
  { label: "Colleges & Universities", path: "/colleges" },
];

export default function PublicNavbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <header className="w-full bg-white border-b border-surface-border sticky top-0 z-50">
      <div className="bg-brand-royal-dark text-xs text-text-muted border-b border-surface-border">
        <div className="text-white max-w-7xl mx-auto px-4 md:px-6 py-3 flex gap-4 md:gap-6 overflow-x-auto">
          {topBarLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`whitespace-nowrap transition-colors ${
                isActive(item.path)
                  ? "text-brand-gold font-semibold"
                  : "hover:text-brand-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap
            size={24}
            className="text-brand-royal"
            strokeWidth={1.5}
          />
          <span className="text-sm md:text-base font-semibold font-heading text-brand-navy tracking-tight">
            <span className="hidden sm:inline">Learning Management System</span>
            <span className="sm:hidden">LMS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm text-text-muted">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`px-3 py-1.5 rounded-custom-sm transition-all ${
                isActive(item.path)
                  ? "text-brand-royal bg-brand-royal/5 font-semibold"
                  : "text-text-muted hover:text-brand-royal hover:bg-surface-institutional"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-text-main flex items-center gap-1.5 px-3 py-1.5">
                <User size={14} />
                {user?.name || user?.email}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-text-main hover:text-status-error px-3 py-1.5 rounded-custom-sm hover:bg-surface-institutional transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <LogOut size={14} />
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-sm font-medium text-text-main hover:text-brand-royal px-3 py-1.5 rounded-custom-sm hover:bg-surface-institutional transition-all cursor-pointer"
              >
                Log In
              </button>
              <Link
                to="/register"
                className="bg-brand-royal hover:bg-brand-royal-dark text-white px-4 py-1.5 rounded-custom-sm text-sm font-medium transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-main p-1.5 hover:bg-surface-institutional rounded-custom-sm transition-colors cursor-pointer"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden w-full bg-white border-t border-surface-border">
          <div className="px-4 py-2 border-b border-surface-border flex gap-4 text-xs text-text-muted">
            <span className="text-brand-gold font-semibold">
              For Individuals
            </span>
            <span className="cursor-pointer hover:text-brand-gold">
              For Businesses
            </span>
            <span className="cursor-pointer hover:text-brand-gold">
              For Colleges
            </span>
          </div>
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between text-sm px-3 py-2 rounded-custom-sm transition-all ${
                  isActive(item.path)
                    ? "text-brand-royal bg-brand-royal/5 font-semibold"
                    : "text-text-muted hover:text-brand-royal hover:bg-surface-institutional"
                }`}
              >
                {item.label}
                <ChevronRight size={14} className="opacity-40" />
              </Link>
            ))}
          </div>
          <div className="border-t border-surface-border px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-text-main flex items-center gap-1.5 px-3 py-2">
                  <User size={14} />
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full text-sm font-medium text-text-main hover:text-status-error hover:bg-surface-institutional px-3 py-2 rounded-custom-sm transition-all text-center cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full text-sm font-medium text-text-main hover:text-brand-royal hover:bg-surface-institutional px-3 py-2 rounded-custom-sm transition-all text-center cursor-pointer"
                >
                  Log In
                </button>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium bg-brand-royal hover:bg-brand-royal-dark text-white px-4 py-2 rounded-custom-sm transition-colors text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal Component */}
      {!isAuthenticated && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </header>
  );
}

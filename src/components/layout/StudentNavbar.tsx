import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, User, BookOpen, LogOut, Settings, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import NotificationBell from "@/components/notification/NotificationBell";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { studentNavigation } from "@/config/studentNavigation";
import { useAuth } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function StudentNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <header className="sticky top-0 z-30 bg-background border-b border-surface-border px-4 lg:px-6 py-2.5 flex items-center justify-between">
      {/* Brand Logo + Mobile Menu */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5 text-text-muted" />
        </Button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-royal flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <span className="font-bold text-lg font-heading text-brand-navy hidden sm:inline-block">
            LMS Platform
          </span>
        </Link>
      </div>

      {/* Course Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
          <Input
            type="search"
            placeholder="Search for courses, skills, or instructors..."
            className="w-full pl-9 bg-surface-institutional border-surface-border rounded-custom-sm"
          />
        </div>
      </div>

      {/* Action Icons & Profile */}
      <div className="flex items-center gap-2">
        <NotificationBell buttonClass="text-text-muted" />

        <div className="h-6 w-px bg-surface-border mx-1" />

        {/* User Quick Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/student.png" alt="Student" />
                <AvatarFallback className="bg-brand-royal/10 text-brand-royal font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-text-main">
                  {user?.name}
                </p>
                <p className="text-xs leading-none text-text-muted">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/student/learning" className="cursor-pointer">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>My Learning</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/student/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-status-error focus:text-status-error cursor-pointer"
              onSelect={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Navigation Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 gap-0 bg-white p-0">
          <SheetHeader className="border-b border-surface-border pr-12">
            <SheetTitle
              className="p-0"
              render={<Link to="/" className="flex items-center gap-2" />}
            >
              <div className="w-8 h-8 rounded-lg bg-brand-royal flex items-center justify-center text-white font-bold text-lg">
                L
              </div>
              <span className="font-bold text-lg font-heading text-brand-navy">
                LMS Platform
              </span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {studentNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive
                          ? "bg-brand-royal/10 text-brand-royal font-semibold"
                          : "text-text-muted hover:text-text-main"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Button>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

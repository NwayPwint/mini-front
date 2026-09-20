import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AdminNavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const adminNavigation: AdminNavigationItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Courses", path: "/admin/courses", icon: BookOpen },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];
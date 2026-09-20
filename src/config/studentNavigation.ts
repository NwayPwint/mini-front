import {
  LayoutDashboard,
  BookOpen,
  Award,
  Bookmark,
  User,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StudentNavigationItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

export const studentNavigation: StudentNavigationItem[] = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Learning",
    path: "/student/learning",
    icon: BookOpen,
  },
  {
    title: "Certificates",
    path: "/student/certificates",
    icon: Award,
  },
  {
    title: "Saved Courses",
    path: "/student/saved",
    icon: Bookmark,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/student/settings",
    icon: Settings,
  },
];
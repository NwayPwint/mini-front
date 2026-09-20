import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Shield,
  Camera,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Building2,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import { useGetMe } from "@/hooks/apis/useAuthQuery";

// Dynamic CTA button based on user role
const getRoleActionButton = (role?: string) => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return {
        label: "Admin Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      };
    case "COLLEGE":
    case "INSTRUCTOR":
      return {
        label: "Instructor Portal",
        path: "/instructor/dashboard",
        icon: GraduationCap,
      };
    case "BUSINESS":
      return {
        label: "Team Management",
        path: "/business/dashboard",
        icon: Building2,
      };
    default:
      return {
        label: "Dashboard",
        path: "/student/learning",
        icon: BookOpen,
      };
  }
};

// Dynamic badge styling based on role
const getRoleBadgeStyle = (role?: string) => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "COLLEGE":
    case "INSTRUCTOR":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "BUSINESS":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
};

// Fallback for empty values in the read-only display
const display = (value?: string | number | null) =>
  value === null || value === undefined || value === "" ? "—" : String(value);

export default function Profile() {
  const { data: user, isLoading, isError } = useGetMe();
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-text-muted">
        Loading profile data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-status-error">
        Failed to load user profile. Please login again.
      </div>
    );
  }

  const roleAction = getRoleActionButton(user?.role);
  const ActionIcon = roleAction.icon;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* Profile Header Banner */}
      <div className="bg-white border border-surface-border rounded-custom-sm p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
              <User size={48} />
            </div>
            <button
              type="button"
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 p-2 bg-brand-royal text-white rounded-full hover:bg-brand-royal-dark transition-colors shadow cursor-pointer"
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
              {user?.name}
            </h1>
            <p className="text-sm text-text-muted">{user?.role || "Student"}</p>
          </div>
        </div>

        {/* Role-based Navigation Button */}
        <Link to={roleAction.path}>
          <Button variant="default" className="flex items-center gap-2">
            <ActionIcon size={16} />
            {roleAction.label}
          </Button>
        </Link>
      </div>

      {/* Profile Details & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information (read-only) */}
        <div className="lg:col-span-2 bg-white border border-surface-border rounded-custom-sm p-6">
          <div className="flex items-center justify-between border-b border-surface-border pb-4">
            <h2 className="text-lg font-bold font-heading text-brand-navy">
              Personal Information
            </h2>
            <Link to="/student/settings">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Pencil size={14} />
                Edit in Settings
              </Button>
            </Link>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-6">
            <div>
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Full Name
              </dt>
              <dd className="mt-1 text-sm text-text-main">{display(user?.name)}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Email Address
              </dt>
              <dd className="mt-1 text-sm text-text-main break-all">
                {display(user?.email)}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-text-main">{display(user?.phone)}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Location
              </dt>
              <dd className="mt-1 text-sm text-text-main">{display(user?.address)}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Weekly Goal
              </dt>
              <dd className="mt-1 text-sm text-text-main">
                {display(user?.weeklyTargetHours)} hrs / week
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Member Since
              </dt>
              <dd className="mt-1 text-sm text-text-main">{memberSince}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Bio
              </dt>
              <dd className="mt-1 text-sm text-text-main leading-relaxed">
                {display(user?.bio)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Account Security & Roles */}
        <div className="bg-white border border-surface-border rounded-custom-sm p-6 space-y-6">
          <h2 className="text-lg font-bold font-heading text-brand-navy border-b border-surface-border pb-4">
            Security & Roles
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-surface-institutional rounded-custom-sm border border-surface-border">
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-brand-royal" />
                <div>
                  <p className="text-xs font-semibold text-text-main">Role</p>
                  <p className="text-[11px] text-text-muted">
                    {user?.role || "STUDENT"}
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getRoleBadgeStyle(
                  user?.role,
                )}`}
              >
                Active
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-text-main">
                Password Settings
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full text-center text-sm font-medium text-brand-royal hover:bg-brand-royal/5 border border-brand-royal/30 py-2 rounded-custom-sm transition-colors cursor-pointer"
                onClick={() => setIsChangePasswordModalOpen(true)}
              >
                Change Password
              </Button>
            </div>

            <div className="pt-4 border-t border-surface-border">
              <p className="text-xs text-text-muted">
                Account Created:{" "}
                <span className="font-medium text-text-main">
                  {memberSince}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
}
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  GraduationCap,
  Download,
  Plus,
  CheckCircle2,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetStats } from "@/hooks/apis/useAdminQuery";
import type {
  DashboardStats,
  EnrollmentStatus,
  RecentEnrollment,
  TopCourse,
} from "@/types/admin";

const statusBadgeClass: Record<EnrollmentStatus, string> = {
  ACTIVE: "bg-status-success/10 text-status-success",
  COMPLETED: "bg-brand-gold/10 text-brand-wealth",
  CANCELLED: "bg-status-error/10 text-status-error",
};

const recentActivity = [
  {
    icon: GraduationCap,
    text: "A student completed a course",
    time: "Based on latest enrollments",
  },
  {
    icon: ShoppingCart,
    text: "New enrollment in a course",
    time: "Check the enrollments table",
  },
  {
    icon: CheckCircle2,
    text: "Certificate issued to a student",
    time: "Track certificates below",
  },
];

function formatEnrollmentDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function statCards(stats: DashboardStats): Array<{
  label: string;
  value: number;
  icon: LucideIcon;
}> {
  return [
    { label: "Total Students", value: stats.totalStudents, icon: Users },
    { label: "Active Courses", value: stats.activeCourses, icon: BookOpen },
    {
      label: "Active Enrollments",
      value: stats.activeEnrollments,
      icon: GraduationCap,
    },
    {
      label: "Certificates Issued",
      value: stats.certificatesIssued,
      icon: Award,
    },
  ];
}

export default function Dashboard() {
  const { data, isLoading, isError } = useGetStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-text-muted">
        Loading stats...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-status-error">
        Failed to load dashboard statistics.
      </div>
    );
  }

  const cards = statCards(data);
  const topCourses: TopCourse[] = data.topCourses;
  const recentEnrollments: RecentEnrollment[] = data.recentEnrollments;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            Admin Overview
          </h1>
          <p className="text-sm text-text-muted">
            Monitor platform performance and student activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" />
            Export Report
          </Button>
          <Link to="/admin/courses/new">
            <Button variant="default" size="sm">
              <Plus className="h-3.5 w-3.5" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-white rounded-custom-md">
              <CardContent className="space-y-3 pt-6">
                <div className="w-9 h-9 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-navy">
                    {stat.value}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Courses + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Courses */}
        <Card className="bg-white rounded-custom-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-brand-navy">Top Courses</CardTitle>
            <CardDescription className="text-text-muted">
              Highest enrollment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCourses.length === 0 ? (
              <p className="text-sm text-text-muted">
                No course enrollments yet.
              </p>
            ) : (
              topCourses.map((course) => (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-main font-medium leading-snug pr-2">
                      {course.title}
                    </span>
                    <span className="text-text-muted whitespace-nowrap">
                      {course._count.enrollments} enrollment
                      {course._count.enrollments === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-ghost">
                    <div
                      className="h-full rounded-full bg-brand-royal/40"
                      style={{
                        width: `${
                          topCourses.length > 0
                            ? Math.max(
                                4,
                                (course._count.enrollments /
                                  Math.max(
                                    1,
                                    ...topCourses.map(
                                      (c) => c._count.enrollments,
                                    ),
                                  )) *
                                  100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white rounded-custom-md">
          <CardHeader>
            <CardTitle className="text-brand-navy">Recent Activity</CardTitle>
            <CardDescription className="text-text-muted">
              Latest events across the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs text-text-main leading-snug">
                      {activity.text}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent Enrollments */}
      <Card className="bg-white rounded-custom-md">
        <CardHeader>
          <CardTitle className="text-brand-navy">Recent Enrollments</CardTitle>
          <CardDescription className="text-text-muted">
            Latest student enrollments across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentEnrollments.length === 0 ? (
            <p className="text-sm text-text-muted">No enrollments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-xs text-text-muted uppercase tracking-wider">
                    <th className="pb-2 font-semibold">Enrollment</th>
                    <th className="pb-2 font-semibold">Student</th>
                    <th className="pb-2 font-semibold">Course</th>
                    <th className="pb-2 font-semibold">Date</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((enrollment) => (
                    <tr
                      key={enrollment.id}
                      className="border-b border-surface-border last:border-0"
                    >
                      <td className="py-3 font-mono text-xs text-text-muted">
                        #{enrollment.id.slice(0, 8)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-brand-royal/10 text-brand-royal text-[10px] font-semibold">
                              {getInitials(enrollment.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-text-main font-medium leading-tight">
                              {enrollment.user.name}
                            </p>
                            <p className="text-[11px] text-text-muted">
                              {enrollment.user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {enrollment.course.title}
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {formatEnrollmentDate(enrollment.enrolledAt)}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={`border-transparent ${
                            statusBadgeClass[enrollment.status] ||
                            "bg-surface-ghost text-text-muted"
                          }`}
                        >
                          {enrollment.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
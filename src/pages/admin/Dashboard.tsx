import {
  DollarSign,
  BookOpen,
  Users,
  Award,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  GraduationCap,
  ShoppingCart,
  CheckCircle2,
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const stats = [
  {
    label: "Total Students",
    value: "8,940",
    delta: "+12.4%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Active Courses",
    value: "326",
    delta: "+8.1%",
    trend: "up",
    icon: BookOpen,
  },
  {
    label: "Monthly Revenue",
    value: "$48.2k",
    delta: "-3.2%",
    trend: "down",
    icon: DollarSign,
  },
  {
    label: "Certificates Issued",
    value: "2,150",
    delta: "+18.6%",
    trend: "up",
    icon: Award,
  },
];

const weeklyRevenue = [
  { week: "W1", value: 42 },
  { week: "W2", value: 55 },
  { week: "W3", value: 48 },
  { week: "W4", value: 68 },
  { week: "W5", value: 61 },
  { week: "W6", value: 78 },
  { week: "W7", value: 72 },
  { week: "W8", value: 88 },
];

const topCourses = [
  { title: "Full-Stack Web Development", enrollments: 1240, progress: 92 },
  { title: "Financial Modeling & Analysis", enrollments: 986, progress: 86 },
  { title: "Introduction to Python", enrollments: 875, progress: 78 },
  { title: "UI/UX Fundamentals", enrollments: 640, progress: 64 },
];

const recentEnrollments = [
  {
    id: "#EN-2041",
    student: "Aung Aung",
    course: "Full-Stack Web Development",
    date: "Today, 09:42",
    status: "Completed",
  },
  {
    id: "#EN-2040",
    student: "Su Su Hlaing",
    course: "Digital Marketing Strategy",
    date: "Today, 08:15",
    status: "Completed",
  },
  {
    id: "#EN-2039",
    student: "Min Khant",
    course: "Machine Learning Foundations",
    date: "Yesterday, 16:30",
    status: "Pending",
  },
  {
    id: "#EN-2038",
    student: "Hnin Wai",
    course: "Advanced Database Design",
    date: "Yesterday, 14:05",
    status: "Completed",
  },
  {
    id: "#EN-2037",
    student: "Kyaw Zin",
    course: "Mobile App Development with Flutter",
    date: "Yesterday, 11:20",
    status: "Pending",
  },
];

const recentActivity = [
  {
    icon: GraduationCap,
    text: "Aung Aung completed Full-Stack Web Development",
    time: "12 minutes ago",
  },
  {
    icon: ShoppingCart,
    text: "New enrollment in Machine Learning Foundations",
    time: "1 hour ago",
  },
  {
    icon: CheckCircle2,
    text: "Certificate issued to Su Su Hlaing",
    time: "2 hours ago",
  },
  {
    icon: BookOpen,
    text: "Course 'Cloud Computing with AWS' published",
    time: "5 hours ago",
  },
];

export default function Dashboard() {
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
          <Button variant="default" size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          const TrendIcon = isUp ? ArrowUpRight : ArrowDownRight;
          return (
            <Card key={stat.label} className="bg-white rounded-custom-md">
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <Badge
                    className={`border-transparent ${
                      isUp
                        ? "bg-status-success/10 text-status-success"
                        : "bg-status-error/10 text-status-error"
                    }`}
                  >
                    <TrendIcon className="mr-1 h-3 w-3" />
                    {stat.delta}
                  </Badge>
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

      {/* Revenue + Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Card className="bg-white rounded-custom-md lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-brand-navy">Revenue Overview</CardTitle>
              <CardDescription className="text-text-muted">
                Monthly revenue for the last 8 weeks.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-surface-border text-text-muted">
                This Month
              </Badge>
              <span className="text-lg font-bold text-brand-navy">$48.2k</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-40">
              {weeklyRevenue.map((item) => (
                <div key={item.week} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full max-w-9 rounded-custom-sm bg-brand-royal/15 hover:bg-brand-royal/30 transition-colors"
                    style={{ height: `${item.value}%` }}
                  />
                  <span className="text-[10px] text-text-muted">{item.week}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card className="bg-white rounded-custom-md">
          <CardHeader>
            <CardTitle className="text-brand-navy">Top Courses</CardTitle>
            <CardDescription className="text-text-muted">
              Highest enrollment this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCourses.map((course) => (
              <div key={course.title} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-main font-medium leading-snug pr-2">
                    {course.title}
                  </span>
                  <span className="text-text-muted whitespace-nowrap">
                    {course.enrollments}
                  </span>
                </div>
                <Progress value={course.progress} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Enrollments + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Enrollments Table */}
        <Card className="bg-white rounded-custom-md lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-brand-navy">Recent Enrollments</CardTitle>
              <CardDescription className="text-text-muted">
                Latest student enrollments across the platform.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-brand-royal">
              View All
            </Button>
          </CardHeader>
          <CardContent>
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
                        {enrollment.id}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-brand-royal/10 text-brand-royal text-[10px] font-semibold">
                              {enrollment.student
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-text-main font-medium">
                            {enrollment.student}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {enrollment.course}
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {enrollment.date}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={`border-transparent ${
                            enrollment.status === "Completed"
                              ? "bg-status-success/10 text-status-success"
                              : "bg-brand-gold/10 text-brand-wealth"
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
    </div>
  );
}
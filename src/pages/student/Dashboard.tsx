import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Award,
  GraduationCap,
  PlayCircle,
  ArrowRight,
  TrendingUp,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetStudentDashboard } from "@/hooks/apis/useStudentQuery";

export default function Dashboard() {
  const { data: dashboardData, isLoading, isError } = useGetStudentDashboard();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-royal" />
      </div>
    );
  }

  if (isError || !dashboardData) {
    return (
      <div className="rounded-custom-md bg-red-50 p-6 text-center text-red-600">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const { user, stats, inProgressEnrollments, recommendedCourses } =
    dashboardData;

  const statsList = [
    { label: "Enrolled Courses", value: stats?.enrolled ?? 0, icon: BookOpen },
    { label: "Hours Learned", value: stats?.hoursLearned ?? 0, icon: Clock },
    { label: "Certificates", value: stats?.certificates ?? 0, icon: Award },
    {
      label: "Courses Completed",
      value: stats?.completed ?? 0,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/avatars/student.png"
              alt={user?.name ?? "Student"}
            />
            <AvatarFallback className="bg-brand-royal/10 text-brand-royal font-bold">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "ST"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-sm text-text-muted">
              Continue building your skills today.
            </p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="border-transparent bg-brand-royal/10 text-brand-royal"
        >
          <TrendingUp className="mr-1 h-3 w-3" />
          Active Student
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsList.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-white rounded-custom-md">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm text-text-muted font-medium">
                  {stat.label}
                </CardTitle>
                <div className="w-9 h-9 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold text-brand-navy">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Continue Learning */}
      <Card className="bg-white rounded-custom-md">
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="text-brand-navy">Continue Learning</CardTitle>
            <CardDescription className="text-text-muted">
              Pick up where you left off.
            </CardDescription>
          </div>
          <Link to="/student/learning">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {!inProgressEnrollments?.length ? (
            <p className="text-sm text-text-muted col-span-2 py-4">
              You have no courses in progress.
            </p>
          ) : (
            inProgressEnrollments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-4 border border-surface-border rounded-custom-md bg-surface-ghost"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-custom-md bg-brand-royal/10 text-brand-royal flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-navy leading-snug">
                        {item.course?.title}
                      </p>
                      <p className="text-xs text-text-muted">
                        {item.course?.instructorName}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-royal">
                    {item.progress}%
                  </span>
                </div>
                <Progress value={item.progress} className="h-2" />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted">
                    Lessons:{" "}
                    <span className="text-text-main font-medium">
                      {item.course?.lessonsCount ?? 0} Total
                    </span>
                  </p>
                  <Link to={`/courses/${item.course?.slug || item.id}/learn`}>
                    <Button variant="default" size="sm">
                      <PlayCircle className="h-3.5 w-3.5" />
                      Resume
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recommended Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-heading text-brand-navy">
              Recommended for You
            </h2>
            <p className="text-sm text-text-muted">
              Courses picked based on your learning history.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedCourses?.map((course) => (
            <Card
              key={course.id}
              className="bg-white rounded-custom-md flex flex-col"
            >
              <CardContent className="flex-1 space-y-3 pt-6">
                <div className="w-11 h-11 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-brand-navy leading-snug line-clamp-2">
                  {course.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Badge
                    variant="outline"
                    className="rounded-custom-sm border-surface-border text-text-muted"
                  >
                    {course.level || "All Levels"}
                  </Badge>
                  <span>{course.lessonsCount ?? 0} lessons</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  to={`/courses/${course.slug || course.id}`}
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    View Course
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

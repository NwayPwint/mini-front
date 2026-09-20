import { useMemo, useState } from "react";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  PlayCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGetStudentCourses } from "@/hooks/apis/useStudentQuery";
import type { StudentCourse } from "@/types/student";
import { useNavigate } from "react-router-dom";

type CourseStatus = "All" | "In Progress" | "Completed";

const levelColors: Record<string, string> = {
  BEGINNER: "bg-status-success/10 text-status-success",
  INTERMEDIATE: "bg-brand-sky/10 text-brand-sky",
  ADVANCED: "bg-brand-gold/10 text-brand-gold",
};

const filters: CourseStatus[] = ["All", "In Progress", "Completed"];

export default function Learning() {
  const { data, isLoading } = useGetStudentCourses();
  const [activeFilter, setActiveFilter] = useState<CourseStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const coursesData: StudentCourse[] = data ?? [];

  const filteredCourses = useMemo(() => {
    return coursesData.filter((item) => {
      const computedStatus =
        item.progress === 100 ? "Completed" : "In Progress";
      const matchesFilter =
        activeFilter === "All" || computedStatus === activeFilter;

      const title = item.course?.title || "";
      const matchesSearch = title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [coursesData, activeFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            My Learning
          </h1>
          <p className="text-sm text-text-muted">
            All the courses you have enrolled in.
          </p>
        </div>
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted h-4 w-4" />
          <Input
            type="search"
            placeholder="Search my courses..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-9 bg-surface-institutional border-surface-border rounded-custom-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={
              activeFilter === filter
                ? "bg-brand-royal/10 text-brand-royal font-semibold"
                : "text-text-muted hover:text-text-main"
            }
          >
            {filter}
            <Badge
              variant="outline"
              className="ml-1 h-4 min-w-4 px-1 rounded-full border border-current text-[10px]"
            >
              {filter === "All"
                ? coursesData.length
                : coursesData.filter((item) => {
                    const status =
                      item.progress === 100 ? "Completed" : "In Progress";
                    return status === filter;
                  }).length}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Content Rendering */}
      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-royal" />
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((item) => {
            const course = item.course;
            const isCompleted = item.progress === 100;

            return (
              <Card
                key={item.id}
                className="bg-white rounded-custom-md flex flex-col"
              >
                <CardHeader className="pb-2">
                  <div className="w-11 h-11 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center mb-2">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      className={`border-transparent ${
                        levelColors[course?.level || ""] ||
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      {course?.level || "General"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`border-transparent ${
                        isCompleted
                          ? "bg-status-success/10 text-status-success"
                          : "bg-brand-sky/10 text-brand-sky"
                      }`}
                    >
                      {isCompleted ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm text-brand-navy leading-snug line-clamp-2 mt-2">
                    {course?.title || "Untitled Course"}
                  </CardTitle>
                  <CardDescription className="text-xs text-text-muted">
                    {course?.instructorName || "Instructor"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">
                      {item.progress ?? 0}% complete
                    </span>
                    <span className="font-semibold text-brand-royal">
                      {course?.lessonsCount ?? 0} lessons
                    </span>
                  </div>
                  <Progress value={item.progress ?? 0} className="h-2" />
                  <div className="flex items-center gap-3 text-xs text-text-muted pt-1">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />{" "}
                      {course?.durationMinutes
                        ? `${course.durationMinutes}m`
                        : "N/A"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3 w-3" /> {course?.studentCount ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3" /> {course?.rating ?? "N/A"}
                    </span>
                  </div>
                </CardContent>
                <div className="p-4 pt-0 flex items-center justify-between gap-2">
                  {isCompleted ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        navigate(
                          `/student/courses/${course?.slug || course?.id}/learn`,
                        )
                      }
                    >
                      Review
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        navigate(
                          `/student/courses/${course?.slug || course?.id}/learn`,
                        )
                      }
                    >
                      <PlayCircle className="h-3.5 w-3.5" />
                      Resume
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="bg-white rounded-custom-md">
          <CardContent className="py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-surface-institutional text-text-muted flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-brand-navy">
              No courses found
            </p>
            <p className="text-xs text-text-muted mt-1">
              Try adjusting your search or filter.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

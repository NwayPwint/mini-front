import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Search, Loader2, Clock, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetSavedCourses,
  useUnsaveCourse,
} from "@/hooks/apis/useStudentQuery";

export default function Saved() {
  const { data: savedCourses, isLoading, isError } = useGetSavedCourses();
  const unsave = useUnsaveCourse();
  const [q, setQ] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const filtered = (savedCourses ?? []).filter((item) => {
    const term = q.trim().toLowerCase();
    if (!term) return true;
    return (
      item.course.title.toLowerCase().includes(term) ||
      item.course.instructorName.toLowerCase().includes(term)
    );
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setQ(searchInput.trim());
  };

  const handleUnsave = (courseId: string) => {
    unsave.mutate(courseId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-text-muted">
        <Loader2 className="h-5 w-5 animate-spin mr-2 text-brand-royal" />
        Loading saved courses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-status-error">
        Failed to load saved courses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            Saved Courses
          </h1>
          <p className="text-sm text-text-muted">
            Courses you've bookmarked for later.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 w-full sm:w-72"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search saved courses..."
              className="w-full pl-9 pr-3 h-10 bg-white border border-surface-border rounded-custom-sm text-sm outline-none transition-all focus:border-brand-royal focus:ring-1 focus:ring-brand-royal"
            />
          </div>
          <Button variant="default" size="sm" type="submit">
            Search
          </Button>
        </form>
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-white rounded-custom-md">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-royal/5 text-brand-royal flex items-center justify-center mb-4">
              <Bookmark size={24} className="opacity-70" />
            </div>
            <p className="text-sm font-medium text-text-main">
              {q ? "No saved courses match your search." : "No saved courses yet."}
            </p>
            <p className="text-xs text-text-muted mt-1 mb-5">
              {q
                ? "Try a different keyword."
                : "Browse the catalog and save courses you want to take later."}
            </p>
            <Link
              to="/courses"
              className="bg-brand-royal hover:bg-brand-royal-dark text-white px-4 py-2 rounded-custom-sm text-xs font-semibold transition-colors"
            >
              Browse Courses
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(({ id, course }) => (
            <Card key={id} className="bg-white rounded-custom-md flex flex-col">
              <CardHeader className="gap-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base text-brand-navy leading-snug">
                    <Link
                      to={`/courses/${course.slug}`}
                      className="hover:text-brand-royal transition-colors"
                    >
                      {course.title}
                    </Link>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-text-muted hover:text-status-error hover:bg-status-error/5 flex-shrink-0"
                    title="Remove from saved"
                    disabled={unsave.isPending}
                    onClick={() => handleUnsave(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="text-text-muted">
                  {course.instructorName}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="border-transparent"
                  >
                    {course.level.charAt(0) + course.level.slice(1).toLowerCase()}
                  </Badge>
                  <Badge variant="outline" className="border-surface-border text-text-muted">
                    {course.lessonsCount} lessons
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-text-muted whitespace-nowrap">
                  <Clock size={13} />
                  {course.durationMinutes} min
                </div>
              </CardContent>
              <div className="px-6 pb-4 mt-auto">
                <Link
                  to={`/courses/${course.slug}`}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-custom-sm border border-surface-border bg-white px-2.5 py-2 text-sm font-medium whitespace-nowrap transition-all hover:bg-surface-soft hover:text-brand-royal"
                >
                  View Course
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
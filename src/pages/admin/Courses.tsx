import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronDown, Pencil, Trash2, Globe2, EyeOff } from "lucide-react";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useDeleteCourse,
  useGetCourses,
  useTogglePublish,
} from "@/hooks/apis/useAdminQuery";
import type { Course, CourseLevel } from "@/types/admin";

const levelBadgeClass: Record<CourseLevel, string> = {
  BEGINNER: "bg-status-success/10 text-status-success",
  INTERMEDIATE: "bg-brand-gold/10 text-brand-wealth",
  ADVANCED: "bg-status-error/10 text-status-error",
};

const levelLabel: Record<CourseLevel, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

function pageNumbers(current: number, total: number): number[] {
  const pages: number[] = [];
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i);
  }
  return pages;
}

export default function Courses() {
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const { data, isLoading, isError } = useGetCourses({ page, limit: 10 });
  const togglePublish = useTogglePublish();
  const deleteCourse = useDeleteCourse();

  const courses = data?.courses ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-text-muted">
        Loading courses...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-status-error">
        Failed to load courses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            Courses
          </h1>
          <p className="text-sm text-text-muted">
            Manage your courses, modules, and lessons.
          </p>
        </div>
        <Link to="/admin/courses/new">
          <Button variant="default" size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add Course
          </Button>
        </Link>
      </div>

      <Card className="bg-white rounded-custom-md">
        <CardHeader>
          <CardTitle className="text-brand-navy">All Courses</CardTitle>
          <CardDescription className="text-text-muted">
            {pagination?.total ?? 0} course{pagination?.total === 1 ? "" : "s"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <p className="text-sm text-text-muted py-6 text-center">
              No courses yet. Create your first course.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-xs text-text-muted uppercase tracking-wider">
                    <th className="pb-2 font-semibold">Course</th>
                    <th className="pb-2 font-semibold">Instructor</th>
                    <th className="pb-2 font-semibold">Level</th>
                    <th className="pb-2 font-semibold">Lessons</th>
                    <th className="pb-2 font-semibold">Duration</th>
                    <th className="pb-2 font-semibold">Rating</th>
                    <th className="pb-2 font-semibold">Status</th>
                    <th className="pb-2 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr
                      key={course.id}
                      className="border-b border-surface-border last:border-0"
                    >
                      <td className="py-3">
                        <p className="text-text-main font-medium leading-snug">
                          {course.title}
                        </p>
                        <p className="text-xs text-text-muted font-mono">
                          /{course.slug}
                        </p>
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {course.instructorName}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={`border-transparent ${levelBadgeClass[course.level]}`}
                        >
                          {levelLabel[course.level]}
                        </Badge>
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {course.lessonsCount}
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {formatDuration(course.durationMinutes)}
                      </td>
                      <td className="py-3 text-xs text-text-muted">
                        {course.rating.toFixed(1)}
                      </td>
                      <td className="py-3">
                        <Badge
                          className={`border-transparent ${
                            course.published
                              ? "bg-status-success/10 text-status-success"
                              : "bg-surface-ghost text-text-muted"
                          }`}
                        >
                          {course.published ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2 pr-4!">
                              Actions
                              <ChevronDown className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/courses/${course.slug}`}>
                                <Pencil className="mr-2 h-3.5 w-3.5" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => togglePublish.mutate(course.slug)}
                            >
                              {course.published ? (
                                <EyeOff className="mr-2 h-3.5 w-3.5" />
                              ) : (
                                <Globe2 className="mr-2 h-3.5 w-3.5" />
                              )}
                              {course.published ? "Unpublish" : "Publish"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-status-error focus:text-status-error"
                              onClick={() => setDeleteTarget(course)}
                            >
                              <Trash2 className="mr-2 h-3.5 w-3.5" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
              <p className="text-xs text-text-muted">
                Showing {courses.length} of {pagination?.total ?? 0}
              </p>
              <Pagination className="mx-0 w-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  {pageNumbers(page, totalPages).map((n) => (
                    <PaginationItem key={n}>
                      <PaginationLink
                        isActive={n === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(n);
                        }}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      className={
                        page === totalPages ? "pointer-events-none opacity-50" : ""
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteTarget?.title}"? This will
              remove the course and its modules and lessons. This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={deleteCourse.isPending}
              onClick={() => {
                if (deleteTarget) deleteCourse.mutate(deleteTarget.slug);
                setDeleteTarget(null);
              }}
            >
              {deleteCourse.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
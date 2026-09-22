import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  Clock,
  Pencil,
  Plus,
  PlayCircle,
  Star,
  Trash2,
  Globe2,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import InputField from "@/components/ui/InputField";
import {
  useCreateLesson,
  useCreateModule,
  useDeleteCourse,
  useDeleteLesson,
  useDeleteModule,
  useGetCourseById,
  useTogglePublish,
  useUpdateCourse,
  useUpdateLesson,
  useUpdateModule,
} from "@/hooks/apis/useAdminQuery";
import type {
  CourseDetail,
  CourseLevel,
  CourseModule,
  Lesson,
  UpdateCourseInput,
} from "@/types/admin";

const courseLevelValues = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

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

const moduleSchema = z.object({
  title: z.string().min(3, "Module title must be at least 3 characters"),
  order: z.number().int().min(1).optional().or(z.literal("")),
});

type ModuleFormValues = z.infer<typeof moduleSchema>;

const lessonSchema = z.object({
  title: z.string().min(3, "Lesson title must be at least 3 characters"),
  durationMinutes: z
    .number({ invalid_type_error: "Duration is required" })
    .int()
    .min(1, "Duration must be at least 1 minute"),
  videoUrl: z.string().optional().or(z.literal("")),
  isFreePreview: z.boolean(),
  order: z.number().int().min(1).optional().or(z.literal("")),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  isPending?: boolean;
  onConfirm: () => void;
}

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  isPending = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={onConfirm}
          >
            {isPending ? "Deleting..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CourseDetailsDialog({
  open,
  onOpenChange,
  course,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CourseDetail;
}) {
  const updateCourse = useUpdateCourse();

  const editSchema = z.object({
    title: z.string().min(3, "Course title must be at least 3 characters"),
    slug: z
      .string()
      .min(3, "Slug must be at least 3 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase letters, numbers, and hyphens",
      ),
    description: z.string().optional(),
    instructorName: z.string().min(1, "Instructor name is required"),
    level: z.enum(courseLevelValues),
    published: z.boolean(),
    learningOutcomes: z.string().optional(),
  });

  type EditFormValues = z.infer<typeof editSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    mode: "onChange",
    values: {
      title: course.title,
      slug: course.slug,
      description: course.description ?? "",
      instructorName: course.instructorName,
      level: course.level,
      published: course.published,
      learningOutcomes: (course.learningOutcomes ?? []).join("\n"),
    },
  });

  const published = watch("published");

  const onSubmit = (values: EditFormValues) => {
    const payload: UpdateCourseInput = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description?.trim() || undefined,
      instructorName: values.instructorName.trim(),
      level: values.level,
      published: values.published,
      learningOutcomes: (values.learningOutcomes ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    updateCourse.mutate(
      { slug: course.slug, data: payload },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Course Details</DialogTitle>
          <DialogDescription>
            Update the course information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Course Title"
              error={errors.title?.message}
              {...register("title")}
            />
            <InputField
              label="Slug"
              error={errors.slug?.message}
              {...register("slug")}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Instructor Name"
              error={errors.instructorName?.message}
              {...register("instructorName")}
            />
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-text-main uppercase tracking-wider">
                Level
              </Label>
              <div className="relative">
                <select
                  {...register("level")}
                  className="h-11 w-full cursor-pointer appearance-none rounded-custom-md border border-surface-border bg-surface-ghost py-2 pl-3.5 pr-9 text-sm text-text-main outline-none"
                >
                  {courseLevelValues.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-text-main uppercase tracking-wider">
              Description
            </Label>
            <Textarea rows={4} {...register("description")} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-text-main uppercase tracking-wider">
              Learning Outcomes (one per line)
            </Label>
            <Textarea rows={3} {...register("learningOutcomes")} />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              checked={published}
              onCheckedChange={(checked) =>
                setValue("published", Boolean(checked))
              }
            />
            <p className="text-sm font-medium text-text-main">Published</p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                onOpenChange(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              type="submit"
              disabled={updateCourse.isPending}
            >
              {updateCourse.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ModuleFormDialog({
  open,
  onOpenChange,
  courseId,
  module,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  module?: CourseModule | null;
}) {
  const createModule = useCreateModule();
  const updateModule = useUpdateModule();
  const isEdit = Boolean(module);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleSchema),
    mode: "onChange",
    defaultValues: { title: module?.title ?? "", order: module?.order ?? "" },
  });

  const onSubmit = (values: ModuleFormValues) => {
    const payload = {
      title: values.title.trim(),
      order:
        values.order === "" || values.order === undefined
          ? undefined
          : Number(values.order),
    };
    if (module) {
      updateModule.mutate(
        { courseId, moduleId: module.id, data: payload },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset({ title: "", order: "" });
          },
        },
      );
    } else {
      createModule.mutate(
        { courseId, data: payload },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset({ title: "", order: "" });
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Module" : "Add Module"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the module title below."
              : "Add a new module to this course."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Module Title"
            placeholder="e.g. Getting Started"
            error={errors.title?.message}
            {...register("title")}
          />
          <InputField
            label="Position (optional)"
            type="number"
            placeholder="Auto-assigned if empty"
            error={errors.order?.message}
            {...register("order", { valueAsNumber: true })}
          />
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              type="submit"
              disabled={createModule.isPending || updateModule.isPending}
            >
              {isEdit ? "Save" : "Add Module"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LessonFormDialog({
  open,
  onOpenChange,
  courseId,
  moduleId,
  lesson,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseId: string;
  moduleId: string;
  lesson?: Lesson | null;
}) {
  const createLesson = useCreateLesson();
  const updateLesson = useUpdateLesson();
  const isEdit = Boolean(lesson);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    mode: "onChange",
    defaultValues: {
      title: lesson?.title ?? "",
      durationMinutes: lesson
        ? lesson.durationMinutes
        : ("" as unknown as number),
      videoUrl: lesson?.videoUrl ?? "",
      isFreePreview: lesson?.isFreePreview ?? false,
      order: lesson?.order ?? "",
    },
  });

  const isFreePreview = watch("isFreePreview");

  const onSubmit = (values: LessonFormValues) => {
    const payload = {
      title: values.title.trim(),
      durationMinutes: Number(values.durationMinutes),
      videoUrl: values.videoUrl?.trim() || undefined,
      isFreePreview: values.isFreePreview,
      order: values.order === "" || values.order === undefined ? undefined : Number(values.order),
    };
    if (lesson) {
      updateLesson.mutate(
        { courseId, moduleId, lessonId: lesson.id, data: payload },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset();
          },
        },
      );
    } else {
      createLesson.mutate(
        { courseId, moduleId, data: payload },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset();
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Lesson" : "Add Lesson"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the lesson details below."
              : "Add a new lesson to this module."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Lesson Title"
            placeholder="e.g. Introduction to React"
            error={errors.title?.message}
            {...register("title")}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Duration (minutes)"
              type="number"
              placeholder="e.g. 15"
              error={errors.durationMinutes?.message}
              {...register("durationMinutes", { valueAsNumber: true })}
            />
            <InputField
              label="Position (optional)"
              type="number"
              placeholder="Auto-assigned if empty"
              error={errors.order?.message}
              {...register("order", { valueAsNumber: true })}
            />
          </div>
          <InputField
            label="Video URL (optional)"
            type="url"
            placeholder="https://..."
            error={errors.videoUrl?.message}
            {...register("videoUrl")}
          />
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isFreePreview}
              onCheckedChange={(checked) =>
                setValue("isFreePreview", Boolean(checked))
              }
            />
            <div>
              <p className="text-sm font-medium text-text-main">
                Free preview
              </p>
              <p className="text-xs text-text-muted">
                Allow non-students to watch this lesson.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              type="submit"
              disabled={createLesson.isPending || updateLesson.isPending}
            >
              {isEdit ? "Save" : "Add Lesson"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function CourseEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: course, isLoading, isError } = useGetCourseById(slug ?? "");
  const togglePublish = useTogglePublish();
  const deleteCourse = useDeleteCourse();
  const deleteModule = useDeleteModule();
  const deleteLesson = useDeleteLesson();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [moduleDialog, setModuleDialog] = useState<{
    open: boolean;
    module?: CourseModule | null;
  }>({ open: false });
  const [lessonDialog, setLessonDialog] = useState<{
    open: boolean;
    moduleId: string;
    lesson?: Lesson | null;
  }>({ open: false, moduleId: "" });
  const [deleteCourseOpen, setDeleteCourseOpen] = useState(false);
  const [removeModule, setRemoveModule] = useState<CourseModule | null>(null);
  const [removeLesson, setRemoveLesson] = useState<{
    moduleId: string;
    lesson: Lesson;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-text-muted">
        Loading course...
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-sm text-status-error">
        Course not found.
      </div>
    );
  }

  const modules = course.modules ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/courses"
          className="text-text-muted hover:text-text-main transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy truncate">
              {course.title}
            </h1>
            <Badge
              className={`border-transparent ${
                course.published
                  ? "bg-status-success/10 text-status-success"
                  : "bg-surface-ghost text-text-muted"
              }`}
            >
              {course.published ? "Published" : "Draft"}
            </Badge>
            <Badge
              className={`border-transparent ${levelBadgeClass[course.level]}`}
            >
              {levelLabel[course.level]}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {course.lessonsCount} lessons
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(course.durationMinutes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {course.rating.toFixed(1)}
            </span>
            <span className="font-mono">/admin/courses/{course.slug}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => togglePublish.mutate(course.slug)}
          >
            {course.published ? (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                Unpublish
              </>
            ) : (
              <>
                <Globe2 className="h-3.5 w-3.5" />
                Publish
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setDetailsOpen(true)}>
            <Pencil className="h-3.5 w-3.5" />
            Edit Details
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteCourseOpen(true)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>

      {course.description && (
        <p className="text-sm text-text-muted max-w-3xl">{course.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold font-heading text-brand-navy">
            Modules & Lessons
          </h2>
          <p className="text-sm text-text-muted">
            Organize your course into modules with lessons inside each one.
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setModuleDialog({ open: true })}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.length === 0 ? (
          <Card className="bg-white rounded-custom-md">
            <CardContent className="py-10 text-center space-y-2">
              <BookOpen className="h-8 w-8 mx-auto text-text-muted" />
              <p className="text-sm font-medium text-text-main">
                No modules yet
              </p>
              <p className="text-sm text-text-muted">
                Start by adding your first module.
              </p>
            </CardContent>
          </Card>
        ) : (
          modules.map((module) => (
            <Card key={module.id} className="bg-white rounded-custom-md">
              <CardHeader className="flex-row items-start justify-between space-y-0">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-custom-md bg-brand-royal/5 text-brand-royal flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {module.order}
                  </div>
                  <div>
                    <CardTitle className="text-brand-navy text-base">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-text-muted">
                      {module.lessons.length} lesson
                      {module.lessons.length === 1 ? "" : "s"}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setModuleDialog({ open: true, module })
                    }
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-status-error hover:text-status-error"
                    onClick={() => setRemoveModule(module)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {module.lessons.length === 0 ? (
                  <p className="text-sm text-text-muted">
                    No lessons yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-surface-border text-xs text-text-muted uppercase tracking-wider">
                          <th className="pb-2 font-semibold">Lesson</th>
                          <th className="pb-2 font-semibold">Duration</th>
                          <th className="pb-2 font-semibold">Preview</th>
                          <th className="pb-2 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.lessons.map((lesson) => (
                          <tr
                            key={lesson.id}
                            className="border-b border-surface-border last:border-0"
                          >
                            <td className="py-2.5">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="h-3.5 w-3.5 text-text-muted flex-shrink-0" />
                                <span className="text-text-main font-medium leading-snug">
                                  {lesson.title}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 text-xs text-text-muted">
                              {lesson.durationMinutes} min
                            </td>
                            <td className="py-2.5">
                              <Badge
                                variant="outline"
                                className={
                                  lesson.isFreePreview
                                    ? "border-transparent bg-status-success/10 text-status-success"
                                    : "border-surface-border text-text-muted"
                                }
                              >
                                {lesson.isFreePreview ? "Free" : "Paid"}
                              </Badge>
                            </td>
                            <td className="py-2.5 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setLessonDialog({
                                      open: true,
                                      moduleId: module.id,
                                      lesson,
                                    })
                                  }
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-status-error hover:text-status-error"
                                  onClick={() =>
                                    setRemoveLesson({
                                      moduleId: module.id,
                                      lesson,
                                    })
                                  }
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setLessonDialog({ open: true, moduleId: module.id })
                  }
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Lesson
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CourseDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        course={course}
      />

      <ModuleFormDialog
        open={moduleDialog.open}
        onOpenChange={(open) =>
          setModuleDialog({ open, module: open ? moduleDialog.module : null })
        }
        courseId={course.id}
        module={moduleDialog.module}
      />

      {course.id && lessonDialog.moduleId && (
        <LessonFormDialog
          open={lessonDialog.open}
          onOpenChange={(open) =>
            setLessonDialog({
              open,
              moduleId: open ? lessonDialog.moduleId : "",
              lesson: open ? lessonDialog.lesson : null,
            })
          }
          courseId={course.id}
          moduleId={lessonDialog.moduleId}
          lesson={lessonDialog.lesson}
        />
      )}

      <ConfirmDialog
        open={deleteCourseOpen}
        onOpenChange={setDeleteCourseOpen}
        title="Delete Course"
        description={
          'Are you sure you want to delete "' +
          course.title +
          '"? This will remove all modules and lessons.'
        }
        isPending={deleteCourse.isPending}
        onConfirm={() => {
          deleteCourse.mutate(course.slug, {
            onSuccess: () => navigate("/admin/courses"),
          });
        }}
      />

      <ConfirmDialog
        open={Boolean(removeModule)}
        onOpenChange={(open) => !open && setRemoveModule(null)}
        title="Delete Module"
        description={`Are you sure you want to delete "${removeModule?.title}" and all of its lessons?`}
        isPending={deleteModule.isPending}
        onConfirm={() => {
          if (removeModule) {
            deleteModule.mutate({
              courseId: course.id,
              moduleId: removeModule.id,
            });
            setRemoveModule(null);
          }
        }}
      />

      <ConfirmDialog
        open={Boolean(removeLesson)}
        onOpenChange={(open) => !open && setRemoveLesson(null)}
        title="Delete Lesson"
        description={`Are you sure you want to delete "${removeLesson?.lesson.title}"?`}
        isPending={deleteLesson.isPending}
        onConfirm={() => {
          if (removeLesson) {
            deleteLesson.mutate({
              courseId: course.id,
              moduleId: removeLesson.moduleId,
              lessonId: removeLesson.lesson.id,
            });
            setRemoveLesson(null);
          }
        }}
      />
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ChevronDown, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import InputField from "@/components/ui/InputField";
import { Label } from "@/components/ui/label";
import { useCreateCourse } from "@/hooks/apis/useAdminQuery";
import type { CreateCourseInput, CourseLevel } from "@/types/admin";

const courseLevelValues = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

const courseFormSchema = z.object({
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

type CourseFormValues = z.infer<typeof courseFormSchema>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CourseForm() {
  const navigate = useNavigate();
  const createCourse = useCreateCourse();
  const [autoSlug, setAutoSlug] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      instructorName: "",
      level: "BEGINNER",
      published: false,
      learningOutcomes: "",
    },
  });

  const published = watch("published");

  const handleTitleBlur = () => {
    const title = watch("title");
    if (autoSlug && title.trim()) {
      setValue("slug", slugify(title), { shouldValidate: true });
    }
  };

  const onSubmit = (values: CourseFormValues) => {
    const payload: CreateCourseInput = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description?.trim() || undefined,
      instructorName: values.instructorName.trim(),
      level: values.level as CourseLevel,
      published: values.published,
      learningOutcomes: (values.learningOutcomes ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    createCourse.mutate(payload, {
      onSuccess: (result) => {
        navigate(`/admin/courses/${result.slug}`);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/courses"
          className="text-text-muted hover:text-text-main transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-brand-navy">
            Add Course
          </h1>
          <p className="text-sm text-text-muted">
            Create a new course to start adding modules and lessons.
          </p>
        </div>
      </div>

      <Card className="bg-white rounded-custom-md">
        <CardHeader>
          <CardTitle className="text-brand-navy">Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <InputField
                  label="Course Title"
                  placeholder="e.g. React & Node.js Masterclass"
                  error={errors.title?.message}
                  {...register("title", { onBlur: handleTitleBlur })}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-text-main uppercase tracking-wider">
                    Slug
                  </Label>
                  <button
                    type="button"
                    onClick={() => setAutoSlug(!autoSlug)}
                    className="inline-flex items-center gap-1 text-xs text-brand-royal cursor-pointer"
                  >
                    <Wand2 className="h-3 w-3" />
                    {autoSlug ? "Auto slug on" : "Auto slug off"}
                  </button>
                </div>
                <input
                  placeholder="e.g. react-node-masterclass"
                  {...register("slug")}
                  className="w-full px-3.5 py-2.5 bg-surface-ghost border rounded-custom-md text-text-main text-sm transition-all outline-none border-surface-border focus:border-brand-royal focus:ring-1 focus:ring-brand-royal"
                />
                {errors.slug?.message && (
                  <p className="text-xs text-status-error font-medium">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Instructor Name"
                placeholder="e.g. Dr. Myat Thiri"
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
                {errors.level?.message && (
                  <p className="text-xs text-status-error font-medium">
                    {errors.level.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-text-main uppercase tracking-wider">
                Description
              </Label>
              <Textarea
                rows={4}
                placeholder="Describe what students will learn..."
                {...register("description")}
              />
              {errors.description?.message && (
                <p className="text-xs text-status-error">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-text-main uppercase tracking-wider">
                Learning Outcomes (one per line)
              </Label>
              <Textarea
                rows={3}
                placeholder={"Build full-stack apps with React\nDesign REST APIs with Node.js"}
                {...register("learningOutcomes")}
              />
              {errors.learningOutcomes?.message && (
                <p className="text-xs text-status-error">
                  {errors.learningOutcomes.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={published}
                onCheckedChange={(checked) =>
                  setValue("published", Boolean(checked), { shouldValidate: true })
                }
              />
              <div>
                <p className="text-sm font-medium text-text-main">
                  Publish immediately
                </p>
                <p className="text-xs text-text-muted">
                  Public courses appear on the student course catalog.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => reset()}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                type="submit"
                disabled={createCourse.isPending}
              >
                {createCourse.isPending ? "Creating..." : "Create Course"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
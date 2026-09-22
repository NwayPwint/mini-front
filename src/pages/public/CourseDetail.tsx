import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import {
  Loader2,
  Clock,
  BookOpen,
  Star,
  Users,
  Award,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
  ArrowLeft,
  Bookmark,
} from "lucide-react";
import {
  useEnrollCourse,
  useGetCourseBySlug,
} from "@/hooks/apis/useCourseQuery";
import {
  useSaveCourse,
  useUnsaveCourse,
} from "@/hooks/apis/useStudentQuery";
import ErrorState from "@/components/ui/ErrorState";
import { useAuth } from "@/stores/useAuthStore";
import { ShowCustomToast } from "@/utils/toast";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated } = useAuth();
  const enrollMutation = useEnrollCourse();
  const saveMutation = useSaveCourse();
  const unsaveMutation = useUnsaveCourse();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: courseData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCourseBySlug(slug as string);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-royal" />
      </div>
    );
  }

  if (isError || !courseData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ErrorState
          message={(error as Error)?.message || "Course not found."}
          onRetry={refetch}
        />
      </div>
    );
  }

  const course = courseData;
  const isEnrolled = course.isEnrolled ?? false;
  const isSaved = course.isSaved ?? false;
  const studentCount = course._count?.enrollments ?? 0;

  const handleEnrollAction = () => {
    if (isAuthenticated) {
      if (isEnrolled) {
        navigate(`/student/courses/${course.id || slug}/learn`);
      } else {
        if (!course.slug) {
          ShowCustomToast.error("Course not found!");
          return;
        }
        enrollMutation.mutate(course.slug);
      }
    } else {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
  };

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (!course.id) {
      ShowCustomToast.error("Course not found!");
      return;
    }
    if (isSaved) {
      unsaveMutation.mutate(course.id, {
        onSuccess: () => {
          refetch();
          ShowCustomToast.success("Course removed from saved list");
        },
      });
    } else {
      saveMutation.mutate(course.id, {
        onSuccess: () => {
          refetch();
          ShowCustomToast.success("Course saved!");
        },
      });
    }
  };

  return (
    <div className="bg-surface-ghost min-h-screen pb-16">
      <div className="bg-white border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between text-xs text-text-muted">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 hover:text-brand-royal transition-colors font-medium"
          >
            <ArrowLeft size={14} /> Back to Courses
          </Link>
          <div className="flex items-center gap-2">
            <span>Courses</span>
            <ChevronRight size={12} />
            <span className="text-brand-navy font-semibold line-clamp-1">
              {course.title}
            </span>
          </div>
        </div>
      </div>

      <section className="bg-brand-navy text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-brand-royal/20 text-brand-gold border border-brand-gold/30 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                  {course.level || "All Levels"}
                </span>
                <span className="text-xs text-gray-300 flex items-center gap-1">
                  <Star size={14} className="text-brand-gold fill-brand-gold" />
                  <strong className="text-white">
                    {course.rating || 5.0}
                  </strong>{" "}
                  Rating
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold font-heading leading-tight mb-4 text-white">
                {course.title}
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                {course.description ||
                  "Master key practical skills with our comprehensive, hands-on module designed by industry experts."}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm text-gray-300 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-brand-gold" />
                  <span>
                    <strong className="text-white">{studentCount}</strong>{" "}
                    Students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-gold" />
                  <span>
                    {course.durationMinutes
                      ? `${course.durationMinutes} mins`
                      : "Self-paced"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-brand-gold" />
                  <span>
                    <strong className="text-white">
                      {course.lessonsCount || 0}
                    </strong>{" "}
                    Lessons
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-8">
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="bg-white border border-surface-border rounded-custom-md p-6 md:p-8">
                <h2 className="text-xl font-bold font-heading text-brand-navy mb-4">
                  What You'll Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs md:text-sm text-text-main"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-brand-royal flex-shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white border border-surface-border rounded-custom-md p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-brand-navy mb-4">
                Course Content
              </h2>
              <div className="space-y-4">
                {course.modules?.map((module) => (
                  <div
                    key={module.id}
                    className="border border-surface-border rounded-custom-sm overflow-hidden"
                  >
                    <div className="bg-surface-ghost px-4 py-3 font-semibold text-sm text-brand-navy flex justify-between items-center">
                      <span>{module.title}</span>
                      <span className="text-xs text-text-muted">
                        {module.lessons?.length || 0} lessons
                      </span>
                    </div>
                    <div className="divide-y divide-surface-border">
                      {module.lessons?.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="px-4 py-3 flex items-center justify-between text-xs md:text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <PlayCircle
                              size={16}
                              className="text-brand-royal"
                            />
                            <span>{lesson.title}</span>
                            {lesson.isFreePreview && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-medium">
                                Preview
                              </span>
                            )}
                          </div>
                          <span className="text-text-muted">
                            {lesson.durationMinutes} mins
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-surface-border rounded-custom-md p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-brand-navy mb-4">
                Course Description
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {course.description ||
                  "This course is tailored to provide deep domain knowledge with clear, step-by-step guidance. Whether you are starting out or scaling your expertise, each lesson is designed for practical execution."}
              </p>
            </div>

            <div className="bg-white border border-surface-border rounded-custom-md p-6 md:p-8">
              <h2 className="text-xl font-bold font-heading text-brand-navy mb-4">
                Instructor
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center font-bold text-lg">
                  {course.instructorName
                    ? course.instructorName.charAt(0)
                    : "I"}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-brand-navy">
                    {course.instructorName || "Lead Instructor"}
                  </h3>
                  <p className="text-xs text-text-muted">
                    Senior Technical Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:-mt-32">
            <div className="bg-white border border-surface-border rounded-custom-md p-6 shadow-custom-sm sticky top-6">
              <div className="bg-surface-ghost rounded-custom-sm p-4 text-center mb-6 border border-surface-border">
                <PlayCircle
                  size={40}
                  className="text-brand-royal mx-auto mb-2"
                />
                <span className="text-xs text-text-muted font-medium">
                  Course Preview Available
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={handleEnrollAction}
                  className="w-full bg-brand-royal hover:bg-brand-royal-dark text-white py-3 px-4 rounded-custom-sm font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isEnrolled ? (
                    <>
                      <span>Continue Learning</span>
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      <span>Enroll in Course</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>

                <button
                  onClick={handleSaveToggle}
                  disabled={saveMutation.isPending || unsaveMutation.isPending}
                  className={`w-full py-2.5 px-4 rounded-custom-sm font-semibold text-sm transition-colors border flex items-center justify-center gap-2 ${
                    isSaved
                      ? "bg-brand-gold/10 text-brand-wealth border-brand-gold/40"
                      : "bg-white text-brand-navy border-surface-border hover:bg-surface-ghost"
                  }`}
                >
                  <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
                  {isSaved ? "Saved" : "Save for Later"}
                </button>

                <p className="text-[11px] text-center text-text-muted">
                  Full lifetime access including future updates.
                </p>
              </div>

              <div className="border-t border-surface-border pt-4 space-y-3 text-xs text-text-main">
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Level</span>
                  <span className="font-semibold">
                    {course.level || "Beginner"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Total Lessons</span>
                  <span className="font-semibold">
                    {course.lessonsCount || 0}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Duration</span>
                  <span className="font-semibold">
                    {course.durationMinutes
                      ? `${course.durationMinutes} mins`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-text-muted">Certificate</span>
                  <span className="font-semibold text-brand-royal flex items-center gap-1">
                    <Award size={14} /> Yes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

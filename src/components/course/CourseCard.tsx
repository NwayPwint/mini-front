import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/stores/useAuthStore";
import { BookOpen, Clock, Users, Star, ChevronRight } from "lucide-react";
import { type Course } from "@/types/course";
import {
  useEnrollCourse,
  useUnenrollCourse,
} from "@/hooks/apis/useCourseQuery";
import { ShowCustomToast } from "@/utils/toast";

const levelColors: Record<string, string> = {
  Beginner: "bg-status-success/10 text-status-success",
  Intermediate: "bg-brand-sky/10 text-brand-sky",
  Advanced: "bg-brand-gold/10 text-brand-gold",
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const enrollMutation = useEnrollCourse();
  const unenrollMutation = useUnenrollCourse();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = enrollMutation.isPending || unenrollMutation.isPending;

  const handleEnrollToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!course.slug) {
      ShowCustomToast.error("Course not found!");
      return;
    }

    if (course.isEnrolled) {
      unenrollMutation.mutate(course.slug);
    } else {
      enrollMutation.mutate(course.slug);
    }
  };

  return (
    <div className="bg-white rounded-custom-lg border border-surface-border overflow-hidden group hover:shadow-custom-md transition-all flex flex-col justify-between h-full">
      {/* ── Top Section ── */}
      <div>
        <div className="aspect-video bg-surface-institutional flex items-center justify-center">
          <BookOpen
            size={28}
            className="text-brand-royal-light"
            strokeWidth={1.5}
          />
        </div>

        <div className="p-5 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-custom-sm inline-block ${
                levelColors[course.level] || "bg-gray-100 text-gray-700"
              }`}
            >
              {course.level}
            </span>
            <span className="text-xs text-text-muted">
              {course.instructorName}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-brand-navy leading-snug line-clamp-2 mb-3 min-h-[2.5rem]">
            {course.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-text-muted mb-1">
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {course.durationMinutes || 0} mins
            </span>
            <span className="inline-flex items-center gap-1">
              <Users size={12} /> {course.studentCount || 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <Star size={12} className="fill-brand-gold text-brand-gold" />{" "}
              {(course.rating || 5).toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Section ── */}
      <div className="p-5 pt-0 mt-auto">
        <div className="pt-3 border-t border-surface-border flex items-center justify-between gap-2">
          <Link
            to={`/courses/${course.slug}`}
            className="text-xs font-medium text-brand-royal hover:text-brand-royal-dark transition-colors inline-flex items-center gap-1"
          >
            View Details <ChevronRight size={12} />
          </Link>
          <button
            onClick={handleEnrollToggle}
            disabled={isLoading}
            className={`text-xs px-3 py-1.5 rounded-custom-sm font-medium transition-all ${
              course.isEnrolled
                ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                : "bg-brand-royal text-white hover:bg-brand-royal-dark"
            } disabled:opacity-50 cursor-pointer`}
          >
            {isLoading
              ? "Updating..."
              : course.isEnrolled
                ? "Enrolled (Unenroll)"
                : "Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

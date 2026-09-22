import { courseApi } from "@/services/courseApi";
import { useAuth } from "@/stores/useAuthStore";
import type { Course } from "@/types/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShowCustomToast } from "@/utils/toast";
import { getCoursesPage } from "@/services/sanityService";
import { studentApi } from "@/services/studentApi";
import type { StudentCourse } from "@/types/student";
import type { CourseListItem } from "@/types/sanity";
import { useApiQuery } from "@/hooks/apis/useApiQuery";

export function useGetCourseBySlug(slug: string) {
  return useApiQuery(
    ["course", slug],
    () => courseApi.getCourseBySlug(slug),
    { auth: false },
  );
}

export function useGetCoursesWithEnrollment() {
  const { isAuthenticated, token } = useAuth();

  return useQuery({
    queryKey: ["courses-with-enrollment", isAuthenticated],
    queryFn: async () => {
      const sanityData = await getCoursesPage();
      const sanityCourses = sanityData?.courses || [];

      const mapSanityToCourse = (
        c: CourseListItem,
        isEnrolled = false,
      ): Course => ({
        id: c._id || c.slug || "",
        title: c.title || "",
        slug: c.slug || "",
        instructorName: c.instructorName || "",
        level: c.level || "Beginner",
        rating: c.rating || 5,
        lessonsCount: c.lessonsCount || 0,
        durationMinutes: c.durationMinutes || 0,
        studentCount: c.students || c.studentCount || 0,
        isEnrolled,
      });

      if (!isAuthenticated || !token) {
        return {
          ...sanityData,
          courses: sanityCourses.map((c: CourseListItem) =>
            mapSanityToCourse(c, false),
          ),
        };
      }

      try {
        const res = await studentApi.getMyCourses();
        const enrolledCourses: StudentCourse[] = res.data || [];

        const mergedCourses: Course[] = sanityCourses.map((c: CourseListItem) => {
          const courseSlug = c.slug;

          const isEnrolled = enrolledCourses.some((e) => {
            const isMatchingCourse =
              e.course?.slug === courseSlug || e.course?.id === c._id;

            const isActive = e.status !== "CANCELLED";

            return isMatchingCourse && isActive;
          });

          return mapSanityToCourse(c, isEnrolled);
        });

        return { ...sanityData, courses: mergedCourses };
      } catch (error) {
        console.error("Failed to fetch student enrolled courses:", error);
        return {
          ...sanityData,
          courses: sanityCourses.map((c: CourseListItem) =>
            mapSanityToCourse(c, false),
          ),
        };
      }
    },
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => courseApi.enrollInCourse(slug),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ["course", slug] });
      queryClient.invalidateQueries({ queryKey: ["courses-with-enrollment"] });
      ShowCustomToast.success("Successfully enrolled in the course!");
    },
    onError: (error: unknown) => {
      ShowCustomToast.error(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to enroll.",
      );
    },
  });
}

export function useUnenrollCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => courseApi.unenrollInCourse(slug),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ["course", slug] });
      queryClient.invalidateQueries({ queryKey: ["courses-with-enrollment"] });
    },
  });
}

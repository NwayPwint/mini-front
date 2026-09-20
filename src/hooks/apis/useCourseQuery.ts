import { courseApi } from "@/services/courseApi";
import { useAuth } from "@/stores/useAuthStore";
import type { Course } from "@/types/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShowCustomToast } from "@/utils/toast";
import { getCoursesPage } from "@/services/sanityService";
import { studentApi } from "@/services/studentApi";
import type { StudentCourse } from "@/types/student";

function useCourseQuery<TData>(
  queryKey: unknown[],
  queryFn: () => Promise<{ data: TData }>,
  options?: { isPublic?: boolean },
) {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data;
    },
    enabled: options?.isPublic ? true : isAuthenticated && !!token,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetCourseBySlug(slug: string) {
  return useCourseQuery(
    ["course", slug],
    () => courseApi.getCourseBySlug(slug),
    { isPublic: true },
  );
}

export function useGetCoursesWithEnrollment() {
  const { isAuthenticated, token } = useAuth();

  return useQuery({
    queryKey: ["courses-with-enrollment", isAuthenticated],
    queryFn: async () => {
      const sanityData = await getCoursesPage();
      const sanityCourses = sanityData?.courses || [];

      const mapSanityToCourse = (c: any, isEnrolled = false): Course => ({
        id: c._id || c.slug?.current || c.slug || "",
        title: c.title || "",
        slug: typeof c.slug === "object" ? c.slug?.current : c.slug || "",
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
          courses: sanityCourses.map((c: any) => mapSanityToCourse(c, false)),
        };
      }

      try {
        const res = await studentApi.getMyCourses();
        const enrolledCourses: StudentCourse[] = res.data || [];

        const mergedCourses: Course[] = sanityCourses.map((c: any) => {
          const courseSlug =
            typeof c.slug === "object" ? c.slug?.current : c.slug;

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
          courses: sanityCourses.map((c: any) => mapSanityToCourse(c, false)),
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
    onError: (error: any) => {
      ShowCustomToast.error(
        error.response?.data?.message || "Failed to enroll.",
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

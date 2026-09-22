import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "@/services/studentApi";
import { useApiQuery } from "@/hooks/apis/useApiQuery";

export function useGetStudentDashboard() {
  return useApiQuery(["studentDashboard"], studentApi.getDashboard);
}

export function useGetStudentCourses() {
  return useApiQuery(["studentCourses"], studentApi.getMyCourses);
}

export function useGetStudentCertificates() {
  return useApiQuery(["studentCertificates"], studentApi.getMyCertificates);
}

export function useGetSavedCourses() {
  return useApiQuery(["studentSavedCourses"], studentApi.getMySavedCourses);
}

export function useSaveCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await studentApi.saveCourse(courseId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentSavedCourses"] });
    },
  });
}

export function useUnsaveCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await studentApi.unSaveCourse(courseId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentSavedCourses"] });
    },
  });
}

export function useUpdateLessonProgress(slug?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      watchedSec,
      isCompleted,
    }: {
      lessonId: string;
      watchedSec: number;
      isCompleted?: boolean;
    }) =>
      studentApi
        .updateLessonProgress(lessonId, { watchedSec, isCompleted })
        .then((r) => r.data),
    onSuccess: (data) => {
      if (slug) {
        queryClient.invalidateQueries({ queryKey: ["studentClassroom", slug] });
      }
      queryClient.invalidateQueries({ queryKey: ["studentDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
      return data;
    },
  });
}

export function useGetClassroom(slug: string) {
  return useApiQuery(["studentClassroom", slug], () =>
    studentApi.getClassroom(slug),
  );
}

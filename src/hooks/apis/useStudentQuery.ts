import { useAuth } from "@/stores/useAuthStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "@/services/studentApi";

function useStudentQuery<TData>(
  queryKey: string[],
  queryFn: () => Promise<{ data: TData }>,
) {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data;
    },
    enabled: isAuthenticated && !!token,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetStudentDashboard() {
  return useStudentQuery(["studentDashboard"], studentApi.getDashboard);
}

export function useGetStudentCourses() {
  return useStudentQuery(["studentCourses"], studentApi.getMyCourses);
}

export function useGetStudentCertificates() {
  return useStudentQuery(["studentCertificates"], studentApi.getMyCertificates);
}

export function useGetSavedCourses() {
  return useStudentQuery(["studentSavedCourses"], studentApi.getMySavedCourses);
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

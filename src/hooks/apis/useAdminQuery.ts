import { adminApi } from "@/services/adminApi";
import type {
  AdminRole,
  CreateCourseInput,
  CreateLessonInput,
  CreateModuleInput,
  UpdateCourseInput,
  UpdateLessonInput,
  UpdateModuleInput,
} from "@/types/admin";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ShowCustomToast } from "@/utils/toast";
import { getApiErrorMessage } from "@/services/api";
import { useApiQuery } from "@/hooks/apis/useApiQuery";

export function useGetCourses(params?: { page?: number; limit?: number }) {
  return useApiQuery(["adminCourses", params], () => adminApi.getCourses(params), {
    retry: false,
  });
}

export function useGetCourseById(slug: string) {
  return useApiQuery(["adminCourse", slug], () => adminApi.getCourseById(slug), {
    enabled: Boolean(slug),
    retry: false,
  });
}

export function useGetStats() {
  return useApiQuery(["adminDashboardStats"], adminApi.getStats, {
    retry: false,
  });
}

export function useGetUsers(params?: {
  page?: number;
  limit?: number;
  role?: AdminRole;
  q?: string;
}) {
  return useApiQuery(["adminUsers", params], () => adminApi.getUsers(params), {
    retry: false,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: AdminRole }) =>
      adminApi.updateUserRole(userId, { role }).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      ShowCustomToast.success("User role updated");
    },
    onError: (error) =>
      ShowCustomToast.error(getApiErrorMessage(error, "Failed to update role")),
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCourseInput) =>
      adminApi.createCourse(data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Course created");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to create course"),
      ),
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: UpdateCourseInput }) =>
      adminApi.updateCourse(slug, data).then((r) => r.data),
    onSuccess: (_, { slug }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", slug] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Course updated");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to update course"),
      ),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) =>
      adminApi.deleteCourse(slug).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
      ShowCustomToast.success("Course deleted");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to delete course"),
      ),
  });
}

export function useTogglePublish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) =>
      adminApi.togglePublish(slug).then((r) => r.data),
    onSuccess: (_, slug) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", slug] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      queryClient.invalidateQueries({ queryKey: ["adminDashboardStats"] });
      ShowCustomToast.success("Publish status updated");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to update publish status"),
      ),
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      data,
    }: {
      courseId: string;
      data: CreateModuleInput;
    }) => adminApi.createModule(courseId, data).then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Module created");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to create module"),
      ),
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      moduleId,
      data,
    }: {
      courseId: string;
      moduleId: string;
      data: UpdateModuleInput;
    }) => adminApi.updateModule(courseId, moduleId, data).then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Module updated");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to update module"),
      ),
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      moduleId,
    }: {
      courseId: string;
      moduleId: string;
    }) => adminApi.deleteModule(courseId, moduleId).then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Module deleted");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to delete module"),
      ),
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      moduleId,
      data,
    }: {
      courseId: string;
      moduleId: string;
      data: CreateLessonInput;
    }) => adminApi.createLesson(courseId, moduleId, data).then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Lesson created");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to create lesson"),
      ),
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      moduleId,
      lessonId,
      data,
    }: {
      courseId: string;
      moduleId: string;
      lessonId: string;
      data: UpdateLessonInput;
    }) =>
      adminApi
        .updateLesson(courseId, moduleId, lessonId, data)
        .then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Lesson updated");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to update lesson"),
      ),
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      moduleId,
      lessonId,
    }: {
      courseId: string;
      moduleId: string;
      lessonId: string;
    }) =>
      adminApi.deleteLesson(courseId, moduleId, lessonId).then((r) => r.data),
    onSuccess: (_, { courseId }) => {
      queryClient.invalidateQueries({ queryKey: ["adminCourse", courseId] });
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      ShowCustomToast.success("Lesson deleted");
    },
    onError: (error) =>
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to delete lesson"),
      ),
  });
}

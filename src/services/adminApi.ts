import type {
  AdminCoursesResponse,
  AdminRole,
  AdminUser,
  AdminUserResponse,
  Course,
  CourseDetail,
  CourseModule,
  CreateCourseInput,
  CreateLessonInput,
  CreateModuleInput,
  DashboardStats,
  Lesson,
  UpdateCourseInput,
  UpdateLessonInput,
  UpdateModuleInput,
} from "@/types/admin";
import type { ApiResponse } from "@/types/api";
import { api } from "./api";

export const adminApi = {
  getCourses: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get<ApiResponse<AdminCoursesResponse>>(
      "/admin/courses",
      { params },
    );
    return response.data;
  },

  getCourseById: async (slug: string) => {
    const response = await api.get<ApiResponse<CourseDetail>>(
      `/admin/courses/${slug}`,
    );
    return response.data;
  },

  createCourse: async (data: CreateCourseInput) => {
    const response = await api.post<ApiResponse<Course>>("/admin/courses", data);
    return response.data;
  },

  updateCourse: async (slug: string, data: UpdateCourseInput) => {
    const response = await api.patch<ApiResponse<Course>>(
      `/admin/courses/${slug}`,
      data,
    );
    return response.data;
  },

  deleteCourse: async (slug: string) => {
    const response = await api.delete<ApiResponse<Course>>(
      `/admin/courses/${slug}`,
    );
    return response.data;
  },

  togglePublish: async (slug: string) => {
    const response = await api.patch<ApiResponse<Course>>(
      `/admin/courses/${slug}/toggle-publish`,
    );
    return response.data;
  },

  createModule: async (courseId: string, data: CreateModuleInput) => {
    const response = await api.post<ApiResponse<CourseModule>>(
      `/admin/courses/${courseId}/modules`,
      data,
    );
    return response.data;
  },

  updateModule: async (
    courseId: string,
    moduleId: string,
    data: UpdateModuleInput,
  ) => {
    const response = await api.patch<ApiResponse<CourseModule>>(
      `/admin/courses/${courseId}/modules/${moduleId}`,
      data,
    );
    return response.data;
  },

  deleteModule: async (courseId: string, moduleId: string) => {
    const response = await api.delete<ApiResponse<CourseModule>>(
      `/admin/courses/${courseId}/modules/${moduleId}`,
    );
    return response.data;
  },

  createLesson: async (
    courseId: string,
    moduleId: string,
    data: CreateLessonInput,
  ) => {
    const response = await api.post<ApiResponse<Lesson>>(
      `/admin/courses/${courseId}/modules/${moduleId}/lessons`,
      data,
    );
    return response.data;
  },

  updateLesson: async (
    courseId: string,
    moduleId: string,
    lessonId: string,
    data: UpdateLessonInput,
  ) => {
    const response = await api.patch<ApiResponse<Lesson>>(
      `/admin/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      data,
    );
    return response.data;
  },

  deleteLesson: async (
    courseId: string,
    moduleId: string,
    lessonId: string,
  ) => {
    const response = await api.delete<ApiResponse<Lesson>>(
      `/admin/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
    );
    return response.data;
  },

  getStats: async () => {
    const response = await api.get<ApiResponse<DashboardStats>>(
      "/admin/dashboard/stats",
    );
    return response.data;
  },

  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: AdminRole;
    q?: string;
  }) => {
    const response = await api.get<ApiResponse<AdminUserResponse>>(
      "/admin/users",
      { params },
    );
    return response.data;
  },

  updateUserRole: async (userId: string, data: { role: AdminRole }) => {
    const response = await api.patch<ApiResponse<AdminUser>>(
      `/admin/users/${userId}/role`,
      data,
    );
    return response.data;
  },
};
import { api } from "./api";
import type {
  SavedCourse,
  StudentCertificate,
  DashboardResponse,
  StudentCourse,
  ClassRoomResponse,
  LessonProgressResponse,
} from "@/types/student";
import type { ApiResponse } from "@/types/api";

export const studentApi = {
  getDashboard: async () => {
    const response = await api.get<DashboardResponse>("/student/dashboard");
    return response.data;
  },

  getMyCourses: async () => {
    const response = await api.get<ApiResponse<StudentCourse[]>>(
      "/student/my-courses",
    );
    return response.data;
  },

  getMyCertificates: async () => {
    const response = await api.get<ApiResponse<StudentCertificate[]>>(
      "/student/my-certificates",
    );
    return response.data;
  },

  getMySavedCourses: async () => {
    const response = await api.get<ApiResponse<SavedCourse[]>>(
      "/student/my-saved-courses",
    );
    return response.data;
  },

  saveCourse: async (courseId: string) => {
    const response = await api.post<ApiResponse<SavedCourse>>(
      `/student/save/course/${courseId}`,
    );
    return response.data;
  },

  unSaveCourse: async (courseId: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/student/unsave/course/${courseId}`,
    );
    return response.data;
  },

  updateLessonProgress: async (
    lessonId: string,
    data: { watchedSec: number; isCompleted?: boolean },
  ) => {
    const response = await api.patch<ApiResponse<LessonProgressResponse>>(
      `/student/lessons/${lessonId}/progress`,
      data,
    );
    return response.data;
  },

  getClassroom: async (slug: string) => {
    const response = await api.get<ClassRoomResponse>(
      `/student/courses/${slug}/classroom`,
    );
    return response.data;
  },
};

import { api } from "./api";
import type {
  SavedCourse,
  StudentCertificate,
  DashboardResponse,
  StudentCourse,
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

  unSaveCourse: async (courseId: string) => {
    const response = await api.delete<ApiResponse<null>>(
      `/student/unsave/course/${courseId}`,
    );
    return response.data;
  },
};

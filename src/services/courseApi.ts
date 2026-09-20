import { api } from "./api";
import { type EnrollCourse, type CourseBySlug } from "@/types/course";
import type { ApiResponse } from "@/types/api";

export const courseApi = {
  getCourseBySlug: async (slug: string) => {
    const response = await api.get<ApiResponse<CourseBySlug>>(
      `/courses/${slug}`,
    );
    return response.data;
  },

  enrollInCourse: async (slug: string) => {
    const response = await api.post<ApiResponse<EnrollCourse>>(
      `courses/enroll/${slug}`,
    );
    return response.data;
  },

  unenrollInCourse: async (slug: string) => {
    const response = await api.post<ApiResponse<EnrollCourse>>(
      `courses/unenroll/${slug}`,
    );
    return response.data;
  },
};

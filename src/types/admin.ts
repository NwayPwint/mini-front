import type { CourseModule, Lesson } from "./course";
import type { UserRole } from "./role";

export type { Lesson, CourseModule };
export type AdminRole = UserRole;
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "CANCELLED";
 
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  instructorName: string;
  level: CourseLevel;
  lessonsCount: number;
  durationMinutes: number;
  rating: number;
  published: boolean;
  learningOutcomes: string[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    enrollments: number;
    certificates: number;
  };
}
 
export type CourseDetail = Course & { modules: CourseModule[] };
 
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: AdminRole;
  createdAt: string;
}
 
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
 
export interface Paginated<T> {
  data: T[];
  pagination: Pagination;
}
 
export interface TopCourse {
  id: string;
  title: string;
  _count: {
    enrollments: number;
  };
}
 
export interface RecentEnrollment {
  id: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  user: {
    name: string;
    email: string;
  };
  course: {
    title: string;
    slug: string;
  };
}
 
export interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  activeEnrollments: number;
  completedEnrollments: number;
  certificatesIssued: number;
  topCourses: TopCourse[];
  recentEnrollments: RecentEnrollment[];
}
 
export interface AdminUserResponse {
  users: AdminUser[];
  pagination: Pagination;
}
 
export interface CreateCourseInput {
  title: string;
  slug: string;
  description?: string;
  instructorName: string;
  level?: CourseLevel;
  published?: boolean;
  learningOutcomes?: string[];
}
export type UpdateCourseInput = Partial<CreateCourseInput>;
 
export interface CreateModuleInput {
  title: string;
  order?: number;
}
export type UpdateModuleInput = Partial<CreateModuleInput>;
 
export interface CreateLessonInput {
  title: string;
  durationMinutes: number;
  videoUrl?: string;
  isFreePreview?: boolean;
  order?: number;
}
export type UpdateLessonInput = Partial<CreateLessonInput>;
 
export interface AdminCoursesResponse {
  courses: Course[];
  pagination: Pagination;
}
 
 
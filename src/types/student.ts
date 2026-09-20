import type { Course } from "./course";
// Core user shape returned inside the dashboard payload
export interface StudentUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Stats summary block
export interface DashboardStats {
  enrolled: number;
  completed: number;
  certificates: number;
  hoursLearned: number;
  weeklyTargetHours: number;
}

// In-progress course item
export interface InProgressEnrollment {
  id: string;
  progress: number;
  status: string;
  enrolledAt: string;
  course: {
    id: string;
    title: string;
    slug: string;
    instructorName: string;
    durationMinutes: number;
    lessonsCount: number;
  };
}

// Recommended course item
export interface RecommendedCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructorName: string;
  level: string;
  rating: number;
  lessonsCount: number;
  durationMinutes: number;
  studentCount: number;
}

// Full API Response wrapper for GET /student/dashboard
export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    user: StudentUser;
    stats: DashboardStats;
    inProgressEnrollments: InProgressEnrollment[];
    recommendedCourses: RecommendedCourse[];
  };
}

export interface StudentCourse {
  id: string;
  progress: number;
  status: number;
  enrolledAt: string;
  completedAt: string;
  course: Course;
}

export interface StudentCertificate {
  id: string;
  credentialId: string;
  grade: string;
  issuedAt: string;
  course: Pick<Course, "id" | "title" | "instructorName" | "rating">;
}

export interface SavedCourse {
  id: string;
  createdAt: string;
  course: Course;
}

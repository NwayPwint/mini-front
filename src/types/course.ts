export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  isFreePreview: boolean;
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  instructorName: string;
  level: string;
  rating: number;
  lessonsCount: number;
  durationMinutes: number;
  studentCount?: number;
  isEnrolled?: boolean;
  isSaved?: boolean;
}

export interface CourseBySlug {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructorName: string;
  level: string;
  createdById: string;
  lessonsCount: number;
  durationMinutes: number;
  rating: number;
  published: boolean;
  learningOutcomes: string[];
  createdAt: string;
  updatedAt: string;
  modules: CourseModule[];
  _count: {
    enrollments: number;
  };
  isEnrolled: boolean;
  isSaved: boolean;
  progress: number;
}

export interface EnrollCourse {
  id: string;
  userId: string;
  progress: number;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  enrolledAt: string;
  completedAt: string | null;
}

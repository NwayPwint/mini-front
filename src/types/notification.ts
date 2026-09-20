export interface NotificationPreference {
  id: string;
  userId: string;
  weeklyDigest: boolean;
  courseReminders: boolean;
  announcements: boolean;
  certificateAlerts: boolean;
}

export type NotificationType =
  | "COURSE_REMINDER"
  | "CERTIFICATE"
  | "ANNOUNCEMENT"
  | "WEEKLY_DIGEST";

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string | null;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NotificationResponseData {
  notifications: NotificationItem[];
  pagination: PaginationMeta;
}

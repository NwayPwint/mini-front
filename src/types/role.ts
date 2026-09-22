export const USER_ROLES = ["STUDENT", "COLLEGE", "BUSINESS", "ADMIN"] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const isAdminRole = (role?: string | null): role is "ADMIN" =>
  role === "ADMIN";
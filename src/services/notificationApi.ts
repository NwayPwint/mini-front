import type { ApiResponse } from "@/types/api";
import { api } from "./api";
import type {
  NotificationPreference,
  NotificationResponseData,
  NotificationItem,
} from "@/types/notification";

export const notificationApi = {
  getPreferences: async () => {
    const response = await api.get<ApiResponse<NotificationPreference>>(
      "/notification/preferences",
    );
    return response.data;
  },

  updatePreferences: async (data: Partial<NotificationPreference>) => {
    const response = await api.put<ApiResponse<NotificationPreference>>(
      "/notification/preferences",
      data,
    );
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get<ApiResponse<{ unreadCount: number }>>(
      "/notification/unread-count",
    );
    return response.data;
  },

  getNotifications: async (page = 1, limit = 10) => {
    const response = await api.get<ApiResponse<NotificationResponseData>>(
      "/notification",
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await api.patch<ApiResponse<NotificationItem>>(
      `/notification/${id}/read`,
    );
    return response.data;
  },

  markAllRead: async () => {
    const response = await api.patch<ApiResponse<null>>(
      "/notification/read-all",
    );
    return response.data;
  },
};

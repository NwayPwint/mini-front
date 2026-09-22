import { notificationApi } from "@/services/notificationApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/services/api";
import { ShowCustomToast } from "@/utils/toast";
import type { NotificationPreference } from "@/types/notification";
import { useApiQuery } from "@/hooks/apis/useApiQuery";

export function useGetPreferences() {
  return useApiQuery(
    ["notificationPreferences"],
    notificationApi.getPreferences,
  );
}

export function useGetUnreadCount() {
  return useApiQuery(
    ["unreadNotificationCount"],
    notificationApi.getUnreadCount,
  );
}

export function useGetNotifications(page = 1, limit = 10) {
  return useApiQuery(
    ["notifications", page, limit],
    () => notificationApi.getNotifications(page, limit),
  );
}

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<NotificationPreference>) => {
      const response = await notificationApi.updatePreferences(data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["notificationPreferences"], data);
    },
    onError: (error) => {
      ShowCustomToast.error(
        getApiErrorMessage(error, "Failed to update notification settings"),
      );
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
    },
  });
}

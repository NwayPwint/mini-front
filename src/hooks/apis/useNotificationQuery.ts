import { notificationApi } from "@/services/notificationApi";
import { useAuth } from "@/stores/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiErrorMessage } from "@/services/api";
import { ShowCustomToast } from "@/utils/toast";
import type { NotificationPreference } from "@/types/notification";

function useNotificationQuery<TData>(
  queryKey: (string | number)[],
  queryFn: () => Promise<{ data: TData }>,
) {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data;
    },
    enabled: isAuthenticated && !!token,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetPreferences() {
  return useNotificationQuery(
    ["notificationPreferences"],
    notificationApi.getPreferences,
  );
}

export function useGetUnreadCount() {
  return useNotificationQuery(
    ["unreadNotificationCount"],
    notificationApi.getUnreadCount,
  );
}

export function useGetNotifications(page = 1, limit = 10) {
  return useNotificationQuery(
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

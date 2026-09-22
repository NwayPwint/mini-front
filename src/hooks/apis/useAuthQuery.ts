import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { useAuth } from "@/stores/useAuthStore";
import type {
  ChangePasswordFormValues,
  UpdateProfileFormValues,
} from "@/types/auth";
import { useApiQuery } from "@/hooks/apis/useApiQuery";

export function useGetMe() {
  return useApiQuery(["authUser"], authApi.getMe, { retry: false });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: async (data: UpdateProfileFormValues) => {
      const response = await authApi.updateProfile(data);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setUser(updatedUser);
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ChangePasswordFormValues) => {
      const response = await authApi.updatePassword(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
}

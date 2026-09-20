import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { useAuth } from "@/stores/useAuthStore";
import type {
  ChangePasswordFormValues,
  UpdateProfileFormValues,
} from "@/types/auth";

export function useGetMe() {
  const { token, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await authApi.getMe();
      return response.data;
    },
    enabled: isAuthenticated && !!token,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
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

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/stores/useAuthStore";

interface UseApiQueryOptions {
  auth?: boolean;
  enabled?: boolean;
  retry?: boolean | number;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useApiQuery<TData>(
  queryKey: unknown[],
  queryFn: () => Promise<{ data: TData }>,
  options?: UseApiQueryOptions,
) {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await queryFn();
      return response.data;
    },
    enabled:
      (options?.auth === false ? true : isAuthenticated && !!token) &&
      (options?.enabled ?? true),
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    retry: options?.retry ?? 3,
  });
}
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { getJSON } from "@/lib/api";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/auth/user"],
    queryFn: async (): Promise<User> => getJSON<User>("/auth/user"),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    user,
    isAuthenticated: !!user && !error,
    isLoading,
    error: error && !isUnauthorizedError(error) ? error : null,
  };
}
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async (): Promise<User> => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const url = baseUrl
        ? new URL("/api/auth/user", baseUrl).toString()
        : "/api/auth/user";
      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated, this is expected on first load
          throw new Error("Unauthorized");
        }
        const errorData = await response.text();
        throw new Error(`${response.status}: ${errorData}`);
      }

      return response.json();
    },
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
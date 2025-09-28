import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "./index";
import { LoginRequest, LoginResponse } from "@/types";
import { queryKeys } from "@/lib/query-client";

// Helper function to set cookie
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof window !== "undefined") {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
};

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};

// Login mutation hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: userService.login,
    onSuccess: (data) => {
      // Store token in cookie
      if (typeof window !== "undefined") {
        setCookie("token", data.token, 7); // 7 days expiration
      }

      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });

      // You can also set user data in query cache if needed
      // queryClient.setQueryData(queryKeys.user.profile(), data.user);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      // Clear any existing token on error
      if (typeof window !== "undefined") {
        deleteCookie("token");
      }
    },
  });
};

// Logout function (not an API call, just local cleanup)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    // Clear token from cookie
    if (typeof window !== "undefined") {
      deleteCookie("token");
    }

    // Clear all cached data
    queryClient.clear();

    // You can add redirect logic here if needed
    // router.push('/login');
  };
};

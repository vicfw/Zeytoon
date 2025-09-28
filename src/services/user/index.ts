import { LoginRequest, LoginResponse, ApiResponse } from "@/types";
import { apiClient } from "..";

// User API service functions
export const userService = {
  // Login user
  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/user/login",
      loginData
    );
    return response.data.data;
  },
};

// React Query hooks for user operations
export const useUserService = () => {
  return {
    login: userService.login,
  };
};

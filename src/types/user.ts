// User-related API types

// Common API Response Structure
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

// User Types
export interface LoginRequest {
  phone_prefix: string;
  phone: string;
  password: string;
  firebase_token: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    phone: string;
    // Add other user fields as needed
  };
}

// API Error Response
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

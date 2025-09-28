import axios, { AxiosInstance, AxiosResponse } from "axios";

// Base URL configuration
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api/v3/`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Version: "1.0.0",
    "device-id": "pwa",
    Accept: "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token =
      typeof window !== "undefined"
        ? document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1]
        : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === "development") {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          if (typeof window !== "undefined") {
            document.cookie =
              "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
            // You can add redirect logic here
          }
          break;
        case 403:
          console.error("❌ Forbidden: Access denied");
          break;
        case 404:
          console.error("❌ Not Found: Resource not found");
          break;
        case 500:
          console.error("❌ Server Error: Internal server error");
          break;
        default:
          console.error(`❌ API Error ${status}:`, data);
      }
    } else if (error.request) {
      console.error("❌ Network Error: No response received");
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Export the axios instance for direct use if needed
export { apiClient };

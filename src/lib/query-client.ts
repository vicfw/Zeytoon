import { QueryClient } from "@tanstack/react-query";

// Create a client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Time in milliseconds that data remains fresh
      staleTime: 5 * 60 * 1000, // 5 minutes

      // Time in milliseconds that unused/inactive cache data remains in memory
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // Retry failed requests
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },

      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch on window focus
      refetchOnWindowFocus: false,

      // Refetch on reconnect
      refetchOnReconnect: true,

      // Refetch on mount
      refetchOnMount: true,
    },
    mutations: {
      // Retry failed mutations
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },

      // Retry delay for mutations
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    },
  },
});

// Query keys factory for consistent key management
export const queryKeys = {
  // User query keys
  user: {
    all: ["user"] as const,
    login: () => [...queryKeys.user.all, "login"] as const,
  },

  // Currency query keys
  currencies: {
    all: ["currencies"] as const,
    lists: () => [...queryKeys.currencies.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.currencies.lists(), { filters }] as const,
    details: () => [...queryKeys.currencies.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.currencies.details(), id] as const,
    prices: () => [...queryKeys.currencies.all, "prices"] as const,
    priceHistory: (currencyCode: string) =>
      [...queryKeys.currencies.all, "price-history", currencyCode] as const,
  },
} as const;

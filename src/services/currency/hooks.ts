import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { currencyService } from "./index";
import {
  Currency,
  CurrencyPrice,
  CurrencyPriceHistory,
  CreateCurrencyRequest,
  UpdateCurrencyRequest,
} from "@/types";
import { queryKeys } from "@/lib/query-client";

// Query hooks for currency operations

// Get all currencies
export const useCurrencies = (options?: UseQueryOptions<Currency[], Error>) => {
  return useQuery<Currency[], Error>({
    queryKey: queryKeys.currencies.all,
    queryFn: currencyService.getCurrencies,
    ...options,
  });
};

// Get filtered currencies
export const useFilteredCurrencies = (
  params: { type?: string; is_systemic?: number },
  options?: UseQueryOptions<Currency[], Error>
) => {
  return useQuery<Currency[], Error>({
    queryKey: [...queryKeys.currencies.all, "filtered", params],
    queryFn: () => currencyService.getFilteredCurrencies(params),
    ...options,
  });
};

// Get single currency
export const useCurrency = (
  id: string,
  options?: UseQueryOptions<Currency, Error>
) => {
  return useQuery<Currency, Error>({
    queryKey: queryKeys.currencies.detail(id),
    queryFn: () => currencyService.getCurrency(id),
    enabled: !!id,
    ...options,
  });
};

// Get currency prices
export const useCurrencyPrices = (
  params: { type?: string } = {},
  options?: UseQueryOptions<CurrencyPrice[], Error>
) => {
  return useQuery<CurrencyPrice[], Error>({
    queryKey: [...queryKeys.currencies.all, "prices", params],
    queryFn: () => currencyService.getCurrencyPrices(params),
    ...options,
  });
};

// Get currency price history
export const useCurrencyPriceHistory = (
  currencyCode: string,
  options?: UseQueryOptions<CurrencyPriceHistory, Error>
) => {
  return useQuery<CurrencyPriceHistory, Error>({
    queryKey: [...queryKeys.currencies.all, "price-history", currencyCode],
    queryFn: () => currencyService.getCurrencyPriceHistory(currencyCode),
    enabled: !!currencyCode,
    ...options,
  });
};

// Mutation hooks for currency operations

// Create currency mutation
export const useCreateCurrency = (
  options?: UseMutationOptions<Currency, Error, CreateCurrencyRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation<Currency, Error, CreateCurrencyRequest>({
    mutationFn: currencyService.createCurrency,
    onSuccess: (data) => {
      // Invalidate and refetch currencies list
      queryClient.invalidateQueries({ queryKey: queryKeys.currencies.all });

      // Add the new currency to the cache
      queryClient.setQueryData(
        queryKeys.currencies.detail(data.id.toString()),
        data
      );
    },
    ...options,
  });
};

// Update currency mutation
export const useUpdateCurrency = (
  options?: UseMutationOptions<Currency, Error, UpdateCurrencyRequest>
) => {
  const queryClient = useQueryClient();

  return useMutation<Currency, Error, UpdateCurrencyRequest>({
    mutationFn: currencyService.updateCurrency,
    onSuccess: (data) => {
      // Update the specific currency in cache
      queryClient.setQueryData(
        queryKeys.currencies.detail(data.id.toString()),
        data
      );

      // Invalidate currencies list to ensure consistency
      queryClient.invalidateQueries({ queryKey: queryKeys.currencies.all });
    },
    ...options,
  });
};

// Utility hooks

// Get currencies by type
export const useCurrenciesByType = (type: "fiat" | "crypto") => {
  return useFilteredCurrencies({ type });
};

// Get active currencies
export const useActiveCurrencies = () => {
  return useFilteredCurrencies({ is_systemic: 2 });
};

// Get fiat currencies
export const useFiatCurrencies = () => {
  return useCurrenciesByType("fiat");
};

// Get crypto currencies
export const useCryptoCurrencies = () => {
  return useCurrenciesByType("crypto");
};

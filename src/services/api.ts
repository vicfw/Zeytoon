// Re-export services from organized folders
export { userService, useUserService } from "./user";
export { useLogin, useLogout } from "./user/hooks";
export { currencyService } from "./currency";
export {
  useCurrencies,
  useFilteredCurrencies,
  useCurrency,
  useCurrencyPrices,
  useCurrencyPriceHistory,
  useCreateCurrency,
  useUpdateCurrency,
  useCurrenciesByType,
  useActiveCurrencies,
  useFiatCurrencies,
  useCryptoCurrencies,
} from "./currency/hooks";

// Re-export query keys
export { queryKeys } from "@/lib/query-client";

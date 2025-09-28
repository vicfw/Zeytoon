import {
  Currency,
  CurrencyListResponse,
  CurrencyPrice,
  CurrencyPriceHistory,
  CreateCurrencyRequest,
  UpdateCurrencyRequest,
  ApiResponse,
} from "@/types";
import { apiClient } from "..";

// Currency API service functions
export const currencyService = {
  // Get all currencies
  getCurrencies: async (): Promise<Currency[]> => {
    const response = await apiClient.get<any>("/currencies", {
      headers: {
        Accept: "application/json",
        Version: "1.0.0",
      },
    });

    // Handle the actual API response structure
    // مدیریت ساختار واقعی پاسخ API
    if (
      response.data &&
      response.data.data &&
      response.data.data.currency_list
    ) {
      return Array.isArray(response.data.data.currency_list)
        ? response.data.data.currency_list
        : [];
    }

    // Fallback for other possible structures
    // پشتیبان برای ساختارهای احتمالی دیگر
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    // Return empty array if no valid data
    // بازگرداندن آرایه خالی در صورت عدم وجود داده معتبر
    return [];
  },

  // Get filtered currency list
  getFilteredCurrencies: async (params: {
    type?: string;
    is_systemic?: number;
  }): Promise<Currency[]> => {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append("type", params.type);
    if (params.is_systemic !== undefined)
      queryParams.append("is_systemic", params.is_systemic.toString());

    const response = await apiClient.get<any>(
      `/currencies/list?${queryParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
          Version: "1.0.0",
        },
      }
    );

    // Handle the actual API response structure
    // مدیریت ساختار واقعی پاسخ API
    if (
      response.data &&
      response.data.data &&
      response.data.data.currency_list
    ) {
      return Array.isArray(response.data.data.currency_list)
        ? response.data.data.currency_list
        : [];
    }

    // Fallback for other possible structures
    // پشتیبان برای ساختارهای احتمالی دیگر
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data)
    ) {
      return response.data.data;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    // Return empty array if no valid data
    // بازگرداندن آرایه خالی در صورت عدم وجود داده معتبر
    return [];
  },

  // Get a specific currency by ID
  getCurrency: async (id: string): Promise<Currency> => {
    const response = await apiClient.get<ApiResponse<Currency>>(
      `/currencies/${id}`,
      {
        headers: {
          Accept: "application/json",
          Version: "1.0.0",
        },
      }
    );
    return response.data.data;
  },

  // Create new currency
  createCurrency: async (
    currencyData: CreateCurrencyRequest
  ): Promise<Currency> => {
    // Convert to FormData for file uploads
    const formData = new FormData();

    // Add text fields
    formData.append("name", currencyData.name);
    formData.append("iso_code", currencyData.iso_code);
    formData.append("symbol", currencyData.symbol);
    formData.append("type", currencyData.type);
    formData.append("has_wallet", currencyData.has_wallet.toString());
    formData.append("is_active", currencyData.is_active.toString());

    // Add optional fields
    if (currencyData.change_rate) {
      formData.append("change_rate", currencyData.change_rate);
    }
    if (currencyData.wallet_prefix) {
      formData.append("wallet_prefix", currencyData.wallet_prefix);
    }
    if (currencyData.colors) {
      formData.append("colors", currencyData.colors);
    }

    // Add files if provided
    if (currencyData.logo) {
      formData.append("logo", currencyData.logo);
    }
    if (currencyData.wallet_logo) {
      formData.append("wallet_logo", currencyData.wallet_logo);
    }

    const response = await apiClient.post<ApiResponse<Currency>>(
      "/currencies",
      formData,
      {
        headers: {
          Accept: "application/json",
          Version: "1.0.0",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // Update currency
  updateCurrency: async (
    currencyData: UpdateCurrencyRequest
  ): Promise<Currency> => {
    const { id, ...updateData } = currencyData;

    // Convert to FormData for file uploads
    const formData = new FormData();

    // Add text fields
    if (updateData.name) formData.append("name", updateData.name);
    if (updateData.iso_code) formData.append("iso_code", updateData.iso_code);
    if (updateData.symbol) formData.append("symbol", updateData.symbol);
    if (updateData.type) formData.append("type", updateData.type);
    if (updateData.has_wallet !== undefined)
      formData.append("has_wallet", updateData.has_wallet.toString());
    if (updateData.is_active !== undefined)
      formData.append("is_active", updateData.is_active.toString());

    // Add optional fields
    if (updateData.change_rate) {
      formData.append("change_rate", updateData.change_rate);
    }
    if (updateData.wallet_prefix) {
      formData.append("wallet_prefix", updateData.wallet_prefix);
    }
    if (updateData.colors) {
      formData.append("colors", updateData.colors);
    }

    // Add files if provided
    if (updateData.logo) {
      formData.append("logo", updateData.logo);
    }
    if (updateData.wallet_logo) {
      formData.append("wallet_logo", updateData.wallet_logo);
    }

    const response = await apiClient.post<ApiResponse<Currency>>(
      `/currencies/${id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          Version: "1.0.0",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // Get currency prices
  getCurrencyPrices: async (params: {
    type?: string;
  }): Promise<CurrencyPrice[]> => {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append("type", params.type);

    const response = await apiClient.get<ApiResponse<CurrencyPrice[]>>(
      `/currencies/prices?${queryParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
          Version: "1.0.0",
          Language: "fa",
        },
      }
    );
    return response.data.data;
  },

  // Get currency price history
  getCurrencyPriceHistory: async (
    currencyCode: string
  ): Promise<CurrencyPriceHistory> => {
    const response = await apiClient.get<ApiResponse<CurrencyPriceHistory>>(
      `/currencies/${currencyCode}/price-history`,
      {
        headers: {
          Accept: "application/json",
          Version: "1.0.0",
          Language: "fa",
        },
      }
    );
    return response.data.data;
  },
};

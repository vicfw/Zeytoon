// Currency-related API types

// Currency Types
export interface Currency {
  id: number;
  title: string;
  symbol: string;
  iso_code: string;
  image: string;
  colors: {
    one: string;
    two: string;
    three: string;
    four: string;
    five: string;
  };
}

export interface CurrencyListResponse {
  currencies: Currency[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface CurrencyPrice {
  currency_id: string;
  currency_code: string;
  price: number;
  change_24h?: number;
  change_percentage?: number;
}

export interface CurrencyPriceHistory {
  currency_code: string;
  prices: Array<{
    timestamp: number;
    price: number;
  }>;
}

// Create/Update Currency Request
export interface CreateCurrencyRequest {
  name: string;
  iso_code: string;
  symbol: string;
  type: "FIAT" | "CRYPTO";
  change_rate?: string;
  logo?: File;
  wallet_prefix?: string;
  wallet_logo?: File;
  has_wallet: number;
  is_active: number;
  colors?: string; // JSON string
}

export interface UpdateCurrencyRequest extends Partial<CreateCurrencyRequest> {
  id: string;
}

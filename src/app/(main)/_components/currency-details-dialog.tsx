// -*- coding: utf-8 -*-

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toPersianNumbers } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  XIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { UpTrend } from "@/components/icons";
import { ReusableTable, TableColumn } from "@/components/reusable-table";
import {
  useCurrencyPriceHistory,
  useCurrencyPrices,
} from "@/services/currency/hooks";
import { Currency } from "@/types/currency";

// Currency data type for dialog (from table)
// نوع داده ارز برای دیالوگ (از جدول)
interface CurrencyTableData {
  id: string;
  isoCode: string;
  type: string;
  buyPrice: string;
  sellPrice: string;
  change: string;
  changeType: "positive" | "negative";
  lastUpdate: Date;
}

// Chart data type
// نوع داده نمودار
interface ChartData {
  day: number;
  buyPrice: number;
  sellPrice: number;
}

// Statistics type
// نوع آمار
interface Statistics {
  buyAverage: number;
  buyMax: number;
  buyMin: number;
  sellAverage: number;
  sellMax: number;
  sellMin: number;
}

// Statistics row data type
// نوع داده ردیف آمار
interface StatisticsRow {
  type: string;
  buyValue: number;
  sellValue: number;
}

// Generate sample chart data
// تولید داده‌های نمونه نمودار
const generateChartData = (
  baseBuyPrice: number,
  baseSellPrice: number
): ChartData[] => {
  const data: ChartData[] = [];
  for (let i = 1; i <= 30; i++) {
    const buyVariation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const sellVariation = (Math.random() - 0.5) * 0.1;

    data.push({
      day: i,
      buyPrice: Math.round(baseBuyPrice * (1 + buyVariation)),
      sellPrice: Math.round(baseSellPrice * (1 + sellVariation)),
    });
  }
  return data;
};

// Calculate statistics from chart data
// محاسبه آمار از داده‌های نمودار
const calculateStatistics = (data: ChartData[]): Statistics => {
  const buyPrices = data.map((d) => d.buyPrice);
  const sellPrices = data.map((d) => d.sellPrice);

  return {
    buyAverage: Math.round(
      buyPrices.reduce((a, b) => a + b, 0) / buyPrices.length
    ),
    buyMax: Math.max(...buyPrices),
    buyMin: Math.min(...buyPrices),
    sellAverage: Math.round(
      sellPrices.reduce((a, b) => a + b, 0) / sellPrices.length
    ),
    sellMax: Math.max(...sellPrices),
    sellMin: Math.min(...sellPrices),
  };
};

// Convert statistics to table data
// تبدیل آمار به داده‌های جدول
const statisticsToTableData = (statistics: Statistics): StatisticsRow[] => {
  return [
    {
      type: "میانگین",
      buyValue: statistics.buyAverage,
      sellValue: statistics.sellAverage,
    },
    {
      type: "حداکثر",
      buyValue: statistics.buyMax,
      sellValue: statistics.sellMax,
    },
    {
      type: "حداقل",
      buyValue: statistics.buyMin,
      sellValue: statistics.sellMin,
    },
  ];
};

// Currency Details Dialog Props
// ویژگی‌های دیالوگ جزئیات ارز
interface CurrencyDetailsDialogProps {
  currency: CurrencyTableData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Currency Details Dialog Component
// کامپوننت دیالوگ جزئیات ارز
export function CurrencyDetailsDialog({
  currency,
  isOpen,
  onClose,
}: CurrencyDetailsDialogProps) {
  if (!currency) return null;

  // Get currency type from the currency data
  // دریافت نوع ارز از داده‌های ارز
  const currencyType =
    currency.type === "دلار" || currency.type === "یورو" ? "FIAT" : "CRYPTO";

  // Fetch real price history data
  // دریافت داده‌های واقعی تاریخچه قیمت
  const {
    data: priceHistory,
    isLoading: isPriceHistoryLoading,
    error: priceHistoryError,
  } = useCurrencyPriceHistory(currency.isoCode, {
    enabled: isOpen && !!currency.isoCode,
  } as any);

  // Fetch current prices data
  // دریافت داده‌های قیمت‌های فعلی
  const {
    data: currentPrices,
    isLoading: isCurrentPricesLoading,
    error: currentPricesError,
  } = useCurrencyPrices({ type: currencyType }, {
    enabled: isOpen,
  } as any);

  // Check if data is still loading
  // بررسی اینکه آیا داده‌ها هنوز در حال بارگذاری هستند
  const isLoading = isPriceHistoryLoading || isCurrentPricesLoading;

  // Check if there are any errors
  // بررسی اینکه آیا خطایی وجود دارد
  const hasError = priceHistoryError || currentPricesError;

  // Transform price history to chart data
  // تبدیل تاریخچه قیمت به داده‌های نمودار
  const chartData =
    priceHistory?.prices?.map((price, index) => ({
      day: index + 1,
      buyPrice: price.price * 0.999, // Simulate buy price (slightly lower)
      sellPrice: price.price * 1.001, // Simulate sell price (slightly higher)
      timestamp: price.timestamp,
    })) || [];

  // Calculate statistics from real data
  // محاسبه آمار از داده‌های واقعی
  const statistics =
    chartData.length > 0
      ? calculateStatistics(chartData)
      : {
          buyAverage: 0,
          buyMax: 0,
          buyMin: 0,
          sellAverage: 0,
          sellMax: 0,
          sellMin: 0,
        };

  const tableData = statisticsToTableData(statistics);

  // Define table columns
  // تعریف ستون‌های جدول
  const columns: TableColumn<StatisticsRow>[] = [
    {
      key: "type",
      header: "",
    },
    {
      key: "buyValue",
      header: "خرید شما (ریال)",
      render: (item) => toPersianNumbers(item.buyValue.toLocaleString()),
    },
    {
      key: "sellValue",
      header: "فروش شما (ریال)",
      render: (item) => toPersianNumbers(item.sellValue.toLocaleString()),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-4xl max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle className="text-right flex justify-between">
            <span>{currency.type}</span>
            <XIcon
              className="text-muted-foreground size-4 border rounded-sm cursor-pointer"
              onClick={onClose}
            />
          </DialogTitle>
          <DialogTitle className="text-right text-xs text-muted-foreground flex items-center gap-2 mt-3">
            <UpTrend />
            <span>تغییرات 30 روز گذشته {currency.type}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Loading State */}
          {/* حالت بارگذاری */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  در حال بارگذاری داده‌های ارز...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {/* حالت خطا */}
          {hasError && !isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-red-600 mb-4">
                  خطا در بارگذاری داده‌های ارز
                </p>
                <p className="text-muted-foreground text-sm">
                  {priceHistoryError?.message ||
                    currentPricesError?.message ||
                    "لطفاً دوباره تلاش کنید"}
                </p>
              </div>
            </div>
          )}

          {/* Data Content */}
          {/* محتوای داده‌ها */}
          {!isLoading && !hasError && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price Chart */}
              {/* نمودار قیمت */}
              <div className="h-64 w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} className="w-full h-full">
                      <XAxis dataKey="day" hide={true} />
                      <YAxis
                        domain={["dataMin - 1000", "dataMax + 1000"]}
                        tickFormatter={(value) =>
                          toPersianNumbers(value.toLocaleString())
                        }
                        className="text-xs"
                      />
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          toPersianNumbers(value.toLocaleString()),
                          name === "buyPrice" ? "قیمت خرید" : "قیمت فروش",
                        ]}
                        labelFormatter={(label) =>
                          `روز ${toPersianNumbers(String(label))}`
                        }
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          textAlign: "right",
                          direction: "rtl",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="buyPrice"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        name="buyPrice"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-muted-foreground">
                      داده‌ای برای نمایش وجود ندارد
                    </p>
                  </div>
                )}
              </div>

              {/* Statistics Table */}
              {/* جدول آمار */}
              <div>
                {tableData.length > 0 ? (
                  <ReusableTable data={tableData} columns={columns} />
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-muted-foreground">
                      آمار قابل محاسبه نیست
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

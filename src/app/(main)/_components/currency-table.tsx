"use client";

import {
  ReusableTable,
  TableColumn,
  PaginationConfig,
} from "@/components/reusable-table";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { toPersianNumbers } from "@/lib/utils";
import { CurrencyDetailsDialog } from "./currency-details-dialog";
import { useCurrenciesByType } from "@/services/currency/hooks";
import { Currency } from "@/types/currency";

// Currency data type for table display
// نوع داده ارز برای نمایش در جدول
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

// Generate stable price data based on currency ID
// تولید داده‌های قیمت پایدار بر اساس شناسه ارز
const generateStablePriceData = (currencyId: number) => {
  // Use currency ID as seed for consistent random generation
  // استفاده از شناسه ارز به عنوان بذر برای تولید تصادفی ثابت
  const seed = currencyId * 12345;
  const basePrice = Math.floor((seed % 40000) + 10000);
  const change = ((seed % 200) - 100) / 100; // -1% to +1%
  const changeType: "positive" | "negative" =
    change >= 0 ? "positive" : "negative";

  return {
    basePrice,
    change,
    changeType,
  };
};

// Transform API currency data to table format
// تبدیل داده‌های API ارز به فرمت جدول
const transformCurrencyData = (currencies: Currency[]): CurrencyTableData[] => {
  return currencies.map((currency) => {
    // Generate stable prices and changes based on currency ID
    // تولید قیمت‌ها و تغییرات پایدار بر اساس شناسه ارز
    const { basePrice, change, changeType } = generateStablePriceData(
      currency.id
    );

    return {
      id: currency.id.toString(),
      isoCode: currency.iso_code,
      type: currency.title,
      buyPrice: (basePrice * 0.999).toLocaleString(),
      sellPrice: (basePrice * 1.001).toLocaleString(),
      change: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
      changeType,
      lastUpdate: new Date(),
    };
  });
};

// No data SVG icon component
// کامپوننت آیکون SVG برای عدم وجود داده
const NoDataIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto text-primary"
  >
    <path
      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 8V12L15 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Currency Table Props
// ویژگی‌های جدول ارز
interface CurrencyTableProps {
  currentTab: string;
}

// Currency Table Component
// کامپوننت جدول ارز
export function CurrencyTable({ currentTab }: CurrencyTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyTableData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Map tab values to currency types
  // نگاشت مقادیر تب به انواع ارز
  const currencyType = currentTab === "crypto" ? "CRYPTO" : "FIAT";

  // Fetch currencies from API based on current tab
  // دریافت ارزها از API بر اساس تب فعلی
  const {
    data: currencies,
    isLoading,
    error,
  } = useCurrenciesByType(currencyType);

  // Transform API data for table display with memoization
  // تبدیل داده‌های API برای نمایش در جدول با حافظه‌سازی
  const tableData = useMemo(() => {
    return currencies && Array.isArray(currencies) && currencies.length > 0
      ? transformCurrencyData(currencies)
      : [];
  }, [currencies]);

  const totalPages = Math.ceil(tableData.length / 10) || 1;

  // Dialog handlers
  // مدیریت دیالوگ
  const handleOpenDialog = (currency: CurrencyTableData) => {
    setSelectedCurrency(currency);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCurrency(null);
  };

  // Define table columns
  // تعریف ستون‌های جدول
  const columns: TableColumn<CurrencyTableData>[] = [
    {
      key: "type",
      header: "نوع",
    },
    {
      key: "buyPrice",
      header: "خرید شما (ریال)",
    },
    {
      key: "sellPrice",
      header: "فروش شما (ریال)",
    },
    {
      key: "change",
      header: "تغییرات (24 ساعت)",
      render: (item) => (
        <span
          className={
            item.changeType === "positive" ? "text-green-600" : "text-red-600"
          }
        >
          {toPersianNumbers(item.change)}
        </span>
      ),
    },
    {
      key: "lastUpdate",
      header: "آخرین به‌روزرسانی",
      render: (item) =>
        toPersianNumbers(format(item.lastUpdate, "HH:mm | yyyy/MM/dd")),
    },
    {
      key: "actions",
      header: "",
      headerClassName: "w-12",
      render: (item) => (
        <div
          className="flex justify-end cursor-pointer hover:bg-gray-50 p-1 rounded"
          onClick={() => handleOpenDialog(item)}
        >
          <ArrowLeft className="text-muted-foreground size-4" />
        </div>
      ),
    },
  ];

  // Pagination configuration
  // تنظیمات صفحه‌بندی
  const pagination: PaginationConfig = {
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
    showPagination: true,
  };

  // Loading state
  // حالت بارگذاری
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">در حال بارگذاری ارزها...</p>
        </div>
      </div>
    );
  }

  // Error state
  // حالت خطا
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">خطا در بارگذاری ارزها</p>
          <p className="text-muted-foreground text-sm">
            {error.message || "لطفاً دوباره تلاش کنید"}
          </p>
        </div>
      </div>
    );
  }

  // No data state
  // حالت عدم وجود داده
  if (
    !isLoading &&
    (!currencies || !Array.isArray(currencies) || currencies.length === 0)
  ) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <NoDataIcon />
          <p className="text-muted-foreground mt-4 text-lg">
            هیچ ارزی یافت نشد
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            در حال حاضر هیچ ارزی برای نمایش وجود ندارد
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReusableTable
        data={tableData}
        columns={columns}
        pagination={pagination}
      />

      <CurrencyDetailsDialog
        currency={selectedCurrency}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}

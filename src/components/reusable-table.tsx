// -*- coding: utf-8 -*-

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils";

// Table column definition
// تعریف ستون جدول
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, value: any) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

// Pagination configuration
// تنظیمات صفحه‌بندی
export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPagination?: boolean;
}

// Reusable Table Props
// ویژگی‌های جدول قابل استفاده مجدد
export interface ReusableTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  pagination?: PaginationConfig;
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
  emptyMessage?: string;
}

// Reusable Table Component
// کامپوننت جدول قابل استفاده مجدد
export function ReusableTable<T extends Record<string, any>>({
  data,
  columns,
  pagination,
  className = "",
  rowClassName = "border-b border-dotted",
  headerClassName = "border-b border-dotted",
  emptyMessage = "هیچ داده‌ای یافت نشد",
}: ReusableTableProps<T>) {
  // Render cell content
  // رندر محتوای سلول
  const renderCellContent = (item: T, column: TableColumn<T>) => {
    const value =
      typeof column.key === "string"
        ? (item as any)[column.key]
        : item[column.key as keyof T];

    if (column.render) {
      return column.render(item, value);
    }

    // Default rendering with Persian numbers
    // رندر پیش‌فرض با اعداد فارسی
    if (typeof value === "string" || typeof value === "number") {
      return toPersianNumbers(String(value));
    }

    return value;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Table */}
      {/* جدول */}
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow className={headerClassName}>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={`text-right text-muted-foreground ${
                    column.headerClassName || ""
                  }`}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, rowIndex) => (
                <TableRow key={rowIndex} className={rowClassName}>
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={`text-right py-4 text-muted-foreground ${
                        column.className || ""
                      }`}
                    >
                      {renderCellContent(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {/* صفحه‌بندی */}
      {pagination?.showPagination !== false && pagination && (
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              disabled={pagination.currentPage === 1}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
            >
              <ChevronRight />
            </Button>

            {/* Page numbers */}
            {/* شماره صفحات */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  className={
                    page === pagination.currentPage
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                  onClick={() => pagination.onPageChange(page)}
                >
                  {toPersianNumbers(String(page))}
                </Button>
              )
            )}

            <Button
              variant="ghost"
              size="sm"
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
            >
              <ChevronLeft />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

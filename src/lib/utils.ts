import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to convert English numbers to Persian numbers
// تابع تبدیل اعداد انگلیسی به فارسی
// font i ke adda farsi dashte bashe dar dasras nadashtam
export function toPersianNumbers(str: string): string {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (digit) => persianNumbers[parseInt(digit)]);
}

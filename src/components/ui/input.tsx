import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "../icons";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const isSearch = type === "search";

  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 w-full min-w-0 rounded-md bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          isSearch ? "h-12 bg-[#F5F5F5] pl-12 pr-3 py-3" : "h-9 px-3 py-1",
          "focus-visible:border-ring focus-visible:ring-0 focus-visible:outline-none",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {isSearch && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Search />
        </div>
      )}
    </div>
  );
}

export { Input };

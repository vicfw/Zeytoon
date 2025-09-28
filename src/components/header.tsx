"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Bell, Question, Search } from "./icons";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between py-7 px-6 bg-background",
        className
      )}
    >
      {/* Sidebar Trigger and Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <div className="max-w-md">
          <span className="text-base text-muted-foreground font-bold">
            مهرناز عادلخانی
          </span>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Help Button */}
        <Bell />
        <Question />
        <Search />
        {/* Profile Avatar */}
        <div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar.png" alt="پروفایل" />
            <AvatarFallback>کاربر</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

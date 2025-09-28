"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { DollarSign, Wallet, Settings, LayoutDashboard } from "lucide-react";

// Navigation items
const navigationItems = [
  {
    title: "داشبورد",
    icon: <LayoutDashboard />,
  },
  {
    title: "نرخ ارز",
    icon: <DollarSign />,
    isActive: true,
  },
  {
    title: "کیف پول",
    icon: <Wallet />,
  },
  {
    title: "سرویس‌ها",
    icon: <Settings />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-center gap-2 px-2 pt-6 pb-4">
          <Logo />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    tooltip={item.title}
                    className="rounded-none pr-5 h-12 relative"
                  >
                    <div>
                      {React.cloneElement(item.icon, {
                        className: cn(
                          "h-6 w-6",
                          item.isActive ? "text-primary" : "text-neutral-600"
                        ),
                      })}
                    </div>
                    <span
                      className={`text-base ${
                        item.isActive ? "text-primary" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-secondary rounded-l-md"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

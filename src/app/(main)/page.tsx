"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CurrencyTable } from "./_components/currency-table";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "currency";

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", value);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-base font-bold text-right">نرخ ارز</h1>
      </div>

      {/* Main Content */}
      <Card
        className="w-full"
        style={{ boxShadow: "0px 0px 5px 0px #0000000D" }}
      >
        <CardHeader className="space-y-4">
          {/* Header with Tabs and Search */}
          <div className="flex items-center justify-between gap-4">
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="crypto" className="w-24">
                  رمز ارز
                </TabsTrigger>
                <TabsTrigger value="currency" className="w-24">
                  ارز
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex-1 max-w-sm">
              <Input
                type="search"
                placeholder="جست و جو"
                className="text-right pr-10 placeholder:text-[#C3C3C3]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CurrencyTable currentTab={currentTab} />
        </CardContent>
      </Card>
    </div>
  );
}

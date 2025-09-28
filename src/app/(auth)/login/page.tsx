"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/services/user/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  useEffect(() => {
    // Automatically attempt login with provided credentials
    const loginData = {
      phone_prefix: "+98",
      phone: "09361101775",
      password: process.env.NEXT_PUBLIC_API_PASSWORD as string,
      firebase_token: "23141",
    };

    loginMutation.mutate(loginData);
  }, []);

  // Redirect to home page after successful login
  useEffect(() => {
    if (loginMutation.isSuccess) {
      // Small delay to show success message before redirect
      const timer = setTimeout(() => {
        router.push("/");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loginMutation.isSuccess, router]);

  // Show loading state while attempting login
  if (loginMutation.isPending) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">ورود به سیستم</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <p className="text-center text-lg">در حال ورود...</p>
        </CardContent>
      </Card>
    );
  }

  // Show error state if login fails
  if (loginMutation.isError) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">خطا در ورود</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              ورود ناموفق بود. لطفاً دوباره تلاش کنید.
            </AlertDescription>
          </Alert>
          <Button onClick={() => window.location.reload()} className="w-full">
            تلاش مجدد
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show success state with redirect message
  if (loginMutation.isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">ورود موفق</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <p className="text-center text-lg">
            ورود موفقیت‌آمیز! در حال انتقال...
          </p>
        </CardContent>
      </Card>
    );
  }

  return null;
}

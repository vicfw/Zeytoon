import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value;

  console.log("🔍 Middleware - Token:", token);
  console.log("🔍 Middleware - All cookies:", request.cookies.getAll());

  // If no token exists, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, continue with the request
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

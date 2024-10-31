import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // On which path you are
  const path = request.nextUrl.pathname;

  // if user logged in then dont show login page again
  const isPublicPath = path === "/login" || path === "/signup";

  // Get the token
  const token = request.cookies.get("token")?.value || "";

  //  Means if token is present and user is accessing login then redirect him
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token)
    return NextResponse.redirect(new URL("/login", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};

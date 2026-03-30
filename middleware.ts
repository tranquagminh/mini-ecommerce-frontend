import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/profile", "/wishlist", "/account", "/orders"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isProtected) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      const returnUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/login?returnUrl=${returnUrl}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/wishlist/:path*",
    "/account/:path*",
    "/orders/:path*",
  ],
};

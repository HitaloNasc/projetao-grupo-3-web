import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const user = req.cookies.get("user");

  if (!user && req.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/"],
};

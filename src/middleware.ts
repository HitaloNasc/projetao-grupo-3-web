import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("user");
  let user: { role?: string } | null = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      user = null;
    }
  }

  const dashboard = "/dashboard";
  const dashboardDrivers = "/dashboard-drivers";

  if (
    !user &&
    (req.nextUrl.pathname.startsWith(dashboard) ||
      req.nextUrl.pathname.startsWith(dashboardDrivers))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const setRouteByRole = (role: string) => {
    switch (role) {
      case "admin":
        return NextResponse.redirect(new URL(dashboard, req.url));
      case "user":
        return NextResponse.redirect(new URL(dashboardDrivers, req.url));
      default:
        return NextResponse.redirect(new URL("/", req.url));
    }
  };

  if (
    user &&
    (req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname.startsWith(dashboard) ||
      req.nextUrl.pathname.startsWith(dashboardDrivers))
  ) {
    setRouteByRole(user.role || "");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};

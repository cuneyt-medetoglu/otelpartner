import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/register"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (publicPaths.some((p) => path === p || path.startsWith(p + "/"))) {
    if (token) return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.next();
  }

  if (path.startsWith("/api/auth")) return NextResponse.next();
  if (path.startsWith("/dashboard") && !token) return NextResponse.redirect(new URL("/login", req.url));
  if (path.startsWith("/dashboard/admin") && token?.role !== "admin") return NextResponse.redirect(new URL("/dashboard", req.url));
  if (path.startsWith("/api/admin") && token?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (path.startsWith("/dashboard/otel") && token?.role !== "hotel") return NextResponse.redirect(new URL("/dashboard", req.url));
  if (path.startsWith("/api/hotel") && token?.role !== "hotel") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

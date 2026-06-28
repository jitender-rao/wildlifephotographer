import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /studio with a preview secret cookie
  if (pathname.startsWith("/studio")) {
    const secret = request.cookies.get("studio-secret")?.value;
    if (secret !== process.env.STUDIO_PREVIEW_SECRET) {
      return NextResponse.redirect(
        new URL("/login?redirect=/studio", request.url),
      );
    }
  }

  // Protect /account routes — NextAuth session check handled by next-auth middleware
  // (will be wired up when NextAuth is fully configured)
  if (pathname.startsWith("/account")) {
    // TODO: check NextAuth session token
    // const token = await getToken({ req: request })
    // if (!token) return NextResponse.redirect(new URL('/login', request.url))
  }

  const response = NextResponse.next();

  // Pass the visitor's country through to API routes for Razorpay detection
  // Vercel sets this header automatically; locally it will be undefined
  const country = request.headers.get("x-vercel-ip-country") ?? "IN"; // default to IN in dev
  response.headers.set("x-user-country", country);

  return response;
}

export const config = {
  matcher: ["/studio/:path*", "/account/:path*", "/api/:path*"],
};

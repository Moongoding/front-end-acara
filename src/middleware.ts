import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";
import { url } from "inspector";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: environment.AUTH_SECRET,

    });

    const { pathname } = request.nextUrl;
    // Jika user sudah login, redirect dari halaman auth ke dashboard
    if (pathname === "/auth/login" || pathname === "/auth/register") {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Proteksi akses ke halaman admin
    if (pathname.startsWith("/admin")) {
        if (!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url)
        }
        // console.log(token);

        // Jika token bukan admin, redirect ke /
        if (token?.user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // Redirect `/admin` ke `/admin/dashboard`
        if (pathname === "/admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
    }

    // Proteksi akses ke halaman member
    if (pathname.startsWith("/member")) {
        if (!token) {
            const url = new URL("/auth/login", request.url);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url)
        }
        // Redirect `/member` ke `/member/dashboard`
        if (pathname === "/member") {
            return NextResponse.redirect(new URL("/member/dashboard", request.url));
        }
    }
}


export const config = {
    matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
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

    // Redirect jika tidak ada token dan sedang akses halaman yang dilindungi
    if ((pathname.startsWith("/admin") || pathname.startsWith("/member")) && !token) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));
        loginUrl.searchParams.set("sessionExpired", "true");
        return NextResponse.redirect(loginUrl);
    }

    // Jika ada token, lakukan verifikasi ke backend
    let tokenValid = false;
    if (token?.accessToken) {
        try {
            const res = await fetch(`${environment.API_URL}/auth/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token.accessToken}`, // atau token.jwt jika pakai next-auth JWT
                    "Content-Type": "application/json"
                },
            });

            if (res.ok) {
                const data = await res.json();
                if (data?.data?.id) {
                    tokenValid = true;
                }
            } else {
                console.warn("Invalid token response from backend:", res.status);
            }
        } catch (err) {
            console.error("Error validating token:", err);
        }
    }


    // Redirect jika role tidak sesuai
    if (pathname.startsWith("/admin") && token?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (pathname === "/member") {
        return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }

    // Jika sudah login, jangan ke halaman login/register lagi
    if ((pathname === "/auth/login" || pathname === "/auth/register") && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}


export const config = {
    matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
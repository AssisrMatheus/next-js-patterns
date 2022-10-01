import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // * Next.js updated how middlewares are handed and `withAuth` doesn't work for now. But we can copy what it does and do it ourselves until they fix it
  // Ref: https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/next/middleware.ts#L134
  const token = await getToken({ req });

  // If user is logged in and goes to sign-in page
  if (req.nextUrl.pathname.startsWith("/auth/signin") && token) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  const protectedRoutes = ["/protected"];

  if (
    protectedRoutes.some((x) => req.nextUrl.pathname.startsWith(x)) &&
    !token
  ) {
    console.dir(JSON.stringify(req, null, 2));
    return NextResponse.redirect(
      new URL(
        `/auth/signin?redirectUrl=${encodeURIComponent(
          req.nextUrl as unknown as string
        )}`,
        req.url
      )
    );
  }
}

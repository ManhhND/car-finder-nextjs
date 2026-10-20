import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./lib/session";

const middleware = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  const isLoggedIn = !!(await getSession(req.cookies));

  if (
    !isLoggedIn &&
    (pathname.match(/\/car\/\d+/) || ["/", "/favorite-cars"].includes(pathname))
  ) {
    const loginUrl = new URL("/login", origin);
    return NextResponse.redirect(loginUrl.toString());
  }
  if (isLoggedIn && ["/login", "/register"].includes(pathname)) {
    const homeUrl = new URL("/", origin);
    return NextResponse.redirect(homeUrl.toString());
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|cars/|favicon.ico|.*\\.svg$).*)",
  ],
};

export default middleware;

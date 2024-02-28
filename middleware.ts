import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  const isLoggedIn = req.cookies.has("csrf-token");

  if (!isLoggedIn && pathname.match(/\/car\/\d+/)) {
    const loginUrl = new URL("/login", origin);
    return NextResponse.redirect(loginUrl.toString());
  }
  if (isLoggedIn && ["/login", "/register"].includes(pathname)) {
    const homeUrl = new URL("/", origin);
    return NextResponse.redirect(homeUrl.toString());
  }
};

export default middleware;

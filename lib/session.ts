import { jwtVerify, SignJWT } from "jose";

// Auth is stateless: the session is a signed JWT in an httpOnly cookie, so it
// works across Vercel serverless/edge instances without a database.
export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface Session {
  username: string;
}

const getSecret = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET environment variable is not set");
    }
    return new TextEncoder().encode("dev-only-insecure-secret");
  }
  return new TextEncoder().encode(secret);
};

export const createSessionToken = (session: Session) =>
  new SignJWT({ ...session })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());

export const verifySessionToken = async (
  token: string | undefined,
): Promise<Session | null> => {
  if (!token) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return typeof payload.username === "string"
      ? { username: payload.username }
      : null;
  } catch {
    return null;
  }
};

// Accepts both `cookies()` from next/headers and `NextRequest.cookies`.
export const getSession = (cookieStore: {
  get: (name: string) => { value: string } | undefined;
}) => verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

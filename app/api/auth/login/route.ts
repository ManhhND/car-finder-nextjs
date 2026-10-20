import { loginSchema } from "@/app/utils/validation";
import { DEMO_ACCOUNT } from "@/lib/demoAccount";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  let credentials;
  try {
    credentials = await loginSchema.validate(await req.json());
  } catch {
    return NextResponse.json(
      { message: "Username and password are required." },
      { status: 400 },
    );
  }

  if (
    credentials.username !== DEMO_ACCOUNT.username ||
    credentials.password !== DEMO_ACCOUNT.password
  ) {
    return NextResponse.json(
      { message: "Unrecognized username or password." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ username: credentials.username });
  res.cookies.set(
    SESSION_COOKIE,
    await createSessionToken({ username: credentials.username }),
    sessionCookieOptions,
  );
  return res;
};

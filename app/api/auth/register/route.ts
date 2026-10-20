import { registerSchema } from "@/app/utils/validation";
import {
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/session";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

// There is no user store: a valid registration signs the user in for the
// lifetime of the session cookie, but the account is not persisted.
export const POST = async (req: Request) => {
  let account;
  try {
    account = await registerSchema.validate(await req.json());
  } catch (error) {
    const message =
      error instanceof ValidationError ? error.message : "Invalid request.";
    return NextResponse.json({ message }, { status: 400 });
  }

  const res = NextResponse.json({ username: account.username });
  res.cookies.set(
    SESSION_COOKIE,
    await createSessionToken({ username: account.username }),
    sessionCookieOptions,
  );
  return res;
};

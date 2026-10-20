import { SESSION_COOKIE } from "@/lib/session";
import { NextResponse } from "next/server";

export const POST = async () => {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  return res;
};

"use client";
import { verifyJwtToken } from "@/app/api/auth";
import { JWTPayload } from "jose";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export function useAuth() {
  const [auth, setAuth] = useState<JWTPayload | null>({});

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };

  useEffect(() => {
    getVerifiedtoken();
  }, []);

  return auth;
}

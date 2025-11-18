/*import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { COOKIE_NAME } from "@shared/const";
import jwt from "jsonwebtoken";
import { ENV } from "../env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}*/


import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { COOKIE_NAME } from "@shared/const";
import jwt from "jsonwebtoken";
import { ENV } from "../env";

export type AuthUser = {
  id: string;
  openId: string;
  email: string;
  name?: string;
  role?: string;
};

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: AuthUser | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: AuthUser | null = null;

  const rawToken =
    // si tu utilises cookie-parser
    (opts.req as any).cookies?.[COOKIE_NAME] ??
    // fallback si pas de cookie-parser
    getCookieFromHeader(opts.req.headers.cookie, COOKIE_NAME);

  if (rawToken) {
    try {
      const payload = jwt.verify(rawToken, ENV.cookieSecret) as any;

      user = {
        id: payload.id,
        openId: payload.sub,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      };
    } catch (err) {
      console.warn("[Auth] Invalid session token:", err);
      user = null;
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}

// Petit helper si tu n'as pas cookie-parser côté serveur
function getCookieFromHeader(header: string | undefined, name: string): string | null {
  if (!header) return null;
  const cookies = header.split(";").map((c) => c.trim());
  const match = cookies.find((c) => c.startsWith(name + "="));
  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
}

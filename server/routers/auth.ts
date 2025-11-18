import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getSessionCookieOptions } from "../_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import * as db from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../env";

const ADMIN_EMAIL = "admin@rommelaere-renov.be";
const ADMIN_DEFAULT_PASSWORD = "R0mmel@er&20"; // tu peux le changer si tu veux
const SESSION_EXPIRES_IN_DAYS = 7;

// Création d'un token de session JWT
function createSessionToken(user: {
  id: string;
  openId: string;
  email: string;
  name?: string | null;
  role?: string | null;
}) {
  return jwt.sign(
    {
      sub: user.openId,
      id: user.id,
      email: user.email,
      name: user.name ?? "Admin",
      role: user.role ?? "admin",
    },
    ENV.cookieSecret,
    { expiresIn: `${SESSION_EXPIRES_IN_DAYS}d` }
  );
}

// Fonction utilitaire pour hacher le mot de passe
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export const authRouter = router({
  me: publicProcedure.query((opts) => opts.ctx.user ?? null),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // 1. Récupération de l'utilisateur par email
      let user = await db.getUserByEmail(input.email);

      // 2. Si l'utilisateur n'existe pas et que c'est l'admin → on le crée une fois
      if (!user && input.email === ADMIN_EMAIL) {
        const hashedPassword = await hashPassword(ADMIN_DEFAULT_PASSWORD);
        const openId = `local-login-${input.email}`;

        await db.upsertUser({
          openId,
          email: input.email,
          name: "Admin Local",
          role: "admin",
          loginMethod: "local",
          // ⚠️ Ici on suppose que la colonne DB s'appelle bien "password"
          password: hashedPassword,
        });

        user = await db.getUserByEmail(input.email);
      }

      // 3. Vérification de l'existence de l'utilisateur et du mot de passe
      if (!user || !user.password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou mot de passe incorrect",
        });
      }

      const passwordMatch = await bcrypt.compare(input.password, user.password);

      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou mot de passe incorrect",
        });
      }

      // 4. Création du token de session (JWT)
      const sessionToken = createSessionToken({
        id: user.id,
        openId: user.openId,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      // 5. Définition du cookie de session
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: SESSION_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000,
      });

      return { success: true };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true } as const;
  }),
});

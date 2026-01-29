import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { sdk } from "../_core/sdk";
import { getSessionCookieOptions } from "../_core/cookies";
import { COOKIE_NAME } from "@shared/const";
import * as db from "../db";
import * as bcrypt from "bcryptjs";

// Fonction utilitaire pour hacher le mot de passe
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export const authRouter = router({
  me: publicProcedure.query((opts) => opts.ctx.user),
  
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

      // Si l'utilisateur n'existe pas, et que c'est l'email admin, on le crée avec le mot de passe haché
      if (!user && input.email === "admin@rommelaere-renov.be") {
        const hashedPassword = await hashPassword("R0mmel@er&20"); // Mot de passe par défaut
        const openId = `local-login-${input.email}`;
        
        await db.upsertUser({
          openId: openId,
          email: input.email,
          name: "Admin Local",
          role: "admin",
          loginMethod: "local",
          passwordHash: hashedPassword,
        });
        
        user = await db.getUserByEmail(input.email);
      }

      // 2. Vérification de l'existence de l'utilisateur et du mot de passe
      if (!user || !user.passwordHash) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou mot de passe incorrect",
        });
      }

      const passwordMatch = await bcrypt.compare(
        input.password,
        user.passwordHash
      );

      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email ou mot de passe incorrect",
        });
      }

      // 3. Création du token de session
      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || "Admin",
      });

      // 4. Définition du cookie de session
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);

      return { success: true };
    }),

  logout: publicProcedure.mutation(({ ctx }) => {
    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return {
      success: true,
    } as const;
  }),

  createAdmin: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // 1. Vérifier si l'utilisateur existe déjà
      const existingUser = await db.getUserByEmail(input.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Un utilisateur avec cet email existe déjà",
        });
      }

      // 2. Hacher le mot de passe
      const hashedPassword = await hashPassword(input.password);
      const openId = `local-login-${input.email}`;

      // 3. Créer l'utilisateur en base de données
      await db.upsertUser({
        openId: openId,
        email: input.email,
        name: input.name,
        role: "admin",
        loginMethod: "local",
        passwordHash: hashedPassword,
      });

      // 4. Récupérer l'utilisateur créé
      const user = await db.getUserByEmail(input.email);
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erreur lors de la création de l'utilisateur",
        });
      }

      // 5. Créer le token de session et connecter automatiquement
      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || "Admin",
      });

      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, cookieOptions);

      return { success: true };
    }),
});

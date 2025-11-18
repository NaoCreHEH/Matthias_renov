import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";

// Middleware pour vérifier si l'utilisateur est admin
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Vous n'avez pas les permissions nécessaires",
    });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  content: router({
    getServices: publicProcedure.query(() => db.getServices()),
    getServiceById: publicProcedure.input(z.number()).query(({ input }) => db.getServiceById(input)),
    createService: protectedProcedure
      .input(z.object({ title: z.string(), description: z.string().optional(), icon: z.string().optional(), order: z.number().optional() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return db.createService(input);
      }),
    updateService: protectedProcedure
      .input(z.object({ id: z.number(), title: z.string().optional(), description: z.string().optional(), icon: z.string().optional(), order: z.number().optional() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { id, ...data } = input;
        return db.updateService(id, data);
      }),
    deleteService: protectedProcedure.input(z.number()).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
      return db.deleteService(input);
    }),
    getProjects: publicProcedure.query(() => db.getProjects()),
    getProjectById: publicProcedure.input(z.number()).query(({ input }) => db.getProjectById(input)),
    createProject: protectedProcedure
      .input(z.object({ title: z.string(), description: z.string().optional(), imageUrl: z.string().optional(), order: z.number().optional() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return db.createProject(input);
      }),
    updateProject: protectedProcedure
      .input(z.object({ id: z.number(), title: z.string().optional(), description: z.string().optional(), imageUrl: z.string().optional(), order: z.number().optional() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        const { id, ...data } = input;
        return db.updateProject(id, data);
      }),
    deleteProject: protectedProcedure.input(z.number()).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
      return db.deleteProject(input);
    }),
    getProjectImages: publicProcedure.input(z.number()).query(({ input }) => db.getProjectImages(input)),
    createProjectImage: protectedProcedure
      .input(z.object({ projectId: z.number(), imageUrl: z.string(), order: z.number().optional() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return db.createProjectImage(input);
      }),
    deleteProjectImage: protectedProcedure.input(z.number()).mutation(({ input, ctx }) => {
      if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
      return db.deleteProjectImage(input);
    }),
    getContactInfo: publicProcedure.query(() => db.getContactInfo()),
    updateContactInfo: protectedProcedure
      .input(z.object({ phone: z.string().optional(), email: z.string().optional(), address: z.string().optional() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== "admin") throw new Error("Unauthorized");
        return db.updateContactInfo(input);
      }),
  }),

  // Routeur Contact (Messages)
  contact: router({
    createMessage: publicProcedure
      .input(z.object({ name: z.string().min(1), email: z.string().email(), phone: z.string().optional(), subject: z.string().min(1), message: z.string().min(1) }))
      .mutation(({ input }) => db.createMessage(input)),
    getMessages: adminProcedure.query(() => db.getMessages()),
    getMessageById: adminProcedure.input(z.number()).query(({ input }) => db.getMessageById(input)),
    markAsRead: adminProcedure.input(z.number()).mutation(({ input }) => db.markMessageAsRead(input)),
    deleteMessage: adminProcedure.input(z.number()).mutation(({ input }) => db.deleteMessage(input)),
  }),

  // Routeur Admin
  admin: router({
    getStats: adminProcedure.query(async () => {
      try {
        const servicesCount = await db.getServices().then((s) => s.length);
        const projectsCount = await db.getProjects().then((p) => p.length);
        
        return {
          servicesCount,
          projectsCount,
          testimonialsCount: 0,
          usersCount: 0,
        };
      } catch (error) {
        console.error("Error getting stats:", error);
        return {
          servicesCount: 0,
          projectsCount: 0,
          testimonialsCount: 0,
          usersCount: 0,
        };
      }
    }),

    getUsers: adminProcedure.query(async () => {
      return [];
    }),

    createUser: adminProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          password: z.string().min(6),
          role: z.enum(["user", "admin"]),
        })
      )
      .mutation(async ({ input }) => {
        return {
          id: 1,
          name: input.name,
          email: input.email,
          role: input.role,
        };
      }),

    updateUser: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1).optional(),
          email: z.string().email().optional(),
          password: z.string().min(6).optional(),
          role: z.enum(["user", "admin"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        return { success: true };
      }),

    deleteUser: adminProcedure
      .input(z.number())
      .mutation(async ({ input: userId }) => {
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

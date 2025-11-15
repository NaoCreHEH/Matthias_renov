# Listing des Modifications pour Intégrer la Page Témoignages

## Vue d'ensemble

Ce document liste toutes les modifications nécessaires pour ajouter une page de témoignages clients à votre application Rommelaere Rénov.

---

## 1. MODIFICATIONS DE LA BASE DE DONNÉES

### Fichier : `drizzle/schema.ts`

**Action** : Ajouter la table `testimonials` après la table `contactInfo`

```typescript
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientRole: varchar("clientRole", { length: 255 }), // ex: "Propriétaire", "Entrepreneur"
  projectType: varchar("projectType", { length: 255 }), // ex: "Aménagement combles", "Crépi"
  content: text("content").notNull(), // Le texte du témoignage
  rating: int("rating").default(5), // Note de 1 à 5
  imageUrl: varchar("imageUrl", { length: 512 }), // Photo du client (optionnel)
  order: int("order").default(0), // Ordre d'affichage
  isPublished: boolean("isPublished").default(true), // Visible ou non
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;
```

**Étapes** :
1. Ouvrir `drizzle/schema.ts`
2. Ajouter le code ci-dessus
3. Exécuter `pnpm db:push` pour créer la migration

---

## 2. MODIFICATIONS DU SERVEUR (Backend)

### Fichier : `server/db.ts`

**Action** : Ajouter les fonctions de requête pour les témoignages

```typescript
// Ajouter à la fin du fichier, avant le dernier export

export async function getTestimonials() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isPublished, true))
    .orderBy(asc(testimonials.order));
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(testimonials).orderBy(asc(testimonials.order));
}

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(testimonials).values(data);
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(testimonials).where(eq(testimonials.id, id));
}

export async function toggleTestimonialPublished(id: number, isPublished: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(testimonials).set({ isPublished }).where(eq(testimonials.id, id));
}
```

**Étapes** :
1. Ouvrir `server/db.ts`
2. Importer `testimonials, Testimonial, InsertTestimonial` du schéma
3. Ajouter les fonctions ci-dessus

---

### Fichier : `server/routers.ts`

**Action** : Ajouter les procédures tRPC pour les témoignages

```typescript
// Ajouter dans le routeur principal, après le routeur content

testimonials: router({
  list: publicProcedure.query(async () => {
    return await getTestimonials();
  }),
  
  listAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return await getAllTestimonials();
  }),
  
  create: protectedProcedure
    .input(z.object({
      clientName: z.string().min(1),
      clientRole: z.string().optional(),
      projectType: z.string().optional(),
      content: z.string().min(10),
      rating: z.number().min(1).max(5).default(5),
      imageUrl: z.string().optional(),
      order: z.number().default(0),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await createTestimonial(input);
      return { success: true };
    }),
  
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      clientName: z.string().optional(),
      clientRole: z.string().optional(),
      projectType: z.string().optional(),
      content: z.string().optional(),
      rating: z.number().min(1).max(5).optional(),
      imageUrl: z.string().optional(),
      order: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      const { id, ...data } = input;
      await updateTestimonial(id, data);
      return { success: true };
    }),
  
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await deleteTestimonial(input.id);
      return { success: true };
    }),
  
  togglePublished: protectedProcedure
    .input(z.object({ id: z.number(), isPublished: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      await toggleTestimonialPublished(input.id, input.isPublished);
      return { success: true };
    }),
}),
```

**Étapes** :
1. Ouvrir `server/routers.ts`
2. Importer les fonctions de `db.ts`
3. Importer `z` de zod si pas déjà importé
4. Ajouter le routeur ci-dessus

---

## 3. MODIFICATIONS DU FRONTEND (Client)

### Fichier : `client/src/pages/Testimonials.tsx` (NOUVEAU)

**Action** : Créer la page publique des témoignages

Voir le fichier `Testimonials.tsx` fourni.

**Étapes** :
1. Créer le fichier `client/src/pages/Testimonials.tsx`
2. Copier le contenu du fichier fourni

---

### Fichier : `client/src/pages/admin/AdminTestimonials.tsx` (NOUVEAU)

**Action** : Créer la page d'administration des témoignages

Voir le fichier `AdminTestimonials.tsx` fourni.

**Étapes** :
1. Créer le fichier `client/src/pages/admin/AdminTestimonials.tsx`
2. Copier le contenu du fichier fourni

---

### Fichier : `client/src/App.tsx`

**Action** : Ajouter les routes pour les témoignages

**Avant** (ligne d'import) :
```typescript
import Testimonials from "./pages/Testimonials";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
```

**Dans la fonction Router()**, ajouter après la route `/projects` :
```typescript
<Route path={"/testimonials"} component={Testimonials} />
<Route path={"/admin/testimonials"} component={AdminTestimonials} />
```

**Étapes** :
1. Ouvrir `client/src/App.tsx`
2. Ajouter les imports
3. Ajouter les routes

---

### Fichier : `client/src/components/Navigation.tsx`

**Action** : Ajouter le lien "Témoignages" au menu de navigation

**Dans le tableau `navItems`**, ajouter après "Réalisations" :
```typescript
{ label: "Témoignages", href: "/testimonials" },
```

**Dans le section admin**, ajouter après "Projets" :
```typescript
{ label: "Témoignages", href: "/admin/testimonials", icon: MessageSquare },
```

**N'oubliez pas** : Importer `MessageSquare` de lucide-react si pas déjà importé

**Étapes** :
1. Ouvrir `client/src/components/Navigation.tsx`
2. Ajouter le lien dans le menu public
3. Ajouter le lien dans le menu admin

---

## 4. DONNÉES DE DÉMONSTRATION

### Fichier : `seed_testimonials.ts` (NOUVEAU)

**Action** : Créer un script pour insérer les données de démonstration

Voir le fichier `seed_testimonials.ts` fourni.

**Étapes** :
1. Créer le fichier `seed_testimonials.ts` à la racine du projet
2. Copier le contenu du fichier fourni
3. Exécuter `npx tsx seed_testimonials.ts`

---

## 5. RÉSUMÉ DES FICHIERS À MODIFIER/CRÉER

| Fichier | Action | Priorité |
|---------|--------|----------|
| `drizzle/schema.ts` | Modifier - Ajouter table testimonials | 🔴 Haute |
| `server/db.ts` | Modifier - Ajouter fonctions de requête | 🔴 Haute |
| `server/routers.ts` | Modifier - Ajouter routeur testimonials | 🔴 Haute |
| `client/src/pages/Testimonials.tsx` | Créer | 🔴 Haute |
| `client/src/pages/admin/AdminTestimonials.tsx` | Créer | 🔴 Haute |
| `client/src/App.tsx` | Modifier - Ajouter routes | 🟠 Moyenne |
| `client/src/components/Navigation.tsx` | Modifier - Ajouter liens | 🟠 Moyenne |
| `seed_testimonials.ts` | Créer - Données de démo | 🟡 Basse |

---

## 6. COMMANDES À EXÉCUTER

```bash
# 1. Créer la migration
pnpm db:push

# 2. Insérer les données de démonstration
npx tsx seed_testimonials.ts

# 3. Redémarrer le serveur de développement
pnpm dev
```

---

## 7. VÉRIFICATION

Après les modifications, vérifiez :

- ✅ La page `/testimonials` s'affiche correctement
- ✅ Les témoignages s'affichent avec les carrousels de photos
- ✅ La page `/admin/testimonials` permet de gérer les témoignages
- ✅ Les témoignages peuvent être créés, modifiés, supprimés
- ✅ Les témoignages peuvent être publiés/dépubliés
- ✅ Le lien dans la navigation fonctionne

---

## 8. NOTES IMPORTANTES

- Les témoignages sont triés par le champ `order`
- Seuls les témoignages avec `isPublished = true` s'affichent sur la page publique
- Les photos des clients sont optionnelles
- La note (rating) est de 1 à 5 étoiles
- L'authentification est requise pour gérer les témoignages (rôle admin)

---

## Fichiers Fournis

Les fichiers suivants sont fournis séparément :

1. **Testimonials.tsx** - Page publique des témoignages
2. **AdminTestimonials.tsx** - Page d'administration
3. **seed_testimonials.ts** - Données de démonstration
4. **SCHEMA_CHANGES.sql** - Migration SQL (si nécessaire)

